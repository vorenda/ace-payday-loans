import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs, CityCard, CTASection, FAQ } from '@/components'
import { getAllStates, getState, getStateCompliance, getAllServices, getBusinessProfile, generateBreadcrumbs } from '@/lib/data'

interface StatePageProps {
  params: Promise<{
    state: string
  }>
}

export async function generateStaticParams() {
  const states = getAllStates()
  return states.map((state) => ({
    state: state.slug,
  }))
}

export async function generateMetadata({ params }: StatePageProps): Promise<Metadata> {
  const { state: stateSlug } = await params
  const state = getState(stateSlug)

  if (!state) {
    return {
      title: 'State Not Found',
    }
  }

  return {
    title: `Payday Loans in ${state.name} - ${state.cities.length} Locations | Ace Payday Loans`,
    description: `Find payday loans in ${state.name}. We have ${state.cities.length} locations across ${state.name} including ${state.cities.slice(0, 3).map(c => c.name).join(', ')}. Fast service, local expertise.`,
    keywords: `payday loans ${state.name}, cash advance ${state.name}, ${state.abbreviation} payday loans, payday loans near me ${state.name}`,
  }
}

export default async function StatePage({ params }: StatePageProps) {
  const { state: stateSlug } = await params
  const state = getState(stateSlug)
  const business = getBusinessProfile()

  if (!state) {
    notFound()
  }

  const stateCompliance = getStateCompliance(state.abbreviation)
  const services = getAllServices()

  const stateFaqs = [
    {
      question: `Are payday loans legal in ${state.name}?`,
      answer: stateCompliance?.legalStatus.notes || `Yes, payday loans are legal in ${state.name}. We are fully licensed and regulated by the state.`,
    },
    {
      question: `How much can I borrow in ${state.name}?`,
      answer: stateCompliance?.regulations.maxLoanAmount
        ? `In ${state.name}, the maximum payday loan amount is $${stateCompliance.regulations.maxLoanAmount}.`
        : `Loan amounts in ${state.name} vary based on your income and our assessment. Contact us for details.`,
    },
    {
      question: `What do I need to apply for a payday loan in ${state.name}?`,
      answer: `To apply in ${state.name}, you'll need a valid government-issued ID, proof of income (pay stubs or bank statements), an active checking account, and a working phone number. The application process takes about 5-10 minutes.`,
    },
    {
      question: `How fast can I get money in ${state.name}?`,
      answer: `If you apply early in the business day and are approved, you can often receive funds the same day. Applications submitted later may be funded the next business day.`,
    },
    {
      question: `Does ${state.name} have special payday loan regulations?`,
      answer: stateCompliance?.cityPageContent.disclaimer || `Yes, ${state.name} has specific regulations to protect consumers. We comply fully with all state requirements and disclose all fees upfront.`,
    },
  ]

  const breadcrumbSchema = generateBreadcrumbs([
    { label: 'Home', href: '/' },
    { label: 'Locations', href: '/locations' },
    { label: state.name, href: `/locations/${state.slug}` },
  ])

  return (
    <div className="pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: state.name, href: `/locations/${state.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 bg-white/20 text-white rounded-full text-sm mb-4">
              {state.abbreviation}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Payday Loans in {state.name}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              Serving {state.cities.length} cities across {state.name}. Find a location near you or apply online.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="btn btn--primary btn--large">
                Apply Now
              </Link>
              <a href="#cities" className="btn btn--large" style={{ background: 'transparent', border: '2px solid white', color: 'white' }}>
                Find Your City
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Services in State */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                About Our Services in {state.name}
              </h2>
              <p className="text-gray-600 mb-6">
                {business.businessName} has been proudly serving {state.name} residents since {business.established}.
                Whether you&apos;re in {state.cities[0]?.name || 'the city'}, {state.cities[1]?.name || 'nearby'}, or any of our
                {state.cities.length} locations across the state, we&apos;re here to help when you need cash fast.
              </p>
              <p className="text-gray-600 mb-6">
                Our {state.name} branches are staffed with experienced professionals who understand local regulations
                and can guide you through the process quickly and transparently.
              </p>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5" style={{ color: 'var(--color-success)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm font-medium">{state.abbreviation} Licensed</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5" style={{ color: 'var(--color-accent)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <span className="text-sm font-medium">BBB Accredited</span>
                </div>
                {stateCompliance && (
                  <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5" style={{ color: 'var(--color-primary)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    <span className="text-sm font-medium">{stateCompliance.regulatoryBody.abbreviation} Regulated</span>
                  </div>
                )}
              </div>
            </div>

            {/* State Compliance Info */}
            {stateCompliance && (
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  {state.name} Payday Loan Regulations
                </h3>
                <ul className="space-y-3">
                  {stateCompliance.cityPageContent.keyPoints.slice(0, 6).map((point, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span className="text-gray-600 text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={stateCompliance.regulatoryBody.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-primary text-sm hover:underline"
                >
                  Learn more at {stateCompliance.regulatoryBody.abbreviation}
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="section section--alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">Available Services</span>
            <h2 className="section-title">Our Services in {state.name}</h2>
            <p className="section-subtitle">All services are available at every {state.name} location.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.slice(0, 8).map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-200 group"
              >
                <h3 className="font-bold mb-1 group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 mb-0">{service.shortDescription.substring(0, 80)}...</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cities Grid */}
      <section id="cities" className="section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">{state.cities.length} Locations</span>
            <h2 className="section-title">Cities We Serve in {state.name}</h2>
            <p className="section-subtitle">Click on a city to view detailed location information and local regulations.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {state.cities.map((city, index) => (
              <CityCard
                key={city.slug}
                name={city.name}
                slug={city.slug}
                stateSlug={state.slug}
                population={city.population}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={stateFaqs} headline={`${state.name} Payday Loan FAQ`} />

      {/* CTA */}
      <CTASection
        headline={`Ready to Get Started in ${state.name}?`}
        subheadline="Apply now online or select your city above to find a location."
      />
    </div>
  )
}
