interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid="img-logo"
      role="img"
      aria-label="iOne Techlabs"
    >
      <defs>
        <linearGradient id="lg-green" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D27B" />
          <stop offset="100%" stopColor="#1B6B3D" />
        </linearGradient>
      </defs>

      <text
        x="0"
        y="27"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="28"
        letterSpacing="-1.2"
        fill="white"
      >
        iONE
      </text>

      <circle cx="8.5" cy="8" r="2.5" fill="url(#lg-green)" />

      <line x1="62" y1="10" x2="62" y2="30" stroke="#2A2F38" strokeWidth="1" />

      <text
        x="70"
        y="22"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="400"
        fontSize="11"
        letterSpacing="5"
        fill="#6B7280"
      >
        TECHLABS
      </text>
    </svg>
  );
}
