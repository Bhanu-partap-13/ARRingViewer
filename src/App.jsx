import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/Dashboard';
import DiamondLoader from './components/DiamondLoader';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial loading
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <DiamondLoader />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-luxury-lightGray">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        
        {/* Footer */}
        <footer className="bg-luxury-dark text-luxury-cream py-12 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif text-2xl font-bold text-gradient mb-4">LUXE</h3>
              <p className="font-sans text-sm text-luxury-cream/80">
                Crafting timeless elegance since 1985
              </p>
            </div>
            
            <div>
              <h4 className="font-sans font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
              <ul className="space-y-2 font-sans text-sm">
                <li><a href="/products" className="hover:text-luxury-gold transition-colors">Collections</a></li>
                <li><a href="/dashboard" className="hover:text-luxury-gold transition-colors">Dashboard</a></li>
                <li><a href="#" className="hover:text-luxury-gold transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-luxury-gold transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-sans font-semibold mb-4 uppercase tracking-wider">Services</h4>
              <ul className="space-y-2 font-sans text-sm">
                <li><a href="#" className="hover:text-luxury-gold transition-colors">Custom Design</a></li>
                <li><a href="#" className="hover:text-luxury-gold transition-colors">Appraisal</a></li>
                <li><a href="#" className="hover:text-luxury-gold transition-colors">Repairs</a></li>
                <li><a href="#" className="hover:text-luxury-gold transition-colors">Consultation</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-sans font-semibold mb-4 uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2 font-sans text-sm">
                <li>+1 (555) 123-4567</li>
                <li>info@luxejewelry.com</li>
                <li>123 Diamond Street</li>
                <li>New York, NY 10001</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-luxury-cream/20 mt-8 pt-8 text-center">
            <p className="font-sans text-sm text-luxury-cream/60">
              © 2025 LUXE Jewelry. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
