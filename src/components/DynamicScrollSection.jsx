import { useEffect, useRef } from 'react'
import './DynamicScrollSection.css'

function DynamicScrollSection({ children, className = '' }) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    let ticking = false
    
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
    const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (!sectionRef.current || !contentRef.current) {
            ticking = false
            return
          }
          
          const scrollY = window.scrollY
          const windowHeight = window.innerHeight
          const rect = sectionRef.current.getBoundingClientRect()
          
          // Calculate progress based on element position
          const sectionTop = rect.top + scrollY - windowHeight * 0.8
          const sectionHeight = rect.height + windowHeight * 0.8
          
          // More fluid progress calculation
          const rawProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight))
          const progress = easeInOutQuart(rawProgress)
          
          // Get all headings and content in this section
          const headings = contentRef.current.querySelectorAll('h2, h3, h4')
          const paragraphs = contentRef.current.querySelectorAll('p, .description, .text')
          
          // Apply transformations to headings
          headings.forEach((heading) => {
            // Dynamic scaling
            const scale = Math.max(0.85, 1 - easeOutCubic(progress) * 0.15)
            
            // Smooth upward movement
            const translateY = -progress * progress * 120
            
            // Opacity with minimum threshold
            const opacity = Math.max(0.3, 1 - Math.pow(progress, 1.5))
            
            // Apply transforms without rotation
            heading.style.transform = `
              scale(${scale}) 
              translateY(${translateY}px) 
              translateZ(0)
            `
            
            heading.style.opacity = opacity
            heading.style.color = '#000000'
          })
          
          // Apply transformations to content
          paragraphs.forEach((para) => {
            // Slightly different values for content
            const scale = Math.max(0.9, 1 - easeOutCubic(progress) * 0.1)
            const translateY = -progress * progress * 100
            const opacity = Math.max(0.4, 1 - Math.pow(progress, 1.2))
            
            para.style.transform = `
              scale(${scale}) 
              translateY(${translateY}px) 
              translateZ(0)
            `
            
            para.style.opacity = opacity
            para.style.color = '#333333'
          })
          
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={sectionRef} className={`dynamic-scroll-section ${className}`}>
      <div ref={contentRef} className="dynamic-content">
        {children}
      </div>
    </div>
  )
}

export default DynamicScrollSection