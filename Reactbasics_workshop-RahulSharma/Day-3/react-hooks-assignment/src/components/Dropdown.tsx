import React, { useState } from 'react';
import { GenericDropdownProps } from '../types';

// Generic Dropdown component that works with any type T
function Dropdown<T>({ 
  options, 
  onSelect, 
  placeholder = "Select an option...", 
  className = "" 
}: GenericDropdownProps<T>): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<T | null>(null);

  const handleSelect = (option: T): void => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  const toggleDropdown = (): void => {
    setIsOpen(prev => !prev);
  };

  // Helper function to get display text for an option
  const getDisplayText = (option: T): string => {
    if (typeof option === 'string') {
      return option;
    }
    if (typeof option === 'object' && option !== null && 'label' in option) {
      return (option as any).label;
    }
    return String(option);
  };

  const getSelectedText = (): string => {
    if (selectedOption === null) {
      return placeholder;
    }
    return getDisplayText(selectedOption);
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      <div>
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex justify-between w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <span className="truncate">{getSelectedText()}</span>
          <svg
            className={`-mr-1 ml-2 h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white"
                role="menuitem"
              >
                {getDisplayText(option)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;

