const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const pptx = new PptxGenJS();

pptx.layout = 'LAYOUT_16x9';
pptx.title = 'PCB Assembly Processes and Stages';
pptx.author = 'M. Hima Bindu';

const DARK_BG = '050B0D';
const CARD_BG = '0B171A';
const ACCENT_GREEN = '00E676';
const LIGHT_GREEN = '19FF88';
const TEXT_WHITE = 'FFFFFF';
const TEXT_MUTED = 'B7C2C5';
const BORDER_COLOR = '00E676';

const baseDir = path.join(__dirname, '..', 'public', 'images');

const slidesData = [
  {
    slideNumber: "01",
    title: "PCB ASSEMBLY",
    subtitle: "PROCESSES & STAGES",
    stageTag: "AUTOMATED PRECISION MANUFACTURING GUIDE",
    description: "A comprehensive digital presentation exploring modern surface-mount technology (SMT), thermodynamics, through-hole wave soldering, and automated optical/X-ray quality control.",
    credits: "Presenter: M. Hima Bindu | Roll No: 24F65A0410 | Class: Final Year ECE-1",
    image: path.join(baseDir, "slide01_hero.png"),
    isTitleSlide: true
  },
  {
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
    ],
    image: path.join(baseDir, "slide02_smt_tht.png")
  },
  {
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
      { label: "Control Systems", value: "Closed-Loop Telemetry" },
      { label: "Line Speed", value: "Up to 50,000 CPH" }
    ],
    image: path.join(baseDir, "slide01_hero.png")
  },
  {
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
      { label: "Alloy Type", value: "SAC305 (Sn96.5/Ag3.0/Cu0.5)" },
      { label: "Deposit Height", value: "125 µm ± 15 µm" },
      { label: "SPI Laser Scan", value: "3D Volumetric Inspection" }
    ],
    image: path.join(baseDir, "slide04_solder_printing.png")
  },
  {
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
      { label: "Accuracy", value: "±25 µm @ 3 Sigma" },
      { label: "Min Package", value: "01005 (0.4mm x 0.2mm)" }
    ],
    image: path.join(baseDir, "slide05_pick_and_place.png")
  },
  {
    slideNumber: "06",
    title: "STAGE 3: REFLOW OVEN",
    subtitle: "Multi-Zone Thermal Bonding",
    stageTag: "STAGE 03 / 04",
    description: "The component-laden PCB enters a multi-zone reflow convection oven where controlled thermal profiles melt solder paste to form permanent metallurgical solder joints.",
    keyPoints: [
      "Preheat Zone: Gradual heating (1-3°C/s) removes solvents and avoids thermal shock.",
      "Soak Zone (150-200°C): Activates chemical flux to clean pad oxidation.",
      "Reflow Zone (TAL / Peak 245°C): Solder paste melts, wetting copper pads and terminals.",
      "Cooling Zone: Rapid cooling solidifies solder into a fine intermetallic grain structure."
    ],
    specs: [
      { label: "Peak Temp", value: "245°C (Lead-Free)" },
      { label: "Time Above Liquidus", value: "45 - 75 Seconds" },
      { label: "Thermal Zones", value: "10 Forced Convection Zones" }
    ],
    image: path.join(baseDir, "slide06_reflow_oven.png")
  },
  {
    slideNumber: "07",
    title: "STAGE 4: THT & WAVE SOLDERING",
    subtitle: "Through-Hole & Heavy-Power Assembly",
    stageTag: "STAGE 04 / 04",
    description: "Through-Hole Technology (THT) components (transformers, connectors, power MOSFETs) have pins inserted through drilled holes and soldered using a molten wave soldering bath.",
    keyPoints: [
      "Automatic pin insertion or manual component insertion into plated through-holes.",
      "Spray fluxer applies liquid flux to the underside of the PCB to break oxide layers.",
      "Preheater raises board temperature to activate flux and prevent thermal stress.",
      "Solder wave pump creates a crest of molten solder (260°C) that wicks up component barrels."
    ],
    specs: [
      { label: "Wave Temp", value: "260°C ± 5°C" },
      { label: "Incline", value: "5° - 7° Incline" },
      { label: "Barrel Fill", value: "> 75% IPC Class 3" }
    ],
    image: path.join(baseDir, "slide07_wave_soldering.png")
  },
  {
    slideNumber: "08",
    title: "STAGE 5: QUALITY INSPECTION",
    subtitle: "Automated Optical Inspection (AOI)",
    stageTag: "QUALITY ASSURANCE",
    description: "Automated Optical Inspection (AOI) uses high-speed cameras, multi-angled LED lighting, and computer vision algorithms to verify 100% of solder joints and components.",
    keyPoints: [
      "Multi-angle RGB LED rings highlight solder fillet geometry and joint reflections.",
      "High-resolution 2D/3D optical camera checks component presence, polarity, and markings.",
      "Defect Detection: Detects solder bridges, tombstoning, missing parts, and insufficient solder."
    ],
    specs: [
      { label: "Inspection Speed", value: "< 5 Sec / Board" },
      { label: "Resolution", value: "10 - 15 µm / pixel" },
      { label: "Yield Target", value: "< 10 DPMO Defect Goal" }
    ],
    image: path.join(baseDir, "slide08_aoi_inspection.png")
  },
  {
    slideNumber: "09",
    title: "ADVANCED QUALITY CONTROL",
    subtitle: "AXI X-Ray, Functional Test & Validation",
    stageTag: "ADVANCED QA",
    description: "For complex high-density boards with hidden solder joints (BGAs, QFNs), advanced non-destructive inspection and functional testing ensure 100% operational integrity.",
    keyPoints: [
      "AXI X-Ray Inspection: Penetrates silicon packages to inspect hidden BGA solder balls.",
      "Functional Testing (FCT): Bed-of-Nails or flying probes simulate real operational signals.",
      "Final Quality Gate: Automated optical and electrical pass/fail certification."
    ],
    specs: [
      { label: "AXI Tech", value: "Transmissive X-Ray" },
      { label: "Max BGA Void", value: "< 15% Area Limit" },
      { label: "FCT Coverage", value: "100% Verification" }
    ],
    image: path.join(baseDir, "slide09_axi_xray.png")
  },
  {
    slideNumber: "10",
    title: "REAL-WORLD APPLICATIONS",
    subtitle: "Mission-Critical Electronics Industries",
    stageTag: "INDUSTRY DEPLOYMENT",
    description: "Precision PCBA is the fundamental backbone of modern technological civilization, enabling high-performance hardware across critical domain sectors.",
    keyPoints: [
      "Consumer Tech: Smartphones, laptops, wearables, smart home IoT (ultra-miniaturized SMT).",
      "Medical Electronics: Diagnostic monitors, MRI controllers, pacemakers (IPC Class 3 reliability).",
      "Automotive & EV: Powertrain controllers, LiDAR sensors, ADAS safety units (harsh thermal endurance)."
    ],
    specs: [
      { label: "Consumer Tech", value: "High Density Micro-BGA" },
      { label: "Medical Grade", value: "ISO 13485 & IPC Class 3" },
      { label: "Automotive EV", value: "AEC-Q100 ASIL-D" }
    ],
    image: path.join(baseDir, "slide10_applications.png")
  },
  {
    slideNumber: "11",
    title: "DEFECT PREVENTION & YIELD",
    subtitle: "Common SMT Defects & Root Causes",
    stageTag: "ENGINEERING DIAGNOSTICS",
    description: "Optimizing PCBA first-pass yield requires rigorous root-cause analysis of physical thermal and mechanical assembly defects.",
    keyPoints: [
      "Solder Bridging: Unintended solder bridge between adjacent pads. Remedy: Stencil aperture tuning.",
      "Tombstoning: Component lifts vertically during reflow due to surface tension imbalance across pads.",
      "Insufficient Solder: Open circuit caused by inadequate paste volume or pad contamination.",
      "Solder Balling: Small solder spheres spattering during rapid preheat moisture expansion."
    ],
    specs: [
      { label: "DFM Standard", value: "Design for Manufacturability" },
      { label: "Yield Target", value: "> 99.5% First-Pass Yield" },
      { label: "Closed-Loop", value: "SPI to Stencil Feedback" }
    ],
    image: path.join(baseDir, "slide11_defects.png")
  },
  {
    slideNumber: "12",
    title: "INDUSTRY STANDARDS & GOVERNANCE",
    subtitle: "IPC Acceptability & Lead-Free Compliance",
    stageTag: "GOVERNANCE & STANDARDS",
    description: "International electronics manufacturing standards govern quality benchmarks, lead-free environmental regulations, and static safety protocols.",
    keyPoints: [
      "IPC-A-610 Classes: Class 1 (Consumer), Class 2 (Dedicated Service), Class 3 (Mission Critical).",
      "RoHS Compliance: Mandatory restriction of lead (Pb). Transition to SAC305 lead-free alloys.",
      "ESD Control: ANSI/ESD S20.20 static grounding protocols protecting sensitive CMOS components."
    ],
    specs: [
      { label: "IPC Standard", value: "IPC-A-610 Class 3" },
      { label: "Environmental", value: "EU RoHS 3 Compliant" },
      { label: "ESD Protection", value: "< 100V HBM Model" }
    ],
    image: path.join(baseDir, "slide12_standards.png")
  },
  {
    slideNumber: "13",
    title: "FUTURE TRENDS IN PCB ASSEMBLY",
    subtitle: "Industry 4.0 & Smart Manufacturing",
    stageTag: "FUTURE HORIZONS",
    description: "The future of PCBA is driven by AI-powered automated line tuning, extreme component miniaturization, and flexible hybrid substrate integration.",
    keyPoints: [
      "Smart Factory & Industry 4.0: Machine-to-Machine (M2M) IPC-CFX communication & predictive AI.",
      "Micro Miniaturization: 008004 chip passives and 0.15mm pitch micro-BGA packages.",
      "Flexible & Rigid-Flex PCBA: 3D conformal electronics for wearable medical and aerospace."
    ],
    specs: [
      { label: "Line Standard", value: "IPC-CFX Open Connected Factory" },
      { label: "AI Integration", value: "Autonomous Closed-Loop Tuning" },
      { label: "Substrate Tech", value: "Embedded Active Components" }
    ],
    image: path.join(baseDir, "slide13_future_trends.png")
  },
  {
    slideNumber: "14",
    title: "THANK YOU FOR WATCHING",
    subtitle: "PCB ASSEMBLY: PROCESSES & STAGES",
    stageTag: "PRESENTATION COMPLETE",
    description: "Thank you for exploring the automated precision manufacturing guide to modern Printed Circuit Board Assembly.",
    credits: "Presenter: M. Hima Bindu | Roll No: 24F65A0410 | Class: Final Year ECE-1",
    image: path.join(baseDir, "ending_slide.png"),
    isEndingSlide: true
  }
];

slidesData.forEach((s) => {
  const slide = pptx.addSlide();
  slide.background = { color: DARK_BG };

  // Top Header Tag
  slide.addText(`SLIDE ${s.slideNumber} • ${s.stageTag}`, {


    x: 0.5,
    y: 0.4,
    w: 6.0,
    h: 0.3,
    fontSize: 10,
    fontFace: 'Arial',
    color: ACCENT_GREEN,
    bold: true
  });

  // Main Title
  slide.addText(s.title, {
    x: 0.5,
    y: 0.7,
    w: 6.2,
    h: 0.6,
    fontSize: 24,
    fontFace: 'Arial',
    color: TEXT_WHITE,
    bold: true
  });

  // Subtitle
  slide.addText(s.subtitle, {
    x: 0.5,
    y: 1.25,
    w: 6.2,
    h: 0.4,
    fontSize: 14,
    fontFace: 'Arial',
    color: ACCENT_GREEN,
    bold: true
  });

  // Description
  slide.addText(s.description, {
    x: 0.5,
    y: 1.7,
    w: 6.0,
    h: 0.8,
    fontSize: 11,
    fontFace: 'Arial',
    color: TEXT_MUTED,
    align: 'left'
  });

  // Title / Ending Slide Credits Box
  if (s.credits) {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
      x: 0.5,
      y: 2.7,
      w: 6.0,
      h: 1.2,
      fill: { color: CARD_BG },
      line: { color: BORDER_COLOR, width: 1 }
    });

    slide.addText("STUDENT CREDITS", {
      x: 0.7,
      y: 2.8,
      w: 5.6,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Arial',
      color: ACCENT_GREEN,
      bold: true
    });

    slide.addText("M. HIMA BINDU", {
      x: 0.7,
      y: 3.1,
      w: 5.6,
      h: 0.4,
      fontSize: 18,
      fontFace: 'Arial',
      color: TEXT_WHITE,
      bold: true
    });

    slide.addText("ID: 24F65A0410  |  Final Year | ECE-1", {
      x: 0.7,
      y: 3.5,
      w: 5.6,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      color: LIGHT_GREEN
    });
  }

  // Key Points List
  if (s.keyPoints && s.keyPoints.length > 0) {
    let keyPointsText = s.keyPoints.map((kp, idx) => `•  ${kp}`).join('\n\n');
    slide.addText(keyPointsText, {
      x: 0.5,
      y: 2.6,
      w: 6.0,
      h: 2.4,
      fontSize: 10,
      fontFace: 'Arial',
      color: TEXT_MUTED,
      valign: 'top'
    });
  }

  // Specs Cards at bottom left
  if (s.specs && s.specs.length > 0) {
    s.specs.forEach((sp, idx) => {
      const cardX = 0.5 + idx * 2.0;
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: cardX,
        y: 5.2,
        w: 1.9,
        h: 0.9,
        fill: { color: CARD_BG },
        line: { color: '152C30', width: 1 }
      });

      slide.addText(sp.label.toUpperCase(), {
        x: cardX + 0.1,
        y: 5.3,
        w: 1.7,
        h: 0.2,
        fontSize: 8,
        fontFace: 'Arial',
        color: '718083',
        bold: true
      });

      slide.addText(sp.value, {
        x: cardX + 0.1,
        y: 5.55,
        w: 1.7,
        h: 0.4,
        fontSize: 9,
        fontFace: 'Arial',
        color: ACCENT_GREEN,
        bold: true
      });
    });
  }

  // Right Side Presentation Image Card
  if (fs.existsSync(s.image)) {
    slide.addImage({
      path: s.image,
      x: 6.8,
      y: 0.7,
      w: 5.9,
      h: 5.5
    });

    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 6.8,
      y: 0.7,
      w: 5.9,
      h: 5.5,
      line: { color: ACCENT_GREEN, width: 1 },
      fill: { color: '000000', transparency: 100 }
    });
  }

  // Slide Footer
  slide.addText("PCB Assembly Processes & Stages  |  M. Hima Bindu (24F65A0410)", {
    x: 0.5,
    y: 6.8,
    w: 12.0,
    h: 0.3,
    fontSize: 9,
    fontFace: 'Arial',
    color: '506063'
  });
});

const outputPath = path.join(__dirname, '..', '..', 'PCB_Assembly_Processes_and_Stages.pptx');
pptx.writeFile({ fileName: outputPath }).then((filename) => {
  console.log(`PPTX created successfully at: ${filename}`);
}).catch((err) => {
  console.error("Error creating PPTX:", err);
});
