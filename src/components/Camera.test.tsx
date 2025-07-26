import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Camera from './Camera'

// Mock the custom hooks
vi.mock('../hooks/useWebcam', () => ({
  useWebcam: () => ({
    stream: null,
    isLoading: false,
    error: null,
    hasPermission: false,
    startWebcam: vi.fn(),
    stopWebcam: vi.fn(),
    captureImage: vi.fn()
  })
}))

describe('Camera', () => {
  it('renders camera component with video element', () => {
    render(<Camera onCapture={vi.fn()} />)
    
    expect(screen.getByTestId('camera-video')).toBeInTheDocument()
  })

  it('shows camera permission message when no permission', () => {
    render(<Camera onCapture={vi.fn()} />)
    
    expect(screen.getByText(/click to enable camera/i)).toBeInTheDocument()
  })

  it('calls onCapture when capture button is clicked', () => {
    const mockOnCapture = vi.fn()
    
    // Mock webcam hook with permission
    vi.doMock('../hooks/useWebcam', () => ({
      useWebcam: () => ({
        stream: { id: 'test-stream' },
        isLoading: false,
        error: null,
        hasPermission: true,
        startWebcam: vi.fn(),
        stopWebcam: vi.fn(),
        captureImage: vi.fn().mockReturnValue('data:image/jpeg;base64,test')
      })
    }))
    
    render(<Camera onCapture={mockOnCapture} />)
    
    const captureButton = screen.getByText(/capture/i)
    fireEvent.click(captureButton)
    
    expect(mockOnCapture).toHaveBeenCalledWith('data:image/jpeg;base64,test')
  })
})