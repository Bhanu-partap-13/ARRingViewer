import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Diamond Ring Model Component
const DiamondRing = ({ color = '#D4AF37' }) => {
  const ringRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (ringRef.current && !hovered) {
      ringRef.current.rotation.y += 0.005;
    }
  });

  return (
    <group ref={ringRef}>
      {/* Ring Band */}
      <mesh
        position={[0, 0, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <torusGeometry args={[1, 0.15, 16, 100]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>

      {/* Diamond (Top Stone) */}
      <mesh position={[0, 0.4, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.3, 0.6, 8]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={2.4}
        />
      </mesh>

      {/* Diamond Base */}
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI, Math.PI / 4, 0]}>
        <coneGeometry args={[0.3, 0.3, 8]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0}
          transmission={0.9}
          thickness={0.5}
          envMapIntensity={2}
          clearcoat={1}
          clearcoatRoughness={0}
          ior={2.4}
        />
      </mesh>

      {/* Accent Diamonds */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const x = Math.cos(angle) * 1.15;
        const z = Math.sin(angle) * 1.15;
        return (
          <mesh key={i} position={[x, 0.05, z]} scale={0.15}>
            <sphereGeometry args={[0.1, 16, 16]} />
            <meshPhysicalMaterial
              color="#ffffff"
              metalness={0}
              roughness={0}
              transmission={0.95}
              envMapIntensity={2}
              clearcoat={1}
              ior={2.4}
            />
          </mesh>
        );
      })}

      {/* Prongs */}
      {[0, 90, 180, 270].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 0.25;
        const z = Math.sin(rad) * 0.25;
        return (
          <mesh key={i} position={[x, 0.2, z]}>
            <cylinderGeometry args={[0.02, 0.02, 0.4, 8]} />
            <meshStandardMaterial color={color} metalness={0.9} roughness={0.1} />
          </mesh>
        );
      })}
    </group>
  );
};

// Main 3D Viewer Component
const Ring3DViewer = ({ goldType = '18K White Gold' }) => {
  const [autoRotate, setAutoRotate] = useState(true);

  // Determine ring color based on gold type
  const getRingColor = () => {
    if (goldType.includes('White')) return '#E5E4E2';
    if (goldType.includes('Rose')) return '#B76E79';
    if (goldType.includes('Yellow')) return '#D4AF37';
    if (goldType.includes('Platinum')) return '#E5E4E2';
    return '#D4AF37';
  };

  return (
    <div className="relative w-full h-full min-h-[500px] bg-gradient-to-br from-luxury-lightGray to-white rounded-lg overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={50} />
        
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <pointLight position={[0, 5, 0]} intensity={0.5} />
        <spotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          castShadow
        />

        <Suspense fallback={null}>
          {/* Environment for reflections */}
          <Environment preset="studio" />
          
          {/* The Ring */}
          <DiamondRing color={getRingColor()} />
          
          {/* Shadow */}
          <ContactShadows
            position={[0, -0.8, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
        </Suspense>

        {/* Controls */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={3}
          maxDistance={8}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
        />
      </Canvas>

      {/* Controls UI */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className="px-4 py-2 bg-white/90 backdrop-blur-sm text-luxury-dark rounded-full shadow-lg hover:bg-luxury-gold hover:text-white transition-all font-sans text-sm"
        >
          {autoRotate ? 'Stop Rotation' : 'Auto Rotate'}
        </button>
      </div>

      {/* View Instructions */}
      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
        <p className="text-xs text-luxury-darkGray font-sans">
          Click and drag to rotate • Scroll to zoom
        </p>
      </div>
    </div>
  );
};

export default Ring3DViewer;
