interface ComplianceInfo {
  headline: string
  content?: string
  intro?: string
  keyPoints: string[]
  regulatoryBody: string
  regulatoryUrl: string
  contactPhone?: string
  consumerHelpline?: string
  disclaimer: string
  warningBox?: {
    title: string
    content: string
  }
  aprDisclosure?: string
  protectionsList?: string[]
}

interface StateComplianceProps {
  stateName: string
  compliance: ComplianceInfo
}

export function StateCompliance({ stateName, compliance }: StateComplianceProps) {
  const phone = compliance.contactPhone || compliance.consumerHelpline

  return (
    <section className="section" style={{ background: 'var(--color-primary-subtle)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-label">Licensed & Regulated</span>
          <h2 className="section-title">{compliance.headline}</h2>
          {(compliance.intro || compliance.content) && (
            <p className="section-subtitle">{compliance.intro || compliance.content}</p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Key Points Card */}
          <div className="compliance-card">
            <h3 className="flex items-center gap-3 text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6" style={{ color: 'var(--color-primary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {stateName} Regulations
            </h3>
            <ul className="compliance-list">
              {compliance.keyPoints.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Regulatory Info Card */}
          <div className="compliance-card">
            <h3 className="flex items-center gap-3 text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6" style={{ color: 'var(--color-primary)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Regulatory Information
            </h3>

            <div className="space-y-4">
              <div>
                <div className="font-medium mb-1">Regulatory Body:</div>
                <p className="text-gray-600 mb-0">{compliance.regulatoryBody}</p>
              </div>

              {compliance.regulatoryUrl && (
                <div>
                  <div className="font-medium mb-1">Website:</div>
                  <a
                    href={compliance.regulatoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {compliance.regulatoryUrl}
                  </a>
                </div>
              )}

              {phone && (
                <div>
                  <div className="font-medium mb-1">Consumer Helpline:</div>
                  <a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:underline" style={{ color: 'var(--color-primary)' }}>
                    {phone}
                  </a>
                </div>
              )}

              {compliance.protectionsList && compliance.protectionsList.length > 0 && (
                <div>
                  <div className="font-medium mb-2">Consumer Protections:</div>
                  <ul className="compliance-list">
                    {compliance.protectionsList.map((protection, index) => (
                      <li key={index}>{protection}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Warning Box */}
        {compliance.warningBox && (
          <div className="mt-8 rounded-xl p-6" style={{ background: 'rgba(224, 159, 62, 0.1)', borderLeft: '4px solid var(--color-warning)' }}>
            <h4 className="flex items-center gap-2 font-bold mb-2" style={{ color: 'var(--color-warning)', fontFamily: 'var(--font-display)' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {compliance.warningBox.title}
            </h4>
            <p className="text-gray-600 mb-0">{compliance.warningBox.content}</p>
          </div>
        )}

        {/* APR Disclosure */}
        {compliance.aprDisclosure && (
          <div className="mt-6 p-4 rounded-lg" style={{ background: 'rgba(13, 79, 79, 0.05)' }}>
            <p className="text-sm text-gray-600 mb-0">
              <strong>APR Disclosure:</strong> {compliance.aprDisclosure}
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-6 p-4 rounded-lg" style={{ background: 'rgba(13, 79, 79, 0.05)' }}>
          <p className="text-sm text-gray-600 mb-0">
            <strong>Disclaimer:</strong> {compliance.disclaimer}
          </p>
        </div>
      </div>
    </section>
  )
}
