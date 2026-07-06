import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Product, getProducts, purchaseItems } from '../services/productService';
import { CartItem } from '../hooks/useCart';

export interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  recommendations?: Product[];
  timestamp: Date;
}

// SVG Icons as inline constants for reliability and clean code
const Icons = {
  Search: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Cart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  Sun: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>,
  Moon: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>,
  Minus: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M20 12H4" /></svg>,
  Trash: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  ArrowRight: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>,
  Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>,
  Close: () => <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>,
  Filter: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 8.293A1 1 0 013 7.586V4z" /></svg>,
  Spark: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364.364l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
  Catalog: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  Admin: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
};

// Conversational Electronics Knowledge Base
const KNOWLEDGE_BASE: { [key: string]: string } = {
  resistor: "A resistor restricts the flow of electrical current in a circuit. Measured in ohms (Ω), it prevents excessive current from damaging sensitive components like LEDs. For example, our 10K Ohm resistor pack is ideal for pull-up pins on microchips.",
  capacitor: "A capacitor stores electric charge and releases it when needed. It acts as a temporary battery filter to smooth out power supply fluctuations and filter out AC noise. Our 100uF radial electrolytic capacitor is commonly used in DC power filtering.",
  ssd: "An SSD (Solid State Drive) is a high-speed storage device that uses flash memory chips. Unlike rotating HDDs, it has no moving parts. The Samsung 990 Pro SSD offers read speeds of 7450 MB/s, reducing PC boot times and asset loading to seconds.",
  ram: "RAM (Random Access Memory) is your computer's high-speed temporary memory workspace. The CPU uses it to read and write active operational data. More RAM, like our Corsair Vengeance 32GB DDR5 running at 6000MHz, prevents bottlenecks when compiling code or multitasking.",
  gpu: "A GPU (Graphics Processing Unit) is a specialized chip built to accelerate image, 3D graphics rendering, and AI computing. The NVIDIA RTX 4070 Super uses ray tracing and DLSS AI cores to deliver top-tier rendering for games and creators.",
  arduino: "Arduino is an open-source electronics prototyping platform. Built on the ATmega328P microcontroller chip, it features digital and analog pins to read sensors (like temperature) and drive outputs (like buzzers or motors). It is the standard educational kit for engineering lab experiments.",
  esp32: "The ESP32 is a dual-core microcontroller with built-in Wi-Fi and Bluetooth. It is the leading chip for Internet of Things (IoT) courses, enabling you to connect sensors to cloud dashboards, run local web servers, and control electrical relays over the internet.",
  robotics: "Robotics kits combine structural frames (chassis) with gear motors, sensors (ultrasonic, line-tracking), and microcontroller controllers. Our 4WD Robotics Car Kit includes an Arduino Uno and L298N motor driver to build autonomous obstacle-avoidance vehicles.",
  ic: "An IC (Integrated Circuit), or microchip, packs thousands of transistors, diodes, and resistors onto a single tiny silicon wafer. Examples include the ATmega328P processor chip and the classic NE555 timer chip used for pulse generation.",
  capacitance: "Capacitance is the ability of a component (capacitor) to collect and store energy in the form of an electrical charge. It is measured in Farads (F). In hobbyist electronics, microfarads (uF) are the standard unit.",
  resistance: "Resistance is the opposition that a substance offers to the flow of electric current. It is measured in Ohms (Ω). It controls voltage levels throughout a circuit based on Ohm's law (V = I * R).",
  inductor: "An inductor is a passive electronic component that stores energy in a magnetic field when electric current flows through it. It resists sudden changes in current, making it useful in filters and power regulators.",
  diode: "A diode is a semiconductor device that allows current to flow in only one direction. It is commonly used for rectification (converting AC to DC) and circuit protection. LEDs (Light Emitting Diodes) are a special type that emit light when active.",
  voltage: "Voltage is the electrical pressure or potential difference that pushes electric charges through a conductor. Measured in Volts (V), standard microcontrollers like Arduino run on 5V or 3.3V.",
  current: "Current is the rate at which electric charge flows through a circuit. It is measured in Amperes (A) or Milliamperes (mA). A typical LED requires about 20mA to light up safely."
};

interface StorefrontProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  onNavigateToAdmin: () => void;
  onLogout: () => void;
  loggedInUser: string;
  userRole: 'customer' | 'admin' | null;
  bgTheme: string;
  setBgTheme: (theme: string) => void;
  currency: 'USD' | 'INR';
  setCurrency: (currency: 'USD' | 'INR') => void;
  cart: {
    cartItems: CartItem[];
    addToCart: (product: Product, quantity?: number) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    cartTotal: number;
    cartItemCount: number;
  };
}

export default function Storefront({ isDarkMode, toggleDarkMode, onNavigateToAdmin, onLogout, loggedInUser, userRole, bgTheme, setBgTheme, currency, setCurrency, cart }: StorefrontProps) {
  const renderHudCorners = () => (
    <>
      <div className="hud-corner hud-tl"></div>
      <div className="hud-corner hud-tr"></div>
      <div className="hud-corner hud-bl"></div>
      <div className="hud-corner hud-br"></div>
    </>
  );

  const [products, setProducts] = useState<Product[]>(() => getProducts());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number>(1000);
  
  // Custom Spec Filters
  const [specRamFilter, setSpecRamFilter] = useState<string>("all");
  const [specCapacityFilter, setSpecCapacityFilter] = useState<string>("all");
  const [specResistanceFilter, setSpecResistanceFilter] = useState<string>("all");

  // Tab routing
  const [activeSubTab, setActiveSubTab] = useState<'catalog' | 'ai'>('catalog');

  // Floating WhatsApp support states
  const [isWhatsappOpen, setIsWhatsappOpen] = useState(false);
  const [whatsappNumber, setWhatsappNumber] = useState("919999999999");
  const [whatsappTopic, setWhatsappTopic] = useState("Processor CPU spec inquiry");
  const [customMsg, setCustomMsg] = useState("");

  // UI state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // GoKwik Checkout state
  const [isGokwikOpen, setIsGokwikOpen] = useState(false);
  const [gokwikStep, setGokwikStep] = useState<1 | 2 | 3>(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState<string[]>(["", "", "", ""]);
  const [couponCode, setCouponCode] = useState("");
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [appliedCouponVal, setAppliedCouponVal] = useState(0); // discount in percentage
  const [otpTimer, setOtpTimer] = useState(25);
  
  const [isGokwikSummaryExpanded, setIsGokwikSummaryExpanded] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [paySuccess, setPaySuccess] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isGokwikOpen && gokwikStep === 2 && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGokwikOpen, gokwikStep, otpTimer]);

  useEffect(() => {
    if (isGokwikOpen && gokwikStep === 2) {
      setTimeout(() => {
        document.getElementById("otp-0")?.focus();
      }, 100);
    }
  }, [isGokwikOpen, gokwikStep]);

  // AI Copilot state
  const [aiQuery, setAiQuery] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => [
    {
      sender: 'ai',
      text: "Hello! I am your REDDY ELECTRONICS AI Copilot. Ask me any electronics questions (e.g. 'What is a capacitor?', 'Explain the difference between SSD and HDD') or tell me what project you are building, and I will both tutor you and recommend matching parts from our catalog!",
      timestamp: new Date()
    }
  ]);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Reload products whenever storefront mounts or updates
  useEffect(() => {
    setProducts(getProducts());
  }, []);

  // Auto scroll chat to bottom
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isAiThinking]);

  // Compute available Sub-categories based on selected Category
  const subCategories = useMemo(() => {
    const subs = new Set<string>();
    products.forEach(p => {
      if (selectedCategory === "all" || p.category === selectedCategory) {
        subs.add(p.subCategory);
      }
    });
    return Array.from(subs);
  }, [products, selectedCategory]);

  // Compute list of dynamic specification values for filters
  const specFilterOptions = useMemo(() => {
    const rams = new Set<string>();
    const capacities = new Set<string>();
    const resistances = new Set<string>();

    products.forEach(p => {
      if (p.specifications.capacity) capacities.add(p.specifications.capacity);
      if (p.specifications.speed && p.specifications.type) {
        rams.add(`${p.specifications.capacity || ''} ${p.specifications.type}`);
      }
      if (p.specifications.resistance) resistances.add(p.specifications.resistance);
    });

    return {
      rams: Array.from(rams),
      capacities: Array.from(capacities),
      resistances: Array.from(resistances)
    };
  }, [products]);

  // Filter products based on search, category, sub-category, price, and specs
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
      const matchesSubCategory = selectedSubCategory === "all" || p.subCategory === selectedSubCategory;
      const matchesPrice = p.price <= priceRange;

      let matchesRam = true;
      if (specRamFilter !== "all") {
        matchesRam = p.specifications.type === specRamFilter.split(' ')[1] && p.specifications.capacity === specRamFilter.split(' ')[0];
      }

      let matchesCapacity = true;
      if (specCapacityFilter !== "all") {
        matchesCapacity = p.specifications.capacity === specCapacityFilter;
      }

      let matchesResistance = true;
      if (specResistanceFilter !== "all") {
        matchesResistance = p.specifications.resistance === specResistanceFilter;
      }

      return matchesSearch && matchesCategory && matchesSubCategory && matchesPrice && matchesRam && matchesCapacity && matchesResistance;
    });
  }, [products, searchQuery, selectedCategory, selectedSubCategory, priceRange, specRamFilter, specCapacityFilter, specResistanceFilter]);

  // Reset sub-category if category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubCategory("all");
    setSpecRamFilter("all");
    setSpecCapacityFilter("all");
    setSpecResistanceFilter("all");
  };

  const formatPrice = (usdPrice: number) => {
    if (currency === 'INR') {
      return `₹${Math.round(usdPrice * 83).toLocaleString('en-IN')}`;
    }
    return `$${usdPrice.toFixed(2)}`;
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCartOpen(false);
    setIsGokwikOpen(true);
    setGokwikStep(1);
    setOtpTimer(25);
    setOtp(["", "", "", ""]);
    setIsGokwikSummaryExpanded(false);
  };

  const handleGokwikComplete = () => {
    setIsPaying(true);
    setPaySuccess(false);
    showToast("Processing payment via GoKwik...");
    
    setTimeout(() => {
      setPaySuccess(true);
      purchaseItems(cart.cartItems.map(item => ({ id: item.product.id, quantity: item.quantity })));
      showToast("Order Placed Successfully!");
      
      setTimeout(() => {
        cart.clearCart();
        setProducts(getProducts());
        setIsGokwikOpen(false);
        setIsPaying(false);
        setPaySuccess(false);
      }, 1500);
    }, 1500);
  };

  const handleSendAiMessage = (text: string) => {
    const clean = text.trim();
    if (!clean) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: clean,
      timestamp: new Date()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setAiQuery("");
    setIsAiThinking(true);

    setTimeout(() => {
      const query = clean.toLowerCase();
      const allProducts = getProducts();
      let matchedProducts: Product[] = [];

      // 1. Check offline Q&A tutoring base for matched keywords
      let foundQaAnswer = "";
      for (const [key, answer] of Object.entries(KNOWLEDGE_BASE)) {
        if (query.includes(key)) {
          foundQaAnswer = answer;
          break;
        }
      }

      // 2. Identify category / items matching query for recommendations
      const wantsSsd = query.includes("ssd") || query.includes("storage") || query.includes("speed") || query.includes("nvme");
      const wantsRam = query.includes("ram") || query.includes("memory") || query.includes("ddr");
      const wantsGpu = query.includes("gpu") || query.includes("graphics") || query.includes("rtx") || query.includes("nvidia");
      const wantsProcessor = query.includes("processor") || query.includes("cpu") || query.includes("intel") || query.includes("amd") || query.includes("ryzen") || query.includes("core i9");
      const wantsResistor = query.includes("resistor") || query.includes("ohm");
      const wantsCapacitor = query.includes("capacitor") || query.includes("uf") || query.includes("volt");
      const wantsMicrocontroller = query.includes("microcontroller") || query.includes("atmega") || query.includes("chip") || query.includes("ic") || query.includes("timer");
      const wantsKit = query.includes("kit") || query.includes("lab") || query.includes("college") || query.includes("experiment") || query.includes("arduino") || query.includes("iot") || query.includes("robotics");

      if (wantsSsd) matchedProducts.push(...allProducts.filter(p => p.subCategory === "ssd"));
      if (wantsRam) matchedProducts.push(...allProducts.filter(p => p.subCategory === "ram"));
      if (wantsGpu) matchedProducts.push(...allProducts.filter(p => p.subCategory === "gpu"));
      if (wantsProcessor) matchedProducts.push(...allProducts.filter(p => p.subCategory === "processor"));
      if (wantsResistor) matchedProducts.push(...allProducts.filter(p => p.subCategory === "resistor"));
      if (wantsCapacitor) matchedProducts.push(...allProducts.filter(p => p.subCategory === "capacitor"));
      if (wantsMicrocontroller) {
        matchedProducts.push(...allProducts.filter(p => p.subCategory === "microcontroller" || p.subCategory === "ic"));
      }
      if (wantsKit) matchedProducts.push(...allProducts.filter(p => p.category === "college-kits"));

      // Budget query parser
      let budgetLimit = Infinity;
      const budgetMatch = query.match(/(under|below|less than|budget of)\s*(rs\.?|inr|₹|\$)?\s*(\d+)/i);
      if (budgetMatch) {
        const val = parseInt(budgetMatch[3]);
        const currencySign = budgetMatch[2] || '';
        const isINR = currencySign === '₹' || currencySign.toLowerCase() === 'inr' || currencySign.toLowerCase() === 'rs' || currency === 'INR';
        if (isINR) {
          budgetLimit = val / 83; // Convert INR input bounds to USD database pricing
        } else {
          budgetLimit = val;
        }
      }

      // Keyword fallback match if nothing specific caught
      if (matchedProducts.length === 0) {
        matchedProducts = allProducts.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.description.toLowerCase().includes(query)
        );
      }

      // Apply budget filter
      if (budgetLimit !== Infinity) {
        matchedProducts = matchedProducts.filter(p => p.price <= budgetLimit);
      }

      // Deduplicate and limit to top 3 recommendations
      const uniqueMatched = Array.from(new Set(matchedProducts.map(p => p.id)))
        .map(id => matchedProducts.find(p => p.id === id)!);
      const finalRecs = uniqueMatched.slice(0, 3);

      let replyText = "";
      if (foundQaAnswer) {
        replyText = `📚 **Concept Explanation:**\n${foundQaAnswer}\n\n`;
      }

      if (finalRecs.length > 0) {
        if (foundQaAnswer) {
          replyText += `💡 **Recommended Catalog Items:**\nHere are items in our inventory that align with this concept:\n\n`;
        } else {
          replyText = `🤖 I analyzed our catalog for your request. Here are the components that match your goals perfectly:\n\n`;
        }
        finalRecs.forEach((p, idx) => {
          replyText += `⚡ ${idx + 1}. **${p.name}** - ${formatPrice(p.price)} (${p.description.substring(0, 50)}...)\n`;
        });
        if (budgetLimit !== Infinity) {
          replyText += `\n(Stayed under budget: ${currency === 'INR' ? '₹' + Math.round(budgetLimit * 83) : '$' + budgetLimit}).`;
        }
      } else {
        if (!foundQaAnswer) {
          replyText = `🤖 I searched our live stock matrix but couldn't find matching items under that description. \n\nCould you try detailing if you need high-spec PC components (like SSD storage or RAM modules), basic electric components (such as resistors or capacitors), or college experiment starter kits (like Arduino or ESP32 robotics setups)?`;
        } else {
          replyText += `\n\n(No exact components currently matching this in our stock database, but you can request custom orders from our admin).`;
        }
      }

      const aiMsg: ChatMessage = {
        sender: 'ai',
        text: replyText,
        recommendations: finalRecs,
        timestamp: new Date()
      };

      setChatMessages(prev => [...prev, aiMsg]);
      setIsAiThinking(false);
    }, 850);
  };

  const renderFallbackImage = (product: Product, className: string = "w-full h-full") => {
    let gradient = "from-slate-800 to-slate-900";
    let iconLabel = "SPEC";
    
    if (product.category === "pc-components") {
      gradient = "from-indigo-650 to-purple-800";
      iconLabel = product.subCategory.toUpperCase();
    } else if (product.category === "discrete-components") {
      gradient = "from-emerald-600 to-teal-800";
      iconLabel = product.specifications.resistance || product.specifications.capacitance || "PART";
    } else if (product.category === "college-kits") {
      gradient = "from-amber-500 to-orange-700";
      iconLabel = "LAB KIT";
    }

    return (
      <div className={`${className} bg-gradient-to-br ${gradient} flex flex-col items-center justify-center p-6 text-white select-none relative overflow-hidden`}>
        <div className="absolute w-32 h-32 bg-white/10 rounded-full blur-xl -top-8 -left-8"></div>
        <div className="absolute w-24 h-24 bg-white/5 rounded-full blur-lg -bottom-6 -right-6"></div>
        
        <svg className="absolute inset-0 w-full h-full opacity-10" fill="none" stroke="currentColor">
          <path d="M0,20h100 M20,0v100 M40,20l10,10h50 M0,80h100 M80,0v100" strokeWidth="1" />
        </svg>

        <span className="font-mono text-[9px] tracking-widest uppercase opacity-60 mb-1">{product.sku}</span>
        <span className="font-extrabold text-xl tracking-tighter drop-shadow-md">{iconLabel}</span>
        <span className="text-[9px] font-medium tracking-wide bg-black/25 px-2 py-0.5 rounded-full mt-2.5 backdrop-blur-sm border border-white/10">
          {product.category === "pc-components" ? "⚡ Hardware" : product.category === "college-kits" ? "🎓 College Kit" : "🔬 Discrete Part"}
        </span>
      </div>
    );
  };

  return (
    <div className={`min-h-screen flex flex-col md:flex-row cyber-grid smooth-gpu relative ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
    } transition-colors duration-300 overflow-hidden`}>
      <div 
        className="cyber-backdrop-overlay"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 15, 30, 0.94), rgba(6, 10, 20, 0.96)), url('/bg_${bgTheme}.png')`
        }}
      ></div>
      
      {/* 1. DESKTOP LEFT SIDEBAR CONSOLE (Hidden on Mobile) */}
      <aside className={`hidden md:flex flex-col justify-between w-64 border-r p-6 flex-shrink-0 relative ${
        isDarkMode ? 'bg-slate-900/60 border-slate-800/80 hud-panel' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        {renderHudCorners()}
        <div className="space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-indigo-600 to-purple-650 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/20">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <rect x="9" y="9" width="6" height="6" rx="1" />
                <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
              </svg>
            </div>
            <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              REDDY ELECTRONICS
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <button
              onClick={() => setActiveSubTab('catalog')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeSubTab === 'catalog'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <Icons.Catalog />
              <span>Catalog Catalog</span>
            </button>

            <button
              onClick={() => setActiveSubTab('ai')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-all relative ${
                activeSubTab === 'ai'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:bg-slate-800/40 hover:text-slate-200'
              }`}
            >
              <Icons.Spark />
              <span>AI Tutor Copilot</span>
              <span className="absolute right-3.5 w-2 h-2 rounded-full bg-pink-500 animate-pulse"></span>
            </button>

            {userRole === 'admin' && (
              <button
                onClick={onNavigateToAdmin}
                className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-bold text-slate-400 hover:bg-slate-800/40 hover:text-slate-200 transition-all`}
              >
                <Icons.Admin />
                <span>Console Panel</span>
              </button>
            )}
          </nav>
        </div>

        {/* Bottom Switchers */}
        <div className="space-y-4 pt-4 border-t border-slate-800/60">
          {/* Currency Switches */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500">Currency</span>
            <div className="flex bg-slate-950/40 border border-slate-800 rounded-lg p-0.5">
              {['USD', 'INR'].map(cur => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur as any)}
                  className={`px-2 py-1 rounded text-[10px] font-extrabold transition-all ${
                    currency === cur ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-500">Visual Theme</span>
            <button
              onClick={toggleDarkMode}
              className="p-1.5 rounded-lg border border-slate-850 hover:bg-slate-850 text-indigo-400 hover:text-indigo-300"
            >
              {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
            </button>
          </div>

          {/* Backdrop Theme selector */}
          <div className="flex flex-col space-y-1.5 pt-2 border-t border-slate-800/40">
            <span className="text-[10px] uppercase font-bold text-slate-500">Backdrop Style</span>
            <div className="flex bg-slate-950/40 border border-slate-850 rounded-lg p-1 justify-between items-center">
              {[
                { code: 'cyan', color: 'bg-cyan-500' },
                { code: 'amber', color: 'bg-amber-500' },
                { code: 'red', color: 'bg-rose-600' },
                { code: 'green', color: 'bg-emerald-500' },
                { code: 'violet', color: 'bg-fuchsia-500' }
              ].map(item => (
                <button
                  key={item.code}
                  onClick={() => setBgTheme(item.code)}
                  className={`w-4 h-4 rounded-full ${item.color} border transition-all ${
                    bgTheme === item.code ? 'ring-2 ring-indigo-500 border-white scale-110' : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                  title={item.code}
                />
              ))}
            </div>
          </div>

          {/* User Profile / Logout */}
          <div className="pt-3 border-t border-slate-800/40 flex flex-col space-y-2">
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
              <span className="truncate max-w-[60%]">👤 {loggedInUser || "Client Uplink"}</span>
              <span className="text-cyan-500 font-extrabold text-[8px] tracking-widest uppercase">ACTIVE</span>
            </div>
            <button
              onClick={onLogout}
              className="w-full py-2 bg-slate-950/60 border border-slate-800 hover:border-rose-500/30 hover:bg-rose-500/5 text-rose-455 rounded-xl text-[10px] font-extrabold uppercase transition-all"
            >
              Disconnect Uplink
            </button>
          </div>

        </div>
      </aside>

      {/* 2. MAIN WORKSPACE CONTAINER */}
      <div className="flex-grow flex flex-col overflow-hidden relative">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <header className={`md:hidden flex items-center justify-between px-6 h-14 border-b ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <span className="font-extrabold text-sm tracking-tight bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            REDDY ELECTRONICS
          </span>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-indigo-500"
            >
              <Icons.Cart />
              {cart.cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white font-bold text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900">
                  {cart.cartItemCount}
                </span>
              )}
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 text-slate-400"
            >
              {isDarkMode ? <Icons.Sun /> : <Icons.Moon />}
            </button>
            <button
              onClick={onLogout}
              title="Disconnect Uplink"
              className="p-2 text-rose-455 font-bold text-xs"
            >
              🔌
            </button>
          </div>
        </header>

        {/* Dynamic Sub-Tab Rendering Panel */}
        <div className="flex-grow overflow-y-auto p-6 md:p-8 pb-20 md:pb-8">
          
          {/* TAB A: PRODUCT CATALOG VIEW */}
          {activeSubTab === 'catalog' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Premium Hero Banner */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-indigo-500/10 group h-48 md:h-60 flex items-center">
                <div 
                  className="absolute inset-0 bg-cover bg-center brightness-[0.7] dark:brightness-[0.55] group-hover:scale-102 transition-transform duration-700"
                  style={{ backgroundImage: `url('/hero-banner.png')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/50 to-transparent"></div>
                <div className="relative z-10 px-6 md:px-10 text-left max-w-xl">
                  <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-400/20 mb-3 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                    <span>Next-Gen Hardware Hub</span>
                  </span>
                  <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-white leading-tight">
                    Power Your Engineering Projects
                  </h2>
                  <p className="text-slate-300 mt-2 text-xs md:text-sm leading-relaxed">
                    Tutoring and catalog support for heavy PC hardware components down to tiny microchips and resistors.
                  </p>
                </div>
                
                {/* Float Cart trigger (Desktop only) */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="hidden md:flex absolute bottom-6 right-6 z-10 items-center space-x-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg transition-all"
                >
                  <Icons.Cart />
                  <span>Basket ({cart.cartItemCount})</span>
                </button>
              </div>

              {/* Sidebar Filters + Grid Layout */}
              <div className="lg:grid lg:grid-cols-4 lg:gap-6 items-start">
                
                {/* Side filters */}
                <aside className={`lg:col-span-1 rounded-2xl p-5 border ${
                  isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'
                } mb-6 lg:mb-0`}>
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-800/80">
                    <span className="text-xs font-extrabold flex items-center space-x-2">
                      <Icons.Filter />
                      <span>Stock Filters</span>
                    </span>
                    <button 
                      onClick={() => {
                        setSelectedCategory("all");
                        setSelectedSubCategory("all");
                        setSearchQuery("");
                        setPriceRange(1000);
                        setSpecRamFilter("all");
                        setSpecCapacityFilter("all");
                        setSpecResistanceFilter("all");
                      }}
                      className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase"
                    >
                      Clear
                    </button>
                  </div>

                  {/* Search */}
                  <div className="mb-5">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search SKU or name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full pl-9 pr-3 py-2 rounded-lg border text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200'
                        }`}
                      />
                      <span className="absolute left-3 top-2.5 text-slate-400">
                        <Icons.Search />
                      </span>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-5">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Category</label>
                    <div className="space-y-1">
                      {[
                        { id: 'all', label: 'All Catalog' },
                        { id: 'pc-components', label: 'PC Components' },
                        { id: 'discrete-components', label: 'Discrete Components' },
                        { id: 'college-kits', label: 'College Kits' }
                      ].map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            selectedCategory === cat.id
                              ? 'bg-indigo-650 text-white shadow-sm'
                              : 'text-slate-400 hover:bg-slate-800/20 hover:text-slate-200'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sub-categories */}
                  {subCategories.length > 0 && (
                    <div className="mb-5">
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">Sub Category</label>
                      <div className="flex flex-wrap gap-1">
                        <button
                          onClick={() => setSelectedSubCategory("all")}
                          className={`px-2 py-1 rounded text-[10px] font-bold border transition-all ${
                            selectedSubCategory === "all" ? 'bg-purple-600 text-white border-purple-650' : 'border-slate-800 bg-slate-950 text-slate-400'
                          }`}
                        >
                          All
                        </button>
                        {subCategories.map(sub => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSubCategory(sub)}
                            className={`px-2 py-1 rounded text-[10px] font-bold border transition-all uppercase ${
                              selectedSubCategory === sub ? 'bg-purple-600 text-white border-purple-650' : 'border-slate-800 bg-slate-950 text-slate-400'
                            }`}
                          >
                            {sub}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Price range */}
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Max Budget</label>
                      <span className="text-xs font-extrabold text-indigo-400">{formatPrice(priceRange)}</span>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="1000"
                      step="5"
                      value={priceRange}
                      onChange={(e) => setPriceRange(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-650"
                    />
                  </div>
                </aside>

                {/* Grid */}
                <div className="lg:col-span-3">
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-slate-800 rounded-2xl">
                      <p className="text-xs font-bold text-slate-500">No matching parts in catalog</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                      {filteredProducts.map(p => {
                        const isLow = p.stockQuantity > 0 && p.stockQuantity < 15;
                        const isOut = p.stockQuantity === 0;

                        return (
                          <div
                            key={p.id}
                            onClick={() => setSelectedProduct(p)}
                            className={`group relative border flex flex-col justify-between overflow-hidden cursor-pointer hover:-translate-y-1.5 transition-all duration-300 hover:shadow-lg hud-panel animate-card-fade ${
                              isDarkMode ? 'border-slate-850 hover:border-cyan-500/30' : 'bg-white border-slate-150'
                            }`}
                          >
                            {renderHudCorners()}
                            <div className="aspect-video relative overflow-hidden bg-slate-950">
                              {p.images && p.images[0] && !p.images[0].startsWith('/demo') && !p.images[0].startsWith('/placeholder') ? (
                                <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                              ) : (
                                renderFallbackImage(p)
                              )}
                              <span className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded text-[8px] font-extrabold uppercase border backdrop-blur-md ${
                                isOut ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : isLow ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                              }`}>
                                {isOut ? "Out of Stock" : isLow ? "Low Stock" : "In Stock"}
                              </span>
                            </div>

                            <div className="p-4 flex-grow flex flex-col justify-between">
                              <div>
                                <span className="font-mono text-[8px] text-indigo-400 font-extrabold tracking-widest uppercase block mb-1">{p.subCategory}</span>
                                <h3 className="font-extrabold text-xs leading-snug line-clamp-2">{p.name}</h3>
                              </div>

                              <div className="flex items-center justify-between mt-4 pt-2.5 border-t border-slate-800/40">
                                <span className="text-xs font-extrabold">{formatPrice(p.price)}</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isOut) {
                                      cart.addToCart(p);
                                      showToast(`Added ${p.name} to cart!`);
                                    }
                                  }}
                                  disabled={isOut}
                                  className="p-1.5 rounded-lg bg-indigo-650 hover:bg-indigo-700 text-white disabled:bg-slate-800 transition-colors"
                                >
                                  <Icons.Plus />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* TAB B: FULL-PAGE AI TUTOR CHAT PANEL */}
          {activeSubTab === 'ai' && (
            <div className="h-[75vh] flex flex-col border overflow-hidden animate-fade-in hud-panel relative">
              {renderHudCorners()}
              {/* Top info */}
              <div className="px-6 py-4.5 border-b border-slate-800 bg-slate-950/20 flex items-center space-x-2.5">
                <span className="text-indigo-400 text-lg">✨</span>
                <div>
                  <h3 className="font-extrabold text-xs tracking-wider">AI Electronics Tutor Copilot</h3>
                  <p className="text-[10px] text-slate-400">Ask about discrete parts, college lab setup, or hardware configurations</p>
                </div>
              </div>

              {/* Message scroll space */}
              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">
                      {msg.sender === 'user' ? 'You' : 'Tutoring Copilot AI'}
                    </span>
                    <div className={`max-w-[80%] p-4 rounded-2xl text-xs leading-relaxed font-semibold ${
                      msg.sender === 'user'
                        ? 'bg-indigo-650 text-white rounded-tr-none shadow-md'
                        : 'bg-slate-800/50 text-slate-200 rounded-tl-none border border-slate-750'
                    }`}>
                      {msg.text.split('\n').map((para, idx) => (
                        <p key={idx} className={idx > 0 ? 'mt-2' : ''}>{para}</p>
                      ))}
                    </div>

                    {/* Inline product listings recommendations inside conversation bubble */}
                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="w-full max-w-[80%] mt-3 space-y-2">
                        <span className="text-[9px] font-bold text-indigo-400 uppercase tracking-wider block">Recommended Parts:</span>
                        {msg.recommendations.map(p => (
                          <div
                            key={p.id}
                            className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/40 flex items-center justify-between gap-3 shadow-sm"
                          >
                            <div className="min-w-0">
                              <h5 className="text-xs font-bold truncate">{p.name}</h5>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="font-mono text-[9px] text-slate-400">{p.sku}</span>
                                <span className="text-xs font-extrabold text-indigo-300">{formatPrice(p.price)}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => {
                                cart.addToCart(p);
                                showToast(`Added ${p.name} to cart!`);
                              }}
                              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-[10px] font-bold transition-all"
                            >
                              Add to Cart
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isAiThinking && (
                  <div className="flex flex-col items-start">
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Tutoring Copilot AI</span>
                    <div className="p-3.5 rounded-2xl rounded-tl-none border border-slate-750 bg-slate-800/50 text-indigo-400 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-current rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                )}
                
                <div ref={chatEndRef} />
              </div>

              {/* Suggestion prompt panel */}
              <div className="px-6 py-2.5 border-t border-slate-850 flex flex-wrap gap-1.5 bg-slate-950/10">
                {[
                  { label: "What is a capacitor?", text: "What is a capacitor and why do I need one?" },
                  { label: "Explain SSD vs HDD", text: "Explain the difference between SSD and HDD storage" },
                  { label: "Robotics kit under ₹5000", text: "I want to build a robotics car, show me kits under ₹5000" },
                  { label: "What is ATmega328P?", text: "What is the ATmega328P microcontroller chip?" }
                ].map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setAiQuery(sug.text);
                      handleSendAiMessage(sug.text);
                    }}
                    className="px-2.5 py-1.5 rounded-lg text-[10px] font-bold border border-slate-800 bg-slate-950/30 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-all cursor-pointer"
                  >
                    {sug.label}
                  </button>
                ))}
              </div>

              {/* Input section */}
              <div className="p-4.5 border-t border-slate-800 bg-slate-950/30">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendAiMessage(aiQuery);
                  }}
                  className="flex space-x-2"
                >
                  <input
                    type="text"
                    value={aiQuery}
                    onChange={e => setAiQuery(e.target.value)}
                    placeholder="Ask any electronics Q&A, or type component requirements..."
                    className="flex-grow px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-slate-800 bg-slate-950 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-md shimmer-btn"
                  >
                    Ask Tutor
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>

        {/* 3. MOBILE BOTTOM NAVIGATION BAR (Hidden on Desktop) */}
        <nav className={`md:hidden fixed bottom-0 inset-x-0 h-16 border-t flex items-center justify-around z-40 ${
          isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <button
            onClick={() => setActiveSubTab('catalog')}
            className={`flex flex-col items-center space-y-1 text-slate-400 ${
              activeSubTab === 'catalog' ? 'text-indigo-500' : ''
            }`}
          >
            <Icons.Catalog />
            <span className="text-[9px] font-bold uppercase">Store</span>
          </button>

          <button
            onClick={() => setActiveSubTab('ai')}
            className={`flex flex-col items-center space-y-1 text-slate-400 ${
              activeSubTab === 'ai' ? 'text-indigo-500' : ''
            }`}
          >
            <Icons.Spark />
            <span className="text-[9px] font-bold uppercase">AI Assistant</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="flex flex-col items-center space-y-1 text-slate-400 relative"
          >
            <Icons.Cart />
            <span className="text-[9px] font-bold uppercase">Cart</span>
            {cart.cartItemCount > 0 && (
              <span className="absolute -top-1 right-2 bg-rose-500 text-white text-[8px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.cartItemCount}
              </span>
            )}
          </button>

          {userRole === 'admin' && (
            <button
              onClick={onNavigateToAdmin}
              className="flex flex-col items-center space-y-1 text-slate-400"
            >
              <Icons.Admin />
              <span className="text-[9px] font-bold uppercase">Admin</span>
            </button>
          )}
        </nav>

      </div>

      {/* DETAIL MODAL / DRAWER */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm transition-all duration-300">
          <div className={`relative w-full max-w-3xl border shadow-2xl overflow-hidden animate-scale-up hud-panel ${
            isDarkMode ? 'border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            {renderHudCorners()}
            
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-10 p-1.5 rounded-full hover:bg-slate-800/40 text-slate-400 hover:text-slate-200 transition-colors"
            >
              <Icons.Close />
            </button>

            <div className="md:grid md:grid-cols-12">
              <div className="md:col-span-5 bg-slate-950 aspect-square md:h-full relative">
                {selectedProduct.images && selectedProduct.images[0] && !selectedProduct.images[0].startsWith('/demo') && !selectedProduct.images[0].startsWith('/placeholder') ? (
                  <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="w-full h-full object-cover md:absolute md:inset-0" />
                ) : (
                  renderFallbackImage(selectedProduct, "w-full h-full md:absolute md:inset-0")
                )}
              </div>

              <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between max-h-[90vh] overflow-y-auto">
                <div>
                  <div className="flex items-center space-x-2.5 mb-2">
                    <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
                      {selectedProduct.category}
                    </span>
                    <span className="font-mono text-xs text-slate-400 font-semibold">{selectedProduct.sku}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">{selectedProduct.name}</h2>
                  <div className="mt-3 text-2xl font-extrabold text-indigo-400">{formatPrice(selectedProduct.price)}</div>
                  
                  <p className="text-xs leading-relaxed text-slate-450 mt-4">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-6">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 border-b border-slate-800 pb-1">Technical Specifications</h4>
                    {selectedProduct.specifications.kitItems ? (
                      <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                        {selectedProduct.specifications.kitItems.map((item: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-2 text-xs font-medium text-slate-300 bg-slate-950/40 p-2 rounded-lg border border-slate-850">
                            <span className="text-indigo-400 mt-0.5">▪</span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border border-slate-200 dark:border-slate-850 rounded-xl overflow-hidden">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-850 text-xs">
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-850">
                            {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                              <tr key={key} className="even:bg-slate-50 dark:even:bg-slate-850/30">
                                <td className="px-4 py-2 font-bold text-slate-400 uppercase tracking-wider w-1/3">{key.replace(/([A-Z])/g, ' $1')}</td>
                                <td className="px-4 py-2 font-semibold text-slate-200">{String(val)}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="text-xs font-bold">
                    <span className="text-slate-400 uppercase mr-1.5">Availability:</span>
                    <span className={selectedProduct.stockQuantity > 0 ? "text-emerald-400" : "text-rose-500"}>
                      {selectedProduct.stockQuantity > 0 ? `${selectedProduct.stockQuantity} units available` : "Out of Stock"}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      cart.addToCart(selectedProduct);
                      setSelectedProduct(null);
                      showToast(`Added ${selectedProduct.name} to cart!`);
                    }}
                    disabled={selectedProduct.stockQuantity === 0}
                    className="inline-flex items-center space-x-2 px-5 py-2.5 bg-indigo-650 hover:bg-indigo-700 disabled:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                  >
                    <Icons.Cart />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* SLIDE-OUT CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm animate-fade-in">
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className={`w-screen max-w-md border-l border-slate-200 dark:border-slate-800 flex flex-col justify-between shadow-2xl animate-slide-in hud-panel relative ${
              isDarkMode ? 'text-slate-100' : 'bg-white text-slate-800'
            }`}>
              {renderHudCorners()}
              
              <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-950/10">
                <h3 className="text-sm font-extrabold flex items-center space-x-2 tracking-wider">
                  <Icons.Cart />
                  <span>Shopping Cart Basket</span>
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-850 text-slate-400 transition-colors"
                >
                  <Icons.Close />
                </button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-4">
                {checkoutComplete ? (
                  <div className="py-20 text-center space-y-4">
                    <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/25 rounded-full flex items-center justify-center mx-auto text-emerald-400">
                      <Icons.Check />
                    </div>
                    <h4 className="text-sm font-bold">Purchase Successful!</h4>
                    <p className="text-xs text-slate-400">Your lab kits and component order has been mock processed.</p>
                  </div>
                ) : cart.cartItems.length === 0 ? (
                  <div className="py-20 text-center text-slate-500">
                    <p className="text-xs font-bold">Cart is empty</p>
                  </div>
                ) : (
                  cart.cartItems.map(item => (
                    <div
                      key={item.product.id}
                      className="flex space-x-4 p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950/15"
                    >
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0">
                        {item.product.images && item.product.images[0] && !item.product.images[0].startsWith('/demo') && !item.product.images[0].startsWith('/placeholder') ? (
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          renderFallbackImage(item.product)
                        )}
                      </div>
                      
                      <div className="flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold line-clamp-1">{item.product.name}</h4>
                          <span className="font-mono text-[8px] text-slate-500 uppercase">{item.product.sku}</span>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-1 bg-slate-800 p-0.5 rounded-lg">
                            <button
                              onClick={() => cart.updateQuantity(item.product.id, item.quantity - 1)}
                              className="p-1 rounded bg-slate-950 text-slate-400 hover:text-slate-100 transition-colors"
                            >
                              <Icons.Minus />
                            </button>
                            <span className="px-2 text-[10px] font-extrabold">{item.quantity}</span>
                            <button
                              onClick={() => cart.updateQuantity(item.product.id, item.quantity + 1)}
                              className="p-1 rounded bg-slate-950 text-slate-400 hover:text-slate-100 transition-colors"
                            >
                              <Icons.Plus />
                            </button>
                          </div>
                          <span className="text-xs font-extrabold">{formatPrice(item.product.price * item.quantity)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => cart.removeFromCart(item.product.id)}
                        className="text-slate-500 hover:text-rose-500 p-1.5 self-start transition-colors"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {!checkoutComplete && cart.cartItems.length > 0 && (
                <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-950/20">
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>Subtotal</span>
                      <span>{formatPrice(cart.cartTotal)}</span>
                    </div>
                    <div className="flex justify-between text-xs font-semibold text-slate-400">
                      <span>Lab kit shipping standard</span>
                      <span className="text-emerald-400">FREE</span>
                    </div>
                    <div className="flex justify-between text-xs font-extrabold pt-2 border-t border-slate-200 dark:border-slate-800">
                      <span>Grand Total</span>
                      <span className="text-indigo-400">{formatPrice(cart.cartTotal)}</span>
                    </div>
                  </div>

                  <form onSubmit={handleCheckout} className="space-y-3">
                    <input
                      type="email"
                      required
                      placeholder="Enter delivery email..."
                      className="w-full px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-800 bg-slate-950 text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                      type="submit"
                      className="w-full bg-indigo-650 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-xs shimmer-btn"
                    >
                      <span>Checkout Order</span>
                      <Icons.ArrowRight />
                    </button>
                  </form>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* GOKWIK SECURED CHECKOUT MODAL OVERLAY */}
      {isGokwikOpen && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className={`relative w-full max-w-md border shadow-2xl overflow-hidden transition-all duration-300 hud-panel ${
            isDarkMode ? 'border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
          }`}>
            {renderHudCorners()}
            
            {/* GoKwik Header */}
            <div className="px-5 py-4 border-b border-slate-250 dark:border-slate-850 flex items-center justify-between bg-slate-950/15">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm tracking-wider text-indigo-400">⚡ GoKwik</span>
                <span className="text-[9px] bg-indigo-500/10 text-indigo-300 border border-indigo-400/20 px-2 py-0.5 rounded-full font-bold">100% Secured Payment</span>
              </div>
              <button
                onClick={() => setIsGokwikOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-800/40 text-slate-400 hover:text-slate-250 transition-colors"
              >
                <Icons.Close />
              </button>
            </div>

            {/* Discount Promo Tagline */}
            <div className="bg-indigo-650/15 border-b border-indigo-500/20 px-5 py-2 text-center text-[10px] font-extrabold text-indigo-300">
              Unlock Extra Discount In Next Step
            </div>

            {/* PAYMENTS LOADING SCREEN */}
            {isPaying ? (
              <div className="p-12 text-center space-y-6 flex flex-col items-center justify-center min-h-[320px]">
                {paySuccess ? (
                  <div className="space-y-4 animate-scale-up">
                    <div className="w-16 h-16 bg-emerald-500/10 border-2 border-emerald-400 rounded-full flex items-center justify-center mx-auto text-emerald-450 text-3xl font-black">
                      <Icons.Check />
                    </div>
                    <h4 className="font-extrabold text-sm text-emerald-400">Payment Successful!</h4>
                    <p className="text-[10px] text-slate-500">Order Ref: EN-82931 is processed securely.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
                    <h4 className="font-extrabold text-sm">Verifying transaction securely...</h4>
                    <p className="text-[10px] text-slate-500">Please do not refresh this window</p>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* STEP 1: MOBILE LOGIN & COUPON */}
                {gokwikStep === 1 && (
                  <div className="p-6 space-y-6">
                    
                    {/* Collapsible Order Summary fold */}
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-950/20 overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setIsGokwikSummaryExpanded(!isGokwikSummaryExpanded)}
                        className="w-full p-4 flex justify-between items-center text-xs font-bold focus:outline-none"
                      >
                        <span className="text-slate-400 flex items-center gap-1.5">
                          Order Summary ({cart.cartItemCount} item)
                          <span className="text-[9px] text-slate-500 font-bold">{isGokwikSummaryExpanded ? '▲' : '▼'}</span>
                        </span>
                        <span className="text-indigo-400 font-extrabold">
                          {formatPrice(cart.cartTotal * (1 - appliedCouponVal / 100))}
                        </span>
                      </button>
                      
                      {isGokwikSummaryExpanded && (
                        <div className="px-4 pb-3 pt-1 border-t border-slate-850 space-y-2.5 max-h-32 overflow-y-auto">
                          {cart.cartItems.map(item => (
                            <div key={item.product.id} className="flex justify-between items-center text-[10px] font-semibold text-slate-350">
                              <span className="truncate max-w-[70%]">{item.product.name} (x{item.quantity})</span>
                              <span>{formatPrice(item.product.price * item.quantity)}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {isCouponApplied && (
                        <div className="flex justify-between items-center text-[10px] text-emerald-400 font-extrabold p-4 pt-1.5 border-t border-slate-850">
                          <span>Saved via Coupon</span>
                          <span>{formatPrice(cart.cartTotal * (appliedCouponVal / 100))} ({appliedCouponVal}% OFF)</span>
                        </div>
                      )}
                    </div>

                    {/* Coupon Entry Field */}
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase font-bold text-slate-500">Apply Discount Coupon</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="e.g. HBD, NEON20"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                          className="flex-grow px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-slate-800 bg-slate-950 text-slate-200 focus:outline-none"
                        />
                        {isCouponApplied ? (
                          <button
                            type="button"
                            onClick={() => {
                              setIsCouponApplied(false);
                              setAppliedCouponVal(0);
                              setCouponCode("");
                              showToast("Coupon removed");
                            }}
                            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all"
                          >
                            Remove
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              if (couponCode === "HBD" || couponCode === "NEON20") {
                                setIsCouponApplied(true);
                                setAppliedCouponVal(couponCode === "NEON20" ? 20 : 10);
                                showToast(`Coupon applied: ${couponCode === "NEON20" ? "20%" : "10%"} Off!`);
                              } else {
                                showToast("Invalid Coupon. Try 'HBD' or 'NEON20'");
                              }
                            }}
                            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all"
                          >
                            Apply
                          </button>
                        )}
                      </div>
                      <span className="text-[9px] text-slate-500 font-bold block">Available coupon code: HBD (10% OFF), NEON20 (20% OFF)</span>
                    </div>

                    {/* Mobile Login */}
                    <div className="space-y-3">
                      <div className="text-center font-bold text-xs text-slate-400">Login to Redeem Cash rewards</div>
                      <div className="flex border border-slate-850 rounded-xl overflow-hidden bg-slate-950">
                        <span className="px-3.5 py-3 border-r border-slate-850 text-xs font-bold text-slate-400 bg-slate-900/50 flex items-center">
                          +91
                        </span>
                        <input
                          type="tel"
                          maxLength={10}
                          placeholder="Enter Mobile number..."
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                          className="w-full px-4 py-3 text-xs font-semibold bg-transparent text-slate-200 focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Submit / Continue */}
                    <button
                      type="button"
                      disabled={phoneNumber.length !== 10}
                      onClick={() => setGokwikStep(2)}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-md text-xs flex items-center justify-center space-x-1"
                    >
                      <span>Continue Securely</span>
                      <Icons.ArrowRight />
                    </button>

                    {/* Badges footer */}
                    <div className="flex justify-center items-center gap-3 pt-2 text-[8px] text-slate-500 font-bold">
                      <span>🛡️ PCI DSS Certified</span>
                      <span>🔒 Secured Payments</span>
                      <span>✓ Verified Merchant</span>
                    </div>

                  </div>
                )}

                {/* STEP 2: SECURE OTP VERIFICATION */}
                {gokwikStep === 2 && (
                  <div className="p-6 space-y-6 text-center">
                    <div className="w-12 h-12 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto text-indigo-400 text-xl border border-indigo-400/20">
                      🔒
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm">Verify number securely</h4>
                      <p className="text-[10px] text-slate-450 mt-1">Enter OTP sent to +91-{phoneNumber.slice(0, 5)} {phoneNumber.slice(5)}</p>
                    </div>

                    {/* 4 Digit Inputs */}
                    <div className="flex justify-center gap-3.5">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          id={`otp-${index}`}
                          type="text"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            const newOtp = [...otp];
                            newOtp[index] = val;
                            setOtp(newOtp);

                            // Move focus to next input
                            if (val && index < 3) {
                              const nextInput = document.getElementById(`otp-${index + 1}`);
                              nextInput?.focus();
                            }

                            // Auto verify and advance when all 4 boxes are populated
                            if (newOtp.join('').length === 4) {
                              setTimeout(() => {
                                setGokwikStep(3);
                                showToast("Mobile verified securely!");
                              }, 300);
                            }
                          }}
                          onKeyDown={(e) => {
                            // Backspace move focus back
                            if (e.key === 'Backspace' && !otp[index] && index > 0) {
                              const prevInput = document.getElementById(`otp-${index - 1}`);
                              prevInput?.focus();
                            }
                          }}
                          className="w-12 h-12 text-center text-lg font-extrabold rounded-xl border border-slate-800 bg-slate-950 text-indigo-400 focus:border-indigo-500 focus:outline-none"
                        />
                      ))}
                    </div>

                    {/* Timer details */}
                    <div className="text-[10px] font-bold text-slate-500">
                      {otpTimer > 0 ? (
                        <span>Resend OTP in 00:{otpTimer < 10 ? `0${otpTimer}` : otpTimer}</span>
                      ) : (
                        <button
                          onClick={() => {
                            setOtpTimer(25);
                            showToast("New OTP sent!");
                          }}
                          className="text-indigo-400 hover:text-indigo-300"
                        >
                          Resend OTP Code
                        </button>
                      )}
                    </div>

                    {/* Verification Actions */}
                    <div className="space-y-2">
                      <button
                        type="button"
                        onClick={() => {
                          setOtp(["1", "2", "3", "4"]);
                          setTimeout(() => {
                            setGokwikStep(3);
                            showToast("Demo OTP verified!");
                          }, 300);
                        }}
                        className="w-full bg-indigo-650/10 hover:bg-indigo-650/20 text-indigo-400 border border-indigo-500/20 font-bold py-3 rounded-xl text-xs transition-all shadow-md"
                      >
                        Auto Fill OTP (Demo)
                      </button>
                      <button
                        type="button"
                        onClick={() => setGokwikStep(1)}
                        className="text-[10px] font-bold text-slate-400 hover:text-slate-200 block mx-auto"
                      >
                        Edit Phone Number
                      </button>
                    </div>

                  </div>
                )}

                {/* STEP 3: SCAN UPI & SELECT PAYMENTS */}
                {gokwikStep === 3 && (
                  <div className="p-6 space-y-6">
                    
                    {/* QR Code Scan fold */}
                    <div className="text-center p-5 rounded-2xl border border-slate-200 dark:border-slate-850 bg-slate-950/20">
                      <div className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-wider mb-3">Scan QR to pay with UPI App</div>
                      
                      {/* Generated SVG QR Code */}
                      <div className="p-3 bg-white rounded-xl inline-block shadow-md">
                        <svg className="w-28 h-28 text-slate-900" viewBox="0 0 100 100" fill="currentColor">
                          <rect x="0" y="0" width="30" height="30" />
                          <rect x="5" y="5" width="20" height="20" fill="white" />
                          <rect x="10" y="10" width="10" height="10" />
                          
                          <rect x="70" y="0" width="30" height="30" />
                          <rect x="75" y="5" width="20" height="20" fill="white" />
                          <rect x="80" y="10" width="10" height="10" />
                          
                          <rect x="0" y="70" width="30" height="30" />
                          <rect x="5" y="75" width="20" height="20" fill="white" />
                          <rect x="10" y="80" width="10" height="10" />

                          <rect x="70" y="70" width="10" height="10" />
                          
                          <rect x="35" y="5" width="5" height="5" />
                          <rect x="45" y="0" width="10" height="5" />
                          <rect x="60" y="10" width="5" height="15" />
                          <rect x="35" y="20" width="15" height="5" />
                          <rect x="55" y="25" width="5" height="5" />
                          <rect x="5" y="35" width="5" height="10" />
                          <rect x="20" y="45" width="15" height="5" />
                          <rect x="0" y="55" width="10" height="5" />
                          
                          <rect x="35" y="35" width="30" height="30" />
                          <rect x="40" y="40" width="10" height="10" fill="white" />
                          <rect x="55" y="55" width="5" height="5" fill="white" />
                          
                          <rect x="75" y="35" width="10" height="5" />
                          <rect x="85" y="45" width="5" height="10" />
                          <rect x="70" y="55" width="15" height="5" />
                          <rect x="35" y="75" width="5" height="15" />
                          <rect x="45" y="85" width="15" height="5" />
                          <rect x="60" y="70" width="5" height="10" />
                          <rect x="85" y="80" width="10" height="10" />
                        </svg>
                      </div>

                      <div className="text-[9px] text-slate-550 dark:text-slate-400 font-bold mt-3">QR valid for 14:48 mins</div>
                      <div className="flex justify-center gap-2 mt-2">
                        <span className="text-[8px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400 font-bold">GPay</span>
                        <span className="text-[8px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400 font-bold">PhonePe</span>
                        <span className="text-[8px] bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-400 font-bold">Paytm</span>
                      </div>
                    </div>

                    {/* Alternative Payment Options */}
                    <div className="space-y-2">
                      <div className="text-[9px] font-bold text-slate-500 uppercase">Other Payment Methods</div>
                      {[
                        { label: "Debit/Credit Cards", details: "Visa, Mastercard, RuPay" },
                        { label: "Netbanking", details: "All Indian Major Banks" },
                        { label: "Wallets", details: "Paytm, PhonePe, Amazon Pay" },
                        { label: "0% EMI on UPI & Cards", details: "Snapmint, Simpl, LazyPay" }
                      ].map((method, idx) => (
                        <button
                          key={idx}
                          onClick={handleGokwikComplete}
                          className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all hover:bg-indigo-650/5 hover:border-indigo-500/30 ${
                            isDarkMode ? 'border-slate-850 bg-slate-950/20' : 'border-slate-200 bg-slate-50'
                          }`}
                        >
                          <div>
                            <h5 className="text-xs font-bold">{method.label}</h5>
                            <p className="text-[9px] text-slate-500 font-medium">{method.details}</p>
                          </div>
                          <span className="text-xs font-extrabold text-slate-400">
                            {formatPrice(cart.cartTotal * (1 - appliedCouponVal / 100))} ›
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* User logged in details fold */}
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold pt-2 border-t border-slate-800/40">
                      <span>Logged in: +91-{phoneNumber}</span>
                      <button
                        onClick={() => {
                          setPhoneNumber("");
                          setGokwikStep(1);
                        }}
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        Logout
                      </button>
                    </div>

                  </div>
                )}
              </>
            )}

          </div>
        </div>
      )}

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-55 bg-indigo-600 border border-indigo-400 text-white font-bold text-xs px-5 py-3.5 rounded-2xl shadow-xl animate-fade-in flex items-center space-x-2">
          <Icons.Check />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating WhatsApp Support Widget */}
      <div className="fixed bottom-6 right-6 z-45">
        {/* Toggle Button */}
        <button
          onClick={() => setIsWhatsappOpen(!isWhatsappOpen)}
          className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105 border-2 border-emerald-450 animate-float"
        >
          <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.863-9.864.001-2.63-1.023-5.101-2.885-6.968C16.574 1.906 14.1 1.884 11.99 1.884c-5.44 0-9.865 4.42-9.867 9.864 0 1.902.5 3.753 1.458 5.378L2.617 21.03l3.03-.794zM16.92 14.24c-.27-.135-1.593-.786-1.84-.875-.246-.09-.425-.135-.605.135-.18.27-.697.876-.855 1.057-.158.18-.315.203-.585.068-2.708-1.353-4.468-3.076-5.317-4.542-.224-.388-.024-.599.176-.798.18-.178.4-.473.6-.71.2-.236.266-.405.4-.675.134-.27.067-.507-.034-.71-.1-.202-.855-2.062-1.17-2.822-.308-.741-.62-.64-.855-.652-.22-.012-.472-.015-.724-.015a1.39 1.39 0 00-1.012.472c-.346.38-1.323 1.293-1.323 3.153s1.355 3.65 1.545 3.9c.19.25 2.666 4.07 6.459 5.7 2.223.955 3.178.966 4.316.828.69-.084 2.124-.87 2.42-1.71a2.91 2.91 0 00.203-1.71c-.08-.135-.296-.27-.566-.405z" />
          </svg>
        </button>

        {/* Support Chat Popup */}
        {isWhatsappOpen && (
          <div className="absolute bottom-16 right-0 w-80 p-5 rounded-2xl border shadow-2xl animate-scale-up hud-panel text-left">
            {renderHudCorners()}
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-800 mb-4">
              <div className="relative">
                <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-450 border border-emerald-500/30">
                  💬
                </div>
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-slate-900"></div>
              </div>
              <div>
                <h4 className="text-xs font-black tracking-wide uppercase text-slate-100">WhatsApp Support</h4>
                <span className="text-[8px] text-emerald-400 font-extrabold uppercase tracking-widest">Active Operator</span>
              </div>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Direct Support Number</label>
                <input
                  type="text"
                  placeholder="e.g. 919999999999"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-2 rounded-xl text-xs font-bold border border-slate-850 bg-slate-950 text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Select Inquiry Subject</label>
                <select
                  value={whatsappTopic}
                  onChange={(e) => setWhatsappTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-bold border border-slate-850 bg-slate-950 text-slate-200 focus:outline-none"
                >
                  <option value="Processor CPU spec inquiry">Intel/AMD CPU Specifications</option>
                  <option value="College lab kit bulk procurement">College Kits Bulk Order</option>
                  <option value="Discrete parts inventory request">Resistors / Capacitors Order</option>
                  <option value="Shipping and tracking status">Shipping & Order Uplink Status</option>
                  <option value="General support conversation">General Engineering Support</option>
                </select>
              </div>

              <div>
                <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Additional Context (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Ask a question..."
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs font-semibold border border-slate-850 bg-slate-950 text-slate-200 focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={() => {
                  const name = loggedInUser || "Guest Client";
                  const text = `Hi Reddy Electronics, my name is ${name}. I have a query regarding "${whatsappTopic}". ${customMsg ? `Context: ${customMsg}` : ""}`;
                  const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
                  window.open(url, "_blank");
                  setIsWhatsappOpen(false);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-2.5 rounded-xl text-[10px] tracking-wider uppercase transition-all flex items-center justify-center space-x-1"
              >
                <span>Launch WhatsApp Chat</span>
                <span>🚀</span>
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
