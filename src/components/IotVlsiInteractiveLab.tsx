import React, { useState, useEffect, useRef } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { soundFx } from '../utils/soundEffects';
import {
  Cpu,
  Radio,
  Activity,
  Zap,
  Sliders,
  Send,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Thermometer,
  Gauge,
  Compass,
  Sun,
  BatteryCharging,
  Wifi,
  ChevronRight,
  Terminal,
  CheckCircle2,
  Code2,
} from 'lucide-react';

type LabMode = 'vlsi' | 'iot' | 'logic';

interface SiliconBlock {
  id: string;
  name: string;
  category: string;
  techSpec: string;
  gateCount: string;
  latency: string;
  power: string;
  description: string;
  verilogCode: string;
  color: string;
}

const SILICON_BLOCKS: SiliconBlock[] = [
  {
    id: 'alu',
    name: 'ALU & SIMD Vector Engine',
    category: 'Execution Core',
    techSpec: '64-bit Integer & IEEE 754 Floating Point',
    gateCount: '48,500 Gates',
    latency: '0.38 ns',
    power: '42 mW',
    description: 'High-speed single-cycle arithmetic logic unit supporting integer addition, subtraction, barrel shifts, and SIMD vector operations.',
    verilogCode: `// 64-bit ALU Core RTL Implementation
module alu_core (
  input  wire [63:0] a_in,
  input  wire [63:0] b_in,
  input  wire [3:0]  alu_op,
  output reg  [63:0] result_out,
  output wire        zero_flag
);
  always @(*) begin
    case (alu_op)
      4'b0000: result_out = a_in + b_in; // ADD
      4'b0001: result_out = a_in - b_in; // SUB
      4'b0010: result_out = a_in & b_in; // AND
      4'b0011: result_out = a_in | b_in; // OR
      4'b0100: result_out = a_in ^ b_in; // XOR
      4'b0101: result_out = a_in << b_in[5:0]; // SLL
      4'b0110: result_out = a_in >> b_in[5:0]; // SRL
      default: result_out = 64'h0;
    endcase
  end
  assign zero_flag = (result_out == 64'h0);
endmodule`,
    color: '#00f0ff',
  },
  {
    id: 'decoder',
    name: 'RISC-V Control Unit & Decoder',
    category: 'Pipeline Frontend',
    techSpec: 'RV64GC Instruction Set with Dynamic Branch Predictor',
    gateCount: '32,100 Gates',
    latency: '0.45 ns',
    power: '28 mW',
    description: 'Decodes 32-bit instructions into micro-operations, manages pipeline hazard detection, and feeds the 2-bit saturating branch predictor.',
    verilogCode: `// RISC-V RV64 Decoder & Hazard Unit
module instruction_decoder (
  input  wire [31:0] instr_in,
  output reg  [4:0]  rd, rs1, rs2,
  output reg  [3:0]  alu_opcode,
  output reg         mem_read, mem_write, reg_write
);
  wire [6:0] opcode = instr_in[6:0];
  always @(*) begin
    rd  = instr_in[11:7];
    rs1 = instr_in[19:15];
    rs2 = instr_in[24:20];
    case (opcode)
      7'b0110011: begin // R-type ALU
        reg_write = 1'b1;
        mem_read  = 1'b0;
        mem_write = 1'b0;
      end
      7'b0000011: begin // Load
        reg_write = 1'b1;
        mem_read  = 1'b1;
        mem_write = 1'b0;
      end
    endcase
  end
endmodule`,
    color: '#a855f7',
  },
  {
    id: 'cache',
    name: 'L1/L2 SRAM Cache Array',
    category: 'Memory Subsystem',
    techSpec: '64KB L1 (4-Way) + 512KB L2 Non-Inclusive',
    gateCount: '1.2M Transistors (6T SRAM)',
    latency: '1.10 ns (L1 Hit)',
    power: '65 mW',
    description: 'High-density 6-transistor SRAM memory array equipped with parity error detection and MESI cache coherency state machines.',
    verilogCode: `// 64KB L1 Data Cache Controller (4-Way Set Associative)
module l1_cache_controller (
  input  wire        clk, rst_n,
  input  wire [63:0] addr_in,
  input  wire [63:0] write_data,
  input  wire        read_req, write_req,
  output reg  [63:0] read_data,
  output reg         cache_hit
);
  wire [7:0]  set_index = addr_in[13:6];
  wire [49:0] tag_bits  = addr_in[63:14];
  // Tag match & SRAM bank line select logic
endmodule`,
    color: '#10b981',
  },
  {
    id: 'axi',
    name: 'AXI4 Interconnect Crossbar',
    category: 'System Bus',
    techSpec: '128-bit AXI4 Multi-Master Bus Crossbar',
    gateCount: '62,000 Gates',
    latency: '0.80 ns',
    power: '35 mW',
    description: 'Non-blocking high-throughput crossbar switch providing parallel memory channels between CPU cores, DMA engines, and peripherals.',
    verilogCode: `// AXI4 Bus Crossbar Interconnect Channel
module axi4_crossbar_matrix (
  input  wire        aclk, aresetn,
  // Master Port 0 (CPU Core)
  input  wire [31:0] s0_awaddr,
  input  wire        s0_awvalid,
  output wire        s0_awready,
  // Slave Port 0 (DRAM Controller)
  output wire [31:0] m0_awaddr,
  output wire        m0_awvalid,
  input  wire        m0_awready
);
  // Round-robin arbitration & burst packet routing
endmodule`,
    color: '#f59e0b',
  },
  {
    id: 'registers',
    name: 'Dual-Port Register File (R0-R31)',
    category: 'Storage Array',
    techSpec: '32 x 64-bit Triple-Port (2 Read, 1 Write)',
    gateCount: '18,400 Gates',
    latency: '0.22 ns',
    power: '19 mW',
    description: 'Zero-latency register storage with constant zero register x0 and high-speed bypass forwarding networks to eliminate stalls.',
    verilogCode: `// Dual-Port Register File
module reg_file_rv64 (
  input  wire        clk,
  input  wire [4:0]  rs1_addr, rs2_addr, rd_addr,
  input  wire [63:0] rd_data,
  input  wire        reg_write_en,
  output wire [63:0] rs1_data, rs2_data
);
  reg [63:0] registers [31:0];
  assign rs1_data = (rs1_addr == 5'b0) ? 64'b0 : registers[rs1_addr];
  assign rs2_data = (rs2_addr == 5'b0) ? 64'b0 : registers[rs2_addr];
  always @(posedge clk) begin
    if (reg_write_en && rd_addr != 5'b0)
      registers[rd_addr] <= rd_data;
  end
endmodule`,
    color: '#38bdf8',
  },
  {
    id: 'pll',
    name: 'Clock Distribution Tree & PLL',
    category: 'Clock & Power',
    techSpec: '3.2 GHz Ultra-Low Jitter Phase-Locked Loop',
    gateCount: '12,000 Gates (Mixed-Signal)',
    latency: '< 15 ps Skew',
    power: '22 mW',
    description: 'H-tree clock distribution mesh providing sub-15 picosecond timing skew across the entire silicon die surface with dynamic voltage scaling.',
    verilogCode: `// Clock Generator & Dynamic Frequency Divider
module pll_clock_generator (
  input  wire ref_clk_50mhz,
  input  wire [2:0] div_sel,
  output wire core_clk_3ghz,
  output wire pll_locked
);
  // High-gain phase frequency detector (PFD) and charge pump
endmodule`,
    color: '#ec4899',
  },
];

export const IotVlsiInteractiveLab: React.FC = () => {
  const { theme } = usePortfolio();
  const [activeMode, setActiveMode] = useState<LabMode>('vlsi');

  // VLSI State
  const [selectedBlock, setSelectedBlock] = useState<SiliconBlock>(SILICON_BLOCKS[0]);
  const [instructionCycle, setInstructionCycle] = useState(0);
  const [registers, setRegisters] = useState<{ [key: string]: number }>({
    x1: 42,
    x2: 128,
    x3: 0,
    x4: 1024,
    x5: 16,
  });
  const [lastExecutedAsm, setLastExecutedAsm] = useState<string>('ADDI x1, x0, 42');

  // IoT Sensor Mesh State
  const [temperature, setTemperature] = useState<number>(24.6);
  const [humidity, setHumidity] = useState<number>(58);
  const [pressure, setPressure] = useState<number>(1013.2);
  const [currentMa, setCurrentMa] = useState<number>(145);
  const [luxLevel, setLuxLevel] = useState<number>(450);
  const [protocol, setProtocol] = useState<'MQTT' | 'CoAP' | 'LoRaWAN' | 'I2C' | 'SPI'>('MQTT');
  const [txPackets, setTxPackets] = useState<
    { id: string; timestamp: string; payload: string; hex: string; rssi: number }[]
  >([]);
  const [isTransmitting, setIsTransmitting] = useState(false);

  // Digital Logic Gate State
  const [gateType, setGateType] = useState<'NAND' | 'NOR' | 'XOR' | 'AND' | 'OR' | 'MUX'>('NAND');
  const [inputA, setInputA] = useState<number>(1);
  const [inputB, setInputB] = useState<number>(0);
  const [clockState, setClockState] = useState<number>(0);
  const [waveHistory, setWaveHistory] = useState<{ clk: number; a: number; b: number; y: number }[]>([]);

  const oscCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Execute single RISC-V clock step
  const handleStepClock = () => {
    soundFx.playClockTick();
    setInstructionCycle((prev) => prev + 1);

    const instrs = [
      { asm: 'ADDI x1, x1, 5', reg: 'x1', fn: (r: any) => (r.x1 + 5) & 0xffff },
      { asm: 'SLLI x2, x1, 1', reg: 'x2', fn: (r: any) => (r.x1 << 1) & 0xffff },
      { asm: 'XOR x3, x1, x2', reg: 'x3', fn: (r: any) => (r.x1 ^ r.x2) & 0xffff },
      { asm: 'ADDI x4, x4, 64', reg: 'x4', fn: (r: any) => (r.x4 + 64) & 0xffff },
      { asm: 'ANDI x5, x3, 255', reg: 'x5', fn: (r: any) => (r.x3 & 255) & 0xffff },
    ];

    const currentInst = instrs[instructionCycle % instrs.length];
    setLastExecutedAsm(currentInst.asm);
    setRegisters((prev) => ({
      ...prev,
      [currentInst.reg]: currentInst.fn(prev),
    }));
  };

  // IoT Packet Send Handler
  const handleTransmitPacket = () => {
    soundFx.playPacketTransmit();
    setIsTransmitting(true);

    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`;

    const jsonPayload = JSON.stringify({
      node: 'EDGE_SENS_01',
      proto: protocol,
      temp_c: temperature,
      hum_pct: humidity,
      pres_hpa: pressure,
      curr_ma: currentMa,
      lux: luxLevel,
    });

    const hexPayload = `0xAA 0x55 0x01 ${Math.round(temperature).toString(16).padStart(2, '0')} ${Math.round(humidity).toString(16).padStart(2, '0')} 0xFF`;
    const rssi = -Math.floor(45 + Math.random() * 25);

    setTimeout(() => {
      setTxPackets((prev) => [
        {
          id: `PKT-${Date.now()}`,
          timestamp: timeStr,
          payload: jsonPayload,
          hex: hexPayload,
          rssi,
        },
        ...prev.slice(0, 5),
      ]);
      setIsTransmitting(false);
    }, 250);
  };

  // Logic Gate Evaluation
  const evaluateGate = (g: string, a: number, b: number) => {
    switch (g) {
      case 'NAND':
        return !(a && b) ? 1 : 0;
      case 'NOR':
        return !(a || b) ? 1 : 0;
      case 'XOR':
        return a ^ b ? 1 : 0;
      case 'AND':
        return a && b ? 1 : 0;
      case 'OR':
        return a || b ? 1 : 0;
      case 'MUX':
        return clockState ? b : a;
      default:
        return 0;
    }
  };

  const currentGateOutput = evaluateGate(gateType, inputA, inputB);

  // Update logic wave history
  useEffect(() => {
    setWaveHistory((prev) => {
      const next = [
        ...prev,
        { clk: clockState, a: inputA, b: inputB, y: currentGateOutput },
      ];
      return next.slice(-40);
    });
  }, [clockState, inputA, inputB, currentGateOutput]);

  // Oscilloscope canvas rendering
  useEffect(() => {
    const canvas = oscCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < canvas.width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    if (waveHistory.length < 2) return;

    const channels = [
      { name: 'CLK', color: '#00f0ff', yBase: 35, getKey: (d: any) => d.clk },
      { name: 'IN_A', color: '#10b981', yBase: 75, getKey: (d: any) => d.a },
      { name: 'IN_B', color: '#f59e0b', yBase: 115, getKey: (d: any) => d.b },
      { name: 'OUT_Y', color: '#a855f7', yBase: 155, getKey: (d: any) => d.y },
    ];

    const stepX = canvas.width / 40;

    channels.forEach((ch) => {
      ctx.font = '9px monospace';
      ctx.fillStyle = ch.color;
      ctx.fillText(ch.name, 8, ch.yBase - 4);

      ctx.beginPath();
      ctx.strokeStyle = ch.color;
      ctx.lineWidth = 1.8;

      for (let i = 0; i < waveHistory.length; i++) {
        const val = ch.getKey(waveHistory[i]);
        const x = i * stepX + 45;
        const y = ch.yBase - val * 16;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          const prevVal = ch.getKey(waveHistory[i - 1]);
          const prevY = ch.yBase - prevVal * 16;
          ctx.lineTo(x, prevY);
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    });
  }, [waveHistory]);

  return (
    <section id="hardware-lab" className="py-20 relative">
      {/* Background Circuit Grid Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #00f0ff 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1.5">
                <Cpu className="w-3 h-3 text-cyan-400" />
                <span>Interactive Silicon & IoT Lab</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>LIVE CORE ACTIVE</span>
              </span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-bold tracking-tight mt-2 ${
                theme === 'light' ? 'text-slate-900' : 'text-white'
              }`}
            >
              Embedded Systems, IoT & Digital Circuit Lab
            </h2>
            <p
              className={`mt-2 text-sm sm:text-base max-w-3xl ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Interactive hardware-software engineering workbench: explore microarchitecture blocks, stream live IoT edge sensor telemetry packets, and evaluate real-time digital logic oscilloscope waveforms.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1.5 rounded-2xl bg-black/60 border border-white/10 shrink-0">
            {[
              { id: 'vlsi', label: 'VLSI Die Architecture', icon: <Cpu className="w-3.5 h-3.5" /> },
              { id: 'iot', label: 'IoT Sensor Gateway', icon: <Radio className="w-3.5 h-3.5" /> },
              { id: 'logic', label: 'Logic Oscilloscope', icon: <Activity className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveMode(tab.id as LabMode);
                  soundFx.playGateToggle(true);
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  activeMode === tab.id
                    ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MODE 1: VLSI SILICON DIE & MICROARCHITECTURE EXPLORER */}
        {/* ------------------------------------------------------------- */}
        {activeMode === 'vlsi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Interactive Silicon Die Visualizer */}
            <div className="lg:col-span-7 p-6 rounded-3xl border border-white/10 bg-[#070b12] shadow-2xl relative overflow-hidden flex flex-col justify-between">
              {/* Die Outer Pad Ring Label */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10 font-mono text-[11px]">
                <div className="text-cyan-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>DIE_MAP // RISC-V RV64 SOC 7nm FinFET</span>
                </div>
                <div className="text-slate-400">
                  CLK: <strong className="text-white">3.20 GHz</strong> &bull; DIE TEMP:{' '}
                  <strong className="text-amber-400">38.2°C</strong>
                </div>
              </div>

              {/* Silicon Die Grid Layout */}
              <div className="py-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {SILICON_BLOCKS.map((block) => {
                  const isSelected = selectedBlock.id === block.id;
                  return (
                    <button
                      key={block.id}
                      onClick={() => {
                        setSelectedBlock(block);
                        soundFx.playChipBlip(950);
                      }}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 relative group overflow-hidden ${
                        isSelected
                          ? 'border-cyan-400 bg-cyan-950/40 shadow-xl shadow-cyan-500/10'
                          : 'border-white/10 bg-black/40 hover:border-white/20 hover:bg-white/5'
                      }`}
                      style={{
                        borderColor: isSelected ? block.color : undefined,
                      }}
                    >
                      {/* Silicon Micro Pattern */}
                      <div className="absolute top-2 right-2 text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-slate-400">
                        {block.gateCount.split(' ')[0]}
                      </div>

                      <div
                        className="w-2.5 h-2.5 rounded-full mb-3"
                        style={{ backgroundColor: block.color }}
                      />

                      <div className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                        {block.name}
                      </div>

                      <div className="text-[10px] text-slate-400 font-mono mt-1">
                        {block.category}
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[10px] font-mono border-t border-white/5 pt-2">
                        <span className="text-slate-500">t_pd:</span>
                        <span className="text-slate-300 font-bold">{block.latency}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Live Instruction Execution Bar */}
              <div className="p-4 rounded-2xl bg-black/70 border border-white/10 space-y-3 font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="text-xs text-slate-300 flex items-center gap-2">
                    <span className="text-cyan-400 font-bold">PIPELINE EXEC:</span>
                    <code className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                      {lastExecutedAsm}
                    </code>
                  </div>

                  <button
                    onClick={handleStepClock}
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:from-cyan-400 hover:to-blue-500 shadow-md shadow-cyan-500/20"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>STEP CLOCK CYCLE (#{instructionCycle})</span>
                  </button>
                </div>

                {/* Register Bank State Preview */}
                <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
                  {Object.entries(registers).map(([r, val]) => (
                    <div key={r} className="p-1.5 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-slate-500 font-bold">{r}</div>
                      <div className="text-cyan-300 font-bold">0x{Number(val).toString(16).toUpperCase()}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Block RTL Verilog & Specs Inspector */}
            <div className="lg:col-span-5 p-6 rounded-3xl border border-white/10 bg-[#0c1017] shadow-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20 font-bold">
                    SYNTHESIZED RTL BLOCK
                  </span>
                  <span className="text-xs font-mono text-slate-400">{selectedBlock.techSpec}</span>
                </div>

                <h3 className="text-xl font-bold text-white mt-2 flex items-center gap-2">
                  <span style={{ color: selectedBlock.color }}>&bull;</span>
                  <span>{selectedBlock.name}</span>
                </h3>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {selectedBlock.description}
                </p>

                {/* Metrics Table */}
                <div className="grid grid-cols-3 gap-2 mt-4 text-xs font-mono">
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[10px] text-slate-500">GATE COUNT</div>
                    <div className="font-bold text-white mt-0.5">{selectedBlock.gateCount}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[10px] text-slate-500">PROPAGATION</div>
                    <div className="font-bold text-cyan-400 mt-0.5">{selectedBlock.latency}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-black/40 border border-white/5">
                    <div className="text-[10px] text-slate-500">DYNAMIC POWER</div>
                    <div className="font-bold text-emerald-400 mt-0.5">{selectedBlock.power}</div>
                  </div>
                </div>

                {/* Verilog RTL Viewer */}
                <div className="mt-4">
                  <div className="flex items-center justify-between pb-1 text-[11px] font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{selectedBlock.id}_core.v</span>
                    </span>
                    <span className="text-[10px] text-slate-500">IEEE 1364 Verilog-2001</span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-black/80 border border-white/10 font-mono text-[11px] leading-relaxed text-slate-300 overflow-x-auto max-h-48">
                    <pre>
                      <code>{selectedBlock.verilogCode}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-300 text-xs flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Verified with Synopsys Design Compiler & Cadence Innovus timing constraints.</span>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 2: IOT SENSOR MESH & TELEMETRY GATEWAY */}
        {/* ------------------------------------------------------------- */}
        {activeMode === 'iot' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Sensor Sliders & Telemetry Generator */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#070b12] shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>Edge Sensor Calibration</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Adjust real-time physical sensor parameters to inject live telemetry into the gateway mesh.
                  </p>
                </div>

                {/* Protocol Badge */}
                <div className="flex items-center gap-1">
                  {(['MQTT', 'CoAP', 'LoRaWAN', 'I2C', 'SPI'] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setProtocol(p)}
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold uppercase transition-all ${
                        protocol === p
                          ? 'bg-cyan-500 text-black'
                          : 'bg-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders Grid */}
              <div className="space-y-4">
                {/* Temperature */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Thermometer className="w-3.5 h-3.5 text-rose-400" />
                      <span>Temperature:</span>
                    </span>
                    <span className="text-cyan-400 font-bold">{temperature.toFixed(1)} °C</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="80"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>

                {/* Humidity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Gauge className="w-3.5 h-3.5 text-blue-400" />
                      <span>Relative Humidity:</span>
                    </span>
                    <span className="text-blue-400 font-bold">{humidity}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    step="1"
                    value={humidity}
                    onChange={(e) => setHumidity(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-400"
                  />
                </div>

                {/* Barometric Pressure */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-purple-400" />
                      <span>Barometric Pressure:</span>
                    </span>
                    <span className="text-purple-400 font-bold">{pressure.toFixed(1)} hPa</span>
                  </div>
                  <input
                    type="range"
                    min="900"
                    max="1100"
                    step="0.5"
                    value={pressure}
                    onChange={(e) => setPressure(parseFloat(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-400"
                  />
                </div>

                {/* Current Draw */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300 flex items-center gap-1.5">
                      <BatteryCharging className="w-3.5 h-3.5 text-amber-400" />
                      <span>Shunt Current Draw:</span>
                    </span>
                    <span className="text-amber-400 font-bold">{currentMa} mA</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="500"
                    step="5"
                    value={currentMa}
                    onChange={(e) => setCurrentMa(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleTransmitPacket}
                disabled={isTransmitting}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/20 transition-all font-mono"
              >
                <Send className="w-4 h-4" />
                <span>{isTransmitting ? 'TRANSMITTING VIA GATEWAY...' : 'TRANSMIT TELEMETRY PACKET'}</span>
              </button>
            </div>

            {/* Right: Live Packet Ingestion Stream & Gateway HUD */}
            <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0c1017] shadow-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>INGESTION FEED // BROKER :1883</span>
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    QOS 1 GUARANTEED
                  </span>
                </div>

                {/* Packet List */}
                <div className="mt-4 space-y-2.5 max-h-72 overflow-y-auto">
                  {txPackets.length === 0 ? (
                    <div className="p-8 text-center rounded-2xl bg-black/40 border border-white/5 text-slate-500 text-xs font-mono">
                      No packets transmitted yet. Click "Transmit Telemetry Packet" to stream.
                    </div>
                  ) : (
                    txPackets.map((pkt) => (
                      <div
                        key={pkt.id}
                        className="p-3 rounded-2xl bg-black/60 border border-white/10 font-mono text-[11px] space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-slate-400 text-[10px]">
                          <span className="text-cyan-400 font-bold">{pkt.id} &bull; {pkt.timestamp}</span>
                          <span className="text-emerald-400">RSSI: {pkt.rssi} dBm</span>
                        </div>
                        <div className="text-slate-300 break-all">{pkt.payload}</div>
                        <div className="text-[10px] text-amber-400/80">HEX: {pkt.hex}</div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Edge Node Hardware Specs */}
              <div className="p-4 rounded-2xl bg-black/50 border border-white/5 grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
                <div>
                  <div className="text-slate-500">MCU PLATFORM</div>
                  <div className="font-bold text-white">ESP32-S3 Dual-Core</div>
                </div>
                <div>
                  <div className="text-slate-500">RTOS KERNEL</div>
                  <div className="font-bold text-cyan-400">FreeRTOS v10.4</div>
                </div>
                <div>
                  <div className="text-slate-500">COMM PHY</div>
                  <div className="font-bold text-emerald-400">Wi-Fi + BLE 5.0 + LoRa</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* MODE 3: DIGITAL LOGIC GATE & TIMING OSCILLOSCOPE */}
        {/* ------------------------------------------------------------- */}
        {activeMode === 'logic' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Logic Gate Selector & Truth Table */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#070b12] shadow-2xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  <span>Logic Gate Synthesis</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Select CMOS logic primitive and toggle input states to inspect output and timing waveforms.
                </p>
              </div>

              {/* Gate Type Selector */}
              <div className="grid grid-cols-3 gap-2">
                {(['NAND', 'NOR', 'XOR', 'AND', 'OR', 'MUX'] as const).map((g) => (
                  <button
                    key={g}
                    onClick={() => {
                      setGateType(g);
                      soundFx.playGateToggle(true);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-mono font-bold transition-all border ${
                      gateType === g
                        ? 'bg-cyan-500 text-black border-cyan-400 shadow-md shadow-cyan-500/20'
                        : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {g} GATE
                  </button>
                ))}
              </div>

              {/* Interactive Inputs */}
              <div className="p-4 rounded-2xl bg-black/60 border border-white/10 space-y-3 font-mono">
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                  CMOS INPUT PINS //
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {/* Pin A */}
                  <button
                    onClick={() => {
                      const next = inputA === 1 ? 0 : 1;
                      setInputA(next);
                      soundFx.playGateToggle(next === 1);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      inputA === 1
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-white/5 border-white/10 text-slate-500'
                    }`}
                  >
                    <div className="text-[10px]">PIN A</div>
                    <div className="text-lg font-bold">{inputA}</div>
                  </button>

                  {/* Pin B */}
                  <button
                    onClick={() => {
                      const next = inputB === 1 ? 0 : 1;
                      setInputB(next);
                      soundFx.playGateToggle(next === 1);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      inputB === 1
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                        : 'bg-white/5 border-white/10 text-slate-500'
                    }`}
                  >
                    <div className="text-[10px]">PIN B</div>
                    <div className="text-lg font-bold">{inputB}</div>
                  </button>

                  {/* Clock Toggle */}
                  <button
                    onClick={() => {
                      const next = clockState === 1 ? 0 : 1;
                      setClockState(next);
                      soundFx.playClockTick();
                    }}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      clockState === 1
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300'
                        : 'bg-white/5 border-white/10 text-slate-500'
                    }`}
                  >
                    <div className="text-[10px]">CLOCK (CLK)</div>
                    <div className="text-lg font-bold">{clockState}</div>
                  </button>
                </div>

                {/* Result Output */}
                <div className="mt-3 p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-between">
                  <span className="text-xs text-purple-300 font-bold">
                    BOOLEAN OUTPUT (Y):
                  </span>
                  <span className="text-xl font-bold text-purple-300 font-mono">
                    {currentGateOutput} ({currentGateOutput === 1 ? 'HIGH / 3.3V' : 'LOW / 0V'})
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Live Digital Oscilloscope Timing Diagram */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#0c1017] shadow-2xl flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span>REAL-TIME DIGITAL OSCILLOSCOPE (4-CHANNEL)</span>
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    TIMEBASE: 500ps / DIV
                  </span>
                </div>

                {/* Oscilloscope Canvas */}
                <div className="mt-4 rounded-2xl border border-white/10 bg-black overflow-hidden p-2">
                  <canvas
                    ref={oscCanvasRef}
                    width={560}
                    height={180}
                    className="w-full h-48 block"
                  />
                </div>
              </div>

              {/* Oscilloscope Legend */}
              <div className="grid grid-cols-4 gap-2 text-[11px] font-mono text-center">
                <div className="p-2 rounded-xl bg-black/40 border border-cyan-500/30 text-cyan-400">
                  CH1: CLK (Clock)
                </div>
                <div className="p-2 rounded-xl bg-black/40 border border-emerald-500/30 text-emerald-400">
                  CH2: IN_A
                </div>
                <div className="p-2 rounded-xl bg-black/40 border border-amber-500/30 text-amber-400">
                  CH3: IN_B
                </div>
                <div className="p-2 rounded-xl bg-black/40 border border-purple-500/30 text-purple-400">
                  CH4: OUT_Y
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
