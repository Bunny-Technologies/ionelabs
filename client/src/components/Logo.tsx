import logoImg from "@assets/images/logo-ione.png";


interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-10" }: LogoProps) {
  return (
    <img
      src={logoImg}
      alt="iOne Techlabs"
      className={className}
      data-testid="img-logo"
    />
  );
}
