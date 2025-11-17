
export enum Language {
  EN = 'English',
  TE = 'Telugu',
}

export type Note = string;

export interface Scale {
  name: string;
  intervals: number[];
  notes: Note[];
}

export interface Chord {
    name: string;
    intervals: number[];
    notes: Note[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}
