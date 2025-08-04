# React Hooks & TypeScript Assignment

A comprehensive React application demonstrating various React hooks, Context API, and TypeScript generics. This project showcases modern React development patterns with type safety and performance optimizations.

## 🚀 Live Demo

The application demonstrates all the required features including:
- React Hooks (useState, useEffect, useRef, useMemo, useCallback)
- Context API for global state management
- TypeScript generics for reusable components
- Dark/Light theme switching
- Responsive design

## 📋 Assignment Requirements

This project fulfills all the requirements from the Day 3 React & TypeScript exercise:

### ✅ Part 1: Counter & Timer (Hooks Basics)
- Counter component using useState with color-changing display
- Timer component using useEffect with auto-start functionality

### ✅ Part 2: useRef & useMemo
- InputFocus component demonstrating useRef for DOM manipulation
- ExpensiveCalc component showcasing useMemo for performance optimization

### ✅ Part 3: useCallback & Memoized Child
- ItemManager parent component with useCallback optimization
- List child component using React.memo for performance

### ✅ Part 4: Context API
- ThemeContext for light/dark mode switching
- Global state management without prop drilling

### ✅ Part 5: TypeScript & Generics
- Generic Dropdown<T> component working with any type
- Theme selection (string type) and User roles (object type)
- Full TypeScript type safety throughout the application




## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Counter.tsx      # useState demonstration
│   ├── Timer.tsx        # useEffect demonstration
│   ├── InputFocus.tsx   # useRef demonstration
│   ├── ExpensiveCalc.tsx # useMemo demonstration
│   ├── ItemManager.tsx  # useCallback demonstration
│   ├── List.tsx         # React.memo demonstration
│   ├── ThemeToggle.tsx  # Context API usage
│   ├── Dropdown.tsx     # Generic component
│   └── DropdownDemo.tsx # Generic usage examples
├── context/             # Context API
│   └── ThemeContext.tsx # Theme management
├── types/               # TypeScript definitions
│   └── index.ts         # All type definitions
├── utils/               # Utility functions
├── App.tsx              # Main application
└── main.tsx             # Application entry point
```

## 🛠 Technologies Used

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components

## 🎯 React Hooks Demonstrated

### useState
**Location:** `Counter.tsx`
**Purpose:** Managing component state for the counter value
**Why used:** Provides a simple way to add state to functional components, enabling reactive UI updates when the count changes.

```typescript
const [count, setCount] = useState<number>(0);
```

### useEffect
**Location:** `Timer.tsx`
**Purpose:** Managing side effects for the timer interval
**Why used:** Handles the timer lifecycle - starting intervals on mount, cleaning up on unmount, and responding to state changes.

```typescript
useEffect(() => {
  let intervalId: NodeJS.Timeout | null = null;
  if (isRunning) {
    intervalId = setInterval(() => setSeconds(prev => prev + 1), 1000);
  }
  return () => {
    if (intervalId) clearInterval(intervalId);
  };
}, [isRunning]);
```


### useRef
**Location:** `InputFocus.tsx`
**Purpose:** Direct DOM element access for focus management
**Why used:** Provides imperative access to DOM elements without triggering re-renders, perfect for focus management and direct DOM manipulation.

```typescript
const inputRef = useRef<HTMLInputElement>(null);

const focusInput = (): void => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
};
```

### useMemo
**Location:** `ExpensiveCalc.tsx`
**Purpose:** Memoizing expensive factorial calculations
**Why used:** Prevents unnecessary recalculations of expensive operations when unrelated state changes, significantly improving performance.

```typescript
const factorial = useMemo(() => {
  return calculateFactorial(number);
}, [number]); // Only recalculates when 'number' changes
```

### useCallback
**Location:** `ItemManager.tsx`
**Purpose:** Memoizing callback functions to prevent child re-renders
**Why used:** Prevents unnecessary re-creation of callback functions, which when combined with React.memo, prevents child components from re-rendering unnecessarily.

```typescript
const addItem = useCallback((text: string): void => {
  const newItem: ListItem = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    text: text.trim(),
    timestamp: Date.now()
  };
  setItems(prev => [...prev, newItem]);
}, []); // Empty dependency array - function never changes
```

### useContext
**Location:** `ThemeToggle.tsx`, `DropdownDemo.tsx`
**Purpose:** Consuming theme context for global state access
**Why used:** Provides a clean way to access global state without prop drilling, making theme data available throughout the component tree.

```typescript
const { theme, toggleTheme } = useTheme();
```


## 🔧 TypeScript Generics & Utility Types

### Generic Dropdown Component
**Location:** `Dropdown.tsx`
**Implementation:** A fully generic dropdown that works with any type T

```typescript
function Dropdown<T>({ 
  options, 
  onSelect, 
  placeholder = "Select an option...", 
  className = "" 
}: GenericDropdownProps<T>): JSX.Element {
  // Component implementation
}

interface GenericDropdownProps<T> {
  options: T[];
  onSelect: (option: T) => void;
  placeholder?: string;
  className?: string;
}
```

**Benefits:**
- **Type Safety:** Ensures `onSelect` receives the correct type
- **Reusability:** Works with strings, objects, enums, or any custom type
- **IntelliSense:** Full IDE support with type hints
- **Compile-time Checking:** Prevents runtime type errors

### Usage Examples

**String Type (Theme Selection):**
```typescript
<Dropdown<string>
  options={['Light Theme', 'Dark Theme', 'Auto Theme']}
  onSelect={(theme: string) => setSelectedTheme(theme)}
  placeholder="Choose a theme..."
/>
```

**Object Type (User Roles):**
```typescript
<Dropdown<UserRoleOption>
  options={userRoleOptions}
  onSelect={(role: UserRoleOption) => setSelectedRole(role)}
  placeholder="Select user role..."
/>
```

### Utility Types Used

**Enum Definition:**
```typescript
export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  MODERATOR = 'moderator',
  GUEST = 'guest'
}
```

**Interface with Generic Constraints:**
```typescript
export interface UserRoleOption {
  label: string;
  value: UserRole;
  description: string;
}
```

**Union Types:**
```typescript
export type Theme = 'light' | 'dark';
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success';
```


## 🌐 Context API Implementation

### ThemeContext
**Location:** `context/ThemeContext.tsx`
**Purpose:** Global theme state management

```typescript
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  
  const toggleTheme = (): void => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme === 'dark' ? 'dark' : ''}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
```

**Benefits:**
- **No Prop Drilling:** Theme state accessible anywhere in the component tree
- **Global State:** Single source of truth for theme preferences
- **Type Safety:** Full TypeScript support with proper interfaces
- **Performance:** Only re-renders components that consume the context

## ⚡ Performance Optimizations

### React.memo
**Location:** `List.tsx`
**Purpose:** Prevents unnecessary re-renders of the List component

```typescript
const List: React.FC<ListProps> = memo(({ items, onAddItem }) => {
  console.log('List component rendered'); // Demonstrates memoization
  // Component implementation
});
```

### useCallback + React.memo Combination
**Location:** `ItemManager.tsx` + `List.tsx`
**Purpose:** Prevents child re-renders when parent state changes

The `addItem` function is memoized with `useCallback`, ensuring the `List` component (wrapped with `React.memo`) doesn't re-render when the parent's unrelated state changes.

### useMemo for Expensive Calculations
**Location:** `ExpensiveCalc.tsx`
**Purpose:** Caches factorial calculations

The factorial calculation only runs when the input number changes, not when other component state (like the counter) updates.


## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-hooks-assignment
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Start the development server:
```bash
pnpm run dev
# or
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `pnpm run dev` - Start development server
- `pnpm run build` - Build for production
- `pnpm run preview` - Preview production build
- `pnpm run lint` - Run ESLint

## ✨ Features

### 🎨 Theme System
- **Light/Dark Mode:** Complete theme switching with Context API
- **Persistent State:** Theme preference maintained across components
- **Smooth Transitions:** CSS transitions for theme changes
- **Responsive Design:** Works on all screen sizes

### 🔧 Component Features

**Counter Component:**
- Increment/Decrement/Reset functionality
- Color-coded display (green for positive, red for negative, gray for zero)
- Demonstrates useState hook

**Timer Component:**
- Auto-start on component mount
- Start/Stop/Reset functionality
- Formatted time display (MM:SS)
- Demonstrates useEffect with cleanup

**InputFocus Component:**
- Direct DOM manipulation with useRef
- Focus and clear functionality
- No unnecessary re-renders

**ExpensiveCalc Component:**
- Factorial calculation with artificial delay
- useMemo optimization demonstration
- Performance comparison with unrelated state changes

**ItemManager Component:**
- Add/Remove items functionality
- useCallback optimization
- React.memo child component demonstration

**Generic Dropdown:**
- Type-safe dropdown for any data type
- String and object type examples
- Full TypeScript IntelliSense support


## 📚 Learning Outcomes

### React Hooks Mastery
- **useState:** Managing local component state with proper TypeScript typing
- **useEffect:** Handling side effects, cleanup, and dependency arrays
- **useRef:** Direct DOM access without triggering re-renders
- **useMemo:** Performance optimization for expensive calculations
- **useCallback:** Function memoization for preventing unnecessary re-renders
- **useContext:** Global state consumption without prop drilling

### TypeScript Advanced Patterns
- **Generics:** Creating reusable components that work with any type
- **Utility Types:** Union types, enums, and interface composition
- **Type Safety:** Compile-time error prevention and better IDE support
- **Generic Constraints:** Ensuring type safety while maintaining flexibility

### Performance Optimization
- **React.memo:** Preventing unnecessary component re-renders
- **Memoization:** Using useMemo and useCallback effectively
- **Context Optimization:** Minimizing context re-renders
- **Bundle Optimization:** TypeScript compilation and tree shaking

### Modern React Patterns
- **Functional Components:** Using hooks instead of class components
- **Custom Hooks:** Creating reusable stateful logic
- **Context API:** Global state management without external libraries
- **Component Composition:** Building complex UIs from simple components

## 🎯 Key Takeaways

1. **Hooks provide powerful state management** without the complexity of class components
2. **TypeScript generics enable truly reusable components** while maintaining type safety
3. **Performance optimization** is crucial for smooth user experiences
4. **Context API** is perfect for global state that doesn't change frequently
5. **Proper TypeScript typing** prevents runtime errors and improves developer experience

## 🔍 Code Quality Features

- **Full TypeScript Coverage:** Every component and function is properly typed
- **ESLint Configuration:** Consistent code style and best practices
- **Component Documentation:** Clear comments explaining hook usage
- **Performance Monitoring:** Console logs to demonstrate optimization effects
- **Responsive Design:** Mobile-first approach with Tailwind CSS



