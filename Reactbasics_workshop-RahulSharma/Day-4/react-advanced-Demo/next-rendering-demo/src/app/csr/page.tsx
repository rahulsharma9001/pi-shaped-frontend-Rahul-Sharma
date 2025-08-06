'use client';

import { useEffect, useState } from 'react';

interface Fruit {
  id: number;
  name: string;
  color: string;
  taste: string;
}

interface ApiResponse {
  success: boolean;
  data: Fruit[];
  timestamp: string;
  message: string;
}

export default function CSRPage() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTime, setFetchTime] = useState<string>('');

  useEffect(() => {
    const fetchFruits = async () => {
      try {
        setLoading(true);
        const startTime = Date.now();
        
        const response = await fetch('/api/fruits');
        if (!response.ok) {
          throw new Error('Failed to fetch fruits');
        }
        
        const data: ApiResponse = await response.json();
        const endTime = Date.now();
        
        setFruits(data.data);
        setFetchTime(`${endTime - startTime}ms`);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchFruits();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading fruits data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">Error: {error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            CSR (Client-Side Rendering)
          </h1>
          <p className="text-gray-600 mb-4">
            Data fetched on the client using useEffect
          </p>
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 max-w-2xl mx-auto">
            <h2 className="font-semibold text-blue-800 mb-2">How CSR Works:</h2>
            <ul className="text-sm text-blue-700 text-left space-y-1">
              <li>• Page loads immediately with loading state</li>
              <li>• JavaScript executes useEffect hook after component mounts</li>
              <li>• API call is made from the browser to /api/fruits</li>
              <li>• Data is fetched and state is updated</li>
              <li>• Component re-renders with the fetched data</li>
            </ul>
            <p className="text-xs text-blue-600 mt-2">
              Fetch time: {fetchTime} | Total fruits: {fruits.length}
            </p>
          </div>
        </header>

        <main>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {fruits.map((fruit) => (
              <div 
                key={fruit.id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {fruit.name}
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Color:</span>
                      <span className="font-medium">{fruit.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Taste:</span>
                      <span className="font-medium">{fruit.taste}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>

        <footer className="text-center mt-12">
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-4 max-w-2xl mx-auto">
            <h3 className="font-semibold text-yellow-800 mb-2">CSR Characteristics:</h3>
            <div className="text-sm text-yellow-700 space-y-1">
              <p><strong>Pros:</strong> Interactive immediately, good for dynamic content, reduces server load</p>
              <p><strong>Cons:</strong> Slower initial content load, SEO challenges, requires JavaScript</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

