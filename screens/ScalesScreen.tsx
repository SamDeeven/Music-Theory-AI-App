import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SCALES, SCALE_FORMULAS, PDF_THEORY_TEXT, NEW_PDF_THEORY, SCALE_DEGREE_NAMES, SCALE_INTERVAL_NAMES, KEY_SIGNATURES } from '../constants';
import { generateScaleNotes, getRelativeKey } from '../utils/musicTheory';
import PianoKeyboard from '../components/PianoKeyboard';
import TransposeControl from '../components/TransposeControl';
import ContentDisplay from '../components/ContentDisplay';
import { getExplanationForTopic } from '../services/geminiService';
import { Note, Language } from '../types';

const ScalesScreen: React.FC = () => {
  const { language, text } = useLanguage();
  const [rootNote, setRootNote] = useState<Note>('C');
  const [selectedScaleKey, setSelectedScaleKey] = useState(Object.keys(SCALES)[0]);
  const [explanation, setExplanation] = useState('');
  const [showExplanation, setShowExplanation] = useState(false); // State to toggle explanation visibility
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const prevLangRef = useRef<Language | undefined>(undefined);

  const selectedScale = SCALES[selectedScaleKey as keyof typeof SCALES];
  const scaleNotes = useMemo(() => generateScaleNotes(rootNote, selectedScale.intervals), [rootNote, selectedScale]);
  
  // Map scale notes to octaves 4 and 5 for the piano display
  const highlightedKeys = useMemo(() => {
      const keys: string[] = [];
      scaleNotes.forEach(note => {
          keys.push(`${note}4`);
          keys.push(`${note}5`);
      });
      return keys;
  }, [scaleNotes]);

  const scaleFormula = SCALE_FORMULAS[language][selectedScaleKey as keyof typeof SCALE_FORMULAS[typeof language]];

  // Determine specific theory text based on selection
  let specificTheory = PDF_THEORY_TEXT[language].scales.definition;
  let soundDesc = "";
  
  const theoryText = PDF_THEORY_TEXT[language].scales;
  const newTheory = NEW_PDF_THEORY[language].scales;

  if (selectedScaleKey.toLowerCase().includes('major')) {
      specificTheory = theoryText.majorVsMinor;
      soundDesc = newTheory.majorSound;
  } else if (selectedScaleKey.toLowerCase().includes('minor')) {
      specificTheory = theoryText.majorVsMinor; 
      soundDesc = newTheory.minorSound;
  }

  // Scale Types Description from New PDF
  const typeDesc = newTheory.types[selectedScaleKey as keyof typeof newTheory.types] || "";

  // Relative Scale
  const relativeScale = getRelativeKey(rootNote, selectedScaleKey);

  // Scale Degrees and Intervals
  const degreesSource = SCALE_DEGREE_NAMES[language];
  const intervalsSource = SCALE_INTERVAL_NAMES[language];

  const degreeNames = degreesSource[selectedScaleKey as keyof typeof degreesSource] || degreesSource.default;
  const intervalNames = intervalsSource[selectedScaleKey as keyof typeof intervalsSource] || intervalsSource.default;

  // Key Signature Logic
  let keySignature = "";
  const scaleFullName = `${rootNote} ${selectedScale.name}`;
  // Try exact match
  if (KEY_SIGNATURES[scaleFullName]) {
      keySignature = KEY_SIGNATURES[scaleFullName][language === Language.TE ? 'te' : 'en'];
  }

  const handleGetExplanation = () => {
      setShowExplanation(true);
      // AI Call disabled as per request
      /*
      fetchExplanation();
      */
  };

  const fetchExplanation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const topic = `${rootNote} ${selectedScale.name} Scale`;
    try {
      const result = await getExplanationForTopic(topic, language);
      setExplanation(result);
    } catch (err) {
      setError('Failed to fetch explanation.');
    } finally {
      setIsLoading(false);
    }
  }, [rootNote, selectedScale.name, language]);

  // Effect to refetch if explanation was already loaded (AI behavior), kept for future use if needed
  useEffect(() => {
    if (prevLangRef.current && prevLangRef.current !== language && explanation && !isLoading) {
      fetchExplanation();
    }
    prevLangRef.current = language;
  }, [language, explanation, isLoading, fetchExplanation]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white hidden md:block">{text.scales}</h1>
      
      <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-2">{text.selectRootNote}</label>
              <TransposeControl rootNote={rootNote} setRootNote={setRootNote} />
            </div>
            <div>
              <label htmlFor="scale-select" className="block text-sm font-medium text-brand-text-muted mb-2">{text.selectScale}</label>
              <select
                id="scale-select"
                value={selectedScaleKey}
                onChange={(e) => setSelectedScaleKey(e.target.value)}
                className="w-full p-3 bg-brand-primary border border-brand-surface rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none"
              >
                {Object.entries(SCALES).map(([key, scale]) => (
                  <option key={key} value={key}>{scale.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-brand-primary p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-brand-secondary">{`${rootNote} ${selectedScale.name}`}</h3>
            <p className="text-lg font-mono tracking-widest">{scaleNotes.join(' - ')}</p>
            {relativeScale && (
                 <p className="text-sm text-brand-text-muted mt-2 pt-2 border-t border-brand-surface/30">
                     {text.relativeScale}: <span className="text-brand-text font-bold">{relativeScale}</span>
                 </p>
            )}
            {keySignature && (
                <p className="text-sm text-brand-text-muted mt-1">
                    Key Signature: <span className="text-brand-text font-bold">{keySignature}</span>
                </p>
            )}
          </div>
        </div>
        
        <PianoKeyboard highlightedNotes={highlightedKeys} octaves={2} />
        
        {/* Scale Degrees Table */}
        <div className="mt-6 mb-6 overflow-x-auto rounded-lg border border-brand-primary">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-brand-text uppercase bg-brand-primary">
                    <tr>
                        <th className="px-4 py-3">Degree</th>
                        <th className="px-4 py-3">Note</th>
                        <th className="px-4 py-3">Name</th>
                        <th className="px-4 py-3">Interval</th>
                    </tr>
                </thead>
                <tbody>
                    {scaleNotes.map((note, index) => (
                        <tr key={note} className="bg-brand-surface border-b border-brand-primary last:border-b-0 hover:bg-brand-primary/20">
                            <td className="px-4 py-2 text-brand-secondary font-bold">{index + 1}</td>
                            <td className="px-4 py-2 font-medium text-white">{note}</td>
                            <td className="px-4 py-2 text-brand-text-muted">{degreeNames[index] || `${index + 1}th`}</td>
                            <td className="px-4 py-2 text-brand-text-muted">{intervalNames[index] || ''}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {showExplanation && (
            <div className="mt-6 p-4 bg-brand-primary/30 rounded-lg border border-brand-primary space-y-3">
                <div className="text-brand-text-muted text-sm space-y-2">
                    <p><span className="font-bold text-white">{text.formula}:</span> {scaleFormula}</p>
                    <p>{specificTheory}</p>
                    {typeDesc && <p><span className="font-bold text-white">{text.characteristic}:</span> {typeDesc}</p>}
                    {soundDesc && <p className="italic border-l-2 border-brand-secondary pl-3">{soundDesc}</p>}
                    
                    <div className="mt-3 pt-3 border-t border-brand-primary/50">
                        <p className="font-semibold text-white mb-1">{text.whyScalesMatter}:</p>
                        <ul className="list-disc list-inside space-y-1">
                            {newTheory.whyMatter.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )}

        <button
          onClick={handleGetExplanation}
          disabled={isLoading}
          className="mt-4 w-full bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {text.getExplanation}
        </button>
      </div>

      <ContentDisplay content={explanation} isLoading={isLoading} error={error} />
    </div>
  );
};

export default ScalesScreen;