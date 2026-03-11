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
        <linearGradient id="lg-mark-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E7A42" />
          <stop offset="100%" stopColor="#124A28" />
        </linearGradient>
        <linearGradient id="lg-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E5B830" />
          <stop offset="100%" stopColor="#C89520" />
        </linearGradient>
        <linearGradient id="lg-green-t" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1B6B3D" />
          <stop offset="100%" stopColor="#0F4D2A" />
        </linearGradient>
      </defs>

      <rect x="0" y="2" width="44" height="44" rx="10" fill="url(#lg-mark-bg)" />

      <circle cx="22" cy="18" r="7.5" fill="none" stroke="url(#lg-gold)" strokeWidth="1.8" />
      <path d="M20 15 L25 18 L20 21 Z" fill="url(#lg-gold)" />

      <rect x="12" y="30" width="3.5" height="12" rx="1.75" fill="white" opacity="0.9" />
      <circle cx="22" cy="36" r="5" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
      <rect x="30" y="30" width="3.5" height="12" rx="0.5" fill="white" opacity="0.35" />

      <text
        x="54"
        y="24"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="20"
        letterSpacing="-0.3"
      >
        <tspan fill="#C89520">i</tspan>
        <tspan fill="url(#lg-green-t)">One</tspan>
      </text>

      <line x1="54" y1="30" x2="105" y2="30" stroke="url(#lg-gold)" strokeWidth="0.8" opacity="0.3" />

      <text
        x="54"
        y="42"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="400"
        fontSize="10"
        letterSpacing="5"
        fill="#8A9A90"
      >
        TECHLABS
      </text>
    </svg>
  );
}
