import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SCALES, TIME_SIGNATURES, PDF_THEORY_TEXT, PROGRESSION_TEMPLATES, SCALE_TYPES, PROGRESSION_GUIDE } from '../constants';
import TransposeControl from '../components/TransposeControl';
import ContentDisplay from '../components/ContentDisplay';
import { generateChordProgressions } from '../services/geminiService';
import { parseChord, generateFamilyChords, getChordFromRomanNumeral } from '../utils/musicTheory';
import { Note, Language } from '../types';

const ChordProgressionsScreen: React.FC = () => {
  const { language, text } = useLanguage();
  const [rootNote, setRootNote] = useState<Note>('C');
  const [selectedScaleKey, setSelectedScaleKey] = useState('major');
  const [timeSignature, setTimeSignature] = useState('4/4');
  const [progressions, setProgressions] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const prevLangRef = useRef<Language | undefined>(undefined);

  const selectedScale = SCALES[selectedScaleKey as keyof typeof SCALES] || SCALES.major;
  
  // Use generateFamilyChords to ensure chord qualities match the scale notes accurately
  const diatonicChords = generateFamilyChords(rootNote, selectedScaleKey);
  
  const theoryText = PDF_THEORY_TEXT[language].progressions;
  const guideText = PROGRESSION_GUIDE[language];

  // Filter progression templates based on scale type (Major-like vs Minor-like)
  const isMinorContext = selectedScaleKey.toLowerCase().includes('minor');
  const progressionList = isMinorContext ? PROGRESSION_TEMPLATES.minor : PROGRESSION_TEMPLATES.major;

  const handleGetExplanation = () => {
      setShowExplanation(true);
      // AI Call disabled
      /*
      fetchProgressions();
      */
  };

  const fetchProgressions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateChordProgressions(rootNote, selectedScale.name, timeSignature, language);
      setProgressions(result);
    } catch (err) {
      setError('Failed to fetch progressions.');
    } finally {
      setIsLoading(false);
    }
  }, [rootNote, selectedScale.name, timeSignature, language]);

  useEffect(() => {
    if (prevLangRef.current && prevLangRef.current !== language && progressions && !isLoading) {
      fetchProgressions();
    }
    prevLangRef.current = language;
  }, [language, progressions, isLoading, fetchProgressions]);

  const renderInteractiveProgressions = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.includes(' - ') && /[A-G]/.test(line)) {
        const parts = line.split(/(\s-\s)/);
        return (
          <p key={index} className="mb-3 text-lg font-mono">
            {parts.map((part, i) => {
              const parsed = parseChord(part);
              if (parsed) {
                return (
                  <Link
                    key={i}
                    to={`/chords?root=${parsed.root}&type=${parsed.typeKey}`}
                    className="text-brand-secondary hover:underline font-bold"
                  >
                    {part.trim()}
                  </Link>
                );
              }
              return <span key={i}>{part}</span>;
            })}
          </p>
        );
      }
      return <div key={index}>{line}</div>;
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white hidden md:block">{text.progressions}</h1>
      
      <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
               {SCALE_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                ))}
            </select>
          </div>
         
        </div>

        {/* Common Chord Progressions List from PDF Data */}
        <div className="mb-8">
            <h3 className="text-lg font-bold text-white mb-4">Common {isMinorContext ? 'Minor' : 'Major'} Progressions in {rootNote}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {progressionList.map((prog) => {
                    // Generate actual chords for this progression template
                    const chords = prog.numerals.map(numeral => getChordFromRomanNumeral(rootNote, selectedScaleKey, numeral));
                    
                    return (
                        <div key={prog.id} className="bg-brand-primary/40 border border-brand-primary rounded-lg p-3 hover:bg-brand-primary/60 transition-colors">
                             <div className="text-xs text-brand-text-muted mb-1 flex justify-between">
                                <span>#{prog.id}</span>
                                <span className="font-mono opacity-60">{prog.numerals.join(' - ')}</span>
                             </div>
                             <div className="font-bold text-lg text-brand-secondary">
                                {chords.join(' - ')}
                             </div>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Static Progression Numbers & Chord List (Diatonic Reference) */}
        <div className="mb-6">
             <h3 className="text-lg font-bold text-white mb-3">{text.diatonicChords}</h3>
             <div className="overflow-x-auto rounded-lg border border-brand-primary">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-brand-text uppercase bg-brand-primary">
                        <tr>
                            <th className="px-4 py-3">Degree</th>
                            <th className="px-4 py-3">Chord Name</th>
                            <th className="px-4 py-3">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {diatonicChords.map((item, index) => (
                            <tr key={index} className="bg-brand-surface border-b border-brand-primary last:border-b-0 hover:bg-brand-primary/20">
                                <td className="px-4 py-3 font-bold text-brand-secondary">{item.degree}</td>
                                <td className="px-4 py-3 font-bold">{item.chord}</td>
                                <td className="px-4 py-3 text-brand-text-muted capitalize">{item.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
             </div>
        </div>
        
        {showExplanation && (
            <div className="mb-4 p-4 bg-brand-primary/30 rounded-lg border border-brand-primary">
                <p className="text-brand-text-muted text-sm italic mb-4">
                    "{theoryText.melody}"
                </p>

                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-brand-text-muted">
                    <div>
                        <ul className="space-y-2">
                            {guideText.rules.map((rule, idx) => (
                                <li key={idx}>
                                    <span className="font-bold text-brand-text">{rule.title}:</span> {rule.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <p className="font-bold text-brand-text mb-1">Timing & Practice:</p>
                        <ul className="list-disc list-inside space-y-1">
                            {guideText.timing.map((item, idx) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        )}

        <button
          onClick={handleGetExplanation}
          disabled={isLoading}
          className="w-full bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {text.getExplanation}
        </button>
      </div>

      <ContentDisplay content={progressions} isLoading={isLoading} error={error}>
        {progressions && renderInteractiveProgressions(progressions)}
      </ContentDisplay>
    </div>
  );
};

export default ChordProgressionsScreen;