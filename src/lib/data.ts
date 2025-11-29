import fs from 'fs'
import path from 'path'

// Type definitions
export interface City {
  id: string
  name: string
  slug: string
  county: string
  areaCode: string
  population: number
  coordinates: {
    latitude: number
    longitude: number
  }
  localFacts: {
    landmarks: string[]
    highways: string[]
    exits: string[]
    neighboringTowns: string[]
    description: string
  }
  neuralMesh: {
    neighbors: Array<{
      slug: string
      name: string
      distanceMiles: number
    }>
  }
}

export interface State {
  name: string
  abbreviation: string
  slug: string
  cities: City[]
}

export interface LocationsData {
  generatedAt: string
  mode: string
  serviceNiche: string
  totalCities: number
  states: State[]
}

export interface Service {
  name: string
  slug: string
  shortDescription: string
  longDescription: string
  benefits: string[]
  process: Array<{
    step: number
    title: string
    description: string
  }>
  requirements: string[]
  faqs: Array<{
    question: string
    answer: string
  }>
  seoKeywords: string[]
}

export interface ServiceSchema {
  generatedAt: string
  serviceNiche: string
  totalServices: number
  services: Service[]
}

export interface CityPage {
  id: string
  city: string
  slug: string
  state: string
  stateCode: string
  stateSlug: string
  countyName: string
  serviceNiche: string
  seo: {
    title: string
    metaDescription: string
    canonicalUrl: string
    keywords: string[]
  }
  hero: {
    h1: string
    subheadline: string
    ctaText: string
    ctaUrl: string
    phone?: string
    secondaryCta?: {
      text: string
      url: string
    }
  }
  localProof: {
    headline: string
    directions: string
    landmarks: string[]
    highways: string[]
    exits: string[]
    neighboringTowns?: string[]
    neighborhoodName: string
    hours: Record<string, string>
    mapEmbedUrl: string
    localDescription?: string
  }
  nap: {
    name: string
    street: string
    city: string
    state: string
    zip: string
    phone: string
    formattedPhone: string
    formattedAddress: string
    coordinates: {
      latitude: number
      longitude: number
    }
    googleMapsUrl: string
  }
  productLinks: {
    headline: string
    intro: string
    services: Array<{
      name: string
      slug: string
      url: string
      description: string
      anchorText: string
    }>
  }
  stateCompliance: {
    headline: string
    content: string
    keyPoints: string[]
    regulatoryBody: string
    regulatoryUrl: string
    consumerHelpline?: string
    contactPhone?: string
    disclaimer: string
    warningBox?: {
      title: string
      content: string
    }
    aprDisclosure?: string
    intro?: string
    protectionsList?: string[]
  }
  cityOrdinance?: {
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
  testimonials: {
    headline: string
    reviews: Array<{
      text: string
      author: string
      location: string
      rating: number
      date?: string
      name?: string
    }>
  }
  nearbyLocations: {
    headline: string
    intro: string
    cities: Array<{
      name: string
      slug: string
      url: string
      distanceMiles: number
    }>
  }
  faq: Array<{
    question: string
    answer: string
  }>
  ctaSection: {
    headline: string
    subheadline: string
    primaryCta: {
      text: string
      url: string
    }
    secondaryCta: {
      text: string
      url: string
    }
    address: string
  }
  schema: Record<string, unknown>
  breadcrumbs: Array<{
    label: string
    url: string
  }>
}

export interface BusinessProfile {
  businessName: string
  tagline: string
  established: number
  description: string
  services: string[]
  serviceAreas: {
    states: string[]
    totalCities: number
  }
  stats: {
    customersServed: string
    totalFunded: string
    averageRating: number
    yearsInBusiness: number
    locations: number
  }
  contact: {
    tollFree: string
    california: string
    texas: string
    email: string
    supportEmail: string
    hours: {
      weekdays: string
      saturday: string
      sunday: string
    }
  }
  trustSignals: string[]
  reviews: Array<{
    text: string
    author: string
    location: string
    rating: number
    date: string
  }>
}

export interface StateCompliance {
  stateCode: string
  stateName: string
  serviceNiche: string
  lastUpdated: string
  legalStatus: {
    isLegal: boolean
    loanTypeAllowed: string
    restrictions: string
    notes: string
  }
  regulatoryBody: {
    name: string
    abbreviation: string
    website: string
    licenseType: string
    contactPhone: string
  }
  regulations: {
    maxLoanAmount: number | null
    maxLoanAmountNotes?: string
    maxAPR: number | null
    maxAPRNote?: string
    typicalAPR?: string
    typicalAPRRange?: string
    maxFee?: string
    maxFeeAmount?: number
    maxTermDays?: number
    rolloverAllowed?: boolean
    rolloverLimit?: string | null
    simultaneousLoansAllowed?: boolean
  }
  fees: {
    originationFee: string
    latePaymentFee: string
    nsfFee: string
    nsfNote?: string
  }
  consumerProtections: {
    rightToRescind: {
      available: boolean
      period: string
      notes: string
    }
    requiredDisclosures: string[]
    prohibitedPractices: string[]
  }
  cityPageContent: {
    headline: string
    intro: string
    keyPoints: string[]
    complianceHeading?: string
    complianceText?: string
    protectionsList?: string[]
    disclaimer: string
    aprDisclosure?: string
    warningBox?: {
      title: string
      content: string
    }
    cityOrdinanceNote?: string
  }
  cityOrdinances?: {
    overview: string
    citiesWithOrdinances: Array<{
      city: string
      effectiveDate: string
      ordinanceCode: string
      keyProvisions: string[]
      registrationRequired: boolean
    }>
    modelOrdinanceFeatures?: string[]
    otherCitiesWithOrdinances?: string[]
  }
}

// Data loading functions
const dataDir = process.cwd()

export function getLocationsData(): LocationsData {
  const filePath = path.join(dataDir, 'locations.json')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent) as LocationsData
}

export function getServicesData(): ServiceSchema {
  const filePath = path.join(dataDir, 'service-schema-template.json')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent) as ServiceSchema
}

export function getBusinessProfile(): BusinessProfile {
  const filePath = path.join(dataDir, 'business-profile.json')
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(fileContent) as BusinessProfile
}

export function getStateCompliance(stateCode: string): StateCompliance | null {
  const filePath = path.join(dataDir, 'state-compliance', `${stateCode}.json`)
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(fileContent) as StateCompliance
  } catch {
    return null
  }
}

export function getCityPage(stateSlug: string, citySlug: string): CityPage | null {
  const cityPagesDir = path.join(dataDir, 'city-pages')
  const files = fs.readdirSync(cityPagesDir)

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(cityPagesDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const cityData = JSON.parse(fileContent) as CityPage

      if (cityData.stateSlug === stateSlug && cityData.slug === citySlug) {
        return cityData
      }
    }
  }

  return null
}

export function getAllCityPages(): CityPage[] {
  const cityPagesDir = path.join(dataDir, 'city-pages')
  const files = fs.readdirSync(cityPagesDir)
  const cityPages: CityPage[] = []

  for (const file of files) {
    if (file.endsWith('.json')) {
      const filePath = path.join(cityPagesDir, file)
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      cityPages.push(JSON.parse(fileContent) as CityPage)
    }
  }

  return cityPages
}

export function getAllStates(): State[] {
  const locationsData = getLocationsData()
  // Map states to include slug derived from name if not present
  return locationsData.states.map(state => ({
    ...state,
    slug: state.slug || state.name.toLowerCase().replace(/\s+/g, '-'),
  }))
}

export function getState(stateSlug: string): State | null {
  const states = getAllStates()
  return states.find(s => s.slug === stateSlug) || null
}

export function getAllServices(): Service[] {
  const servicesData = getServicesData()
  // Use serviceDetails if available (contains full info), otherwise fall back to services
  const rawData = servicesData as unknown as Record<string, unknown>
  const serviceDetails = rawData.serviceDetails as Service[] | undefined
  const services = servicesData.services

  if (serviceDetails && serviceDetails.length > 0) {
    // Return serviceDetails which has all the detailed info (benefits, process, etc.)
    return serviceDetails.map(detail => ({
      ...detail,
      // Ensure all required fields have defaults
      benefits: detail.benefits || [],
      process: detail.process || [],
      requirements: detail.requirements || [],
      faqs: detail.faqs || [],
      seoKeywords: detail.seoKeywords || [],
      shortDescription: detail.shortDescription || detail.longDescription?.substring(0, 160) || '',
      longDescription: detail.longDescription || detail.shortDescription || '',
    }))
  }

  // Fall back to basic services list with default values
  return services.map(service => ({
    ...service,
    shortDescription: (service as unknown as Record<string, string>).description || service.shortDescription || '',
    longDescription: (service as unknown as Record<string, string>).description || service.longDescription || '',
    benefits: service.benefits || [],
    process: service.process || [],
    requirements: service.requirements || [],
    faqs: service.faqs || [],
    seoKeywords: service.seoKeywords || [],
  }))
}

export function getService(serviceSlug: string): Service | null {
  const services = getAllServices()
  return services.find(s => s.slug === serviceSlug) || null
}

export function getCitiesByState(stateSlug: string): City[] {
  const state = getState(stateSlug)
  return state?.cities || []
}

export function getStateFromAbbreviation(abbreviation: string): State | null {
  const states = getAllStates()
  return states.find(s => s.abbreviation === abbreviation) || null
}

// Helper function to format phone for tel: links
export function formatPhoneForTel(phone: string): string {
  return phone.replace(/\D/g, '')
}

// Helper function to generate breadcrumb items
export function generateBreadcrumbs(items: Array<{ label: string; href: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://www.acepaydayloans.com${item.href}`,
    })),
  }
}
