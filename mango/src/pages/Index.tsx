import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/HeroSection";
import RecipeGrid from "@/components/RecipeGrid";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-white font-sans">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 lg:ml-64">
          <HeroSection />
          <RecipeGrid />

          {/* Animated Leaf Section */}
          <section className="py-12 lg:py-16 bg-cream-50">
            <div className="container mx-auto px-4 flex flex-wrap justify-center">
              {leafData.map(([emoji, hueA, hueB], i) => (
                <LeafCard key={emoji} i={i} emoji={emoji} hueA={hueA} hueB={hueB} />
              ))}
            </div>
          </section>

          <section className="py-12 lg:py-16 bg-cream-50">
            <div className="container mx-auto px-4 text-center">
              <Link to="/add-recipe?your=1">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: -2, boxShadow: "0 8px 32px rgba(255, 87, 34, 0.25)" }}
                  whileTap={{ scale: 0.95, rotate: 2 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ display: "inline-block" }}
                >
                  <Button
                    className="bg-gradient-to-r from-terracotta-500 via-orange-400 to-yellow-300 text-white shadow-lg hover:from-terracotta-600 hover:via-orange-500 hover:to-yellow-400 border-0 px-8 py-4 text-lg font-bold rounded-full flex items-center gap-2"
                  >
                    <span role="img" aria-label="add">🍽️</span> Add Recipe
                  </Button>
                </motion.div>
              </Link>
            </div>
          </section>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Index;

// Leaf animation data
const leafData: [string, number, number][] = [
  ["🥦", 340, 10],
  ["🥕", 20, 40],
  ["🍳", 60, 90],
  ["🍔", 80, 120],
  ["🥔", 100, 140],
  ["☕", 205, 245],
  ["🍕", 260, 290],
  ["🔪", 290, 320],
];

const leafVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

function hue(h: number) {
  return `hsl(${h}, 100%, 50%)`;
}

function LeafCard({ emoji, hueA, hueB, i }: { emoji: string; hueA: number; hueB: number; i: number }) {
  const background = `linear-gradient(306deg, ${hue(hueA)}, ${hue(hueB)})`;
  return (
    <motion.div
      className={`leaf-card-container-${i}`}
      style={leafCardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >
      <div style={{ ...leafSplash, background }} />
      <motion.div style={leafCard} variants={leafVariants} className="leaf-card">
        {emoji}
      </motion.div>
    </motion.div>
  );
}

const leafCardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
};

const leafSplash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path(\"M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z\")`,
};

const leafCard: React.CSSProperties = {
  fontSize: 64,
  width: 100,
  height: 140,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,
  background: "#f5f5f5",
  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 60%",
};
