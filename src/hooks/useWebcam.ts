import { useState, useCallback, useRef } from 'react'

interface UseWebcamReturn {
  stream: MediaStream | null
  isLoading: boolean
  error: string | null
  hasPermission: boolean
  startWebcam: () => Promise<void>
  stopWebcam: () => void
  captureImage: () => string | null
}

export function useWebcam(): UseWebcamReturn {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasPermission, setHasPermission] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const startWebcam = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      })
      
      setStream(mediaStream)
      setHasPermission(true)
      
      // Store video ref for image capture
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      const error = err as Error
      
      if (error.name === 'NotAllowedError') {
        setError('Camera permission denied')
      } else if (error.name === 'NotFoundError') {
        setError('No camera found')
      } else {
        setError('Failed to access camera')
      }
      
      setHasPermission(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const stopWebcam = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setHasPermission(false)
      
      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }, [stream])

  const captureImage = useCallback((): string | null => {
    if (!videoRef.current || !stream) {
      return null
    }

    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    
    if (!context) {
      return null
    }

    const video = videoRef.current
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    
    context.drawImage(video, 0, 0)
    
    return canvas.toDataURL('image/jpeg', 0.8)
  }, [stream])

  return {
    stream,
    isLoading,
    error,
    hasPermission,
    startWebcam,
    stopWebcam,
    captureImage
  }
}