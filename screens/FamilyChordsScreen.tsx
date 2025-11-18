import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { SCALE_TYPES, PDF_THEORY_TEXT, FAMILY_CHORD_RULES } from '../constants';
import { generateFamilyChords, getRelativeKey } from '../utils/musicTheory';
import TransposeControl from '../components/TransposeControl';
import { Note } from '../types';

const FamilyChordsScreen: React.FC = () => {
  const { language, text } = useLanguage();
  const navigate = useNavigate();
  const [rootNote, setRootNote] = useState<Note>('C');
  const [selectedScaleType, setSelectedScaleType] = useState('major');
  const [showExplanation, setShowExplanation] = useState(false);

  const familyChords = useMemo(() => generateFamilyChords(rootNote, selectedScaleType), [rootNote, selectedScaleType]);
  const relativeKey = useMemo(() => getRelativeKey(rootNote, selectedScaleType), [rootNote, selectedScaleType]);
  const theoryText = PDF_THEORY_TEXT[language].progressions;
  
  const isMinor = selectedScaleType.toLowerCase().includes('minor');
  const relativeLabel = isMinor ? 'Relative Major' : 'Relative Minor';

  // Get derivation rules
  let derivationRules: string[] = [];
  if (isMinor) {
      derivationRules = FAMILY_CHORD_RULES.minor[language];
  } else {
      derivationRules = FAMILY_CHORD_RULES.major[language];
  }

  const handleChordClick = (chordName: string) => {
      const parsedRoot = chordName.match(/^[A-G](?:#)?/)?.[0];
      let typeKey = 'major';
      if (chordName.includes('m') && !chordName.includes('dim')) typeKey = 'minor';
      if (chordName.includes('dim')) typeKey = 'diminished';
      if (chordName.includes('aug')) typeKey = 'augmented';

      if (parsedRoot) {
          navigate(`/chords?root=${parsedRoot}&type=${typeKey}`);
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
            <label className="block text-sm font-medium text-brand-text-muted mb-2">{text.selectScale}</label>
            <select
                value={selectedScaleType}
                onChange={(e) => setSelectedScaleType(e.target.value)}
                className="w-full p-3 bg-brand-primary border border-brand-surface rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none"
            >
                {SCALE_TYPES.map(type => (
                    <option key={type.value} value={type.value}>{type.label}</option>
                ))}
            </select>
          </div>
        </div>

        <div className="bg-brand-primary p-6 rounded-lg border border-brand-surface">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b border-brand-surface pb-4 gap-2">
                <h2 className="text-2xl font-bold text-white">{rootNote} {SCALE_TYPES.find(t => t.value === selectedScaleType)?.label}</h2>
                {relativeKey && (
                    <span className="text-brand-text-muted bg-brand-surface px-3 py-1 rounded-full text-sm">
                        {relativeLabel}: <span className="text-brand-secondary font-bold">{relativeKey.replace(/ Major| Minor/, '')}</span>
                    </span>
                )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {familyChords.map((item, index) => (
                    <button
                        key={`${item.degree}-${index}`}
                        onClick={() => handleChordClick(item.chord)}
                        className="flex flex-col items-center justify-center p-4 bg-brand-surface hover:bg-brand-secondary hover:text-white rounded-xl transition-all duration-200 group border border-brand-primary/50 hover:border-transparent"
                    >
                        <span className="text-xs font-bold opacity-50 mb-1 uppercase tracking-wider group-hover:text-white/80">{item.degree}</span>
                        <span className="text-xl font-bold">{item.chord}</span>
                        <span className="text-xs opacity-70 mt-1 capitalize group-hover:text-white/90">{item.type}</span>
                    </button>
                ))}
            </div>
        </div>

        {showExplanation && (
            <div className="mt-6 p-4 bg-brand-primary/30 rounded-lg border border-brand-primary">
                <p className="text-brand-text-muted text-sm space-y-2 mb-4">
                    {theoryText.family}
                </p>
                
                {derivationRules && derivationRules.length > 0 && (
                    <div className="pt-3 border-t border-brand-primary/50">
                        <h4 className="text-white font-semibold mb-2 text-sm">Chord Derivation Rules:</h4>
                        <ul className="list-disc list-inside text-sm text-brand-text-muted space-y-1">
                            {derivationRules.map((rule, i) => (
                                <li key={i}>{rule}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        )}

        <button
            onClick={() => setShowExplanation(true)}
            className="mt-4 w-full bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity"
        >
            {text.getExplanation}
        </button>

      </div>
    </div>
  );
};

export default FamilyChordsScreen;