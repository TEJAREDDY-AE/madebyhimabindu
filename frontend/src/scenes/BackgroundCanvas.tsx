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
          opacity={theme === 'dark' ? 0.4 : 0.6}
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
        <meshBasicMaterial color={traceColor} transparent opacity={theme === 'dark' ? 0.15 : 0.25} side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[10, 10.02, 64]} />
        <meshBasicMaterial color={traceColor} transparent opacity={theme === 'dark' ? 0.1 : 0.18} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export const BackgroundCanvas: React.FC<BackgroundCanvasProps> = ({ theme = 'dark' }) => {
  const bgColor = theme === 'dark' ? '#050B0D' : '#EEF3F0';

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

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${theme === 'dark' ? '#00E676' : '#00B853'} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
};
