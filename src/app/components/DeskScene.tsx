'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MatchaCup from './MatchaCup';
import SmartphoneProp from './SmartphoneProp';
import LanyardBadge from './LanyardBadge';
import PortfolioFolder from './PortfolioFolder';
import DeskDecorations from './DeskDecorations';
import ClickHint from './ClickHint';

export default function DeskScene() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pop-up number badge style
  const popBadge = (num: number, bg: string, color: string, rotate: number) => (
    <div
      style={{
        position: 'absolute',
        top: '-14px',
        right: '-10px',
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: bg,
        boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.7) inset, 0 -2px 0 rgba(0,0,0,0.15) inset',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Segoe UI", sans-serif',
        fontWeight: 900,
        fontSize: '16px',
        color: color,
        border: '3px solid rgba(255,255,255,0.9)',
        zIndex: 30,
        transform: `rotate(${rotate}deg) scale(1)`,
        transition: 'transform 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        letterSpacing: '-0.5px',
        animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both',
      }}
    >
      {num}
    </div>
  );

  return (
    <div className="relative w-full min-h-screen overflow-hidden wood-bg select-none">
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          70% { transform: scale(1.2) rotate(var(--r, 8deg)); opacity: 1; }
          100% { transform: scale(1) rotate(var(--r, 8deg)); opacity: 1; }
        }
      `}</style>
      {/* Realistic wood grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(178deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 48px),
            repeating-linear-gradient(182deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 32px),
            repeating-linear-gradient(179deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 2px, transparent 2px, transparent 80px)
          `,
        }}
      />

      {/* Ambient light */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,240,200,0.12) 0%, transparent 70%)' }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.28) 70%, rgba(0,0,0,0.55) 100%)' }}
      />

      {/* Side shadows */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.15) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.12) 100%)' }}
      />

      {/* ── TITLE STICKER ── */}
      <div className="absolute top-6 left-1/2 z-30 flex flex-col items-center" style={{ transform: 'translateX(-50%)' }}>
        <div className="title-entrance" style={{ animationDelay: '0.1s' }}>
          <div
            className="relative px-6 py-3 rounded-2xl"
            style={{
              background: 'var(--sticker-white)',
              boxShadow: '2px 4px 12px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.8) inset',
              transform: 'rotate(-0.5deg)',
            }}
          >
            <div
              className="absolute -top-3 left-1/2 w-20 h-5 rounded-sm opacity-80"
              style={{
                transform: 'translateX(-50%) rotate(-1deg)',
                background: 'repeating-linear-gradient(90deg, rgba(255,220,100,0.8), rgba(255,235,130,0.8) 10px, rgba(255,210,90,0.8) 20px)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}
            />
            <h1
              className="font-display text-center tracking-wide"
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 2.2rem)',
                color: '#3D2B1F',
                fontWeight: 900,
                letterSpacing: '0.05em',
                lineHeight: 1.2,
              }}
            >
              PSVK 3313
              <span className="block" style={{ fontSize: 'clamp(0.9rem, 2.2vw, 1.6rem)', fontWeight: 700 }}>
                BENTUK &amp; BINAAN
              </span>
            </h1>
          </div>
        </div>
      </div>

      {/* ── DESK DECORATIONS (non-clickable) ── */}
      <DeskDecorations />

      {/* ── MATCHA CUP (→ Nota Proses) — #5, top left, larger ── */}
      <Link
        href="/process-notes"
        className="absolute z-20"
        style={{ top: '5%', left: '3%' }}
        onMouseEnter={() => setHovered('matcha')}
        onMouseLeave={() => setHovered(null)}
        aria-label="Cawan matcha — lawati Nota Proses"
      >
        <div className="entrance-fade" style={{ animationDelay: '0.3s', position: 'relative' }}>
          <div style={{ transform: 'scale(1.25)', transformOrigin: 'top left' }}>
            <MatchaCup isHovered={hovered === 'matcha'} />
          </div>
          {/* Number 5 badge — pop-up */}
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              right: '-10px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFE066 0%, #FFB347 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.7) inset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              color: '#5C3A1E',
              border: '3px solid rgba(255,255,255,0.9)',
              zIndex: 30,
              transform: 'rotate(8deg)',
              letterSpacing: '-0.5px',
            }}
          >
            5
          </div>
        </div>
        {hovered === 'matcha' && mounted && (
          <ClickHint label="Nota Proses" />
        )}
      </Link>

      {/* ── SMARTPHONE (→ Tentang) — #4, left, larger ── */}
      <Link
        href="/about"
        className="absolute z-20"
        style={{ top: '30%', left: '2%' }}
        onMouseEnter={() => setHovered('phone')}
        onMouseLeave={() => setHovered(null)}
        aria-label="Telefon pintar — lawati halaman Tentang"
      >
        <div className="entrance-fade" style={{ animationDelay: '0.5s', position: 'relative' }}>
          <div style={{ transform: 'scale(1.25)', transformOrigin: 'top left' }}>
            <SmartphoneProp isHovered={hovered === 'phone'} />
          </div>
          {/* Number 4 badge — pop-up */}
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              right: '-10px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #A8E6CF 0%, #56C596 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.7) inset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              color: '#1A4731',
              border: '3px solid rgba(255,255,255,0.9)',
              zIndex: 30,
              transform: 'rotate(-6deg)',
              letterSpacing: '-0.5px',
            }}
          >
            4
          </div>
        </div>
        {hovered === 'phone' && mounted && (
          <ClickHint label="Tentang / Profil" />
        )}
      </Link>

      {/* ── ROUND GLASSES (→ Tentang) — #1, top right, larger & round ── */}
      <Link
        href="/about"
        className="absolute z-20"
        style={{ top: '8%', right: '3%' }}
        onMouseEnter={() => setHovered('glasses')}
        onMouseLeave={() => setHovered(null)}
        aria-label="Cermin mata — lawati halaman Tentang"
      >
        <div className="entrance-fade" style={{ animationDelay: '0.35s', position: 'relative' }}>
          {/* Round glasses SVG — larger */}
          <svg
            viewBox="0 0 180 80"
            width="180"
            height="80"
            style={{
              filter: hovered === 'glasses' ?'drop-shadow(0 6px 18px rgba(0,0,0,0.55)) drop-shadow(0 2px 6px rgba(0,0,0,0.4))' :'drop-shadow(0 4px 12px rgba(0,0,0,0.4)) drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              transition: 'filter 0.2s ease, transform 0.2s ease',
              transform: hovered === 'glasses' ? 'scale(1.06) rotate(-2deg)' : 'rotate(-3deg)',
            }}
          >
            <defs>
              <linearGradient id="glassFrameR" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2A1A0A" />
                <stop offset="40%" stopColor="#3D2510" />
                <stop offset="100%" stopColor="#1A0E05" />
              </linearGradient>
              <linearGradient id="lensLeftR" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(180,220,255,0.18)" />
                <stop offset="50%" stopColor="rgba(200,235,255,0.08)" />
                <stop offset="100%" stopColor="rgba(160,200,240,0.22)" />
              </linearGradient>
              <linearGradient id="lensRightR" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(180,220,255,0.18)" />
                <stop offset="50%" stopColor="rgba(200,235,255,0.08)" />
                <stop offset="100%" stopColor="rgba(160,200,240,0.22)" />
              </linearGradient>
            </defs>
            {/* Left temple arm */}
            <path d="M10 38 L2 42 L2 62 Q2 65 5 65 L8 65 Q10 65 10 62 L10 42 Z" fill="url(#glassFrameR)" />
            {/* Right temple arm */}
            <path d="M170 38 L178 42 L178 62 Q178 65 175 65 L172 65 Q170 65 170 62 L170 42 Z" fill="url(#glassFrameR)" />
            {/* Left round lens frame */}
            <circle cx="52" cy="40" r="30" fill="url(#glassFrameR)" />
            {/* Left round lens glass */}
            <circle cx="52" cy="40" r="25" fill="url(#lensLeftR)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
            {/* Left lens highlight */}
            <path d="M34 26 Q42 20 52 22" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Right round lens frame */}
            <circle cx="128" cy="40" r="30" fill="url(#glassFrameR)" />
            {/* Right round lens glass */}
            <circle cx="128" cy="40" r="25" fill="url(#lensRightR)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
            {/* Right lens highlight */}
            <path d="M110 26 Q118 20 128 22" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Bridge */}
            <path d="M82 36 Q90 28 98 36" stroke="url(#glassFrameR)" strokeWidth="6" fill="none" strokeLinecap="round" />
            <path d="M82 36 Q90 28 98 36" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            {/* Frame top edge highlight */}
            <path d="M28 16 Q52 8 76 16" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M104 16 Q128 8 152 16" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          </svg>
          {/* Number 1 badge — pop-up */}
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              right: '-10px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFB3C6 0%, #FF6B9D 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.7) inset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              color: '#5C0A2E',
              border: '3px solid rgba(255,255,255,0.9)',
              zIndex: 30,
              transform: 'rotate(-8deg)',
              letterSpacing: '-0.5px',
            }}
          >
            1
          </div>
        </div>
        {hovered === 'glasses' && mounted && (
          <ClickHint label="Tentang / Profil" position="left" />
        )}
      </Link>

      {/* ── LANYARD BADGE (→ Pengenalan) — #2, further down right ── */}
      <Link
        href="/pengenalan"
        className="absolute z-20"
        style={{ top: '28%', right: '1%' }}
        onMouseEnter={() => setHovered('lanyard')}
        onMouseLeave={() => setHovered(null)}
        aria-label="Lanyard — lawati halaman Pengenalan"
      >
        <div className="entrance-fade" style={{ animationDelay: '0.4s', position: 'relative' }}>
          <div style={{ transform: 'scale(1.2)', transformOrigin: 'top right' }}>
            <LanyardBadge isHovered={hovered === 'lanyard'} />
          </div>
          {/* Number 2 badge — pop-up */}
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              left: '-10px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFB3C6 0%, #FF6B9D 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.7) inset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              color: '#5C0A2E',
              border: '3px solid rgba(255,255,255,0.9)',
              zIndex: 30,
              transform: 'rotate(-5deg)',
              letterSpacing: '-0.5px',
            }}
          >
            2
          </div>
        </div>
        {hovered === 'lanyard' && mounted && (
          <ClickHint label="Pengenalan" position="left" />
        )}
      </Link>

      {/* ── PORTFOLIO FOLDER (→ Projek) — #3 ── */}
      <Link
        href="/projects"
        className="absolute z-20"
        style={{
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
        onMouseEnter={() => setHovered('folder')}
        onMouseLeave={() => setHovered(null)}
        aria-label="Folder portfolio — lawati halaman Projek"
      >
        <div className="entrance-drop" style={{ animationDelay: '0.6s', position: 'relative' }}>
          <PortfolioFolder isHovered={hovered === 'folder'} />
          {/* Number 3 badge — pop-up */}
          <div
            style={{
              position: 'absolute',
              top: '-14px',
              right: '-10px',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #B3D4FF 0%, #5B9BF5 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.7) inset',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: '"Segoe UI", sans-serif',
              fontWeight: 900,
              fontSize: '16px',
              color: '#0D2B5E',
              border: '3px solid rgba(255,255,255,0.9)',
              zIndex: 30,
              transform: 'rotate(6deg)',
              letterSpacing: '-0.5px',
            }}
          >
            3
          </div>
        </div>
        {hovered === 'folder' && mounted && (
          <ClickHint label="Projek &amp; Karya" />
        )}
      </Link>

      {/* ── BOTTOM LABEL ── */}
      <div
        className="absolute bottom-4 left-1/2 z-30 text-center entrance-fade"
        style={{ transform: 'translateX(-50%)', animationDelay: '1.2s' }}
      >
        <p
          className="font-sans text-xs tracking-widest uppercase"
          style={{ color: 'rgba(255,255,255,0.45)' }}
        >
          Klik pada objek untuk meneroka
        </p>
      </div>
    </div>
  );
}