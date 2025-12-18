'use client'

import { useEffect, useState } from 'react'

const CACHE_KEY = 'lms_form_cache'
const CACHE_DURATION = 15 * 60 * 1000 // 15 minutes in milliseconds
const EMBEDDED_FORM_SCRIPT = 'https://static.yourembeddedform.com/latest/js/index.js'

interface CacheData {
  html: string
  timestamp: number
}

// Load external script and return a promise
function loadExternalScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if already loaded
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.src = src
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`))
    document.head.appendChild(script)
  })
}

// Track if scripts have been executed to prevent duplicates
let scriptsExecuted = false

// Execute scripts from HTML by appending to document.body
// This matches WordPress plugin behavior - scripts must be appended to visible DOM to execute
function executeScriptsFromHtml(html: string) {
  // Prevent duplicate execution (e.g., from React hot reload)
  if (scriptsExecuted) {
    console.log('LMS scripts already executed, skipping')
    return
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  // DOMParser may put scripts in doc.head, so we need to check all scripts in the document
  const scripts = doc.querySelectorAll('script')

  scripts.forEach(scriptElement => {
    // Create new script element and append to document.body for execution
    const script = document.createElement('script')
    script.id = 'lms-injected-script'
    Array.from(scriptElement.attributes).forEach(attr => {
      script.setAttribute(attr.name, attr.value)
    })
    script.textContent = scriptElement.textContent
    document.body.appendChild(script)
  })

  scriptsExecuted = true
}

export function LmsForm() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const initializeForm = async () => {
      try {
        // 1. Load external EmbeddedForm script first
        await loadExternalScript(EMBEDDED_FORM_SCRIPT)

        // Wait for EmbeddedForm to be available on window
        let attempts = 0
        while (!(window as any).EmbeddedForm && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100))
          attempts++
        }

        if (!(window as any).EmbeddedForm) {
          throw new Error('EmbeddedForm failed to initialize')
        }

        // 2. Check localStorage cache
        let html: string | null = null
        const cached = localStorage.getItem(CACHE_KEY)
        if (cached) {
          const cacheData: CacheData = JSON.parse(cached)
          if (Date.now() - cacheData.timestamp < CACHE_DURATION) {
            html = cacheData.html
          }
        }

        // 3. Fetch from API if no valid cache (gets dynamic HTML from Heroku)
        if (!html) {
          const response = await fetch('/api/lms-form/')
          if (!response.ok) {
            throw new Error(`Failed to fetch form: ${response.status} ${response.statusText}`)
          }
          const data = await response.json()
          html = data.html_content

          // Cache the result
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            html,
            timestamp: Date.now()
          }))
        }

        // 4. Execute scripts from the HTML (dynamic config from Heroku)
        executeScriptsFromHtml(html)

        // 5. Wait for form to render
        await new Promise(resolve => setTimeout(resolve, 1500))
        setIsLoading(false)

      } catch (err) {
        console.error('Error initializing LMS form:', err)
        setError(err instanceof Error ? err.message : 'Failed to load form')
        setIsLoading(false)
      }
    }

    initializeForm()

    // Cleanup on unmount
    return () => {
      scriptsExecuted = false
    }
  }, [])

  return (
    <div className="lms-form-container">
      {/* Loading state */}
      {isLoading && (
        <div className="lms-form-loading" style={loadingStyles}>
          <div className="spinner" style={spinnerStyles}></div>
          <p>Loading form...</p>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="lms-form-error" style={errorStyles}>
          <p>{error}</p>
          <button
            onClick={() => {
              localStorage.removeItem(CACHE_KEY)
              window.location.reload()
            }}
            style={retryButtonStyles}
          >
            Retry
          </button>
        </div>
      )}

      {/* Container for EmbeddedForm.init() - MUST always be in DOM */}
      <div id="form-content"></div>
    </div>
  )
}

// Inline styles to match site theme
const loadingStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
  minHeight: '200px',
  color: 'var(--color-text, #333)',
  fontFamily: 'var(--font-family, system-ui, -apple-system, sans-serif)'
}

const spinnerStyles: React.CSSProperties = {
  width: '40px',
  height: '40px',
  border: '4px solid var(--color-border, #e5e7eb)',
  borderTop: '4px solid var(--color-primary, #3b82f6)',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '1rem'
}

const errorStyles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem',
  backgroundColor: 'var(--color-error-bg, #fee2e2)',
  border: '1px solid var(--color-error-border, #ef4444)',
  borderRadius: '8px',
  color: 'var(--color-error-text, #991b1b)',
  fontFamily: 'var(--font-family, system-ui, -apple-system, sans-serif)'
}

const retryButtonStyles: React.CSSProperties = {
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  backgroundColor: 'var(--color-primary, #3b82f6)',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '1rem',
  fontWeight: '500'
}

// Add spinner animation via style tag
if (typeof document !== 'undefined') {
  const styleId = 'lms-form-spinner-animation'
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `
    document.head.appendChild(style)
  }
}
