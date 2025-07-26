import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useWebcam } from './useWebcam'

// Mock getUserMedia
const mockGetUserMedia = vi.fn()
const mockStop = vi.fn()
const mockVideoStream = {
  getTracks: vi.fn(() => [{ stop: mockStop }])
}

beforeEach(() => {
  vi.clearAllMocks()
  Object.defineProperty(global.navigator, 'mediaDevices', {
    value: {
      getUserMedia: mockGetUserMedia
    },
    writable: true
  })
})

describe('useWebcam', () => {
  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useWebcam())
    
    expect(result.current.stream).toBeNull()
    expect(result.current.isLoading).toBe(false)
    expect(result.current.error).toBeNull()
    expect(result.current.hasPermission).toBe(false)
  })

  it('should start webcam with front-facing camera', async () => {
    mockGetUserMedia.mockResolvedValue(mockVideoStream)
    
    const { result } = renderHook(() => useWebcam())
    
    await act(async () => {
      await result.current.startWebcam()
    })
    
    expect(mockGetUserMedia).toHaveBeenCalledWith({
      video: { facingMode: 'user' }
    })
    expect(result.current.stream).toBe(mockVideoStream)
    expect(result.current.hasPermission).toBe(true)
    expect(result.current.error).toBeNull()
  })

  it('should handle webcam permission denied error', async () => {
    const permissionError = new Error('Permission denied')
    permissionError.name = 'NotAllowedError'
    mockGetUserMedia.mockRejectedValue(permissionError)
    
    const { result } = renderHook(() => useWebcam())
    
    await act(async () => {
      await result.current.startWebcam()
    })
    
    expect(result.current.stream).toBeNull()
    expect(result.current.hasPermission).toBe(false)
    expect(result.current.error).toBe('Camera permission denied')
  })

  it('should stop webcam and clean up stream', async () => {
    mockGetUserMedia.mockResolvedValue(mockVideoStream)
    
    const { result } = renderHook(() => useWebcam())
    
    await act(async () => {
      await result.current.startWebcam()
    })
    
    act(() => {
      result.current.stopWebcam()
    })
    
    expect(mockStop).toHaveBeenCalled()
    expect(result.current.stream).toBeNull()
    expect(result.current.hasPermission).toBe(false)
  })
})