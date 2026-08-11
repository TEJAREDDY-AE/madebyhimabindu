import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

function ReflowChamber() {
  const pcbRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.8;
    const x = ((time % 6) - 3);
    if (pcbRef.current) {
      pcbRef.current.position.x = x;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* Outer Chamber Glass */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[6.3, 1.25, 2.3]} />
        <meshStandardMaterial
          color="#152126"
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* Internal Multi-Zone Heating Lights */}
      <pointLight position={[-2, 0.3, 0]} intensity={2.0} color="#ff9800" distance={2.5} />
      <pointLight position={[-0.7, 0.3, 0]} intensity={2.5} color="#ff5722" distance={2.5} />
      <pointLight position={[0.7, 0.3, 0]} intensity={4.0} color="#f44336" distance={2.5} />
      <pointLight position={[2.1, 0.3, 0]} intensity={2.5} color="#00E676" distance={2.5} />

      {/* Mesh Conveyor Tracks */}
      <mesh position={[0, -0.2, 0]}>
        <boxGeometry args={[6.5, 0.06, 1.85]} />
        <meshStandardMaterial color="#37474f" metalness={0.95} roughness={0.1} />
      </mesh>

      {/* Travelling PCB Board */}
      <group ref={pcbRef} position={[-2.5, -0.1, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.25, 0.065, 0.85]} />
          <meshStandardMaterial color="#072b1a" roughness={0.25} />
        </mesh>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[0.3, 0.06, 0.3]} />
          <meshStandardMaterial color="#1a2327" />
        </mesh>
        <mesh position={[0.3, 0.06, 0.2]}>
          <boxGeometry args={[0.1, 0.04, 0.1]} />
          <meshStandardMaterial color="#78909c" />
        </mesh>
      </group>

      {/* 3D Thermal Zone Markers */}
      <Html position={[-2, 1.1, 0]} center distanceFactor={7}>
        <div className="pcb-glass px-2.5 py-1 rounded border border-amber-500/60 text-[9px] font-mono font-bold text-amber-400 uppercase bg-black/85 shadow-lg">
          PREHEAT ZONE (150°C)
        </div>
      </Html>
      <Html position={[0.7, 1.1, 0]} center distanceFactor={7}>
        <div className="pcb-glass px-2.5 py-1 rounded border border-red-500/60 text-[9px] font-mono font-bold text-red-400 uppercase bg-black/85 shadow-lg">
          REFLOW PEAK (245°C)
        </div>
      </Html>
      <Html position={[2.1, 1.1, 0]} center distanceFactor={7}>
        <div className="pcb-glass px-2.5 py-1 rounded border border-[#00E676]/60 text-[9px] font-mono font-bold text-[#00E676] uppercase bg-black/85 shadow-lg">
          COOLING SECTION
        </div>
      </Html>
    </group>
  );
}

export const ReflowOvenScene: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 2.5, 5.3], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 10, 6]} intensity={1.6} color="#ffffff" castShadow />
        <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.1}>
          <ReflowChamber />
        </Float>
        <OrbitControls enableZoom={true} maxDistance={8} minDistance={3} />
      </Canvas>
    </div>
  );
};
