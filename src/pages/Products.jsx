import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';

const Products = () => {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-luxury-dark mb-4">
            Our <span className="text-gradient">Collections</span>
          </h1>
          <p className="font-sans text-luxury-darkGray text-lg max-w-2xl mx-auto">
            Discover our curated selection of exquisite jewelry pieces, 
            each crafted to perfection with the finest materials
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/product/${product.id}`}>
                <div className="luxury-card group">
                  {/* Image Container */}
                  <div className="relative overflow-hidden aspect-square bg-luxury-lightGray">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                    {/* Overlay on Hover */}
                    <div className="absolute inset-0 bg-luxury-dark/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-luxury-gold text-white font-sans text-sm tracking-wider uppercase rounded-full"
                      >
                        View Details
                      </motion.button>
                    </div>

                    {/* Badge */}
                    <div className="absolute top-4 right-4 bg-luxury-gold text-white px-3 py-1 rounded-full text-xs font-sans font-semibold">
                      {product.carat} CT
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    <h3 className="font-serif text-2xl font-semibold text-luxury-dark mb-2 group-hover:text-luxury-gold transition-colors">
                      {product.name}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-luxury-darkGray font-sans">
                        {product.goldType}
                      </span>
                      <span className="text-sm text-luxury-darkGray font-sans">
                        {product.clarity}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-serif text-3xl font-bold text-luxury-gold">
                        ${product.price.toLocaleString()}
                      </span>
                      
                      <svg
                        className="w-6 h-6 text-luxury-gold transition-transform group-hover:translate-x-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
