import React from 'react';
import LoadingSpinner from './LoadingSpinner';
import { useLanguage } from '../context/LanguageContext';
import FormattedContent from './FormattedContent';

interface ContentDisplayProps {
  content: string;
  isLoading: boolean;
  error: string | null;
  children?: React.ReactNode;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content, isLoading, error, children }) => {
    const { text } = useLanguage();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-brand-surface rounded-lg mt-6 border border-brand-primary/50">
                <LoadingSpinner />
                <p className="mt-2 text-brand-text-muted">{text.generating}</p>
            </div>
        )
    }

    if (error) {
        return <div className="mt-6 p-4 bg-red-900/50 text-red-300 rounded-lg">{error}</div>;
    }

    if (!content && !children) {
        return null;
    }

    return (
        <div className="mt-6 p-4 sm:p-6 bg-brand-surface rounded-lg border border-brand-primary/50">
            {content ? <FormattedContent content={content} /> : children}
        </div>
    );
};

export default ContentDisplay;
