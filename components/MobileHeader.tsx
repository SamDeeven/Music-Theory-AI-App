import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { UI_TEXT } from '../constants';
import YouTubeLink from './YouTubeLink';
import LanguageSwitcher from './LanguageSwitcher';

type UITextKeys = keyof typeof UI_TEXT['English'];

const PATH_TITLES: { [key: string]: UITextKeys } = {
  '/scales': 'scales',
  '/chords': 'chords',
  '/family-chords': 'familyChords',
  '/circle-of-fifths': 'circleOfFifths',
  '/progressions': 'progressions',
  '/exercises': 'exercises',
  '/chat': 'chat',
  '/about': 'about',
  '/contact': 'contact',
};

const MobileHeader: React.FC = () => {
    const { text } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();
    
    const titleKey = PATH_TITLES[location.pathname];
    const title = titleKey ? text[titleKey] : '';

    if (location.pathname === '/') {
        return null; // No header on home screen
    }

    return (
        <header className="md:hidden flex items-center justify-between p-4 bg-brand-primary sticky top-0 z-10 shadow-lg">
            <div className="flex items-center gap-2">
                 <button onClick={() => navigate(-1)} aria-label="Go back" className="p-2 -ml-2 rounded-full hover:bg-brand-surface transition-colors">
                    <ArrowLeft className="h-6 w-6 text-white" />
                </button>
                <h1 className="text-xl font-bold text-white">{title}</h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
                <YouTubeLink url="https://www.youtube.com/@SamDeeven" variant="icon" />
                <LanguageSwitcher variant="compact" />
            </div>
        </header>
    );
};

export default MobileHeader;