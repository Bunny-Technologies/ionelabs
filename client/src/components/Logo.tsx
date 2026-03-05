interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid="img-logo"
      role="img"
      aria-label="iOne Techlabs"
    >
      <defs>
        <linearGradient id="lg-accent" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2BA85A" />
          <stop offset="100%" stopColor="#1B6B3D" />
        </linearGradient>
      </defs>

      <rect x="0" y="8" width="3" height="16" rx="1.5" fill="url(#lg-accent)" />

      <text
        x="10"
        y="28"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="600"
        fontSize="26"
        letterSpacing="-0.8"
        fill="white"
      >
        i
      </text>
      <text
        x="19"
        y="28"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="600"
        fontSize="26"
        letterSpacing="-0.8"
        fill="url(#lg-accent)"
      >
        One
      </text>

      <text
        x="72"
        y="28"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="300"
        fontSize="26"
        letterSpacing="-0.8"
        fill="#5A6270"
      >
        Techlabs
      </text>
    </svg>
  );
}
