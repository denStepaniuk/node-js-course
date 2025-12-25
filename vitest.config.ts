import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Test environment
    environment: 'node',
    
    // Test file patterns
    include: ['**/__tests__/**/*.{test,spec}.{js,ts}', '**/*.{test,spec}.{js,ts}'],
    
    // Coverage configuration
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.d.ts']
    },
    
    // TypeScript support
    globals: true,
  }
})