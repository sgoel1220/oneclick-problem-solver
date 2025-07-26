import { useState } from 'react'
import { Button } from './components/ui/button'
import { Card } from './components/ui/card'
import Camera from './components/Camera'
import { solveProblem } from './services/openrouter'
import { useImageCapture } from './hooks/useImageCapture'
import { Loader2, AlertCircle } from 'lucide-react'

function App() {
  const [answer, setAnswer] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toBase64 } = useImageCapture()

  const handleSolveProblem = async (imageData: string) => {
    setIsLoading(true)
    setError(null)
    setAnswer('')

    try {
      const base64Image = toBase64(imageData)
      const result = await solveProblem(base64Image)
      setAnswer(result)
    } catch (err) {
      const error = err as Error
      setError(error.message || 'Failed to solve problem')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">OneClick Problem Solver</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[600px]">
          {/* Left Pane - Answer Display */}
          <Card className="p-6" data-testid="answer-display">
            <h2 className="text-xl font-semibold mb-4">Answer</h2>
            <div className="flex-1 flex items-center justify-center min-h-[300px]">
              {isLoading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="w-8 h-8 animate-spin" />
                  <p className="text-sm text-muted-foreground">Solving problem...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center gap-2 text-red-600">
                  <AlertCircle className="w-8 h-8" />
                  <p className="text-sm text-center">{error}</p>
                </div>
              ) : answer ? (
                <div className="w-full">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-lg font-medium text-green-800">{answer}</p>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-center">
                  Capture an image with a problem to get started
                </p>
              )}
            </div>
          </Card>

          {/* Right Pane - Camera */}
          <div data-testid="camera-preview">
            <Camera onCapture={handleSolveProblem} />
          </div>
        </div>

        {/* One-Click Solve Button */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            Position the problem in front of your camera and click capture to solve instantly
          </p>
        </div>
      </div>
    </div>
  )
}

export default App