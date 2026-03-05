interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 220 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid="img-logo"
      role="img"
      aria-label="iOne Techlabs"
    >
      <defs>
        <linearGradient id="lg-mark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2BA85A" />
          <stop offset="100%" stopColor="#145C30" />
        </linearGradient>
        <linearGradient id="lg-gold" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E5A623" />
          <stop offset="100%" stopColor="#F0C050" />
        </linearGradient>
        <linearGradient id="lg-text" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#C0C5CC" />
        </linearGradient>
      </defs>

      <rect x="0" y="4" width="40" height="40" rx="8" fill="url(#lg-mark)" />
      <rect x="0" y="4" width="40" height="40" rx="8" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1" />

      <text
        x="7"
        y="33"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="24"
        letterSpacing="-0.5"
        fill="white"
        opacity="0.95"
      >
        iO
      </text>
      <text
        x="27.5"
        y="33"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="24"
        letterSpacing="-0.5"
        fill="url(#lg-gold)"
        opacity="0.95"
      >
        ne
      </text>

      <text
        x="50"
        y="25"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="18"
        letterSpacing="1"
        fill="url(#lg-text)"
      >
        iONE
      </text>

      <line x1="50" y1="31" x2="96" y2="31" stroke="url(#lg-gold)" strokeWidth="1" opacity="0.4" />

      <text
        x="50"
        y="41"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="400"
        fontSize="10"
        letterSpacing="4.5"
        fill="#6B7280"
      >
        TECHLABS
      </text>
    </svg>
  );
}
