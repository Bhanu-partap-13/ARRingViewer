import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { products } from '../data/products';
import ARModelViewer from '../components/ARModelViewer';
import DiamondLoader from '../components/DiamondLoader';

const ProductDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct);
      setLoading(false);
    }, 1500);
  }, [id]);

  if (loading) {
    return <DiamondLoader />;
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-4xl text-luxury-dark mb-4">Product Not Found</h2>
          <Link to="/products" className="text-luxury-gold hover:underline">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const specifications = [
    { label: 'Carat Weight', value: `${product.carat} CT` },
    { label: 'Metal', value: product.goldType },
    { label: 'Total Weight', value: product.weight },
    { label: 'Gemstone', value: product.gemstone },
    { label: 'Clarity', value: product.clarity },
    { label: 'Color', value: product.color },
    { label: 'Cut', value: product.cut },
    { label: 'Dimensions', value: product.dimensions },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center space-x-2 text-sm font-sans text-luxury-darkGray"
        >
          <Link to="/" className="hover:text-luxury-gold transition-colors">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-luxury-gold transition-colors">Products</Link>
          <span>/</span>
          <span className="text-luxury-dark">{product.name}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - 3D Viewer and Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* 3D Viewer with AR Support */}
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <ARModelViewer 
                modelPath={product.modelPath}
                alt={product.name}
                goldType={product.goldType}
                productName={product.name}
              />
            </div>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[product.image, product.image, product.image, product.image].map((img, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(idx)}
                  className={`cursor-pointer rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'ring-2 ring-luxury-gold' : ''
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} view ${idx + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            {/* Product Header */}
            <div>
              <span className="inline-block px-4 py-1 bg-luxury-gold/10 text-luxury-gold rounded-full text-sm font-sans mb-4">
                {product.category}
              </span>
              <h1 className="font-serif text-5xl font-bold text-luxury-dark mb-4">
                {product.name}
              </h1>
              <p className="text-luxury-darkGray font-sans text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="border-t border-b border-luxury-lightGray py-6">
              <div className="flex items-baseline space-x-2">
                <span className="font-serif text-5xl font-bold text-luxury-gold">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-luxury-darkGray font-sans text-sm">USD</span>
              </div>
              <p className="text-sm text-luxury-darkGray mt-2 font-sans">
                *Price includes certification and complimentary resizing
              </p>
            </div>

            {/* Specifications Grid */}
            <div>
              <h2 className="font-serif text-2xl font-semibold text-luxury-dark mb-6">
                Specifications
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {specifications.map((spec, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-luxury-lightGray rounded-lg p-4"
                  >
                    <p className="text-xs text-luxury-darkGray font-sans uppercase tracking-wider mb-1">
                      {spec.label}
                    </p>
                    <p className="font-serif text-lg font-semibold text-luxury-dark">
                      {spec.value}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-luxury-gold text-white font-sans text-sm tracking-widest uppercase rounded-lg hover:bg-luxury-darkGold transition-colors shadow-lg"
              >
                Add to Cart
              </motion.button>
              
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 border-2 border-luxury-gold text-luxury-gold font-sans text-sm tracking-widest uppercase rounded-lg hover:bg-luxury-gold hover:text-white transition-all"
                >
                  Schedule Viewing
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="py-3 border-2 border-luxury-darkGray text-luxury-darkGray font-sans text-sm tracking-widest uppercase rounded-lg hover:bg-luxury-darkGray hover:text-white transition-all"
                >
                  Request Info
                </motion.button>
              </div>
            </div>

            {/* Features */}
            <div className="bg-luxury-lightGray rounded-lg p-6">
              <h3 className="font-serif text-xl font-semibold text-luxury-dark mb-4">
                What's Included
              </h3>
              <ul className="space-y-3">
                {[
                  'Certified Diamond Authentication',
                  'Luxury Gift Packaging',
                  'Lifetime Warranty',
                  'Free Resizing (One Time)',
                  'Professional Cleaning Kit',
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <svg className="w-5 h-5 text-luxury-gold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-sans text-luxury-dark">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
