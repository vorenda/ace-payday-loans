interface LocalProofProps {
  headline: string
  directions: string
  landmarks: string[]
  highways: string[]
  exits: string[]
  neighborhoodName: string
  hours: Record<string, string>
  mapEmbedUrl: string
  localDescription?: string
}

export function LocalProof({
  headline,
  directions,
  landmarks,
  highways,
  exits,
  neighborhoodName,
  hours,
  mapEmbedUrl,
  localDescription,
}: LocalProofProps) {
  return (
    <section className="section bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-label">Find Us</span>
          <h2 className="section-title">{headline}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Directions & Info */}
          <div>
            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                Directions to Our {neighborhoodName} Location
              </h3>
              <p className="text-gray-600 mb-4">{directions}</p>

              {localDescription && (
                <p className="text-gray-600 mb-4">{localDescription}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Landmarks */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5" style={{ color: 'var(--color-accent)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Nearby Landmarks
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {landmarks.slice(0, 4).map((landmark, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-accent)' }}></span>
                      {landmark}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Highway Access */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-bold mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5" style={{ color: 'var(--color-primary)' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Highway Access
                </h4>
                <ul className="space-y-1 text-sm text-gray-600">
                  {highways.map((highway, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-primary)' }}></span>
                      {highway}
                    </li>
                  ))}
                </ul>
                {exits.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-xs text-gray-500">
                      <strong>Key Exits:</strong> {exits.slice(0, 2).join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Hours */}
            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-bold mb-3 flex items-center gap-2" style={{ fontFamily: 'var(--font-display)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5" style={{ color: 'var(--color-success)' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Hours of Operation
              </h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                {Object.entries(hours).map(([day, time]) => (
                  <div key={day} className="flex justify-between">
                    <span className="capitalize text-gray-600">{day}:</span>
                    <span className="font-medium">{time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative h-96 lg:h-auto min-h-[400px] rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
