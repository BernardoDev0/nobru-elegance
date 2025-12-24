import { memo } from "react";
import nobruLogo from "@/assets/nobru-logo.png";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export const Logo = memo(({ className = "", variant = "light" }: LogoProps) => {
  return (
    <a href="#inicio" className={`block ${className}`}>
      <img
        src={nobruLogo}
        alt="NOBRU Buffet"
        className={`h-14 md:h-20 w-auto object-contain ${
          variant === "dark" ? "brightness-0" : ""
        }`}
      />
    </a>
  );
});

Logo.displayName = "Logo";

