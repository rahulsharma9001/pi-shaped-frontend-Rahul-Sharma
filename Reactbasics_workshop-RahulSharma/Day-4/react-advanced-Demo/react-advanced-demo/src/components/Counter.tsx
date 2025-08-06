import React, { useState, useMemo, memo } from 'react';
import { Button } from '@/components/ui/button.jsx';

interface CounterProps {
  initialValue?: number;
  multiplier?: number;
}

// Expensive computation function to demonstrate useMemo
const expensiveCalculation = (count: number, multiplier: number): number => {
  console.log('Performing expensive calculation...');
  // Simulate expensive computation
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += count * multiplier;
  }
  return result / 1000000;
};

const Counter: React.FC<CounterProps> = memo(
  ({ initialValue = 0, multiplier = 2 }) => {
    const [count, setCount] = useState<number>(initialValue);

    // Use useMemo to memoize expensive computation
    const expensiveValue = useMemo(() => {
      return expensiveCalculation(count, multiplier);
    }, [count, multiplier]);

    const increment = () => {
      setCount(prev => prev + 1);
    };

    const decrement = () => {
      setCount(prev => prev - 1);
    };

    const reset = () => {
      setCount(initialValue);
    };

    console.log('Counter component rendered');

    return (
      <div className="p-6 border rounded-lg shadow-md bg-white max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Counter Component
        </h2>

        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-blue-600 mb-2">{count}</div>
          <div className="text-sm text-gray-600">
            Expensive calculation result:{' '}
            <span className="font-semibold">{expensiveValue.toFixed(2)}</span>
          </div>
        </div>

        <div className="flex gap-2 justify-center">
          <Button onClick={decrement} variant="outline" className="px-4 py-2">
            -
          </Button>
          <Button onClick={increment} className="px-4 py-2">
            +
          </Button>
          <Button onClick={reset} variant="secondary" className="px-4 py-2">
            Reset
          </Button>
        </div>
      </div>
    );
  }
);

Counter.displayName = 'Counter';

export default Counter;
