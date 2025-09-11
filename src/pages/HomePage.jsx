import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import DynamicScrollSection from '../components/DynamicScrollSection'
import ScrollAnimatedHeading from '../components/ScrollAnimatedHeading'
import ScrollAnimatedText from '../components/ScrollAnimatedText'
import ScrollStackProcess from '../components/ScrollStackProcess'
// import vendorNetworkImage from '../assets/vendor-network.png'
const vendorNetworkImage = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop' // Network/business connections image
import backgroundImage from '../Download Gradient Red Background for free.jpeg'
import './homepage-section-headings.css'

// Import animation styles last to override other styles
import './homepage-services-animations.css'
import './process-section.css'

function HomePage() {
  const [heroRevealed, setHeroRevealed] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [typedText, setTypedText] = useState('')
  const [showSilently, setShowSilently] = useState(false)
  const [formType, setFormType] = useState('architect') // 'vendor' or 'architect'
  const fullText = 'Powering Architecture'
  
  // Form states
  const [architectForm, setArchitectForm] = useState({
    firm_name: '',
    from_name: '',
    email: '',
    phone: '',
    project_type: '',
    message: ''
  })
  
  const [vendorForm, setVendorForm] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    gst_number: '',
    product_category: '',
    description: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' })

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY')
  }, [])

  // Form validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone) => {
    const re = /^[\d\s\-\+\(\)]+$/
    return re.test(phone) && phone.length >= 10
  }

  // Handle architect form submission
  const handleArchitectSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!architectForm.firm_name || !architectForm.from_name || !architectForm.email || !architectForm.phone) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' })
      return
    }
    
    if (!validateEmail(architectForm.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' })
      return
    }
    
    if (!validatePhone(architectForm.phone)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid phone number' })
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus({ type: '', message: '' })
    
    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ARCHITECT || 'YOUR_ARCHITECT_TEMPLATE_ID',
        architectForm
      )
      
      if (result.status === 200) {
        setSubmitStatus({ type: 'success', message: 'Thank you! We will contact you within 24 hours.' })
        setArchitectForm({
          firm_name: '',
          from_name: '',
          email: '',
          phone: '',
          project_type: '',
          message: ''
        })
      }
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again or contact us directly.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Handle vendor form submission
  const handleVendorSubmit = async (e) => {
    e.preventDefault()
    
    // Validation
    if (!vendorForm.company_name || !vendorForm.contact_name || !vendorForm.email || !vendorForm.phone || !vendorForm.gst_number) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields' })
      return
    }
    
    if (!validateEmail(vendorForm.email)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid email address' })
      return
    }
    
    if (!validatePhone(vendorForm.phone)) {
      setSubmitStatus({ type: 'error', message: 'Please enter a valid phone number' })
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus({ type: '', message: '' })
    
    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_VENDOR || 'YOUR_VENDOR_TEMPLATE_ID',
        vendorForm
      )
      
      if (result.status === 200) {
        setSubmitStatus({ type: 'success', message: 'Application submitted successfully! We will review and contact you soon.' })
        setVendorForm({
          company_name: '',
          contact_name: '',
          email: '',
          phone: '',
          gst_number: '',
          product_category: '',
          description: ''
        })
      }
    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitStatus({ type: 'error', message: 'Failed to submit application. Please try again or contact us directly.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setHeroRevealed(true)
    }, 200)
  }, [])

  useEffect(() => {
    if (heroRevealed) {
      let currentIndex = 0
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setTypedText(fullText.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typingInterval)
          setTimeout(() => {
            setShowSilently(true)
          }, 300)
        }
      }, 100)

      return () => clearInterval(typingInterval)
    }
  }, [heroRevealed])

  // Animate impact numbers on scroll
  useEffect(() => {
    const animateNumbers = () => {
      const impactNumbers = document.querySelectorAll('.impact-number')
      
      impactNumbers.forEach(num => {
        const rect = num.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0 && !num.classList.contains('animated')) {
          num.classList.add('animated')
          const finalValue = parseInt(num.getAttribute('data-value'))
          let currentValue = 0
          const increment = finalValue / 50
          const timer = setInterval(() => {
            currentValue += increment
            if (currentValue >= finalValue) {
              currentValue = finalValue
              clearInterval(timer)
            }
            num.textContent = Math.floor(currentValue) + '+'
          }, 30)
        }
      })
    }

    window.addEventListener('scroll', animateNumbers)
    animateNumbers() // Initial check
    
    return () => window.removeEventListener('scroll', animateNumbers)
  }, [])



  
  useEffect(() => {
    let ticking = false
    
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
    const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const windowHeight = window.innerHeight
          
          // Handle background transition and navbar blur
          const aboutSection = document.querySelector('.about-section')
          const navbar = document.querySelector('.navbar')
          
          if (aboutSection && navbar) {
            const aboutTop = aboutSection.offsetTop
            const triggerPoint = aboutTop - windowHeight * 0.7  // Earlier trigger for going back up
            
            // Immediate transition when scrolling back to hero
            if (scrollY < triggerPoint) {
              navbar.style.backdropFilter = 'blur(0px)'
              navbar.style.webkitBackdropFilter = 'blur(0px)'
              navbar.style.background = 'transparent'
              document.body.classList.remove('white-bg')
              navbar.classList.remove('navbar-white')
            } else {
              // Progressive blur when scrolling down
              const blurProgress = Math.min(1, (scrollY - triggerPoint) / (windowHeight * 0.3))
              const blurAmount = blurProgress * 10
              
              navbar.style.backdropFilter = `blur(${blurAmount}px)`
              navbar.style.webkitBackdropFilter = `blur(${blurAmount}px)`
              navbar.style.background = `rgba(255, 255, 255, ${Math.min(0.8, blurProgress)})`
              document.body.classList.add('white-bg')
              navbar.classList.add('navbar-white')
            }
          }
          
          // Handle fluid scroll animations for all sections EXCEPT contact section
          const sections = document.querySelectorAll('.about-section, .services-section-modern, .stats-section')
          
          sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect()
            const sectionTop = rect.top + scrollY - windowHeight * 0.8
            const sectionHeight = rect.height + windowHeight * 0.8
            
            // More fluid progress calculation
            const rawProgress = Math.max(0, Math.min(1, (scrollY - sectionTop) / sectionHeight))
            const progress = easeInOutQuart(rawProgress)
            
            const title = section.querySelector('.section-title')
            const content = section.querySelector('.about-text, .service-showcase, .stats-grid, .categories-grid')
            
            // Handle image animations with scroll-based swipe
            const images = section.querySelectorAll('.about-image-side')
            images.forEach((imgContainer) => {
              const imgRect = imgContainer.getBoundingClientRect()
              const imgCenter = imgRect.top + imgRect.height / 2
              const windowCenter = windowHeight / 2
              
              // Calculate distance from center
              const distanceFromCenter = imgCenter - windowCenter
              const maxDistance = windowHeight
              
              // Calculate progress (-1 to 1, where 0 is center)
              const progress = Math.max(-1, Math.min(1, distanceFromCenter / maxDistance))
              
              // Swipe effect based on scroll position
              if (imgContainer.classList.contains('about-image-side')) {
                // Left images swipe from left
                const translateX = progress * -150 // Negative for left swipe
                imgContainer.style.transform = `translateX(${translateX}px)`
              }
              
              // Opacity based on visibility
              const opacity = 1 - Math.abs(progress) * 0.3
              imgContainer.style.opacity = opacity
            })
            
            if (title && content) {
              // Fluid scaling with different curves for title and content
              const titleScale = Math.max(0.8, 1 - easeOutCubic(progress) * 0.2)
              const contentScale = Math.max(0.9, 1 - easeOutCubic(progress) * 0.1)
              
              // Smooth upward movement with acceleration
              const titleTranslateY = -progress * progress * 200
              const contentTranslateY = -progress * progress * 150
              
              // Smooth opacity with different curves
              const titleOpacity = Math.max(0.1, 1 - Math.pow(progress, 1.5))
              const contentOpacity = Math.max(0.2, 1 - Math.pow(progress, 1.2))
              
              // Apply fluid transforms without rotation
              title.style.transform = `
                scale(${titleScale}) 
                translateY(${titleTranslateY}px) 
                translateZ(0)
              `
              
              content.style.transform = `
                scale(${contentScale}) 
                translateY(${contentTranslateY}px) 
                translateZ(0)
              `
              
              title.style.opacity = titleOpacity
              content.style.opacity = contentOpacity
              
              // Apply dynamic transformations without blur
              // Keep text black but add depth through transforms
              title.style.filter = 'none'
              content.style.filter = 'none'
              
              // Remove color overrides to allow CSS gradient to show
              // title.style.color = '#000000' // Commented out to allow gradient
              // content.style.color = '#333333' // Keep content text color
            }
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
    <div className={`app ${heroRevealed ? 'hero-revealed' : ''}`}>
      {/* Global Background */}
      <div className="global-background">
        <img 
          src={backgroundImage} 
          alt="Background" 
          className="background-image"
        />
      </div>
      
      {/* Hero Section - KEPT EXACTLY AS ORIGINAL */}
      <section id="home" className={`hero-section ${heroRevealed ? 'revealed' : ''}`}>
        <nav className={`navbar ${heroRevealed ? 'nav-revealed' : ''}`}>
          <div className="nav-logo">ArchEase</div>
          <div className={`hamburger ${menuOpen ? 'active' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={`nav-menu ${menuOpen ? 'active' : ''}`}>
            <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Services</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </div>
        </nav>
        <div className={`hero-content ${heroRevealed ? 'content-revealed' : ''}`}>
          <div className="hero-text">
            <h1>ArchEase Solutions</h1>
            <p className="hero-tagline">
              <span className="typed-text">{typedText}</span>
              <span className="typing-cursor">{typedText.length < fullText.length ? '|' : ''}</span>
              <span className={`fade-text ${showSilently ? 'visible' : ''}`}>{typedText.length === fullText.length ? ', ' : ''}</span>
              <span className={`fade-text ${showSilently ? 'visible' : ''}`}>Silently.</span>
            </p>
          </div>
        </div>
        <div className={`hero-cta-buttons ${heroRevealed ? 'buttons-revealed' : ''}`}>
          <a href="#about" className="hero-cta-button hero-cta-explore">About Us</a>
          <Link to="/products" className="hero-cta-button hero-cta-contact">ArchEase Box</Link>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-wrapper">
            <div className="about-image-side">
              <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop" alt="Modern Office Space" />
            </div>
            <div className="about-content-side">
              <DynamicScrollSection className="section-with-content">
                <ScrollAnimatedHeading level="h2" className="section-title">Who We Are</ScrollAnimatedHeading>
                <div className="about-text">
                  <p className="about-description">
                    At Archease, we work quietly in the background so architects and designers can shine in the spotlight.
                    We're the invisible force that makes sourcing faster, decisions easier, and projects smoother.
                  </p>
                  <p className="about-description">
                    From rare, niche products to everyday essentials, our network and expertise ensure you get what you need, when you need it — without the noise.
                  </p>
                </div>
              </DynamicScrollSection>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services-section-modern">
        <div className="container">
          <DynamicScrollSection className="section-with-content">
            <ScrollAnimatedHeading level="h2" className="section-title services-main-title">Our Services</ScrollAnimatedHeading>
            
            {/* Service 1 - Niche & Specialized Products */}
            <div className="service-showcase">
              <div className="service-image-container">
                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop" alt="Specialized Materials" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <ScrollAnimatedHeading level="h3" className="service-heading">Niche & Specialized Products</ScrollAnimatedHeading>
                <ScrollAnimatedText tag="p" className="service-tagline" delay={100}>Uncommon materials. Unique finishes. Standout details.</ScrollAnimatedText>
                <div className="service-features">
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={200}>Rare Materials</ScrollAnimatedText>
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={300}>Custom Finishes</ScrollAnimatedText>
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={400}>Exclusive Access</ScrollAnimatedText>
                </div>
                <a href="#contact" className="service-cta animated-button">
                  <span>Explore Collection</span>
                  <span className="button-arrow">→</span>
                </a>
              </div>
            </div>

            {/* Service 2 - General Essentials */}
            <div className="service-showcase reverse">
              <div className="service-content">
                <ScrollAnimatedHeading level="h3" className="service-heading">General Essentials</ScrollAnimatedHeading>
                <ScrollAnimatedText tag="p" className="service-tagline" delay={100}>The basics — sourced smartly, delivered reliably.</ScrollAnimatedText>
                <div className="service-features">
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={200}>Fast Delivery</ScrollAnimatedText>
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={300}>Bulk Orders</ScrollAnimatedText>
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={400}>Best Prices</ScrollAnimatedText>
                </div>
                <a href="#contact" className="service-cta animated-button">
                  <span>View Catalog</span>
                  <span className="button-arrow">→</span>
                </a>
              </div>
              <div className="service-image-container">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop" alt="Essential Materials" />
                <div className="service-overlay"></div>
              </div>
            </div>

            {/* Service 3 - Custom Solutions */}
            <div className="service-showcase">
              <div className="service-image-container">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop" alt="Custom Solutions" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <ScrollAnimatedHeading level="h3" className="service-heading">Custom Solutions</ScrollAnimatedHeading>
                <ScrollAnimatedText tag="p" className="service-tagline" delay={100}>Bespoke answers for complex design challenges.</ScrollAnimatedText>
                <div className="service-features">
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={200}>Tailored Design</ScrollAnimatedText>
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={300}>Problem Solving</ScrollAnimatedText>
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={400}>Innovation</ScrollAnimatedText>
                </div>
                <a href="#contact" className="service-cta animated-button">
                  <span>Start Project</span>
                  <span className="button-arrow">→</span>
                </a>
              </div>
            </div>

            {/* Service 4 - Vendor Network */}
            <div className="service-showcase reverse">
              <div className="service-content">
                <ScrollAnimatedHeading level="h3" className="service-heading">Vendor Network</ScrollAnimatedHeading>
                <ScrollAnimatedText tag="p" className="service-tagline" delay={100}>Curated suppliers. Proven reliability.</ScrollAnimatedText>
                <div className="service-features">
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={200}>Verified Partners</ScrollAnimatedText>
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={300}>Quality Assured</ScrollAnimatedText>
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={400}>Global Reach</ScrollAnimatedText>
                </div>
                <a href="#contact" className="service-cta animated-button">
                  <span>Meet Partners</span>
                  <span className="button-arrow">→</span>
                </a>
              </div>
              <div className="service-image-container">
                <img src={vendorNetworkImage} alt="Vendor Network" />
                <div className="service-overlay"></div>
              </div>
            </div>

            {/* Service 5 - Architect Support */}
            <div className="service-showcase">
              <div className="service-image-container">
                <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&h=600&fit=crop" alt="Architect Support" />
                <div className="service-overlay"></div>
              </div>
              <div className="service-content">
                <ScrollAnimatedHeading level="h3" className="service-heading">Architect Support</ScrollAnimatedHeading>
                <ScrollAnimatedText tag="p" className="service-tagline" delay={100}>Guidance, sourcing, and insight — all in one place.</ScrollAnimatedText>
                <div className="service-features">
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={200}>Expert Guidance</ScrollAnimatedText>
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={300}>Resource Library</ScrollAnimatedText>
                  <ScrollAnimatedText tag="span" className="service-feature-tag" delay={400}>24/7 Support</ScrollAnimatedText>
                </div>
                <a href="#contact" className="service-cta animated-button">
                  <span>Get Support</span>
                  <span className="button-arrow">→</span>
                </a>
              </div>
            </div>
          </DynamicScrollSection>
        </div>
      </section>

      {/* Our Process Section with ScrollStack Animation */}
      <ScrollStackProcess />

      {/* Meet the Team Section */}
      <section id="team" className="team-section">
        <div className="container">
          <ScrollAnimatedHeading level="h2" className="section-title team-main-title">
            The Team
          </ScrollAnimatedHeading>
          
          <div className="team-composition">
            <div className="team-roles-grid">
              <div className="role-card">
                <div className="role-icon">🏛️</div>
                <h3 className="role-title">Architects</h3>
                <p className="role-desc">Visionaries shaping spaces</p>
              </div>
              <div className="role-card">
                <div className="role-icon">⚙️</div>
                <h3 className="role-title">Engineers</h3>
                <p className="role-desc">Making ideas structurally sound</p>
              </div>
              <div className="role-card">
                <div className="role-icon">🔬</div>
                <h3 className="role-title">Researchers</h3>
                <p className="role-desc">Finding innovative solutions</p>
              </div>
              <div className="role-card">
                <div className="role-icon">🌐</div>
                <h3 className="role-title">Sourcing Experts</h3>
                <p className="role-desc">Connecting you globally</p>
              </div>
            </div>
            
            <div className="team-philosophy">
              <p className="philosophy-main">
                All working quietly to keep your projects running without a hitch.
              </p>
              <p className="philosophy-secondary">
                We're detail-obsessed, solution-driven, and always on the lookout for better, smarter ways to get things done.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Impact Section */}
      <section id="impact" className="impact-section">
        <div className="container">
          <ScrollAnimatedHeading level="h2" className="section-title impact-main-title">
            Impact
          </ScrollAnimatedHeading>
          <div className="impact-grid">
            <div className="impact-bubble">
              <div className="impact-number" data-value="1500">0</div>
              <div className="impact-label">Products Listed</div>
            </div>
            <div className="impact-bubble">
              <div className="impact-number" data-value="700">0</div>
              <div className="impact-label">Identified Vendors</div>
            </div>
            <div className="impact-bubble">
              <div className="impact-number" data-value="450">0</div>
              <div className="impact-label">Registered Vendors</div>
            </div>
            <div className="impact-bubble">
              <div className="impact-number" data-value="380">0</div>
              <div className="impact-label">Actively Engaged Vendors</div>
            </div>
            <div className="impact-bubble">
              <div className="impact-number" data-value="120">0</div>
              <div className="impact-label">Projects Powered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container">
          <ScrollAnimatedHeading level="h2" className="section-title">Want to Work With Us?</ScrollAnimatedHeading>
          <p className="contact-subline">
            Whether you're a vendor looking to join our network or an architect seeking sourcing support — we're ready to power your projects.
          </p>
          <div className="cta-buttons-container">
            <button 
              onClick={() => setFormType('vendor')}
              className={`cta-button ${formType === 'vendor' ? 'cta-active cta-vendor' : 'cta-vendor'}`}
            >
              Register as Vendor
            </button>
            <button 
              onClick={() => setFormType('architect')}
              className={`cta-button ${formType === 'architect' ? 'cta-active cta-architect' : 'cta-architect'}`}
            >
              Work With Archease
            </button>
          </div>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Connect with our team</h3>
              <p>📍 Innovation District, Chennai - 600001</p>
              <p>📞 +91 98765 43210</p>
              <p>✉️ partnerships@archeasesolutions.com</p>
              <div className="social-links">
                <a href="#">LinkedIn</a>
                <a href="#">Behance</a>
                <a href="#">Medium</a>
              </div>
            </div>
            
            {/* Conditional Form Rendering */}
            {formType === 'architect' ? (
              <form className="contact-form" onSubmit={handleArchitectSubmit}>
                <h4 className="form-subtitle">Architect Inquiry Form</h4>
                <input 
                  type="text" 
                  placeholder="Architecture Firm Name" 
                  value={architectForm.firm_name}
                  onChange={(e) => setArchitectForm({...architectForm, firm_name: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  value={architectForm.from_name}
                  onChange={(e) => setArchitectForm({...architectForm, from_name: e.target.value})}
                  required
                />
                <input 
                  type="email" 
                  placeholder="Professional Email" 
                  value={architectForm.email}
                  onChange={(e) => setArchitectForm({...architectForm, email: e.target.value})}
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  value={architectForm.phone}
                  onChange={(e) => setArchitectForm({...architectForm, phone: e.target.value})}
                  required
                />
                <select 
                  className="form-select"
                  value={architectForm.project_type}
                  onChange={(e) => setArchitectForm({...architectForm, project_type: e.target.value})}
                >
                  <option value="">Project Type</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                  <option value="mixed">Mixed Use</option>
                </select>
                <textarea 
                  placeholder="Tell us about your current sourcing challenges and project requirements" 
                  rows="4"
                  value={architectForm.message}
                  onChange={(e) => setArchitectForm({...architectForm, message: e.target.value})}
                ></textarea>
                {submitStatus.message && (
                  <div className={`submit-status ${submitStatus.type === 'success' ? 'status-success' : 'status-error'}`}>
                    {submitStatus.message}
                  </div>
                )}
                <button 
                  className="submit-button" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Request Partnership Discussion'}
                </button>
              </form>
            ) : (
              <form className="contact-form" onSubmit={handleVendorSubmit}>
                <h4 className="form-subtitle">Vendor Registration Form</h4>
                <input 
                  type="text" 
                  placeholder="Company Name" 
                  value={vendorForm.company_name}
                  onChange={(e) => setVendorForm({...vendorForm, company_name: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="Contact Person Name" 
                  value={vendorForm.contact_name}
                  onChange={(e) => setVendorForm({...vendorForm, contact_name: e.target.value})}
                  required
                />
                <input 
                  type="email" 
                  placeholder="Business Email" 
                  value={vendorForm.email}
                  onChange={(e) => setVendorForm({...vendorForm, email: e.target.value})}
                  required
                />
                <input 
                  type="tel" 
                  placeholder="Phone Number" 
                  value={vendorForm.phone}
                  onChange={(e) => setVendorForm({...vendorForm, phone: e.target.value})}
                  required
                />
                <input 
                  type="text" 
                  placeholder="GST Number" 
                  value={vendorForm.gst_number}
                  onChange={(e) => setVendorForm({...vendorForm, gst_number: e.target.value})}
                  required
                />
                <select 
                  className="form-select"
                  value={vendorForm.product_category}
                  onChange={(e) => setVendorForm({...vendorForm, product_category: e.target.value})}
                >
                  <option value="">Product Category</option>
                  <option value="materials">Building Materials</option>
                  <option value="fixtures">Fixtures & Fittings</option>
                  <option value="furniture">Furniture</option>
                  <option value="technology">Technology & Automation</option>
                  <option value="other">Other</option>
                </select>
                <textarea 
                  placeholder="Describe your products/services and unique capabilities" 
                  rows="4"
                  value={vendorForm.description}
                  onChange={(e) => setVendorForm({...vendorForm, description: e.target.value})}
                ></textarea>
                {submitStatus.message && (
                  <div className={`submit-status ${submitStatus.type === 'success' ? 'status-success' : 'status-error'}`}>
                    {submitStatus.message}
                  </div>
                )}
                <button 
                  className="submit-button" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Vendor Application'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-content">
            <div className="footer-main">
              <div className="footer-brand">
                <h3 className="footer-logo">ArchEase Solutions</h3>
                <p className="footer-tagline">Powering Architecture, Silently.</p>
              </div>
              
              <div className="footer-links">
                <div className="footer-column">
                  <h4>Company</h4>
                  <ul>
                    <li><a href="#about">About Us</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact</a></li>
                    <li><a href="#home">Home</a></li>
                  </ul>
                </div>
                
                <div className="footer-column">
                  <h4>Solutions</h4>
                  <ul>
                    <li><a href="#services">Our Services</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                    <li><a href="#about">About</a></li>
                  </ul>
                </div>
                
              </div>
            </div>
            
            <div className="footer-bottom">
              <div className="footer-copyright">
                <p>&copy; 2024 ArchEase Solutions Pvt Ltd. All rights reserved.</p>
              </div>
              <div className="footer-social">
                <a href="#" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12c0-3.403 2.759-6.162 6.162-6.162s6.162 2.759 6.162 6.162-2.759 6.162-6.162 6.162-6.162-2.759-6.162-6.162zm12 0c0-3.223-2.611-5.834-5.834-5.834-3.223 0-5.834 2.611-5.834 5.834s2.611 5.834 5.834 5.834c3.223 0 5.834-2.611 5.834-5.834zm-5.834-7.333c-.752 0-1.362.61-1.362 1.362s.61 1.362 1.362 1.362 1.362-.61 1.362-1.362-.61-1.362-1.362-1.362z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage