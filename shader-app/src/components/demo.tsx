import Hero from "@/components/ui/animated-shader-hero";

// Demo Component showing how to use the Hero
const HeroDemo: React.FC = () => {

    return (
        <div className="w-full">
            <Hero
                trustBadge={{
                    text: "AI-Driven Systems for Modern Businesses",
                    icons: ["⚡"]
                }}
                headline={{
                    line1: "AI-Powered",
                    line2: "Business Ecosystem"
                }}
                subtitle="Flare Technologies builds intelligent systems combining AI automation, software engineering, cloud infrastructure, and digital growth strategies — helping businesses launch faster, operate smarter, and scale without limits."
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

            {/* Additional content below hero */}
            <div className="bg-gray-100 p-8">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        How to Use the Hero Component
                    </h2>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <pre className="text-sm text-gray-600 overflow-x-auto">
                            {`<Hero
  trustBadge={{
    text: "Your trust badge text",
    icons: ["🚀", "⭐", "✨"] // optional
  }}
  headline={{
    line1: "Your First Line",
    line2: "Your Second Line"
  }}
  subtitle="Your compelling subtitle text goes here..."
  buttons={{
    primary: {
      text: "Primary CTA",
      onClick: handlePrimaryClick
    },
    secondary: {
      text: "Secondary CTA", 
      onClick: handleSecondaryClick
    }
  }}
  className="custom-classes" // optional
/>`}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroDemo;
