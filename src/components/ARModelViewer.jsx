import React, { useEffect, useRef, useState } from 'react';

const ARModelViewer = ({ modelPath, alt, goldType, productName }) => {
  const modelViewerRef = useRef(null);
  const [canAR, setCanAR] = useState(false);

  useEffect(() => {
    const checkAR = async () => {
      if (modelViewerRef.current) {
        const supportsAR = await modelViewerRef.current.canActivateAR;
        setCanAR(supportsAR);
        console.log('AR Support:', supportsAR);
        console.log('Model Path:', modelPath);
      }
    };
    
    // Wait for model-viewer to be ready
    const timer = setTimeout(checkAR, 500);
    return () => clearTimeout(timer);
  }, [modelPath]);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-transparent rounded-lg shadow-2xl">
      <model-viewer
        ref={modelViewerRef}
        src={modelPath}
        ios-src={modelPath}
        alt={alt || productName}
        ar
        ar-modes="scene-viewer webxr quick-look"
        camera-controls
        auto-rotate
        auto-rotate-delay="1000"
        rotation-per-second="30deg"
        shadow-intensity="1"
        exposure="1"
        camera-orbit="0deg 75deg 0.8m"
        field-of-view="45deg"
        max-field-of-view="90deg"
        min-field-of-view="20deg"
        min-camera-orbit="auto auto 0.3m"
        max-camera-orbit="auto auto 3m"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '500px',
          backgroundColor: 'transparent',
        }}
      >
        {/* AR Button - model-viewer creates this automatically */}
        <button
          slot="ar-button"
          id="ar-button"
          style={{
            backgroundColor: '#D4AF37',
            borderRadius: '9999px',
            border: 'none',
            position: 'absolute',
            bottom: '16px',
            right: '16px',
            padding: '12px 24px',
            fontSize: '14px',
            color: 'white',
            fontWeight: '600',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          }}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17L12 12L2 17Z" opacity="0.6" />
          </svg>
          View in AR
        </button>

        <div slot="progress-bar" style={{ height: '2px', backgroundColor: '#D4AF37' }}></div>
      </model-viewer>

      {/* Controls Info */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
        <p className="text-xs text-luxury-darkGray font-sans">
          👆 Drag to rotate • 🔍 Pinch to zoom
        </p>
      </div>

      {/* AR Status */}
      {canAR && (
        <div className="absolute top-16 left-4 right-4">
          <div className="bg-green-500/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg text-white text-center">
            <p className="text-xs font-sans font-semibold">
              ✅ AR Ready! Tap "View in AR" button below
            </p>
          </div>
        </div>
      )}

      {/* Product Badge */}
      <div className="absolute top-4 right-4 bg-luxury-gold/90 backdrop-blur-sm text-white px-4 py-2 rounded-lg shadow-lg">
        <p className="text-xs font-sans font-semibold">{goldType}</p>
      </div>
    </div>
  );
};

export default ARModelViewer;
