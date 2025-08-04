import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { TimerState } from '../types';

const Timer: React.FC = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true); // Auto-start on mount

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }

    // Cleanup function to clear interval
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning]); // Re-run effect when isRunning changes

  const toggleTimer = (): void => {
    setIsRunning(prev => !prev);
  };

  const resetTimer = (): void => {
    setSeconds(0);
    setIsRunning(false);
  };

  // Format seconds into MM:SS format
  const formatTime = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Timer Component</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Demonstrates useEffect hook with auto-start functionality</p>
      
      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-lg mb-6">
        <div className="text-4xl font-mono font-bold text-blue-600 dark:text-blue-400 mb-2">
          {formatTime(seconds)}
        </div>
        <div className={`text-sm font-medium ${isRunning ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
          {isRunning ? '● Running' : '⏸ Paused'}
        </div>
      </div>

      <div className="flex gap-3 justify-center">
        <Button 
          onClick={toggleTimer}
          className={`px-6 py-2 rounded text-white ${
            isRunning 
              ? 'bg-orange-500 hover:bg-orange-600' 
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isRunning ? 'Stop' : 'Start'}
        </Button>
        <Button 
          onClick={resetTimer}
          className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
        >
          Reset
        </Button>
      </div>

      <div className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
        <p>Timer automatically starts on component mount</p>
        <p>Uses useEffect for interval management and cleanup</p>
      </div>
    </div>
  );
};

export default Timer;

