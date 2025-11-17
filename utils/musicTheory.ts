import { ALL_NOTES_SHARP, CHORDS } from '../constants';
import { Note } from '../types';

export const getNotesArray = (): Note[] => {
    return ALL_NOTES_SHARP;
};

export const generateScaleNotes = (rootNote: Note, intervals: number[]): Note[] => {
    const notes = getNotesArray();
    const scaleNotes: Note[] = [rootNote];
    let currentIndex = notes.indexOf(rootNote);

    if(currentIndex === -1) return [];

    for (const interval of intervals) {
        currentIndex = (currentIndex + interval) % 12;
        scaleNotes.push(notes[currentIndex]);
    }
    scaleNotes.pop(); // Last note is octave of root, remove it for typical scale display
    return scaleNotes;
};

export const generateChordNotes = (rootNote: Note, intervals: number[]): Note[] => {
    const notes = getNotesArray();
    const chordNotes: Note[] = [];
    const rootIndex = notes.indexOf(rootNote);

    if(rootIndex === -1) return [];

    for (const interval of intervals) {
        const noteIndex = (rootIndex + interval) % 12;
        chordNotes.push(notes[noteIndex]);
    }
    return chordNotes;
};

export const generateChordInversions = (rootNote: Note, intervals: number[]): { nameKey: string, notes: string[] }[] => {
    const notesWithOctave = (startNote: Note, startOctave: number, chordIntervals: number[]): string[] => {
        const allNotes = getNotesArray();
        const rootIndex = allNotes.indexOf(startNote);
        if (rootIndex === -1) return [];

        let currentOctave = startOctave;
        let lastNoteIndex = -1;

        return chordIntervals.map(interval => {
            const noteIndex = (rootIndex + interval) % 12;
            if (lastNoteIndex !== -1 && noteIndex < lastNoteIndex) {
                currentOctave++;
            }
            lastNoteIndex = noteIndex;
            return `${allNotes[noteIndex]}${currentOctave}`;
        });
    };
    
    const baseNotes = generateChordNotes(rootNote, intervals);
    if (baseNotes.length === 0) return [];
    
    const inversions: { nameKey: string, notes: string[] }[] = [];
    const inversionNameKeys = ['rootPosition', 'firstInversion', 'secondInversion', 'thirdInversion'];

    // Root position
    inversions.push({
        nameKey: inversionNameKeys[0],
        notes: notesWithOctave(baseNotes[0], 4, intervals)
    });

    // Other inversions
    let previousNotes = [...baseNotes];
    for (let i = 0; i < baseNotes.length - 1; i++) {
        const firstNote = previousNotes.shift();
        if (firstNote) {
            previousNotes.push(firstNote);

            // Recalculate intervals from the new root of the inversion
            const newRoot = previousNotes[0];
            const newRootIndex = ALL_NOTES_SHARP.indexOf(newRoot);
            const relativeIntervals = previousNotes.map(note => {
                let noteIndex = ALL_NOTES_SHARP.indexOf(note);
                return (noteIndex - newRootIndex + 12) % 12;
            });
            
            inversions.push({
                nameKey: inversionNameKeys[i + 1],
                notes: notesWithOctave(newRoot, 4, relativeIntervals)
            });
        }
    }
    
    return inversions;
};


export const getDiatonicChords = (rootNote: Note, scaleIntervals: number[]): { name: string, type: string }[] => {
    const scaleNotes = generateScaleNotes(rootNote, scaleIntervals);
    // Major scale pattern is the reference for chord qualities
    const chordQualities = ['Major', 'minor', 'minor', 'Major', 'Major', 'minor', 'diminished'];

    return scaleNotes.map((note, i) => {
        return { name: `${note}${chordQualities[i] === 'diminished' ? 'dim' : chordQualities[i] === 'minor' ? 'm' : '' }`, type: chordQualities[i] };
    });
};

export const parseChord = (chordSymbol: string): { root: Note; typeKey: keyof typeof CHORDS } | null => {
  const noteMatch = chordSymbol.trim().match(/^[A-G](?:#)?/);
  if (!noteMatch) return null;
  
  const root = noteMatch[0];
  const qualitySymbol = chordSymbol.trim().substring(root.length);

  const qualityMap: { [key: string]: keyof typeof CHORDS } = {
    '': 'major',
    'm': 'minor',
    'min': 'minor',
    'dim': 'diminished',
    '°': 'diminished',
    'aug': 'augmented',
    '+': 'augmented',
    '7': 'dominant7',
    'M7': 'major7',
    'maj7': 'major7',
    'm7': 'minor7',
  };
  
  const typeKey = qualityMap[qualitySymbol];
  
  if (typeKey && CHORDS[typeKey]) {
      return { root, typeKey };
  }

  return { root, typeKey: 'major'}; // Fallback to major
}