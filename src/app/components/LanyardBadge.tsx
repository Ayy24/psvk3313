'use client';

import React from 'react';

interface Props {
  isHovered: boolean;
}

export default function LanyardBadge({ isHovered }: Props) {
  return (
    <div
      style={{
        width: 170,
        height: 260,
        filter: isHovered
          ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.5)) drop-shadow(0 0 20px rgba(180,140,60,0.3))'
          : 'drop-shadow(0 8px 20px rgba(0,0,0,0.45)) drop-shadow(0 3px 6px rgba(0,0,0,0.2))',
        transform: isHovered ? 'translateY(-8px) scale(1.04) rotate(-1deg)' : 'rotate(4deg)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: 'pointer',
      }}
    >
      <svg viewBox="0 0 170 260" width="170" height="260" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Lanyard fabric - dark navy with texture */}
          <linearGradient id="lanyardFabric" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1A2240" />
            <stop offset="20%" stopColor="#243060" />
            <stop offset="40%" stopColor="#1E2A54" />
            <stop offset="60%" stopColor="#243060" />
            <stop offset="80%" stopColor="#1E2A54" />
            <stop offset="100%" stopColor="#1A2240" />
          </linearGradient>

          {/* Metal clip gradient */}
          <linearGradient id="metalClip" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D0D0D8" />
            <stop offset="25%" stopColor="#F0F0F4" />
            <stop offset="50%" stopColor="#C8C8D0" />
            <stop offset="75%" stopColor="#E8E8EC" />
            <stop offset="100%" stopColor="#A8A8B0" />
          </linearGradient>

          {/* Badge card - white PVC */}
          <linearGradient id="badgeCard" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F8F8FA" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F0F0F4" />
          </linearGradient>

          {/* Badge header - deep navy */}
          <linearGradient id="badgeHeader" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E2A5A" />
            <stop offset="50%" stopColor="#243268" />
            <stop offset="100%" stopColor="#1A2450" />
          </linearGradient>

          {/* Card edge/shadow */}
          <linearGradient id="cardEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(0,0,0,0.2)" />
            <stop offset="5%" stopColor="rgba(0,0,0,0)" />
            <stop offset="95%" stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
          </linearGradient>

          {/* Card glare */}
          <linearGradient id="cardGlare" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Photo placeholder gradient */}
          <linearGradient id="photoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8090B0" />
            <stop offset="100%" stopColor="#5A6880" />
          </linearGradient>

          <filter id="cardShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>

        {/* Lanyard strap - left side */}
        <path
          d="M62 0 Q58 18 64 32 Q70 46 72 62"
          fill="none"
          stroke="url(#lanyardFabric)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Lanyard left highlight */}
        <path
          d="M62 0 Q58 18 64 32 Q70 46 72 62"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Lanyard left edge shadow */}
        <path
          d="M62 0 Q58 18 64 32 Q70 46 72 62"
          fill="none"
          stroke="rgba(0,0,0,0.25)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="none"
        />

        {/* Lanyard strap - right side */}
        <path
          d="M108 0 Q112 18 106 32 Q100 46 98 62"
          fill="none"
          stroke="url(#lanyardFabric)"
          strokeWidth="12"
          strokeLinecap="round"
        />
        {/* Lanyard right highlight */}
        <path
          d="M108 0 Q112 18 106 32 Q100 46 98 62"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Metal clip body */}
        <rect x="70" y="58" width="30" height="16" rx="4" fill="url(#metalClip)" />
        <rect x="70" y="58" width="30" height="16" rx="4" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
        {/* Metal clip inner slot */}
        <rect x="76" y="62" width="18" height="8" rx="3" fill="rgba(0,0,0,0.15)" />
        <rect x="77" y="63" width="16" height="6" rx="2" fill="rgba(255,255,255,0.2)" />
        {/* Metal clip highlight */}
        <rect x="71" y="59" width="28" height="4" rx="3" fill="rgba(255,255,255,0.35)" />

        {/* Badge card shadow */}
        <rect x="18" y="78" width="134" height="176" rx="8" fill="rgba(0,0,0,0.25)" transform="translate(3,4)" />

        {/* Badge card body */}
        <rect x="18" y="76" width="134" height="176" rx="8" fill="url(#badgeCard)" filter="url(#cardShadow)" />
        <rect x="18" y="76" width="134" height="176" rx="8" fill="url(#cardEdge)" />

        {/* Badge header section */}
        <rect x="18" y="76" width="134" height="52" rx="8" fill="url(#badgeHeader)" />
        <rect x="18" y="110" width="134" height="18" fill="url(#badgeHeader)" />

        {/* Header decorative line */}
        <rect x="18" y="118" width="134" height="2" fill="rgba(255,200,80,0.6)" />

        {/* University/Institution logo area */}
        <rect x="26" y="84" width="32" height="32" rx="4" fill="rgba(255,255,255,0.12)" />
        <text x="42" y="105" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="18" fontWeight="900" fontFamily="serif">P</text>

        {/* Header text */}
        <text x="100" y="96" textAnchor="middle" fill="rgba(255,255,255,0.95)" fontSize="9" fontWeight="700" fontFamily="system-ui" letterSpacing="1.5">
          PSVK 3313
        </text>
        <text x="100" y="110" textAnchor="middle" fill="rgba(255,220,100,0.9)" fontSize="7.5" fontFamily="system-ui" letterSpacing="0.8">
          BENTUK &amp; BINAAN
        </text>

        {/* Photo area */}
        <rect x="28" y="130" width="44" height="52" rx="4" fill="url(#photoGrad)" />
        <rect x="28" y="130" width="44" height="52" rx="4" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
        {/* Photo silhouette */}
        <circle cx="50" cy="148" r="12" fill="rgba(255,255,255,0.25)" />
        <path d="M30 182 Q30 168 50 168 Q70 168 70 182" fill="rgba(255,255,255,0.2)" />
        {/* Photo glare */}
        <path d="M28 130 L55 130 L28 158 Z" fill="rgba(255,255,255,0.08)" />

        {/* Name and details */}
        <text x="84" y="142" textAnchor="middle" fill="#1A1A2E" fontSize="10" fontWeight="700" fontFamily="system-ui">
          @psvk3313
        </text>
        <text x="84" y="156" textAnchor="middle" fill="#3A3A5A" fontSize="8" fontFamily="system-ui">
          Design &amp; Construction
        </text>
        <text x="84" y="168" textAnchor="middle" fill="#5A5A7A" fontSize="7.5" fontFamily="system-ui">
          Class: Divergent
        </text>
        <text x="84" y="180" textAnchor="middle" fill="#7A7A9A" fontSize="7" fontFamily="system-ui">
          Sem 2 · 2026
        </text>

        {/* Divider line */}
        <line x1="26" y1="192" x2="144" y2="192" stroke="#E0E0E8" strokeWidth="1" />

        {/* Barcode area */}
        <rect x="26" y="198" width="118" height="40" rx="3" fill="white" />
        <rect x="26" y="198" width="118" height="40" rx="3" fill="none" stroke="#E0E0E8" strokeWidth="0.5" />
        {/* Barcode lines - realistic varying widths */}
        {[28,31,33,35,38,40,42,45,47,49,52,54,56,59,61,63,66,68,70,73,75,77,80,82,84,87,89,91,94,96,98,101,103,105,108,110,112,115,117,119,122,124,126,129,131,133,136,138].map((x, i) => (
          <rect
            key={i}
            x={x}
            y={200}
            width={i % 4 === 0 ? 2.5 : i % 3 === 0 ? 1.5 : 1}
            height={30}
            fill="#1A1A1A"
            opacity={i % 7 === 0 ? 0.9 : i % 5 === 0 ? 0.7 : 0.85}
          />
        ))}
        <text x="85" y="244" textAnchor="middle" fill="#8A8A9A" fontSize="7" fontFamily="monospace" letterSpacing="1">
          PSVK-0234-2026
        </text>

        {/* Card surface glare */}
        <path d="M20 78 L80 78 L20 140 Z" fill="url(#cardGlare)" />
      </svg>
    </div>
  );
}