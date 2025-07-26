import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Camera from './Camera'

// Mock the custom hooks
const mockUseWebcam = vi.fn()
const mockUseImageCapture = vi.fn()

vi.mock('../hooks/useWebcam', () => ({
  useWebcam: () => mockUseWebcam()
}))

vi.mock('../hooks/useImageCapture', () => ({
  useImageCapture: () => mockUseImageCapture()
}))

describe('Camera', () => {
  beforeEach(() => {
    mockUseWebcam.mockReturnValue({
      stream: null,
      isLoading: false,
      error: null,
      hasPermission: false,
      startWebcam: vi.fn(),
      stopWebcam: vi.fn()
    })

    mockUseImageCapture.mockReturnValue({
      captureFromVideo: vi.fn(),
      toBase64: vi.fn()
    })
  })

  it('renders camera component with video element', () => {
    render(<Camera onCapture={vi.fn()} />)
    
    expect(screen.getByTestId('camera-video')).toBeInTheDocument()
  })

  it('shows camera permission message when no permission', () => {
    render(<Camera onCapture={vi.fn()} />)
    
    expect(screen.getByText(/click to enable camera/i)).toBeInTheDocument()
  })

  it('shows enable camera button when no permission', () => {
    render(<Camera onCapture={vi.fn()} />)
    
    expect(screen.getByRole('button', { name: /enable camera/i })).toBeInTheDocument()
  })
})