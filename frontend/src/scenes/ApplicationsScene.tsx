import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface ApplicationsSceneProps {
  activeSector: 'consumer' | 'medical' | 'automotive';
}

function ApplicationModel({ activeSector }: ApplicationsSceneProps) {
  const modelRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.1, 0]} scale={1.25}>
      {/* SECTOR 1: Photorealistic Mobile Phone 3D Model */}
      {activeSector === 'consumer' && (
        <group>
          {/* Grade 5 Titanium Chassis Frame */}
          <mesh castShadow position={[0, 0, 0]}>
            <boxGeometry args={[1.54, 3.12, 0.135]} />
            <meshStandardMaterial color="#b8a890" roughness={0.15} metalness={0.98} />
          </mesh>

          {/* Rear Matte Textured Glass Back Panel */}
          <mesh position={[0, 0, -0.068]}>
            <planeGeometry args={[1.48, 3.06]} />
            <meshStandardMaterial color="#c5b39b" roughness={0.25} metalness={0.2} />
          </mesh>

          {/* Super Retina OLED Front Display */}
          <mesh position={[0, 0, 0.069]}>
            <planeGeometry args={[1.48, 3.06]} />
            <meshStandardMaterial color="#020617" roughness={0.02} />
          </mesh>

          {/* Dynamic Island Pill Cutout */}
          <mesh position={[0, 1.25, 0.071]}>
            <boxGeometry args={[0.42, 0.1, 0.005]} />
            <meshStandardMaterial color="#000000" roughness={0.05} />
          </mesh>

          {/* Glowing Green HDI PCB Circuit Display Graphic */}
          <mesh position={[0, -0.08, 0.07]}>
            <planeGeometry args={[1.4, 2.5]} />
            <meshStandardMaterial color="#00E676" emissive="#00E676" emissiveIntensity={0.35} />
          </mesh>

          {/* Pro Camera Island Plateau */}
          <group position={[0.38, 0.95, -0.076]}>
            <mesh>
              <boxGeometry args={[0.64, 0.68, 0.05]} />
              <meshStandardMaterial color="#c5b39b" metalness={0.4} roughness={0.2} />
            </mesh>

            {/* 3 Sapphire Lenses */}
            {[
              [-0.16, 0.16],
              [0.16, 0.16],
              [-0.16, -0.16]
            ].map(([lx, ly], idx) => (
              <group key={`lens-${idx}`} position={[lx, ly, -0.035]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.135, 0.135, 0.04, 24]} />
                  <meshStandardMaterial color="#b8a890" metalness={0.98} roughness={0.1} />
                </mesh>
                <mesh position={[0, 0, -0.02]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.105, 0.105, 0.02, 24]} />
                  <meshStandardMaterial color="#000000" metalness={0.99} roughness={0.01} />
                </mesh>
              </group>
            ))}

            <mesh position={[0.16, -0.16, -0.03]}>
              <cylinderGeometry args={[0.065, 0.065, 0.02, 16]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
            <mesh position={[0.16, 0.02, -0.03]}>
              <cylinderGeometry args={[0.045, 0.045, 0.02, 16]} rotation={[Math.PI / 2, 0, 0]} />
              <meshStandardMaterial color="#fef08a" emissive="#fef08a" emissiveIntensity={0.6} />
            </mesh>
          </group>

          {/* Action Button */}
          <mesh position={[-0.78, 0.8, 0]}>
            <boxGeometry args={[0.04, 0.15, 0.04]} />
            <meshStandardMaterial color="#b8a890" metalness={0.95} />
          </mesh>

          {/* Volume Buttons */}
          <mesh position={[-0.78, 0.5, 0]}>
            <boxGeometry args={[0.04, 0.22, 0.04]} />
            <meshStandardMaterial color="#b8a890" metalness={0.95} />
          </mesh>
          <mesh position={[-0.78, 0.22, 0]}>
            <boxGeometry args={[0.04, 0.22, 0.04]} />
            <meshStandardMaterial color="#b8a890" metalness={0.95} />
          </mesh>

          {/* Side Power Button */}
          <mesh position={[0.78, 0.6, 0]}>
            <boxGeometry args={[0.04, 0.32, 0.04]} />
            <meshStandardMaterial color="#b8a890" metalness={0.95} />
          </mesh>

          {/* USB-C Port */}
          <mesh position={[0, -1.57, 0]}>
            <boxGeometry args={[0.26, 0.04, 0.05]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>

          <Html position={[0, 1.85, 0]} center distanceFactor={5.5}>
            <div className="pcb-glass px-3 py-1 rounded-lg border border-[#00E676] text-[10px] font-mono font-bold text-[#00E676] tracking-widest uppercase bg-black/90 shadow-2xl whitespace-nowrap">
              📱 MOBILE PHONE (12-LAYER HDI HIGH-DENSITY PCBA)
            </div>
          </Html>
        </group>
      )}

      {/* SECTOR 2: Medical Electronics - ICU Patient Vital Monitor */}
      {activeSector === 'medical' && (
        <group>
          <mesh castShadow position={[0, 0, 0]}>
            <boxGeometry args={[2.8, 2.0, 0.9]} />
            <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.4} />
          </mesh>

          <mesh position={[0, 0.1, 0.46]}>
            <planeGeometry args={[2.5, 1.5]} />
            <meshStandardMaterial color="#0f172a" roughness={0.1} />
          </mesh>

          <mesh position={[0, 0.1, 0.47]}>
            <planeGeometry args={[2.3, 1.3]} />
            <meshStandardMaterial color="#050b0d" />
          </mesh>

          <mesh position={[0, 0.1, 0.48]}>
            <planeGeometry args={[2.1, 0.05]} />
            <meshBasicMaterial color="#00E676" />
          </mesh>

          <group position={[1.1, -0.6, 0.47]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.12, 0.12, 0.1, 20]} />
              <meshStandardMaterial color="#3b82f6" metalness={0.8} />
            </mesh>
          </group>

          <Html position={[0, 1.3, 0]} center distanceFactor={5.5}>
            <div className="pcb-glass px-3 py-1 rounded-lg border border-[#00E676] text-[10px] font-mono font-bold text-[#00E676] tracking-widest uppercase bg-black/90 shadow-2xl whitespace-nowrap">
              🏥 ICU PATIENT VITAL MONITOR (CLASS 3 HIGH-RELIABILITY PCBA)
            </div>
          </Html>
        </group>
      )}

      {/* SECTOR 3: Automotive & Aerospace - EV Power Inverter & LiDAR Module */}
      {activeSector === 'automotive' && (
        <group>
          <mesh castShadow position={[0, -0.2, 0]}>
            <boxGeometry args={[2.5, 1.3, 2.5]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.15} />
          </mesh>

          {[-1.0, -0.6, -0.2, 0.2, 0.6, 1.0].map((x, i) => (
            <mesh key={`fin-${i}`} position={[x, -0.2, 0]}>
              <boxGeometry args={[0.06, 1.32, 2.52]} />
              <meshStandardMaterial color="#475569" metalness={0.95} />
            </mesh>
          ))}

          <group position={[0, 0.75, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.75, 0.75, 0.5, 32]} />
              <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={0.6} />
            </mesh>
            <mesh position={[0, 0.26, 0]}>
              <cylinderGeometry args={[0.72, 0.72, 0.04, 32]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>

          <group position={[1.1, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.1, 0.1, 0.4, 16]} />
              <meshStandardMaterial color="#f97316" roughness={0.3} />
            </mesh>
          </group>

          <Html position={[0, 1.4, 0]} center distanceFactor={5.5}>
            <div className="pcb-glass px-3 py-1 rounded-lg border border-[#00E676] text-[10px] font-mono font-bold text-[#00E676] tracking-widest uppercase bg-black/90 shadow-2xl whitespace-nowrap">
              ⚡ EV POWER INVERTER & AUTONOMOUS LIDAR MODULE
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}

export const ApplicationsScene: React.FC<ApplicationsSceneProps> = ({ activeSector }) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 1.8, 4.0], fov: 38 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 12, 8]} intensity={2.2} color="#ffffff" castShadow />
        <directionalLight position={[-6, -4, -4]} intensity={1.0} color="#ffffff" />
        <pointLight position={[0, 1, 2]} intensity={1.6} color="#00E676" />
        <spotLight position={[0, 6, 2]} intensity={1.8} angle={0.6} penumbra={0.4} />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
          <ApplicationModel activeSector={activeSector} />
        </Float>
        <OrbitControls enableZoom={true} maxDistance={7} minDistance={1.8} />
      </Canvas>
    </div>
  );
};
