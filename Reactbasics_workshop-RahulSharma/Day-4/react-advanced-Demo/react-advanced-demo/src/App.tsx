import React, { useState, Suspense } from 'react';
import { Button } from '@/components/ui/button.jsx';
import Counter from './components/Counter';
import './App.css';

// Lazy load the Settings component
const LazySettings = React.lazy(() => import('./components/LazySettings'));

const App: React.FC = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);

  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Advanced React Demo
          </h1>
          <p className="text-gray-600">
            Demonstrating useMemo, React.memo, and lazy loading
          </p>
        </header>

        <main className="space-y-8">
          {/* Counter Component with memoization */}
          <section>
            <h2 className="text-2xl font-semibold text-center mb-4">
              Counter with Memoization
            </h2>
            <Counter initialValue={0} multiplier={3} />
          </section>

          {/* Lazy Loading Demo */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Lazy Loading Demo</h2>
            <Button
              onClick={toggleSettings}
              className="mb-4"
              data-testid="settings-button"
            >
              {showSettings ? 'Hide Settings' : 'Load Settings'}
            </Button>

            {showSettings && (
              <Suspense
                fallback={
                  <div className="flex justify-center items-center p-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-2 text-gray-600">
                      Loading Settings...
                    </span>
                  </div>
                }
              >
                <LazySettings />
              </Suspense>
            )}
          </section>
        </main>

        <footer className="text-center mt-12 text-gray-500">
          <p>Built with React, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
