import React from 'react'

interface Benefit {
  title: string
  description: string
  icon: 'lightning' | 'shield' | 'money' | 'users' | 'badge' | 'clock'
}

interface WhyChooseUsProps {
  benefits?: Benefit[]
}

const defaultBenefits: Benefit[] = [
  {
    icon: 'lightning',
    title: 'Same-Day Funding',
    description: 'Apply early and get your money the same business day. No waiting, no delays when you need cash fast.',
  },
  {
    icon: 'shield',
    title: 'Secure & Private',
    description: 'Bank-level encryption protects your information. We never sell your data to third parties.',
  },
  {
    icon: 'money',
    title: 'Transparent Terms',
    description: 'No hidden fees, no surprises. We clearly explain all rates and terms before you sign anything.',
  },
  {
    icon: 'users',
    title: 'Expert Support',
    description: 'Our friendly team is here to help Monday through Saturday. Questions? Just call or chat with us.',
  },
  {
    icon: 'badge',
    title: 'State Licensed',
    description: 'Fully licensed in California and Texas. We follow all state regulations to protect you.',
  },
  {
    icon: 'clock',
    title: 'Flexible Repayment',
    description: 'Choose a repayment schedule that works with your paycheck. We work with you, not against you.',
  },
]

const iconPaths: Record<string, React.ReactElement> = {
  lightning: <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />,
  shield: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
  money: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
  users: <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />,
  badge: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />,
  clock: <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
}

export function WhyChooseUs({ benefits = defaultBenefits }: WhyChooseUsProps) {
  return (
    <section id="benefits" className="section section--alt">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Why Ace Payday</span>
          <h2 className="section-title">Why Thousands Trust Us</h2>
          <p className="section-subtitle">We&apos;re committed to providing fast, fair, and transparent financial solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="card">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
                  {iconPaths[benefit.icon]}
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>{benefit.title}</h3>
              <p style={{ color: 'var(--color-text-muted)' }} className="mb-0">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
