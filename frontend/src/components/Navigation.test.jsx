import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Navigation from './Navigation'
import { BrowserRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'

describe('Navigation', () => {
  it('renders logo text', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    )
    expect(screen.getByText(/Carbon Track/i)).toBeInTheDocument()
  })
})
