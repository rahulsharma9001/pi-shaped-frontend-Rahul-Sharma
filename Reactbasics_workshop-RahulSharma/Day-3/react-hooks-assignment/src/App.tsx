import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import Counter from './components/Counter'
import Timer from './components/Timer'
import InputFocus from './components/InputFocus'
import ExpensiveCalc from './components/ExpensiveCalc'
import ItemManager from './components/ItemManager'
import ThemeToggle from './components/ThemeToggle'
import DropdownDemo from './components/DropdownDemo'
import './App.css'

function App(): JSX.Element {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors">
        <div className="container mx-auto px-4 max-w-6xl">
          <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            React Hooks & TypeScript Assignment
          </h1>
          <div className="text-center text-gray-600 dark:text-gray-300 mb-8">
            <p>This application demonstrates various React hooks, Context API, and TypeScript generics.</p>
          </div>
          
          {/* Phase 2: Counter and Timer Components */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Phase 2: useState & useEffect</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Counter />
                <Timer />
              </div>
            </div>

            {/* Phase 3: useRef and useMemo Components */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Phase 3: useRef & useMemo</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <InputFocus />
                <ExpensiveCalc />
              </div>
            </div>

            {/* Phase 4: useCallback and Memoized Child */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Phase 4: useCallback & React.memo</h2>
              <ItemManager />
            </div>

            {/* Phase 5: Context API */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Phase 5: Context API</h2>
              <ThemeToggle />
            </div>

            {/* Phase 6: TypeScript Generics */}
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Phase 6: TypeScript Generics</h2>
              <DropdownDemo />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App

