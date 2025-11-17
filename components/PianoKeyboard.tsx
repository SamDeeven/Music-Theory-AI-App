import React from 'react';

interface PianoKeyboardProps {
  highlightedNotes: string[];
  octaves?: number;
}

const PianoKey: React.FC<{
  note: string;
  isBlack: boolean;
  isHighlighted: boolean;
  style: React.CSSProperties;
}> = ({ note, isBlack, isHighlighted, style }) => {
  const noteName = note.slice(0, -1); // Remove octave number
  const keyColor = isBlack ?
    (isHighlighted ? 'bg-brand-secondary' : 'bg-gray-800') :
    (isHighlighted ? 'bg-brand-secondary' : 'bg-white');

  return (
    <div
      className={`absolute h-full border-2 border-brand-primary rounded-b-md ${keyColor} transition-transform active:scale-95`}
      style={style}
    >
      <span className={`absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold ${isBlack ? 'text-white' : 'text-brand-primary'}`}>
        {noteName}
      </span>
    </div>
  );
};

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({ highlightedNotes, octaves = 1 }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys: { [key: string]: string } = { C: 'C#', D: 'D#', F: 'F#', G: 'G#', A: 'A#' };
  
  const totalWhiteKeys = whiteKeys.length * octaves;
  const whiteKeyWidth = 100 / totalWhiteKeys;

  const renderOctave = (octaveNum: number) => {
    const keys = [];
    // White keys
    for (let i = 0; i < whiteKeys.length; i++) {
      const key = whiteKeys[i];
      const noteWithOctave = `${key}${octaveNum}`;
      keys.push(
        <PianoKey
          key={noteWithOctave}
          note={noteWithOctave}
          isBlack={false}
          isHighlighted={highlightedNotes.includes(noteWithOctave)}
          style={{ 
            left: `${(i + (octaveNum - 4) * 7) * whiteKeyWidth}%`,
            width: `${whiteKeyWidth}%`,
            zIndex: 1
          }}
        />
      );
    }
    // Black keys
     for (let i = 0; i < whiteKeys.length; i++) {
      const key = whiteKeys[i];
      if (blackKeys[key]) {
        const noteWithOctave = `${blackKeys[key]}${octaveNum}`;
        keys.push(
            <PianoKey
              key={noteWithOctave}
              note={noteWithOctave}
              isBlack={true}
              isHighlighted={highlightedNotes.includes(noteWithOctave)}
              style={{
                left: `${((i + (octaveNum - 4) * 7) + 1) * whiteKeyWidth - (whiteKeyWidth * 0.35)}%`,
                width: `${whiteKeyWidth * 0.7}%`,
                height: '66.66%',
                zIndex: 2
              }}
            />
        );
      }
    }
    return keys;
  }

  return (
    <div className="relative w-full h-32 md:h-40 select-none my-4">
      {Array.from({ length: octaves }, (_, i) => renderOctave(i + 4))}
    </div>
  );
};

export default PianoKeyboard;