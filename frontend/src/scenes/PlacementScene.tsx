import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

function PickAndPlaceMachine() {
  const headRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 2;
    const x = Math.sin(time) * 1.3;
    const z = Math.cos(time * 0.7) * 0.8;
    const y = 0.45 + Math.abs(Math.sin(time * 2)) * 0.25;

    if (headRef.current) {
      headRef.current.position.set(x, y, z);
    }
  });

  const reelColors = ['#eab308', '#ef4444', '#06b6d4', '#10b981', '#a855f7'];

  return (
    <group position={[0, -0.2, 0]}>
      {/* Chassis Base (Industrial Navy Slate) */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[4.4, 0.22, 2.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* FR-4 PCB Board (Vibrant Emerald Green) */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[3.6, 0.08, 2.2]} />
        <meshStandardMaterial color="#047857" roughness={0.25} />
      </mesh>

      {/* Surface Mount Gold Pads */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) =>
        [-0.7, 0, 0.7].map((z, j) => (
          <group key={`smt-pad-${i}-${j}`} position={[x, -0.1, z]}>
            <mesh position={[-0.12, 0, 0]}>
              <boxGeometry args={[0.08, 0.005, 0.12]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} />
            </mesh>
            <mesh position={[0.12, 0, 0]}>
              <boxGeometry args={[0.08, 0.005, 0.12]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.9} />
            </mesh>
          </group>
        ))
      )}

      {/* Vibrant Multi-Colored Tape Reels along Left Side */}
      <group position={[-2.0, 0, 0]}>
        {[-0.8, -0.4, 0, 0.4, 0.8].map((z, i) => (
          <group key={`reel-${i}`} position={[0, 0.1, z]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.28, 0.28, 0.06, 20]} />
              <meshStandardMaterial color={reelColors[i % reelColors.length]} metalness={0.8} />
            </mesh>
            <mesh position={[0.2, 0.05, 0]}>
              <boxGeometry args={[0.45, 0.02, 0.07]} />
              <meshStandardMaterial color="#020617" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Cyan Linear Motion Gantry Rails */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[4.2, 0.09, 0.09]} />
        <meshStandardMaterial color="#0ea5e9" metalness={0.9} />
      </mesh>

      {/* Robotic Head & Vacuum Nozzle */}
      <group ref={headRef} position={[0, 0.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.45, 0.55, 0.45]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>

        <mesh position={[0, -0.32, 0]}>
          <cylinderGeometry args={[0.02, 0.045, 0.22, 16]} />
          <meshStandardMaterial color="#f59e0b" metalness={0.95} />
        </mesh>

        {/* Laser Vision Scanner Grid Cone (Vibrant Green) */}
        <mesh position={[0, -0.65, 0]}>
          <coneGeometry args={[0.4, 0.7, 20]} />
          <meshBasicMaterial
            color="#00E676"
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* Terracotta Clay SMD Passives held by nozzle */}
        <group position={[0, -0.44, 0]}>
          <mesh>
            <boxGeometry args={[0.16, 0.05, 0.09]} />
            <meshStandardMaterial color="#d97706" />
          </mesh>
          <mesh position={[-0.08, 0, 0]}>
            <boxGeometry args={[0.03, 0.055, 0.095]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.95} />
          </mesh>
          <mesh position={[0.08, 0, 0]}>
            <boxGeometry args={[0.03, 0.055, 0.095]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.95} />
          </mesh>
        </group>
      </group>

      {/* 3D Labels */}
      <Html position={[-2.0, 0.5, -0.8]} center distanceFactor={6}>
        <div className="pcb-glass px-2.5 py-1 rounded border border-[#00E676]/40 text-[9px] font-mono text-[#00E676] font-bold tracking-widest uppercase shadow-lg pointer-events-none">
          MULTI-COLORED FEEDERS
        </div>
      </Html>
      <Html position={[0, 1.05, 0]} center distanceFactor={6}>
        <div className="pcb-glass px-2.5 py-1 rounded border border-[#00E676]/40 text-[9px] font-mono text-[#19FF88] font-bold tracking-widest uppercase shadow-lg pointer-events-none">
          HIGH-SPEED VACUUM NOZZLE & VISION TELEMETRY
        </div>
      </Html>
    </group>
  );
}

export const PlacementScene: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 2.8, 4.5], fov: 42 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, 1, 0]} intensity={1.2} color="#00E676" />
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <PickAndPlaceMachine />
        </Float>
        <OrbitControls enableZoom={true} maxDistance={7} minDistance={2} />
      </Canvas>
    </div>
  );
};
