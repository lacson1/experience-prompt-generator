import React from 'react';
import { PROMPT_TEMPLATES } from '../constants';
import type { PromptTemplate } from '../types';
import { LibraryIcon } from './icons';

interface TemplateLibraryProps {
  onSelectTemplate: (template: PromptTemplate) => void;
}

const TemplateLibrary: React.FC<TemplateLibraryProps> = ({ onSelectTemplate }) => {
  const groupedTemplates = PROMPT_TEMPLATES.reduce((acc, template) => {
    (acc[template.category] = acc[template.category] || []).push(template);
    return acc;
  }, {} as Record<string, PromptTemplate[]>);

  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-200 flex items-center">
        <LibraryIcon className="w-6 h-6 mr-2 text-purple-400" />
        Choose a Template to Get Started
      </h2>
      <div className="space-y-8">
        {Object.entries(groupedTemplates).map(([category, templates]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-gray-300 mb-3 border-b border-gray-700 pb-2">{category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {templates.map((template) => (
                <button
                  key={template.title}
                  onClick={() => onSelectTemplate(template)}
                  className="p-4 bg-gray-800/80 rounded-lg border border-gray-700 text-left hover:bg-gray-700/80 hover:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 transform hover:-translate-y-1 flex flex-col justify-between"
                  aria-label={`Load template: ${template.title}`}
                >
                  <div>
                    <p className="font-bold text-gray-100">{template.title}</p>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">{template.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateLibrary;
