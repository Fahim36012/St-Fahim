import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  MapPin, 
  Cpu, 
  Check, 
  Activity, 
  Layers, 
  GraduationCap, 
  Settings, 
  ChevronRight, 
  Lightbulb, 
  Calendar, 
  ArrowRight, 
  Send, 
  Mail, 
  Phone, 
  ExternalLink,
  MessageSquare,
  Facebook,
  Scissors,
  BookmarkCheck,
  CheckCircle2,
  FileText,
  Workflow,
  X
} from 'lucide-react';

import WeaveSimulator from './components/WeaveSimulator';
import GsmCalculator from './components/GsmCalculator';

// Import custom generated images
import heroWeave from './assets/images/hero_weave_navy_1779738952015.png';
import yarnWinding from './assets/images/yarn_winding_1779738971723.png';
import largeFabricRoll from './assets/images/large_fabric_roll_1779738989059.png';
import circularKnitting from './assets/images/circular_knitting_1779739007332.png';
import loomGears from './assets/images/loom_gears_1779739025971.png';
import macroFabric from './assets/images/macro_fabric_1779739042240.png';
import factoryFloor from './assets/images/factory_floor_1779739057934.png';
import shahrinShafaOwner from './assets/images/regenerated_image_1779788874277.jpg';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tag: string;
  category: string;
  longDetails: string[];
  results: string[];
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [heroVisualMode, setHeroVisualMode] = useState<'profile' | 'fabric'>('profile');

  // Custom Order state
  const [orderWarp, setOrderWarp] = useState('Cotton Ne 30');
  const [orderWeft, setOrderWeft] = useState('Cotton Ne 24');
  const [orderEpi, setOrderEpi] = useState(72);
  const [orderPpi, setOrderPpi] = useState(60);
  const [orderWeaveStyle, setOrderWeaveStyle] = useState('Twill 3/1');
  const [blueprintCode, setBlueprintCode] = useState<string | null>(null);
  const [generatingBlueprint, setGeneratingBlueprint] = useState(false);

  // Handle toast notifications
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) {
      triggerToast('Please provide your email and message!');
      return;
    }
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
      triggerToast('Message received! Shahrin will get back to you shortly.');
    }, 1500);
  };

  const handleGenerateBlueprint = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratingBlueprint(true);
    setTimeout(() => {
      const uniqueCode = `LOM-BUTEX-${Math.floor(1000 + Math.random() * 9000)}-${orderWeaveStyle.substring(0, 3).toUpperCase()}`;
      setBlueprintCode(uniqueCode);
      setGeneratingBlueprint(false);
      triggerToast('Loom blueprint successfully generated!');
    }, 1200);
  };

  const academicProjects: Project[] = [
    {
      id: 'sustainable-denim',
      title: 'Development of Sustainable Denim',
      subtitle: 'Graduate Thesis Research',
      description: 'Research focused on using organic cotton and eco-friendly dye extraction techniques to reduce water consumption in processing.',
      tag: 'Thesis Project',
      category: 'WEAVING & FINISHING',
      longDetails: [
        'Utilized natural indigo dyes harvested from local organic sources to minimize synthetic sulfur pollutants.',
        'Tested water retention and dye exhaustion rates across different mordant matrices to optimize absorption efficiency.',
        'Engineered a prototype 11oz denim twill weave using high-tension organic warp yarns.'
      ],
      results: [
        'Reduced chemical wash-off effluents by 42%.',
        'Decreased production fresh water volume requirements by 30% per wash cycle.',
        'Maintained colorfastness ratings above Grade 4 on standard gray scales.'
      ]
    },
    {
      id: 'knit-gsm-analysis',
      title: 'Analysis of Knit Structure GSM',
      subtitle: 'Practical Laboratory Investigation',
      description: 'A comparative study on how different stitch lengths and relaxation states affect Single Jersey fabric weight.',
      tag: 'Lab Project',
      category: 'KNITTING TECHNOLOGY',
      longDetails: [
        'Knitted Single Jersey patterns under varying tension guides on a multi-feed circular needle bed.',
        'Subjected samples to static, dynamic, and fully tumble wet relaxation treatments over 72 hours.',
        'Employed optical stitch scanners to calculate exact loop shapes and courses/wales ratios per unit yard.'
      ],
      results: [
        'Constructed precise regression curves indicating linear state stabilization coefficients.',
        'Empowered operators with calculated GSM compensation formulas based on heat-setting temperature ranges.'
      ]
    },
    {
      id: 'smart-fabrics',
      title: 'Smart Fabric Thermal Presentation',
      subtitle: 'Technical Case Study Assessment',
      description: 'Designed a theoretical model for phase-change materials integrated into active sports apparel.',
      tag: 'Case Study',
      category: 'TECHNICAL TEXTILES',
      longDetails: [
        'Modeled micro-encapsulated organic paraffin wax particles integrated into standard warp-knitted structures.',
        'Calculated latent heat storage and release thresholds tailored specifically to human cardiovascular output during high-end athletic movement.',
        'Proposed a multi-layered fabric laminate utilizing breathable polyurethane backing.'
      ],
      results: [
        'Simulated standard body temperature stability limits, showing prolonged thermal comfort up to 45 minutes.',
        'Optimized moisture vapor transmission rates of athletic apparel outlines.'
      ]
    },
    {
      id: 'factory-visit',
      title: 'Industrial Bulk Processes Analysis',
      subtitle: 'Work Experience & Field Study',
      description: 'Observed real-world bulk production processes including large-scale fabric winding, batch preparation, and automated machine controls.',
      tag: 'Field Experience',
      category: 'FACTORY OPERATIONS',
      longDetails: [
        'Mapped entire operational workflows from raw cone receipt to finished fabric inspection lines.',
        'Documented precision tension-controller limits inside high-speed carding and winding frames.',
        'Coordinated with production technicians on yarn fault classifications and warp breaks analysis.'
      ],
      results: [
        'Analyzed loom efficiency metrics, pinpointing machine tension failures during weather variations.',
        'Drafted a standard reference sheet for common weaving faults matching international standard codes.'
      ]
    }
  ];

  const factorySteps = [
    {
      title: 'Yarn Winding',
      desc: 'Forming optimal yarn packages with consistent tension controls to feed high-speed processors.',
      feature: 'Tension equalization',
      img: yarnWinding,
      machine: 'Precision Spooler'
    },
    {
      title: 'Beam Warping',
      desc: 'Organizing thousands of warp threads parallelly onto a major roller with uniform length.',
      feature: 'Beam formulation and size',
      img: macroFabric,
      machine: 'Direct Warper Beam'
    },
    {
      title: 'Knitting & Processing',
      desc: 'Rapid interlocking of yarn loops using high-fidelity automated machinery systems.',
      feature: 'Dual structure loops',
      img: circularKnitting,
      machine: 'Circular Knitting Frame'
    },
    {
      title: 'Weaving Shuttles',
      desc: 'Interlacing warp and weft yarns with metallic electronic shuttle controls in modern looms.',
      feature: 'High velocity pick rating',
      img: loomGears,
      machine: 'Air-Jet and Rapier Looms'
    },
    {
      title: 'Fabric Rolling',
      desc: 'Collecting bulk finished fabric in pristine structured rolls under continuous optical scanning.',
      feature: 'Optical defect scan',
      img: largeFabricRoll,
      machine: 'Batching Winder'
    },
    {
      title: 'Warehouse Dispatch',
      desc: 'Pristine sorting and inventory of certified knitted and woven rolls awaiting container export.',
      feature: 'Global shipping grades',
      img: factoryFloor,
      machine: 'Automated Log Stack'
    }
  ];

  return (
    <div className="min-h-screen text-[#e2e8f0] relative flex flex-col font-sans select-none tracking-wide animated-vibrant-bg">
      {/* Absolute fine weave grain and fibers running in the background */}
      <div className="fine-weave-overlay" />

      {/* Nav Header */}
      <header className="sticky top-0 z-50 bg-[#001c40]/80 backdrop-blur-md border-b border-[#053c7c]/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#ffcc00] to-[#e0a600] flex items-center justify-center text-[#001c40] font-black tracking-tighter text-lg shadow-lg">
              BTX
            </div>
            <div>
              <div className="font-extrabold text-white text-base leading-none tracking-tight">FABRIC DEV</div>
              <span className="text-[10px] text-[#ffcc00] font-mono leading-none">BUTEX GRADUATE PORTFOLIO</span>
            </div>
          </div>
          
          {/* Menu */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-200">
            <a href="#about" className="hover:text-[#ffcc00] transition duration-200">About</a>
            <a href="#skills" className="hover:text-[#ffcc00] transition duration-200">Skills</a>
            <a href="#projects" className="hover:text-[#ffcc00] transition duration-200">Projects</a>
            <a href="#weave-simulation-tool" className="hover:text-[#ffcc00] transition duration-200">Simulator</a>
            <a href="#gsm-calculator" className="hover:text-[#ffcc00] transition duration-200">GSM Lab</a>
            <a href="#equipment" className="hover:text-[#ffcc00] transition duration-200">Machinery</a>
            <a href="#contact" className="hover:text-[#ffcc00] transition duration-200 bg-[#ffcc00]/10 border border-[#ffcc00]/30 text-[#ffcc00] px-3.5 py-1.5 rounded-lg">Get In Touch</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-[#053c7c]/40 bg-gradient-to-b from-transparent to-[#001124]/60">
        {/* Parallax Background Image */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none opacity-[0.14] select-none scale-110"
          style={{
            transform: `translateY(${scrollY * 0.15}px) translateZ(0)`,
            backgroundImage: `url(${macroFabric})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform',
          }}
        />
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero left text info */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/60 border border-blue-800/40 text-xs font-bold text-sky-400">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffcc00] animate-pulse"></span>
              FOUNDER, OWNER & CHIEF FABRICS ENGINEER
            </div>
            
            <div className="space-y-3">
              <span className="text-[15px] font-bold text-slate-300 block tracking-widest uppercase">
                WELCOME TO MY DIGITAL FACTORY
              </span>
              <h1 className="hero-name" id="heroName">
                Shahrin Talukder Shafa
              </h1>
              <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-white via-[#ffcc00] to-teal-300 bg-clip-text text-transparent">
                Founder, Owner & Lead Fabrics Engineer
              </p>
            </div>
            
            <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
              Welcome to my digital textile domain and factory-scale laboratory. As the founder and chief engineer, I design advanced, high-performance fabric microstructures, weaving drafts, and loop kinematics. By combining academic textiles science at BUTEX with mathematical materials engineering, we manufacture the next generation of highly durable fabrics, smart apparel, and custom eco-friendly weaves.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a 
                href="#weave-simulation-tool" 
                className="px-6 py-3 bg-[#ffcc00] text-[#001c40] font-black rounded-xl hover:bg-white transition duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Cpu className="w-5 h-5" />
                Launch Weave Simulator
              </a>
              <a 
                href="#contact" 
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 font-bold rounded-xl transition duration-200 flex items-center gap-2 text-white"
              >
                <Mail className="w-4 h-4 text-emerald-400" />
                Contact Owner
              </a>
            </div>
          </div>

          {/* Hero Right Visual: Interactive Toggle between Shahrin Portrait & Fabric Weave */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center space-y-4">
            <div className="flex bg-[#001633]/80 p-1 rounded-xl border border-sky-900/40 w-full max-w-[420px]">
              <button 
                onClick={() => setHeroVisualMode('profile')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${heroVisualMode === 'profile' ? 'bg-[#ffcc00] text-[#001c40] shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                The Engineer & Owner
              </button>
              <button 
                onClick={() => setHeroVisualMode('fabric')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all duration-300 ${heroVisualMode === 'fabric' ? 'bg-[#ffcc00] text-[#001c40] shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                The Fabric Blueprint
              </button>
            </div>

            <div className="relative w-full max-w-[420px] aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl group liquid-glass-card">
              {/* Golden line scan animation */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#ffcc00] to-transparent w-full animate-[bounce_5s_infinite] z-20" />
              
              <AnimatePresence mode="wait">
                {heroVisualMode === 'profile' ? (
                  <motion.div 
                    key="owner-profile"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img 
                      src={shahrinShafaOwner} 
                      alt="Shahrin Talukder Shafa - Chief Fabrics Engineer" 
                      className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001124] via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-950/70 backdrop-blur-md p-3.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-widest block">Executive Leadership</span>
                      <span className="text-sm font-bold text-white block mt-0.5">Shahrin Talukder Shafa</span>
                      <span className="text-[11px] text-slate-300 block mt-0.5 font-mono">Founder, Site Owner & Lead Engineer</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="fabric-weave"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <img 
                      src={heroWeave} 
                      alt="Luxury Royal Blue Fabric Pattern" 
                      className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001124] via-transparent to-transparent opacity-70" />
                    <div className="absolute bottom-4 left-4 right-4 bg-slate-950/70 backdrop-blur-md p-3.5 rounded-xl border border-slate-800">
                      <span className="text-[10px] font-semibold text-amber-300 uppercase tracking-widest block">Fabric Microstructures</span>
                      <span className="text-sm font-bold text-white block mt-0.5">High-Density Warp Twill Weave</span>
                      <span className="text-[11px] text-slate-300 block mt-0.5 font-mono">Structural CAD Rendering No. 018</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-[#00152d]/90 relative animate-fade-in">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title text-white">About the Founder & Chief Engineer</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Dedicating state-of-the-art material science and robotic machinery controls to perfect weaving density, tensile stability, and high performance textiles.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Biography Details */}
            <div className="lg:col-span-7 liquid-glass-card p-8 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-amber-400" />
                  <h3 className="text-xl font-bold text-white">The Visionary fabrics Engineer & Site Owner</h3>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed">
                  As the sole owner and chief operator of this enterprise, <strong>Shahrin Talukder Shafa</strong> stands at the forefront of modern fabric engineering. Graduating from the prestigious <strong>Bangladesh University of Textiles (BUTEX)</strong>, she commands a deep mathematical understanding of warp-weft kinematics, fiber crystallinity ratios, yarn twist factors, and structural weaving dynamics.
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  She doesn't just manage bulk textiles—she engineers them on a cellular scale. Fabric engineering is the precise orchestration of tensile loads, moisture vapor coefficients, dynamic knitting stitches, and high-velocity weaving gear. Her skill is exceptional, proven by her ability to optimize loom shuttle speeds, program multi-feeder circular knitting needles, and calculate advanced GSM ratios under variable thermodynamic states.
                </p>
                <div className="p-4 rounded-xl bg-amber-400/5 border border-amber-400/20 text-xs text-amber-300 space-y-2">
                  <span className="font-extrabold block text-amber-200">Why Shahrin is uniquely good at Fabric Engineering:</span>
                  <p>
                    By combining CAD mathematical models with micro-structural testing, she accurately predicts fabric behavior before the loom yarn is even threaded. Her rigorous approach stabilizes shrinkage factors, maximizes dye exhaustions, and guarantees flawless mechanical let-offs under extreme bulk runs.
                  </p>
                </div>
              </div>

              {/* Research stats */}
              <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-slate-800/60">
                <div>
                  <div className="text-3xl font-extrabold text-[#ffcc00] font-mono leading-none">04+</div>
                  <span className="text-[10px] uppercase text-slate-400 block mt-1.5">Industrial Papers</span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#ffcc00] font-mono leading-none">12+</div>
                  <span className="text-[10px] uppercase text-slate-400 block mt-1.5">Machine Controls</span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-[#ffcc00] font-mono leading-none">BUTEX</div>
                  <span className="text-[10px] uppercase text-slate-400 block mt-1.5">Owner & Operator</span>
                </div>
              </div>
            </div>

            {/* Quick Specs card */}
            <div className="lg:col-span-5 liquid-glass-card p-8 flex flex-col justify-between">
              <h3 className="text-lg font-bold text-white border-b border-sky-950 pb-4 mb-4">
                Academic Specializations
              </h3>
              <ul className="space-y-4 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Sizing & Warp Preparation</span>
                    Calculating pick weights, sizing starch recipes, and maintaining uniform warp density margins.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Looms Mechanisms</span>
                    In-depth understanding of shed geometry, rapier feeds, air-jet pressures, and mechanical let-offs.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Structural CAD Analysis</span>
                    Simulating draft & peg plans for plain, twill, satin, honeycomb, crepe, and pile structures.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Knit Loop Formulations</span>
                    Loop length calculations, wale factor determinations, and computerized knitting alignments.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="py-20 bg-gradient-to-b from-[#00152d]/90 to-[#001124]/90 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-title text-white">Technical Skills</h2>
            <p className="text-sm text-slate-300">
              Rigorous engineering foundations covering advanced production formulas and manufacturing controls.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="liquid-glass-card p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-blue-900/40 flex items-center justify-center text-amber-400 font-bold mb-3">01</div>
                <h3 className="text-base font-bold text-white">Weaving Technology</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Mechanism of high-speed looms (Air-jet, Rapier, Projectile), CAD structures drafts, and warp tension calibrations.
                </p>
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mb-1">
                  <span>MASTERY RATING</span>
                  <span>95%</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-full rounded-full" style={{ width: '95%' }} />
                </div>
              </div>
            </div>

            <div className="liquid-glass-card p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-blue-900/40 flex items-center justify-center text-amber-400 font-bold mb-3">02</div>
                <h3 className="text-base font-bold text-white">Knitting Engineering</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Advanced loop formation, single/double jersey beds, warp knitting patterns (Tricot, Raschel), and structural relaxation.
                </p>
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mb-1">
                  <span>MASTERY RATING</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-full rounded-full" style={{ width: '90%' }} />
                </div>
              </div>
            </div>

            <div className="liquid-glass-card p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-blue-900/40 flex items-center justify-center text-amber-400 font-bold mb-3">03</div>
                <h3 className="text-base font-bold text-white">Fabric Testing & QC</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Expertise in GSM balances, tensile stretch indexes, pilling rates, tear strengths, and chemical colorfastness processes.
                </p>
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mb-1">
                  <span>MASTERY RATING</span>
                  <span>96%</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-full rounded-full" style={{ width: '96%' }} />
                </div>
              </div>
            </div>

            <div className="liquid-glass-card p-6 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-11 h-11 rounded-lg bg-blue-900/40 flex items-center justify-center text-amber-400 font-bold mb-3">04</div>
                <h3 className="text-base font-bold text-white">Technical Textiles</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Composite fabric architectures, phase-change thermal layers, medical bandages, and synthetic geotextiles calculations.
                </p>
              </div>
              <div className="mt-6">
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mb-1">
                  <span>MASTERY RATING</span>
                  <span>88%</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-teal-400 h-full rounded-full" style={{ width: '88%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Simulator Section heading */}
      <section className="py-16 bg-[#000e1f] relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono text-[#ffcc00] tracking-widest uppercase block">INTERACTIVE PLATFORM</span>
            <h2 className="text-3xl font-black text-white mt-1">Virtual Lab Bench</h2>
            <p className="text-sm text-slate-300">
              Experiment with real textile formulations directly inside this digital testing environment.
            </p>
          </div>
          
          <div className="space-y-12">
            <WeaveSimulator />
            <GsmCalculator />
          </div>
        </div>
      </section>

      {/* Academic Projects Section */}
      <section id="projects" className="py-20 bg-[#00152d]/95 relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="section-title text-white">Academic Projects</h2>
            <p className="text-sm text-slate-300">
              Detailed theoretical presentations, industrial laboratory studies, and sustainable thesis operations at BUTEX.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {academicProjects.map((project) => (
              <div 
                key={project.id}
                className="liquid-glass-card flex flex-col justify-between overflow-hidden"
              >
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest bg-sky-950/40 px-2.5 py-1 rounded border border-sky-800/20 font-mono">
                      {project.category}
                    </span>
                    <span className="text-[11px] font-bold text-[#ffcc00] font-sans">
                      {project.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white">{project.title}</h3>
                  <p className="text-xs text-[#ffcc00] font-semibold">{project.subtitle}</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{project.description}</p>
                </div>

                <div className="bg-[#001736] p-4 flex justify-between items-center border-t border-slate-900">
                  <span className="text-xs text-slate-400 font-mono">Lab Proven</span>
                  <button 
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-bold text-[#ffcc00] hover:text-white flex items-center gap-1 group transition duration-150"
                  >
                    View Project Blueprint
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition duration-150" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Detailed Drawer Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-[#001a3c] rounded-2xl border border-slate-800 w-full max-w-2xl overflow-hidden p-6 md:p-8 relative shadow-2xl space-y-6"
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              >
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-slate-900/80 hover:bg-slate-900 text-slate-400 hover:text-white rounded-lg border border-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#ffcc00] uppercase tracking-widest">{selectedProject.category}</span>
                  <h3 className="text-xl md:text-2xl font-black text-white">{selectedProject.title}</h3>
                  <p className="text-xs text-slate-400 font-mono">{selectedProject.subtitle}</p>
                </div>

                <div className="space-y-4 pt-1 border-t border-slate-800/80">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#ffcc00]" />
                    Engineering Steps
                  </h4>
                  <ul className="space-y-2.5 text-slate-300 text-sm">
                    {selectedProject.longDetails.map((detail, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-[#ffcc00] font-mono select-none shrink-0">[0{idx+1}]</span>
                        <span className="leading-relaxed">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-900 space-y-3">
                  <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                    <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                    Measured Lab Results
                  </h4>
                  <ul className="space-y-2 text-slate-300 text-xs font-medium">
                    {selectedProject.results.map((res, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 flex justify-end">
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2 bg-[#ffcc00] text-blue-950 text-xs font-black rounded-lg hover:bg-white transition duration-200"
                  >
                    Close Specs Reference
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Equipment Step-by-Step interactive and Gallery */}
      <section id="equipment" className="py-20 bg-gradient-to-b from-[#001124]/90 to-[#000a16]/95 relative text-center">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold text-amber-400 tracking-wider block uppercase">BULK MANUFACTURING WORKFLOWS</span>
            <h2 className="section-title text-white">Lab Equipment & Machinery</h2>
            <p className="text-sm text-slate-300">
              Interactive structural timelines illustrating machinery operations observed during laboratory tests and industrial attachments.
            </p>
          </div>

          {/* Stepper Timeline Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12 bg-[#001833]/80 p-2 rounded-xl max-w-5xl mx-auto border border-[#053c7c]/50">
            {factorySteps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`py-2 px-3 text-xs font-bold rounded-lg transition duration-200 shrink-0 ${
                  activeStep === idx
                    ? 'bg-[#ffcc00] text-[#001c40]'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                Task {idx + 1}: {step.title}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto liquid-glass-card p-8">
            {/* Step Left Machine Image Container */}
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-slate-900/80 shadow-lg">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeStep}
                  src={factorySteps[activeStep].img}
                  alt={factorySteps[activeStep].title}
                  className="w-full h-full object-cover shrink-0 select-none"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>
            </div>

            {/* Step Right details */}
            <div className="lg:col-span-6 text-left space-y-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-400/10 border border-amber-400/25 text-[10px] font-mono text-[#ffcc00] uppercase font-bold">
                <span className="w-1.5 h-1.5 bg-[#ffcc00] rounded-full"></span>
                STEP 0{activeStep + 1} OPERATIONS
              </div>
              
              <span className="text-xs text-slate-400 block font-bold uppercase tracking-wider font-mono">
                LOOM CLASS: {factorySteps[activeStep].machine}
              </span>
              <h3 className="text-xl font-bold text-white leading-none">
                {factorySteps[activeStep].title}
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                {factorySteps[activeStep].desc}
              </p>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-900 space-y-2">
                <span className="text-[10px] text-gray-400 block font-semibold uppercase">Operational Parameters Checked:</span>
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{factorySteps[activeStep].feature}</span>
                </div>
              </div>

              {/* Progress Slider actions */}
              <div className="flex items-center justify-between text-xs pt-4 border-t border-slate-800">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded bg-white/5 hover:bg-white/10 disabled:opacity-20 text-slate-300 text-[11px] font-bold"
                >
                  ◀ PREV TASK
                </button>
                <span className="text-xs text-slate-400 font-mono">STEP {activeStep + 1} OF 6</span>
                <button
                  disabled={activeStep === 5}
                  onClick={() => setActiveStep(prev => Math.min(5, prev + 1))}
                  className="px-3.5 py-1.5 rounded bg-[#ffcc00] text-[#001c40] disabled:opacity-20 text-[11px] font-bold"
                >
                  NEXT TASK ▶
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width interactive gallery */}
      <section className="py-20 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#ffcc00]">LABORATORY SCAN LOGS</h3>
            <h2 className="text-3xl font-black text-white mt-1">3D Production Slide-deck</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="gallery-item">
              <div className="gallery-card">
                <img src={heroWeave} alt="Landing Fabric" referrerPolicy="no-referrer" />
                <span className="gallery-caption bg-blue-950/90 border border-blue-900/60">Weaving Texture</span>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-card">
                <img src={yarnWinding} alt="Winding Machine" referrerPolicy="no-referrer" />
                <span className="gallery-caption bg-blue-950/90 border border-blue-900/60">Winding frame</span>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-card">
                <img src={largeFabricRoll} alt="Large Roll" referrerPolicy="no-referrer" />
                <span className="gallery-caption bg-blue-950/90 border border-blue-900/60">Large Roll storage</span>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-card">
                <img src={circularKnitting} alt="Fabric Drum" referrerPolicy="no-referrer" />
                <span className="gallery-caption bg-blue-950/90 border border-blue-900/60">Circular Knitting drum</span>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-card">
                <img src={loomGears} alt="Machine Detail" referrerPolicy="no-referrer" />
                <span className="gallery-caption bg-blue-950/90 border border-blue-900/60">Loom electronic gears</span>
              </div>
            </div>
            <div className="gallery-item">
              <div className="gallery-card">
                <img src={factoryFloor} alt="Operator and Rolls" referrerPolicy="no-referrer" />
                <span className="gallery-caption bg-blue-950/90 border border-blue-900/60">Production Floor</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Orders & Custom Creation Blueprint Generator */}
      <section className="py-20 bg-gradient-to-b from-[#000d1c] to-[#001733] border-t border-[#053c7c]/30 relative overflow-hidden">
        <div className="glass-anim-bubbles">
          <span className="bubble" style={{ '--i': 1 } as React.CSSProperties}></span>
          <span className="bubble" style={{ '--i': 2 } as React.CSSProperties}></span>
          <span className="bubble" style={{ '--i': 3 } as React.CSSProperties}></span>
          <span className="bubble" style={{ '--i': 4 } as React.CSSProperties}></span>
          <span className="bubble" style={{ '--i': 5 } as React.CSSProperties}></span>
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <div className="order-creation-glass">
            <div className="text-center space-y-3 mb-8">
              <span className="text-[10px] font-bold text-[#ffcc00] uppercase tracking-widest bg-[#ffcc00]/10 border border-[#ffcc00]/30 px-3 py-1 rounded-full">
                Custom Fabric Sourcing / Project Collaboration
              </span>
              <h2 className="text-2xl md:text-3xl font-black text-white">Order & Custom Creation</h2>
              <p className="text-xs md:text-sm text-slate-300 max-w-xl mx-auto">
                Need specialized woven prototypes, custom fabric samples, or wish to partner for research? Enter parameters to test our blueprint loom pipeline setup immediately!
              </p>
            </div>

            <form onSubmit={handleGenerateBlueprint} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Warp Fiber Count (E.g. Ne 30)</label>
                <input 
                  type="text" 
                  value={orderWarp}
                  onChange={(e) => setOrderWarp(e.target.value)}
                  className="w-full bg-[#001124] border border-slate-800 rounded-lg py-2 px-3 focus:outline-none focus:border-[#ffcc00] text-xs font-semibold"
                />
              </div>
              
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Weft Fiber Count (E.g. Ne 24)</label>
                <input 
                  type="text" 
                  value={orderWeft}
                  onChange={(e) => setOrderWeft(e.target.value)}
                  className="w-full bg-[#001124] border border-slate-800 rounded-lg py-2 px-3 focus:outline-none focus:border-[#ffcc00] text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Ends Per Inch (EPI)</label>
                <input 
                  type="number" 
                  value={orderEpi}
                  onChange={(e) => setOrderEpi(parseInt(e.target.value))}
                  className="w-full bg-[#001124] border border-slate-800 rounded-lg py-2 px-3 focus:outline-none focus:border-[#ffcc00] text-xs font-semibold"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Picks Per Inch (PPI)</label>
                <input 
                  type="number" 
                  value={orderPpi}
                  onChange={(e) => setOrderPpi(parseInt(e.target.value))}
                  className="w-full bg-[#001124] border border-slate-800 rounded-lg py-2 px-3 focus:outline-none focus:border-[#ffcc00] text-xs font-semibold"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[11px] font-bold uppercase text-slate-400 block mb-2">Select Weave Style Scheme</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {['Plain Weave', 'Twill 2/1', 'Twill 3/1', 'Sateen Weave'].map((style) => (
                    <button
                      type="button"
                      key={style}
                      onClick={() => setOrderWeaveStyle(style)}
                      className={`py-1.5 px-3 rounded-lg text-xs font-bold border ${
                        orderWeaveStyle === style
                          ? 'bg-[#ffcc00] text-blue-950 border-[#ffcc00]'
                          : 'bg-[#001124] border-slate-800 text-slate-300 hover:bg-slate-900'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2 pt-2">
                <button
                  type="submit"
                  disabled={generatingBlueprint}
                  className="w-full py-2.5 bg-[#ffcc00] text-blue-950 font-black text-xs uppercase tracking-wider rounded-lg transition duration-200 hover:bg-white disabled:opacity-50"
                >
                  {generatingBlueprint ? 'Analyzing Loom Feeds...' : 'Generate Factory Loom Blueprint'}
                </button>
              </div>
            </form>

            {/* Generated Loom Blueprint Blueprint response details */}
            <AnimatePresence>
              {blueprintCode && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.96, y: 15 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    borderColor: ["rgba(30, 41, 59, 1)", "rgba(255, 204, 0, 0.7)", "rgba(30, 41, 59, 1)"]
                  }}
                  exit={{ opacity: 0, scale: 0.96, y: -15 }}
                  transition={{ 
                    duration: 0.5,
                    borderColor: { duration: 1.2, ease: "easeInOut" }
                  }}
                  className="mt-6 bg-[#000a16] p-5 rounded-xl border border-slate-800 text-left font-mono space-y-3 shadow-[0_0_20px_rgba(255,204,0,0.05)]"
                >
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <motion.div
                        initial={{ scale: 0, rotate: -45 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 15,
                          delay: 0.1 
                        }}
                        className="bg-emerald-500/20 border border-emerald-500/35 p-1 rounded-full flex items-center justify-center text-emerald-400 shrink-0"
                      >
                        <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      </motion.div>
                      <span className="text-[11px] text-[#ffcc00] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <Workflow className="w-4 h-4 text-[#ffcc00]" />
                        FACTORY BLUEPRINT SYSTEM CONNECTED
                      </span>
                    </div>
                    <button 
                      onClick={() => setBlueprintCode(null)}
                      className="text-xs text-slate-400 hover:text-white"
                    >
                      CLEAR
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-xs">
                    <div><span className="text-slate-500">SYSTEM ID:</span> <span className="text-[#ffcc00]">{blueprintCode}</span></div>
                    <div><span className="text-slate-500">WEAVE SCHEME:</span> <span className="text-slate-200">{orderWeaveStyle}</span></div>
                    <div><span className="text-slate-500">WARP INPUT:</span> <span className="text-slate-200">{orderWarp} ({orderEpi} threads/inch)</span></div>
                    <div><span className="text-slate-500">WEFT INPUT:</span> <span className="text-slate-200">{orderWeft} ({orderPpi} threads/inch)</span></div>
                  </div>
                  
                  <motion.div 
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.25, duration: 0.3 }}
                    className="p-2.5 bg-emerald-950/20 text-emerald-400 border border-emerald-900/40 rounded text-[10px] tracking-wide leading-relaxed flex items-start gap-2.5"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
                      className="bg-emerald-500/20 text-emerald-300 p-1 rounded-full flex items-center justify-center shrink-0 border border-emerald-500/30 mt-0.5"
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                    </motion.div>
                    <div>
                      <span className="font-extrabold text-emerald-300 block mb-0.5 uppercase tracking-wider">Blueprint compilation success</span>
                      Ready for direct Air-Jet loom parsing. Connect this generated spec blueprint sheet during schedule consultations for rapid prototyping turnarounds.
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#001026] relative z-10 border-t border-[#053c7c]/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="section-title text-white">Contact Me</h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Open for executive structural development roles, research collaborations, technical textiles consults, and industrial attachments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Contact Details Left */}
            <div className="lg:col-span-5 space-y-6 liquid-glass-card p-8">
              <h3 className="text-lg font-bold text-white">Direct Channels</h3>
              
              <div className="space-y-4">
                <a href="mailto:shahrin.shefa99@gmail.com" className="flex items-center gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-900 text-slate-300 hover:text-white hover:border-[#ffcc00] transition duration-200">
                  <div className="w-10 h-10 rounded-lg bg-red-950/30 flex items-center justify-center text-red-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Email</span>
                    <span className="text-xs font-bold font-mono">shahrin.shefa99@gmail.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-900 text-slate-300">
                  <div className="w-10 h-10 rounded-lg bg-teal-950/30 flex items-center justify-center text-teal-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Phone</span>
                    <span className="text-xs font-bold font-mono">+880 1782 522 024</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-slate-950/40 p-4 rounded-xl border border-slate-900 text-slate-300">
                  <div className="w-10 h-10 rounded-lg bg-amber-950/30 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Location</span>
                    <span className="text-xs font-bold">BUTEX Hub, Dhaka, Bangladesh</span>
                  </div>
                </div>
              </div>

              {/* Verified links */}
              <div className="pt-6 border-t border-slate-800/80 space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Connect Digitally</h4>
                <div className="flex gap-4">
                  <a 
                    href="https://www.facebook.com/shaharin.shefa.2024" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#1877f2]/10 border border-[#1877f2]/30 text-[#1877f2] hover:bg-[#1877f2] hover:text-white px-3.5 py-2 rounded-lg text-xs font-bold transition duration-200"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </a>
                  <a 
                    href="https://wa.me/8801782522024" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-[#25d366]/10 border border-[#25d366]/30 text-[#25d366] hover:bg-[#25d366] hover:text-white px-3.5 py-2 rounded-lg text-xs font-bold transition duration-200"
                  >
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Simulated interactive contact form */}
            <div className="lg:col-span-7 liquid-glass-card p-8">
              <h3 className="text-lg font-bold text-white mb-6">Drop an Inquiry</h3>
              <form onSubmit={handleMessageSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Your Name</label>
                    <input 
                      type="text" 
                      placeholder="Jane Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ffcc00] text-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Your Email</label>
                    <input 
                      type="email" 
                      placeholder="jane@company.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      required
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ffcc00] text-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-slate-400 block mb-1">Your Message</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe you fabric parameters or collaboration proposal details..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-xl py-3 px-4 focus:outline-none focus:border-[#ffcc00] text-sm text-white resize-none"
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSending}
                  className="w-full py-3 bg-[#ffcc00] hover:bg-white text-blue-950 font-black text-xs uppercase tracking-wider rounded-xl transition duration-200 flex items-center justify-center gap-2"
                >
                  {isSending ? (
                    'Transmitting Message...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Secure Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-[#000a16] border-t border-[#053c7c]/40 text-slate-400 relative z-10 pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#ffcc00] flex items-center justify-center text-[#001c40] font-black italic tracking-tighter text-lg shadow-lg">
                BT
              </div>
              <span className="font-extrabold text-white text-lg tracking-wider">FABRIC ENGINEER</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Dedicated to designing cutting-edge, sustainable fabric structures at Bangladesh University of Textiles.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Lab Tools Included</h4>
            <ul className="space-y-2 text-slate-400 font-medium">
              <li><a href="#weave-simulation-tool" className="hover:text-amber-400">Interlacing Loom Simulator</a></li>
              <li><a href="#gsm-calculator" className="hover:text-amber-400">Yarn GSM Analyzer Gauge</a></li>
              <li><a href="#projects" className="hover:text-amber-400">Project Spec Blueprints</a></li>
            </ul>
          </div>

          <div className="md:col-span-4 space-y-3 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider">Institutional Address</h4>
            <p className="text-slate-400 leading-relaxed">
              Bangladesh University of Textiles (BUTEX),<br />
              92 Shaheed Tajuddin Ahmad Ave, Dhaka 1208, Bangladesh.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 border-t border-slate-900 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 font-medium gap-4">
          <p>© Shahrin Talukder Shefa 2026 | Fabric Engineer Shefa's Portfolio. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/shaharin.shefa.2024" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">Facebook Page</a>
            <span>•</span>
            <a href="https://wa.me/8801782522024" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">WhatsApp Chat</a>
          </div>
        </div>
      </footer>

      {/* Persistent reactive toast */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white rounded-xl shadow-2xl border border-slate-800 p-4 max-w-sm flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-950/80 border border-emerald-800/40 text-emerald-400 flex items-center justify-center shrink-0">
              <Check className="w-5 h-5 text-emerald-400" />
            </div>
            <p className="text-xs font-bold leading-normal">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
