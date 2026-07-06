export interface Product {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: 'pc-components' | 'discrete-components' | 'college-kits';
  subCategory: string;
  images: string[];
  specifications: {
    [key: string]: any;
  };
  createdAt: string;
}

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-intel-14900k",
    name: "Intel Core i9-14900K Desktop Processor",
    sku: "BX8071514900K",
    description: "Featuring Intel Thermal Velocity Boost and Intel Turbo Boost Max Technology 3.0. Offers 24 cores (8 Performance-cores + 16 Efficient-cores) and 32 threads for high-end gaming and heavy compiling workloads.",
    price: 529.99,
    stockQuantity: 18,
    category: "pc-components",
    subCategory: "processor",
    images: ["https://images.unsplash.com/photo-1591405351990-4726e33df58d?w=400"],
    specifications: {
      "socket": "LGA1700",
      "cores": "24 (8P + 16E)",
      "threads": "32",
      "baseClock": "3.2 GHz",
      "boostClock": "6.0 GHz"
    },
    createdAt: new Date("2026-06-01").toISOString()
  },
  {
    id: "prod-amd-7800x3d",
    name: "AMD Ryzen 7 7800X3D Desktop Processor",
    sku: "100-100000910WOF",
    description: "The ultimate gaming processor featuring AMD 3D V-Cache technology. 8 cores and 16 threads optimized for extreme framerates and smooth multitasking workloads on the AM5 socket platform.",
    price: 389.99,
    stockQuantity: 24,
    category: "pc-components",
    subCategory: "processor",
    images: ["https://images.unsplash.com/photo-1591405351990-4726e33df58d?w=400"],
    specifications: {
      "socket": "AM5",
      "cores": "8 Cores",
      "threads": "16",
      "baseClock": "4.2 GHz",
      "boostClock": "5.0 GHz"
    },
    createdAt: new Date("2026-06-01").toISOString()
  },
  {
    id: "prod-samsung-990-2tb",
    name: "Samsung 990 Pro 2TB PCIe 4.0 NVMe SSD",
    sku: "MZ-V9P2T0B",
    description: "Experience the ultimate in PCIe Gen4 performance. Blow away your load times and maximize file transfer speeds up to 7450 MB/s. Perfect for heavy gaming, 3D rendering, and data analysis.",
    price: 169.99,
    stockQuantity: 45,
    category: "pc-components",
    subCategory: "ssd",
    images: ["/demo-ssd.png"],
    specifications: {
      "capacity": "2TB",
      "readSpeed": "7450 MB/s",
      "writeSpeed": "6900 MB/s",
      "interface": "PCIe Gen 4.0 x4",
      "formFactor": "M.2 (2280)",
      "cacheMemory": "2GB Low Power DDR4 SDRAM"
    },
    createdAt: new Date("2026-06-01").toISOString()
  },
  {
    id: "prod-corsair-vengeance-32",
    name: "Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz",
    sku: "CMH32GX5M2B6000C30",
    description: "Deliver high-performance DDR5 memory optimized for Intel and AMD motherboards. Features vibrant dynamic multi-zone RGB lighting and onboard voltage regulation for customized overclocking.",
    price: 114.99,
    stockQuantity: 32,
    category: "pc-components",
    subCategory: "ram",
    images: ["/demo-ram.png"],
    specifications: {
      "capacity": "32GB (2 x 16GB)",
      "speed": "6000 MHz",
      "type": "DDR5",
      "latency": "CL30 (30-36-36-76)",
      "voltage": "1.4V",
      "rgb": "Yes"
    },
    createdAt: new Date("2026-06-02").toISOString()
  },
  {
    id: "prod-rtx-4070-super",
    name: "NVIDIA GeForce RTX 4070 Super Founders Edition 12GB",
    sku: "NV-RTX4070S-FE",
    description: "Powered by the ultra-efficient Ada Lovelace architecture. Experience AI-accelerated gaming, ray tracing, DLSS 3, and unmatched performance for creator workloads.",
    price: 599.99,
    stockQuantity: 14,
    category: "pc-components",
    subCategory: "gpu",
    images: ["/demo-gpu.png"],
    specifications: {
      "vram": "12GB GDDR6X",
      "interface": "PCIe 4.0 x16",
      "boostClock": "2.48 GHz",
      "powerRecommended": "650W",
      "outputs": "1x HDMI 2.1a, 3x DisplayPort 1.4a"
    },
    createdAt: new Date("2026-06-03").toISOString()
  },
  {
    id: "prod-resistor-10k",
    name: "10K Ohm 1/4W Metal Film Resistors (Pack of 100)",
    sku: "RES-10K-100P",
    description: "Premium metal film resistors with a high tolerance rating of ±1%. Low noise generation and stable resistance values over long term operations. Standard 0.25 Watt power rating.",
    price: 2.99,
    stockQuantity: 520,
    category: "discrete-components",
    subCategory: "resistor",
    images: ["/demo-resistor.png"],
    specifications: {
      "resistance": "10k ohm",
      "tolerance": "±1%",
      "powerRating": "0.25W (1/4 Watt)",
      "type": "Metal Film",
      "mounting": "Through-hole (Axial Leaded)"
    },
    createdAt: new Date("2026-06-04").toISOString()
  },
  {
    id: "prod-capacitor-100uf",
    name: "100uF 25V Electrolytic Capacitors (Pack of 25)",
    sku: "CAP-100UF-25V",
    description: "Radial lead aluminum electrolytic capacitors for filtering, decoupling, and noise suppression in power supplies and analog electronic circuits. Temperature range up to 105°C.",
    price: 3.49,
    stockQuantity: 340,
    category: "discrete-components",
    subCategory: "capacitor",
    images: ["/demo-capacitor.png"],
    specifications: {
      "capacitance": "100uF",
      "voltage": "25V",
      "tolerance": "±20%",
      "maxTemperature": "105°C",
      "mounting": "Through-hole (Radial)"
    },
    createdAt: new Date("2026-06-05").toISOString()
  },
  {
    id: "prod-atmega328p",
    name: "ATmega328P-PU 8-bit AVR Microcontroller IC",
    sku: "IC-ATMEGA328P-PU",
    description: "The core chip of the classic Arduino Uno. Features 32KB flash memory, 23 programmable I/O lines, 10-bit A/D converter, and operates at speeds up to 20 MHz. Supplied in DIP-28 package.",
    price: 2.49,
    stockQuantity: 95,
    category: "discrete-components",
    subCategory: "microcontroller",
    images: ["/demo-atmega.png"],
    specifications: {
      "package": "DIP-28",
      "architecture": "8-bit AVR",
      "flashMemory": "32KB",
      "operatingVoltage": "1.8V - 5.5V",
      "speed": "20 MHz",
      "analogInputs": "6 channels"
    },
    createdAt: new Date("2026-06-06").toISOString()
  },
  {
    id: "prod-arduino-kit",
    name: "College Basic Arduino Lab Experiment Kit",
    sku: "KIT-ARD-BASIC",
    description: "Designed for undergraduate electrical engineering, physics, and robotics lab courses. Contains everything required to perform 15 core microchip experiments including sensor integration, LED blinking, and serial displays.",
    price: 24.99,
    stockQuantity: 110,
    category: "college-kits",
    subCategory: "lab-kit",
    images: ["/demo-ard-kit.png"],
    specifications: {
      "kitItems": [
        "Arduino Uno R3 Compatible Board x1",
        "Solderless Breadboard (830 point) x1",
        "Assorted Resistors (220R, 1K, 10K) x40",
        "5mm Bright LEDs (Red, Green, Blue) x15",
        "Photoresistor (LDR) x2",
        "Solderless Jumper Wire Assortment x60",
        "Active Buzzer & Solderless Pushbuttons x5",
        "9V Battery Power Jack Connector x1",
        "High Quality USB Type B Cable x1"
      ],
      "level": "Beginner / Undergraduate",
      "experimentGuide": "PDF Included (15 projects)"
    },
    createdAt: new Date("2026-06-07").toISOString()
  },
  {
    id: "prod-esp32-iot",
    name: "ESP32 IoT Cloud Development Starter Kit",
    sku: "KIT-ESP32-IOT",
    description: "The perfect educational kit for Internet of Things (IoT) courses and prototyping. Built around the high-speed dual-core ESP32 Dev Board with integrated Wi-Fi and Bluetooth capabilities.",
    price: 42.50,
    stockQuantity: 64,
    category: "college-kits",
    subCategory: "lab-kit",
    images: ["/demo-esp-kit.png"],
    specifications: {
      "kitItems": [
        "ESP32 NodeMCU Development Module x1",
        "DHT11 Temperature & Humidity Sensor x1",
        "MQ-2 Gas / Smoke Sensor Module x1",
        "Ultrasonic Distance Sensor HC-SR04 x1",
        "0.96 inch I2C OLED Display (128x64) x1",
        "SG90 Micro Servo Motor x1",
        "5V Single Channel Relay Module x1",
        "Premium Jumper Wires (Male-to-Female) x40",
        "Mini USB Cable x1"
      ],
      "level": "Intermediate / Advanced",
      "experiments": "IoT Cloud Dashboards, Wi-Fi webservers, sensor alerts"
    },
    createdAt: new Date("2026-06-08").toISOString()
  }
];

export const getProducts = (): Product[] => {
  const localData = localStorage.getItem("e_commerce_products");
  if (!localData) {
    localStorage.setItem("e_commerce_products", JSON.stringify(INITIAL_PRODUCTS));
    return INITIAL_PRODUCTS;
  }
  try {
    return JSON.parse(localData);
  } catch (error) {
    console.error("Failed to parse products from localstorage", error);
    return INITIAL_PRODUCTS;
  }
};

export const saveProducts = (products: Product[]) => {
  localStorage.setItem("e_commerce_products", JSON.stringify(products));
};

export const addProduct = (product: Omit<Product, "id" | "createdAt">): Product => {
  const newProduct: Product = {
    ...product,
    id: "prod-" + Math.random().toString(36).substr(2, 9),
    createdAt: new Date().toISOString()
  };
  const current = getProducts();
  const updated = [newProduct, ...current];
  saveProducts(updated);
  return newProduct;
};

export const updateProduct = (updatedProduct: Product): void => {
  const current = getProducts();
  const updated = current.map(p => p.id === updatedProduct.id ? updatedProduct : p);
  saveProducts(updated);
};

export const deleteProduct = (id: string): void => {
  const current = getProducts();
  const updated = current.filter(p => p.id !== id);
  saveProducts(updated);
};

export const purchaseItems = (items: { id: string; quantity: number }[]): void => {
  const current = getProducts();
  const updated = current.map(p => {
    const purchased = items.find(item => item.id === p.id);
    if (purchased) {
      const newStock = Math.max(0, p.stockQuantity - purchased.quantity);
      return { ...p, stockQuantity: newStock };
    }
    return p;
  });
  saveProducts(updated);
};

