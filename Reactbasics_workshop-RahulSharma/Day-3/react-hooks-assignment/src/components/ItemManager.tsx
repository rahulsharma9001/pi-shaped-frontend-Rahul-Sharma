import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import List from './List';
import { ListItem } from '../types';

const ItemManager: React.FC = () => {
  const [items, setItems] = useState<ListItem[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [renderCount, setRenderCount] = useState<number>(0);

  // Memoized callback using useCallback
  const addItem = useCallback((text: string): void => {
    const newItem: ListItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: text.trim(),
      timestamp: Date.now()
    };
    
    setItems(prev => [...prev, newItem]);
  }, []); // Empty dependency array - function never changes

  // Non-memoized callback for comparison
  const addItemNonMemoized = (text: string): void => {
    const newItem: ListItem = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      text: text.trim(),
      timestamp: Date.now()
    };
    
    setItems(prev => [...prev, newItem]);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (inputValue.trim()) {
      addItem(inputValue);
      setInputValue('');
    }
  };

  const clearItems = (): void => {
    setItems([]);
  };

  const incrementRenderCount = (): void => {
    setRenderCount(prev => prev + 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">ItemManager Component</h2>
      <p className="text-gray-600 mb-4">Demonstrates useCallback hook with memoized child component</p>
      
      <div className="space-y-6">
        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="itemInput" className="block text-sm font-medium text-gray-700 mb-2">
              Add New Item:
            </label>
            <div className="flex gap-2">
              <input
                id="itemInput"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter item text..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Button 
                type="submit"
                disabled={!inputValue.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white px-4 py-2 rounded"
              >
                Add Item
              </Button>
            </div>
          </div>
        </form>

        {/* Control Buttons */}
        <div className="flex gap-3 flex-wrap">
          <Button 
            onClick={clearItems}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear All Items
          </Button>
          <Button 
            onClick={incrementRenderCount}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
          >
            Force Re-render ({renderCount})
          </Button>
        </div>

        {/* Memoized List Component */}
        <List items={items} onAddItem={addItem} />

        {/* useCallback Explanation */}
        <div className="mt-4 text-sm text-gray-500 bg-blue-50 p-4 rounded">
          <p><strong>useCallback Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Memoizes the addItem function to prevent unnecessary re-creation</li>
            <li>Prevents child component (List) from re-rendering when parent re-renders</li>
            <li>Works with React.memo to optimize performance</li>
            <li>Click "Force Re-render" - the List component won't re-render unnecessarily!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemManager;

