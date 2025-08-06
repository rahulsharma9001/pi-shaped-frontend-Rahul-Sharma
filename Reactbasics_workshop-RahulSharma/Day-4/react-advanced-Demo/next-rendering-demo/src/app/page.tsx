import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="container mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Next.js Rendering Demo
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the differences between Client-Side Rendering (CSR) and 
            Server-Side Rendering (SSR) in Next.js
          </p>
        </header>

        <main className="max-w-6xl mx-auto">
          {/* Navigation Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Link href="/csr" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Client-Side Rendering
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Data is fetched in the browser using useEffect after the component mounts
                  </p>
                  <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-700">
                    <strong>Features:</strong> Loading states, client-side data fetching, interactive immediately
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/ssr" className="group">
              <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    Server-Side Rendering
                  </h2>
                  <p className="text-gray-600 mb-4">
                    Data is fetched on the server before the page is sent to the browser
                  </p>
                  <div className="bg-green-50 rounded-lg p-3 text-sm text-green-700">
                    <strong>Features:</strong> SEO-friendly, fast initial load, pre-rendered content
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gray-50 px-6 py-4 border-b">
              <h3 className="text-xl font-bold text-gray-800">CSR vs SSR Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Aspect
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client-Side Rendering (CSR)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Server-Side Rendering (SSR)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Initial Load
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Fast HTML, then loading state while fetching data
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Slower HTML generation, but complete content immediately
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      SEO
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Poor - content not available for crawlers initially
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Excellent - full content available for crawlers
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Server Load
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Low - only serves static files
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      High - renders pages on each request
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      User Experience
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Loading states, smooth transitions after initial load
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Immediate content, but full page reloads
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      JavaScript Required
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      Yes - essential for functionality
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      No - works without JavaScript
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* API Information */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">API Endpoint</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <code className="text-sm text-gray-700">
                GET /api/fruits
              </code>
              <p className="text-sm text-gray-600 mt-2">
                Returns a JSON array of fruit objects with id, name, color, and taste properties.
                Both CSR and SSR pages fetch data from this same endpoint to demonstrate the different rendering approaches.
              </p>
            </div>
          </div>
        </main>

        <footer className="text-center mt-12 text-gray-500">
          <p>Built with Next.js 15, TypeScript, and Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}

