import { useId } from "react";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10" }: LogoProps) {
  const uid = useId();
  const goldId = `lg-gold-${uid}`;
  const greenId = `lg-green-${uid}`;
  const clipId = `clip-o-${uid}`;

  return (
    <svg
      viewBox="0 0 170 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid="img-logo"
      role="img"
      aria-label="iOne Techlabs"
    >
      <defs>
        <linearGradient id={goldId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0B820" />
          <stop offset="100%" stopColor="#D49B10" />
        </linearGradient>
        <linearGradient id={greenId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1A7A3D" />
          <stop offset="100%" stopColor="#14612F" />
        </linearGradient>
        <clipPath id={clipId}>
          <rect x="30" y="10" width="20" height="40" />
        </clipPath>
      </defs>

      <circle cx="14" cy="7.5" r="7.5" fill={`url(#${goldId})`} />
      <path d="M12 4.8 L17 7.5 L12 10.2 Z" fill="white" />

      <text
        x="0"
        y="40"
        fontFamily="'Georgia', 'Times New Roman', serif"
        fontWeight="700"
        fontSize="38"
        letterSpacing="-1"
      >
        <tspan fill={`url(#${greenId})`}>i</tspan>
      </text>

      <text
        x="15"
        y="40"
        fontFamily="'Georgia', 'Times New Roman', serif"
        fontWeight="700"
        fontSize="38"
        letterSpacing="-1"
        fill="#D49B10"
      >o</text>
      <text
        x="15"
        y="40"
        fontFamily="'Georgia', 'Times New Roman', serif"
        fontWeight="700"
        fontSize="38"
        letterSpacing="-1"
        fill={`url(#${greenId})`}
        clipPath={`url(#${clipId})`}
      >o</text>

      <text
        x="37"
        y="40"
        fontFamily="'Georgia', 'Times New Roman', serif"
        fontWeight="700"
        fontSize="38"
        letterSpacing="-1"
        fill={`url(#${greenId})`}
      >ne</text>

      <text
        x="2"
        y="54"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="400"
        fontSize="8.5"
        letterSpacing="6.8"
        fill="#8A9A90"
      >TECHLABS</text>
    </svg>
  );
}
