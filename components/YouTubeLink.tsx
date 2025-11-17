import React from 'react';
import { Youtube } from 'lucide-react';

interface YouTubeLinkProps {
  url: string;
  variant?: 'button' | 'icon';
}

const YouTubeLink: React.FC<YouTubeLinkProps> = ({ url, variant = 'button' }) => {
  if (variant === 'icon') {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Watch on YouTube"
        className="p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white"
      >
        <Youtube className="h-6 w-6" />
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 w-full flex items-center justify-center p-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors duration-200 text-white font-medium"
    >
      <Youtube className="h-5 w-5 mr-3" />
      <span>Watch on YouTube</span>
    </a>
  );
};

export default YouTubeLink;