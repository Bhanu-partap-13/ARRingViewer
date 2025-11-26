import React, { useEffect, useRef, useState } from 'react';

const ARModelViewer = ({ modelPath, alt, goldType, productName }) => {
  const modelViewerRef = useRef(null);
  const [canAR, setCanAR] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Construct absolute URL for AR (iOS requires full URL)
  const getModelUrl = () => {
    if (modelPath.startsWith('http')) {
      return modelPath;
    }
    // For development and production
    const baseUrl = window.location.origin;
    return `${baseUrl}${modelPath}`;
  };
  
  const modelUrl = getModelUrl();

  useEffect(() => {
    const checkAR = async () => {
      if (modelViewerRef.current) {
        const supportsAR = await modelViewerRef.current.canActivateAR;
        setCanAR(supportsAR);
        console.log('AR Support:', supportsAR);
        console.log('Model Path:', modelPath);
        console.log('Full Model URL:', modelUrl);
        console.log('Origin:', window.location.origin);
        
        // Prevent scroll on model viewer
        const viewer = modelViewerRef.current;
        viewer.addEventListener('touchstart', (e) => {
          e.stopPropagation();
        }, { passive: false });
        
        viewer.addEventListener('touchmove', (e) => {
          e.stopPropagation();
        }, { passive: false });
        
        // Listen for load event
        viewer.addEventListener('load', () => {
          setIsLoading(false);
        });
        
        viewer.addEventListener('error', () => {
          setIsLoading(false);
        });
      }
    };
    
    // Wait for model-viewer to be ready
    const timer = setTimeout(checkAR, 500);
    return () => clearTimeout(timer);
  }, [modelPath, modelUrl]);

  return (
    <div 
      className="relative w-full h-full min-h-[500px] bg-transparent rounded-lg shadow-2xl"
      onWheel={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDoubleClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onTouchStart={(e) => e.stopPropagation()}
      onTouchMove={(e) => e.stopPropagation()}
      style={{ 
        touchAction: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none',
      }}
    >
      {/* Loading Animation */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/95 backdrop-blur-sm z-50 rounded-lg">
          <div className="text-center">
            {/* Diamond Spinner */}
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 animate-spin">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <polygon
                    points="50,10 90,50 50,90 10,50"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    className="opacity-40"
                  />
                  <polygon
                    points="50,10 70,30 50,50 30,30"
                    fill="#D4AF37"
                    className="opacity-60"
                  />
                  <polygon
                    points="30,30 50,50 30,70 10,50"
                    fill="#D4AF37"
                    className="opacity-40"
                  />
                  <polygon
                    points="70,30 90,50 70,70 50,50"
                    fill="#D4AF37"
                    className="opacity-40"
                  />
                  <polygon
                    points="30,70 50,90 70,70 50,50"
                    fill="#D4AF37"
                    className="opacity-30"
                  />
                </svg>
              </div>
            </div>
            <p className="text-luxury-gold font-serif text-lg font-semibold">Loading 3D Model</p>
            <p className="text-luxury-darkGray font-sans text-sm mt-2">Please wait...</p>
          </div>
        </div>
      )}
      
      <model-viewer
        ref={modelViewerRef}
        src={modelUrl}
        ios-src={modelUrl}
        alt={alt || productName}
        ar
        ar-modes="webxr scene-viewer quick-look"
        camera-controls
        touch-action="none"
        disable-tap
        disable-zoom={false}
        interpolation-decay="200"
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
        interaction-prompt="auto"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '500px',
          backgroundColor: 'transparent',
          outline: 'none',
        }}
      >
        {/* AR Button */}
        <button
          slot="ar-button"
          style={{
            backgroundColor: '#D4AF37',
            borderRadius: '50px',
            border: 'none',
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            padding: '16px 32px',
            fontSize: '16px',
            color: 'white',
            fontWeight: '700',
            textTransform: 'uppercase',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            boxShadow: '0 10px 25px rgba(212, 175, 55, 0.5)',
            zIndex: 9999,
            letterSpacing: '1.5px',
            pointerEvents: 'auto',
          }}
        >
          <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" />
            <path d="M2 17L12 22L22 17L12 12L2 17Z" opacity="0.6" />
          </svg>
          VIEW IN AR
        </button>

        <div slot="progress-bar" style={{ height: '2px', backgroundColor: '#D4AF37' }}></div>
      </model-viewer>

      {/* Controls Info */}
      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
        <p className="text-xs text-luxury-darkGray font-sans">
          🖱️ Scroll/Pinch to zoom • 👆 Drag to rotate
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
