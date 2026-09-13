import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../context/PortfolioContext';
import { soundFx } from '../utils/soundEffects';
import { Terminal, CornerDownLeft, Sparkles, RefreshCw, Cpu, Radio, Zap } from 'lucide-react';

interface CommandOutput {
  command: string;
  response: React.ReactNode;
  time: string;
}

export const TerminalSection: React.FC = () => {
  const { data, theme, setIsResumeModalOpen } = usePortfolio();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: 'init_station',
      response: (
        <div className="space-y-1.5 text-slate-300">
          <p className="text-cyan-400 font-bold flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>DIWAKAR_OS // Silicon & IoT Diagnostic Shell (v3.2.0-LTS)</span>
          </p>
          <p className="text-slate-400">
            Type <span className="text-cyan-300 font-bold font-mono">help</span> to view commands, or try{' '}
            <span className="text-amber-300 font-mono font-bold">flash</span>,{' '}
            <span className="text-emerald-300 font-mono font-bold">scan_iot</span>,{' '}
            <span className="text-purple-300 font-mono font-bold">pinout</span>, or{' '}
            <span className="text-cyan-300 font-mono font-bold">dft_test</span>.
          </p>
        </div>
      ),
      time: new Date().toLocaleTimeString(),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    const now = new Date().toLocaleTimeString();

    if (!trimmed) return;

    soundFx.playChipBlip(1100, 0.03);

    let responseNode: React.ReactNode;

    switch (trimmed) {
      case 'help':
        responseNode = (
          <div className="space-y-2 text-xs sm:text-sm">
            <p className="text-cyan-400 font-bold uppercase tracking-wider font-mono">AVAILABLE FIRMWARE & SYSTEM COMMANDS:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-slate-300">
              <div>
                <span className="text-cyan-300 font-mono font-bold">bio</span> : Summary & systems background
              </div>
              <div>
                <span className="text-cyan-300 font-mono font-bold">skills</span> : Hardware, VLSI & software matrix
              </div>
              <div>
                <span className="text-cyan-300 font-mono font-bold">projects</span> : Production hardware/cloud highlights
              </div>
              <div>
                <span className="text-cyan-300 font-mono font-bold">experience</span> : Career timeline & accomplishments
              </div>
              <div>
                <span className="text-amber-300 font-mono font-bold">flash</span> : Simulate FreeRTOS firmware flashing
              </div>
              <div>
                <span className="text-emerald-300 font-mono font-bold">scan_iot</span> : Scan LoRa & BLE IoT network nodes
              </div>
              <div>
                <span className="text-purple-300 font-mono font-bold">pinout</span> : Render RISC-V SoC ASCII pin diagram
              </div>
              <div>
                <span className="text-rose-300 font-mono font-bold">dft_test</span> : Run 7nm Silicon boundary scan test
              </div>
              <div>
                <span className="text-cyan-300 font-mono font-bold">contact</span> : Email & direct communication channels
              </div>
              <div>
                <span className="text-cyan-300 font-mono font-bold">resume</span> : View and download curriculum vitae
              </div>
              <div>
                <span className="text-slate-400 font-mono">clear</span> : Clear terminal display buffer
              </div>
            </div>
          </div>
        );
        break;

      case 'flash':
      case 'flash_firmware':
        soundFx.playGateToggle(true);
        responseNode = (
          <div className="space-y-1.5 text-slate-300 font-mono">
            <p className="text-amber-300 font-bold">&gt;&gt; FLASHING TARGET: RISCV_RV64_SOC (SPI @ 80MHz)</p>
            <div className="text-xs text-slate-400">
              <div>[0.10s] Erasing flash sectors 0x0000 - 0x7FFF... [DONE]</div>
              <div>[0.35s] Writing FreeRTOS kernel binary (256 KB)... [DONE]</div>
              <div>[0.60s] Verifying CRC32 checksum (0x9AF83E01)... [PASSED]</div>
              <div className="text-emerald-400 font-bold pt-1">[0.72s] Firmware boot successful! Heartbeat LED active on GPIO_2.</div>
            </div>
          </div>
        );
        break;

      case 'scan_iot':
      case 'mesh_scan':
        soundFx.playChipBlip(1500, 0.05);
        responseNode = (
          <div className="space-y-1.5 text-slate-300 font-mono">
            <p className="text-emerald-300 font-bold">&gt;&gt; DISCOVERED IoT NODES ON LORAWAN / BLE MESH:</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center justify-between p-1.5 rounded bg-white/5">
                <span className="text-cyan-300 font-bold">NODE_01 [WEATHER_STATION]</span>
                <span className="text-slate-400">RSSI: -68 dBm | 868.1 MHz</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-white/5">
                <span className="text-cyan-300 font-bold">NODE_02 [INDUSTRIAL_VIB_SENSOR]</span>
                <span className="text-slate-400">RSSI: -74 dBm | Modbus RTU</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
              <div className="flex items-center justify-between p-1.5 rounded bg-white/5">
                <span className="text-cyan-300 font-bold">NODE_03 [POWER_ENERGY_METER]</span>
                <span className="text-slate-400">RSSI: -82 dBm | MQTT/TLS</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'pinout':
        responseNode = (
          <div className="space-y-1 font-mono text-xs text-cyan-300 leading-tight">
            <pre className="text-slate-400">
{`       +--------------------------+
  VDD  | [1]                   [8]|  GND
  CLK  | [2]     RISC-V        [7]|  RST_N
 MOSI  | [3]    7nm FinFET     [6]|  MISO
   TX  | [4]      DIWAKAR      [5]|  RX
       +--------------------------+`}
            </pre>
            <p className="text-slate-400 text-[11px]">All pins ESD protected (2kV HBM) & Level-shifted 1.05V - 3.3V.</p>
          </div>
        );
        break;

      case 'dft_test':
      case 'scan_chain':
        responseNode = (
          <div className="space-y-1 text-slate-300 font-mono text-xs">
            <p className="text-rose-300 font-bold">&gt;&gt; RUNNING ATPG SCAN-CHAIN FAULT DIAGNOSTICS...</p>
            <div className="text-slate-400">
              <div>Total Flip-Flops in Chain: 142,850</div>
              <div>Stuck-At Fault Coverage: <span className="text-emerald-400 font-bold">99.84%</span></div>
              <div>Transition Delay Fault Coverage: <span className="text-emerald-400 font-bold">98.92%</span></div>
              <div className="text-emerald-400 font-bold pt-1">&gt;&gt; SILICON DIE CERTIFIED ZERO DEFECT (ISO-26262 ASIL-D READY)</div>
            </div>
          </div>
        );
        break;

      case 'bio':
      case 'about':
        responseNode = (
          <div className="space-y-1 text-slate-300">
            <p className="font-bold text-white">{data.fullName} - {data.title}</p>
            <p className="text-slate-400">{data.location} | {data.availability}</p>
            <p className="mt-1 leading-relaxed">{data.bioSummary}</p>
          </div>
        );
        break;

      case 'skills':
        responseNode = (
          <div className="space-y-1 text-slate-300">
            <p className="font-bold text-cyan-400">TECHNICAL SKILL MATRIX:</p>
            {data.skillCategories.map((c) => (
              <div key={c.id}>
                <span className="text-cyan-300 font-mono">{c.title}:</span>{' '}
                <span className="text-slate-300">{c.skills.map((s) => s.name).join(', ')}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        responseNode = (
          <div className="space-y-2 text-slate-300">
            <p className="font-bold text-cyan-400">FEATURED PROJECTS:</p>
            {data.projects.map((p, idx) => (
              <div key={p.id} className="border-l-2 border-cyan-500/50 pl-2">
                <p className="font-bold text-white">
                  {idx + 1}. {p.title} ({p.category})
                </p>
                <p className="text-xs text-slate-400">{p.tagline}</p>
                <p className="text-[11px] text-cyan-300 font-mono">Stack: {p.technologies.join(', ')}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'experience':
        responseNode = (
          <div className="space-y-2 text-slate-300">
            <p className="font-bold text-cyan-400">WORK HISTORY:</p>
            {data.experiences.map((e) => (
              <div key={e.id} className="border-l-2 border-cyan-500/50 pl-2">
                <p className="font-bold text-white">{e.role} @ {e.company}</p>
                <p className="text-xs text-slate-400">{e.period} | {e.location}</p>
                <p className="text-xs text-slate-300 mt-0.5">{e.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        responseNode = (
          <div className="space-y-1 text-slate-300 font-mono text-xs sm:text-sm">
            <p>📧 Email: <a href={`mailto:${data.email}`} className="text-cyan-400 underline">{data.email}</a></p>
            <p>💼 LinkedIn: <a href={data.linkedInUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline">{data.linkedInUrl}</a></p>
            <p>📍 Location: {data.location}</p>
            <p>🟢 Status: {data.availability}</p>
          </div>
        );
        break;

      case 'resume':
      case 'cv':
        setIsResumeModalOpen(true);
        responseNode = (
          <div className="text-emerald-400">
            📄 Opening Diwakar V's Resume Viewer & Print dialog...
          </div>
        );
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      default:
        responseNode = (
          <div className="text-rose-400 font-mono">
            Command not recognized: '{trimmed}'. Type <span className="text-cyan-300 font-bold">help</span> for firmware commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmdStr, response: responseNode, time: now }]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  return (
    <section id="terminal" className="py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span
            className={`text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border ${
              theme === 'light'
                ? 'bg-cyan-50 text-cyan-700 border-cyan-200'
                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
            }`}
          >
            System Console
          </span>
          <h2
            id="terminal-heading"
            className={`text-3xl sm:text-4xl font-bold tracking-tight mt-2 ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}
          >
            Firmware & CLI Diagnostics
          </h2>
          <p
            className={`mt-2 text-sm sm:text-base ${
              theme === 'light' ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            Interactive serial console connected to Diwakar's simulated hardware environment.
          </p>
        </div>

        {/* Terminal Window */}
        <div
          id="interactive-terminal-box"
          className="rounded-3xl border border-cyan-500/30 bg-[#070b12] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm text-slate-200 shadow-cyan-950/40"
        >
          {/* Top Bar */}
          <div className="px-5 py-3.5 bg-[#0a101d] border-b border-cyan-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs text-cyan-400 ml-2 font-mono">diwakar@soc-lab:/dev/ttyUSB0 (115200 8N1)</span>
            </div>

            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <button
                onClick={() => handleCommand('clear')}
                className="p-1 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                title="Clear Terminal"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] text-cyan-400 font-bold">
                UART ACTIVE
              </span>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-5 sm:p-7 min-h-[280px] max-h-[420px] overflow-y-auto space-y-4">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <span className="text-cyan-400 font-bold">&gt;&gt;</span>
                  <span className="text-white font-semibold">{item.command}</span>
                  <span className="text-[10px] text-slate-600 ml-auto">{item.time}</span>
                </div>
                <div className="pl-4">{item.response}</div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Input Line */}
          <div className="p-4 bg-[#0a101d]/90 border-t border-cyan-500/20 flex items-center gap-3">
            <span className="text-cyan-400 font-bold font-mono">&gt;&gt;</span>
            <input
              id="terminal-cli-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Try 'flash', 'scan_iot', 'pinout', 'dft_test', 'skills', 'help'..."
              className="w-full bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none text-xs sm:text-sm font-mono"
            />
            <button
              onClick={() => handleCommand(inputVal)}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black hover:from-cyan-400 hover:to-blue-500 transition-all shrink-0 font-bold"
              title="Execute Command"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick Command Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
          <span className="text-xs text-slate-500 font-mono">Quick Run:</span>
          {['help', 'flash', 'scan_iot', 'pinout', 'dft_test', 'skills', 'projects', 'contact'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="text-xs px-3 py-1 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono transition-all"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
