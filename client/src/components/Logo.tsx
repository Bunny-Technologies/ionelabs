import logoImage from "@assets/logo_transparent.png";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10" }: LogoProps) {
  return (
    <img
      src={logoImage}
      alt="iOne Techlabs"
      className={`w-auto ${className}`}
      data-testid="img-logo"
    />
  );
}
