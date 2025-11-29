import { Metadata } from 'next'
import Link from 'next/link'
import { Breadcrumbs, CTASection } from '@/components'
import { getAllStates, getBusinessProfile } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Locations - Find Payday Loans Near You | Ace Payday Loans',
  description: 'Find Ace Payday Loans locations near you. We serve 50 cities across California and Texas with fast payday loans, cash advances, and more. Apply online or visit a branch.',
  keywords: 'payday loan locations, cash advance near me, payday loans California, payday loans Texas',
}

export default function LocationsPage() {
  const states = getAllStates()
  const business = getBusinessProfile()
  const totalCities = states.reduce((acc, state) => acc + state.cities.length, 0)

  return (
    <div className="pt-20">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
        ]}
      />

      {/* Hero */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Find {business.businessName} Near You
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-6">
            We proudly serve {totalCities} cities across {states.length} states. Select your state to find a location near you.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="bg-white/20 rounded-lg px-6 py-3">
              <span className="text-3xl font-bold text-white">{states.length}</span>
              <span className="block text-white/80 text-sm">States</span>
            </div>
            <div className="bg-white/20 rounded-lg px-6 py-3">
              <span className="text-3xl font-bold text-white">{totalCities}</span>
              <span className="block text-white/80 text-sm">Locations</span>
            </div>
          </div>
        </div>
      </section>

      {/* States Grid */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">Our Service Areas</span>
            <h2 className="section-title">Select Your State</h2>
            <p className="section-subtitle">Click on your state to view all available cities and locations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/locations/${state.slug}`}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                      {state.name}
                    </h3>
                    <p className="text-gray-600">
                      {state.cities.length} cities served
                    </p>
                  </div>
                  <span className="text-5xl font-bold text-primary/20 group-hover:text-primary/40 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                    {state.abbreviation}
                  </span>
                </div>

                {/* Popular Cities */}
                <div className="mb-6">
                  <p className="text-sm text-gray-500 mb-3">Popular locations:</p>
                  <div className="flex flex-wrap gap-2">
                    {state.cities.slice(0, 6).map((city) => (
                      <span
                        key={city.slug}
                        className="px-3 py-1 text-sm bg-gray-100 rounded-full group-hover:bg-primary/10 transition-colors"
                      >
                        {city.name}
                      </span>
                    ))}
                    {state.cities.length > 6 && (
                      <span className="px-3 py-1 text-sm bg-gray-100 rounded-full text-gray-500">
                        +{state.cities.length - 6} more
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA Arrow */}
                <div className="flex items-center text-primary font-medium">
                  <span>View all {state.name} locations</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Locations */}
      <section className="section section--alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label">In-Store Experience</span>
            <h2 className="section-title">What to Expect at Our Locations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Quick Service</h3>
              <p className="text-gray-600 mb-0">Most in-store applications are processed in under 30 minutes.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Friendly Staff</h3>
              <p className="text-gray-600 mb-0">Our trained staff will explain all options and answer your questions.</p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>Safe & Secure</h3>
              <p className="text-gray-600 mb-0">All locations are state-licensed with secure facilities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Online Option */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              Prefer to Apply Online?
            </h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              No need to visit a store. Apply from the comfort of your home and get approved in minutes.
              Funds can be deposited directly to your bank account.
            </p>
            <Link href="/apply" className="btn btn--large" style={{ background: 'var(--color-accent)', color: 'var(--color-text)' }}>
              Apply Online Now
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  )
}
