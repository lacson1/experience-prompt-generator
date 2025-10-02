import React from 'react';
import { ErrorIcon } from './icons';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="p-6 text-center bg-red-900/20 border border-red-500/30 rounded-lg">
      <ErrorIcon className="w-10 h-10 mx-auto mb-3 text-red-500" />
      <h3 className="text-lg font-semibold text-red-300">Oops! Something went wrong.</h3>
      <p className="mt-2 text-sm text-red-400">{message}</p>
    </div>
  );
};

export default ErrorMessage;
