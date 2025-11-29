import Link from 'next/link'

interface NearbyCity {
  name: string
  slug: string
  url: string
  distanceMiles: number
}

interface NearbyLocationsProps {
  headline: string
  intro: string
  cities: NearbyCity[]
  stateSlug?: string
}

export function NearbyLocations({ headline, intro, cities }: NearbyLocationsProps) {
  if (!cities || cities.length === 0) return null

  return (
    <section className="py-12" style={{ background: 'var(--color-background-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            {headline}
          </h2>
          <p className="text-gray-600 mb-6">{intro}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cities.slice(0, 4).map((city) => (
              <Link
                key={city.slug}
                href={city.url}
                className="flex items-center justify-between p-4 bg-white rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-teal-700 group"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span className="font-bold group-hover:text-teal-700" style={{ fontFamily: 'var(--font-display)' }}>
                  {city.name}
                </span>
                <span className="text-sm text-gray-500">
                  ({city.distanceMiles} mi)
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
