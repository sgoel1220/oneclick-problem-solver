import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the main application with two-pane layout', () => {
    render(<App />)
    
    // Should have a solve problem button
    expect(screen.getByRole('button', { name: /solve problem/i })).toBeInTheDocument()
    
    // Should have answer display area
    expect(screen.getByTestId('answer-display')).toBeInTheDocument()
    
    // Should have camera preview area
    expect(screen.getByTestId('camera-preview')).toBeInTheDocument()
  })

  it('displays the app title', () => {
    render(<App />)
    expect(screen.getByText('OneClick Problem Solver')).toBeInTheDocument()
  })
})