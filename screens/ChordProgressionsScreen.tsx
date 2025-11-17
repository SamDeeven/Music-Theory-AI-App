
import React, { useState, useCallback, useEffect, useRef } from 'react';
// Fix: Corrected react-router-dom import for v5 compatibility.
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SCALES, TIME_SIGNATURES } from '../constants';
import TransposeControl from '../components/TransposeControl';
import ContentDisplay from '../components/ContentDisplay';
import { generateChordProgressions } from '../services/geminiService';
import { parseChord } from '../utils/musicTheory';
import { Note, Language } from '../types';

const ChordProgressionsScreen: React.FC = () => {
  const { language, text } = useLanguage();
  const [rootNote, setRootNote] = useState<Note>('C');
  const [selectedScaleKey, setSelectedScaleKey] = useState('major');
  const [timeSignature, setTimeSignature] = useState('4/4');
  const [progressions, setProgressions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Fix: Initialize useRef with undefined by allowing undefined in the type.
  // FIX: Initialize useRef with an initial value of undefined.
  const prevLangRef = useRef<Language | undefined>(undefined);

  const selectedScale = SCALES[selectedScaleKey as keyof typeof SCALES];

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
      // Heuristic to find lines with chord progressions (e.g., "C - G - Am - F")
      if (line.includes(' - ') && /[A-G]/.test(line)) {
        const parts = line.split(/(\s-\s)/); // Split by " - " but keep the delimiter
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
              {Object.entries(SCALES).map(([key, scale]) => (
                <option key={key} value={key}>{scale.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="time-sig-select" className="block text-sm font-medium text-brand-text-muted mb-2">{text.timeSignature}</label>
            <select
              id="time-sig-select"
              value={timeSignature}
              onChange={(e) => setTimeSignature(e.target.value)}
              className="w-full p-3 bg-brand-primary border border-brand-surface rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none"
            >
              {TIME_SIGNATURES.map((sig) => (
                <option key={sig} value={sig}>{sig}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={fetchProgressions}
          disabled={isLoading}
          className="w-full bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {text.regenerate}
        </button>
      </div>

      <ContentDisplay content={progressions} isLoading={isLoading} error={error}>
        {progressions && renderInteractiveProgressions(progressions)}
      </ContentDisplay>
    </div>
  );
};

export default ChordProgressionsScreen;
