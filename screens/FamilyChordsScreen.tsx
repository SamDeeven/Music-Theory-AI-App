import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SCALES, CHORDS } from '../constants';
import { getDiatonicChords } from '../utils/musicTheory';
import TransposeControl from '../components/TransposeControl';
import { Note } from '../types';

const FamilyChordsScreen: React.FC = () => {
  const { text } = useLanguage();
  const navigate = useNavigate();
  const [rootNote, setRootNote] = useState<Note>('C');
  const [selectedScaleKey, setSelectedScaleKey] = useState('major');

  const selectedScale = SCALES[selectedScaleKey as keyof typeof SCALES];
  
  const diatonicChords = useMemo(
    () => getDiatonicChords(rootNote, selectedScale.intervals),
    [rootNote, selectedScale]
  );
  
  const romanNumerals = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
  
  const handleChordClick = (chordName: string, chordType: string) => {
    const root = chordName.match(/^[A-G](?:#|b)?/)?.[0];
    const typeKey = Object.entries(CHORDS).find(([, val]) => val.name.toLowerCase() === chordType.toLowerCase())?.[0];

    if (root && typeKey) {
        navigate(`/chords?root=${root}&type=${typeKey}`);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-white hidden md:block">{text.familyChords}</h1>
      
      <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

        <h2 className="text-2xl font-semibold mb-4 text-center text-brand-secondary">
          {text.diatonicChords}: {rootNote} {selectedScale.name}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {diatonicChords.map((chord, i) => (
            <button 
                key={chord.name} 
                onClick={() => handleChordClick(chord.name, chord.type)}
                className="flex flex-col items-center p-4 bg-brand-primary rounded-lg text-center hover:bg-brand-secondary transition-colors duration-200"
            >
              <span className="text-2xl font-bold text-white">{romanNumerals[i]}</span>
              <span className="text-lg mt-1 text-brand-text-muted">{chord.name}</span>
              <span className="text-sm mt-1 text-brand-secondary">{chord.type}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FamilyChordsScreen;