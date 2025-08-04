// Common types used throughout the application

export interface CounterState {
  count: number;
}

export interface TimerState {
  seconds: number;
  isRunning: boolean;
}

export interface ListItem {
  id: string;
  text: string;
  timestamp: number;
}

export interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface DropdownOption<T = any> {
  label: string;
  value: T;
}

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
  GUEST = 'guest'
}

export interface UserRoleOption {
  label: string;
  value: UserRole;
  description: string;
}

// Generic types for dropdown component
export interface GenericDropdownProps<T> {
  options: T[];
  onSelect: (option: T) => void;
  placeholder?: string;
  className?: string;
}

// Utility types
export type Theme = 'light' | 'dark';
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';

// Component props types
export interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  type?: 'text' | 'number';
}

