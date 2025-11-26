import React, { useEffect, useRef } from 'react';
import '@google/model-viewer';

const ARModelViewer = ({ modelPath, alt, goldType, productName }) => {
  const modelViewerRef = useRef(null);

  useEffect(() => {
    // Ensure model-viewer is loaded and configured for smooth rendering
    const timer = setTimeout(() => {
      if (modelViewerRef.current) {
        const viewer = modelViewerRef.current;
        viewer.cameraOrbit = '0deg 75deg 0.8m';
        viewer.fieldOfView = '45deg';
        viewer.minCameraOrbit = 'auto auto 0.3m';
        viewer.maxCameraOrbit = 'auto auto 3m';
        viewer.interactionPromptThreshold = 0;
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-transparent rounded-lg shadow-2xl">
      <model-viewer
        ref={modelViewerRef}
        src={modelPath}
        alt={alt || productName}
        ar
        ar-modes="webxr scene-viewer quick-look"
        ar-scale="fixed"
        camera-controls
        touch-action="pan-y"
        disable-tap
        interpolation-decay="100"
        auto-rotate
        auto-rotate-delay="1000"
        rotation-per-second="30deg"
        shadow-intensity="1"
        shadow-softness="0.5"
        exposure="1"
        camera-orbit="0deg 75deg 0.8m"
        field-of-view="45deg"
        max-field-of-view="90deg"
        min-field-of-view="20deg"
        min-camera-orbit="auto auto 0.3m"
        max-camera-orbit="auto auto 3m"
        environment-image="neutral"
        ios-src={modelPath}
        skybox-image=""
        interaction-prompt="none"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '500px',
          backgroundColor: 'transparent',
        }}
        className="w-full h-full bg-transparent"
      >
        {/* AR Button */}
        <button
          slot="ar-button"
          className="absolute bottom-20 right-4 px-6 py-3 bg-luxury-gold text-white rounded-full shadow-lg hover:bg-luxury-darkGold transition-all font-sans text-sm tracking-wider uppercase flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17L12 12L2 17Z" opacity="0.6" />
          </svg>
          <span>View in AR</span>
        </button>

        {/* Loading Indicator */}
        <div slot="poster" className="flex items-center justify-center h-full bg-gradient-to-br from-luxury-lightGray to-white">
          <div className="text-center">
            <div className="inline-block animate-spin-slow">
              <svg className="w-16 h-16 text-luxury-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                <path d="M2 17L12 22L22 17L12 12L2 17Z" opacity="0.6" />
              </svg>
            </div>
            <p className="mt-4 font-serif text-luxury-gold text-lg">Loading 3D Model...</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div slot="progress-bar" className="absolute bottom-0 left-0 right-0 h-1 bg-luxury-lightGray overflow-hidden">
          <div className="h-full bg-luxury-gold animate-pulse"></div>
        </div>
      </model-viewer>

      {/* Controls Info */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
        <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
          <p className="text-xs text-luxury-darkGray font-sans">
            👆 Drag to rotate • 🔍 Pinch to zoom • 📱 Tap AR to view in your space
          </p>
        </div>
      </div>

      {/* Product Badge */}
      <div className="absolute top-4 right-4 bg-luxury-gold/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg">
        <p className="text-xs font-sans font-semibold">{goldType}</p>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
        <button
          onClick={() => {
            if (modelViewerRef.current) {
              const currentRotation = modelViewerRef.current.autoRotate;
              modelViewerRef.current.autoRotate = !currentRotation;
            }
          }}
          className="px-4 py-2 bg-white/90 backdrop-blur-sm text-luxury-dark rounded-full shadow-lg hover:bg-luxury-gold hover:text-white transition-all font-sans text-sm"
        >
          Toggle Rotation
        </button>
        
        <button
          onClick={() => {
            if (modelViewerRef.current) {
              modelViewerRef.current.resetTurntableRotation();
              modelViewerRef.current.cameraOrbit = '0deg 75deg 0.8m';
            }
          }}
          className="px-4 py-2 bg-white/90 backdrop-blur-sm text-luxury-dark rounded-full shadow-lg hover:bg-luxury-gold hover:text-white transition-all font-sans text-sm"
        >
          Reset View
        </button>
      </div>
    </div>
  );
};

export default ARModelViewer;
