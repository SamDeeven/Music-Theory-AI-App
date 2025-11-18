import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { PDF_THEORY_TEXT } from '../constants';
import ContentDisplay from '../components/ContentDisplay';
import { getExplanationForTopic } from '../services/geminiService';
import { parseChord } from '../utils/musicTheory';

const CircleOfFifths: React.FC = () => {
    const navigate = useNavigate();

    const positions = [
        { key: 'C', minor: 'Am', angle: 0 },
        { key: 'G', minor: 'Em', angle: 30 },
        { key: 'D', minor: 'Bm', angle: 60 },
        { key: 'A', minor: 'F#m', angle: 90 },
        { key: 'E', minor: 'C#m', angle: 120 },
        { key: 'B', minor: 'G#m', angle: 150 },
        { key: 'F#', minor: 'D#m', angle: 180 },
        { key: 'C#', minor: 'A#m', angle: 210 },
        { key: 'G#', minor: 'Fm', angle: 240 },
        { key: 'D#', minor: 'Cm', angle: 270 },
        { key: 'A#', minor: 'Gm', angle: 300 },
        { key: 'F', minor: 'Dm', angle: 330 },
    ];
    
    const handleChordClick = (chordSymbol: string) => {
        const parsed = parseChord(chordSymbol);
        if (parsed) {
            navigate(`/chords?root=${parsed.root}&type=${parsed.typeKey}`);
        }
    }

    return (
        <div className="flex justify-center items-center w-full h-full">
            <svg viewBox="0 0 400 400" className="w-full max-w-md">
                <circle cx="200" cy="200" r="190" fill="none" stroke="#16213e" strokeWidth="20" />
                <circle cx="200" cy="200" r="140" fill="none" stroke="#16213e" strokeWidth="20" />
                {positions.map(({ key, minor, angle }) => {
                    const majorX = 200 + 165 * Math.cos((angle - 90) * Math.PI / 180);
                    const majorY = 200 + 165 * Math.sin((angle - 90) * Math.PI / 180);
                    const minorX = 200 + 115 * Math.cos((angle - 90) * Math.PI / 180);
                    const minorY = 200 + 115 * Math.sin((angle - 90) * Math.PI / 180);
                    return (
                        <g key={key}>
                            <g onClick={() => handleChordClick(key)} className="cursor-pointer">
                                <circle cx={majorX} cy={majorY} r="25" fill="#e94560" className="hover:opacity-80 transition-opacity" />
                                <text x={majorX} y={majorY} textAnchor="middle" dy=".3em" fill="white" fontSize="16" fontWeight="bold" className="pointer-events-none">{key}</text>
                            </g>
                             <g onClick={() => handleChordClick(minor)} className="cursor-pointer">
                                <circle cx={minorX} cy={minorY} r="25" fill="#0f3460" className="hover:opacity-80 transition-opacity" />
                                <text x={minorX} y={minorY} textAnchor="middle" dy=".3em" fill="white" fontSize="14" className="pointer-events-none">{minor}</text>
                            </g>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
};

const CircleOfFifthsScreen: React.FC = () => {
    const { language, text } = useLanguage();
    const [explanation, setExplanation] = useState('');
    const [showExplanation, setShowExplanation] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const theoryText = PDF_THEORY_TEXT[language].circleOfFifths;

    const handleGetExplanation = () => {
        setShowExplanation(true);
        // AI call disabled
        /*
        fetchExplanation();
        */
    };

    const fetchExplanation = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await getExplanationForTopic("Circle of Fifths", language);
            setExplanation(result);
        } catch (err) {
            setError('Failed to fetch explanation.');
        } finally {
            setIsLoading(false);
        }
    }, [language]);

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-white hidden md:block">{text.circleOfFifths}</h1>
            <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
                <CircleOfFifths />
                
                {showExplanation && (
                    <div className="mt-6 p-4 bg-brand-primary/30 rounded-lg border border-brand-primary space-y-3">
                        <div className="text-brand-text-muted text-sm space-y-2">
                            <p>{theoryText.definition}</p>
                            <p>{theoryText.fifths}</p>
                            <p>{theoryText.fourths}</p>
                            <p>{theoryText.family}</p>
                        </div>
                    </div>
                )}

                <button
                  onClick={handleGetExplanation}
                  disabled={isLoading}
                  className="mt-6 w-full bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {text.getExplanation}
                </button>
            </div>
            <ContentDisplay content={explanation} isLoading={isLoading} error={error} />
        </div>
    );
};

export default CircleOfFifthsScreen;