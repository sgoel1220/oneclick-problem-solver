# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OneClick Problem Solver is a React-based web application that uses a front-facing camera to capture images of problems (math, puzzles, etc.) and solves them using AI via OpenRouter API. Built with Vite, TypeScript, ShadCN UI, and Tailwind CSS.

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Architecture

### Core Components
- `App.tsx` - Main application with two-pane layout (answer display + camera)
- `Camera.tsx` - Webcam interface with capture functionality
- `hooks/useWebcam.ts` - Webcam access and stream management
- `hooks/useImageCapture.ts` - Image capture and base64 conversion
- `services/openrouter.ts` - AI problem-solving API integration

### Key Features
- Front-facing camera access with `getUserMedia`
- Real-time video preview with mirror effect
- One-click image capture to canvas
- Base64 image encoding for API requests
- OpenRouter API integration with GPT-4 Vision
- Error handling for camera permissions and API failures
- Responsive design for mobile and desktop

### Testing Strategy
- Test-driven development (TDD) approach
- Vitest + React Testing Library
- Component unit tests
- Hook testing with renderHook
- API service mocking
- Setup file: `src/test/setup.ts`

### Environment Variables
- `VITE_OPENROUTER_API_KEY` - Required for OpenRouter API access
- Copy `.env.example` to `.env` and add your API key

## UI Components (ShadCN)

Located in `src/components/ui/`:
- `button.tsx` - Primary action buttons
- `card.tsx` - Content containers
- Uses Tailwind CSS for styling
- CSS variables in `src/index.css` for theming

## API Integration

The app sends captured images to OpenRouter with this prompt structure:
```
"Read the problem from the image, solve it, respond with only the final answer"
```

Supports GPT-4 Vision and Claude models via OpenRouter proxy.

## Development Notes

- Camera stream uses `facingMode: 'user'` for front camera
- Video element has mirror effect (`scaleX(-1)`)
- Canvas capture at 0.8 JPEG quality
- Error boundaries for camera and API failures
- Performance target: <5s response time