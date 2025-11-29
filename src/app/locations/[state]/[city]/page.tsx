import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Breadcrumbs,
  LocalProof,
  StateCompliance,
  CityOrdinance,
  Testimonials,
  NearbyLocations,
  FAQ,
  CTASection
} from '@/components'
import { getAllCityPages, getCityPage, generateBreadcrumbs } from '@/lib/data'

interface CityPageProps {
  params: Promise<{
    state: string
    city: string
  }>
}

export async function generateStaticParams() {
  const cityPages = getAllCityPages()
  return cityPages.map((page) => ({
    state: page.stateSlug,
    city: page.slug,
  }))
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { state: stateSlug, city: citySlug } = await params
  const cityPage = getCityPage(stateSlug, citySlug)

  if (!cityPage) {
    return {
      title: 'City Not Found',
    }
  }

  return {
    title: cityPage.seo.title,
    description: cityPage.seo.metaDescription,
    keywords: cityPage.seo.keywords.join(', '),
    alternates: {
      canonical: cityPage.seo.canonicalUrl,
    },
  }
}

export default async function CityPage({ params }: CityPageProps) {
  const { state: stateSlug, city: citySlug } = await params
  const cityPage = getCityPage(stateSlug, citySlug)

  if (!cityPage) {
    notFound()
  }

  // Cast to any for flexible access since JSON structure varies
  const pageData = cityPage as unknown as Record<string, unknown>

  // Adapt data structure - handle both expected and actual JSON formats
  const localProof = pageData.localProof as Record<string, unknown> || {}
  const nap = pageData.nap as Record<string, unknown> || {}
  // Hours can be under localProof.hours OR nap.hours depending on city file format
  const napHours = (localProof.hours as Record<string, string>) || (nap.hours as Record<string, string>) || {}
  const stateComp = pageData.stateCompliance as Record<string, unknown> || {}
  const regBody = stateComp.regulatoryBody as Record<string, string> | string || {}
  const servicesData = pageData.services as Record<string, unknown> || pageData.productLinks as Record<string, unknown> || {}
  const servicesList = (servicesData.servicesList || servicesData.services) as Array<Record<string, string>> || []

  // Build normalized data with defaults
  const normalizedLocalProof = {
    headline: (localProof.headline as string) || `Serving ${cityPage.city}`,
    directions: (localProof.directions as string) || '',
    landmarks: (localProof.landmarks as string[]) || [],
    highways: (localProof.highways as string[]) || [],
    exits: (localProof.exits as string[]) || [],
    neighborhoodName: (localProof.neighborhoodName as string) || cityPage.city,
    hours: napHours,
    mapEmbedUrl: (localProof.mapEmbedUrl as string) || (nap.googleMapsUrl as string) || '',
    localDescription: (localProof.localDescription as string) || '',
  }

  const normalizedStateCompliance = {
    headline: (stateComp.headline as string) || `${cityPage.state} Regulations`,
    content: (stateComp.content as string) || '',
    intro: (stateComp.intro as string) || '',
    keyPoints: (stateComp.keyPoints as string[]) || [],
    regulatoryBody: typeof regBody === 'string' ? regBody : ((regBody as Record<string, string>).name || ''),
    regulatoryUrl: typeof regBody === 'string' ? '' : ((regBody as Record<string, string>).website || ''),
    contactPhone: typeof regBody === 'string' ? '' : ((regBody as Record<string, string>).phone || ''),
    consumerHelpline: (stateComp.consumerHelpline as string) || (typeof regBody === 'object' ? (regBody as Record<string, string>).phone : ''),
    disclaimer: (stateComp.disclaimer as string) || '',
    warningBox: stateComp.warningBox as { title: string; content: string } | undefined,
    aprDisclosure: (stateComp.aprDisclosure as string) || '',
    protectionsList: (stateComp.protections as string[]) || (stateComp.protectionsList as string[]) || [],
  }

  const normalizedProductLinks = {
    headline: (servicesData.headline as string) || `Our ${cityPage.city} Services`,
    intro: (servicesData.intro as string) || '',
    services: servicesList.map(s => ({
      name: s.name || '',
      slug: s.slug || '',
      url: s.url || `/services/${s.slug}`,
      description: s.description || '',
      anchorText: s.anchorText || `Learn about ${s.name}`,
    })),
  }

  // Breadcrumbs - generate if not present
  const breadcrumbs = cityPage.breadcrumbs || [
    { label: 'Home', url: '/' },
    { label: 'Locations', url: '/locations' },
    { label: cityPage.state, url: `/locations/${stateSlug}` },
    { label: cityPage.city, url: `/locations/${stateSlug}/${citySlug}` },
  ]

  const breadcrumbSchema = generateBreadcrumbs(breadcrumbs.map(b => ({ label: b.label, href: b.url })))

  // Combine schemas
  const pageSchemas = [
    breadcrumbSchema,
    cityPage.schema,
  ]

  return (
    <div className="pt-20">
      {/* Schema Markup */}
      {pageSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <Breadcrumbs
        items={breadcrumbs.map(b => ({ label: b.label, href: b.url }))}
      />

      {/* Hero Section */}
      <section className="py-16" style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block px-4 py-1 bg-white/20 text-white rounded-full text-sm mb-4">
                {normalizedLocalProof.neighborhoodName} Location
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                {cityPage.hero.h1}
              </h1>
              <p className="text-xl text-white/90 mb-6">
                {cityPage.hero.subheadline}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href={cityPage.hero.ctaUrl} className="btn btn--primary btn--large">
                  {cityPage.hero.ctaText}
                </Link>
                {cityPage.hero.secondaryCta && (
                  <a
                    href={cityPage.hero.secondaryCta.url}
                    className="btn btn--large flex items-center gap-2"
                    style={{ background: 'var(--color-accent)', color: 'var(--color-text)' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {cityPage.nap.phone}
                  </a>
                )}
              </div>
            </div>

            {/* NAP Card */}
            <div className="bg-white rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                {cityPage.nap.name}
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: 'var(--color-primary)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div>
                    <p className="font-medium">{cityPage.nap.street}</p>
                    <p className="text-gray-600">{cityPage.nap.city}, {cityPage.nap.state} {cityPage.nap.zip}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5" style={{ color: 'var(--color-primary)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href={`tel:${cityPage.nap.formattedPhone}`} className="font-medium text-primary hover:underline">
                    {cityPage.nap.phone}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="mt-4 pt-4 border-t">
                <h3 className="font-bold text-sm mb-2">Hours of Operation</h3>
                <div className="grid grid-cols-2 gap-1 text-sm">
                  <span className="text-gray-600">Mon-Fri:</span>
                  <span>{normalizedLocalProof.hours.monday || normalizedLocalProof.hours.weekdays || '9am-7pm'}</span>
                  <span className="text-gray-600">Saturday:</span>
                  <span>{normalizedLocalProof.hours.saturday || '10am-4pm'}</span>
                  <span className="text-gray-600">Sunday:</span>
                  <span>{normalizedLocalProof.hours.sunday || 'Closed'}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <a
                  href={cityPage.nap.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary text-sm"
                >
                  Get Directions
                </a>
                <Link href={cityPage.hero.ctaUrl} className="btn btn--primary text-sm">
                  Apply Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local Proof Section */}
      <LocalProof
        headline={normalizedLocalProof.headline}
        directions={normalizedLocalProof.directions}
        landmarks={normalizedLocalProof.landmarks}
        highways={normalizedLocalProof.highways}
        exits={normalizedLocalProof.exits}
        neighborhoodName={normalizedLocalProof.neighborhoodName}
        hours={normalizedLocalProof.hours}
        mapEmbedUrl={normalizedLocalProof.mapEmbedUrl}
        localDescription={normalizedLocalProof.localDescription}
      />

      {/* Services Available */}
      <section className="section section--alt">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="section-title" style={{ fontFamily: 'var(--font-display)' }}>
              {normalizedProductLinks.headline}
            </h2>
            <p className="section-subtitle">{normalizedProductLinks.intro}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {normalizedProductLinks.services.map((service) => (
              <Link
                key={service.slug}
                href={service.url}
                className="bg-white rounded-xl p-5 hover:shadow-lg transition-all duration-200 group"
              >
                <h3 className="font-bold mb-2 group-hover:text-primary transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{service.description}</p>
                <span className="text-primary text-sm font-medium group-hover:underline">
                  {service.anchorText} &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* State Compliance */}
      <StateCompliance
        stateName={cityPage.state}
        compliance={{
          headline: normalizedStateCompliance.headline,
          content: normalizedStateCompliance.content,
          intro: normalizedStateCompliance.intro,
          keyPoints: normalizedStateCompliance.keyPoints,
          regulatoryBody: normalizedStateCompliance.regulatoryBody,
          regulatoryUrl: normalizedStateCompliance.regulatoryUrl,
          contactPhone: normalizedStateCompliance.contactPhone,
          consumerHelpline: normalizedStateCompliance.consumerHelpline,
          disclaimer: normalizedStateCompliance.disclaimer,
          warningBox: normalizedStateCompliance.warningBox,
          aprDisclosure: normalizedStateCompliance.aprDisclosure,
          protectionsList: normalizedStateCompliance.protectionsList,
        }}
      />

      {/* City Ordinance (if applicable) */}
      {cityPage.cityOrdinance?.hasOrdinance && (
        <CityOrdinance
          cityName={cityPage.city}
          ordinance={{
            hasOrdinance: cityPage.cityOrdinance.hasOrdinance,
            headline: cityPage.cityOrdinance.headline,
            intro: cityPage.cityOrdinance.intro,
            keyProvisions: cityPage.cityOrdinance.keyProvisions,
            maxLoanPercent: cityPage.cityOrdinance.maxLoanPercent,
            maxRollovers: cityPage.cityOrdinance.maxRollovers,
            principalReduction: cityPage.cityOrdinance.principalReduction,
            ordinanceCode: cityPage.cityOrdinance.ordinanceCode,
            effectiveDate: cityPage.cityOrdinance.effectiveDate,
            registrationRequired: cityPage.cityOrdinance.registrationRequired,
            violationPenalty: cityPage.cityOrdinance.violationPenalty,
          }}
        />
      )}

      {/* Testimonials (if available) */}
      {cityPage.testimonials && (
        <Testimonials
          headline={cityPage.testimonials.headline || `What ${cityPage.city} Customers Say`}
          reviews={(cityPage.testimonials.reviews || []).map(r => ({
            text: r.text,
            author: r.author || r.name || 'Customer',
            location: r.location || cityPage.city,
            rating: r.rating || 5,
            date: r.date,
          }))}
        />
      )}

      {/* Nearby Locations (if available) */}
      {cityPage.nearbyLocations && (
        <NearbyLocations
          headline={cityPage.nearbyLocations.headline || 'Also Serving Nearby Cities'}
          intro={cityPage.nearbyLocations.intro || ''}
          cities={cityPage.nearbyLocations.cities || []}
          stateSlug={cityPage.stateSlug}
        />
      )}

      {/* FAQ (if available) */}
      {cityPage.faq && cityPage.faq.length > 0 && (
        <FAQ faqs={cityPage.faq} headline={`${cityPage.city} Payday Loan FAQ`} />
      )}

      {/* Final CTA */}
      <section className="section" style={{ background: 'var(--color-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            {cityPage.ctaSection?.headline || `Ready to Get Cash in ${cityPage.city}?`}
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            {cityPage.ctaSection?.subheadline || 'Apply now and get the cash you need today.'}
          </p>
          <p className="text-white/80 mb-6">
            {cityPage.ctaSection?.address || cityPage.nap?.formattedAddress || ''}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={cityPage.ctaSection?.primaryCta?.url || cityPage.hero.ctaUrl || '/apply'}
              className="btn btn--large"
              style={{ background: 'var(--color-accent)', color: 'var(--color-text)' }}
            >
              {cityPage.ctaSection?.primaryCta?.text || 'Apply Now'}
            </Link>
            <a
              href={cityPage.ctaSection?.secondaryCta?.url || cityPage.hero.secondaryCta?.url || `tel:${cityPage.nap?.phone?.replace(/\D/g, '')}`}
              className="btn btn--large flex items-center gap-2"
              style={{ background: 'transparent', border: '2px solid white', color: 'white' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {cityPage.ctaSection?.secondaryCta?.text || cityPage.hero.secondaryCta?.text || `Call ${cityPage.nap?.phone || 'Now'}`}
            </a>
          </div>
        </div>
      </section>

      {/* YMYL Disclaimer */}
      <section className="py-8 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <p className="text-xs text-gray-500 leading-relaxed">
            {normalizedStateCompliance.disclaimer || 'Payday loans are short-term, high-cost loans. Borrow responsibly.'}
          </p>
        </div>
      </section>
    </div>
  )
}
