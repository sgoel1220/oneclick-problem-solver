import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ command }) => {
  // Use repository name from environment or default
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'oneclick-problem-solver'
  
  return {
    plugins: [react()],
    base: command === 'build' ? `/${repoName}/` : '/',
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
    },
  }
})