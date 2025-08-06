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

async function getFruits(): Promise<ApiResponse> {
  try {
    // In production, this would be the full URL
    // For development, we need to use the full URL including the host
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/fruits`, {
      // Ensure fresh data on each request
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch fruits');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching fruits:', error);
    // Return fallback data in case of error
    return {
      success: false,
      data: [],
      timestamp: new Date().toISOString(),
      message: 'Failed to fetch fruits data'
    };
  }
}

export default async function SSRPage() {
  const startTime = Date.now();
  const fruitsData = await getFruits();
  const endTime = Date.now();
  const fetchTime = `${endTime - startTime}ms`;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            SSR (Server-Side Rendering)
          </h1>
          <p className="text-gray-600 mb-4">
            Data fetched on the server before page render
          </p>
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 max-w-2xl mx-auto">
            <h2 className="font-semibold text-green-800 mb-2">How SSR Works:</h2>
            <ul className="text-sm text-green-700 text-left space-y-1">
              <li>• Server receives the request for this page</li>
              <li>• Server calls the API and fetches data</li>
              <li>• Server renders the complete HTML with data</li>
              <li>• Browser receives fully rendered page</li>
              <li>• Page is immediately visible with content</li>
            </ul>
            <p className="text-xs text-green-600 mt-2">
              Server fetch time: {fetchTime} | Total fruits: {fruitsData.data.length}
            </p>
          </div>
        </header>

        <main>
          {fruitsData.success ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {fruitsData.data.map((fruit) => (
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
          ) : (
            <div className="text-center">
              <div className="text-red-600 text-xl mb-4">
                Failed to load fruits data
              </div>
              <p className="text-gray-600">
                {fruitsData.message}
              </p>
            </div>
          )}
        </main>

        <footer className="text-center mt-12">
          <div className="bg-purple-100 border border-purple-300 rounded-lg p-4 max-w-2xl mx-auto">
            <h3 className="font-semibold text-purple-800 mb-2">SSR Characteristics:</h3>
            <div className="text-sm text-purple-700 space-y-1">
              <p><strong>Pros:</strong> Fast initial content load, SEO-friendly, works without JavaScript</p>
              <p><strong>Cons:</strong> Higher server load, slower navigation, full page reloads</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

