import React from 'react';
import type { PromptHistoryItem } from '../types';
import { HistoryIcon } from './icons';

interface HistoryProps {
  history: PromptHistoryItem[];
  onSelectHistory: (item: PromptHistoryItem) => void;
}

const History: React.FC<HistoryProps> = ({ history, onSelectHistory }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="mt-10 w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-200 flex items-center">
        <HistoryIcon className="w-6 h-6 mr-2 text-blue-400" />
        Recent Prompts
      </h2>
      <div className="space-y-3">
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectHistory(item)}
            className="w-full p-4 bg-gray-800/60 rounded-lg border border-gray-700 text-left hover:bg-gray-700/60 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            aria-label={`Load recent prompt: ${item.idea}`}
          >
            <p className="font-semibold text-gray-200 truncate">{item.idea}</p>
            <div className="text-xs text-gray-500 mt-2 flex items-center flex-wrap gap-x-4 gap-y-1">
              <span className="bg-gray-700 px-2 py-0.5 rounded">Persona: {item.persona}</span>
              <span className="bg-gray-700 px-2 py-0.5 rounded">Tone: {item.tone}</span>
              <span className="bg-gray-700 px-2 py-0.5 rounded">Task: {item.taskType}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default History;
