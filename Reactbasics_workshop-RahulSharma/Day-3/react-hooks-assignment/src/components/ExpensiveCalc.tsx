import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';

const ExpensiveCalc: React.FC = () => {
  const [number, setNumber] = useState<number>(5);
  const [counter, setCounter] = useState<number>(0);

  // Expensive factorial calculation function
  const calculateFactorial = (n: number): number => {
    console.log(`Calculating factorial of ${n}...`);
    
    if (n < 0) return 0;
    if (n === 0 || n === 1) return 1;
    
    // Simulate expensive calculation with a slow loop
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
      // Add some artificial delay to make it noticeably slow
      for (let j = 0; j < 1000000; j++) {
        // Busy wait to simulate expensive computation
      }
    }
    
    return result;
  };

  // Memoized factorial calculation - only recalculates when 'number' changes
  const factorial = useMemo(() => {
    return calculateFactorial(number);
  }, [number]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(e.target.value) || 0;
    setNumber(Math.max(0, Math.min(value, 10))); // Limit to 0-10 for performance
  };

  const incrementCounter = (): void => {
    setCounter(prev => prev + 1);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">ExpensiveCalc Component</h2>
      <p className="text-gray-600 mb-4">Demonstrates useMemo hook for expensive calculations</p>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="numberInput" className="block text-sm font-medium text-gray-700 mb-2">
            Number (0-10):
          </label>
          <input
            id="numberInput"
            type="number"
            min="0"
            max="10"
            value={number}
            onChange={handleNumberChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <div className="text-lg font-semibold text-blue-800">
            Factorial of {number} = {factorial.toLocaleString()}
          </div>
          <div className="text-sm text-blue-600 mt-1">
            (Calculated using useMemo - only recalculates when number changes)
          </div>
        </div>

        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-700">Unrelated Counter: {counter}</span>
            <Button 
              onClick={incrementCounter}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
              Increment Counter
            </Button>
          </div>
          <div className="text-sm text-gray-500">
            <p><strong>Test useMemo:</strong> Click "Increment Counter" - the factorial won't recalculate!</p>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p><strong>useMemo Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Memoizes expensive calculations between re-renders</li>
            <li>Only recalculates when dependencies change (number in this case)</li>
            <li>Prevents unnecessary computation on unrelated state changes</li>
            <li>Improves performance for computationally expensive operations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExpensiveCalc;

