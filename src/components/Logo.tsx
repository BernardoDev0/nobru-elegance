import nobruLogo from "@/assets/nobru-logo.png";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

const Logo = ({ className = "", variant = "light" }: LogoProps) => {
  return (
    <a href="#inicio" className={`block ${className}`}>
      <img
        src={nobruLogo}
        alt="NOBRU Buffet"
        className={`h-10 md:h-12 w-auto object-contain ${
          variant === "dark" ? "brightness-0" : ""
        }`}
      />
    </a>
  );
};

export default Logo;
