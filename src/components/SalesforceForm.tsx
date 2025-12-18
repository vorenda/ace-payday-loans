'use client'

import { useEffect, useState } from 'react'

interface SalesforceFormProps {
  leadSource?: string
  leadState?: string
  paidOff?: string
  balance?: string
  leadChannel?: string
}

export function SalesforceForm({
  leadSource = 'Ace Payday Loans',
  leadState = '',
  paidOff = '',
  balance = '0',
  leadChannel = 'Web',
}: SalesforceFormProps) {
  const [iframeSrc, setIframeSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Build iframe URL with all parameters
    const baseUrl = 'https://montanacapital.my.salesforce-sites.com/trust'
    const cssUrl = `${window.location.origin}/css/apply-iframe.css`
    const sourcePage = encodeURIComponent(window.location.href)
    const sourceReferer = encodeURIComponent(document.referrer || '')

    const params = new URLSearchParams({
      leadSource,
      leadChannel,
      sourcePage,
      sourceReferer,
      css: cssUrl,
    })

    // Only add optional params if they have values
    if (leadState) params.set('leadstate', leadState)
    if (paidOff) params.set('paidoff', paidOff)
    if (balance) params.set('balance', balance)

    setIframeSrc(`${baseUrl}?${params.toString()}`)

    // Give iframe time to load
    const timer = setTimeout(() => setIsLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [leadSource, leadState, paidOff, balance, leadChannel])

  return (
    <div className="salesforce-form-container" style={{ position: 'relative', minHeight: '600px' }}>
      {/* Loading state */}
      {isLoading && (
        <div style={loadingStyles}>
          <div style={spinnerStyles}></div>
          <p>Loading form...</p>
        </div>
      )}

      {/* Iframe */}
      {iframeSrc && (
        <iframe
          id="salesforce-iframe"
          src={iframeSrc}
          style={{
            width: '100%',
            minHeight: '600px',
            border: 'none',
            opacity: isLoading ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
          title="Loan Application Form"
          onLoad={() => setIsLoading(false)}
        />
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

const loadingStyles: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  color: '#333',
  fontFamily: 'system-ui, -apple-system, sans-serif',
}

const spinnerStyles: React.CSSProperties = {
  width: '40px',
  height: '40px',
  border: '4px solid #e5e7eb',
  borderTop: '4px solid #3b82f6',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite',
  marginBottom: '1rem',
}
