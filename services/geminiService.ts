import { GoogleGenAI, Chat } from "@google/genai";
import { Language, ChatMessage } from "../types";

let ai: GoogleGenAI | null = null;

const getAiClient = (): GoogleGenAI => {
    if (!ai) {
        // Fix: Use `process.env.API_KEY` to retrieve the API key as per the coding guidelines.
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable is not configured.");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};


let chat: Chat | null = null;
let chatLanguage: Language | null = null;

const getModel = () => {
  return 'gemini-2.5-flash';
};

const generateContent = async (prompt: string): Promise<string> => {
    try {
        const ai = getAiClient();
        const response = await ai.models.generateContent({
            model: getModel(),
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating content:", error);
        return "Sorry, I couldn't generate a response. Please check the server connection and API key configuration.";
    }
};

const cleanResponse = (text: string) => {
  // Remove markdown for bolding (**) and headings (#)
  return text.replace(/(\*\*|#)/g, '');
};


const commonPromptInstructions = (language: Language) => `
General Instructions:

Formatting:
Divide the response into sections with plain text headings only.
Do NOT use any Markdown formatting symbols such as #, *, **, _, or >.
For structured data (tables, comparisons, formulas), use a standard Markdown table using only pipes | and hyphens -.
Do not bold, italicize, or style anything. The application will handle styling.

Language:
The entire response must be in ${language}.
For Telugu, use modern, natural vocabulary.
For technical music terms, include the English equivalent in parentheses.

Music Notation (STRICT RULE):
Use ONLY sharp accidentals (C#, D#, F#, etc.).
NEVER use flat accidentals (Db, Eb, Ab, Bb, Gb) anywhere in the response.
If a scale or chord normally uses flat notes, replace them with their enharmonic sharp equivalents.
Correct example: C# Major scale → C#, D#, E#, F#, G#, A#, B#, C#.
Incorrect example: C# Major scale → Db, Eb, Gb (NOT ALLOWED).
If any instruction conflicts with common music theory conventions, follow the rules above and use sharp-based enharmonic equivalents.
---
`;

export const getExplanationForTopic = async (topic: string, language: Language): Promise<string> => {
    const prompt = `Explain the music theory concept of "${topic}" in clear, beginner-friendly language.
Use simple terms and include helpful analogies.

Structure the response into the following sections (plain text headings only):
Meaning
How to understand
How It Works
Why It Is Important
Simple Examples

If the concept involves combinations of different chords, chord progressions, or comparing multiple chords, present that part in an ASCII table using +, -, and | characters.
Example table style:

+-------------+-------------+-------------+
| Chord 1     | Chord 2     | Chord 3     |
+-------------+-------------+-------------+
| C           | G           | Am          |
+-------------+-------------+-------------+

Avoid advanced terminology unless absolutely necessary.
${commonPromptInstructions(language)}`;
    const response = await generateContent(prompt);
    return cleanResponse(response);
};

export const generateChordProgressions = async (
    key: string,
    scaleType: string,
    timeSignature: string,
    language: Language
): Promise<string> => {
    const prompt = `Generate 4 different 4-bar diatonic chord progressions in the key of ${key} ${scaleType}.
Use only diatonic major/minor chords and avoid the diminished chord completely (do not use vii° or ii° in minor).

For each progression:
Create a plain-text heading (e.g., Progression 1).
List the chord progression using standard chord symbols (e.g., C – G – Am – F).
Briefly explain from a beginner’s perspective why the progression sounds good (e.g., tonic–subdominant–dominant movement, smooth voice-leading, strong resolution).
Explain how the progression fits in a ${timeSignature} time signature, mentioning bars and total beats (e.g., 4 bars × 4 beats = 16 beats).
If the concept involves combinations of different chords, chord progressions, or comparing multiple chords, present that part in an ASCII table using +, -, and | characters.
Example table style:

+-------------+-------------+-------------+
| Chord 1     | Chord 2     | Chord 3     |
+-------------+-------------+-------------+
| C           | G           | Am          |
+-------------+-------------+-------------+

${commonPromptInstructions(language)}`;
    const response = await generateContent(prompt);
    return cleanResponse(response);
};

export const generateExercises = async (topic: string, instrument: string, language: Language): Promise<string> => {
    const prompt = `Generate 4 practical exercises for a ${instrument} player to practice "${topic}". The exercises should be suitable for a beginner to intermediate level.
For each exercise:
1. Give it a clear heading.
2. Provide step-by-step instructions in a numbered list or like the below format:
If the concept involves combinations of different chords, chord progressions, or comparing multiple chords, present that part in an ASCII table using +, -, and | characters.
Example table style:

+-------------+-------------+-------------+
| Chord 1     | Chord 2     | Chord 3     |
+-------------+-------------+-------------+
| C           | G           | Am          |
+-------------+-------------+-------------+

3. Explain the benefit of the exercise.
${commonPromptInstructions(language)}`;
    const response = await generateContent(prompt);
    return cleanResponse(response);
};

export const getChatResponse = async (history: ChatMessage[], newMessage: string, language: Language): Promise<string> => {
    try {
        const ai = getAiClient();
        if (!chat || chatLanguage !== language) {
            chatLanguage = language;
            // Start a new chat with the history from the UI
            chat = ai.chats.create({
                model: getModel(),
                config: {
                    systemInstruction: `You are Sam Deeven’s AI music theory assistant.
Your personality is friendly, patient, and encouraging.
Explain concepts clearly in beginner-friendly terms.
Keep answers concise and easy to understand.
At the end of each explanation, ask a simple follow-up question to make the conversation interactive, such as:
“Does that make sense?” or “Would you like an example?” 
${commonPromptInstructions(language)}`,
                },
                history: history.map(msg => ({
                    role: msg.role,
                    parts: [{ text: msg.content }]
                })),
            });
        }
        
        const response = await chat.sendMessage({ message: newMessage });
        return cleanResponse(response.text);

    } catch (error) {
        console.error("Error sending chat message:", error);
        chat = null; 
        chatLanguage = null;
        return "Sorry, I encountered an error. Please try starting the conversation again.";
    }
};

export const resetChat = () => {
    chat = null;
    chatLanguage = null;
};