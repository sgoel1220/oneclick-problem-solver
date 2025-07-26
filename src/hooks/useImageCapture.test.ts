import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useImageCapture } from './useImageCapture'

// Mock canvas and context
const mockToDataURL = vi.fn()
const mockDrawImage = vi.fn()
const mockGetContext = vi.fn(() => ({
  drawImage: mockDrawImage
}))

const mockCanvas = {
  getContext: mockGetContext,
  toDataURL: mockToDataURL,
  width: 0,
  height: 0
}

beforeEach(() => {
  vi.clearAllMocks()
  
  // Mock createElement for canvas
  const originalCreateElement = document.createElement.bind(document)
  vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
    if (tagName === 'canvas') {
      return mockCanvas as unknown as HTMLCanvasElement
    }
    return originalCreateElement(tagName)
  })
})

describe('useImageCapture', () => {
  it('should capture image from video element', () => {
    mockToDataURL.mockReturnValue('data:image/jpeg;base64,test123')
    
    const { result } = renderHook(() => useImageCapture())
    
    const mockVideo = {
      videoWidth: 640,
      videoHeight: 480
    } as HTMLVideoElement
    
    let capturedImage: string | null = null
    
    act(() => {
      capturedImage = result.current.captureFromVideo(mockVideo)
    })
    
    expect(mockDrawImage).toHaveBeenCalledWith(mockVideo, 0, 0)
    expect(mockToDataURL).toHaveBeenCalledWith('image/jpeg', 0.8)
    expect(capturedImage).toBe('data:image/jpeg;base64,test123')
  })

  it('should return null when video element is null', () => {
    const { result } = renderHook(() => useImageCapture())
    
    let capturedImage: string | null = null
    
    act(() => {
      capturedImage = result.current.captureFromVideo(null)
    })
    
    expect(capturedImage).toBeNull()
  })

  it('should convert image to base64 format', () => {
    const { result } = renderHook(() => useImageCapture())
    
    const dataUrl = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD'
    const base64 = result.current.toBase64(dataUrl)
    
    expect(base64).toBe('/9j/4AAQSkZJRgABAQAAAQABAAD')
  })
})