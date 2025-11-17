
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { CHORDS, ALL_NOTES_SHARP } from '../constants';
import { generateChordInversions } from '../utils/musicTheory';
import PianoKeyboard from '../components/PianoKeyboard';
import TransposeControl from '../components/TransposeControl';
import ContentDisplay from '../components/ContentDisplay';
import { getExplanationForTopic } from '../services/geminiService';
import { Note, Language } from '../types';

const ChordsScreen: React.FC = () => {
  const { language, text } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const [rootNote, setRootNote] = useState<Note>(searchParams.get('root') || 'C');
  const [selectedChordKey, setSelectedChordKey] = useState(searchParams.get('type') || Object.keys(CHORDS)[0]);
  const [selectedInversionIndex, setSelectedInversionIndex] = useState(0);
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const prevLangRef = useRef<Language | undefined>(undefined);

  useEffect(() => {
    const rootParam = searchParams.get('root');
    const typeParam = searchParams.get('type');
    if (rootParam && ALL_NOTES_SHARP.includes(rootParam)) {
      setRootNote(rootParam as Note);
    }
    if (typeParam && CHORDS[typeParam as keyof typeof CHORDS]) {
      setSelectedChordKey(typeParam);
    }
    setSelectedInversionIndex(0); // Reset inversion on change
  }, [searchParams]);

  const handleRootNoteChange = (note: Note) => {
    setRootNote(note);
    setSearchParams({ root: note, type: selectedChordKey });
  };
  
  const handleChordKeyChange = (key: string) => {
    setSelectedChordKey(key);
    setSearchParams({ root: rootNote, type: key });
  }

  const selectedChord = CHORDS[selectedChordKey as keyof typeof CHORDS];
  const chordInversions = useMemo(() => generateChordInversions(rootNote, selectedChord.intervals), [rootNote, selectedChord]);

  const fetchExplanation = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const topic = `${rootNote} ${selectedChord.name} Chord`;
    try {
      const result = await getExplanationForTopic(topic, language);
      setExplanation(result);
    } catch (err) {
      setError('Failed to fetch explanation.');
    } finally {
      setIsLoading(false);
    }
  }, [rootNote, selectedChord.name, language]);

  useEffect(() => {
    if (prevLangRef.current && prevLangRef.current !== language && explanation && !isLoading) {
      fetchExplanation();
    }
    prevLangRef.current = language;
  }, [language, explanation, isLoading, fetchExplanation]);

  const currentInversion = chordInversions[selectedInversionIndex];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white hidden md:block">{text.chords}</h1>
      
      <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="flex flex-col space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-2">{text.selectRootNote}</label>
              <TransposeControl rootNote={rootNote} setRootNote={handleRootNoteChange} />
            </div>
            <div>
              <label htmlFor="chord-select" className="block text-sm font-medium text-brand-text-muted mb-2">{text.selectChord}</label>
              <select
                id="chord-select"
                value={selectedChordKey}
                onChange={(e) => handleChordKeyChange(e.target.value)}
                className="w-full p-3 bg-brand-primary border border-brand-surface rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none"
              >
                {Object.entries(CHORDS).map(([key, chord]) => (
                  <option key={key} value={key}>{chord.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="bg-brand-primary p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2 text-brand-secondary">{`${rootNote} ${selectedChord.name}`}</h3>
            <p className="text-lg font-mono tracking-widest">
                {currentInversion?.notes.map(n => n.slice(0,-1)).join(' - ')}
            </p>
          </div>
        </div>
        
        <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2 text-center">{text.inversions}</h4>
            <div className="flex justify-center items-center gap-2 flex-wrap">
                {chordInversions.map((inversion, index) => (
                    <button 
                        key={inversion.nameKey}
                        onClick={() => setSelectedInversionIndex(index)}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedInversionIndex === index ? 'bg-brand-secondary text-white' : 'bg-brand-primary hover:bg-opacity-80'}`}
                    >
                        {text[inversion.nameKey as keyof typeof text]}
                    </button>
                ))}
            </div>
        </div>

        <PianoKeyboard highlightedNotes={currentInversion?.notes || []} octaves={2} />
        
        <div className="mt-4 flex items-center gap-4">
            <button
              onClick={fetchExplanation}
              disabled={isLoading}
              className="w-full bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {text.getExplanation}
            </button>
        </div>
      </div>

      <ContentDisplay content={explanation} isLoading={isLoading} error={error} />
    </div>
  );
};

export default ChordsScreen;