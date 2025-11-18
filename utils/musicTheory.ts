
import { ALL_NOTES_SHARP, CHORDS, SCALES } from '../constants';
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

export const getRelativeKey = (rootNote: Note, type: string): string | null => {
    const notes = getNotesArray();
    const rootIndex = notes.indexOf(rootNote);
    if (rootIndex === -1) return null;

    // Normalize scale type string check
    const lowerType = type.toLowerCase();
    // Explicitly assume Major if 'major' is in name but not 'minor' (e.g. Pentatonic Major)
    // If type is just 'major', isMajor = true.
    // If type is 'naturalMinor', isMinor = true.
    const isMinor = lowerType.includes('minor');
    const isMajor = !isMinor; // Default to major logic if not explicitly minor

    if (isMajor) {
        // Relative Minor is 6th degree (9 semitones up or 3 semitones down)
        const relativeIndex = (rootIndex + 9) % 12;
        return `${notes[relativeIndex]} Minor`;
    } else {
        // Relative Major is 3rd degree (3 semitones up)
        const relativeIndex = (rootIndex + 3) % 12;
        return `${notes[relativeIndex]} Major`;
    }
};

// Helper to determine chord quality from intervals (0, 3/4, 6/7/8)
const getChordQuality = (intervals: number[]): string => {
    const third = intervals[1];
    const fifth = intervals[2];
    
    if (third === 4 && fifth === 7) return 'Major';
    if (third === 3 && fifth === 7) return 'minor';
    if (third === 3 && fifth === 6) return 'diminished';
    if (third === 4 && fifth === 8) return 'augmented';
    return 'Major'; // Default fallback
};

export const generateFamilyChords = (rootNote: Note, scaleType: string): { degree: string, chord: string, type: string }[] => {
    // For family chords, we generally map pentatonic/blues to their parent Major/Natural Minor scales
    // because they are subsets and "family chords" usually implies the full diatonic set.
    let targetScaleType = scaleType;
    if (scaleType.includes('majorBlues') || scaleType.includes('pentatonicMajor')) targetScaleType = 'major';
    if (scaleType.includes('minorBlues') || scaleType.includes('pentatonicMinor')) targetScaleType = 'naturalMinor';
    
    const scaleConfig = SCALES[targetScaleType as keyof typeof SCALES] || SCALES.major;
    const notes = getNotesArray();
    const rootIndex = notes.indexOf(rootNote);
    
    // Generate 7 diatonic notes for the scale
    // We need the full 7 notes even for pentatonic mapping to generate standard I-vii family chords
    const fullNotes: Note[] = [];
    let currentIndex = rootIndex;
    
    // We use intervals. If it's already 7 notes (major/minor), use as is. 
    for (let i = 0; i < scaleConfig.intervals.length; i++) {
        fullNotes.push(notes[currentIndex]);
        currentIndex = (currentIndex + scaleConfig.intervals[i]) % 12;
    }
    // Remove octave if present
    if (fullNotes.length > 7) fullNotes.length = 7;

    const familyChords = fullNotes.map((note, index) => {
        // Build a triad for each note: 1 - 3 - 5 relative to that note WITHIN the scale notes
        // e.g. in C Major (C D E F G A B), for D (index 1), we need F (index 3) and A (index 5).
        // Indices wrap around the 7-note scale array.
        const root = fullNotes[index];
        const third = fullNotes[(index + 2) % 7];
        const fifth = fullNotes[(index + 4) % 7];
        
        // Calculate actual intervals in semitones to determine quality
        const rIdx = notes.indexOf(root);
        let tIdx = notes.indexOf(third);
        let fIdx = notes.indexOf(fifth);
        
        if (tIdx < rIdx) tIdx += 12;
        if (fIdx < rIdx) fIdx += 12;
        
        const i3 = tIdx - rIdx;
        const i5 = fIdx - rIdx;
        
        const quality = getChordQuality([0, i3, i5]);
        
        let suffix = '';
        if (quality === 'minor') suffix = 'm';
        if (quality === 'diminished') suffix = 'dim';
        if (quality === 'augmented') suffix = 'aug';
        
        // Roman numerals logic
        const romanNumeralsMajor = ['I', 'ii', 'iii', 'IV', 'V', 'vi', 'vii°'];
        const romanNumeralsMinor = ['i', 'ii°', 'III', 'iv', 'v', 'VI', 'VII']; // Natural Minor
        
        let degree = (targetScaleType.includes('minor')) 
            ? romanNumeralsMinor[index] 
            : romanNumeralsMajor[index];

        // Harmonic Minor adjustments if specifically requested
        if (scaleType === 'harmonicMinor') {
             if (index === 4) { suffix = ''; } // V becomes Major
             if (index === 6) { suffix = 'dim'; degree = 'vii°'; } // vii dim
        }

        return {
            degree: degree || `${index + 1}`,
            chord: `${root}${suffix}`,
            type: quality
        };
    });

    return familyChords;
};

export const getChordFromRomanNumeral = (rootNote: Note, scaleType: string, roman: string): string => {
    const isMinor = scaleType.toLowerCase().includes('minor') && !scaleType.toLowerCase().includes('relative');
    const scaleToUse = isMinor ? SCALES.naturalMinor : SCALES.major;
    
    const notes = getNotesArray();
    const rootIndex = notes.indexOf(rootNote);
    
    const romanMap: Record<string, number> = {
        'I': 0, 'i': 0,
        'II': 1, 'ii': 1, 
        'III': 2, 'iii': 2,
        'IV': 3, 'iv': 3,
        'V': 4, 'v': 4,
        'VI': 5, 'vi': 5,
        'VII': 6, 'vii': 6
    };
    
    const cleanRoman = roman.replace(/[°+b#]/g, '');
    const degreeIndex = romanMap[cleanRoman];
    
    if (degreeIndex === undefined) return '';

    let semitones = 0;
    for(let i=0; i<degreeIndex; i++) {
        semitones += scaleToUse.intervals[i];
    }
    
    let noteIndex = (rootIndex + semitones) % 12;
    let chordRoot = notes[noteIndex];

    const isUpperCase = /^[A-Z]/.test(cleanRoman);
    const isDiminished = roman.includes('°') || roman.includes('dim');
    const isAugmented = roman.includes('+');
    
    let suffix = '';
    if (isDiminished) suffix = 'dim';
    else if (isAugmented) suffix = 'aug';
    else if (!isUpperCase) suffix = 'm';
    
    return `${chordRoot}${suffix}`;
};
