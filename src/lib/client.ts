import { treaty } from '@elysiajs/eden'
import type { app } from '../app/api/[[...slugs]]/route'

// Client-side only - use type import to avoid bundling server code
export const client = treaty<typeof app>(
  typeof window === 'undefined' 
    ? 'localhost:3000' 
    : window.location.origin
).api