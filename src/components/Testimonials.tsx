interface Review {
  text: string
  author: string
  name?: string
  location: string
  rating: number
}

interface TestimonialsProps {
  headline?: string
  reviews: Review[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg key={star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={star <= rating ? '' : 'opacity-30'}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials({ headline = 'What Our Customers Say', reviews }: TestimonialsProps) {
  // Get initials from author name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <section id="testimonials" className="section" style={{ background: 'radial-gradient(ellipse at 20% 50%, rgba(13, 79, 79, 0.03) 0%, transparent 50%), var(--color-background-alt)' }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="section-label">Real Reviews</span>
          <h2 className="section-title">{headline}</h2>
          <p className="section-subtitle">Don&apos;t just take our word for it. Here&apos;s what real customers have to say.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.slice(0, 6).map((review, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <StarRating rating={review.rating} />

              <p className="text-lg italic my-6 leading-relaxed" style={{ color: 'var(--color-text)' }}>
                &ldquo;{review.text}&rdquo;
              </p>

              <div className="flex items-center gap-4">
                <div className="testimonial-avatar">
                  {getInitials(review.name || review.author)}
                </div>
                <div>
                  <div className="font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                    {review.name || review.author}
                  </div>
                  <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                    {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
