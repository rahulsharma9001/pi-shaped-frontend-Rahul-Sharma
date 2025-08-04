import React, { useState } from 'react';
import Dropdown from './Dropdown';
import { UserRole, UserRoleOption, Theme } from '../types';
import { useTheme } from '../context/ThemeContext';

const DropdownDemo: React.FC = () => {
  const { theme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<UserRoleOption | null>(null);

  // Theme options (simple strings)
  const themeOptions: string[] = [
    'Light Theme',
    'Dark Theme',
    'Auto Theme',
    'High Contrast',
    'Sepia Theme'
  ];

  // User role options (complex objects)
  const userRoleOptions: UserRoleOption[] = [
    {
      label: 'Administrator',
      value: UserRole.ADMIN,
      description: 'Full system access and management capabilities'
    },
    {
      label: 'Moderator',
      value: UserRole.MODERATOR,
      description: 'Content moderation and user management'
    },
    {
      label: 'Regular User',
      value: UserRole.USER,
      description: 'Standard user with basic permissions'
    },
    {
      label: 'Guest',
      value: UserRole.GUEST,
      description: 'Limited access for temporary users'
    }
  ];

  const handleThemeSelect = (theme: string): void => {
    setSelectedTheme(theme);
    console.log('Selected theme:', theme);
  };

  const handleRoleSelect = (role: UserRoleOption): void => {
    setSelectedRole(role);
    console.log('Selected role:', role);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Generic Dropdown Component</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Demonstrates TypeScript generics with reusable dropdown component
      </p>
      
      <div className="space-y-6">
        {/* Theme Selection Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Theme Selection (String Type):
          </label>
          <Dropdown<string>
            options={themeOptions}
            onSelect={handleThemeSelect}
            placeholder="Choose a theme..."
            className="w-full max-w-xs"
          />
          {selectedTheme && (
            <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">
              Selected: {selectedTheme}
            </p>
          )}
        </div>

        {/* User Role Selection Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            User Role Selection (Object Type):
          </label>
          <Dropdown<UserRoleOption>
            options={userRoleOptions}
            onSelect={handleRoleSelect}
            placeholder="Select user role..."
            className="w-full max-w-xs"
          />
          {selectedRole && (
            <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
              <p className="text-sm font-medium text-green-800 dark:text-green-300">
                Selected Role: {selectedRole.label}
              </p>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                {selectedRole.description}
              </p>
              <p className="text-xs text-green-500 dark:text-green-500 mt-1">
                Value: {selectedRole.value}
              </p>
            </div>
          )}
        </div>

        {/* TypeScript Generics Explanation */}
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400 bg-purple-50 dark:bg-purple-900/20 p-4 rounded">
          <p><strong>TypeScript Generics Benefits:</strong></p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li><code>Dropdown&lt;T&gt;</code> works with any type T</li>
            <li>Type safety: <code>onSelect: (option: T) =&gt; void</code></li>
            <li>Reusable for strings, objects, enums, or custom types</li>
            <li>IntelliSense support for the selected option type</li>
            <li>Compile-time type checking prevents runtime errors</li>
          </ul>
        </div>

        {/* Current State Display */}
        <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded">
          <h4 className="font-medium text-gray-800 dark:text-white mb-2">Current Selections:</h4>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>Theme: {selectedTheme || 'None selected'}</p>
            <p>Role: {selectedRole?.label || 'None selected'}</p>
            <p>App Theme: {theme}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownDemo;

