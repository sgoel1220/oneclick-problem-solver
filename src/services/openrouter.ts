const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions'
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY

// Validate API key at module load
if (!API_KEY || API_KEY === 'test-api-key') {
  console.warn('⚠️ OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY environment variable.')
}

const PROBLEM_SOLVING_PROMPT = `You will receive an image containing a problem statement (e.g. a math or logical question). Your task is to:
1. Read the problem from the image.
2. Solve it step by step.
3. Respond with only the **final answer** — no explanation, no context.

Example format:  
"Answer: 42"`

export async function solveProblem(base64Image: string): Promise<string> {
  // Check API key before making request
  if (!API_KEY) {
    throw new Error('OpenRouter API key not configured. Please set VITE_OPENROUTER_API_KEY environment variable.')
  }

  try {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat-v3-0324:free',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: PROBLEM_SOLVING_PROMPT
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:image/jpeg;base64,${base64Image}`
                }
              }
            ]
          }
        ],
        max_tokens: 300
      })
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const answer = data.choices?.[0]?.message?.content

    if (!answer) {
      throw new Error('No answer received from API')
    }

    return answer.trim()
  } catch (error) {
    console.error('Error solving problem:', error)
    throw error
  }
}