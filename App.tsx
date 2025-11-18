import React from 'react';
import { HashRouter, Routes, Route, NavLink } from 'react-router-dom';
import { Music, Scale, Circle, GitPullRequest, ListMusic, Home, Info, Mail } from 'lucide-react';

import HomeScreen from './screens/HomeScreen';
import ScalesScreen from './screens/ScalesScreen';
import ChordsScreen from './screens/ChordsScreen';
import FamilyChordsScreen from './screens/FamilyChordsScreen';
import CircleOfFifthsScreen from './screens/CircleOfFifthsScreen';
import ChordProgressionsScreen from './screens/ChordProgressionsScreen';
import AboutScreen from './screens/AboutScreen';
import ContactScreen from './screens/ContactScreen';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import YouTubeLink from './components/YouTubeLink';
import MobileHeader from './components/MobileHeader';
import BottomNav from './components/BottomNav';

const AppContent: React.FC = () => {
  const { text } = useLanguage();

  const navItems = [
    { path: '/', label: text.home, icon: Home },
    { path: '/scales', label: text.scales, icon: Scale },
    { path: '/chords', label: text.chords, icon: Music },
    { path: '/family-chords', label: text.familyChords, icon: GitPullRequest },
    { path: '/circle-of-fifths', label: text.circleOfFifths, icon: Circle },
    { path: '/progressions', label: text.progressions, icon: ListMusic },
    { path: '/about', label: text.about, icon: Info },
    { path: '/contact', label: text.contact, icon: Mail },
  ];
  
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col md:flex-row">
        <nav className="bg-brand-primary hidden md:flex md:w-64 p-4 flex-col shrink-0">
           <NavLink to="/" className="text-2xl font-bold text-white mb-8 text-center">
              Sam Deeven
              <span className="block text-sm font-normal text-brand-secondary">Music Theory</span>
          </NavLink>
          <div className="flex-grow space-y-2">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors duration-200 ${
                    isActive ? 'bg-brand-secondary text-white' : 'text-brand-text hover:bg-brand-surface'
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
          <div className="mt-auto pt-4 border-t border-brand-surface/50">
              <LanguageSwitcher />
              <YouTubeLink url="https://youtube.com" />
          </div>
        </nav>

        <main className="flex-1 flex flex-col bg-brand-bg overflow-y-auto">
          <MobileHeader />
          <div className="flex-1 p-4 sm:p-6 lg:p-8 pb-20 md:pb-8">
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/scales" element={<ScalesScreen />} />
              <Route path="/chords" element={<ChordsScreen />} />
              <Route path="/family-chords" element={<FamilyChordsScreen />} />
              <Route path="/circle-of-fifths" element={<CircleOfFifthsScreen />} />
              <Route path="/progressions" element={<ChordProgressionsScreen />} />
              <Route path="/about" element={<AboutScreen />} />
              <Route path="/contact" element={<ContactScreen />} />
            </Routes>
          </div>
        </main>
        <BottomNav />
      </div>
    </HashRouter>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;