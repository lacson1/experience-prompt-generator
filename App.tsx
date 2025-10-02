import React, { useState, useCallback, useEffect } from 'react';
import { generateExperiencedPrompt, type GenerationResult } from './services/geminiService';
import { PERSONA_OPTIONS, TONE_OPTIONS, TASK_TYPE_OPTIONS } from './constants';
import { Persona, Tone, TaskType } from './types';
import type { PromptOptions, PromptHistoryItem, PromptTemplate } from './types';
import ResultDisplay from './components/ResultDisplay';
import { SparklesIcon } from './components/icons';
import TemplateLibrary from './components/TemplateLibrary';
import History from './components/History';

// --- LocalStorage Logic ---
const HISTORY_KEY = 'promptGeneratorHistory';
const MAX_HISTORY_ITEMS = 5;

const getHistory = (): PromptHistoryItem[] => {
  try {
    const storedHistory = localStorage.getItem(HISTORY_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  } catch (error) {
    console.error('Failed to retrieve history from localStorage:', error);
    return [];
  }
};

const addToHistory = (item: Omit<PromptHistoryItem, 'id' | 'timestamp'>): PromptHistoryItem[] => {
  try {
    const history = getHistory();
    const newItem: PromptHistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    // Avoid adding duplicates based on idea
    const filteredHistory = history.filter(h => h.idea !== newItem.idea);
    const updatedHistory = [newItem, ...filteredHistory].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updatedHistory));
    return updatedHistory;
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
    return getHistory();
  }
};

const App: React.FC = () => {
  const [idea, setIdea] = useState<string>('');
  const [persona, setPersona] = useState<Persona>(Persona.SOFTWARE_ENGINEER);
  const [tone, setTone] = useState<Tone>(Tone.PROFESSIONAL);
  const [taskType, setTaskType] = useState<TaskType>(TaskType.CODE_GENERATION);
  
  const [generatedPrompt, setGeneratedPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handleGenerate = useCallback(async () => {
    if (!idea.trim()) {
      setError('Please enter a prompt idea.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setGeneratedPrompt('');

    const options: PromptOptions = { idea, persona, tone, taskType };
    const result: GenerationResult = await generateExperiencedPrompt(options);

    if (result.error) {
        setError(result.error);
    } else if (result.prompt) {
        setGeneratedPrompt(result.prompt);
        const newHistory = addToHistory({ ...options, generatedPrompt: result.prompt });
        setHistory(newHistory);
    }
    
    setIsLoading(false);
  }, [idea, persona, tone, taskType]);

  const handleSelectTemplate = useCallback((template: PromptTemplate) => {
    setIdea(template.template);
    setPersona(template.defaults.persona);
    setTone(template.defaults.tone);
    setTaskType(template.defaults.taskType);
    setError(null);
    setGeneratedPrompt('');
    const formElement = document.getElementById('prompt-form');
    formElement?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleSelectHistory = useCallback((item: PromptHistoryItem) => {
    setIdea(item.idea);
    setPersona(item.persona);
    setTone(item.tone);
    setTaskType(item.taskType);
    setGeneratedPrompt(item.generatedPrompt);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const OptionSelector = <T extends string,>(
    { label, value, onChange, options }: {
      label: string;
      value: T;
      onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
      options: T[];
    }
  ) => (
    <div className="flex-1 min-w-[200px]">
      <label htmlFor={label} className="block text-sm font-medium text-gray-400 mb-1">{label}</label>
      <select
        id={label}
        value={value}
        onChange={onChange}
        className="w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
      >
        {options.map(option => <option key={option} value={option}>{option}</option>)}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-4xl">
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-blue-500">
            Experienced Prompt Generator
          </h1>
          <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
            Transform your simple ideas into powerful, expert-level prompts for any AI.
          </p>
        </header>

        <TemplateLibrary onSelectTemplate={handleSelectTemplate} />

        <div id="prompt-form" className="bg-gray-800/50 p-6 sm:p-8 rounded-2xl border border-gray-700 shadow-2xl mt-8 scroll-mt-8">
          <div>
            <label htmlFor="idea" className="block text-lg font-semibold text-gray-200 mb-2">Your Prompt Idea</label>
            <textarea
              id="idea"
              rows={6}
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              placeholder="e.g., a python script to parse a CSV and generate a report"
              className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition text-base"
            />
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <OptionSelector
              label="Persona"
              value={persona}
              onChange={(e) => setPersona(e.target.value as Persona)}
              options={PERSONA_OPTIONS}
            />
            <OptionSelector
              label="Tone"
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              options={TONE_OPTIONS}
            />
            <OptionSelector
              label="Task Type"
              value={taskType}
              onChange={(e) => setTaskType(e.target.value as TaskType)}
              options={TASK_TYPE_OPTIONS}
            />
          </div>

          <div className="mt-8">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-6 border border-transparent rounded-md shadow-lg text-lg font-bold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-teal-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-transform transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating...
                </>
              ) : (
                <>
                  <SparklesIcon className="w-6 h-6 mr-2" />
                  Generate Prompt
                </>
              )}
            </button>
          </div>
        </div>

        <History history={history} onSelectHistory={handleSelectHistory} />
        <ResultDisplay prompt={generatedPrompt} isLoading={isLoading} error={error} />

      </main>
    </div>
  );
};

export default App;