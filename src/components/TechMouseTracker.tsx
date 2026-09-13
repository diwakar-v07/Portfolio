import React, { useEffect, useRef, useCallback } from 'react';
import { soundFx } from '../utils/soundEffects';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
}

interface CircuitNode {
  x: number;
  y: number;
  label: string;
  pulsePhase: number;
  connections: number[];
}

export const TechMouseTracker: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseHistoryRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const particlesRef = useRef<Point[]>([]);
  const circuitNodesRef = useRef<CircuitNode[]>([]);
  const animFrameIdRef = useRef<number | null>(null);
  const currentPosRef = useRef<{ x: number; y: number }>({ x: -100, y: -100 });
  const isInsideRef = useRef<boolean>(false);

  // Initialize random circuit nodes on window resize
  const initCircuitNodes = useCallback((width: number, height: number) => {
    const nodes: CircuitNode[] = [];
    const count = Math.min(22, Math.floor((width * height) / 75000));
    const labels = [
      'ALU_64', 'RAM_A0', 'SPI_MISO', 'I2C_SDA', 'GPIO_12', 'UART_TX',
      'PLL_CLK', 'RST_N', 'AXI4_BUS', 'PWM_CH1', 'ADC_VREF', 'DDR5_CLK',
      'LORA_RX', 'MQTT_GW', 'RV64_PC', 'FPGA_LUT', 'CMOS_NAND', 'IRQ_FAST',
      'TSMC_7NM', 'COAP_NODE', 'BLE_BEACON', 'VCC_CORE'
    ];

    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * (width - 120) + 60,
        y: Math.random() * (height - 120) + 60,
        label: labels[i % labels.length],
        pulsePhase: Math.random() * Math.PI * 2,
        connections: [],
      });
    }

    // Connect near nodes with orthogonal PCB layout lines
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 280 && Math.random() > 0.45) {
          nodes[i].connections.push(j);
        }
      }
    }
    circuitNodesRef.current = nodes;
  }, []);

  // Set up canvas & resize listeners
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
      initCircuitNodes(window.innerWidth, window.innerHeight);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initCircuitNodes]);

  // Global mouse handlers for magnetic circuit particles & laser trails
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      currentPosRef.current = { x: clientX, y: clientY };
      isInsideRef.current = true;

      const now = Date.now();
      mouseHistoryRef.current.push({ x: clientX, y: clientY, time: now });
      if (mouseHistoryRef.current.length > 18) {
        mouseHistoryRef.current.shift();
      }

      // Generate subtle glowing electron sparks
      if (Math.random() > 0.65) {
        particlesRef.current.push({
          x: clientX + (Math.random() - 0.5) * 8,
          y: clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 2 + 1,
          color: Math.random() > 0.4 ? '#00f0ff' : '#0284c7',
          life: 0,
          maxLife: 20 + Math.random() * 15,
        });
      }
    };

    const handleMouseLeave = () => {
      isInsideRef.current = false;
    };

    const handleClick = (e: MouseEvent) => {
      soundFx.playChipBlip(1200, 0.04);

      // Create burst of silicon electron particles on click
      for (let i = 0; i < 18; i++) {
        const angle = (i / 18) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 3 + 2;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2.5 + 1.2,
          color: i % 3 === 0 ? '#38bdf8' : i % 2 === 0 ? '#00f0ff' : '#67e8f9',
          life: 0,
          maxLife: 28 + Math.random() * 18,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Main Canvas Rendering Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = currentPosRef.current;
      const isInside = isInsideRef.current;

      // 1. Draw Subtle PCB Circuit Nodes & Signal Routing
      const nodes = circuitNodesRef.current;
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.pulsePhase += 0.025;

        // Draw connections between nodes
        for (const targetIdx of node.connections) {
          const target = nodes[targetIdx];
          if (!target) continue;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);

          // 90-degree clean PCB routing
          const midX = (node.x + target.x) / 2;
          ctx.lineTo(midX, node.y);
          ctx.lineTo(midX, target.y);
          ctx.lineTo(target.x, target.y);

          ctx.strokeStyle = 'rgba(0, 240, 255, 0.035)';
          ctx.lineWidth = 1;
          ctx.stroke();

          // Flowing data packet photon along trace
          const progress = (time * 0.7 + (i * 0.25)) % 1;
          let packetX = node.x;
          let packetY = node.y;
          if (progress < 0.33) {
            packetX = node.x + (midX - node.x) * (progress / 0.33);
            packetY = node.y;
          } else if (progress < 0.66) {
            packetX = midX;
            packetY = node.y + (target.y - node.y) * ((progress - 0.33) / 0.33);
          } else {
            packetX = midX + (target.x - midX) * ((progress - 0.66) / 0.34);
            packetY = target.y;
          }

          ctx.beginPath();
          ctx.arc(packetX, packetY, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = '#00f0ff';
          ctx.globalAlpha = 0.35;
          ctx.fill();
          ctx.globalAlpha = 1;
        }

        // Draw Node Solder Pad
        const pulse = (Math.sin(node.pulsePhase) + 1) / 2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.globalAlpha = 0.25 + pulse * 0.45;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw dynamic magnetic connection to mouse cursor if within 170px
        if (isInside) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 170) {
            const alpha = (1 - dist / 170) * 0.4;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            const cornerX = node.x;
            const cornerY = mouse.y;
            ctx.lineTo(cornerX, cornerY);
            ctx.lineTo(node.x, node.y);

            ctx.strokeStyle = '#00f0ff';
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Minimalist IC pin tag
            ctx.font = '8px monospace';
            ctx.fillStyle = '#38bdf8';
            ctx.fillText(node.label, node.x + 5, node.y - 4);
            ctx.globalAlpha = 1;
          }
        }
      }

      // 2. Draw Subtle Laser Beam Mouse Trail
      if (mouseHistoryRef.current.length > 2) {
        const history = mouseHistoryRef.current;
        ctx.beginPath();
        ctx.moveTo(history[0].x, history[0].y);

        for (let i = 1; i < history.length; i++) {
          const p = history[i];
          ctx.lineTo(p.x, p.y);
        }

        ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 3. Render Particles / Sparkles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 4. Subtle Sleek Rotating Crosshair around Cursor
      if (isInside && mouse.x > 0 && mouse.y > 0) {
        const rad = 14;
        const angleOffset = time * 2.2;

        ctx.save();
        ctx.translate(mouse.x, mouse.y);
        ctx.rotate(angleOffset);

        ctx.strokeStyle = '#00f0ff';
        ctx.globalAlpha = 0.5;
        ctx.lineWidth = 1;

        // Top arc
        ctx.beginPath();
        ctx.arc(0, 0, rad, 0, Math.PI * 0.35);
        ctx.stroke();

        // Bottom arc
        ctx.beginPath();
        ctx.arc(0, 0, rad, Math.PI, Math.PI * 1.35);
        ctx.stroke();

        // Cross micro-ticks
        ctx.beginPath();
        ctx.moveTo(0, -rad - 3);
        ctx.lineTo(0, -rad + 1);
        ctx.moveTo(0, rad - 1);
        ctx.lineTo(0, rad + 3);
        ctx.moveTo(-rad - 3, 0);
        ctx.lineTo(-rad + 1, 0);
        ctx.moveTo(rad - 1, 0);
        ctx.lineTo(rad + 3, 0);
        ctx.stroke();

        ctx.restore();

        // Center micro-dot
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = '#00f0ff';
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, []);

  return (
    <canvas
      id="tech-mouse-tracker-canvas"
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30 w-full h-full"
    />
  );
};
