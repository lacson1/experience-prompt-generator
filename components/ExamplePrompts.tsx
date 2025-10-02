
import React from 'react';
import { EXAMPLE_PROMPTS } from '../constants';
// FIX: Corrected import path for ExamplePrompt type from '../constants' to '../types'.
import type { ExamplePrompt } from '../types';
import { LightbulbIcon } from './icons';

interface ExamplePromptsProps {
  onSelectExample: (example: ExamplePrompt) => void;
}

const ExamplePrompts: React.FC<ExamplePromptsProps> = ({ onSelectExample }) => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-200 flex items-center">
        <LightbulbIcon className="w-6 h-6 mr-2 text-yellow-400" />
        Not sure where to start? Try an example:
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {EXAMPLE_PROMPTS.map((example) => (
          <button
            key={example.title}
            onClick={() => onSelectExample(example)}
            className="p-4 bg-gray-800/80 rounded-lg border border-gray-700 text-left hover:bg-gray-700/80 hover:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-200 transform hover:-translate-y-1"
            aria-label={`Load example prompt: ${example.title}`}
          >
            <p className="font-bold text-gray-100">{example.title}</p>
            <p className="text-sm text-gray-400 mt-1 line-clamp-2">{example.idea}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExamplePrompts;
