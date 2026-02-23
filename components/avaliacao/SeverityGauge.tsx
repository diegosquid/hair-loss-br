"use client";

import { SeverityInfo } from "@/lib/avaliacao/types";

interface SeverityGaugeProps {
  score: number;
  severity: SeverityInfo;
}

export default function SeverityGauge({ score, severity }: SeverityGaugeProps) {
  // Map score (0-100) to angle (0-180 degrees for semicircle)
  const angle = (score / 100) * 180;

  // Gauge dimensions
  const size = 240;
  const center = size / 2;
  const radius = 90;
  const strokeWidth = 18;

  // Convert angle to SVG arc coordinates
  const polarToCartesian = (cx: number, cy: number, r: number, deg: number) => {
    const rad = ((deg - 180) * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  const describeArc = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
    return `M ${end.x} ${end.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${start.x} ${start.y}`;
  };

  // Color segments for the gauge background
  const segments = [
    { start: 0, end: 27, color: "#3d7a54" },    // forest (mínima)
    { start: 27, end: 54, color: "#8fa98b" },    // sage (leve)
    { start: 54, end: 108, color: "#c67a3c" },   // terra (moderada)
    { start: 108, end: 144, color: "#a85d2a" },  // terra-700 (significativa)
    { start: 144, end: 180, color: "#8a4420" },   // terra-800 (severa)
  ];

  // Needle endpoint
  const needleEnd = polarToCartesian(center, center, radius - strokeWidth / 2 - 8, angle);
  const needleBase = polarToCartesian(center, center, 12, angle);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size / 2 + 30 }}>
        <svg
          width={size}
          height={size / 2 + 30}
          viewBox={`0 0 ${size} ${size / 2 + 30}`}
          className="overflow-visible"
        >
          {/* Background segments */}
          {segments.map((seg, i) => (
            <path
              key={i}
              d={describeArc(seg.start, seg.end)}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              opacity={0.2}
            />
          ))}

          {/* Active arc (filled up to score) */}
          {angle > 0 && (
            <path
              d={describeArc(0, Math.min(angle, 180))}
              fill="none"
              stroke="url(#gaugeGradient)"
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          )}

          {/* Gradient definition */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3d7a54" />
              <stop offset="30%" stopColor="#8fa98b" />
              <stop offset="55%" stopColor="#c67a3c" />
              <stop offset="80%" stopColor="#a85d2a" />
              <stop offset="100%" stopColor="#8a4420" />
            </linearGradient>
          </defs>

          {/* Needle */}
          <line
            x1={center}
            y1={center}
            x2={needleEnd.x}
            y2={needleEnd.y}
            stroke="#44403c"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <circle cx={center} cy={center} r="6" fill="#44403c" />
          <circle cx={center} cy={center} r="3" fill="white" />

          {/* Labels at 0 and 100 */}
          <text x={center - radius - 8} y={center + 18} className="fill-warm-400 text-[11px]" textAnchor="middle">
            0
          </text>
          <text x={center + radius + 8} y={center + 18} className="fill-warm-400 text-[11px]" textAnchor="middle">
            100
          </text>
        </svg>

      </div>

      {/* Score number below the gauge */}
      <div className="flex flex-col items-center mt-[-10px] mb-2">
        <div className="text-4xl md:text-5xl font-display font-bold text-warm-950 leading-none">
          {score}
        </div>
        <div className="text-xs md:text-sm text-warm-500 font-medium mt-1">pontos</div>
      </div>

      {/* Severity label */}
      <div className={`mt-3 px-5 py-2 rounded-full border ${severity.bgColor} ${severity.borderColor}`}>
        <span className={`text-sm font-semibold ${severity.color}`}>
          Severidade: {severity.label}
        </span>
      </div>
    </div>
  );
}
