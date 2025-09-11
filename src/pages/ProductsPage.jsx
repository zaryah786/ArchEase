import { useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductsPage.css'

// Import product images from your product-images folder
import doors from '../product-images/doors.jpg'
import door from '../product-images/door.jpeg'
import windows from '../product-images/windows.jpeg'
import flooring from '../product-images/flooring.jpeg'
import plyModular from '../product-images/Plyandmodular.jpeg'
import switches from '../product-images/switches.jpeg'
import plumbing from '../product-images/plumbing.jpeg'
import staircaseMetal from '../product-images/staircase-metal.jpeg'
import handrail from '../product-images/Handrail.jpeg'
import surveillance from '../product-images/Surveillance.jpeg'
import automation from '../product-images/automation.jpeg'
import water from '../product-images/Water.jpeg'
import pumps from '../product-images/Pumps.jpeg'
import swimming from '../product-images/Swimming.jpeg'
import hvac from '../product-images/HVAC.jpeg'
import sound from '../product-images/Sound.jpeg'
import glassBlocks from '../product-images/glassblocks.jpeg'
import garage from '../product-images/garage.jpeg'
import terrazzo from '../product-images/Terrazzo.jpeg'
import printedFlooring from '../product-images/printed-flooring.jpeg'
import aluminumLouvres from '../product-images/Aluminum-louvres.jpeg'
import adjustableRoof from '../product-images/Adjustable-roof.jpg'
import stretchCeiling from '../product-images/Stretch-ceiling.jpeg'
import fiberOptic from '../product-images/Optic-fiber-light-ceiling.jpeg'
import mosaicArt from '../product-images/Mosaic-art.jpeg'
import outdoorFurniture from '../product-images/Outdoor-furniture.jpg'
import framelessDoor from '../product-images/framless-door.jpeg'
import container from '../product-images/container.jpeg'
import timberHouse from '../product-images/Timber-house.jpg'
import specializedFlooring from '../product-images/Specialized-flooring.jpeg'
import outdoor from '../product-images/outdoor.jpeg'
import landscape from '../product-images/landscape.jpeg'
import aquarium from '../product-images/Aquarium.jpeg'
import glassFlooring from '../product-images/glassfloring.jpeg'
import download from '../product-images/download.jpeg'

function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Product image mapping - using your actual product images
  const productImages = {
    // Niche Products
    'Mosaic art': mosaicArt,
    'Timber house': timberHouse,
    'Terrazzo flooring': terrazzo,
    
    // Essential Products
    'Doors': doors,
    'Windows': windows,
    'Flooring': flooring,
    'Ply & Modular furniture unit': plyModular,
    'Switches': switches,
    'Plumbing': plumbing,
    'Staircase- metal': staircaseMetal,
    'Handrail': handrail,
    
    // Special Products
    'Glass blocks': glassBlocks,
    'Garage doors': garage,
    'Glass Flooring': glassFlooring,
    'Printed tile flooring': printedFlooring,
    'Aluminum louvres': aluminumLouvres,
    'Adjustable roof': adjustableRoof,
    'Stretch ceiling': stretchCeiling,
    'Optic fiber light ceiling': fiberOptic,
    'Outdoor furniture': outdoorFurniture,
    'Frameless glass door': framelessDoor,
    'Container House/Office': container,
    'Specialized flooring': specializedFlooring,
    
    // Solution Providers
    'Surveillance Systems': surveillance,
    'Home Automation': automation,
    'Water Treatment plant': water,
    'Pumps': pumps,
    'Swimming pool circulation system': swimming,
    'HVAC systems': hvac,
    'Sound Systems': sound,
    'Aquarium/ Terrarium': aquarium,
    'Landscape': landscape
  }

  const productCategories = {
    niche: {
      title: 'NICHE PRODUCTS',
      description: 'Highly customized, technically advanced, or architecturally rare offerings',
      color: '#C41E3A',
      items: [
        'Mosaic art',
        'Timber house',
        'Terrazzo flooring'
      ]
    },
    essential: {
      title: 'ESSENTIAL PRODUCTS',
      description: 'Must-have items found in most construction/interior projects',
      color: '#C41E3A',
      items: [
        'Doors',
        'Windows',
        'Flooring',
        'Ply & Modular furniture unit',
        'Switches',
        'Plumbing',
        'Staircase- metal',
        'Handrail'
      ]
    },
    special: {
      title: 'SPECIAL PRODUCTS',
      description: 'Value-added, high-design, or premium-performance materials',
      color: '#C41E3A',
      items: [
        'Glass blocks',
        'Garage doors',
        'Glass Flooring',
        'Printed tile flooring',
        'Aluminum louvres',
        'Adjustable roof',
        'Stretch ceiling',
        'Optic fiber light ceiling',
        'Outdoor furniture',
        'Frameless glass door',
        'Container House/Office',
        'Specialized flooring'
      ]
    },
    solution: {
      title: 'SOLUTION PROVIDERS',
      description: 'Integrated systems or bundled offerings designed to solve functional or aesthetic challenges',
      color: '#C41E3A',
      items: [
        'Surveillance Systems',
        'Home Automation',
        'Water Treatment plant',
        'Pumps',
        'Swimming pool circulation system',
        'HVAC systems',
        'Sound Systems',
        'Aquarium/ Terrarium',
        'Landscape'
      ]
    }
  }

  const allProducts = Object.entries(productCategories).reduce((acc, [key, category]) => {
    return [...acc, ...category.items.map(item => ({ item, category: key, categoryData: category }))]
  }, [])

  const filteredProducts = selectedCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => product.category === selectedCategory)

  return (
    <div className="products-page">
      {/* Navigation Bar */}
      <nav className="products-nav">
        <Link to="/" className="nav-logo">ArchEase</Link>
        <div className="nav-menu">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <a href="/#contact">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="products-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Product Categories</h1>
          <p className="hero-subtitle">Discover our comprehensive range of architectural solutions</p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="category-cards-section">
        <div className="container">
          <div className="category-cards-grid">
            {Object.entries(productCategories).map(([key, category]) => (
              <div 
                key={key} 
                className={`category-card ${selectedCategory === key ? 'active' : ''}`}
                onClick={() => setSelectedCategory(key === selectedCategory ? 'all' : key)}
              >
                <div className="category-card-header" style={{ backgroundColor: category.color }}>
                  <h3>{category.title}</h3>
                </div>
                <div className="category-card-body">
                  <p>{category.description}</p>
                  <span className="item-count">{category.items.length} Products</span>
                </div>
              </div>
            ))}
          </div>
          {selectedCategory !== 'all' && (
            <button 
              className="clear-filter-btn"
              onClick={() => setSelectedCategory('all')}
            >
              Show All Categories
            </button>
          )}
        </div>
      </section>

      {/* Products Grid */}
      <section className="products-grid-section">
        <div className="container">
          <h2 className="section-title">
            {selectedCategory === 'all' 
              ? 'All Products' 
              : productCategories[selectedCategory].title}
          </h2>
          
          <div className="products-grid">
            {filteredProducts.map((product, index) => (
              <div key={index} className="product-card">
                <div className="product-image">
                  <img 
                    src={productImages[product.item] || download} 
                    alt={product.item}
                  />
                  <div className="product-overlay">
                    <span className="product-category-tag">
                      {product.categoryData.title}
                    </span>
                  </div>
                </div>
                <div className="product-info">
                  <h4>{product.item}</h4>
                  <button className="product-enquiry-btn">
                    Enquire Now →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="products-cta">
        <div className="container">
          <h2>Can't find what you're looking for?</h2>
          <p>Our sourcing experts can help you find any product you need</p>
          <Link to="/#contact" className="cta-button">Contact Our Team</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="products-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>ArchEase Solutions</h3>
              <p>Powering Architecture, Silently.</p>
            </div>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/products">Products</Link>
              <Link to="/#about">About</Link>
              <Link to="/#contact">Contact</Link>
            </div>
            <div className="footer-social">
              <a href="#">LinkedIn</a>
              <a href="#">Behance</a>
              <a href="#">Medium</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 ArchEase Solutions Pvt Ltd. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ProductsPage