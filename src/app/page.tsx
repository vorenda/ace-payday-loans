import { Hero, HowItWorks, WhyChooseUs, Testimonials, FAQ, CTASection } from '@/components'
import { getBusinessProfile, getAllStates, getAllServices } from '@/lib/data'
import Link from 'next/link'

export default function HomePage() {
  const business = getBusinessProfile()
  const states = getAllStates()
  const services = getAllServices()

  const defaultFaqs = [
    {
      question: 'How much can I borrow with a payday loan?',
      answer: 'Loan amounts vary by state. In California, you can borrow up to $300. In Texas, loan amounts typically range from $100 to $1,500 depending on your income and the lender\'s assessment. We\'ll let you know exactly what you qualify for during the application process.',
    },
    {
      question: 'How fast can I get my money?',
      answer: 'If you apply early in the business day and are approved, you can often receive funds the same day via direct deposit to your bank account. Applications submitted later or on weekends will typically be funded the next business day.',
    },
    {
      question: 'What do I need to apply?',
      answer: 'To apply, you\'ll need: a valid government-issued ID, proof of income (recent pay stubs or bank statements), an active checking account, and a working phone number and email. The application takes about 5 minutes to complete online.',
    },
    {
      question: 'Will applying affect my credit score?',
      answer: 'We perform a soft credit check during the application process, which does not affect your credit score. However, if you accept the loan and later default on payments, that could be reported to credit bureaus.',
    },
    {
      question: 'Can I repay my loan early?',
      answer: 'Yes! There are no prepayment penalties. You can pay off your loan early and may save on interest charges. Simply contact us or log into your account to make an early payment.',
    },
    {
      question: 'What happens if I can\'t repay on time?',
      answer: 'If you\'re having trouble making a payment, contact us immediately. In Texas, you may be eligible for an extended payment plan at no additional cost. We\'d rather work with you to find a solution than see you struggle. Late payments may result in additional fees and could affect your credit.',
    },
  ]

  return (
    <>
      <Hero
        headline="Get the Cash You Need Today"
        highlightText="Cash You Need"
        subheadline="Apply online in minutes, get approved fast, and receive funds as soon as the same business day. Trusted by thousands across California and Texas."
        primaryCtaText="Apply Now - Free Quote"
        primaryCtaHref="/apply"
        secondaryCtaText="Call Now"
        secondaryCtaHref="tel:+18005551234"
        phone="(800) 555-1234"
        stats={[
          { value: '50K+', label: 'Customers Served' },
          { value: '24hr', label: 'Fast Approval' },
          { value: '4.8', label: 'Customer Rating' },
        ]}
      />

      <HowItWorks />

      <WhyChooseUs />

      {/* Services Section */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">Our Services</span>
            <h2 className="section-title">Financial Solutions for Your Needs</h2>
            <p className="section-subtitle">We offer a range of short-term lending options to help you through tough times.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.slice(0, 8).map((service, index) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="card group block text-center"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-teal-700" style={{ fontFamily: 'var(--font-display)' }}>
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 mb-0">{service.shortDescription}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/services" className="btn btn--secondary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      <Testimonials
        headline="What Our Customers Say"
        reviews={((business.reviews as unknown as Record<string, unknown>)?.testimonials as Array<{text: string; author: string; location: string; rating: number; date?: string}>) || []}
      />

      {/* Locations Section */}
      <section className="section" style={{ background: 'var(--color-primary-subtle)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">Locations</span>
            <h2 className="section-title">Serving {states.length} States</h2>
            <p className="section-subtitle">Find a location near you. We have branches across California and Texas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/locations/${state.slug}`}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-teal-700" style={{ fontFamily: 'var(--font-display)' }}>
                    {state.name}
                  </h3>
                  <span className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>
                    {state.abbreviation}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  Serving {state.cities.length} cities across {state.name}
                </p>
                <div className="flex flex-wrap gap-2">
                  {state.cities.slice(0, 4).map((city) => (
                    <span
                      key={city.slug}
                      className="px-3 py-1 text-sm rounded-full"
                      style={{ background: 'var(--color-background-alt)' }}
                    >
                      {city.name}
                    </span>
                  ))}
                  {state.cities.length > 4 && (
                    <span className="px-3 py-1 text-sm rounded-full" style={{ background: 'var(--color-background-alt)' }}>
                      +{state.cities.length - 4} more
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/locations" className="btn btn--primary">
              Find Your Location
            </Link>
          </div>
        </div>
      </section>

      {/* State Compliance Summary */}
      <section className="section bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">Licensed & Regulated</span>
            <h2 className="section-title">State Compliance Information</h2>
            <p className="section-subtitle">We operate fully within state regulations to protect you.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="compliance-card">
              <h3 className="flex items-center gap-3 text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6" style={{ color: 'var(--color-primary)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                California
              </h3>
              <ul className="compliance-list">
                <li>Licensed by the California Department of Financial Protection and Innovation (DFPI)</li>
                <li>Maximum loan amount: $300</li>
                <li>Maximum fee: $45 per $300 borrowed (15%)</li>
                <li>Loan term: 14-31 days</li>
                <li>Rollovers not permitted</li>
              </ul>
            </div>

            <div className="compliance-card">
              <h3 className="flex items-center gap-3 text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-6 h-6" style={{ color: 'var(--color-primary)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Texas
              </h3>
              <ul className="compliance-list">
                <li>Registered Credit Access Business (CAB) with the Texas Office of Consumer Credit Commissioner (OCCC)</li>
                <li>We arrange loans with third-party lenders</li>
                <li>All fees disclosed before signing</li>
                <li>Extended payment plans available</li>
                <li>Right to rescind within 3 business days</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FAQ faqs={defaultFaqs} />

      <CTASection />
    </>
  )
}
