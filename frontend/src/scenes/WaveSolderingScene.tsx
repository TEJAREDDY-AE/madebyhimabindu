import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

function SimplifiedWaveSoldering() {
  const waveRef = useRef<THREE.Mesh>(null!);
  const boardRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    // Gentle liquid solder wave motion
    if (waveRef.current) {
      waveRef.current.position.y = -0.1 + Math.sin(time * 3) * 0.025;
    }
    // Board movement over the solder wave
    if (boardRef.current) {
      boardRef.current.position.x = Math.sin(time * 0.7) * 0.5;
    }
  });

  return (
    <group position={[0, -0.1, 0]} scale={1.25}>
      {/* Solder Pot Reservoir Tank */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[3.8, 0.5, 2.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Bright Liquid Solder Wave Bath (Liquid Silver Mirror) */}
      <mesh ref={waveRef} position={[0, -0.1, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.3, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.99}
          roughness={0.02}
          emissive="#cbd5e1"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Travelling Circuit Board with Through-Hole Pins */}
      <group ref={boardRef} position={[0, 0.25, 0]}>
        {/* FR-4 Green PCB Substrate */}
        <mesh castShadow receiveShadow position={[0, 0.05, 0]}>
          <boxGeometry args={[3.2, 0.08, 1.6]} />
          <meshStandardMaterial color="#059669" roughness={0.2} metalness={0.2} />
        </mesh>

        {/* THT Components sitting on top of the PCB */}
        <group position={[-0.6, 0.32, -0.3]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.24, 0.24, 0.46, 20]} />
            <meshStandardMaterial color="#2563eb" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
        <group position={[0.6, 0.32, 0.3]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.44, 20]} />
            <meshStandardMaterial color="#dc2626" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Metallic Pins extending UNDERNEATH the board directly contacting the solder wave */}
        {[-0.9, -0.6, -0.3, 0, 0.3, 0.6, 0.9].map((x, i) =>
          [-0.4, 0.4].map((z, j) => (
            <mesh key={`pin-${i}-${j}`} position={[x, -0.1, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.28, 12]} />
              <meshStandardMaterial color="#ffffff" metalness={0.98} roughness={0.05} />
            </mesh>
          ))
        )}
      </group>

      {/* Simple & Bold 3D Labels */}
      <Html position={[0, 0.75, 0]} center distanceFactor={5.5}>
        <div className="pcb-glass px-3.5 py-1.5 rounded-xl border border-white text-xs font-mono font-bold text-white tracking-widest uppercase bg-black/90 shadow-2xl whitespace-nowrap">
          📌 THROUGH-HOLE COMPONENTS & PINS
        </div>
      </Html>

      <Html position={[0, -0.4, 1.0]} center distanceFactor={5.5}>
        <div className="pcb-glass px-3.5 py-1.5 rounded-xl border border-[#00E676] text-xs font-mono font-bold text-[#19FF88] tracking-widest uppercase bg-black/90 shadow-2xl whitespace-nowrap box-glow-green">
          🌊 MOLTEN SOLDER WAVE BATH (260°C)
        </div>
      </Html>
    </group>
  );
}

export const WaveSolderingScene: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 2.0, 4.0], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[6, 12, 8]} intensity={2.0} color="#ffffff" castShadow />
        <directionalLight position={[-6, -4, -4]} intensity={0.8} color="#ffffff" />
        <pointLight position={[0, 0.5, 0]} intensity={1.8} color="#ffffff" />

        <Float speed={1} rotationIntensity={0.08} floatIntensity={0.15}>
          <SimplifiedWaveSoldering />
        </Float>
        <OrbitControls enableZoom={true} maxDistance={7} minDistance={1.8} />
      </Canvas>
    </div>
  );
};
