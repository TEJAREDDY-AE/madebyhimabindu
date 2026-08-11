import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface BackgroundCanvasProps {
  theme?: 'dark' | 'light';
}

function ParticleGrid({ theme = 'dark' }: BackgroundCanvasProps) {
  const ref = useRef<THREE.Points>(null!);

  const count = 550;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.02;
      ref.current.rotation.y += delta * 0.03;
    }
  });

  const particleColor = theme === 'dark' ? '#00E676' : '#00B853';

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={particleColor}
          size={0.045}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={theme === 'dark' ? 0.35 : 0.5}
        />
      </Points>
    </group>
  );
}

function AmbientTraces({ theme = 'dark' }: BackgroundCanvasProps) {
  const lineRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.rotation.z = state.clock.getElapsedTime() * 0.012;
    }
  });

  const traceColor = theme === 'dark' ? '#00E676' : '#00B853';

  return (
    <group ref={lineRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6, 6.02, 64]} />
        <meshBasicMaterial color={traceColor} transparent opacity={theme === 'dark' ? 0.12 : 0.2} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[10, 10.02, 64]} />
        <meshBasicMaterial color={traceColor} transparent opacity={theme === 'dark' ? 0.08 : 0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ theme = 'dark' }) => {
  const bgColor = theme === 'dark' ? '#050B0D' : '#EEF3F0';
  const strokeColor = theme === 'dark' ? '#00E676' : '#00B853';

  return (
    <div className="fixed inset-0 z-0 pointer-events-none transition-colors duration-500">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }} gl={{ alpha: true, antialias: true }}>
        <color attach="background" args={[bgColor]} />
        <ambientLight intensity={theme === 'dark' ? 0.5 : 0.8} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.6} color="#00E676" />

        <ParticleGrid theme={theme} />
        <AmbientTraces theme={theme} />
      </Canvas>

      {/* Transparent PCB Circuit Pattern Overlay (Non-Disruptive background) */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none flex items-center justify-center overflow-hidden">
        <svg className="w-full h-full text-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" fill="none" stroke={strokeColor}>
          <path d="M100 100 h200 l100 100 v300 l-100 100 h-200" strokeWidth="2" strokeDasharray="6,6" />
          <path d="M800 100 h-200 l-100 100 v300 l100 100 h200" strokeWidth="2" strokeDasharray="6,6" />
          <circle cx="300" cy="100" r="8" fill={strokeColor} />
          <circle cx="700" cy="100" r="8" fill={strokeColor} />
          <circle cx="400" cy="200" r="6" fill={strokeColor} />
          <circle cx="600" cy="200" r="6" fill={strokeColor} />
          <path d="M500 50 v900 M50 500 h900" strokeWidth="1.5" strokeOpacity="0.4" />
          <rect x="350" y="350" width="300" height="300" rx="20" strokeWidth="2" />
          <circle cx="500" cy="500" r="80" strokeWidth="1.5" strokeDasharray="4,4" />
        </svg>
      </div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${strokeColor} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};

