interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      data-testid="img-logo"
      role="img"
      aria-label="iOne Techlabs"
    >
      <defs>
        <linearGradient id="lg-mark" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D27B" />
          <stop offset="50%" stopColor="#1B6B3D" />
          <stop offset="100%" stopColor="#0F4D2A" />
        </linearGradient>
        <linearGradient id="lg-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F5D06B" />
          <stop offset="100%" stopColor="#E5A623" />
        </linearGradient>
        <linearGradient id="lg-text" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#B0B8C1" />
        </linearGradient>
      </defs>

      <rect x="1" y="4" width="40" height="40" rx="10" fill="url(#lg-mark)" />

      <rect x="1" y="4" width="40" height="40" rx="10" fill="none" stroke="white" strokeWidth="0.5" opacity="0.15" />

      <rect x="14" y="14" width="4" height="20" rx="2" fill="white" opacity="0.95" />

      <circle cx="28" cy="28" r="6.5" fill="none" stroke="white" strokeWidth="3" opacity="0.9" />

      <circle cx="16" cy="10" r="2" fill="url(#lg-gold)" />

      <text
        x="52"
        y="29"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="22"
        letterSpacing="0.3"
        fill="url(#lg-text)"
      >
        iOne
      </text>

      <text
        x="110"
        y="29"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontWeight="300"
        fontSize="22"
        letterSpacing="0.3"
        fill="#6B7280"
      >
        Techlabs
      </text>
    </svg>
  );
}
