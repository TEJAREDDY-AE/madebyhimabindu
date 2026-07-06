import React, { useState, useEffect } from 'react';
import { Product, getProducts, addProduct, updateProduct, deleteProduct } from '../services/productService';

const Icons = {
  Upload: () => <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>,
  Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>,
  Trash: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>,
  Store: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Close: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>,
  Database: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.58 4 8 4s8-1.79 8-4M4 7c0-2.21 3.58-4 8-4s8 1.79 8 4m0 5c0 2.21-3.58 4-8 4s-8-1.79-8-4" /></svg>,
  Search: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
};

interface AdminDashboardProps {
  isDarkMode: boolean;
  onNavigateToStore: () => void;
  onLogout: () => void;
  loggedInUser: string;
  bgTheme: string;
  setBgTheme: (theme: string) => void;
  currency: 'USD' | 'INR';
}

export default function AdminDashboard({ isDarkMode, onNavigateToStore, onLogout, loggedInUser, bgTheme, setBgTheme, currency }: AdminDashboardProps) {
  const renderHudCorners = () => (
    <>
      <div className="hud-corner hud-tl"></div>
      <div className="hud-corner hud-tr"></div>
      <div className="hud-corner hud-bl"></div>
      <div className="hud-corner hud-br"></div>
    </>
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Basic Form States
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [category, setCategory] = useState<'pc-components' | 'discrete-components' | 'college-kits'>("pc-components");
  const [subCategory, setSubCategory] = useState("ssd");
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [imageUrlInput, setImageUrlInput] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const formatPrice = (usdPrice: number) => {
    if (currency === 'INR') {
      return `₹${Math.round(usdPrice * 83).toLocaleString('en-IN')}`;
    }
    return `$${usdPrice.toFixed(2)}`;
  };

  const handleImageUrlAdd = () => {
    const clean = imageUrlInput.trim();
    if (clean) {
      setUploadedImages(prev => [...prev, clean]);
      setImageUrlInput("");
      showToast("Web image URL added to media!");
    }
  };

  // Category specific spec fields
  // PC Components
  const [capacity, setCapacity] = useState("");
  const [readSpeed, setReadSpeed] = useState("");
  const [writeSpeed, setWriteSpeed] = useState("");
  const [ramSpeed, setRamSpeed] = useState("");
  const ramType = "DDR5";
  const [gpuVram, setGpuVram] = useState("");
  const [interfaceType, setInterfaceType] = useState("");
  const formFactor = "";
  const [cpuSocket, setCpuSocket] = useState("");
  const [cpuCores, setCpuCores] = useState("");

  // Discrete Components
  const [resistance, setResistance] = useState("");
  const [capacitance, setCapacitance] = useState("");
  const [tolerance, setTolerance] = useState("±1%");
  const [powerRating, setPowerRating] = useState("");
  const [voltage, setVoltage] = useState("");
  const [packageType, setPackageType] = useState("");

  // College Kits list items
  const [kitItemInput, setKitItemInput] = useState("");
  const [kitItems, setKitItems] = useState<string[]>([]);
  const [experimentCount, setExperimentCount] = useState("");

  // Status Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = () => {
    setProducts(getProducts());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Drag and drop events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  const processFiles = (files: FileList) => {
    const newImages: string[] = [];
    
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) {
        showToast("Only image uploads are supported.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setUploadedImages(prev => [...prev, reader.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add Item to kitItems list
  const handleAddKitItem = () => {
    const clean = kitItemInput.trim();
    if (clean) {
      setKitItems(prev => [...prev, clean]);
      setKitItemInput("");
    }
  };

  // Remove Item from kitItems list
  const handleRemoveKitItem = (index: number) => {
    setKitItems(prev => prev.filter((_, i) => i !== index));
  };

  // Form Submission
  const handleSubmitProduct = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !sku || !price || !stockQuantity) {
      showToast("Please enter all required basic fields.");
      return;
    }

    // Build specs payload based on active category selection
    let specifications: { [key: string]: any } = {};

    if (category === "pc-components") {
      if (subCategory === "ssd") {
        specifications = { capacity, readSpeed, writeSpeed, interface: interfaceType, formFactor };
      } else if (subCategory === "ram") {
        specifications = { capacity, speed: ramSpeed, type: ramType };
      } else if (subCategory === "processor") {
        specifications = { socket: cpuSocket, cores: cpuCores };
      } else {
        specifications = { vram: gpuVram, interface: interfaceType };
      }
    } else if (category === "discrete-components") {
      if (subCategory === "resistor") {
        specifications = { resistance, tolerance, powerRating, package: packageType };
      } else if (subCategory === "capacitor") {
        specifications = { capacitance, tolerance, voltage, package: packageType };
      } else {
        specifications = { voltage, package: packageType };
      }
    } else if (category === "college-kits") {
      specifications = { kitItems, experiments: experimentCount };
    }

    const priceNum = parseFloat(price);
    const stockInt = parseInt(stockQuantity);

    if (isNaN(priceNum) || isNaN(stockInt)) {
      showToast("Invalid price or stock values.");
      return;
    }

    addProduct({
      name,
      sku,
      description,
      price: priceNum,
      stockQuantity: stockInt,
      category,
      subCategory,
      images: uploadedImages.length > 0 ? uploadedImages : ["/placeholder.png"],
      specifications
    });

    showToast("Product added to stock matrix database!");
    
    // Reset fields
    setName("");
    setSku("");
    setDescription("");
    setPrice("");
    setStockQuantity("");
    setUploadedImages([]);
    setKitItems([]);
    setCpuSocket("");
    setCpuCores("");
    
    // Refresh Inventory matrix table
    loadInventory();
  };

  // Inline table updater
  const handleInlineUpdate = (product: Product, field: 'price' | 'stockQuantity', value: string) => {
    const updated = { ...product };
    if (field === 'price') {
      const parsed = parseFloat(value);
      if (!isNaN(parsed)) {
        updated.price = parsed;
      }
    } else {
      const parsed = parseInt(value);
      if (!isNaN(parsed)) {
        updated.stockQuantity = parsed;
      }
    }
    updateProduct(updated);
    loadInventory();
  };

  // Delete product
  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      deleteProduct(id);
      showToast("Item deleted from catalog.");
      loadInventory();
    }
  };

  // Filter products for the Inventory matrix
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className={`min-h-screen font-sans cyber-grid smooth-gpu relative ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'} transition-colors duration-300`}>
      <div 
        className="cyber-backdrop-overlay"
        style={{
          backgroundImage: `linear-gradient(rgba(10, 15, 30, 0.94), rgba(6, 10, 20, 0.96)), url('/bg_${bgTheme}.png')`
        }}
      ></div>
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-indigo-600 border border-indigo-400 text-white font-bold text-sm px-5 py-3.5 rounded-2xl shadow-xl animate-fade-in flex items-center space-x-2">
          <Icons.Check />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Admin Panel Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200 shadow-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 text-white p-2 rounded-xl">
              <Icons.Database />
            </div>
            <div>
              <h1 className="font-extrabold text-lg tracking-tight">Console Control Panel</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Bulk uploads & Inventory Matrix</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Backdrop Theme selector for Admin */}
            <div className="hidden md:flex bg-slate-950/60 border border-slate-800 rounded-xl p-1 items-center space-x-1.5 mr-2">
              <span className="text-[8px] uppercase font-bold text-slate-500 px-1.5">Backdrop:</span>
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
                  className={`w-3.5 h-3.5 rounded-full ${item.color} border transition-all ${
                    bgTheme === item.code ? 'ring-2 ring-indigo-500 border-white scale-110' : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                  title={item.code}
                />
              ))}
            </div>

            <span className="hidden sm:inline text-xs font-bold text-slate-400 mr-2">
              👤 {loggedInUser || "Operator"}
            </span>
            <button
              onClick={onNavigateToStore}
              className={`inline-flex items-center space-x-2 px-4.5 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                isDarkMode 
                  ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-indigo-400' 
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-indigo-600 shadow-sm'
              }`}
            >
              <Icons.Store />
              <span>Go to Storefront</span>
            </button>
            <button
              onClick={onLogout}
              className="px-4.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all border border-rose-500/20 uppercase"
            >
              Disconnect
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className={`p-6 relative hud-panel ${isDarkMode ? 'border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            {renderHudCorners()}
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Stock Items</span>
            <span className="text-3xl font-extrabold text-indigo-500">{products.length} Listings</span>
          </div>
          <div className={`p-6 relative hud-panel ${isDarkMode ? 'border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            {renderHudCorners()}
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Critical Restocks Needed</span>
            <span className="text-3xl font-extrabold text-rose-500">
              {products.filter(p => p.stockQuantity < 15).length} Items
            </span>
          </div>
          <div className={`p-6 relative hud-panel ${isDarkMode ? 'border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
            {renderHudCorners()}
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Database Connection</span>
            <span className="text-3xl font-extrabold text-emerald-500">OFFLINE/LOCAL</span>
          </div>
        </div>

        {/* TWO COLUMN GRID: UPLOADER & FORM vs INVENTORY MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* UPLOAD FORM (Col Span 5) */}
          <section className={`lg:col-span-5 relative p-6 hud-panel ${
            isDarkMode ? 'border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            {renderHudCorners()}
            <h2 className="text-lg font-extrabold mb-5 pb-3 border-b border-slate-200 dark:border-slate-800">Add New Listing</h2>
            
            <form onSubmit={handleSubmitProduct} className="space-y-5">
              
              {/* Image Drag and Drop */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Product Media</label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all ${
                    isDragOver 
                      ? 'border-indigo-500 bg-indigo-500/5' 
                      : isDarkMode 
                        ? 'border-slate-800 bg-slate-950/40 hover:border-slate-700' 
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept="image/*"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center space-y-1.5 text-slate-400 hover:text-slate-200">
                    <Icons.Upload />
                    <span className="text-xs font-bold">Drag files here or browse folder</span>
                  </label>
                </div>
                
                {/* Image URL text uploader */}
                <div className="mt-3.5 flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Or paste direct image URL..."
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleImageUrlAdd();
                      }
                    }}
                    className={`flex-grow px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleImageUrlAdd}
                    className="px-3.5 py-2 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all"
                  >
                    Add
                  </button>
                </div>
                
                {/* Thumbnails preview */}
                {uploadedImages.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {uploadedImages.map((src, i) => (
                      <div key={i} className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-700">
                        <img src={src} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setUploadedImages(prev => prev.filter((_, idx) => idx !== i))}
                          className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-0.5"
                        >
                          <Icons.Close />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. 100k Ohm Resistor"
                    className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">SKU *</label>
                  <input
                    type="text"
                    required
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="e.g. RES-100K-10"
                    className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="1.99"
                    className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Stock Quantity *</label>
                  <input
                    type="number"
                    required
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(e.target.value)}
                    placeholder="500"
                    className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Details of the product package..."
                  rows={2}
                  className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>

              {/* Category selector */}
              <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200 dark:border-slate-800">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => {
                      const cat = e.target.value as any;
                      setCategory(cat);
                      // Default sub-categories based on category selection
                      if (cat === "pc-components") setSubCategory("ssd");
                      else if (cat === "discrete-components") setSubCategory("resistor");
                      else setSubCategory("lab-kit");
                    }}
                    className={`w-full px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <option value="pc-components">PC Components</option>
                    <option value="discrete-components">Discrete Components</option>
                    <option value="college-kits">College Kits</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Sub-category</label>
                  {category === "pc-components" && (
                    <select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <option value="ssd">SSD Storage</option>
                      <option value="ram">DDR RAM</option>
                      <option value="gpu">GPU Graphics Card</option>
                      <option value="processor">Processor (CPU)</option>
                    </select>
                  )}
                  {category === "discrete-components" && (
                    <select
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      className={`w-full px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      <option value="resistor">Resistor</option>
                      <option value="capacitor">Capacitor</option>
                      <option value="microcontroller">Microcontroller</option>
                      <option value="ic">IC Chips</option>
                    </select>
                  )}
                  {category === "college-kits" && (
                    <input
                      type="text"
                      value={subCategory}
                      onChange={(e) => setSubCategory(e.target.value)}
                      placeholder="lab-kit"
                      className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border focus:outline-none ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    />
                  )}
                </div>
              </div>

              {/* ADAPTIVE SPECIFICATIONS INPUT FIELDS */}
              <div className={`p-4.5 rounded-2xl border ${
                isDarkMode ? 'bg-slate-950/60 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Adaptive Specs</h4>
                
                {/* 1. PC Components - SSD Specs */}
                {category === "pc-components" && subCategory === "ssd" && (
                  <div className="space-y-3.5 animate-fade-in">
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Capacity</label>
                        <input type="text" placeholder="e.g. 2TB" value={capacity} onChange={e => setCapacity(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Interface</label>
                        <input type="text" placeholder="e.g. NVMe PCIe Gen4" value={interfaceType} onChange={e => setInterfaceType(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Read Speed</label>
                        <input type="text" placeholder="e.g. 7450 MB/s" value={readSpeed} onChange={e => setReadSpeed(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Write Speed</label>
                        <input type="text" placeholder="e.g. 6900 MB/s" value={writeSpeed} onChange={e => setWriteSpeed(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. PC Components - RAM Specs */}
                {category === "pc-components" && subCategory === "ram" && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Capacity</label>
                        <input type="text" placeholder="e.g. 32GB (2x16GB)" value={capacity} onChange={e => setCapacity(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Speed</label>
                        <input type="text" placeholder="e.g. 6000MHz" value={ramSpeed} onChange={e => setRamSpeed(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 2.5 PC Components - Processor Specs */}
                {category === "pc-components" && subCategory === "processor" && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Socket</label>
                        <input type="text" placeholder="e.g. LGA1700, AM5" value={cpuSocket} onChange={e => setCpuSocket(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Cores / Threads</label>
                        <input type="text" placeholder="e.g. 24 Cores / 32 Threads" value={cpuCores} onChange={e => setCpuCores(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. PC Components - GPU Specs */}
                {category === "pc-components" && subCategory === "gpu" && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">VRAM</label>
                        <input type="text" placeholder="e.g. 16GB GDDR6X" value={gpuVram} onChange={e => setGpuVram(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Interface</label>
                        <input type="text" placeholder="e.g. PCIe 4.0 x16" value={interfaceType} onChange={e => setInterfaceType(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Discrete - Resistor Specs */}
                {category === "discrete-components" && subCategory === "resistor" && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Resistance Value</label>
                        <input type="text" placeholder="e.g. 10k ohm" value={resistance} onChange={e => setResistance(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Power Rating</label>
                        <input type="text" placeholder="e.g. 0.25W (1/4W)" value={powerRating} onChange={e => setPowerRating(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3.5 mt-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Tolerance</label>
                        <input type="text" placeholder="e.g. ±1%" value={tolerance} onChange={e => setTolerance(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Package type</label>
                        <input type="text" placeholder="e.g. Axial" value={packageType} onChange={e => setPackageType(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Discrete - Capacitor Specs */}
                {category === "discrete-components" && subCategory === "capacitor" && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="grid grid-cols-2 gap-3.5">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Capacitance</label>
                        <input type="text" placeholder="e.g. 100uF" value={capacitance} onChange={e => setCapacitance(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Voltage rating</label>
                        <input type="text" placeholder="e.g. 25V" value={voltage} onChange={e => setVoltage(e.target.value)} className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'}`} />
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. College Kit - Multi Listing tags item list */}
                {category === "college-kits" && (
                  <div className="space-y-3.5 animate-fade-in">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1.5">Includes Kit Items *</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="e.g. Breadboard x1, LED x5..."
                          value={kitItemInput}
                          onChange={e => setKitItemInput(e.target.value)}
                          className={`flex-grow px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${
                            isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={handleAddKitItem}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-2 flex items-center justify-center transition-colors"
                        >
                          <Icons.Plus />
                        </button>
                      </div>

                      {/* Display items list as dynamic tags */}
                      {kitItems.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3 max-h-32 overflow-y-auto pr-1">
                          {kitItems.map((item, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold"
                            >
                              <span>{item}</span>
                              <button
                                type="button"
                                onClick={() => handleRemoveKitItem(idx)}
                                className="text-indigo-400 hover:text-red-400 transition-colors"
                              >
                                <Icons.Close />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Experiment Guide PDF projects count</label>
                      <input
                        type="text"
                        placeholder="e.g. 15 experiments guide included"
                        value={experimentCount}
                        onChange={e => setExperimentCount(e.target.value)}
                        className={`w-full px-2.5 py-1.5 rounded-lg text-xs font-semibold border focus:outline-none ${
                          isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-white border-slate-200'
                        }`}
                      />
                    </div>
                  </div>
                )}

              </div>

              {/* Submit listing */}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 text-xs"
              >
                <Icons.Check />
                <span>Save to Stock Matrix</span>
              </button>

            </form>
          </section>

          {/* INVENTORY SPREADSHEET MATRIX (Col Span 7) */}
          <section className={`lg:col-span-7 relative p-6 hud-panel ${
            isDarkMode ? 'border-slate-800' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            {renderHudCorners()}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-extrabold">Inventory Matrix</h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Edit price & stock live</p>
              </div>

              {/* Filters list */}
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Filter SKU or name..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className={`pl-8 pr-3 py-1.5 rounded-lg border text-xs font-semibold focus:outline-none ${
                      isDarkMode 
                        ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-slate-700' 
                        : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-slate-300'
                    }`}
                  />
                  <span className="absolute left-2.5 top-2.5 text-slate-500">
                    <Icons.Search />
                  </span>
                </div>

                <select
                  value={filterCategory}
                  onChange={e => setFilterCategory(e.target.value)}
                  className={`px-2 py-1.5 rounded-lg border text-xs font-bold focus:outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <option value="all">All Category</option>
                  <option value="pc-components">PC Parts</option>
                  <option value="discrete-components">Parts</option>
                  <option value="college-kits">Lab Kits</option>
                </select>
              </div>
            </div>

            {/* Matrix Data Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                <thead className="bg-slate-50 dark:bg-slate-900/60 font-bold text-slate-400">
                  <tr>
                    <th className="px-4 py-3 text-left">SKU</th>
                    <th className="px-4 py-3 text-left">Name</th>
                    <th className="px-4 py-3 text-center w-24">Price ($)</th>
                    <th className="px-4 py-3 text-center w-24">Stock Quantity</th>
                    <th className="px-4 py-3 text-center w-20">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-500">
                        No catalog listings registered matching active filter.
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map(p => (
                      <tr key={p.id} className="hover:bg-slate-100/10 transition-colors">
                        <td className="px-4 py-3 font-mono font-bold text-indigo-400 whitespace-nowrap">{p.sku}</td>
                        <td className="px-4 py-3 font-bold truncate max-w-xs">{p.name}</td>
                        
                        {/* Price Input (live modification) */}
                        <td className="px-2 py-2">
                          <div className="flex flex-col items-center gap-1">
                            <input
                              type="number"
                              step="0.01"
                              defaultValue={p.price.toFixed(2)}
                              onBlur={(e) => handleInlineUpdate(p, 'price', e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  handleInlineUpdate(p, 'price', (e.target as HTMLInputElement).value);
                                }
                              }}
                              className={`w-full px-2 py-1 text-center font-bold border rounded-lg focus:outline-none ${
                                isDarkMode 
                                  ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' 
                                  : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-300'
                              }`}
                            />
                            {currency === 'INR' && (
                              <span className="text-[10px] text-slate-500 font-bold whitespace-nowrap">
                                ≈ {formatPrice(p.price)}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Stock Input (live modification) */}
                        <td className="px-2 py-2">
                          <input
                            type="number"
                            defaultValue={p.stockQuantity}
                            onBlur={(e) => handleInlineUpdate(p, 'stockQuantity', e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleInlineUpdate(p, 'stockQuantity', (e.target as HTMLInputElement).value);
                              }
                            }}
                            className={`w-full px-2 py-1 text-center font-extrabold border rounded-lg focus:outline-none ${
                              isDarkMode 
                                ? 'bg-slate-950 border-slate-800 text-white focus:border-indigo-500' 
                                : 'bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-300'
                            }`}
                          />
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-3 text-center">
                          <button
                            type="button"
                            onClick={() => handleDelete(p.id)}
                            className="text-rose-500 hover:text-rose-700 p-1 rounded hover:bg-rose-500/10 transition-colors"
                          >
                            <Icons.Trash />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}
