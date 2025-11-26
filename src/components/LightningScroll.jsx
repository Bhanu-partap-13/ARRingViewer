import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const LightningScroll = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const lightningRef = useRef([]);
  const scrollProgressRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Create lightning bolts
    const createLightningBolt = (x, y, z) => {
      const points = [];
      const segments = 20;
      let currentX = x;
      let currentY = y;
      let currentZ = z;

      for (let i = 0; i < segments; i++) {
        points.push(new THREE.Vector3(currentX, currentY, currentZ));
        currentX += (Math.random() - 0.5) * 0.3;
        currentY -= 0.3 + Math.random() * 0.2;
        currentZ += (Math.random() - 0.5) * 0.3;
      }

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xD4AF37, // Luxury gold
        linewidth: 2,
        opacity: 0,
        transparent: true,
      });

      const lightning = new THREE.Line(geometry, material);
      scene.add(lightning);
      lightningRef.current.push({
        mesh: lightning,
        baseOpacity: 0.6 + Math.random() * 0.4,
        flashSpeed: 0.05 + Math.random() * 0.1,
      });

      return lightning;
    };

    // Create multiple lightning bolts
    for (let i = 0; i < 8; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = 5 + Math.random() * 3;
      const z = (Math.random() - 0.5) * 5;
      createLightningBolt(x, y, z);
    }

    // Add point lights for glow effect
    const lights = [];
    for (let i = 0; i < 5; i++) {
      const light = new THREE.PointLight(0xD4AF37, 0, 5);
      light.position.set(
        (Math.random() - 0.5) * 10,
        Math.random() * 5,
        (Math.random() - 0.5) * 5
      );
      scene.add(light);
      lights.push(light);
    }

    // Animation loop
    let frameId;
    const animate = () => {
      frameId = requestAnimationFrame(animate);

      const scrollProgress = scrollProgressRef.current;

      // Animate lightning based on scroll
      lightningRef.current.forEach((lightning, index) => {
        const offset = index * 0.2;
        const flash = Math.sin(Date.now() * lightning.flashSpeed + offset);
        
        // Lightning appears and flashes based on scroll
        if (scrollProgress > 0.1) {
          lightning.mesh.material.opacity = 
            (scrollProgress * lightning.baseOpacity * (0.5 + flash * 0.5));
        } else {
          lightning.mesh.material.opacity = 0;
        }

        // Rotate lightning slightly
        lightning.mesh.rotation.z += 0.001;
      });

      // Animate lights
      lights.forEach((light, index) => {
        const offset = index * 0.5;
        light.intensity = scrollProgress * 2 * (0.5 + Math.sin(Date.now() * 0.003 + offset) * 0.5);
      });

      // Rotate camera based on scroll
      camera.position.x = Math.sin(scrollProgress * Math.PI) * 2;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Scroll handler
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      scrollProgressRef.current = Math.min(scrollPosition / scrollHeight, 1);
    };

    window.addEventListener('scroll', handleScroll);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      
      lightningRef.current.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
        scene.remove(mesh);
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-40"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default LightningScroll;
