import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Breadcrumbs, FAQ, CTASection } from '@/components'
import { getAllServices, getService } from '@/lib/data'

interface ServicePageProps {
  params: Promise<{
    service: string
  }>
}

export async function generateStaticParams() {
  const services = getAllServices()
  return services.map((service) => ({
    service: service.slug,
  }))
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: serviceSlug } = await params
  const service = getService(serviceSlug)

  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.name} - Fast Approval | Ace Payday Loans`,
    description: service.longDescription.substring(0, 160),
    keywords: service.seoKeywords.join(', '),
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: serviceSlug } = await params
  const service = getService(serviceSlug)
  const allServices = getAllServices()

  if (!service) {
    notFound()
  }

  const relatedServices = allServices
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3)

  return (
    <div className="pt-20">
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name, href: `/services/${service.slug}` },
        ]}
      />

      {/* Hero */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              {service.name}
            </h1>
            <p className="text-xl text-white/90 mb-6">
              {service.shortDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/apply" className="btn btn--primary btn--large">
                Apply Now
              </Link>
              <a href="tel:+18005551234" className="btn btn--large" style={{ background: 'transparent', border: '2px solid white', color: 'white' }}>
                Call (800) 555-1234
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About This Service */}
      <section className="section">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                What is {service.name}?
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 leading-relaxed">{service.longDescription}</p>
              </div>

              {/* Benefits */}
              <h3 className="text-2xl font-bold mt-10 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Benefits
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {service.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: 'var(--color-primary-subtle)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 flex-shrink-0" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* How It Works */}
              <h3 className="text-2xl font-bold mt-10 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                How It Works
              </h3>
              <div className="space-y-6">
                {service.process.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold" style={{ background: 'var(--color-primary)' }}>
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1" style={{ fontFamily: 'var(--font-display)' }}>{step.title}</h4>
                      <p className="text-gray-600 mb-0">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Requirements */}
              <h3 className="text-2xl font-bold mt-10 mb-6" style={{ fontFamily: 'var(--font-display)' }}>
                Requirements
              </h3>
              <ul className="space-y-3">
                {service.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--color-primary)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    <span className="text-gray-600">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar */}
            <div>
              {/* Quick Apply Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg mb-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Ready to Apply?
                </h3>
                <p className="text-gray-600 mb-6">
                  Get started with your {service.name.toLowerCase()} application today. Fast approval, same-day funding available.
                </p>
                <Link href="/apply" className="btn btn--primary w-full mb-3">
                  Apply Online
                </Link>
                <a href="tel:+18005551234" className="btn btn--secondary w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Now
                </a>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    State Licensed
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4" style={{ color: 'var(--color-success)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    256-bit Encryption
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="w-4 h-4" style={{ color: 'var(--color-accent)' }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                    BBB Accredited
                  </div>
                </div>
              </div>

              {/* Related Services */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                  Related Services
                </h3>
                <div className="space-y-3">
                  {relatedServices.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      className="block p-3 bg-white rounded-lg hover:shadow-md transition-all duration-200"
                    >
                      <div className="font-medium" style={{ color: 'var(--color-primary)' }}>{s.name}</div>
                      <div className="text-sm text-gray-500">{s.shortDescription.substring(0, 60)}...</div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ faqs={service.faqs} headline={`${service.name} FAQ`} />

      {/* Find a Location */}
      <section className="section" style={{ background: 'var(--color-primary-subtle)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Get {service.name} Near You
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            We have locations across California and Texas ready to serve you. Find your nearest branch.
          </p>
          <Link href="/locations" className="btn btn--primary">
            Find Locations
          </Link>
        </div>
      </section>

      <CTASection
        headline={`Ready for ${service.name}?`}
        subheadline="Apply now and get the cash you need today."
      />
    </div>
  )
}
