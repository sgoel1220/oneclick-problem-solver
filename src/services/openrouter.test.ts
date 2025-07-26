import { describe, it, expect, vi, beforeEach } from 'vitest'
import { solveProblem } from './openrouter'

// Mock fetch
global.fetch = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
})

describe('OpenRouter Service', () => {
  it('should send image to OpenRouter API and return answer', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [{
          message: {
            content: 'Answer: 42'
          }
        }]
      })
    }
    
    ;(global.fetch as any).mockResolvedValue(mockResponse)
    
    const base64Image = 'test-base64-image'
    const result = await solveProblem(base64Image)
    
    expect(fetch).toHaveBeenCalledWith(
      'https://openrouter.ai/api/v1/chat/completions',
      expect.objectContaining({
        method: 'POST',
        headers: {
          'Authorization': 'Bearer test-api-key',
          'Content-Type': 'application/json'
        },
        body: expect.stringContaining(base64Image)
      })
    )
    
    expect(result).toBe('Answer: 42')
  })

  it('should handle API errors gracefully', async () => {
    const mockResponse = {
      ok: false,
      status: 401,
      statusText: 'Unauthorized'
    }
    
    ;(global.fetch as any).mockResolvedValue(mockResponse)
    
    const base64Image = 'test-base64-image'
    
    await expect(solveProblem(base64Image)).rejects.toThrow('API request failed: 401 Unauthorized')
  })

  it('should handle network errors', async () => {
    ;(global.fetch as any).mockRejectedValue(new Error('Network error'))
    
    const base64Image = 'test-base64-image'
    
    await expect(solveProblem(base64Image)).rejects.toThrow('Network error')
  })

  it('should extract answer from various response formats', async () => {
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue({
        choices: [{
          message: {
            content: 'The answer is 25 because 5 squared equals 25.'
          }
        }]
      })
    }
    
    ;(global.fetch as any).mockResolvedValue(mockResponse)
    
    const base64Image = 'test-base64-image'
    const result = await solveProblem(base64Image)
    
    expect(result).toBe('The answer is 25 because 5 squared equals 25.')
  })
})