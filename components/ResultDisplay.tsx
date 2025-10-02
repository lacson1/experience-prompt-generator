import React, { useState, useEffect } from 'react';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { CopyIcon, CheckIcon, SparklesIcon } from './icons';

interface ResultDisplayProps {
  prompt: string;
  isLoading: boolean;
  error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ prompt, isLoading, error }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopy = () => {
    if (prompt) {
      navigator.clipboard.writeText(prompt);
      setCopied(true);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader />;
    }
    if (error) {
      return <ErrorMessage message={error} />;
    }
    if (!prompt) {
      return (
        <div className="p-8 text-center text-gray-500">
          <SparklesIcon className="w-12 h-12 mx-auto mb-4 text-gray-600" />
          <h3 className="text-lg font-medium text-gray-400">Your generated prompt will appear here</h3>
          <p className="text-sm">Fill out the details above and click "Generate" to get started.</p>
        </div>
      );
    }
    return (
      <div className="relative">
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 rounded-lg bg-gray-900/70 hover:bg-gray-700/70 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 transition-all duration-200"
          aria-label="Copy prompt"
        >
          {copied ? (
            <CheckIcon className="w-5 h-5 text-green-400" />
          ) : (
            <CopyIcon className="w-5 h-5 text-gray-400" />
          )}
        </button>
        <pre className="p-6 whitespace-pre-wrap break-words text-gray-300 font-sans text-base leading-relaxed">
          {prompt}
        </pre>
      </div>
    );
  };

  return (
    <div className="mt-8 w-full">
        <h2 className="text-xl font-semibold mb-4 text-gray-200 flex items-center">
            <SparklesIcon className="w-6 h-6 mr-2 text-teal-400"/>
            Generated Expert Prompt
        </h2>
        <div className="w-full bg-gray-800 rounded-xl border border-gray-700 shadow-lg min-h-[200px] transition-all duration-300">
            {renderContent()}
        </div>
    </div>
  );
};

export default ResultDisplay;