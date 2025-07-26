import { useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { useWebcam } from '../hooks/useWebcam'
import { useImageCapture } from '../hooks/useImageCapture'
import { Camera as CameraIcon, AlertCircle } from 'lucide-react'

interface CameraProps {
  onCapture: (imageData: string) => void
}

export default function Camera({ onCapture }: CameraProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const { stream, isLoading, error, hasPermission, startWebcam, stopWebcam } = useWebcam()
  const { captureFromVideo, toBase64 } = useImageCapture()

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream
    }
  }, [stream])

  useEffect(() => {
    return () => {
      stopWebcam()
    }
  }, [stopWebcam])

  const handleCapture = () => {
    const imageData = captureFromVideo(videoRef.current)
    if (imageData) {
      onCapture(imageData)
    }
  }

  const handleStartCamera = () => {
    startWebcam()
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Camera</h2>
        
        <div className="relative">
          <video
            ref={videoRef}
            data-testid="camera-video"
            autoPlay
            playsInline
            muted
            className="w-full h-64 bg-gray-100 rounded-lg object-cover"
            style={{ transform: 'scaleX(-1)' }} // Mirror effect
          />
          
          {!hasPermission && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 rounded-lg">
              <CameraIcon className="w-12 h-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 text-center">
                Click to enable camera access
              </p>
            </div>
          )}
          
          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-red-50 rounded-lg">
              <AlertCircle className="w-12 h-12 text-red-400 mb-2" />
              <p className="text-sm text-red-600 text-center">{error}</p>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {!hasPermission ? (
            <Button 
              onClick={handleStartCamera} 
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Starting...' : 'Enable Camera'}
            </Button>
          ) : (
            <>
              <Button 
                onClick={handleCapture} 
                disabled={!stream}
                className="flex-1"
              >
                Capture
              </Button>
              <Button 
                variant="outline" 
                onClick={stopWebcam}
              >
                Stop
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}