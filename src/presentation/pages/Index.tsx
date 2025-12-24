import { lazy, Suspense, useCallback } from "react";
import { Navbar } from "../components/navigation/Navbar";
import { HeroSection } from "../components/sections/HeroSection";
import { DiferenciaisSection } from "../components/sections/DiferenciaisSection";
import { ServicosSection } from "../components/sections/ServicosSection";

// Lazy load sections below the fold for better initial performance
const ClientesSection = lazy(() =>
  import("../components/sections/ClientesSection").then((module) => ({
    default: module.ClientesSection,
  }))
);
const PortfolioSection = lazy(() =>
  import("../components/sections/PortfolioSection").then((module) => ({
    default: module.PortfolioSection,
  }))
);
const ContatoSection = lazy(() =>
  import("../components/sections/ContatoSection").then((module) => ({
    default: module.ContatoSection,
  }))
);

const Index = () => {
  const handleViewPortfolio = useCallback(() => {
    const element = document.querySelector("#portfolio");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DiferenciaisSection />
      <ServicosSection onViewPortfolio={handleViewPortfolio} />
      <Suspense fallback={<div className="h-screen" />}>
        <PortfolioSection />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <ClientesSection />
      </Suspense>
      <Suspense fallback={<div className="h-screen" />}>
        <ContatoSection />
      </Suspense>
    </main>
  );
};

export default Index;

