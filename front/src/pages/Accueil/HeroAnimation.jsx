import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function SandParticles() {
  const geoRef = useRef();
  const { viewport } = useThree();
  const particleCount = 3000; // Quantité diminuée
  
  // Générer les positions initiales et les vitesses aléatoires pour chaque grain
  const { basePositions, initialPositions, randomSpeeds } = useMemo(() => {
    const basePos = new Float32Array(particleCount * 3);
    const initPos = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);
    
    // Taille du cercle encore diminuée
    const radius = 0.5; 

    for (let i = 0; i < particleCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * radius;

      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * sinPhi * Math.sin(theta);
      const z = r * Math.cos(phi);

      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;

      initPos[i * 3] = x;
      initPos[i * 3 + 1] = y;
      initPos[i * 3 + 2] = z;

      // Chaque grain a sa propre vitesse de suivi (entre 0.02 et 0.1)
      speeds[i] = 0.02 + Math.random() * 0.08;
    }
    return { basePositions: basePos, initialPositions: initPos, randomSpeeds: speeds };
  }, [particleCount]);

  // Suivi de la souris
  const mouse = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Variables pour la rotation continue
  const rotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!geoRef.current) return;

    rotation.current.x -= delta / 10;
    rotation.current.y -= delta / 15;

    const targetX = (mouse.current.x * viewport.width) / 2;
    const targetY = (mouse.current.y * viewport.height) / 2;

    const positions = geoRef.current.attributes.position.array;
    
    const cx = Math.cos(rotation.current.x);
    const sx = Math.sin(rotation.current.x);
    const cy = Math.cos(rotation.current.y);
    const sy = Math.sin(rotation.current.y);

    // Mettre à jour chaque particule individuellement
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const bx = basePositions[i3];
      const by = basePositions[i3 + 1];
      const bz = basePositions[i3 + 2];
      
      // 1. Rotation purement mathématique autour du centre de la boule
      const ry = by * cx - bz * sx;
      const rz = by * sx + bz * cx;
      const rx = bx * cy + rz * sy;
      const finalZ = -bx * sy + rz * cy;
      
      // 2. Décalage vers la position de la souris
      const goalX = rx + targetX;
      const goalY = ry + targetY;
      const goalZ = finalZ;
      
      // 3. Interpolation (Lerp) avec la vitesse individuelle du grain
      const speed = randomSpeeds[i];
      positions[i3]     += (goalX - positions[i3]) * speed;
      positions[i3 + 1] += (goalY - positions[i3 + 1]) * speed;
      positions[i3 + 2] += (goalZ - positions[i3 + 2]) * speed;
    }
    
    // Indiquer à Three.js que les positions ont changé
    geoRef.current.attributes.position.needsUpdate = true;
  });

  return (
    <points frustumCulled={false}>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={initialPositions}
          itemSize={3}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#000000" // Couleur bien noire
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.55} // Opacité diminuée pour adoucir le rendu
      />
    </points>
  );
}

export default function HeroAnimation() {
  return (
    <div className="hero-3d-wrapper">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <SandParticles />
      </Canvas>
    </div>
  );
}
