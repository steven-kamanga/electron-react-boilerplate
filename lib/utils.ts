import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCode(code: string): string {
  return code
    .replace(/_/g, '') // Remove all underscores
    .toLowerCase() // Convert to lowercase
    .replace(/^./, (char) => char.toUpperCase()); // Capitalize first letter only
}
