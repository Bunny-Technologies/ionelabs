interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 120 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid="img-logo"
      role="img"
      aria-label="iOne Techlabs"
    >
      <defs>
        <linearGradient id="lg-gold-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0C850" />
          <stop offset="100%" stopColor="#C8922A" />
        </linearGradient>
        <linearGradient id="lg-green-text" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3EBF6E" />
          <stop offset="100%" stopColor="#1B6B3D" />
        </linearGradient>
      </defs>

      <circle cx="60" cy="12" r="9" fill="none" stroke="url(#lg-gold-ring)" strokeWidth="2.2" />
      <path d="M57 9 L63.5 12 L57 15 Z" fill="url(#lg-gold-ring)" />

      <text
        x="16"
        y="40"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="600"
        fontSize="22"
        letterSpacing="-0.5"
      >
        <tspan fill="#D4A528">i</tspan>
        <tspan fill="url(#lg-green-text)">one</tspan>
      </text>

      <text
        x="75"
        y="40"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="600"
        fontSize="22"
        letterSpacing="-0.5"
        fill="url(#lg-green-text)"
      >
        
      </text>

      <text
        x="24"
        y="52"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="400"
        fontSize="9.5"
        letterSpacing="5.8"
        fill="#4A6B58"
      >
        TECHLABS
      </text>
    </svg>
  );
}
