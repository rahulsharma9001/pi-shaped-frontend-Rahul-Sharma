import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';

const InputFocus: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = (): void => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const clearInput = (): void => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">InputFocus Component</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Demonstrates useRef hook for DOM element manipulation</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="focusInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Input Field (controlled by useRef):
          </label>
          <input
            ref={inputRef}
            id="focusInput"
            type="text"
            placeholder="Click the button below to focus this input..."
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={focusInput}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Focus Input
          </Button>
          <Button 
            onClick={clearInput}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Clear & Focus
          </Button>
        </div>

        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          <p><strong>useRef Usage:</strong></p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Creates a mutable reference to the input DOM element</li>
            <li>Allows direct manipulation without triggering re-renders</li>
            <li>Persists the reference across component re-renders</li>
            <li>Provides imperative access to DOM methods like focus()</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InputFocus;

