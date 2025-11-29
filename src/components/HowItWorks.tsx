interface Step {
  number: number
  title: string
  description: string
}

interface HowItWorksProps {
  steps?: Step[]
}

const defaultSteps: Step[] = [
  {
    number: 1,
    title: 'Apply Online',
    description: 'Fill out our simple online application in just 5 minutes. Basic information required.',
  },
  {
    number: 2,
    title: 'Get Approved',
    description: 'Our team reviews your application quickly. Most decisions made within hours.',
  },
  {
    number: 3,
    title: 'Sign Agreement',
    description: 'Review and sign your loan agreement electronically. Clear terms, no hidden fees.',
  },
  {
    number: 4,
    title: 'Get Your Cash',
    description: 'Funds deposited directly to your bank account, often the same business day.',
  },
]

const stepIcons = [
  <path key="1" strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
  <path key="2" strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  <path key="3" strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />,
  <path key="4" strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />,
]

export function HowItWorks({ steps = defaultSteps }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="section bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Simple Process</span>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get the cash you need in just 4 easy steps. No complicated paperwork, no hassle.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full text-2xl font-bold text-white mb-6" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-light) 100%)', fontFamily: 'var(--font-display)' }}>
                {step.number}
              </div>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--color-accent)' }}>
                {stepIcons[index]}
              </svg>

              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</h3>
              <p style={{ color: 'var(--color-text-muted)' }}>{step.description}</p>

              {/* Connector line for desktop */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-4 w-8 h-0.5" style={{ background: 'linear-gradient(90deg, var(--color-primary) 0%, var(--color-border) 100%)' }}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
