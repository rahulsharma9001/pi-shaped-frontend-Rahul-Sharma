import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CounterState, ButtonVariant } from '../types';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = (): void => {
    setCount(prev => prev + 1);
  };

  const decrement = (): void => {
    setCount(prev => prev - 1);
  };

  const reset = (): void => {
    setCount(0);
  };

  // Determine color based on count value
  const getCountColor = (): string => {
    if (count > 0) return 'text-green-600 dark:text-green-400';
    if (count < 0) return 'text-red-600 dark:text-red-400';
    return 'text-gray-600 dark:text-gray-300';
  };

  const getCountBackground = (): string => {
    if (count > 0) return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700';
    if (count < 0) return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700';
    return 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600';
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Counter Component</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Demonstrates useState hook with color-changing display</p>
      
      <div className={`text-center p-4 rounded-lg border-2 mb-6 ${getCountBackground()}`}>
        <span className={`text-4xl font-bold ${getCountColor()}`}>
          {count}
        </span>
      </div>

      <div className="flex gap-3 justify-center">
        <Button 
          onClick={decrement}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Decrement
        </Button>
        <Button 
          onClick={reset}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
        >
          Reset
        </Button>
        <Button 
          onClick={increment}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
        >
          Increment
        </Button>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>Count changes color: Green (positive), Red (negative), Gray (zero)</p>
      </div>
    </div>
  );
};

export default Counter;

