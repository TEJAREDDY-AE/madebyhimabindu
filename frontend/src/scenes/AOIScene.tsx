import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

function AOIMachine() {
  const scannerRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = Math.sin(state.clock.getElapsedTime() * 2);
    if (scannerRef.current) {
      scannerRef.current.position.x = t * 1.4;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[4.4, 0.22, 2.7]} />
        <meshStandardMaterial color="#0f1719" roughness={0.3} metalness={0.8} />
      </mesh>

      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[3.5, 0.08, 2.1]} />
        <meshStandardMaterial color="#072b1a" roughness={0.25} />
      </mesh>

      <mesh position={[-0.6, -0.05, 0]}>
        <boxGeometry args={[0.7, 0.1, 0.7]} />
        <meshStandardMaterial color="#1a2327" />
      </mesh>
      <mesh position={[0.6, -0.05, 0.4]}>
        <boxGeometry args={[0.5, 0.08, 0.5]} />
        <meshStandardMaterial color="#37474f" />
      </mesh>

      {/* Moving Camera & Ring Scanner */}
      <group ref={scannerRef} position={[0, 0.6, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.42, 0.36, 0.42]} />
          <meshStandardMaterial color="#1c2529" metalness={0.8} />
        </mesh>

        <mesh position={[0, -0.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.3, 0.04, 16, 32]} />
          <meshStandardMaterial color="#00E676" emissive="#00E676" emissiveIntensity={1.5} />
        </mesh>

        <mesh position={[0, -0.5, 0]}>
          <coneGeometry args={[0.45, 0.6, 20]} />
          <meshBasicMaterial
            color="#00E676"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>

      {/* Floating PASS Badge */}
      <Html position={[0, 0.92, 0]} center distanceFactor={5}>
        <div className="pcb-glass px-4 py-2 rounded-xl border border-[#00E676] text-center box-glow-green bg-black/90">
          <div className="text-[10px] font-mono text-[#00E676] font-bold tracking-widest uppercase">
            AOI TELEMETRY RESULT
          </div>
          <div className="text-lg font-mono font-extrabold text-[#19FF88]">
            VERIFIED [PASS]
          </div>
        </div>
      </Html>
    </group>
  );
}

export const AOIScene: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 2.5, 4.3], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 10, 6]} intensity={1.8} color="#ffffff" castShadow />
        <pointLight position={[0, 1, 0]} intensity={1.6} color="#00E676" />
        <Float speed={1} rotationIntensity={0.08} floatIntensity={0.15}>
          <AOIMachine />
        </Float>
        <OrbitControls enableZoom={true} maxDistance={7} minDistance={2} />
      </Canvas>
    </div>
  );
};
