import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hero from "@/components/ui/animated-shader-hero"

createRoot(document.getElementById('react-hero-root')!).render(
  <StrictMode>
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
          onClick: () => {
            window.location.href = "#contact";
          }
        },
        secondary: {
          text: "Request Strategy Audit",
          onClick: () => {
            window.location.href = "#audit";
          }
        }
      }}
    />
  </StrictMode>,
)
