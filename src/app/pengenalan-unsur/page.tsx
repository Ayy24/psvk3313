'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Vec2 {x: number;y: number;}

interface Block {
  id: number;
  label: string;
  labelIndex: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  angularVel: number;
  size: number;
  mass: number;
  restitution: number;
  isGrabbed: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const LABELS = ['Garisan', 'Bentuk', 'Rupa', 'Warna', 'Jalinan', 'Ruang'];

const DESCRIPTIONS: Record<string, string> = {
  Garisan: 'Garisan merupakan kesan pergerakan titik yang mempunyai arah, panjang dan bentuk tertentu. Dalam karya tiga dimensi, garisan dapat membentuk kontur, corak, struktur dan arah pergerakan sesuatu karya.',
  Rupa: 'Rupa ialah bentuk dua dimensi yang mempunyai panjang dan lebar. Rupa boleh digunakan sebagai asas untuk menghasilkan bentuk tiga dimensi melalui proses melipat, memotong, membentuk atau membina.',
  Bentuk: 'Bentuk mempunyai ciri tiga dimensi, iaitu panjang, lebar dan tinggi. Bentuk merupakan unsur utama dalam bidang Membentuk dan Membuat Binaan kerana menjadi asas kepada penghasilan objek dan karya tiga dimensi.',
  Jalinan: 'Jalinan merujuk kepada sifat atau keadaan permukaan sesuatu objek yang dapat dilihat atau dirasai melalui sentuhan. Dalam karya, jalinan boleh terhasil daripada sifat semula jadi bahan atau teknik yang digunakan oleh pengkarya.',
  Ruang: 'Ruang ialah kawasan atau jarak yang wujud di dalam, di antara dan di sekeliling sesuatu bentuk. Dalam karya tiga dimensi, pengolahan ruang dapat mewujudkan kedalaman serta hubungan antara karya dengan persekitarannya.',
  Warna: 'Warna merupakan unsur visual yang terhasil melalui pantulan cahaya dan digunakan untuk mewujudkan kesan visual, suasana, penegasan serta harmoni dalam karya.'
};

// Bold solid 3D block colors — each label gets a distinct vivid color
const BLOCK_COLORS: Record<string, {face: string;top: string;side: string;soft: string;text: string;}> = {
  Garisan: {
    face: '#E63946', // vivid red
    top: '#FF6B74',
    side: '#9B1D23',
    soft: '#FDECEA',
    text: '#7A1018'
  },
  Bentuk: {
    face: '#2196F3', // vivid blue
    top: '#64B5F6',
    side: '#0D47A1',
    soft: '#E3F2FD',
    text: '#0D47A1'
  },
  Rupa: {
    face: '#FF9800', // vivid orange
    top: '#FFB74D',
    side: '#E65100',
    soft: '#FFF3E0',
    text: '#BF360C'
  },
  Warna: {
    face: '#9C27B0', // vivid purple
    top: '#CE93D8',
    side: '#4A148C',
    soft: '#F3E5F5',
    text: '#4A148C'
  },
  Jalinan: {
    face: '#4CAF50', // vivid green
    top: '#81C784',
    side: '#1B5E20',
    soft: '#E8F5E9',
    text: '#1B5E20'
  },
  Ruang: {
    face: '#FF5722', // vivid deep orange
    top: '#FF8A65',
    side: '#BF360C',
    soft: '#FBE9E7',
    text: '#BF360C'
  }
};

// Accurate Unsplash images representing each unsur seni
const UNSUR_IMAGES: Record<string, {url: string;alt: string;}> = {
  Garisan: {
    url: "https://img.rocket.new/generatedImages/rocket_gen_img_48db88844-1789668025710.png",
    alt: 'Garisan — pelbagai jenis garisan dalam seni visual'
  },
  Bentuk: {
    url: "https://img.rocket.new/generatedImages/rocket_gen_img_4f3e8defe-1789668025068.png",
    alt: 'Bentuk — objek tiga dimensi dalam seni'
  },
  Rupa: {
    url: "https://images.unsplash.com/photo-1722440814495-3d2d3107a7de",
    alt: 'Rupa — bentuk dua dimensi dan corak geometri'
  },
  Warna: {
    url: "https://images.unsplash.com/photo-1718987629067-ba156dbe7eeb",
    alt: 'Warna — palet warna yang pelbagai dalam seni visual'
  },
  Jalinan: {
    url: "https://img.rocket.new/generatedImages/rocket_gen_img_408498b8d-1789668025193.png",
    alt: 'Jalinan — tekstur dan permukaan bahan seni'
  },
  Ruang: {
    url: "https://img.rocket.new/generatedImages/rocket_gen_img_4cedc4668-1789668026118.png",
    alt: 'Ruang — kedalaman dan ruang dalam karya seni tiga dimensi'
  }
};

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function createBlocks(canvasW: number): Block[] {
  const blocks: Block[] = [];
  let id = 0;
  for (let li = 0; li < LABELS.length; li++) {
    for (let copy = 0; copy < 2; copy++) {
      const size = randomBetween(34, 50);
      blocks.push({
        id: id++,
        label: LABELS[li],
        labelIndex: li,
        x: randomBetween(canvasW * 0.08, canvasW * 0.92),
        y: randomBetween(-320, -40) - id * 65,
        vx: randomBetween(-1.5, 1.5),
        vy: randomBetween(0.5, 2),
        angle: randomBetween(-0.25, 0.25),
        angularVel: randomBetween(-0.025, 0.025),
        size,
        mass: 1,
        restitution: 0.42,
        isGrabbed: false
      });
    }
  }
  return blocks;
}

// ─── Draw a solid 3D block square ─────────────────────────────────────────────
function draw3DBlock(ctx: CanvasRenderingContext2D, block: Block, highlight: boolean) {
  const colors = BLOCK_COLORS[block.label];
  ctx.save();
  ctx.translate(block.x, block.y);
  ctx.rotate(block.angle);

  const s = block.size;
  const depth = s * 0.32; // 3D extrusion depth
  const r = 6; // corner radius

  // ── Drop shadow ──
  ctx.shadowColor = 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = 16;
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 8;

  // ── Right side face (darker) ──
  ctx.beginPath();
  ctx.moveTo(s, -s);
  ctx.lineTo(s + depth, -s - depth);
  ctx.lineTo(s + depth, s - depth);
  ctx.lineTo(s, s);
  ctx.closePath();
  ctx.fillStyle = colors.side;
  ctx.fill();

  // ── Top face (lighter) ──
  ctx.beginPath();
  ctx.moveTo(-s, -s);
  ctx.lineTo(-s + depth, -s - depth);
  ctx.lineTo(s + depth, -s - depth);
  ctx.lineTo(s, -s);
  ctx.closePath();
  ctx.fillStyle = colors.top;
  ctx.fill();

  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // ── Front face (main) with rounded rect ──
  ctx.beginPath();
  ctx.roundRect(-s, -s, s * 2, s * 2, r);
  ctx.fillStyle = colors.face;
  ctx.fill();

  // ── Highlight sheen on front face ──
  const hlGrad = ctx.createLinearGradient(-s, -s, -s + s * 0.9, -s + s * 0.6);
  hlGrad.addColorStop(0, 'rgba(255,255,255,0.38)');
  hlGrad.addColorStop(0.5, 'rgba(255,255,255,0.10)');
  hlGrad.addColorStop(1, 'rgba(255,255,255,0.0)');
  ctx.beginPath();
  ctx.roundRect(-s, -s, s * 2, s * 2, r);
  ctx.fillStyle = hlGrad;
  ctx.fill();

  // ── Border / outline ──
  ctx.beginPath();
  ctx.roundRect(-s, -s, s * 2, s * 2, r);
  ctx.strokeStyle = highlight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.25)';
  ctx.lineWidth = highlight ? 3 : 1.5;
  ctx.stroke();

  // ── Label text ──
  const fontSize = Math.max(9, s * 0.36);
  ctx.font = `bold ${fontSize}px "Segoe UI", "Arial", sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Text shadow
  ctx.fillStyle = 'rgba(0,0,0,0.45)';
  ctx.fillText(block.label, 1.5, 1.5);

  // White label text
  ctx.fillStyle = '#ffffff';
  ctx.fillText(block.label, 0, 0);

  ctx.restore();
}

function getHalfSize(block: Block) {return block.size * 1.05;}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function PengenalanUnsurPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blocksRef = useRef<Block[]>([]);
  const rafRef = useRef<number>(0);
  const grabRef = useRef<{id: number;offsetX: number;offsetY: number;} | null>(null);
  const velHistRef = useRef<Vec2[]>([]);
  const lastMouseRef = useRef<{x: number;y: number;t: number;}>({ x: 0, y: 0, t: 0 });
  const canvasSizeRef = useRef<{w: number;h: number;}>({ w: 0, h: 0 });

  const [activeDescription, setActiveDescription] = useState<string | null>(null);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [descVisible, setDescVisible] = useState(false);
  const [imgError, setImgError] = useState(false);

  const gravityRef = useRef(0.5);
  const bouncinessRef = useRef(0.42);
  const frictionRef = useRef(0.16);
  const throwPowerRef = useRef(1.3);

  const initBlocks = useCallback((w: number) => {
    blocksRef.current = createBlocks(w);
  }, []);

  // ─── Physics + render loop ────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      canvasSizeRef.current = { w: canvas.width, h: canvas.height };
      if (blocksRef.current.length === 0) initBlocks(canvas.width);
    };
    resize();
    window.addEventListener('resize', resize);

    const WALL = 8;

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      const g = gravityRef.current;
      const bounce = bouncinessRef.current;
      const fric = frictionRef.current;

      ctx.clearRect(0, 0, W, H);

      const blocks = blocksRef.current;

      for (const bl of blocks) {
        if (bl.isGrabbed) continue;

        bl.vy += g;
        bl.vx *= 1 - fric * 0.04;
        bl.x += bl.vx;
        bl.y += bl.vy;
        bl.angle += bl.angularVel;
        bl.angularVel *= 0.98;

        const hs = getHalfSize(bl);

        if (bl.y + hs > H - WALL) {
          bl.y = H - WALL - hs;
          bl.vy *= -bounce;
          bl.vx *= 1 - fric * 0.35;
          bl.angularVel *= 0.82;
          if (Math.abs(bl.vy) < 0.6) bl.vy = 0;
        }
        if (bl.y - hs < WALL) {
          bl.y = WALL + hs;
          bl.vy *= -bounce;
        }
        if (bl.x - hs < WALL) {
          bl.x = WALL + hs;
          bl.vx *= -bounce;
          bl.angularVel *= 0.8;
        }
        if (bl.x + hs > W - WALL) {
          bl.x = W - WALL - hs;
          bl.vx *= -bounce;
          bl.angularVel *= 0.8;
        }
      }

      for (let i = 0; i < blocks.length; i++) {
        for (let j = i + 1; j < blocks.length; j++) {
          const a = blocks[i];
          const b = blocks[j];
          const ra = getHalfSize(a);
          const rb = getHalfSize(b);
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const overlapX = ra + rb - Math.abs(dx);
          const overlapY = ra + rb - Math.abs(dy);

          if (overlapX > 0 && overlapY > 0) {
            if (overlapX < overlapY) {
              const nx = dx > 0 ? 1 : -1;
              a.x -= nx * overlapX * 0.5;
              b.x += nx * overlapX * 0.5;
              const relVx = b.vx - a.vx;
              if (relVx * nx < 0) {
                const impulse = -(1 + bouncinessRef.current) * relVx * nx / 2;
                a.vx -= impulse * nx;
                b.vx += impulse * nx;
                a.angularVel += relVx * 0.03;
                b.angularVel -= relVx * 0.03;
              }
            } else {
              const ny = dy > 0 ? 1 : -1;
              a.y -= ny * overlapY * 0.5;
              b.y += ny * overlapY * 0.5;
              const relVy = b.vy - a.vy;
              if (relVy * ny < 0) {
                const impulse = -(1 + bouncinessRef.current) * relVy * ny / 2;
                a.vy -= impulse * ny;
                b.vy += impulse * ny;
              }
            }
          }
        }
      }

      for (const bl of blocks) {
        draw3DBlock(ctx, bl, bl.isGrabbed);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [initBlocks]);

  // ─── Pointer helpers ──────────────────────────────────────────────────────
  const getCanvasPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    let cx: number, cy: number;
    if ('touches' in e) {
      cx = e.touches[0]?.clientX ?? lastMouseRef.current.x;
      cy = e.touches[0]?.clientY ?? lastMouseRef.current.y;
    } else {
      cx = (e as React.MouseEvent).clientX;
      cy = (e as React.MouseEvent).clientY;
    }
    return { x: (cx - rect.left) * scaleX, y: (cy - rect.top) * scaleY };
  };

  // ─── Single tap → show description; also start grab ──────────────────────
  const onPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = getCanvasPos(e);
    const now = Date.now();
    const blocks = blocksRef.current;

    for (let i = blocks.length - 1; i >= 0; i--) {
      const bl = blocks[i];
      const hs = getHalfSize(bl);
      if (Math.abs(pos.x - bl.x) < hs && Math.abs(pos.y - bl.y) < hs) {
        // Show description on single tap
        setActiveLabel(bl.label);
        setActiveDescription(DESCRIPTIONS[bl.label] ?? '');
        setDescVisible(true);
        setImgError(false);

        // Also start grab
        bl.isGrabbed = true;
        bl.vx = 0;
        bl.vy = 0;
        bl.angularVel = 0;
        grabRef.current = { id: bl.id, offsetX: pos.x - bl.x, offsetY: pos.y - bl.y };
        velHistRef.current = [];
        lastMouseRef.current = { x: pos.x, y: pos.y, t: now };
        break;
      }
    }
  };

  const onPointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!grabRef.current) return;
    const pos = getCanvasPos(e);
    const bl = blocksRef.current.find((s) => s.id === grabRef.current!.id);
    if (!bl) return;
    bl.x = pos.x - grabRef.current.offsetX;
    bl.y = pos.y - grabRef.current.offsetY;

    const now = Date.now();
    const dt = Math.max(1, now - lastMouseRef.current.t);
    velHistRef.current.push({
      x: (pos.x - lastMouseRef.current.x) / dt * 16,
      y: (pos.y - lastMouseRef.current.y) / dt * 16
    });
    if (velHistRef.current.length > 6) velHistRef.current.shift();
    lastMouseRef.current = { x: pos.x, y: pos.y, t: now };
  };

  const onPointerUp = useCallback(() => {
    if (!grabRef.current) return;
    const bl = blocksRef.current.find((s) => s.id === grabRef.current!.id);
    if (bl) {
      bl.isGrabbed = false;
      const hist = velHistRef.current;
      if (hist.length > 0) {
        const avgVx = hist.reduce((s, v) => s + v.x, 0) / hist.length;
        const avgVy = hist.reduce((s, v) => s + v.y, 0) / hist.length;
        const tp = throwPowerRef.current;
        bl.vx = avgVx * tp;
        bl.vy = avgVy * tp;
        bl.angularVel = avgVx * 0.035 * tp;
      }
    }
    grabRef.current = null;
    velHistRef.current = [];
  }, []);

  const activeColors = activeLabel ? BLOCK_COLORS[activeLabel] : null;
  const activeImage = activeLabel ? UNSUR_IMAGES[activeLabel] : null;

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ fontFamily: '"Georgia", serif', display: 'flex', flexDirection: 'column' }}>
      
      {/* ── Background — warm wooden desk ── */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/IMG_2667-1789661380498.jpeg"
          alt="Latar belakang meja kayu"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
        
        <div className="absolute inset-0" style={{ background: 'rgba(40,20,5,0.38)' }} />
      </div>

      {/* ── Title bar ── */}
      <div className="relative z-10 flex justify-center pt-4 pb-2 px-4 flex-shrink-0">
        <div style={{
          background: 'rgba(60,30,10,0.82)',
          backdropFilter: 'blur(14px)',
          borderRadius: '14px',
          padding: '9px 32px',
          border: '1.5px solid rgba(210,160,80,0.5)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,220,140,0.15)'
        }}>
          <h1 style={{
            fontFamily: '"Georgia", "Times New Roman", serif',
            fontSize: 'clamp(0.85rem, 2.2vw, 1.25rem)',
            fontWeight: 700,
            color: '#F0D090',
            letterSpacing: '0.06em',
            margin: 0,
            textShadow: '0 1px 8px rgba(180,100,20,0.6)'
          }}>
            1.3.1 Unsur Seni
          </h1>
        </div>
      </div>

      {/* ── Main area: canvas full width ── */}
      <div className="relative z-10 flex flex-1 mx-3 mb-3 overflow-hidden" style={{ minHeight: 0 }}>

        {/* ── Physics canvas (full width) ── */}
        <div
          className="relative flex-1 rounded-2xl overflow-hidden"
          style={{
            border: '1.5px solid rgba(180,120,50,0.4)',
            boxShadow: '0 8px 40px rgba(0,0,0,0.4)',
            background: 'rgba(40,20,5,0.12)',
            minWidth: 0
          }}>
          
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block', cursor: grabRef.current ? 'grabbing' : 'grab', touchAction: 'none' }}
            onMouseDown={onPointerDown}
            onMouseMove={onPointerMove}
            onMouseUp={onPointerUp}
            onMouseLeave={onPointerUp}
            onTouchStart={onPointerDown}
            onTouchMove={onPointerMove}
            onTouchEnd={onPointerUp} />
          

          {/* Instruction hint */}
          <div style={{
            position: 'absolute',
            top: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(50,25,8,0.80)',
            backdropFilter: 'blur(8px)',
            borderRadius: '20px',
            padding: '5px 18px',
            border: '1px solid rgba(200,150,70,0.35)',
            color: 'rgba(240,210,150,0.95)',
            fontSize: '13px',
            fontWeight: 700,
            letterSpacing: '0.04em',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            fontFamily: '"Segoe UI", sans-serif'
          }}>
            tekan bentuk👇🏻
          </div>
        </div>
      </div>

      {/* ── Description overlay (appears on tap) ── */}
      {descVisible && activeLabel && activeColors &&
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 50,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(20,10,3,0.60)',
          backdropFilter: 'blur(5px)',
          padding: '20px'
        }}
        onClick={() => setDescVisible(false)}>
        
          <div
          style={{
            background: activeColors.soft,
            borderRadius: '22px',
            border: `3px solid ${activeColors.face}`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.55), 0 0 0 1px ${activeColors.face}44`,
            padding: '0',
            maxWidth: '460px',
            width: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}
          onClick={(e) => e.stopPropagation()}>
          
            {/* Colored header strip */}
            <div style={{
            background: activeColors.face,
            padding: '16px 20px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* 3D mini block icon */}
                <div style={{
                width: '28px',
                height: '28px',
                background: activeColors.top,
                borderRadius: '5px',
                boxShadow: `3px 3px 0 ${activeColors.side}`,
                flexShrink: 0
              }} />
                <h2 style={{
                fontFamily: '"Segoe UI", "Arial", sans-serif',
                fontSize: 'clamp(1.2rem, 4vw, 1.6rem)',
                fontWeight: 800,
                color: '#ffffff',
                margin: 0,
                letterSpacing: '0.02em',
                textShadow: '0 2px 6px rgba(0,0,0,0.3)'
              }}>
                  {activeLabel}
                </h2>
              </div>
              <button
              onClick={() => setDescVisible(false)}
              style={{
                background: 'rgba(255,255,255,0.25)',
                border: '1.5px solid rgba(255,255,255,0.5)',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 700,
                lineHeight: 1,
                flexShrink: 0
              }}>
              
                ✕
              </button>
            </div>

            {/* Image representing the unsur */}
            {activeImage && !imgError &&
          <div style={{ width: '100%', height: '160px', overflow: 'hidden', position: 'relative' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
              src={activeImage.url}
              alt={activeImage.alt}
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block'
              }} />
            
                {/* Soft color overlay tint */}
                <div style={{
              position: 'absolute',
              inset: 0,
              background: `${activeColors.face}22`
            }} />
              </div>
          }

            {/* Description body */}
            <div style={{ padding: '18px 22px 20px' }}>
              {/* Unsur Seni label */}
              <div style={{
              display: 'inline-block',
              background: activeColors.face,
              color: '#ffffff',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              borderRadius: '20px',
              padding: '3px 12px',
              marginBottom: '12px',
              fontFamily: '"Segoe UI", sans-serif'
            }}>
                Unsur Seni
              </div>

              <p style={{
              color: activeColors.text,
              fontSize: 'clamp(0.88rem, 2vw, 1rem)',
              lineHeight: 1.75,
              margin: 0,
              fontFamily: '"Georgia", serif',
              fontWeight: 500
            }}>
                {activeDescription}
              </p>

              <div style={{
              marginTop: '14px',
              textAlign: 'center',
              color: `${activeColors.face}88`,
              fontSize: '11px',
              fontFamily: '"Segoe UI", sans-serif',
              letterSpacing: '0.04em'
            }}>
                Ketuk di luar untuk tutup
              </div>
            </div>
          </div>
        </div>
      }

      {/* ── Navigation ── */}
      <div className="relative z-10 flex justify-between items-center px-6 pb-4 pt-1 flex-shrink-0">
        <Link href="/pengenalan-up">
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(50,25,8,0.82)', backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(180,120,50,0.45)', borderRadius: '50px',
              padding: '10px 24px', fontWeight: 700, fontSize: '14px',
              color: '#E8C880', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              fontFamily: '"Segoe UI", sans-serif'
            }}>
            
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Kembali
          </button>
        </Link>

        <button
          onClick={() => {
            const canvas = canvasRef.current;
            if (canvas) {
              blocksRef.current = [];
              initBlocks(canvas.width);
              setActiveDescription(null);
              setActiveLabel(null);
              setDescVisible(false);
            }
          }}
          style={{
            background: 'rgba(180,120,50,0.18)', backdropFilter: 'blur(8px)',
            border: '1.5px solid rgba(180,120,50,0.4)', borderRadius: '50px',
            padding: '10px 16px', fontWeight: 700, fontSize: '16px',
            color: '#E8C880', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '44px', height: '44px'
          }}
          title="Jana Semula">
          
          🔄
        </button>

        <Link href="/projects">
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'rgba(160,100,30,0.88)', backdropFilter: 'blur(8px)',
              border: '1.5px solid rgba(210,160,80,0.6)', borderRadius: '50px',
              padding: '10px 24px', fontWeight: 700, fontSize: '14px',
              color: '#FFF0C8', cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              fontFamily: '"Segoe UI", sans-serif'
            }}>
            
            Seterusnya
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </Link>
      </div>
    </div>);

}