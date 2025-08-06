# Next.js Rendering Demo

This project demonstrates the differences between Client-Side Rendering (CSR) and Server-Side Rendering (SSR) in Next.js.

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── fruits/
│   │       └── route.ts          # API endpoint returning fruits data
│   ├── csr/
│   │   └── page.tsx              # Client-Side Rendering example
│   ├── ssr/
│   │   └── page.tsx              # Server-Side Rendering example
│   └── page.tsx                  # Main navigation page
```

## API Endpoint

### GET /api/fruits

Returns a JSON response with an array of fruit objects:

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Apple",
      "color": "Red",
      "taste": "Sweet"
    }
    // ... more fruits
  ],
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "Fruits data retrieved successfully"
}
```

## Pages

### 1. CSR Page (`/csr`)

**Implementation:**
- Uses `'use client'` directive to enable client-side rendering
- Implements `useEffect` hook to fetch data after component mounts
- Shows loading state while data is being fetched
- Handles error states and provides retry functionality

**How it works:**
1. Page loads immediately with loading spinner
2. JavaScript executes `useEffect` hook after component mounts
3. API call is made from the browser to `/api/fruits`
4. Data is fetched and component state is updated
5. Component re-renders with the fetched data

### 2. SSR Page (`/ssr`)

**Implementation:**
- Uses async server component (default in Next.js 13+ app directory)
- Fetches data directly in the component function before rendering
- No loading states needed as data is available immediately
- Uses `cache: 'no-store'` to ensure fresh data on each request

**How it works:**
1. Server receives the request for this page
2. Server calls the API and fetches data
3. Server renders the complete HTML with data
4. Browser receives fully rendered page
5. Page is immediately visible with content

## CSR vs SSR Comparison

| Aspect | Client-Side Rendering (CSR) | Server-Side Rendering (SSR) |
|--------|----------------------------|------------------------------|
| **Initial Load** | Fast HTML delivery, then loading state while fetching data | Slower HTML generation, but complete content immediately |
| **SEO** | Poor - content not available for crawlers initially | Excellent - full content available for crawlers |
| **Server Load** | Low - only serves static files | High - renders pages on each request |
| **User Experience** | Loading states, smooth transitions after initial load | Immediate content, but full page reloads |
| **JavaScript Required** | Yes - essential for functionality | No - works without JavaScript |
| **Time to First Contentful Paint** | Fast (empty page) | Slower (but with content) |
| **Time to Interactive** | Slower (after data fetch) | Faster (immediate) |
| **Caching** | Easy to cache static assets | More complex server-side caching |
| **Development Complexity** | Higher (loading states, error handling) | Lower (straightforward data fetching) |

## Pros and Cons

### CSR Advantages:
- **Fast initial page load** - HTML is served quickly
- **Reduced server load** - Server only serves static files
- **Rich interactivity** - Smooth client-side navigation
- **Better for SPAs** - Single Page Application experience
- **Offline capability** - Can work offline with service workers

### CSR Disadvantages:
- **SEO challenges** - Content not immediately available to crawlers
- **Slower content visibility** - Users see loading states
- **JavaScript dependency** - Requires JavaScript to function
- **Larger bundle sizes** - More JavaScript to download

### SSR Advantages:
- **SEO-friendly** - Content is immediately available to search engines
- **Fast content visibility** - Users see content immediately
- **Works without JavaScript** - Functional even if JS is disabled
- **Better Core Web Vitals** - Improved LCP (Largest Contentful Paint)
- **Social media sharing** - Meta tags are properly rendered

### SSR Disadvantages:
- **Higher server load** - Server must render each page request
- **Slower TTFB** - Time to First Byte is higher
- **Less interactive** - Full page reloads for navigation
- **Complex caching** - Server-side caching strategies needed
- **Resource intensive** - More server resources required

## When to Use Each

### Use CSR when:
- Building a dashboard or admin panel
- Creating a highly interactive application
- Server resources are limited
- SEO is not a primary concern
- Building a Single Page Application (SPA)

### Use SSR when:
- SEO is critical (e-commerce, blogs, marketing sites)
- Fast content visibility is important
- Building content-heavy websites
- Supporting users with slow internet connections
- Social media sharing is important

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit:
- `http://localhost:3000` - Main navigation page
- `http://localhost:3000/csr` - Client-Side Rendering example
- `http://localhost:3000/ssr` - Server-Side Rendering example
- `http://localhost:3000/api/fruits` - API endpoint

## Technologies Used

- **Next.js 15** - React framework with app directory
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **React 19** - Latest React features and improvements

## Key Learning Points

1. **CSR** is better for interactive applications where SEO is not critical
2. **SSR** is better for content-heavy sites where SEO and fast content visibility matter
3. **Next.js** makes it easy to implement both approaches in the same application
4. **API routes** in Next.js provide a simple way to create backend endpoints
5. **Modern React** with hooks makes CSR implementation straightforward
6. **Server components** in Next.js 13+ make SSR implementation simple and efficient

