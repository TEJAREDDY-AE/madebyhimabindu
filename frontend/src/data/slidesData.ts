export interface SlideData {
  id: number;
  slideNumber: string;
  title: string;
  subtitle?: string;
  stageTag?: string;
  description: string;
  keyPoints?: string[];
  specs?: { label: string; value: string }[];
}

export const SLIDES: SlideData[] = [
  {
    id: 1,
    slideNumber: "01",
    title: "PCB ASSEMBLY",
    subtitle: "PROCESSES & STAGES",
    stageTag: "AUTOMATED PRECISION MANUFACTURING GUIDE",
    description: "An interactive 3D technical journey through modern automated printed circuit board manufacturing, SMT assembly, reflow thermodynamics, through-hole wave soldering, and advanced optical/X-ray quality inspection.",
    specs: [
      { label: "Author", value: "M. Hima Bindu" },
      { label: "ID", value: "24F65A0410" },
      { label: "Class", value: "Final Year | ECE-1" }
    ]
  },
  {
    id: 2,
    slideNumber: "02",
    title: "INTRODUCTION TO PCBA",
    subtitle: "What is PCB Assembly?",
    stageTag: "FOUNDATIONAL OVERVIEW",
    description: "Printed Circuit Board Assembly (PCBA) is the process of soldering electronic components onto a fabricated PCB, transforming a bare circuit board into a fully functional electronic system.",
    keyPoints: [
      "Bare PCB provides conductive traces and structural base.",
      "SMT & THT soldering permanently bonds ICs, passives & connectors.",
      "Integrated system handles signal processing, power delivery & computation."
    ],
    specs: [
      { label: "SMT Tech", value: "Surface Mount Technology" },
      { label: "THT Tech", value: "Through-Hole Technology" },
      { label: "Mixed Tech", value: "Hybrid High-Density Assembly" }
    ]
  },
  {
    id: 3,
    slideNumber: "03",
    title: "THE ASSEMBLY WORKFLOW",
    subtitle: "End-to-End Automated Pipeline",
    stageTag: "MANUFACTURING MAP",
    description: "Modern automated PCBA operates in a continuous, high-speed inline manufacturing pipeline. Each stage is tightly controlled by precision robotics and vision telemetry.",
    keyPoints: [
      "Stage 01: Solder Printing (Stencil application of solder paste)",
      "Stage 02: Component Placement (High-speed robotic pick-and-place)",
      "Stage 03: Soldering (Multi-zone reflow oven thermal bonding)",
      "Stage 04: Inspection (AOI, AXI X-ray & functional test validation)"
    ],
    specs: [
      { label: "Total Stages", value: "4 Primary Pipeline Phases" },
      { label: "Control Systems", value: "Closed-Loop Closed Telemetry" },
      { label: "Line Speed", value: "Up to 50,000 CPH (Components/Hr)" }
    ]
  },
  {
    id: 4,
    slideNumber: "04",
    title: "STAGE 1: SOLDER PRINTING",
    subtitle: "Precision Paste Stencil Printing",
    stageTag: "STAGE 01 / 04",
    description: "The first physical assembly step applies solder paste (SAC305 alloy + flux) onto bare PCB copper pads through a custom stainless steel stencil.",
    keyPoints: [
      "Laser-cut stainless steel stencil aligns precisely over PCB copper pads.",
      "Motorized squeegee blade deposits controlled volume of paste (100-150µm height).",
      "3D SPI (Solder Paste Inspection) measures volume, area, and offset before placement."
    ],
    specs: [
      { label: "Alloy Type", value: "SAC305 (Sn96.5 / Ag3.0 / Cu0.5)" },
      { label: "Paste Deposit Height", value: "125 µm ± 15 µm" },
      { label: "SPI Laser Scan", value: "3D Volumetric Inspection" }
    ]
  },
  {
    id: 5,
    slideNumber: "05",
    title: "STAGE 2: COMPONENT PLACEMENT",
    subtitle: "High-Speed Robotic Pick-and-Place",
    stageTag: "STAGE 02 / 04",
    description: "Robotic placement heads extract Surface Mount Devices (SMDs) from tape/reel feeders and mount them with sub-micron accuracy onto solder-printed PCB pads.",
    keyPoints: [
      "Multi-nozzle vacuum head picks components from high-speed motorized feeders.",
      "High-resolution vision system scans components mid-air to detect tilt, orientation, and bent leads.",
      "Real-time motorized X-Y-Z-Theta correction aligns components down to ±0.025 mm accuracy."
    ],
    specs: [
      { label: "Placement Speed", value: "40,000 - 80,000 CPH" },
      { label: "Placement Accuracy", value: "±25 µm @ 3 Sigma" },
      { label: "Min Package Size", value: "01005 (0.4mm x 0.2mm)" }
    ]
  },
  {
    id: 6,
    slideNumber: "06",
    title: "STAGE 3: REFLOW OVEN",
    subtitle: "Multi-Zone Thermal Bonding",
    stageTag: "STAGE 03 / 04",
    description: "The component-laden PCB enters a multi-zone reflow convection oven where controlled thermal profiles melt solder paste to form permanent metallurgical solder joints.",
    keyPoints: [
      "Preheat Zone: Gradual heating (1-3°C/s) removes solvents and avoids thermal shock.",
      "Soak Zone (150-200°C): Activates chemical flux to clean pad oxidation.",
      "Reflow Zone (TAL / Peak 245°C): Solder paste melts, wetting copper pads and component terminals.",
      "Cooling Zone: Rapid cooling solidifies solder into a fine intermetallic grain structure."
    ],
    specs: [
      { label: "Peak Reflow Temp", value: "245°C (SAC305 Lead-Free)" },
      { label: "Time Above Liquidus", value: "45 - 75 Seconds" },
      { label: "Thermal Zones", value: "10 Forced Convection Zones" }
    ]
  },
  {
    id: 7,
    slideNumber: "07",
    title: "STAGE 4: THT & WAVE SOLDERING",
    subtitle: "Through-Hole & Heavy-Power Assembly",
    stageTag: "STAGE 04 / 04",
    description: "Through-Hole Technology (THT) components (transformers, connectors, power MOSFETs) have pins inserted through drilled holes and soldered using a molten wave soldering bath.",
    keyPoints: [
      "Automatic pin insertion or manual component insertion into plated through-holes.",
      "Spray fluxer applies liquid flux to the underside of the PCB to break oxide layers.",
      "Preheater raises board temperature to activate flux and prevent thermal stress.",
      "Solder wave pump creates a crest of molten solder (260°C) that wicks up component pin barrels."
    ],
    specs: [
      { label: "Solder Wave Temp", value: "260°C ± 5°C" },
      { label: "Conveyor Angle", value: "5° - 7° Incline" },
      { label: "Barrel Fill Target", value: "> 75% IPC-A-610 Class 3" }
    ]
  },
  {
    id: 8,
    slideNumber: "08",
    title: "STAGE 5: QUALITY INSPECTION",
    subtitle: "Automated Optical Inspection (AOI)",
    stageTag: "QUALITY ASSURANCE",
    description: "Automated Optical Inspection (AOI) uses high-speed cameras, multi-angled LED lighting, and computer vision algorithms to verify 100% of solder joints and components.",
    keyPoints: [
      "Multi-angle RGB LED rings highlight solder fillet geometry and joint reflections.",
      "High-resolution 2D/3D optical camera checks component presence, polarity, and value markings.",
      "Defect Detection: Detects solder bridges, tombstoning, missing components, shifted parts, and insufficient solder."
    ],
    specs: [
      { label: "Inspection Speed", value: "< 5 Seconds / Board" },
      { label: "Camera Resolution", value: "10 - 15 µm / pixel" },
      { label: "Defect Yield Goal", value: "< 10 DPMO (Defects Per Million)" }
    ]
  },
  {
    id: 9,
    slideNumber: "09",
    title: "ADVANCED QUALITY CONTROL",
    subtitle: "AXI X-Ray, Functional Test & Validation",
    stageTag: "ADVANCED QA",
    description: "For complex high-density boards with hidden solder joints (BGAs, QFNs), advanced non-destructive inspection and functional testing ensure 100% operational integrity.",
    keyPoints: [
      "AXI X-Ray Inspection: Penetrates silicon packages to inspect hidden BGA solder balls and detect internal voiding.",
      "Functional Testing (FCT): Bed-of-Nails or flying probes simulate real operational signals and power states.",
      "Final Quality Gate: Automated optical and electrical pass/fail certification."
    ],
    specs: [
      { label: "AXI Penetration", value: "Transmissive X-Ray Tomography" },
      { label: "Max BGA Voiding", value: "< 15% Area Threshold" },
      { label: "FCT Coverage", value: "100% Functional Test Verification" }
    ]
  },
  {
    id: 10,
    slideNumber: "10",
    title: "REAL-WORLD APPLICATIONS",
    subtitle: "Mission-Critical Electronics Industries",
    stageTag: "INDUSTRY DEPLOYMENT",
    description: "Precision PCBA is the fundamental backbone of modern technological civilization, enabling high-performance hardware across critical domain sectors.",
    keyPoints: [
      "Consumer Tech: Smartphones, laptops, wearables, smart home IoT (ultra-miniaturized SMT).",
      "Medical Electronics: Diagnostic monitors, MRI controllers, pacemakers (IPC Class 3 extreme reliability).",
      "Automotive & EV: Powertrain controllers, LiDAR sensors, ADAS safety units (harsh thermal endurance)."
    ],
    specs: [
      { label: "Consumer Tech", value: "High Density & Micro-BGA" },
      { label: "Medical Grade", value: "ISO 13485 & IPC Class 3" },
      { label: "Automotive EV", value: "AEC-Q100 & ISO 26262 ASIL-D" }
    ]
  },
  {
    id: 11,
    slideNumber: "11",
    title: "DEFECT PREVENTION & YIELD",
    subtitle: "Common SMT Defects & Root Causes",
    stageTag: "ENGINEERING DIAGNOSTICS",
    description: "Optimizing PCBA first-pass yield requires rigorous root-cause analysis of physical thermal and mechanical assembly defects.",
    keyPoints: [
      "Solder Bridging: Unintended solder bridge between adjacent pads. Solution: Optimize stencil aperture & paste volume.",
      "Tombstoning: Component lifts vertically during reflow due to surface tension imbalance across pads.",
      "Insufficient Solder: Open circuit caused by inadequate paste volume or pad contamination.",
      "Solder Balling: Small solder spheres spattering during rapid preheat moisture expansion."
    ],
    specs: [
      { label: "DFM Compliance", value: "Design for Manufacturability Guidelines" },
      { label: "Yield Target", value: "> 99.5% First-Pass Yield (FPY)" },
      { label: "Closed-Loop SPI", value: "Feedback to Stencil Printer" }
    ]
  },
  {
    id: 12,
    slideNumber: "12",
    title: "INDUSTRY STANDARDS & SUSTAINABILITY",
    subtitle: "IPC Acceptability & Lead-Free Compliance",
    stageTag: "GOVERNANCE & STANDARDS",
    description: "International electronics manufacturing standards govern quality benchmarks, lead-free environmental regulations, and static safety protocols.",
    keyPoints: [
      "IPC-A-610 Classes: Class 1 (General Consumer), Class 2 (Dedicated Service), Class 3 (High-Performance Mission Critical).",
      "RoHS Compliance: Mandatory restriction of lead (Pb), mercury, and cadmium. Transition to SAC305 lead-free alloys.",
      "ESD Control: ANSI/ESD S20.20 static grounding protocols protecting sensitive CMOS components."
    ],
    specs: [
      { label: "IPC-A-610 Standard", value: "Acceptability of Electronic Assemblies" },
      { label: "Environmental", value: "EU RoHS 3 & REACH Compliant" },
      { label: "ESD Protection", value: "< 100V Human Body Model (HBM)" }
    ]
  },
  {
    id: 13,
    slideNumber: "13",
    title: "FUTURE TRENDS IN PCB ASSEMBLY",
    subtitle: "Industry 4.0 & Smart Manufacturing",
    stageTag: "FUTURE HORIZONS",
    description: "The future of PCBA is driven by AI-powered automated line tuning, extreme component miniaturization, and flexible hybrid substrate integration.",
    keyPoints: [
      "Smart Factory & Industry 4.0: Machine-to-Machine (M2M) IPC-CFX communication & predictive AI maintenance.",
      "Micro Miniaturization: 008004 chip passives and 0.15mm pitch micro-BGA packages.",
      "Flexible & Rigid-Flex PCBA: 3D conformal electronics for wearable medical and aerospace integration."
    ],
    specs: [
      { label: "Line Standard", value: "IPC-CFX Open Connected Factory" },
      { label: "AI Integration", value: "Autonomous Closed-Loop Tuning" },
      { label: "Substrate Tech", value: "Embedded Active Components" }
    ]
  }
];
