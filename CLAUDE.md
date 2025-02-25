# GOV Project Guidelines

## Build/Run Commands
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint and fix issues

## Code Style Guidelines
- **TypeScript**: Use strict typing with interfaces for data structures
- **Component Structure**: React functional components with TypeScript interfaces
- **Imports**: Group imports by React, third-party libraries, then local imports
- **Naming**: PascalCase for components, camelCase for functions/variables
- **File Structure**: One component per file, named the same as the component
- **Tailwind**: Use tailwind classes with `cn` utility for conditional classes
- **Error Handling**: Use try/catch with async/await for data fetching
- **State Management**: React hooks (useState, useEffect) for component state
- **Component Props**: Define prop interfaces for all components
- **Data Fetching**: Async functions with error handling

## Code Organization
- `app/` - Next.js app directory with layout and pages
- `components/` - Reusable React components
- `lib/` - Utility functions and shared code
- `pages/` - Additional page components