import React from 'react';
// Fix: Corrected react-router-dom import for v5 compatibility.
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Music, Scale, Circle, GitPullRequest, ListMusic, BrainCircuit, MessageCircle, Info, Mail } from 'lucide-react';
import LanguageSwitcher from '../components/LanguageSwitcher';
import YouTubeLink from '../components/YouTubeLink';

const HomeScreen: React.FC = () => {
  const { text } = useLanguage();

  const features = [
    { name: text.scales, path: '/scales', icon: Scale },
    { name: text.chords, path: '/chords', icon: Music },
    { name: text.chat, path: '/chat', icon: MessageCircle },
    { name: text.familyChords, path: '/family-chords', icon: GitPullRequest },
    { name: text.circleOfFifths, path: '/circle-of-fifths', icon: Circle },
    { name: text.progressions, path: '/progressions', icon: ListMusic },
    { name: text.exercises, path: '/exercises', icon: BrainCircuit },
    { name: text.about, path: '/about', icon: Info },
    { name: text.contact, path: '/contact', icon: Mail },
  ];

  return (
    <div className="text-center">
      <div className="md:hidden mb-8">
        <div className="flex justify-between items-center mb-4">
            <div>
                 <h1 className="text-3xl font-bold text-white text-left">Sam Deeven</h1>
                 <p className="text-brand-secondary text-left">Music Theory</p>
            </div>
            <div className="flex items-center gap-2">
                <YouTubeLink url="https://www.youtube.com/@SamDeeven" variant="icon" />
                <LanguageSwitcher variant="compact" />
            </div>
        </div>
      </div>
       <div className="hidden md:block">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2 text-white">{text.welcome}</h1>
        <p className="text-lg text-brand-text-muted mb-12 max-w-2xl mx-auto">{text.welcomeDesc}</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {features.map((feature) => (
          <Link
            key={feature.path}
            to={feature.path}
            className="group bg-brand-surface p-4 md:p-8 rounded-xl shadow-lg hover:bg-brand-primary hover:-translate-y-2 transition-all duration-300 flex flex-col items-center justify-center aspect-square"
          >
            <feature.icon className="h-10 w-10 md:h-16 md:w-16 mb-4 text-brand-secondary transition-transform duration-300 group-hover:scale-110" />
            <h2 className="text-md md:text-2xl font-semibold text-white text-center">{feature.name}</h2>
          </Link>
        )).slice(0, 9)}
      </div>
    </div>
  );
};

export default HomeScreen;