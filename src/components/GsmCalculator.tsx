import { useState, useMemo, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Ruler, Sparkles, Scale, Info, Sliders, Check, Plus, Minus, BookOpen } from 'lucide-react';

interface MaterialConfig {
  name: string;
  defaultEpi: number;
  defaultPpi: number;
  defaultWarpNe: number;
  defaultWeftNe: number;
  defaultWarpCrimp: number;
  defaultWeftCrimp: number;
  typicalGsmRange: string;
  purpose: string;
}

const MATERIAL_PRESETS: Record<string, MaterialConfig> = {
  cotton: {
    name: 'Fine Cotton Percale',
    defaultEpi: 80,
    defaultPpi: 70,
    defaultWarpNe: 40,
    defaultWeftNe: 40,
    defaultWarpCrimp: 5.5,
    defaultWeftCrimp: 4.0,
    typicalGsmRange: '90 - 130 GSM',
    purpose: 'Shirtings, luxury bed linens, fine apparel.',
  },
  denim: {
    name: 'Heavy Cotton Denim',
    defaultEpi: 64,
    defaultPpi: 42,
    defaultWarpNe: 10,
    defaultWeftNe: 12,
    defaultWarpCrimp: 9.0,
    defaultWeftCrimp: 6.0,
    typicalGsmRange: '280 - 450 GSM',
    purpose: 'Jeans, premium outerwear, canvas gear.',
  },
  polyester: {
    name: 'Filament Polyester',
    defaultEpi: 110,
    defaultPpi: 90,
    defaultWarpNe: 60, // equivalent Ne
    defaultWeftNe: 60,
    defaultWarpCrimp: 3.5,
    defaultWeftCrimp: 2.5,
    typicalGsmRange: '70 - 110 GSM',
    purpose: 'Linings, technical sportswear, rainwear fabrics.',
  },
  linen: {
    name: 'Coarse Linen Weave',
    defaultEpi: 40,
    defaultPpi: 38,
    defaultWarpNe: 16,
    defaultWeftNe: 16,
    defaultWarpCrimp: 6.0,
    defaultWeftCrimp: 5.0,
    typicalGsmRange: '150 - 240 GSM',
    purpose: 'Summer drapery, table linen, breathable apparel.',
  },
};

interface YarnLibraryItem {
  name: string;
  category: string;
  warpNe: number;
  weftNe: number;
  description: string;
}

const YARN_LIBRARY: Record<string, YarnLibraryItem> = {
  merino_wool: {
    name: 'Superfine Merino Wool',
    category: 'Animal Fiber',
    warpNe: 54,
    weftNe: 54,
    description: 'High-end thermal baselayers, soft scarves, active winter wear.',
  },
  mulberry_silk: {
    name: 'Mulberry Silk (Filament)',
    category: 'Silk / Filament',
    warpNe: 100,
    weftNe: 100,
    description: 'Luxurious shimmering silk scarves, fine garments, premium linings.',
  },
  filament_polyester: {
    name: 'Polyester Filament Microfiber',
    category: 'Synthetics',
    warpNe: 75,
    weftNe: 75,
    description: 'Slick technical sportswear shells, lightweight liners, rainwear fabrics.',
  },
  combed_cotton_fine: {
    name: 'Fine Combed Cotton (Ring-Spun)',
    category: 'Cotton & Bast',
    warpNe: 40,
    weftNe: 40,
    description: 'Crisp luxury shirtings, lightweight sheets, high-end bed linens.',
  },
  combed_cotton_medium: {
    name: 'Medium Combed Cotton',
    category: 'Cotton & Bast',
    warpNe: 30,
    weftNe: 30,
    description: 'Standard elegant t-shirts, sheets, and breathable everyday wear.',
  },
  rugged_denim_cotton: {
    name: 'Coarse Indigo Weft Cotton',
    category: 'Cotton & Bast',
    warpNe: 10,
    weftNe: 12,
    description: 'Heavy rugged denims, workwear jackets, and robust utility canvas bags.',
  },
  pure_linen_heritage: {
    name: 'Heritage Flax Linen',
    category: 'Cotton & Bast',
    warpNe: 16,
    weftNe: 16,
    description: 'Textured canvas, heritage linen sheets, or breezy summer apparel.',
  },
  bamboo_viscose: {
    name: 'Bamboo Viscose / Rayon',
    category: 'Regenerated Cellulose',
    warpNe: 45,
    weftNe: 45,
    description: 'Silky smooth high-drape apparel, robes, and premium beach towels.',
  },
};

function AnimateCount({ value, decimals = 1, className = "" }: { value: number; decimals?: number; className?: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValueRef = useRef(value);

  useEffect(() => {
    const start = prevValueRef.current;
    const end = value;
    if (start === end) return;

    const duration = 350; // smooth 350ms speed
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Easing out quad
      const easeProgress = progress * (2 - progress);
      const current = start + (end - start) * easeProgress;
      
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
        prevValueRef.current = end;
      }
    };

    const handle = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(handle);
  }, [value]);

  return <span className={className}>{displayValue.toFixed(decimals)}</span>;
}

export default function GsmCalculator() {
  const [selectedPreset, setSelectedPreset] = useState<string>('cotton');
  const [selectedYarnLibraryKey, setSelectedYarnLibraryKey] = useState<string>('');
  const [epi, setEpi] = useState<number>(MATERIAL_PRESETS.cotton.defaultEpi);
  const [ppi, setPpi] = useState<number>(MATERIAL_PRESETS.cotton.defaultPpi);
  const [warpNe, setWarpNe] = useState<number>(MATERIAL_PRESETS.cotton.defaultWarpNe);
  const [weftNe, setWeftNe] = useState<number>(MATERIAL_PRESETS.cotton.defaultWeftNe);
  const [warpCrimp, setWarpCrimp] = useState<number>(MATERIAL_PRESETS.cotton.defaultWarpCrimp);
  const [weftCrimp, setWeftCrimp] = useState<number>(MATERIAL_PRESETS.cotton.defaultWeftCrimp);

  const applyPreset = (key: string) => {
    const preset = MATERIAL_PRESETS[key];
    setSelectedPreset(key);
    setSelectedYarnLibraryKey('');
    setEpi(preset.defaultEpi);
    setPpi(preset.defaultPpi);
    setWarpNe(preset.defaultWarpNe);
    setWeftNe(preset.defaultWeftNe);
    setWarpCrimp(preset.defaultWarpCrimp);
    setWeftCrimp(preset.defaultWeftCrimp);
  };

  // Real industrial textile GSM calculation
  // Formula: GSM = [Warp Weight + Weft Weight]
  // Warp weight (g/m²) = (EPI × 25.40 × 1.0936 × 453.59 × (1 + Crimp%/100)) / (Warp Ne × 840 × 0.9144) 
  // Simplified Coefficient: ~ 24.16e-3 (or precisely, 24.87 for exact cotton count crimped weight)
  const results = useMemo(() => {
    // Weight warp side
    const warpFactor = 24.868;
    const warpWeight = (epi * (1 + warpCrimp / 100) * warpFactor) / warpNe;
    
    // Weight weft side
    const weftWeight = (ppi * (1 + weftCrimp / 100) * warpFactor) / weftNe;
    
    const totalGsm = Math.round((warpWeight + weftWeight) * 10) / 10;
    
    // Convert to Ounces per Square Yard (oz/yd²)
    const ozSqYd = Math.round((totalGsm / 33.906) * 10) / 10;

    let fabricClass = 'Ultra Lightweight';
    let fabricClassColor = 'text-sky-400 bg-sky-950/40 border-sky-800/30';
    
    if (totalGsm >= 120 && totalGsm < 200) {
      fabricClass = 'Medium Weight';
      fabricClassColor = 'text-green-400 bg-green-950/40 border-green-800/30';
    } else if (totalGsm >= 200 && totalGsm < 300) {
      fabricClass = 'Heavyweight Canvas';
      fabricClassColor = 'text-amber-400 bg-amber-950/40 border-amber-800/30';
    } else if (totalGsm >= 300) {
      fabricClass = 'Super Heavyweight Denim / Industrial';
      fabricClassColor = 'text-rose-400 bg-rose-950/40 border-rose-800/30';
    }

    return {
      warpWeight: Math.round(warpWeight * 10) / 10,
      weftWeight: Math.round(weftWeight * 10) / 10,
      totalGsm,
      ozSqYd,
      fabricClass,
      fabricClassColor,
    };
  }, [epi, ppi, warpNe, weftNe, warpCrimp, weftCrimp]);

  return (
    <div id="gsm-calculator" className="liquid-glass-card-light">
      <div className="bg-gradient-to-r from-teal-900 to-emerald-950 p-6 text-white flex justify-between items-center">
        <div>
          <span className="text-xs bg-emerald-400 text-teal-950 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            Yarn Math & GSM
          </span>
          <h3 className="text-xl font-bold mt-1.5 flex items-center gap-2">
            <Scale className="w-5 h-5 text-emerald-300" />
            Fabric GSM Engineering Analyzer
          </h3>
          <p className="text-xs text-emerald-200 mt-1">
            Simulate and estimate structural fabric mass (GSM) given specific yarn configurations.
          </p>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Presets Grid */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2.5">
              Select Preset Fiber Target
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(MATERIAL_PRESETS).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => applyPreset(key)}
                  className={`flex flex-col text-left p-3 rounded-xl border-2 transition duration-200 ${
                    selectedPreset === key
                      ? 'border-emerald-600 bg-emerald-50/40 text-emerald-950'
                      : 'border-gray-100 bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-bold text-xs flex items-center gap-1.5 justify-between">
                    {config.name}
                    {selectedPreset === key && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                  </span>
                  <span className="text-[10px] text-gray-500 mt-1 line-clamp-1">{config.purpose}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders Grid */}
          <div className="space-y-4 pt-2">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-emerald-600" />
              Adjust Structure Matrices
            </h4>

            {/* EPI & PPI */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-100/80 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-600">Ends Per Inch (EPI / Warp)</span>
                  <span className="text-emerald-700 font-bold">{epi} threads</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEpi((prev) => Math.max(20, prev - 1));
                      setSelectedPreset('');
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-gray-250 text-gray-500 shadow-sm transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none shrink-0"
                    aria-label="Decrease EPI"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                  <input
                    type="range"
                    min="20"
                    max="160"
                    value={epi}
                    onChange={(e) => {
                      setEpi(parseInt(e.target.value));
                      setSelectedPreset('');
                    }}
                    className="flex-1 h-1.5 bg-gray-250 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setEpi((prev) => Math.min(160, prev + 1));
                      setSelectedPreset('');
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-gray-250 text-gray-500 shadow-sm transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none shrink-0"
                    aria-label="Increase EPI"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-100/80 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-600">Picks Per Inch (PPI / Weft)</span>
                  <span className="text-emerald-700 font-bold">{ppi} threads</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setPpi((prev) => Math.max(20, prev - 1));
                      setSelectedPreset('');
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-gray-250 text-gray-500 shadow-sm transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none shrink-0"
                    aria-label="Decrease PPI"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                  <input
                    type="range"
                    min="20"
                    max="160"
                    value={ppi}
                    onChange={(e) => {
                      setPpi(parseInt(e.target.value));
                      setSelectedPreset('');
                    }}
                    className="flex-1 h-1.5 bg-gray-255 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPpi((prev) => Math.min(160, prev + 1));
                      setSelectedPreset('');
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-gray-250 text-gray-500 shadow-sm transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none shrink-0"
                    aria-label="Increase PPI"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>

            {/* Yarn Library Dropdown */}
            <div className="bg-emerald-50/40 p-4 border border-emerald-100 rounded-xl space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
                  Yarn Library (Fiber Standards)
                </label>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Quick-Calibrate
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                <div>
                  <select
                    id="yarn-library-select"
                    value={selectedYarnLibraryKey}
                    onChange={(e) => {
                      const key = e.target.value;
                      setSelectedYarnLibraryKey(key);
                      if (key && YARN_LIBRARY[key]) {
                        const fiber = YARN_LIBRARY[key];
                        setWarpNe(fiber.warpNe);
                        setWeftNe(fiber.weftNe);
                        setSelectedPreset('');
                      }
                    }}
                    className="w-full text-xs font-semibold bg-white text-gray-800 rounded-lg p-2.5 border border-emerald-100 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer shadow-sm transition duration-150"
                  >
                    <option value="" disabled>-- Load Fiber Target Count --</option>
                    {Object.entries(YARN_LIBRARY).map(([key, item]) => (
                      <option key={key} value={key}>
                        {item.name} ({item.warpNe} Ne)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="text-[11px] leading-relaxed text-gray-600 bg-white/60 p-2.5 rounded-lg border border-emerald-100/30 flex items-center min-h-[42px]">
                  {selectedYarnLibraryKey && YARN_LIBRARY[selectedYarnLibraryKey] ? (
                    <div>
                      <span className="font-extrabold text-emerald-800 text-[10px] uppercase tracking-wider block leading-none mb-1">
                        {YARN_LIBRARY[selectedYarnLibraryKey].category}
                      </span>
                      <p className="m-0 leading-tight">
                        {YARN_LIBRARY[selectedYarnLibraryKey].description}
                      </p>
                    </div>
                  ) : (
                    <span className="italic text-gray-400">
                      💡 Choose Merino Wool, Silk, or Polyester to automatically populate the counts.
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Yarn count Warp/Weft */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-100/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600">Warp Yarn Count (Ne)</span>
                    <span className="text-emerald-700 font-bold">{warpNe} Ne</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setWarpNe((prev) => Math.max(6, prev - 1));
                        setSelectedPreset('');
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-gray-250 text-gray-500 shadow-sm transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none shrink-0"
                      aria-label="Decrease Warp Ne"
                    >
                      <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                    <input
                      type="range"
                      min="6"
                      max="120"
                      value={warpNe}
                      onChange={(e) => {
                        setWarpNe(parseInt(e.target.value));
                        setSelectedPreset('');
                      }}
                      className="flex-1 h-1.5 bg-gray-255 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setWarpNe((prev) => Math.min(120, prev + 1));
                        setSelectedPreset('');
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-gray-250 text-gray-500 shadow-sm transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none shrink-0"
                      aria-label="Increase Warp Ne"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 block mt-1.5">Lower count = thicker thread / heavier</span>
              </div>

              <div className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-100/80 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-gray-600">Weft Yarn Count (Ne)</span>
                    <span className="text-emerald-700 font-bold">{weftNe} Ne</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => {
                        setWeftNe((prev) => Math.max(6, prev - 1));
                        setSelectedPreset('');
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-gray-250 text-gray-500 shadow-sm transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none shrink-0"
                      aria-label="Decrease Weft Ne"
                    >
                      <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                    <input
                      type="range"
                      min="6"
                      max="120"
                      value={weftNe}
                      onChange={(e) => {
                        setWeftNe(parseInt(e.target.value));
                        setSelectedPreset('');
                      }}
                      className="flex-1 h-1.5 bg-gray-255 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setWeftNe((prev) => Math.min(120, prev + 1));
                        setSelectedPreset('');
                      }}
                      className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-gray-250 text-gray-500 shadow-sm transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none shrink-0"
                      aria-label="Increase Weft Ne"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 block mt-1.5">Sizing range fits lightweight sheets or thick denim</span>
              </div>
            </div>

            {/* Crimp Warp/Weft */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-100/80 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-600">Warp Take-up (Crimp %)</span>
                  <span className="text-emerald-700 font-bold">{warpCrimp}%</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setWarpCrimp((prev) => Math.max(1, Math.round((prev - 0.5) * 10) / 10));
                      setSelectedPreset('');
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-gray-250 text-gray-500 shadow-sm transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none shrink-0"
                    aria-label="Decrease Warp crimp"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                  <input
                    type="range"
                    min="1"
                    max="16"
                    step="0.5"
                    value={warpCrimp}
                    onChange={(e) => {
                      setWarpCrimp(parseFloat(e.target.value));
                      setSelectedPreset('');
                    }}
                    className="flex-1 h-1.5 bg-gray-255 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setWarpCrimp((prev) => Math.min(16, Math.round((prev + 0.5) * 10) / 10));
                      setSelectedPreset('');
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-gray-250 text-gray-500 shadow-sm transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none shrink-0"
                    aria-label="Increase Warp crimp"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50/50 p-3.5 rounded-xl border border-gray-100/80 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-600">Weft Take-up (Crimp %)</span>
                  <span className="text-emerald-700 font-bold">{weftCrimp}%</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setWeftCrimp((prev) => Math.max(1, Math.round((prev - 0.5) * 10) / 10));
                      setSelectedPreset('');
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-gray-250 text-gray-500 shadow-sm transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none shrink-0"
                    aria-label="Decrease Weft crimp"
                  >
                    <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                  <input
                    type="range"
                    min="1"
                    max="16"
                    step="0.5"
                    value={weftCrimp}
                    onChange={(e) => {
                      setWeftCrimp(parseFloat(e.target.value));
                      setSelectedPreset('');
                    }}
                    className="flex-1 h-1.5 bg-gray-255 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setWeftCrimp((prev) => Math.min(16, Math.round((prev + 0.5) * 10) / 10));
                      setSelectedPreset('');
                    }}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white hover:bg-emerald-50 active:bg-emerald-100 border border-gray-250 text-gray-500 shadow-sm transition hover:border-emerald-500 hover:text-emerald-600 focus:outline-none shrink-0"
                    aria-label="Increase Weft crimp"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-slate-900 text-white rounded-xl border-4 border-slate-950 shadow-inner overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
            <Ruler className="w-64 h-64 text-white rotate-12" />
          </div>

          <div className="space-y-4 z-10">
            <div className="flex items-center gap-1.5 text-xs text-slate-400 uppercase tracking-wider">
              <Info className="w-3.5 h-3.5 text-teal-400" />
              Calculated Physical Metrics
            </div>

            {/* Mass Display */}
            <div className="bg-slate-950/80 rounded-2xl p-6 border border-slate-800 text-center relative overflow-hidden">
              <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">Estimated Fabric Weight</div>
              <div className="text-5xl font-black text-rose-400 font-mono tracking-tight flex items-baseline justify-center gap-1">
                <AnimateCount value={results.totalGsm} decimals={1} />
                <span className="text-lg font-bold text-slate-400">g/m²</span>
              </div>
              <div className="text-xs text-slate-400 mt-2 font-mono">
                Equivalent to <span className="font-bold text-white"><AnimateCount value={results.ozSqYd} decimals={1} /> oz/yd²</span> (ounces per sq yard)
              </div>
            </div>

            {/* Class Badge */}
            <div className={`p-3 rounded-lg border text-center text-xs font-bold transition duration-300 ${results.fabricClassColor}`}>
              Fabric Classification: {results.fabricClass}
            </div>

            {/* Secondary specs breakdown */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">Warp Contribution:</span>
                <span className="font-mono font-bold text-teal-300">
                  <AnimateCount value={results.warpWeight} decimals={1} /> g/m² ({Math.round((results.warpWeight / (results.totalGsm || 1)) * 100)}%)
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-800">
                <span className="text-slate-400">Weft Contribution:</span>
                <span className="font-mono font-bold text-emerald-300">
                  <AnimateCount value={results.weftWeight} decimals={1} /> g/m² ({Math.round((results.weftWeight / (results.totalGsm || 1)) * 100)}%)
                </span>
              </div>
              {selectedPreset && MATERIAL_PRESETS[selectedPreset] && (
                <div className="py-2 text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/50 mt-2">
                  <span className="font-bold text-amber-400 block mb-0.5">Typical Range for this presets:</span>
                  {MATERIAL_PRESETS[selectedPreset].typicalGsmRange} ({MATERIAL_PRESETS[selectedPreset].purpose})
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800 pt-4 flex gap-2 items-center text-[10px] text-slate-500 italic">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>Compiled under standard Pierce Yarn Geometry parameters for plain/twill weaves.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
