import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { soundFx } from '../utils/soundEffects';
import {
  ArrowRight,
  Download,
  Linkedin,
  Github,
  MapPin,
  Code2,
  Cpu,
  Radio,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

type SiliconLayer = 'metal7' | 'metal4' | 'poly' | 'substrate';

export const Hero: React.FC = () => {
  const { data, theme, setIsResumeModalOpen } = usePortfolio();
  const [displayedText, setDisplayedText] = useState('');
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Interactive Die State
  const [activeTab, setActiveTab] = useState<'wafer' | 'rtl' | 'probe'>('wafer');
  const [activeLayer, setActiveLayer] = useState<SiliconLayer>('metal4');
  const [clockRunning, setClockRunning] = useState<boolean>(true);
  const [clockCycle, setClockCycle] = useState<number>(1042);
  const [selectedPin, setSelectedPin] = useState<string>('SPI_MOSI');
  const [pinVoltage, setPinVoltage] = useState<number>(3.3);
  const [cardTilt, setCardTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Subtitle typing loop
  useEffect(() => {
    const subtitles = data.subtitles.length > 0 ? data.subtitles : [data.title];
    const fullText = subtitles[currentSubtitleIndex % subtitles.length];

    const typingSpeed = isDeleting ? 35 : 75;
    const pauseTime = 1800;

    let timer: NodeJS.Timeout;

    if (!isDeleting && displayedText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setCurrentSubtitleIndex((prev) => (prev + 1) % subtitles.length);
    } else {
      timer = setTimeout(() => {
        setDisplayedText(
          isDeleting
            ? fullText.substring(0, displayedText.length - 1)
            : fullText.substring(0, displayedText.length + 1)
        );
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentSubtitleIndex, data.subtitles, data.title]);

  // Clock oscillation simulation
  useEffect(() => {
    if (!clockRunning) return;
    const interval = setInterval(() => {
      setClockCycle((c) => c + 1);
    }, 150);
    return () => clearInterval(interval);
  }, [clockRunning]);

  // Card 3D tilt mouse physics
  const handleMouseMoveTilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rx = ((y - centerY) / centerY) * -7;
    const ry = ((x - centerX) / centerX) * 7;
    setCardTilt({ rx, ry });
  };

  const handleMouseLeaveTilt = () => {
    setCardTilt({ rx: 0, ry: 0 });
  };

  const pins = [
    { name: 'VDD_1V05', type: 'PWR', v: 1.05, desc: 'Core Power Rail' },
    { name: 'GND_SUB', type: 'GND', v: 0.0, desc: 'Substrate Ground' },
    { name: 'CLK_3G', type: 'IN', v: 1.05, desc: '3.2GHz PLL Clock' },
    { name: 'RST_N', type: 'IN', v: 3.3, desc: 'Active-Low Reset' },
    { name: 'SPI_MOSI', type: 'IO', v: 3.3, desc: 'Flash Master Out' },
    { name: 'SPI_MISO', type: 'IO', v: 3.3, desc: 'Flash Master In' },
    { name: 'UART_TX', type: 'OUT', v: 3.3, desc: 'Serial Telemetry' },
    { name: 'LORA_RF', type: 'RF', v: 2.8, desc: '868MHz Mesh Link' },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background Silicon Grid & Laser Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-25 animate-pulse-slow ${
            theme === 'light' ? 'bg-cyan-300' : 'bg-cyan-600'
          }`}
        />
        <div
          className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            theme === 'light' ? 'bg-blue-200' : 'bg-blue-600'
          }`}
        />
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, #00f0ff 1px, transparent 1px), linear-gradient(to bottom, #00f0ff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Info Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status & Silicon Telemetry Badge */}
            <div className="inline-flex items-center gap-2 flex-wrap">
              <div
                className={`inline-flex items-center gap-3 p-2 px-3.5 rounded-2xl text-xs font-mono border ${
                  theme === 'light'
                    ? 'bg-cyan-50 text-cyan-800 border-cyan-200'
                    : 'bg-[#070b12] border-cyan-500/30 text-slate-300 shadow-lg shadow-cyan-950/30'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-semibold">{data.availability}</span>
                <span className="text-white/20">|</span>
                <span className="flex items-center gap-1.5 text-slate-400 text-xs">
                  <MapPin className="w-3 h-3 text-cyan-400" />
                  {data.location}
                </span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 p-2 px-3 rounded-2xl bg-black/40 border border-white/10 text-[11px] font-mono text-cyan-300">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>ESP32 &bull; Arduino UNO &bull; KiCad & Proteus &bull; Antenna RF</span>
              </div>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <p className="text-cyan-400 font-mono font-bold tracking-widest uppercase text-xs flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Embedded Systems &bull; PCB Design &bull; Antenna Fabrication</span>
              </p>
              <h1
                id="hero-name-heading"
                className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight ${
                  theme === 'light' ? 'text-slate-900' : 'text-white'
                }`}
              >
                {data.fullName}
              </h1>

              {/* Dynamic Typist */}
              <div className="h-10 flex items-center">
                <p
                  className={`text-xl sm:text-2xl font-mono font-medium ${
                    theme === 'light' ? 'text-cyan-700' : 'text-slate-200'
                  }`}
                >
                  <span className="text-cyan-400 mr-2">&gt;</span>
                  {displayedText}
                  <span className="animate-pulse ml-0.5 inline-block w-2.5 h-6 bg-cyan-400 align-middle" />
                </p>
              </div>
            </div>

            {/* Bio Description */}
            <p
              id="hero-bio-summary"
              className={`text-base sm:text-lg leading-relaxed max-w-2xl font-normal ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              {data.bioSummary}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                id="hero-view-lab-btn"
                href="#hardware-lab"
                onMouseEnter={() => soundFx.playChipBlip(1200, 0.03)}
                onClick={() => soundFx.playGateToggle(true)}
                className="px-6 py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <Cpu className="w-4 h-4" />
                <span>LAUNCH HARDWARE LAB</span>
              </a>

              <a
                id="hero-view-projects-btn"
                href="#projects"
                onMouseEnter={() => soundFx.playChipBlip(1100, 0.03)}
                onClick={() => soundFx.playGateToggle(true)}
                className={`px-5 py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 border transition-all ${
                  theme === 'light'
                    ? 'border-slate-300 bg-white text-slate-800 hover:bg-slate-100'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:border-cyan-500/40'
                }`}
              >
                <span>EXPLORE WORK</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                id="hero-linkedin-cta"
                href={data.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => soundFx.playChipBlip(1200, 0.03)}
                className={`px-4 py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 border transition-all ${
                  theme === 'light'
                    ? 'border-cyan-200 bg-cyan-50/80 text-cyan-700 hover:bg-cyan-100'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:border-cyan-500/40'
                }`}
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                <span>LINKEDIN</span>
              </a>

              {data.githubUrl && (
                <a
                  id="hero-github-cta"
                  href={data.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => soundFx.playChipBlip(1200, 0.03)}
                  className={`px-4 py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 border transition-all ${
                    theme === 'light'
                      ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:border-cyan-500/40'
                  }`}
                >
                  <Github className="w-4 h-4 text-slate-400" />
                  <span>GITHUB</span>
                </a>
              )}

              <button
                id="hero-download-cv-btn"
                onClick={() => {
                  soundFx.playGateToggle(true);
                  setIsResumeModalOpen(true);
                }}
                className={`px-4 py-3.5 rounded-2xl font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-2 border transition-all ${
                  theme === 'light'
                    ? 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                <Download className="w-4 h-4 text-purple-400" />
                <span>CV / RESUME</span>
              </button>
            </div>

            {/* Quick Tech Badges */}
            <div className="pt-3 flex items-center gap-2 flex-wrap">
              <span className={`text-[10px] font-mono uppercase tracking-widest ${theme === 'light' ? 'text-slate-400' : 'text-slate-500'}`}>
                TECH STACK //
              </span>
              {['ESP32', 'ARDUINO_UNO', 'KICAD', 'PROTEUS', 'ANTENNA_FAB', 'C_CPP', 'PYTHON', 'DIPTRACE', 'GPS_GSM'].map((tech) => (
                <span
                  key={tech}
                  className={`text-[10px] font-mono tracking-wider px-2.5 py-1 rounded-lg border ${
                    theme === 'light'
                      ? 'bg-slate-100 text-slate-700 border-slate-200'
                      : 'bg-black/50 text-cyan-300/80 border-cyan-500/20'
                  }`}
                >
                  #{tech}
                </span>
              ))}
            </div>
          </div>

          {/* Right Card / Unique 3D Holographic Silicon Core & RTL Explorer */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              id="hero-code-card"
              ref={cardRef}
              onMouseMove={handleMouseMoveTilt}
              onMouseLeave={handleMouseLeaveTilt}
              style={{
                transform: `perspective(1000px) rotateX(${cardTilt.rx}deg) rotateY(${cardTilt.ry}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className={`w-full max-w-lg rounded-3xl border p-5 sm:p-6 shadow-2xl relative backdrop-blur-xl transition-all ${
                theme === 'light'
                  ? 'bg-white/95 border-slate-200 shadow-slate-200'
                  : 'bg-[#070b12]/95 border-cyan-500/30 shadow-2xl hover:border-cyan-400 shadow-cyan-950/40'
              }`}
            >
              {/* Card Window Header with interactive Mode Switcher */}
              <div className="flex items-center justify-between pb-3.5 border-b border-white/10 flex-wrap gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex items-center gap-1 p-1 rounded-xl bg-black/40 border border-white/10 font-mono text-[11px]">
                  <button
                    onClick={() => {
                      soundFx.playChipBlip(1200, 0.02);
                      setActiveTab('wafer');
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all font-bold ${
                      activeTab === 'wafer'
                        ? 'bg-cyan-500 text-black shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    3D DIE
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playChipBlip(1200, 0.02);
                      setActiveTab('rtl');
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all font-bold ${
                      activeTab === 'rtl'
                        ? 'bg-cyan-500 text-black shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    VERILOG RTL
                  </button>
                  <button
                    onClick={() => {
                      soundFx.playChipBlip(1200, 0.02);
                      setActiveTab('probe');
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all font-bold ${
                      activeTab === 'probe'
                        ? 'bg-cyan-500 text-black shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    PIN PROBE
                  </button>
                </div>
              </div>

              {/* TAB 1: Interactive 3D Silicon Wafer Floorplan */}
              {activeTab === 'wafer' && (
                <div className="py-3.5 space-y-3 font-mono text-xs">
                  {/* Layer Selector Strip */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Layers className="w-3 h-3 text-cyan-400" />
                      <span>FAB LAYER:</span>
                    </span>
                    <div className="flex items-center gap-1">
                      {(['metal7', 'metal4', 'poly', 'substrate'] as SiliconLayer[]).map((layer) => (
                        <button
                          key={layer}
                          onClick={() => {
                            soundFx.playChipBlip(1400, 0.02);
                            setActiveLayer(layer);
                          }}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                            activeLayer === layer
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : 'bg-white/5 text-slate-400 hover:text-white border border-transparent'
                          }`}
                        >
                          {layer === 'metal7' ? 'M7' : layer === 'metal4' ? 'M4' : layer === 'poly' ? 'POLY' : 'SUB'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Microchip Floorplan Graphic */}
                  <div className="relative h-44 rounded-2xl bg-[#040810] border border-cyan-500/30 overflow-hidden flex items-center justify-center p-3 shadow-inner">
                    {/* Layer 1: Metal 7 Power Grid */}
                    {activeLayer === 'metal7' && (
                      <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-2 p-2 opacity-80 pointer-events-none">
                        {Array.from({ length: 36 }).map((_, i) => (
                          <div
                            key={i}
                            className={`border ${i % 2 === 0 ? 'border-cyan-400/50 bg-cyan-500/10' : 'border-blue-500/30 bg-blue-500/5'} rounded`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Layer 2: Metal 4 Signal Routing */}
                    {activeLayer === 'metal4' && (
                      <div className="absolute inset-0 flex flex-col justify-around p-3 opacity-90 pointer-events-none">
                        <div className="h-0.5 w-full bg-cyan-400/60 shadow-[0_0_8px_#00f0ff] animate-pulse" />
                        <div className="h-0.5 w-3/4 bg-blue-400/40" />
                        <div className="h-0.5 w-full bg-cyan-400/60 shadow-[0_0_8px_#00f0ff] animate-pulse" />
                        <div className="h-0.5 w-5/6 bg-indigo-400/40" />
                        <div className="h-0.5 w-full bg-cyan-400/60 shadow-[0_0_8px_#00f0ff] animate-pulse" />
                      </div>
                    )}

                    {/* Layer 3: Polysilicon Gates */}
                    {activeLayer === 'poly' && (
                      <div className="absolute inset-0 grid grid-cols-8 gap-1 p-2 opacity-85 pointer-events-none">
                        {Array.from({ length: 32 }).map((_, i) => (
                          <div
                            key={i}
                            className={`h-full w-1.5 mx-auto rounded-sm ${
                              i % 3 === 0 ? 'bg-amber-400/70 shadow-[0_0_6px_#f59e0b]' : 'bg-emerald-400/40'
                            }`}
                          />
                        ))}
                      </div>
                    )}

                    {/* Layer 4: N/P Substrate Well */}
                    {activeLayer === 'substrate' && (
                      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-black p-3 opacity-90">
                        <div className="w-full h-full border border-dashed border-cyan-500/20 rounded-xl flex items-center justify-center text-[10px] text-cyan-300/60">
                          P-TYPE SILICON (100) BULK WAFER
                        </div>
                      </div>
                    )}

                    {/* Core Silicon Die Central HUD */}
                    <div className="relative z-10 text-center space-y-1 bg-black/75 backdrop-blur-md p-3.5 rounded-2xl border border-cyan-500/40 shadow-xl max-w-[260px]">
                      <div className="flex items-center justify-center gap-1.5 text-cyan-300 font-bold text-[11px]">
                        <Cpu className="w-3.5 h-3.5" />
                        <span>DIWAKAR_RV64_SOC</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Node: <span className="text-white font-bold">7nm FinFET ASIC</span>
                      </div>
                      <div className="text-[10px] text-emerald-400 flex items-center justify-center gap-1">
                        <Activity className="w-3 h-3 animate-pulse" />
                        <span>CLK CYCLE: #{clockCycle}</span>
                      </div>
                    </div>
                  </div>

                  {/* Clock Controls */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="text-[11px] text-slate-400">
                      FREQ: <span className="text-cyan-300 font-bold">3.20 GHz (LOCKED)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          soundFx.playGateToggle(true);
                          setClockRunning(!clockRunning);
                        }}
                        className="px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-1 text-[11px] font-bold"
                      >
                        {clockRunning ? <Pause className="w-3 h-3 text-amber-400" /> : <Play className="w-3 h-3 text-emerald-400" />}
                        <span>{clockRunning ? 'HOLD' : 'RUN'}</span>
                      </button>
                      <button
                        onClick={() => {
                          soundFx.playChipBlip(1600, 0.03);
                          setClockCycle((c) => c + 1);
                        }}
                        className="px-2.5 py-1 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center gap-1 text-[11px] font-bold"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>STEP</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: Verilog RTL Synthesizer */}
              {activeTab === 'rtl' && (
                <div className="py-3.5 font-mono text-xs sm:text-[13px] leading-relaxed space-y-1 text-slate-300">
                  <div className="text-slate-600">// VLSI & IoT Systems Engineer</div>
                  <div>
                    <span className="text-cyan-400">module</span>{' '}
                    <span className="text-amber-300">diwakar_core</span> (
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">input wire</span>{' '}
                    <span className="text-emerald-300">clk_3ghz, rst_n</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">input wire [63:0]</span>{' '}
                    <span className="text-emerald-300">iot_telemetry_bus</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-slate-400">output wire [63:0]</span>{' '}
                    <span className="text-emerald-300">cloud_stream_out</span>
                  </div>
                  <div>);</div>
                  <div className="pt-1 text-slate-600">// RTL Parameters</div>
                  <div className="pl-4">
                    <span className="text-purple-400">parameter</span>{' '}
                    <span className="text-slate-300">ENGINEER</span> = <span className="text-emerald-300">"{data.fullName}"</span>;
                  </div>
                  <div className="pl-4">
                    <span className="text-purple-400">parameter</span>{' '}
                    <span className="text-slate-300">SPECIALTY</span> = <span className="text-cyan-300">"Silicon to Cloud"</span>;
                  </div>
                  <div className="pt-1">
                    <span className="text-cyan-400">endmodule</span>
                  </div>
                </div>
              )}

              {/* TAB 3: Interactive Pinout Probe */}
              {activeTab === 'probe' && (
                <div className="py-3.5 space-y-3 font-mono text-xs">
                  <div className="text-[10px] text-slate-400">
                    SELECT PIN TO PROBE DIGITAL LOGIC & VOLTAGE:
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {pins.map((pin) => (
                      <button
                        key={pin.name}
                        onClick={() => {
                          soundFx.playChipBlip(1200 + pin.v * 100, 0.03);
                          setSelectedPin(pin.name);
                          setPinVoltage(pin.v);
                        }}
                        className={`p-2 rounded-xl border text-left flex items-center justify-between transition-all ${
                          selectedPin === pin.name
                            ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-md'
                            : 'bg-black/40 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/5'
                        }`}
                      >
                        <span className="font-bold text-[11px]">{pin.name}</span>
                        <span className="text-[10px] text-cyan-300">{pin.v}V</span>
                      </button>
                    ))}
                  </div>

                  {/* Pin Diagnostic Readout */}
                  <div className="p-3 rounded-2xl bg-black/60 border border-cyan-500/30 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase">PROBE PIN:</div>
                      <div className="text-cyan-300 font-bold">{selectedPin}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 uppercase">SIGNAL VALUE:</div>
                      <div className="text-emerald-400 font-bold">{pinVoltage.toFixed(2)} V (ACTIVE)</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Verified Metrics Footer inside card */}
              <div className="mt-2 pt-3 border-t border-white/10 grid grid-cols-2 gap-2.5">
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <div className="text-sm font-bold text-white">{data.yearsExperience}+ Years</div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Experience</div>
                </div>
                <div className="p-2.5 rounded-2xl bg-white/5 border border-white/5 text-center">
                  <div className="text-sm font-bold text-cyan-400">{data.projects.length}+ Projects</div>
                  <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">Delivered</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Bottom Metric Strip */}
        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.heroMetrics.map((metric, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-3xl border transition-all ${
                theme === 'light'
                  ? 'bg-white/80 border-slate-200 shadow-sm'
                  : 'bg-[#070b12] border-white/5 hover:border-cyan-500/30'
              }`}
            >
              <div
                className={`text-3xl font-bold font-mono tracking-tight ${
                  theme === 'light'
                    ? 'text-cyan-600'
                    : 'text-cyan-400'
                }`}
              >
                {metric.value}
              </div>
              <div
                className={`text-xs font-semibold mt-1 uppercase tracking-wider ${
                  theme === 'light' ? 'text-slate-800' : 'text-slate-300'
                }`}
              >
                {metric.label}
              </div>
              {metric.subtext && (
                <div
                  className={`text-[11px] mt-0.5 ${
                    theme === 'light' ? 'text-slate-500' : 'text-slate-500'
                  }`}
                >
                  {metric.subtext}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
