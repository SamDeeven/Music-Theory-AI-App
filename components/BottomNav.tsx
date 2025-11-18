import React from 'react';
// Fix: Corrected react-router-dom import for v5 compatibility.
import { NavLink } from 'react-router-dom';
import { Home, Scale, Music, GitPullRequest } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const BottomNav: React.FC = () => {
  const { text } = useLanguage();
  const navItems = [
    { path: '/', label: text.home, icon: Home },
    { path: '/scales', label: text.scales, icon: Scale },
    { path: '/chords', label: text.chords, icon: Music },
    { path: '/family-chords', label: text.familyChords, icon: GitPullRequest },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-brand-primary border-t border-brand-surface/50 shadow-lg z-20">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-full h-full transition-colors duration-200 ${
                isActive ? 'text-brand-secondary' : 'text-brand-text-muted hover:text-white'
              }`
            }
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;