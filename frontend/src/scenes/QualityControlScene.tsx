import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface QualityControlSceneProps {
  activeTab?: 'xray' | 'fct' | 'validation';
}

function QualityControlModel({ activeTab = 'xray' }: QualityControlSceneProps) {
  const modelRef = useRef<THREE.Group>(null!);
  const probeRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
    }
    if (probeRef.current && activeTab === 'fct') {
      probeRef.current.position.y = 0.35 + Math.sin(state.clock.getElapsedTime() * 4) * 0.08;
    }
  });

  return (
    <group ref={modelRef} position={[0, -0.2, 0]}>
      {/* Test Chassis */}
      <mesh position={[0, -0.35, 0]}>
        <boxGeometry args={[4.4, 0.24, 2.9]} />
        <meshStandardMaterial color="#0f1719" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* PCB Under Test */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[3.5, 0.08, 2.1]} />
        <meshStandardMaterial
          color="#072b1a"
          roughness={0.25}
          transparent={activeTab === 'xray'}
          opacity={activeTab === 'xray' ? 0.45 : 1.0}
        />
      </mesh>

      {/* BGA Package with X-Ray Semi-Transparent Shell */}
      <group position={[-0.6, 0, 0]}>
        <mesh position={[0, 0.08, 0]}>
          <boxGeometry args={[1.15, 0.12, 1.15]} />
          <meshStandardMaterial
            color="#141a1c"
            transparent={activeTab === 'xray'}
            opacity={activeTab === 'xray' ? 0.35 : 0.95}
          />
        </mesh>

        {/* Hidden Internal BGA Solder Ball Matrix */}
        {[-0.4, -0.2, 0, 0.2, 0.4].map((x, i) =>
          [-0.4, -0.2, 0, 0.2, 0.4].map((z, j) => (
            <mesh key={`bga-ball-${i}-${j}`} position={[x, 0.02, z]}>
              <sphereGeometry args={[0.038, 16, 16]} />
              <meshStandardMaterial
                color={i === 2 && j === 1 ? '#ff9800' : '#00E676'}
                emissive={i === 2 && j === 1 ? '#ff9800' : '#00E676'}
                emissiveIntensity={activeTab === 'xray' ? 1.6 : 0.5}
              />
            </mesh>
          ))
        )}
      </group>

      {/* Flying Probe Bed-of-Nails Tester */}
      <group ref={probeRef} position={[0.7, 0.4, 0]}>
        <mesh castShadow>
          <boxGeometry args={[1.25, 0.26, 0.95]} />
          <meshStandardMaterial color="#1c2529" metalness={0.8} />
        </mesh>
        {[-0.4, -0.15, 0.15, 0.4].map((px, idx) =>
          [-0.25, 0, 0.25].map((pz, jdx) => (
            <mesh key={`pin-${idx}-${jdx}`} position={[px, -0.2, pz]}>
              <cylinderGeometry args={[0.015, 0.015, 0.2, 10]} />
              <meshStandardMaterial color="#ffd700" metalness={0.95} />
            </mesh>
          ))
        )}
      </group>

      {/* X-Ray Source Emitter Beam */}
      {activeTab === 'xray' && (
        <group position={[-0.6, 1.0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.15, 0.25, 0.3, 20]} />
            <meshStandardMaterial color="#ffffff" metalness={0.95} />
          </mesh>
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.55, 0.65, 0.9, 24]} />
            <meshBasicMaterial color="#00E676" transparent opacity={0.25} />
          </mesh>
        </group>
      )}

      {/* 3D Labels */}
      {activeTab === 'xray' && (
        <Html position={[-0.6, 0.6, 0]} center distanceFactor={5.5}>
          <div className="pcb-glass px-2.5 py-1 rounded border border-[#00E676]/60 text-[9px] font-mono font-bold text-[#00E676] tracking-widest uppercase shadow-2xl bg-black/90 whitespace-nowrap">
            AXI X-RAY TOMOGRAPHY (BGA VOID ANALYSIS)
          </div>
        </Html>
      )}
      {activeTab === 'fct' && (
        <Html position={[0.7, 0.7, 0]} center distanceFactor={5.5}>
          <div className="pcb-glass px-2.5 py-1 rounded border border-[#19FF88]/60 text-[9px] font-mono font-bold text-[#19FF88] tracking-widest uppercase shadow-2xl bg-black/90 whitespace-nowrap">
            FLYING PROBE ELECTRICAL TESTER
          </div>
        </Html>
      )}
    </group>
  );
}

export const QualityControlScene: React.FC<QualityControlSceneProps> = ({ activeTab = 'xray' }) => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 2.5, 4.3], fov: 40 }} gl={{ alpha: true, antialias: true }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 10, 6]} intensity={1.8} color="#ffffff" castShadow />
        <pointLight position={[-0.6, 1, 0]} intensity={1.6} color="#00E676" />
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.15}>
          <QualityControlModel activeTab={activeTab} />
        </Float>
        <OrbitControls enableZoom={true} maxDistance={7} minDistance={2} />
      </Canvas>
    </div>
  );
};
