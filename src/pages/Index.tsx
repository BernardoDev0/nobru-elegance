import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DiferenciaisSection from "@/components/DiferenciaisSection";
import ServicosSection from "@/components/ServicosSection";
import ClientesSection from "@/components/ClientesSection";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DiferenciaisSection />
      <ServicosSection />
      <ClientesSection />
    </main>
  );
};

export default Index;
