import Link from 'next/link'

interface CityCardProps {
  name: string
  stateSlug: string
  slug: string
  population?: number
  county?: string
  index?: number
}

export function CityCard({ name, stateSlug, slug, population, county }: CityCardProps) {
  const formatPopulation = (pop: number) => {
    if (pop >= 1000000) {
      return `${(pop / 1000000).toFixed(1)}M`
    }
    if (pop >= 1000) {
      return `${(pop / 1000).toFixed(0)}K`
    }
    return pop.toString()
  }

  return (
    <Link
      href={`/locations/${stateSlug}/${slug}`}
      className="flex items-center justify-between p-4 bg-white rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-md group"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-primary-subtle)', color: 'var(--color-primary)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <div className="font-bold group-hover:text-teal-700 transition-colors" style={{ fontFamily: 'var(--font-display)' }}>
            {name}
          </div>
          {(population || county) && (
            <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {county && <span>{county}</span>}
              {county && population && <span> &bull; </span>}
              {population && <span>Pop. {formatPopulation(population)}</span>}
            </div>
          )}
        </div>
      </div>

      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-gray-400 group-hover:text-teal-700 transition-all group-hover:translate-x-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  )
}
