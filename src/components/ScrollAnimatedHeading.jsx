import { useEffect, useRef, useState } from 'react'
import './ScrollAnimatedHeading.css'

function ScrollAnimatedHeading({ children, level = 'h1', className = '' }) {
  const [isVisible, setIsVisible] = useState(false)
  const headingRef = useRef(null)
  
  const HeadingTag = level

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (headingRef.current) {
      observer.observe(headingRef.current)
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current)
      }
    }
  }, [])

  return (
    <HeadingTag 
      ref={headingRef}
      className={`scroll-heading ${className} ${isVisible ? 'scroll-visible' : ''}`}
    >
      {children}
    </HeadingTag>
  )
}

export default ScrollAnimatedHeading