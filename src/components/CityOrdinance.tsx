interface OrdinanceInfo {
  hasOrdinance: boolean
  effectiveDate: string
  ordinanceCode: string
  headline: string
  intro: string
  keyProvisions: string[]
  maxLoanPercent: string
  maxRollovers: number
  principalReduction: string
  registrationRequired: boolean
  violationPenalty: string
}

interface CityOrdinanceProps {
  cityName: string
  ordinance: OrdinanceInfo
}

export function CityOrdinance({ cityName, ordinance }: CityOrdinanceProps) {
  if (!ordinance.hasOrdinance) return null

  return (
    <section className="section" style={{ background: 'var(--color-background-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <span className="section-label">Local Protections</span>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              {ordinance.headline}
            </h2>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg" style={{ borderLeft: '4px solid var(--color-primary)' }}>
            <p className="text-gray-600 mb-6">
              {ordinance.intro}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg" style={{ background: 'var(--color-primary-subtle)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                  {ordinance.maxLoanPercent}
                </div>
                <div className="text-sm text-gray-600">Max Loan (of income)</div>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'var(--color-primary-subtle)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                  {ordinance.maxRollovers}
                </div>
                <div className="text-sm text-gray-600">Max Rollovers</div>
              </div>

              <div className="p-4 rounded-lg" style={{ background: 'var(--color-primary-subtle)' }}>
                <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-display)' }}>
                  {ordinance.principalReduction}
                </div>
                <div className="text-sm text-gray-600">Principal Reduction</div>
              </div>
            </div>

            <h3 className="font-bold text-lg mb-3" style={{ fontFamily: 'var(--font-display)' }}>Key Provisions:</h3>
            <ul className="compliance-list mb-6">
              {ordinance.keyProvisions.map((provision, index) => (
                <li key={index}>{provision}</li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div>
                <strong>Ordinance Code:</strong> {ordinance.ordinanceCode}
              </div>
              <div>
                <strong>Effective Since:</strong> {new Date(ordinance.effectiveDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            </div>

            {ordinance.registrationRequired && (
              <div className="mt-4 p-3 rounded-lg" style={{ background: 'rgba(45, 138, 94, 0.1)' }}>
                <p className="text-sm mb-0" style={{ color: 'var(--color-success)' }}>
                  <strong>Note:</strong> Credit Access Businesses must register with the City of {cityName}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
