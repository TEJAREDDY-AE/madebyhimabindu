import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface PCBModelProps {
  theme?: 'dark' | 'light';
  activeHighlight?: string | null;
  onComponentHover?: (name: string | null) => void;
  onPinHover?: (pinInfo: string | null) => void;
}

// Multi-Colored Photorealistic 32-Pin QFP Microcontroller IC
function MicrocontrollerQFP({
  position,
  activeHighlight,
  onHover,
  onPinHover,
}: {
  position: [number, number, number];
  activeHighlight?: string | null;
  onHover?: (name: string | null) => void;
  onPinHover?: (pinInfo: string | null) => void;
}) {
  const pinSignals = [
    'Pin 1: VCC (+3.3V)', 'Pin 2: GPIO_01', 'Pin 3: GPIO_02', 'Pin 4: GND',
    'Pin 5: SPI_CLK', 'Pin 6: SPI_MOSI', 'Pin 7: SPI_MISO', 'Pin 8: SPI_CS',
    'Pin 9: I2C_SDA', 'Pin 10: I2C_SCL', 'Pin 11: UART_TX', 'Pin 12: UART_RX',
    'Pin 13: ADC_IN0', 'Pin 14: ADC_IN1', 'Pin 15: RESET', 'Pin 16: VCC_IO',
  ];

  const pinSpacing = 0.14;
  const sideLength = 7 * pinSpacing;
  const startOffset = -sideLength / 2;

  return (
    <group
      position={position}
      onPointerOver={() => onHover?.('SMT / 32-Pin QFP Microcontroller')}
      onPointerOut={() => {
        onHover?.(null);
        onPinHover?.(null);
      }}
    >
      {/* Molded Dark Ceramic Package Body */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.15, 1.3]} />
        <meshStandardMaterial
          color={activeHighlight === 'SMT' ? '#00E676' : '#1e293b'}
          roughness={0.3}
          metalness={0.6}
          emissive={activeHighlight === 'SMT' ? '#00E676' : '#000000'}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Golden Brand Logo Stamp */}
      <mesh position={[0, 0.076, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.9, 0.4]} />
        <meshStandardMaterial color="#334155" roughness={0.4} />
      </mesh>

      {/* Pin 1 Index Notch Dot (Vibrant Emissive Green) */}
      <mesh position={[-0.48, 0.08, -0.48]}>
        <cylinderGeometry args={[0.045, 0.045, 0.015, 20]} />
        <meshStandardMaterial color="#00E676" emissive="#00E676" emissiveIntensity={1.5} />
      </mesh>

      {/* 32 Silver Gull-Wing Lead Pins with Solder Fillets */}
      {Array.from({ length: 8 }).map((_, i) => {
        const offset = startOffset + i * pinSpacing;
        const topSignal = pinSignals[i % pinSignals.length];
        const bottomSignal = pinSignals[(i + 8) % pinSignals.length];

        return (
          <React.Fragment key={`tb-pin-${i}`}>
            {/* Top Side Pins */}
            <group
              position={[offset, -0.04, -0.73]}
              onPointerOver={(e) => {
                e.stopPropagation();
                onPinHover?.(`QFP Pin ${i + 1} • ${topSignal}`);
              }}
            >
              <mesh position={[0, -0.035, 0]}>
                <boxGeometry args={[0.07, 0.005, 0.18]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
              </mesh>
              <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[0.05, 0.04, 0.16]} />
                <meshStandardMaterial color="#f8fafc" metalness={0.98} roughness={0.05} />
              </mesh>
              <mesh position={[0, -0.02, 0.06]}>
                <cylinderGeometry args={[0.03, 0.04, 0.03, 12]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
              </mesh>
            </group>

            {/* Bottom Side Pins */}
            <group
              position={[offset, -0.04, 0.73]}
              onPointerOver={(e) => {
                e.stopPropagation();
                onPinHover?.(`QFP Pin ${i + 17} • ${bottomSignal}`);
              }}
            >
              <mesh position={[0, -0.035, 0]}>
                <boxGeometry args={[0.07, 0.005, 0.18]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
              </mesh>
              <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[0.05, 0.04, 0.16]} />
                <meshStandardMaterial color="#f8fafc" metalness={0.98} roughness={0.05} />
              </mesh>
              <mesh position={[0, -0.02, -0.06]}>
                <cylinderGeometry args={[0.03, 0.04, 0.03, 12]} />
                <meshStandardMaterial color="#cbd5e1" metalness={0.95} roughness={0.15} />
              </mesh>
            </group>
          </React.Fragment>
        );
      })}

      {/* Left & Right Side Pins */}
      {Array.from({ length: 8 }).map((_, i) => {
        const offset = startOffset + i * pinSpacing;
        const leftSignal = pinSignals[(i + 16) % pinSignals.length];
        const rightSignal = pinSignals[(i + 24) % pinSignals.length];

        return (
          <React.Fragment key={`lr-pin-${i}`}>
            <group
              position={[-0.73, -0.04, offset]}
              onPointerOver={(e) => {
                e.stopPropagation();
                onPinHover?.(`QFP Pin ${i + 25} • ${leftSignal}`);
              }}
            >
              <mesh position={[0, -0.035, 0]}>
                <boxGeometry args={[0.18, 0.005, 0.07]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
              </mesh>
              <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[0.16, 0.04, 0.05]} />
                <meshStandardMaterial color="#f8fafc" metalness={0.98} roughness={0.05} />
              </mesh>
            </group>

            <group
              position={[0.73, -0.04, offset]}
              onPointerOver={(e) => {
                e.stopPropagation();
                onPinHover?.(`QFP Pin ${i + 9} • ${rightSignal}`);
              }}
            >
              <mesh position={[0, -0.035, 0]}>
                <boxGeometry args={[0.18, 0.005, 0.07]} />
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} />
              </mesh>
              <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[0.16, 0.04, 0.05]} />
                <meshStandardMaterial color="#f8fafc" metalness={0.98} roughness={0.05} />
              </mesh>
            </group>
          </React.Fragment>
        );
      })}
    </group>
  );
}

// BGA Package with Silver Solder Balls
function BGAChip({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh castShadow position={[0, 0.08, 0]}>
        <boxGeometry args={[0.95, 0.085, 0.7]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Silver Solder Ball Array */}
      {[-0.36, -0.18, 0, 0.18, 0.36].map((x, i) =>
        [-0.23, -0.08, 0.08, 0.23].map((z, j) => (
          <mesh key={`bga-ball-${i}-${j}`} position={[x, 0.02, z]}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial color="#e2e8f0" metalness={0.98} roughness={0.05} />
          </mesh>
        ))
      )}
    </group>
  );
}

function PCBModel({ theme = 'dark', activeHighlight, onComponentHover, onPinHover }: PCBModelProps) {
  const pcbRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    if (pcbRef.current) {
      pcbRef.current.rotation.y += delta * 0.12;
    }
  });

  const pcbColor = theme === 'dark' ? '#047857' : '#059669'; // Rich Emerald Green FR-4
  const traceColor = '#00FF66';
  const labelBg = theme === 'dark' ? 'bg-slate-950/90 text-[#00E676]' : 'bg-white/90 text-[#047857]';

  return (
    <group ref={pcbRef} position={[0, -0.15, 0]} rotation={[0.4, -0.25, 0]} scale={1.2}>
      {/* Base FR-4 PCB Board Substrate (Vibrant Deep Emerald Green) */}
      <mesh position={[0, 0, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.4, 0.15, 3.0]} />
        <meshStandardMaterial color={pcbColor} roughness={0.2} metalness={0.25} />
      </mesh>

      {/* Gold Edge Connector Bevel (Vibrant Canary Gold) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4.43, 0.1, 3.03]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.15} metalness={0.95} />
      </mesh>

      {/* High-Resolution Circuit Traces with Vias */}
      <group position={[0, 0.08, 0]}>
        {[-1.6, -1.0, -0.4, 0.2, 0.8, 1.4].map((x, i) => (
          <mesh key={`trace-${i}`} position={[x, 0.001, (i % 2 === 0 ? 0.4 : -0.4)]}>
            <boxGeometry args={[0.048, 0.003, 2.0]} />
            <meshStandardMaterial color={traceColor} emissive={traceColor} emissiveIntensity={1.4} />
          </mesh>
        ))}

        {/* Plated Through-Hole Vias with Drilled Holes */}
        {[
          [-1.3, 0.9], [-1.3, -0.9], [0.9, 1.0], [1.3, -0.8], [-0.6, -1.0], [1.6, 0.6]
        ].map(([vx, vz], idx) => (
          <group key={`via-${idx}`} position={[vx, 0.002, vz]}>
            <mesh>
              <cylinderGeometry args={[0.075, 0.075, 0.005, 20]} />
              <meshStandardMaterial color="#f59e0b" metalness={0.95} />
            </mesh>
            <mesh position={[0, -0.002, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.01, 16]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
        ))}
      </group>

      {/* Microcontroller QFP Package */}
      <MicrocontrollerQFP
        position={[-0.6, 0.16, 0]}
        activeHighlight={activeHighlight}
        onHover={onComponentHover}
        onPinHover={onPinHover}
      />

      {/* BGA Flash Memory Package */}
      <BGAChip position={[0.95, 0.1, -0.6]} />

      {/* Multi-Colored SMD Resistors (Royal Blue) & Capacitors (Terracotta Clay / Canary Yellow) */}
      {[
        { pos: [-1.8, 0.7], color: '#2563eb' }, // Royal Blue Resistor
        { pos: [-1.5, 0.7], color: '#d97706' }, // Amber Ceramic Capacitor
        { pos: [-1.2, 0.7], color: '#eab308' }, // Tantalum Yellow Capacitor
        { pos: [-1.8, -0.5], color: '#dc2626' }, // Crimson Resistor
        { pos: [-1.5, -0.5], color: '#2563eb' },
        { pos: [0.4, 0.9], color: '#d97706' },
        { pos: [0.65, 0.9], color: '#2563eb' },
        { pos: [0.9, 0.9], color: '#eab308' },
        { pos: [0.4, -0.9], color: '#d97706' },
        { pos: [0.65, -0.9], color: '#2563eb' }
      ].map((smd, idx) => (
        <group
          key={`smd-${idx}`}
          position={[smd.pos[0], 0.12, smd.pos[1]]}
          onPointerOver={() => onComponentHover?.('SMD Passives (0805)')}
          onPointerOut={() => onComponentHover?.(null)}
        >
          <mesh castShadow>
            <boxGeometry args={[0.18, 0.08, 0.1]} />
            <meshStandardMaterial color={smd.color} roughness={0.3} />
          </mesh>
          <mesh position={[-0.09, 0, 0]}>
            <boxGeometry args={[0.035, 0.085, 0.105]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.98} roughness={0.05} />
          </mesh>
          <mesh position={[0.09, 0, 0]}>
            <boxGeometry args={[0.035, 0.085, 0.105]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.98} roughness={0.05} />
          </mesh>
        </group>
      ))}

      {/* Sapphire Blue THT Electrolytic Capacitor */}
      <group
        position={[1.4, 0.34, 0.65]}
        onPointerOver={() => onComponentHover?.('THT Electrolytic Capacitor')}
        onPointerOut={() => onComponentHover?.(null)}
      >
        {/* Can Body (Sapphire Blue Aluminum) */}
        <mesh castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.52, 24]} />
          <meshStandardMaterial
            color={activeHighlight === 'THT' ? '#00E676' : '#1d4ed8'}
            metalness={0.85}
            roughness={0.2}
            emissive={activeHighlight === 'THT' ? '#00E676' : '#000000'}
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Silver Polarity Stripe */}
        <mesh position={[0.22, 0, 0]}>
          <boxGeometry args={[0.05, 0.51, 0.1]} />
          <meshStandardMaterial color="#e2e8f0" metalness={0.9} />
        </mesh>
        {/* Rubber Top Seal */}
        <mesh position={[0, 0.27, 0]}>
          <cylinderGeometry args={[0.24, 0.24, 0.02, 24]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
      </group>

      {/* Ruby Red THT Power Capacitor */}
      <group
        position={[0.3, 0.34, -0.8]}
        onPointerOver={() => onComponentHover?.('THT Ruby Power Capacitor')}
        onPointerOut={() => onComponentHover?.(null)}
      >
        <mesh castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.44, 24]} />
          <meshStandardMaterial color="#dc2626" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* Gold Pin Header Connector with Emerald Shroud */}
      <group
        position={[-1.85, 0.28, 0]}
        onPointerOver={() => onComponentHover?.('THT Power Connector Header')}
        onPointerOut={() => onComponentHover?.(null)}
      >
        <mesh castShadow>
          <boxGeometry args={[0.3, 0.4, 1.35]} />
          <meshStandardMaterial
            color={activeHighlight === 'THT' ? '#00E676' : '#047857'}
            roughness={0.4}
          />
        </mesh>
        {[-0.45, -0.22, 0, 0.22, 0.45].map((pz, idx) => (
          <mesh key={`hdr-pin-${idx}`} position={[0, 0.24, pz]}>
            <cylinderGeometry args={[0.025, 0.025, 0.18, 12]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.95} />
          </mesh>
        ))}
      </group>

      {/* High-Visibility 3D Labels */}
      <Html position={[-0.6, 0.45, 0]} center distanceFactor={5.5}>
        <div className={`pcb-glass px-3 py-1 rounded-lg border border-[#00E676]/60 text-[10px] font-mono font-bold tracking-widest uppercase shadow-2xl pointer-events-none whitespace-nowrap ${labelBg}`}>
          32-PIN QFP MICROCONTROLLER
        </div>
      </Html>

      <Html position={[1.4, 0.72, 0.65]} center distanceFactor={5.5}>
        <div className={`pcb-glass px-3 py-1 rounded-lg border border-[#00E676]/60 text-[10px] font-mono font-bold tracking-widest uppercase shadow-2xl pointer-events-none whitespace-nowrap ${labelBg}`}>
          SAPPHIRE BLUE CAPACITOR
        </div>
      </Html>

      <Html position={[-1.5, 0.3, 0.7]} center distanceFactor={5.5}>
        <div className={`pcb-glass px-3 py-1 rounded-lg border border-[#00E676]/60 text-[10px] font-mono font-bold tracking-widest uppercase shadow-2xl pointer-events-none whitespace-nowrap ${labelBg}`}>
          MULTI-COLORED SMD PASSIVES
        </div>
      </Html>

      <Html position={[0.95, 0.32, -0.6]} center distanceFactor={5.5}>
        <div className={`pcb-glass px-3 py-1 rounded-lg border border-[#00E676]/60 text-[10px] font-mono font-bold tracking-widest uppercase shadow-2xl pointer-events-none whitespace-nowrap ${labelBg}`}>
          BGA FLASH MEMORY
        </div>
      </Html>
    </group>
  );
}

interface HeroPCBSceneProps {
  theme?: 'dark' | 'light';
  activeHighlight?: string | null;
  onComponentHover?: (name: string | null) => void;
}

export const HeroPCBScene: React.FC<HeroPCBSceneProps> = ({ theme = 'dark', activeHighlight, onComponentHover }) => {
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 2.2, 4.6], fov: 40 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={theme === 'dark' ? 0.8 : 1.0} />
        <directionalLight position={[8, 12, 8]} intensity={2.0} color="#ffffff" castShadow />
        <directionalLight position={[-6, -5, -4]} intensity={0.8} color="#ffffff" />
        <pointLight position={[0, 4, 3]} intensity={1.5} color="#00E676" />
        <spotLight position={[0, 8, 0]} intensity={1.2} angle={0.6} penumbra={0.5} />

        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
          <PCBModel
            theme={theme}
            activeHighlight={activeHighlight}
            onComponentHover={onComponentHover}
            onPinHover={setHoveredPin}
          />
        </Float>

        <OrbitControls
          enableZoom={true}
          maxDistance={8}
          minDistance={2.0}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 4}
          autoRotate={false}
        />
      </Canvas>

      {/* Floating Micro Pin Inspection Tooltip */}
      {hoveredPin && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 pcb-glass px-4 py-2 rounded-xl border border-[#00E676] text-xs font-mono font-bold text-[#19FF88] box-glow-green pointer-events-none z-30 shadow-2xl bg-black/90">
          MICRO-PIN INSPECTION: {hoveredPin}
        </div>
      )}
    </div>
  );
};
