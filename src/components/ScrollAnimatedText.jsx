import { useEffect, useRef, useState } from 'react'
import './ScrollAnimatedText.css'

function ScrollAnimatedText({ children, tag = 'p', className = '', delay = 0 }) {
  const [isVisible, setIsVisible] = useState(false)
  const textRef = useRef(null)
  
  const Tag = tag

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    )

    if (textRef.current) {
      observer.observe(textRef.current)
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current)
      }
    }
  }, [delay])

  return (
    <Tag 
      ref={textRef}
      className={`scroll-text ${className} ${isVisible ? 'text-visible' : ''}`}
    >
      {children}
    </Tag>
  )
}

export default ScrollAnimatedText