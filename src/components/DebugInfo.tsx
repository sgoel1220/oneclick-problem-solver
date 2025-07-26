import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Info } from 'lucide-react'

export default function DebugInfo() {
  const [showDebug, setShowDebug] = useState(false)
  
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  const hasApiKey = !!apiKey
  const apiKeyPreview = apiKey ? `${apiKey.slice(0, 10)}...${apiKey.slice(-4)}` : 'Not set'

  if (import.meta.env.PROD && hasApiKey) {
    return null // Don't show debug info in production if API key is properly set
  }

  return (
    <Card className="p-4 border-orange-200 bg-orange-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-orange-600" />
          <span className="text-sm font-medium text-orange-800">
            {hasApiKey ? 'Configuration' : 'Setup Required'}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowDebug(!showDebug)}
          className="text-orange-600 hover:text-orange-800"
        >
          {showDebug ? 'Hide' : 'Show'} Details
        </Button>
      </div>
      
      {showDebug && (
        <div className="mt-3 space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Environment:</strong> {import.meta.env.MODE}
            </div>
            <div>
              <strong>API Key:</strong> {hasApiKey ? '✅ Set' : '❌ Missing'}
            </div>
          </div>
          {hasApiKey && (
            <div>
              <strong>Key Preview:</strong> <code className="bg-orange-100 px-1 rounded">{apiKeyPreview}</code>
            </div>
          )}
          {!hasApiKey && (
            <div className="p-2 bg-orange-100 rounded text-orange-800">
              <strong>Setup Instructions:</strong>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Get an API key from <a href="https://openrouter.ai" target="_blank" rel="noopener noreferrer" className="underline">OpenRouter</a></li>
                <li>Set the <code>VITE_OPENROUTER_API_KEY</code> environment variable</li>
                <li>Restart the development server</li>
              </ol>
            </div>
          )}
        </div>
      )}
    </Card>
  )
}