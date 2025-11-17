import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const AboutScreen: React.FC = () => {
    const { text } = useLanguage();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-white">{text.about}</h1>
            <div className="bg-brand-surface p-6 rounded-lg shadow-lg space-y-4 text-brand-text-muted">
                <p>
                Welcome to Sam Deeven Music Theory — your personal guide to mastering the fascinating world of music. I created this application out of a passion for making music education accessible and enjoyable for learners of all levels, from complete beginners to experienced musicians.
                </p>
                <p>
My mission is to simplify concepts like Scales, Chords, and Chord Progressions. With the help of cutting-edge AI technology, I provide clear explanations in both English and Telugu. You can visualize concepts on the interactive piano, explore key relationships with the Circle of Fifths, and generate custom exercises to build your skills.                </p>
                <p>
Built with care by me, Sam Deeven, this project is dedicated to supporting every aspiring musician. I’ll be adding more innovative learning features soon, ensuring your musical journey becomes deeper and more inspiring with each update.                </p>
          <p>
          I hope this tool empowers you on your musical journey.
          </p>
            </div>
        </div>
    );
};

export default AboutScreen;
