import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Mail, Youtube, Instagram } from 'lucide-react';

const ContactScreen: React.FC = () => {
    const { text } = useLanguage();

    const contactItems = [
        {
            icon: Mail,
            label: "Email",
            value: "samdeeven.lyricsapp@gmail.com",
            href: "samdeeven.lyricsapp@gmail.com"
        },
        {
            icon: Youtube,
            label: "YouTube",
            value: "Sam Deeven",
            href: "https://www.youtube.com/@SamDeeven"
        },
        {
            icon: Instagram,
            label: "Instagram",
            value: "sam_d_ven",
            href: "https://www.instagram.com/sam_d_ven/"
        },
    ]

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-white">{text.contact}</h1>
            <div className="bg-brand-surface p-6 rounded-lg shadow-lg">
                <p className="text-brand-text-muted mb-6 text-center">
                    Have questions, feedback, or suggestions? Feel free to reach out through any of the channels below. We'd love to hear from you!
                </p>
                <div className="max-w-sm mx-auto space-y-4">
                    {contactItems.map(item => (
                        <a 
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center p-4 bg-brand-primary rounded-lg hover:bg-brand-secondary transition-colors duration-200"
                        >
                            <item.icon className="h-6 w-6 text-brand-secondary mr-4"/>
                            <div>
                                <p className="font-semibold text-white">{item.label}</p>
                                <p className="text-brand-text-muted">{item.value}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ContactScreen;
