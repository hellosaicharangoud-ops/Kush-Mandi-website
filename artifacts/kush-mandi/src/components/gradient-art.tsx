import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// This SVG generates a procedural noise pattern to give the gradients a premium, organic texture
const noiseSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`;

type GradientVariant = "hero" | "chicken" | "mutton" | "fish" | "prawns" | "ambiance" | "map";

interface GradientArtProps {
  variant: GradientVariant;
  className?: string;
  animate?: boolean;
}

export function GradientArt({ variant, className, animate = true }: GradientArtProps) {
  // We simulate the vibrant, rich colors of specific dishes using complex radial gradients
  const variants: Record<GradientVariant, string> = {
    hero: "radial-gradient(circle at 50% 50%, #2A1705 0%, #1C1C1C 80%), radial-gradient(circle at 80% 20%, rgba(200, 155, 60, 0.15) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(168, 50, 50, 0.1) 0%, transparent 40%)",
    
    chicken: "radial-gradient(circle at 30% 30%, #C89B3C 0%, transparent 60%), radial-gradient(circle at 80% 80%, #A83232 0%, transparent 50%), #2D1E15",
    
    mutton: "radial-gradient(circle at 70% 30%, #A83232 0%, transparent 60%), radial-gradient(circle at 20% 70%, #5C2A18 0%, transparent 50%), #1A120F",
    
    fish: "radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 50%), radial-gradient(circle at 10% 90%, #8A4B20 0%, transparent 60%), #251B12",
    
    prawns: "radial-gradient(circle at 80% 20%, #C44536 0%, transparent 60%), radial-gradient(circle at 20% 80%, #E28743 0%, transparent 50%), #2A1715",
    
    ambiance: "radial-gradient(circle at 50% 0%, #3B2A1A 0%, transparent 70%), radial-gradient(circle at 0% 100%, #1C1C1C 0%, transparent 50%), #141210",
    
    map: "radial-gradient(circle at 50% 50%, #2A241F 0%, #161412 100%)"
  };

  return (
    <div className={cn("relative overflow-hidden w-full h-full bg-[#1C1C1C]", className)}>
      <motion.div
        className="absolute inset-0 opacity-80 mix-blend-screen"
        style={{ background: variants[variant] }}
        animate={animate ? {
          scale: [1, 1.05, 1],
          opacity: [0.7, 0.9, 0.7],
        } : {}}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Noise Overlay */}
      <div 
        className="absolute inset-0 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: noiseSvg }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] pointer-events-none" />
    </div>
  );
}
