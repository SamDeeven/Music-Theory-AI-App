
import { Language } from './types';

export const ALL_NOTES_SHARP = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const SCALES = {
    major: { name: 'Major', intervals: [2, 2, 1, 2, 2, 2, 1] },
    naturalMinor: { name: 'Natural Minor', intervals: [2, 1, 2, 2, 1, 2, 2] },
    harmonicMinor: { name: 'Harmonic Minor', intervals: [2, 1, 2, 2, 1, 3, 1] },
    melodicMinor: { name: 'Melodic Minor', intervals: [2, 1, 2, 2, 2, 2, 1] },
    majorBlues: { name: 'Major Blues', intervals: [2, 1, 1, 3, 2, 3] },
    minorBlues: { name: 'Minor Blues', intervals: [3, 2, 1, 1, 3, 2] },
    pentatonicMajor: { name: 'Pentatonic Major', intervals: [2, 2, 3, 2, 3] },
    pentatonicMinor: { name: 'Pentatonic Minor', intervals: [3, 2, 2, 3, 2] },
    wholeTone: { name: 'Whole Tone', intervals: [2, 2, 2, 2, 2, 2] },
};

export const SCALE_TYPES = [
    { label: 'Major Scale', value: 'major' },
    { label: 'Natural Minor Scale', value: 'naturalMinor' },
    { label: 'Harmonic Minor Scale', value: 'harmonicMinor' },
    { label: 'Melodic Minor Scale', value: 'melodicMinor' },
    { label: 'Pentatonic Major', value: 'pentatonicMajor' },
    { label: 'Pentatonic Minor', value: 'pentatonicMinor' },
    { label: 'Blues Major', value: 'majorBlues' },
    { label: 'Blues Minor', value: 'minorBlues' },
];

export const KEY_SIGNATURES: Record<string, { en: string, te: string }> = {
    'C Major': { en: "Zero sharps or flats", te: "ఎటువంటి షార్ప్స్ లేదా ఫ్లాట్స్ లేవు" },
    'G Major': { en: "1 sharp", te: "1 షార్ప్" },
    'D Major': { en: "2 sharps", te: "2 షార్ప్స్" },
    'A Major': { en: "3 sharps", te: "3 షార్ప్స్" },
    'E Major': { en: "4 sharps", te: "4 షార్ప్స్" },
    'B Major': { en: "5 sharps", te: "5 షార్ప్స్" },
    'F# Major': { en: "6 sharps", te: "6 షార్ప్స్" },
    'C# Major': { en: "7 sharps", te: "7 షార్ప్స్" },
    'F Major': { en: "1 flat", te: "1 ఫ్లాట్" },
    'A# Major': { en: "2 flats (Bb)", te: "2 ఫ్లాట్స్" }, // Represented as A# in app logic
    'D# Major': { en: "3 flats (Eb)", te: "3 ఫ్లాట్స్" }, // Represented as D#
    'G# Major': { en: "4 flats (Ab)", te: "4 ఫ్లాట్స్" }, // Represented as G#
    'C# Major (Db)': { en: "5 flats (Db)", te: "5 ఫ్లాట్స్" },
    'F# Major (Gb)': { en: "6 flats (Gb)", te: "6 ఫ్లాట్స్" },
    // Minor equivalents (using relative major logic mostly, but specific listing from PDF)
    'A Minor': { en: "Zero sharps or flats", te: "ఎటువంటి షార్ప్స్ లేదా ఫ్లాట్స్ లేవు" },
    'E Minor': { en: "1 sharp", te: "1 షార్ప్" },
    'B Minor': { en: "2 sharps", te: "2 షార్ప్స్" },
    'F# Minor': { en: "3 sharps", te: "3 షార్ప్స్" },
    'C# Minor': { en: "4 sharps", te: "4 షార్ప్స్" },
    'G# Minor': { en: "5 sharps", te: "5 షార్ప్స్" },
    'D# Minor': { en: "6 sharps", te: "6 షార్ప్స్" },
    'A# Minor': { en: "7 sharps", te: "7 షార్ప్స్" },
    'D Minor': { en: "1 flat", te: "1 ఫ్లాట్" },
    'G Minor': { en: "2 flats", te: "2 ఫ్లాట్స్" },
    'C Minor': { en: "3 flats", te: "3 ఫ్లాట్స్" },
    'F Minor': { en: "4 flats", te: "4 ఫ్లాట్స్" },
};

export const FAMILY_CHORD_RULES = {
    major: {
        [Language.EN]: [
            "1st, 4th, 5th: Major Chords",
            "2nd, 3rd, 6th: Minor Chords",
            "7th: Diminished Chord"
        ],
        [Language.TE]: [
            "1వ, 4వ, 5వ: మేజర్ కార్డ్స్ (Major Chords)",
            "2వ, 3వ, 6వ: మైనర్ కార్డ్స్ (Minor Chords)",
            "7వ: డిమినిష్డ్ కార్డ్ (Diminished Chord)"
        ]
    },
    minor: {
        [Language.EN]: [
            "1st, 4th, 5th: Minor Chords",
            "3rd, 6th, 7th: Major Chords",
            "2nd: Diminished Chord"
        ],
        [Language.TE]: [
            "1వ, 4వ, 5వ: మైనర్ కార్డ్స్ (Minor Chords)",
            "3వ, 6వ, 7వ: మేజర్ కార్డ్స్ (Major Chords)",
            "2వ: డిమినిష్డ్ కార్డ్ (Diminished Chord)"
        ]
    }
};

export const PROGRESSION_GUIDE = {
    [Language.EN]: {
        rules: [
            { title: "Matching the Melody Note", text: "The harmony matches only when the note being pressed or landed on is present in the chord being used. If the note is not in the chord, it results in dissonance." },
            { title: "The Ending Card Rule", text: "The final chord played must contain the ending note (the note on which the melody stops). If the melody lands on G, the ending card must contain G." },
            { title: "Home Card (Tonic Card)", text: "For a song played in G major, the G major card is considered the Home Card or Tonic Card (the scale's owner card)." },
            { title: "Relative Minor Exemption", text: "Both the Tonic Card (e.g., G major) and its Relative Minor (e.g., E minor) will 'almost match' any note played within the scale." }
        ],
        timing: [
            "Timing Over Selection: Playing the same chords at the wrong time (too early/late) can fail to meet harmony.",
            "Duration: Determine how long to hold a chord (how many beats or bars).",
            "Experiment: Try playing chords on beat one, skipping beat two, or playing on the 'and' beat."
        ]
    },
    [Language.TE]: {
        rules: [
             { title: "మెలోడీ నోట్ (Melody Note) తో సరిపోల్చడం", text: "మెలోడీలో ప్లే చేస్తున్న నోట్, మీరు వాయించే కార్డ్ (Chord) లో ఉన్నప్పుడు మాత్రమే హార్మొనీ (Harmony) కుదురుతుంది. లేకపోతే అది వినడానికి బాగోదు (Dissonance)." },
             { title: "ఎండింగ్ కార్డ్ రూల్ (Ending Card Rule)", text: "పాట ఏ నోట్ తో ముగుస్తుందో, చివరిగా వాయించే కార్డ్ లో ఆ నోట్ కచ్చితంగా ఉండాలి." },
             { title: "హోమ్ కార్డ్ (Home Card)", text: "ఒక పాట G మేజర్ లో ఉంటే, G మేజర్ కార్డ్ ను హోమ్ కార్డ్ లేదా టానిక్ కార్డ్ అంటారు." },
             { title: "రిలేటివ్ మైనర్ మినహాయింపు", text: "టానిక్ కార్డ్ మరియు దాని రిలేటివ్ మైనర్ కార్డ్ రెండూ స్కేల్ లోని చాలా నోట్స్ తో దాదాపుగా మ్యాచ్ అవుతాయి." }
        ],
        timing: [
            "టైమింగ్ (Timing) ముఖ్యం: సరైన కార్డ్స్ ఎంచుకున్నా, తప్పు టైమ్ లో వాయిస్తే హార్మొనీ కుదరదు.",
            "డ్యూరేషన్ (Duration): ఒక కార్డ్ ను ఎంత సేపు (ఎన్ని బీట్స్) హోల్డ్ చేయాలో నిర్ణయించుకోండి.",
            "ప్రయోగం: మొదటి బీట్ లో కార్డ్ వాయించడం, లేదా బీట్స్ మధ్యలో వాయించడం వంటివి ప్రయత్నించండి."
        ]
    }
};

export const PROGRESSION_TEMPLATES = {
    major: [
        { id: 1, numerals: ['I', 'vi', 'V', 'IV'] },
        { id: 2, numerals: ['I', 'V', 'vi', 'IV'] },
        { id: 3, numerals: ['I', 'ii', 'V', 'I'] },
        { id: 4, numerals: ['I', 'IV', 'V', 'I'] },
        { id: 5, numerals: ['I', 'V', 'IV', 'I'] },
        { id: 6, numerals: ['I', 'V', 'vi', 'IV'] }, // Duplicate in source, kept for consistency or popularity
        { id: 7, numerals: ['IV', 'V', 'iii', 'vi'] },
        { id: 8, numerals: ['vi', 'IV', 'I', 'V'] },
        { id: 9, numerals: ['I', 'vi', 'IV', 'V'] },
        { id: 10, numerals: ['I', 'IV', 'vi', 'V'] },
        { id: 11, numerals: ['I', 'iii', 'IV', 'V'] },
        { id: 12, numerals: ['vi', 'V', 'IV', 'I'] },
        { id: 13, numerals: ['I', 'iii', 'vi', 'IV'] },
        { id: 14, numerals: ['I', 'vi', 'iii', 'IV'] },
        { id: 15, numerals: ['I', 'ii', 'iii', 'IV'] },
        { id: 16, numerals: ['I', 'IV', 'ii', 'V'] },
        { id: 17, numerals: ['I', 'iii', 'IV', 'V', 'I'] },
        { id: 18, numerals: ['I', 'vi', 'ii', 'V'] },
        { id: 19, numerals: ['I', 'vi', 'ii', 'V', 'I'] },
    ],
    minor: [
        { id: 1, numerals: ['i', 'VII', 'VI', 'V'] }, // V is Major in harmonic minor context commonly used
        { id: 2, numerals: ['i', 'VI', 'III', 'VII'] },
        { id: 3, numerals: ['i', 'v', 'VI', 'iv'] }, // v or V depending on context, source implies Em in Am -> v
        { id: 4, numerals: ['i', 'III', 'VII', 'iv'] },
        { id: 5, numerals: ['i', 'VI', 'VII', 'i'] },
        { id: 6, numerals: ['i', 'VII', 'III', 'VI'] },
        { id: 7, numerals: ['i', 'VI', 'III', 'VII'] }, // Duplicate
        { id: 8, numerals: ['i', 'VI', 'iv', 'V'] }, // E is V
        { id: 9, numerals: ['i', 'v', 'VI', 'III'] },
        { id: 10, numerals: ['i', 'III', 'VI', 'VII'] },
        { id: 11, numerals: ['i', 'iv', 'V', 'i'] },
        { id: 12, numerals: ['i', 'VII', 'VI', 'V'] }, // Duplicate
        { id: 14, numerals: ['i', 'VI', 'v', 'i'] },
        { id: 15, numerals: ['i', 'v', 'III', 'VII', 'i'] },
        { id: 16, numerals: ['i', 'VII', 'VI', 'v', 'i'] },
    ]
};

export const SCALE_FORMULAS = {
    [Language.EN]: {
        major: "Tone - Tone - Semitone - Tone - Tone - Tone - Semitone",
        naturalMinor: "Tone - Semitone - Tone - Tone - Semitone - Tone - Tone",
        harmonicMinor: "Tone - Semitone - Tone - Tone - Semitone - Tone+Semitone - Semitone",
        melodicMinor: "Ascending: Tone - Semitone - Tone - Tone - Tone - Tone - Semitone",
        majorBlues: "Tone - Semitone - Semitone - Tone+Semitone - Tone - Tone+Semitone",
        minorBlues: "Tone+Semitone - Tone - Semitone - Semitone - Tone+Semitone - Tone",
        pentatonicMajor: "Tone - Tone - Tone+Semitone - Tone - Tone+Semitone",
        pentatonicMinor: "Tone+Semitone - Tone - Tone - Tone+Semitone - Tone",
        wholeTone: "Tone - Tone - Tone - Tone - Tone - Tone"
    },
    [Language.TE]: {
        major: "టోన్ - టోన్ - సెమిటోన్ - టోన్ - టోన్ - టోన్ - సెమిటోన్",
        naturalMinor: "టోన్ - సెమిటోన్ - టోన్ - టోన్ - సెమిటోన్ - టోన్ - టోన్",
        harmonicMinor: "టోన్ - సెమిటోన్ - టోన్ - టోన్ - సెమిటోన్ - టోన్+సెమిటోన్ - సెమిటోన్",
        melodicMinor: "ఆరోహణ (Ascending): టోన్ - సెమిటోన్ - టోన్ - టోన్ - టోన్ - టోన్ - సెమిటోన్",
        majorBlues: "టోన్ - సెమిటోన్ - సెమిటోన్ - టోన్+సెమిటోన్ - టోన్ - టోన్+సెమిటోన్",
        minorBlues: "టోన్+సెమిటోన్ - టోన్ - సెమిటోన్ - సెమిటోన్ - టోన్+సెమిటోన్ - టోన్",
        pentatonicMajor: "టోన్ - టోన్ - టోన్+సెమిటోన్ - టోన్ - టోన్+సెమిటోన్",
        pentatonicMinor: "టోన్+సెమిటోన్ - టోన్ - టోన్ - టోన్+సెమిటోన్ - టోన్",
        wholeTone: "టోన్ - టోన్ - టోన్ - టోన్ - టోన్ - టోన్"
    }
};

export const CHORDS = {
    major: { name: 'Major', intervals: [0, 4, 7] },
    minor: { name: 'Minor', intervals: [0, 3, 7] },
    diminished: { name: 'Diminished', intervals: [0, 3, 6] },
    augmented: { name: 'Augmented', intervals: [0, 4, 8] },
    major7: { name: 'Major 7th', intervals: [0, 4, 7, 11] },
    minor7: { name: 'Minor 7th', intervals: [0, 3, 7, 10] },
    dominant7: { name: 'Dominant 7th', intervals: [0, 4, 7, 10] },
    major6: { name: 'Major 6th', intervals: [0, 4, 7, 9] },
    minor6: { name: 'Minor 6th', intervals: [0, 3, 7, 9] },
    sus2: { name: 'Sus2', intervals: [0, 2, 7] },
    sus4: { name: 'Sus4', intervals: [0, 5, 7] },
};

export const CHORD_DESCRIPTIONS = {
    [Language.EN]: {
        major: "Sound bright, happy, and positive. Formula: 1 - 3 - 5",
        minor: "Sound dark, sad, and negative. Formula: 1 - 3b - 5",
        diminished: "Gives odd and unpleasant sound. Dim means to reduce. Formula: 1 - 2# - 4# (or 1 - 3b - 5b)",
        augmented: "Gives very odd sound. Aug means to raise. Formula: 1 - 3 - 5#",
        major7: "Adds a jazzy or emotional sound. Play Major chord + 7th note. Formula: 1 - 3 - 5 - 7",
        minor7: "Adds depth and emotion. Play Minor chord + 7th note. Formula: 1 - 3b - 5 - 7",
        dominant7: "Strong tension, wants to resolve. Major chord + flat 7th. Formula: 1 - 3 - 5 - 7b",
        major6: "Soft and sweet sound. Major chord + 6th note. Formula: 1 - 3 - 5 - 6",
        minor6: "Soft and sweet with minor quality. Minor chord + 6th note. Formula: 1 - 3b - 5 - 6",
        sus2: "Open, floating sound. Creates a transition feeling. Formula: 1 - 2 - 5",
        sus4: "Open, floating sound. Stronger tension than Sus2. Formula: 1 - 4 - 5",
    },
    [Language.TE]: {
        major: "వినడానికి బ్రైట్ (Bright) గా, సంతోషంగా (Happy) మరియు పాజిటివ్ (Positive) గా ఉంటుంది. ఫార్ములా: 1 - 3 - 5",
        minor: "వినడానికి డార్క్ (Dark) గా, విచారంగా (Sad) మరియు నెగటివ్ (Negative) గా ఉంటుంది. ఫార్ములా: 1 - 3b - 5",
        diminished: "వినడానికి వింతగా (Odd) మరియు అసహ్యంగా (Unpleasant) ఉంటుంది. డిమ్ (Dim) అంటే తగ్గించడం. ఫార్ములా: 1 - 2# - 4# (లేదా 1 - 3b - 5b)",
        augmented: "చాలా వింతగా (Odd) వినిపిస్తుంది. ఆగ్ (Aug) అంటే పెంచడం. ఫార్ములా: 1 - 3 - 5#",
        major7: "జాజీ (Jazzy) లేదా ఎమోషనల్ సౌండ్ ఇస్తుంది. మేజర్ కార్డ్ + 7వ నోట్. ఫార్ములా: 1 - 3 - 5 - 7",
        minor7: "లోతు మరియు ఎమోషన్ ఇస్తుంది. మైనర్ కార్డ్ + 7వ నోట్. ఫార్ములా: 1 - 3b - 5 - 7",
        dominant7: "బలమైన టెన్షన్ (Tension) ఇస్తుంది, రిజాల్వ్ అవ్వాలనిపిస్తుంది. మేజర్ కార్డ్ + ఫ్లాట్ 7th. ఫార్ములా: 1 - 3 - 5 - 7b",
        major6: "మృదువైన (Soft) మరియు స్వీట్ (Sweet) సౌండ్. మేజర్ కార్డ్ + 6వ నోట్. ఫార్ములా: 1 - 3 - 5 - 6",
        minor6: "మైనర్ ఫీల్ తో మృదువైన సౌండ్. మైనర్ కార్డ్ + 6వ నోట్. ఫార్ములా: 1 - 3b - 5 - 6",
        sus2: "ఓపెన్ (Open), ఫ్లోటింగ్ (Floating) సౌండ్. మార్పు (Transition) భావనను కలిగిస్తుంది. ఫార్ములా: 1 - 2 - 5",
        sus4: "ఓపెన్, ఫ్లోటింగ్ సౌండ్. Sus2 కంటే బలమైన టెన్షన్. ఫార్ములా: 1 - 4 - 5",
    }
};

export const PDF_THEORY_TEXT = {
    [Language.EN]: {
        scales: {
            definition: "A scale is a set of musical notes ordered by pitch and has 7 notes. A scale ordered by increasing pitch is an ascending scale, and a scale ordered by decreasing pitch is a descending scale.",
            relative: "There are Relative scales. The Relative scales share the same notes but the only difference is the starting note. The major scale has relative minor scale which is on 6th degree of the major scale.",
            majorVsMinor: "Major scales sound bright, happy, and positive. Minor scales sound dark, sad, and negative. In any major scale, you will find semitones only between the 3rd & 4th and 7th & 8th degrees.",
            semitone: "Semi Tone is the distance between one note and the next immediate note (no keys in between).",
            tone: "Tone means it has two semitones. There should be a key between them."
        },
        chords: {
            definition: "If we play three or more notes at a time, then it is called as Chord. If only three notes are played at a time, those chords are called as Triads.",
            inversions: "A chord can be played in 3 different ways. Root position starts with Tonic. 1st Inversion starts with the 3rd note (bass). 2nd Inversion starts with the 5th note (bass).",
            relationship: "Everything related to Minor chord is compared with Major chord. That’s why flats and sharps are used in the chord formula.",
            susChords: "Sus stands for Suspended. The 3rd note of the Major chord is replaced by the 2nd note (Sus2) or the 4th note (Sus4)."
        },
        progressions: {
            family: "Every note in a scale has a chord which starts with that note in that scale i.e. family chord. For each scale, there will be a set of chords (both major and minor). These set of chords for a particular scale are called Family chords or Chord Progressions.",
            melody: "Usually a melody starts and ends with the tonic chord because it gives that particular scale feel. Usually the chords are played on the strong beat."
        },
        circleOfFifths: {
             definition: "This is the better way to remember chords. The Major chord is represented as capital letters and the Minor chord is represented as small letters.",
             fifths: "If we start from C and move in clockwise direction, then it is Circle of fifths. After C, there is G. It means, in C major scale, the fifth note is G.",
             fourths: "If we start from C and move in anti-clockwise direction, then it is Circle of fourths. After C, there is F. It means, in C major scale, the fourth note is F.",
             family: "The family chords are easily seen in this circle. For a major scale, select the tonic chord, one chord in clockwise direction and one in anti-clockwise direction. These 3 Major chords plus their relative minors form the Family Chords."
        }
    },
    [Language.TE]: {
        scales: {
            definition: "స్కేల్ (Scale) అనేది పిచ్ (Pitch) ద్వారా అమర్చబడిన సంగీత స్వరాల (Musical Notes) సమూహం, ఇందులో 7 నోట్స్ ఉంటాయి. పిచ్ పెరిగే క్రమంలో ఉంటే ఆరోహణ (Ascending) అని, తగ్గే క్రమంలో ఉంటే అవరోహణ (Descending) అని అంటారు.",
            relative: "రిలేటివ్ స్కేల్స్ (Relative Scales) ఉన్నాయి. ఈ స్కేల్స్ ఒకే నోట్స్ (Notes) కలిగి ఉంటాయి కానీ ప్రారంభమయ్యే నోట్ వేరుగా ఉంటుంది. మేజర్ స్కేల్ (Major Scale) యొక్క 6వ డిగ్రీలో దాని రిలేటివ్ మైనర్ స్కేల్ (Relative Minor Scale) ఉంటుంది.",
            majorVsMinor: "మేజర్ స్కేల్స్ (Major Scales) వినడానికి బ్రైట్ (Bright) గా, సంతోషంగా (Happy) మరియు పాజిటివ్ (Positive) గా ఉంటాయి. మైనర్ స్కేల్స్ (Minor Scales) డార్క్ (Dark) గా, విచారంగా (Sad) మరియు నెగటివ్ (Negative) గా ఉంటాయి. మేజర్ స్కేల్ లో, సెమిటోన్లు (Semitones) కేవలం 3వ & 4వ మరియు 7వ & 8వ డిగ్రీల మధ్య మాత్రమే ఉంటాయి.",
            semitone: "సెమి టోన్ (Semi Tone) అనేది ఒక నోట్ మరియు దాని తర్వాతి నోట్ (మధ్యలో ఏ కీస్ లేకుండా) మధ్య దూరం.",
            tone: "టోన్ (Tone) అంటే రెండు సెమి టోన్లు (Semitones). వాటి మధ్య ఒక కీ (Key) ఉంటుంది."
        },
        chords: {
            definition: "మనం మూడు లేదా అంతకంటే ఎక్కువ నోట్స్ (Notes) ఒకేసారి వాయిస్తే, దానిని కార్డ్ (Chord) అంటారు. కేవలం మూడు నోట్స్ వాయిస్తే వాటిని ట్రయాడ్స్ (Triads) అంటారు.",
            inversions: "ఒక కార్డ్ (Chord) ను 3 రకాలుగా వాయించవచ్చు. రూట్ పొజిషన్ (Root Position) టానిక్ (Tonic) తో మొదలవుతుంది. 1వ ఇన్వర్షన్ (1st Inversion) 3వ నోట్ (Bass) తో మొదలవుతుంది. 2వ ఇన్వర్షన్ (2nd Inversion) 5వ నోట్ (Bass) తో మొదలవుతుంది.",
            relationship: "మైనర్ కార్డ్ (Minor Chord) కు సంబంధించిన ప్రతిదీ మేజర్ కార్డ్ (Major Chord) తో పోల్చబడుతుంది. అందుకే కార్డ్ ఫార్ములాలో ఫ్లాట్స్ (Flats) మరియు షార్ప్స్ (Sharps) ఉపయోగిస్తారు.",
            susChords: "Sus అంటే సస్పెండెడ్ (Suspended). మేజర్ కార్డ్ (Major Chord) లోని 3వ నోట్ (3rd note) ను 2వ నోట్ (Sus2) లేదా 4వ నోట్ (Sus4) తో మారుస్తారు."
        },
        progressions: {
            family: "స్కేల్ (Scale) లోని ప్రతి నోట్ (Note) కు ఆ స్కేల్ లోని ఆ నోట్ తో మొదలయ్యే ఒక కార్డ్ (Chord) ఉంటుంది, దీనినే ఫ్యామిలీ కార్డ్ (Family Chord) అంటారు. ప్రతి స్కేల్ కు, కార్డ్స్ సెట్ (మేజర్ మరియు మైనర్) ఉంటుంది. దీనినే కార్డ్ ప్రోగ్రెషన్స్ (Chord Progressions) అని కూడా అంటారు.",
            melody: "సాధారణంగా ఒక మెలోడీ (Melody) టానిక్ కార్డ్ (Tonic Chord) తో మొదలై దానితోనే ముగుస్తుంది, ఎందుకంటే ఇది ఆ స్కేల్ ఫీల్ (Feel) ను ఇస్తుంది. సాధారణంగా కార్డ్స్ ను స్ట్రాంగ్ బీట్ (Strong Beat) పై వాయిస్తారు."
        },
        circleOfFifths: {
             definition: "కార్డ్స్ (Chords) గుర్తుంచుకోవడానికి ఇది ఉత్తమ మార్గం. మేజర్ కార్డ్స్ (Major Chords) పెద్ద అక్షరాలతో మరియు మైనర్ కార్డ్స్ (Minor Chords) చిన్న అక్షరాలతో సూచించబడ్డాయి.",
             fifths: "మనం C నుండి క్లాక్ వైజ్ (Clockwise) దిశలో వెళ్తే, అది సర్కిల్ ఆఫ్ ఫిఫ్త్స్. C తర్వాత G ఉంటుంది. అంటే, C మేజర్ స్కేల్ లో 5వ నోట్ G.",
             fourths: "మనం C నుండి యాంటీ-క్లాక్ వైజ్ (Anti-clockwise) దిశలో వెళ్తే, అది సర్కిల్ ఆఫ్ ఫోర్త్స్. C తర్వాత F ఉంటుంది. అంటే, C మేజర్ స్కేల్ లో 4వ నోట్ F.",
             family: "ఫ్యామిలీ కార్డ్స్ (Family Chords) ను ఇందులో సులభంగా గుర్తించవచ్చు. ఒక మేజర్ స్కేల్ కోసం, టానిక్ కార్డ్ (Tonic Chord), క్లాక్ వైజ్ లో ఒక కార్డ్ మరియు యాంటీ-క్లాక్ వైజ్ లో ఒక కార్డ్ ఎంచుకోండి. ఈ 3 మేజర్ కార్డ్స్ మరియు వాటి రిలేటివ్ మైనర్ కార్డ్స్ కలిపి ఫ్యామిలీ కార్డ్స్ అవుతాయి."
        }
    }
};

export const NEW_PDF_THEORY = {
    [Language.EN]: {
        scales: {
            whyMatter: [
                "They help you understand the key of a song.",
                "They improve finger movement and ear training.",
                "They are the foundation for making chords and chord progressions."
            ],
            majorSound: "The specific interval pattern (T–T–S–T–T–T–S) gives a bright and open sound. Your ear naturally feels this as positive.",
            minorSound: "The semitone comes earlier in the minor pattern, creating tension. This gives a softer, more emotional feeling.",
            types: {
                major: "bright / happy",
                naturalMinor: "soft / emotional",
                harmonicMinor: "has a sharp 7th (sounds classical or Arabic)",
                melodicMinor: "different patterns up and down",
                pentatonicMajor: "5-note scale (easy for melodies)",
                pentatonicMinor: "5-note scale (easy for melodies)",
                majorBlues: "for soulful or blues sound",
                minorBlues: "for soulful or blues sound",
                wholeTone: "dreamy / undefined"
            }
        },
        chords: {
            majorVsMinor: "Major chord = happy because of the major 3rd. Minor chord = sad because of the minor 3rd.",
            seventh: "A 7th chord adds one more note (the 7th of the scale). This adds Tension, Richness, and Smooth transitions in progressions.",
            sus: "Suspended chords (sus2/sus4) feel open. They remove the 3rd (the emotional note) and replace it with 2nd or 4th."
        }
    },
    [Language.TE]: {
        scales: {
            whyMatter: [
                "పాట యొక్క కీ (Key) ని అర్థం చేసుకోవడానికి ఇవి సహాయపడతాయి.",
                "ఇవి వేలి కదలికను (Finger movement) మరియు ఇయర్ ట్రైనింగ్ (Ear training) ను మెరుగుపరుస్తాయి.",
                "కార్డ్స్ (Chords) మరియు కార్డ్ ప్రోగ్రెషన్స్ (Chord Progressions) తయారీకి ఇవే పునాది."
            ],
            majorSound: "నిర్దిష్ట ఇంటర్వెల్ పాటర్న్ (Interval Pattern) (T–T–S–T–T–T–S) బ్రైట్ (Bright) మరియు ఓపెన్ సౌండ్ (Open Sound) ను ఇస్తుంది. మీ చెవి దీనిని పాజిటివ్ (Positive) గా భావిస్తుంది.",
            minorSound: "మైనర్ పాటర్న్ (Minor Pattern) లో సెమిటోన్ (Semitone) ముందుగానే వస్తుంది, ఇది టెన్షన్ (Tension) ను సృష్టిస్తుంది. ఇది మృదువైన (Softer), ఎమోషనల్ (Emotional) ఫీలింగ్ ఇస్తుంది.",
            types: {
                major: "బ్రైట్ (Bright) / సంతోషం (Happy)",
                naturalMinor: "సాఫ్ట్ (Soft) / ఎమోషనల్ (Emotional)",
                harmonicMinor: "షార్ప్ 7th (Sharp 7th) ఉంటుంది (క్లాసికల్ లేదా అరబిక్ లాగా వినబడుతుంది)",
                melodicMinor: "పైకి మరియు క్రిందికి వేర్వేరు పాటర్న్స్ (Patterns) ఉంటాయి",
                pentatonicMajor: "5-నోట్ స్కేల్ (5-note scale) (మెలోడీలకు సులభం)",
                pentatonicMinor: "5-నోట్ స్కేల్ (5-note scale) (మెలోడీలకు సులభం)",
                majorBlues: "సోల్ ఫుల్ (Soulful) లేదా బ్లూస్ (Blues) సౌండ్ కోసం",
                minorBlues: "సోల్ ఫుల్ (Soulful) లేదా బ్లూస్ (Blues) సౌండ్ కోసం",
                wholeTone: "డ్రీమీ (Dreamy) / అస్పష్టం (Undefined)"
            }
        },
        chords: {
            majorVsMinor: "మేజర్ కార్డ్ (Major Chord) = మేజర్ 3rd (Major 3rd) వల్ల సంతోషంగా ఉంటుంది. మైనర్ కార్డ్ (Minor Chord) = మైనర్ 3rd (Minor 3rd) వల్ల విచారంగా ఉంటుంది.",
            seventh: "7th కార్డ్ (7th Chord) మరొక నోట్ (స్కేల్ యొక్క 7వ నోట్) ను జోడిస్తుంది. ఇది టెన్షన్ (Tension), రిచ్ నెస్ (Richness) మరియు ప్రోగ్రెషన్స్ (Progressions) లో స్మూత్ ట్రాన్సిషన్స్ (Smooth Transitions) ను ఇస్తుంది.",
            sus: "సస్పెండెడ్ కార్డ్స్ (Suspended Chords) (sus2/sus4) ఓపెన్ (Open) గా అనిపిస్తాయి. ఇవి 3వ నోట్ (ఎమోషనల్ నోట్) ను తొలగించి, దాని స్థానంలో 2వ లేదా 4వ నోట్ ను ఉంచుతాయి."
        }
    }
};

export const SCALE_DEGREE_NAMES = {
    [Language.EN]: {
        major: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading Tone'],
        naturalMinor: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Subtonic'],
        harmonicMinor: ['Tonic', 'Supertonic', 'Mediant', 'Subdominant', 'Dominant', 'Submediant', 'Leading Tone'],
        default: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']
    },
    [Language.TE]: {
        major: ['టానిక్ (Tonic)', 'సూపర్ టానిక్ (Supertonic)', 'మీడియంట్ (Mediant)', 'సబ్ డామినెంట్ (Subdominant)', 'డామినెంట్ (Dominant)', 'సబ్ మీడియంట్ (Submediant)', 'లీడింగ్ టోన్ (Leading Tone)'],
        naturalMinor: ['టానిక్ (Tonic)', 'సూపర్ టానిక్ (Supertonic)', 'మీడియంట్ (Mediant)', 'సబ్ డామినెంట్ (Subdominant)', 'డామినెంట్ (Dominant)', 'సబ్ మీడియంట్ (Submediant)', 'సబ్ టోనిక్ (Subtonic)'],
        harmonicMinor: ['టానిక్ (Tonic)', 'సూపర్ టానిక్ (Supertonic)', 'మీడియంట్ (Mediant)', 'సబ్ డామినెంట్ (Subdominant)', 'డామినెంట్ (Dominant)', 'సబ్ మీడియంట్ (Submediant)', 'లీడింగ్ టోన్ (Leading Tone)'],
        default: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th']
    }
};

export const SCALE_INTERVAL_NAMES = {
    [Language.EN]: {
        major: ['Unison', 'Major 2nd', 'Major 3rd', 'Perfect 4th', 'Perfect 5th', 'Major 6th', 'Major 7th'],
        naturalMinor: ['Unison', 'Major 2nd', 'Minor 3rd', 'Perfect 4th', 'Perfect 5th', 'Minor 6th', 'Minor 7th'],
        default: ['Root', '2nd', '3rd', '4th', '5th', '6th', '7th']
    },
    [Language.TE]: {
        major: ['యూనిసన్ (Unison)', 'మేజర్ 2nd (Major 2nd)', 'మేజర్ 3rd (Major 3rd)', 'పర్ఫెక్ట్ 4th (Perfect 4th)', 'పర్ఫెక్ట్ 5th (Perfect 5th)', 'మేజర్ 6th (Major 6th)', 'మేజర్ 7th (Major 7th)'],
        naturalMinor: ['యూనిసన్ (Unison)', 'మేజర్ 2nd (Major 2nd)', 'మైనర్ 3rd (Minor 3rd)', 'పర్ఫెక్ట్ 4th (Perfect 4th)', 'పర్ఫెక్ట్ 5th (Perfect 5th)', 'మైనర్ 6th (Minor 6th)', 'మైనర్ 7th (Minor 7th)'],
        default: ['Root', '2nd', '3rd', '4th', '5th', '6th', '7th']
    }
};

export const PDF_FAMILY_CHORDS: Record<string, { sNo: number, major: string, relativeMinor: string, majorChords: string[], minorChords: string[] }> = {
    'C': { sNo: 1, major: 'C', relativeMinor: 'Am', majorChords: ['C', 'F', 'G'], minorChords: ['Am', 'Dm', 'Em'] },
    'C#': { sNo: 2, major: 'C#', relativeMinor: 'A#m', majorChords: ['C#', 'F#', 'G#'], minorChords: ['A#m', 'D#m', 'Fm'] },
    'D': { sNo: 3, major: 'D', relativeMinor: 'Bm', majorChords: ['D', 'G', 'A'], minorChords: ['Bm', 'Em', 'F#m'] },
    'D#': { sNo: 4, major: 'D#', relativeMinor: 'Cm', majorChords: ['D#', 'G#', 'A#'], minorChords: ['Cm', 'Fm', 'Gm'] },
    'E': { sNo: 5, major: 'E', relativeMinor: 'C#m', majorChords: ['E', 'A', 'B'], minorChords: ['C#m', 'F#m', 'G#m'] },
    'F': { sNo: 6, major: 'F', relativeMinor: 'Dm', majorChords: ['F', 'A#', 'C'], minorChords: ['Dm', 'Gm', 'Am'] },
    'F#': { sNo: 7, major: 'F#', relativeMinor: 'D#m', majorChords: ['F#', 'B', 'C#'], minorChords: ['D#m', 'G#m', 'A#m'] },
    'G': { sNo: 8, major: 'G', relativeMinor: 'Em', majorChords: ['G', 'C', 'D'], minorChords: ['Em', 'Am', 'Bm'] },
    'G#': { sNo: 9, major: 'G#', relativeMinor: 'Fm', majorChords: ['G#', 'C#', 'D#'], minorChords: ['Fm', 'A#m', 'Cm'] },
    'A': { sNo: 10, major: 'A', relativeMinor: 'F#m', majorChords: ['A', 'D', 'E'], minorChords: ['F#m', 'Bm', 'C#m'] },
    'A#': { sNo: 11, major: 'A#', relativeMinor: 'Gm', majorChords: ['A#', 'D#', 'F'], minorChords: ['Gm', 'Cm', 'Dm'] },
    'B': { sNo: 12, major: 'B', relativeMinor: 'G#m', majorChords: ['B', 'E', 'F#'], minorChords: ['G#m', 'C#m', 'D#m'] },
};

export const UI_TEXT = {
    [Language.EN]: {
        title: "Sam Deeven Music Theory",
        home: "Home",
        scales: "Scales",
        chords: "Chords",
        familyChords: "Family Chords",
        circleOfFifths: "Circle Of Fifths",
        progressions: "Chord Progressions",
        exercises: "Exercises",
        chat: "AI Chat",
        about: "About",
        contact: "Contact",
        searchPlaceholder: "Search for a topic...",
        transpose: "Transpose",
        selectRootNote: "Select Root Note",
        selectScale: "Select Scale",
        selectChord: "Select Chord",
        getExplanation: "Get Explanation",
        explanation: "Explanation",
        notesInScale: "Notes in Scale:",
        notesInChord: "Notes in Chord:",
        diatonicChords: "Family Chords (Diatonic)",
        timeSignature: "Time Signature",
        regenerate: "Regenerate",
        welcome: "Welcome to Sam Deeven Music Theory",
        welcomeDesc: "Your interactive guide to understanding music. Select a topic from the menu to begin.",
        generating: "Generating with AI...",
        chatWelcome: "Ask me anything about music theory!",
        chatPlaceholder: "Type your question here...",
        inversions: "Chord Inversions",
        rootPosition: "Root Position",
        firstInversion: "1st Inversion",
        secondInversion: "2nd Inversion",
        thirdInversion: "3rd Inversion",
        theoryFromDoc: "Theory from Document",
        formula: "Formula",
        characteristic: "Characteristic",
        whyScalesMatter: "Why Scales Matter",
        relativeScale: "Relative Scale",
        relativeChord: "Relative Chord",
        description: "Description",
    },
    [Language.TE]: {
        title: "శ్యామ్ దీవెన్ సంగీత సిద్ధాంతం",
        home: "హోమ్",
        scales: "స్కేల్స్ (Scales)",
        chords: "కార్డ్స్ (Chords)",
        familyChords: "ఫ్యామిలీ కార్డ్స్",
        circleOfFifths: "సర్కిల్ ఆఫ్ ఫిఫ్త్స్",
        progressions: "కార్డ్ ప్రోగ్రెషన్స్",
        exercises: "వ్యాయామాలు (Exercises)",
        chat: "AI చాట్",
        about: "గురించి",
        contact: "సంప్రదించండి",
        searchPlaceholder: "ఒక అంశం కోసం శోధించండి...",
        transpose: "ట్రాన్స్‌పోజ్ (Transpose)",
        selectRootNote: "రూట్ నోట్ ఎంచుకోండి",
        selectScale: "స్కేల్ ఎంచుకోండి",
        selectChord: "కార్డ్ ఎంచుకోండి",
        getExplanation: "వివరణ పొందండి",
        explanation: "వివరణ",
        notesInScale: "స్కేల్‌లోని నోట్స్:",
        notesInChord: "కార్డ్‌లోని నోట్స్:",
        diatonicChords: "ఫ్యామిలీ కార్డ్స్ (డయాటోనిక్)",
        timeSignature: "టైమ్ సిగ్నేచర్",
        regenerate: "పునఃసృష్టించు",
        welcome: "శ్యామ్ దీవెన్ సంగీత సిద్ధాంతానికి స్వాగతం",
        welcomeDesc: "సంగీతాన్ని అర్థం చేసుకోవడానికి మీ ఇంటరాక్టివ్ గైడ్. ప్రారంభించడానికి మెను నుండి ఒక అంశాన్ని ఎంచుకోండి.",
        generating: "AI తో జెనరేట్ చేయబడుతోంది...",
        chatWelcome: "సంగీత సిద్ధాంతం గురించి నన్ను ఏదైనా అడగండి!",
        chatPlaceholder: "మీ ప్రశ్నను ఇక్కడ టైప్ చేయండి...",
        inversions: "కార్డ్ ఇన్వర్షన్స్",
        rootPosition: "రూట్ పొజిషన్",
        firstInversion: "1వ ఇన్వర్షన్",
        secondInversion: "2వ ఇన్వర్షన్",
        thirdInversion: "3వ ఇన్వర్షన్",
        theoryFromDoc: "డాక్యుమెంట్ నుండి సిద్ధాంతం (Theory)",
        formula: "ఫార్ములా (Formula)",
        characteristic: "లక్షణం (Characteristic)",
        whyScalesMatter: "స్కేల్స్ ఎందుకు ముఖ్యం?",
        relativeScale: "రిలేటివ్ స్కేల్ (Relative Scale)",
        relativeChord: "రిలేటివ్ కార్డ్ (Relative Chord)",
        description: "వివరణ (Description)",
    }
};

export const TIME_SIGNATURES = ['4/4', '3/4', '2/4', '6/8', '5/8', '7/8'];
