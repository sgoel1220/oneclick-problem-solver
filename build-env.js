// Build-time environment variable injection
// This script ensures secrets are properly injected during the build process
import { writeFileSync } from 'fs'

const envVars = {
  VITE_OPENROUTER_API_KEY: process.env.VITE_OPENROUTER_API_KEY || undefined
}

// Create .env.production file for build
const envContent = Object.entries(envVars)
  .filter(([, value]) => value !== undefined)
  .map(([key, value]) => `${key}=${value}`)
  .join('\n')

if (envContent) {
  writeFileSync('.env.production', envContent)
  console.log('✅ Environment variables configured for production build')
  console.log('🔑 API Key present:', !!envVars.VITE_OPENROUTER_API_KEY)
} else {
  console.warn('⚠️  No environment variables to configure')
}