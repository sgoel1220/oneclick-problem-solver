import { useState } from 'react'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Info } from 'lucide-react'

export default function DebugInfo() {
  const [showDebug, setShowDebug] = useState(false)
  
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY
  const hasApiKey = !!apiKey && apiKey.length > 10
  
  // Never show actual key values, only status
  const getKeyStatus = () => {
    if (!apiKey) return '❌ Not Set'
    if (apiKey.length < 10) return '⚠️ Invalid Format'
    return '✅ Configured'
  }

  // Don't show debug info in production if everything is working
  if (import.meta.env.PROD && hasApiKey) {
    return null
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
              <strong>API Key:</strong> {getKeyStatus()}
            </div>
          </div>
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