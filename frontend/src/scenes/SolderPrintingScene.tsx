import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

function PrinterMechanism() {
  const squeegeeRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = (Math.sin(state.clock.getElapsedTime() * 1.5) + 1) / 2;
    if (squeegeeRef.current) {
      squeegeeRef.current.position.x = -1.2 + t * 2.4;
    }
  });

  return (
    <group position={[0, -0.15, 0]} scale={1.15}>
      {/* High-Contrast Titanium Industrial Frame Base */}
      <mesh position={[0, -0.4, 0]}>
        <boxGeometry args={[4.6, 0.42, 3.3]} />
        <meshStandardMaterial color="#334155" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* FR-4 PCB Base (Vibrant Emerald Green) */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[3.7, 0.09, 2.3]} />
        <meshStandardMaterial color="#059669" roughness={0.2} metalness={0.25} />
      </mesh>

      {/* Gold Copper Pads with Printed Solder Paste Volumes */}
      {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) =>
        [-0.7, 0, 0.7].map((z, j) => (
          <group key={`pad-${i}-${j}`} position={[x, 0.05, z]}>
            {/* Bright Gold Pad */}
            <mesh>
              <boxGeometry args={[0.26, 0.005, 0.26]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.95} roughness={0.05} />
            </mesh>

            {/* Bright Silver Solder Paste Deposit */}
            <mesh position={[0, 0.014, 0]}>
              <boxGeometry args={[0.23, 0.02, 0.23]} />
              <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.85} />
            </mesh>
          </group>
        ))
      )}

      {/* Laser-Cut Stainless Steel Stencil (Gleaming Metallic Chrome) */}
      <group position={[0, 0.13, 0]}>
        <mesh>
          <boxGeometry args={[3.9, 0.01, 2.5]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.99}
            roughness={0.02}
            transparent
            opacity={0.82}
          />
        </mesh>
        {/* Stencil Aperture Cutouts */}
        {[-1.2, -0.6, 0, 0.6, 1.2].map((x, i) =>
          [-0.7, 0, 0.7].map((z, j) => (
            <mesh key={`aperture-${i}-${j}`} position={[x, 0.006, z]}>
              <boxGeometry args={[0.24, 0.012, 0.24]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          ))
        )}
      </group>

      {/* Motorized Squeegee Blade Assembly (High-Visibility Silver & Neon Green) */}
      <group ref={squeegeeRef} position={[-1.2, 0.38, 0]}>
        {/* Holder Block */}
        <mesh castShadow>
          <boxGeometry args={[0.18, 0.38, 2.4]} />
          <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.15} />
        </mesh>
        {/* Neon Green Polyurethane Blade Tip */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.045, 0.06, 2.3]} />
          <meshStandardMaterial color="#00FF66" emissive="#00FF66" emissiveIntensity={0.8} />
        </mesh>
        {/* Shiny Lead-Free Solder Paste Bead Roll */}
        <mesh position={[0.14, -0.16, 0]}>
          <cylinderGeometry args={[0.09, 0.09, 2.2, 20]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} metalness={0.8} />
        </mesh>
      </group>

      {/* High-Visibility 3D HUD Labels */}
      <Html position={[-1.2, 0.75, 0]} center distanceFactor={5.5}>
        <div className="pcb-glass px-3 py-1 rounded-lg border border-[#00E676] text-[10px] font-mono font-bold text-[#00E676] tracking-widest uppercase bg-black/90 shadow-2xl whitespace-nowrap">
          MOTORIZED SQUEEGEE
        </div>
      </Html>
      <Html position={[0, 0.28, -1.25]} center distanceFactor={5.5}>
        <div className="pcb-glass px-3 py-1 rounded-lg border border-[#00E676] text-[10px] font-mono font-bold text-[#19FF88] tracking-widest uppercase bg-black/90 shadow-2xl whitespace-nowrap">
          STAINLESS STEEL STENCIL
        </div>
      </Html>
    </group>
  );
}

export const SolderPrintingScene: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 2.0, 3.8], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        {/* Bright Multi-Light Studio Setup for Maximum Visibility */}
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 12, 8]} intensity={2.2} color="#ffffff" castShadow />
        <directionalLight position={[-6, -4, -4]} intensity={1.2} color="#ffffff" />
        <pointLight position={[0, 3, 2]} intensity={1.8} color="#ffffff" />
        <spotLight position={[0, 6, 2]} intensity={2.0} angle={0.6} penumbra={0.4} />

        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <PrinterMechanism />
        </Float>
        <OrbitControls enableZoom={true} maxDistance={7} minDistance={1.8} />
      </Canvas>
    </div>
  );
};
