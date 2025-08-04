import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { ListItem } from '../types';

interface ListProps {
  items: ListItem[];
  onAddItem: (text: string) => void;
}

const List: React.FC<ListProps> = memo(({ items, onAddItem }) => {
  console.log('List component rendered'); // To demonstrate memoization

  const handleAddSample = (): void => {
    const sampleItems = [
      'Learn React Hooks',
      'Master TypeScript',
      'Build awesome apps',
      'Practice coding daily',
      'Read documentation',
      'Write clean code'
    ];
    
    const randomItem = sampleItems[Math.floor(Math.random() * sampleItems.length)];
    onAddItem(randomItem);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800">Items List</h3>
        <Button 
          onClick={handleAddSample}
          className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 text-sm rounded"
        >
          Add Sample Item
        </Button>
      </div>

      <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg">
        {items.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No items yet. Add some items to see them here!
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {items.map((item) => (
              <li key={item.id} className="p-3 hover:bg-gray-50">
                <div className="flex justify-between items-center">
                  <span className="text-gray-800">{item.text}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(item.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
        <strong>React.memo:</strong> This component only re-renders when props change.
        Check the console to see when it renders!
      </div>
    </div>
  );
});

List.displayName = 'List';

export default List;

