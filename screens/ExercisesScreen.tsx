
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import ContentDisplay from '../components/ContentDisplay';
import { generateExercises } from '../services/geminiService';
import { Language } from '../types';

const ExercisesScreen: React.FC = () => {
    const { language, text } = useLanguage();
    const [instrument, setInstrument] = useState('Piano');
    const [topic, setTopic] = useState('C Major Scale Finger Dexterity');
    const [exercises, setExercises] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // Fix: Initialize useRef with undefined by allowing undefined in the type.
    // FIX: Initialize useRef with an initial value of undefined.
    const prevLangRef = useRef<Language | undefined>(undefined);

    const fetchExercises = useCallback(async () => {
        if (!topic) return;
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateExercises(topic, instrument, language);
            setExercises(result);
        } catch (err) {
            setError('Failed to fetch exercises.');
        } finally {
            setIsLoading(false);
        }
    }, [topic, instrument, language]);

    useEffect(() => {
        if (prevLangRef.current && prevLangRef.current !== language && exercises && !isLoading) {
            fetchExercises();
        }
        prevLangRef.current = language;
    }, [language, exercises, isLoading, fetchExercises]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-white hidden md:block">{text.exercises}</h1>
            <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    <div>
                        <label htmlFor="instrument-select" className="block text-sm font-medium text-brand-text-muted mb-2">Instrument</label>
                        <select
                            id="instrument-select"
                            value={instrument}
                            onChange={(e) => setInstrument(e.target.value)}
                            className="w-full p-3 bg-brand-primary border border-brand-surface rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                        >
                            <option value="Piano">Piano</option>
                            <option value="Guitar">Guitar</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="topic-input" className="block text-sm font-medium text-brand-text-muted mb-2">Exercise Topic</label>
                        <input
                            id="topic-input"
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., Major scale patterns, Chord arpeggios"
                            className="w-full p-3 bg-brand-primary border border-brand-surface rounded-lg focus:ring-2 focus:ring-brand-secondary focus:outline-none"
                        />
                    </div>
                </div>
                <button
                    onClick={fetchExercises}
                    disabled={isLoading || !topic}
                    className="w-full bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Generate Exercises
                </button>
            </div>
            <ContentDisplay content={exercises} isLoading={isLoading} error={error} />
        </div>
    );
};

export default ExercisesScreen;
