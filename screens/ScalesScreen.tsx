
import React, { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SCALES } from '../constants';
import { generateScaleNotes } from '../utils/musicTheory';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Fix: Initialize useRef with undefined by allowing undefined in the type.
  // FIX: Initialize useRef with an initial value of undefined.
  const prevLangRef = useRef<Language | undefined>(undefined);

  const selectedScale = SCALES[selectedScaleKey as keyof typeof SCALES];
  const scaleNotes = useMemo(() => generateScaleNotes(rootNote, selectedScale.intervals), [rootNote, selectedScale]);

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

  useEffect(() => {
    // Re-fetch explanation if the language changes and content already exists.
    if (prevLangRef.current && prevLangRef.current !== language && explanation && !isLoading) {
      fetchExplanation();
    }
    // Update the ref to the current language after the check.
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
          </div>
        </div>
        
        <PianoKeyboard highlightedNotes={scaleNotes} />
        
        <button
          onClick={fetchExplanation}
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
