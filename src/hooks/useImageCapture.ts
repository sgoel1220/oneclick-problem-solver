import { useCallback } from 'react'

interface UseImageCaptureReturn {
  captureFromVideo: (video: HTMLVideoElement | null) => string | null
  toBase64: (dataUrl: string) => string
}

export function useImageCapture(): UseImageCaptureReturn {
  const captureFromVideo = useCallback((video: HTMLVideoElement | null): string | null => {
    if (!video) {
      return null
    }

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    if (!context) {
      return null
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    context.drawImage(video, 0, 0)
    
    return canvas.toDataURL('image/jpeg', 0.8)
  }, [])

  const toBase64 = useCallback((dataUrl: string): string => {
    return dataUrl.split(',')[1]
  }, [])

  return {
    captureFromVideo,
    toBase64
  }
}