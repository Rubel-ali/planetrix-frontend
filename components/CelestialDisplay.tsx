"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Footer from "./Footer";
import { Star } from "@/type";
import { celestialBodies } from "@/data/data";
import { PlanetNavButton } from "./PlanetNavButton";

interface CelestialDisplayProps {
  selectedBody: string;
  setSelectedBody: (body: string) => void;
}

export default function CelestialDisplay({
  selectedBody,
  setSelectedBody,
}: CelestialDisplayProps) {
  const [stars, setStars] = useState<Star[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Get current body details
  const currentBody =
    celestialBodies.find((b) => b.id === selectedBody) || celestialBodies[0];
  const currentBodyIndex = celestialBodies.findIndex(
    (b) => b.id === selectedBody,
  );

  useEffect(() => {
    const generatedStars: Star[] = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 5,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
    setIsMounted(true);
    setCurrentIndex(currentBodyIndex);
  }, [currentBodyIndex]);

  const getPositionStyle = (x: number, y: number) => ({
    left: `calc(50% + ${x}%)`,
    top: `calc(50% + ${y}%)`,
    transform: "translate(-50%, -50%)",
  });

  const handlePrevious = () => {
    const prevIndex =
      currentBodyIndex === 0
        ? celestialBodies.length - 1
        : currentBodyIndex - 1;
    setDirection("left");
    setSelectedBody(celestialBodies[prevIndex].id);
    setCurrentIndex(prevIndex);
    setTimeout(() => setDirection(null), 500);
  };

  const handleNext = () => {
    const nextIndex =
      currentBodyIndex === celestialBodies.length - 1
        ? 0
        : currentBodyIndex + 1;
    setDirection("right");
    setSelectedBody(celestialBodies[nextIndex].id);
    setCurrentIndex(nextIndex);
    setTimeout(() => setDirection(null), 500);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedBody}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${currentBody.backgroundImage || "/default-bg.jpg"})`,
          }}
        >
          <div className="absolute inset-0" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 pointer-events-none">
        {isMounted &&
          stars.map((star) => (
            <motion.div
              key={`star-${star.id}`}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: star.duration,
                repeat: Infinity,
                delay: star.delay,
              }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
              }}
            />
          ))}
      </div>

      <div className="relative z-20 h-full flex flex-col">
        <div className="relative flex-1 min-h-0">
          <PlanetNavButton
            direction="left"
            planetId={
              celestialBodies[
                currentBodyIndex === 0
                  ? celestialBodies.length - 1
                  : currentBodyIndex - 1
              ].id
            }
            onClick={handlePrevious}
          />
          <PlanetNavButton
            direction="right"
            planetId={
              celestialBodies[
                currentBodyIndex === celestialBodies.length - 1
                  ? 0
                  : currentBodyIndex + 1
              ].id
            }
            onClick={handleNext}
          />

          <motion.div
            key={selectedBody}
            initial={{ scale: 0, opacity: 0, rotate: -180 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{
              duration: 0.7,
              type: "spring",
              stiffness: 100,
              damping: 15,
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
          >
            <motion.div
              className="relative w-80 h-80 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl"
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <img
                src={currentBody.image}
                alt={selectedBody}
                className="absolute inset-0 w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/fallback.png";
                }}
              />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {celestialBodies
              .filter((b) => b.id !== selectedBody)
              .map((body, index) => (
                <motion.div
                  key={body.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.02 }}
                  style={getPositionStyle(body.x, body.y)}
                  className="absolute cursor-pointer z-10"
                  onClick={() => setSelectedBody(body.id)}
                >
                  <motion.div
                    whileHover={{
                      scale: 1.3,
                      boxShadow: "0 0 20px rgba(255,255,255,0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className={`${body.size} rounded-full overflow-hidden transition-all duration-300`}
                  >
                    <img
                      src={body.image}
                      alt={body.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/fallback.png";
                      }}
                    />
                  </motion.div>

                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-white text-xs whitespace-nowrap bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-sm">
                    {body.name}
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>

        <motion.div
          key={`info-${selectedBody}`}
          initial={{ y: 100, opacity: 1 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-50 border-t-2 backdrop-blur-sm border-white/10"
        >
          <Footer />
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-white/10" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 rounded-full border border-white/5" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-250 rounded-full border border-white/5" />
      </div>
    </div>
  );
}
