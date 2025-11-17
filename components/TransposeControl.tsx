
import React from 'react';
import { ALL_NOTES_SHARP } from '../constants';
import { Note } from '../types';

interface TransposeControlProps {
  rootNote: Note;
  setRootNote: (note: Note) => void;
}

const TransposeControl: React.FC<TransposeControlProps> = ({ rootNote, setRootNote }) => {
  return (
    <div className="relative">
      <select
        value={rootNote}
        onChange={(e) => setRootNote(e.target.value as Note)}
        className="w-full p-3 bg-brand-primary border border-brand-surface rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none appearance-none text-center text-xl font-bold"
      >
        {ALL_NOTES_SHARP.map(note => (
          <option key={note} value={note}>{note}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-text">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default TransposeControl;
