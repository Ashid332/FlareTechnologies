import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

// UI Components
import Hero from "@/components/ui/animated-shader-hero"
import ConsultationModal from "@/components/ui/consultation-modal"

// Brand Components
import Navbar from "@/components/Navbar"
import Philosophy from "@/components/Philosophy"
import Services from "@/components/Services"
import GrowthStack from "@/components/GrowthStack"
import WhyFlare from "@/components/WhyFlare"
import Methodology from "@/components/Methodology"
import Results from "@/components/Results"
import Contact from "@/components/Contact"
import Footer from "@/components/Footer"

function App() {
  const [isConsultationModalOpen, setConsultationModalOpen] = useState(false);

  const openModal = () => setConsultationModalOpen(true);
  const closeModal = () => setConsultationModalOpen(false);

  return (
    <>
      <Navbar onOpenModal={openModal} />

      <main>
        <Hero
          trustBadge={{
            text: "AI-Driven Systems for Modern Businesses",
            icons: ["⚡"]
          }}
          headline={{
            line1: "AI-powered",
            line2: "business ecosystem"
          }}
          subtitle="AI automation, development, cloud infrastructure, and digital growth systems"
          buttons={{
            primary: {
              text: "Book Consultation",
              onClick: openModal
            },
            secondary: {
              text: "Request Strategy Audit",
              onClick: openModal
            }
          }}
        />

        <Philosophy />
        <Services />
        <GrowthStack />
        <WhyFlare />
        <Methodology />
        <Results />
        <Contact onOpenModal={openModal} />
      </main>

      <Footer />

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={closeModal}
      />
    </>
  );
}

const rootElement = document.getElementById('react-root');
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
