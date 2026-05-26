import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Settings, RefreshCw, Eye, Sparkles, HelpCircle } from 'lucide-react';

type WeavePatternType = 'plain' | 'twill21' | 'twill22' | 'satin' | 'custom';

// Custom physical modeling audio synthesizer for a realistic, pleasant loom click feedback
const playLoomClick = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const t = ctx.currentTime;
    
    // Slight pitch variation simulating real acoustic differences at different positions
    const pitchOffset = Math.random() * 24 - 12; // -12Hz to +12Hz
    
    // 1. Wood clack (shuttle impact oscillation)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(145 + pitchOffset, t);
    osc1.frequency.exponentialRampToValueAtTime(35, t + 0.08);
    
    gain1.gain.setValueAtTime(0.35, t);
    gain1.gain.exponentialRampToValueAtTime(0.01, t + 0.08);
    
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    
    // 2. High metallic tick (heald guide latch)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2200 + (pitchOffset * 4), t);
    osc2.frequency.exponentialRampToValueAtTime(800, t + 0.025);
    
    gain2.gain.setValueAtTime(0.09, t);
    gain2.gain.exponentialRampToValueAtTime(0.005, t + 0.025);
    
    osc2.connect(gain2);
    gain2.connect(ctx.destination);

    // 3. Sub kick-thump (loom frame weight resonance)
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'sine';
    osc3.frequency.setValueAtTime(65, t);
    osc3.frequency.exponentialRampToValueAtTime(10, t + 0.11);
    
    gain3.gain.setValueAtTime(0.25, t);
    gain3.gain.exponentialRampToValueAtTime(0.01, t + 0.11);
    
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    
    osc1.start(t);
    osc1.stop(t + 0.09);
    
    osc2.start(t);
    osc2.stop(t + 0.03);
    
    osc3.start(t);
    osc3.stop(t + 0.12);
  } catch (error) {
    console.error('Failed to trigger audio feedback:', error);
  }
};

export default function WeaveSimulator() {
  const [pattern, setPattern] = useState<WeavePatternType>('plain');
  const [warpColor, setWarpColor] = useState('#003366'); // BUTEX Navy
  const [weftColor, setWeftColor] = useState('#ffcc00'); // BUTEX Gold
  const [gridSize, setGridSize] = useState<number>(8);
  const [customGrid, setCustomGrid] = useState<boolean[][]>(
    Array(8).fill(null).map(() => Array(8).fill(false))
  );
  
  // Custom interactive click toggle for custom weave
  const handleCellClick = (row: number, col: number) => {
    // Play realistic loom wood/metal latch acoustic sound
    playLoomClick();

    if (pattern !== 'custom') {
      // Clone current active pattern into custom to let them edit it
      const currentGrid = activeGrid;
      const copy = currentGrid.map(r => [...r]);
      copy[row][col] = !copy[row][col];
      setCustomGrid(copy);
      setPattern('custom');
    } else {
      const copy = customGrid.map((r, ri) => 
        r.map((c, ci) => ri === row && ci === col ? !c : c)
      );
      setCustomGrid(copy);
    }
  };

  // Pre-configured standard weaves
  const activeGrid = useMemo(() => {
    const grid: boolean[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
    
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        if (pattern === 'plain') {
          // Plain weave: alternate warp goes over/under weft
          grid[r][c] = (r + c) % 2 === 0;
        } else if (pattern === 'twill21') {
          // Twill 2/1: (r - c) % 3 is 0 or 1
          grid[r][c] = (r - c + gridSize * 10) % 3 < 2;
        } else if (pattern === 'twill22') {
          // Twill 2/2: (r - c) % 4 is 0 or 1
          grid[r][c] = (r - c + gridSize * 10) % 4 < 2;
        } else if (pattern === 'satin') {
          // Five-harness Satin counter 2
          grid[r][c] = (r * 2 + c) % 5 === 0;
        } else if (pattern === 'custom') {
          // Ensure custom grid size matches current gridSize state
          return customGrid.slice(0, gridSize).map(row => row.slice(0, gridSize));
        }
      }
    }
    return grid;
  }, [pattern, gridSize, customGrid]);

  const resetSimulator = () => {
    setPattern('plain');
    setWarpColor('#003366');
    setWeftColor('#ffcc00');
    setGridSize(8);
    setCustomGrid(Array(8).fill(null).map(() => Array(8).fill(false)));
  };

  const currentPatternDetails = {
    plain: {
      name: 'Plain Weave (1/1)',
      description: 'The simplest and most common weave. Each warp yarn interlaces over/under alternate wefts. Produces a highly stable and durable fabric like Canvas and Muslin.',
      rigidity: 'Very High',
      durability: 'Excellent',
    },
    twill21: {
      name: 'Twill Weave (2/1)',
      description: 'Produces diagonal ridges on the surface of the fabric. Examples include Lightweight Gabardine. Offers excellent wear resistance and drapeability.',
      rigidity: 'Medium-High',
      durability: 'High',
    },
    twill22: {
      name: 'Twill Weave (2/2)',
      description: 'A balanced twill weave forming prominent diagonal lines (e.g., Denim, Chino). It is highly resilient, thick, and hides soil exceptionally well.',
      rigidity: 'Medium',
      durability: 'Very High',
    },
    satin: {
      name: 'Satin Weave (5-Harness)',
      description: 'Yarns float over several perpendicular threads before binding. Creates a smooth, continuous glowing surface with incredible drape but reduced snag resistance.',
      rigidity: 'Low',
      durability: 'Medium',
    },
    custom: {
      name: 'Custom Fabric Architecture',
      description: 'You are designing your own fabric weave pattern directly! Click on individual yarn intersections below to toggle between warp-up (warp over weft) and weft-up.',
      rigidity: 'Variable',
      durability: 'Variable',
    },
  };

  return (
    <div id="weave-simulation-tool" className="liquid-glass-card-light">
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 p-6 text-white flex justify-between items-center">
        <div>
          <span className="text-xs bg-amber-400 text-blue-950 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            BUTEX Lab Apparatus
          </span>
          <h3 className="text-xl font-bold mt-1.5 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-300" />
            Loom Interlacing Simulator
          </h3>
          <p className="text-xs text-blue-200 mt-1">
            Analyze warp/weft dynamics and structural interlacing ratios in real-time.
          </p>
        </div>
        <button
          onClick={resetSimulator}
          className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition duration-200 flex items-center justify-center"
          title="Reset Simulator"
        >
          <RefreshCw className="w-4 h-4 text-emerald-300" />
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weave Simulator Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Pattern Selector */}
          <div>
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
              Select Structure Weave
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {(['plain', 'twill21', 'twill22', 'satin', 'custom'] as WeavePatternType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setPattern(type)}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border-2 text-center transition duration-200 capitalize ${
                    pattern === type
                      ? 'bg-blue-900/10 border-blue-900 text-blue-950'
                      : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {type === 'twill21' ? 'Twill 2/1' : type === 'twill22' ? 'Twill 2/2' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Color Configuration */}
          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">
                Warp (Vertical Threads)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={warpColor}
                  onChange={(e) => setWarpColor(e.target.value)}
                  className="w-8 h-8 rounded border border-gray-200 cursor-pointer p-0"
                />
                <span className="text-xs text-mono font-bold text-gray-700">{warpColor}</span>
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">
                Weft (Horizontal Threads)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={weftColor}
                  onChange={(e) => setWeftColor(e.target.value)}
                  className="w-8 h-8 rounded border border-gray-200 cursor-pointer p-0"
                />
                <span className="text-xs text-mono font-bold text-gray-700">{weftColor}</span>
              </div>
            </div>
          </div>

          {/* Grid Density Slider */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Simulation Scale (Repeat Block)
              </label>
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                {gridSize} × {gridSize} Yarns
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="12"
              step="2"
              value={gridSize}
              onChange={(e) => {
                const ns = parseInt(e.target.value);
                setGridSize(ns);
                setCustomGrid(Array(ns).fill(null).map(() => Array(ns).fill(false)));
              }}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-900"
            />
          </div>

          {/* Detailed Structural Analysis */}
          <div className="bg-gradient-to-br from-gray-50 to-slate-100 p-4 rounded-xl border border-gray-100 space-y-3">
            <h4 className="text-sm font-bold text-blue-950 flex items-center gap-1.5 border-b border-gray-200/60 pb-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              {currentPatternDetails[pattern].name}
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              {currentPatternDetails[pattern].description}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white py-1.5 px-2.5 rounded border border-gray-200/50">
                <span className="text-[10px] text-gray-400 block font-semibold uppercase">Fabric Rigidity</span>
                <span className="text-xs font-bold text-gray-700">{currentPatternDetails[pattern].rigidity}</span>
              </div>
              <div className="bg-white py-1.5 px-2.5 rounded border border-gray-200/50">
                <span className="text-[10px] text-gray-400 block font-semibold uppercase">Snag & Wear resistance</span>
                <span className="text-xs font-bold text-gray-700">{currentPatternDetails[pattern].durability}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2D Grid & 3D Effect Visulization */}
        <div className="lg:col-span-7 flex flex-col justify-between items-center bg-slate-900 rounded-xl p-6 border-4 border-slate-950 shadow-inner relative overflow-hidden">
          {/* Loom weave visual background pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)`
          }} />

          <div className="text-center mb-4 z-10 w-full flex justify-between items-center px-2">
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide flex items-center gap-1">
              <Eye className="w-3.5 h-3.5 text-blue-400" />
              Interlacing Cross-Section View
            </span>
            <span className="text-[10px] text-emerald-400 font-mono tracking-wider flex items-center gap-1.5 bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-800/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              ACTIVE LAB LOAD
            </span>
          </div>

          {/* Responsive Simulation Grid Container */}
          <div className="relative p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 w-full max-w-[340px] aspect-square flex items-center justify-center shadow-2xl z-10">
            {/* Horizontal Weft threads running underneath or on top represented behind */}
            <div className="absolute inset-x-0 w-full flex flex-col justify-between h-[80%] pointer-events-none px-4 opacity-40">
              {Array.from({ length: gridSize }).map((_, idx) => (
                <div
                  key={`weft-line-${idx}`} 
                  className="w-full h-2.5 border-t border-b border-black/45"
                  style={{ backgroundColor: weftColor }}
                />
              ))}
            </div>

            {/* Vertical Warp threads */}
            <div className="absolute inset-y-0 h-full flex justify-between w-[80%] pointer-events-none py-4 opacity-40">
              {Array.from({ length: gridSize }).map((_, idx) => (
                <div 
                  key={`warp-line-${idx}`} 
                  className="h-full w-2.5 border-l border-r border-black/45"
                  style={{ backgroundColor: warpColor }}
                />
              ))}
            </div>

            {/* Grid Interlacing Interactive Points */}
            <div 
              className="grid gap-1.5 w-full h-full relative z-10" 
              style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
            >
              {activeGrid.map((rowArr, rowIndex) => (
                rowArr.map((isWarpOver, colIndex) => {
                  const threadColor = isWarpOver ? warpColor : weftColor;
                  return (
                    <motion.button
                      id={`cell-${rowIndex}-${colIndex}`}
                      key={`cell-${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className="relative rounded-md aspect-square shadow-md border border-black/20 focus:outline-none focus:ring-2 focus:ring-white/40 cursor-pointer overflow-hidden group"
                      style={{ backgroundColor: threadColor }}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {/* Yarn fiber micro-lines texture inside cell */}
                      <div 
                        className={`absolute inset-0 opacity-20 pointer-events-none ${
                          isWarpOver ? 'bg-gradient-to-b' : 'bg-gradient-to-r'
                        } from-white via-transparent to-black`} 
                      />
                      
                      {/* Fine threads weave pattern styling inside thread cells */}
                      <div 
                        className={`absolute inset-0 pointer-events-none opacity-20 ${
                          isWarpOver 
                            ? 'bg-[linear-gradient(to_right,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:3px_100%]'
                            : 'bg-[linear-gradient(to_bottom,rgba(255,255,255,0.35)_1px,transparent_1px)] bg-[size:100%_3px]'
                        }`}
                      />

                      {/* Floating Indicator on hover to demonstrate over/under */}
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-[8px] font-bold text-slate-900 uppercase">
                        {isWarpOver ? 'Warp' : 'Weft'}
                      </div>
                    </motion.button>
                  );
                })
              ))}
            </div>
          </div>

          {/* Legends */}
          <div className="mt-5 w-full flex items-center justify-center gap-6 text-xs text-slate-300 z-10 border-t border-slate-800 pt-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-md border border-black/25 flex items-center justify-center font-bold text-[8px]" style={{ backgroundColor: warpColor }}></span>
              <span>Warp In (Vertical)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-md border border-black/25 flex items-center justify-center font-bold text-[8px]" style={{ backgroundColor: weftColor }}></span>
              <span>Weft In (Horizontal)</span>
            </div>
            <div className="text-[10px] text-slate-400 italic flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              Click squares to weave
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
