import React from 'react';
import { Button } from '@/components/ui/button';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Theme Toggle Component</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Demonstrates Context API with useContext hook for global state management
      </p>
      
      <div className="space-y-4">
        <div className="p-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg">
          <div className="text-center">
            <div className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Current Theme: {theme === 'light' ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </div>
            <Button 
              onClick={toggleTheme}
              className={`px-6 py-2 rounded font-medium transition-colors ${
                theme === 'light' 
                  ? 'bg-gray-800 hover:bg-gray-900 text-white' 
                  : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
              }`}
            >
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </div>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-4 rounded">
          <p><strong>Context API Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Provides global state management without prop drilling</li>
            <li>Uses createContext to create a theme context</li>
            <li>ThemeProvider wraps the app to provide theme state</li>
            <li>useContext hook allows components to consume theme data</li>
            <li>Theme changes affect all components automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;

