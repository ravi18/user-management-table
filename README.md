This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# React Table with Advanced Features

A modern, responsive table implementation using TanStack Table (React Table) featuring advanced functionalities including sorting, filtering, searching, and pagination.

## Features

### 1. Sorting
- Client-side sorting for all columns
- Visual indicators for sort direction
- Custom sorting for nested data (company name)

### 2. Filtering
- Individual column filters
- Global search functionality
- Fuzzy search implementation for better user experience

### 3. Pagination
- URL-based pagination using Next.js dynamic routing
- SEO-friendly URLs (e.g., `/users?page=2`)
- Maintains state during page navigation
- Loading states with skeleton placeholders

## Technical Approach

### State Management
- Utilized React Query for server state management
- Implemented optimistic updates with `keepPreviousData`
- Used URL parameters for shareable and bookmarkable pages

### Performance Optimizations
- Memoized column definitions to prevent unnecessary re-renders
- Implemented debounced search to reduce API calls
- Used skeleton loading states for better UX

### Challenges & Solutions

1. **Nested Data Handling**
   - Challenge: Sorting and filtering nested company data
   - Solution: Implemented custom accessor functions for nested properties

2. **Pagination with External API**
   - Challenge: JSONPlaceholder API lacks pagination support
   - Solution: Implemented client-side pagination simulation while maintaining real-world patterns

3. **Type Safety**
   - Challenge: Maintaining TypeScript types across components
   - Solution: Created centralized type definitions for consistent type checking

4. **Hydration Errors**
   - Challenge: Next.js server/client hydration mismatches
   - Solution: Proper implementation of `use client` directives and state initialization

## Code Structure

```typescript
src/
  ├── components/
  │   ├── Table.tsx          # Main table component
  │   └── Skeleton.tsx       # Loading placeholder
  ├── hooks/
  │   └── useUsers.ts        # Data fetching & pagination logic
  ├── types/
  │   └── index.ts           # TypeScript definitions
  └── app/
      └── page.tsx           # Main page component
