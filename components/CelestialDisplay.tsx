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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [selectedBody]);

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
  };

  const handleNext = () => {
    const nextIndex =
      currentBodyIndex === celestialBodies.length - 1
        ? 0
        : currentBodyIndex + 1;

    setDirection("right");
    setSelectedBody(celestialBodies[nextIndex].id);
    setCurrentIndex(nextIndex);
  };

  return (
    <div className="relative w-full h-[85vh] md:h-screen overflow-hidden">
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-100 flex flex-col items-center justify-center backdrop-blur-sm gap-6"
          >
            <div
              className="
              w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80
              rounded-full bg-white/10 animate-pulse
            "
            />

            <div className="flex gap-3">
              <div className="w-10 h-4 bg-white/10 rounded animate-pulse" />
              <div className="w-16 h-4 bg-white/20 rounded animate-pulse" />
              <div className="w-12 h-4 bg-white/10 rounded animate-pulse" />
            </div>
          </motion.div>
        )}
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
              className="absolute w-px h-px sm:w-[1.5px] sm:h-[1.5px] md:w-1 md:h-1 bg-white rounded-full"
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

          {!loading && (
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
                className="
                  relative overflow-hidden shadow-2xl rounded-full
                  w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-80 lg:h-80
                "
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              >
                <img
                  src={currentBody.image}
                  alt={selectedBody}
                  className="w-full h-full object-contain"
                />
              </motion.div>
            </motion.div>
          )}

          {!loading && (
            <AnimatePresence>
              {celestialBodies
                .filter((b) => b.id !== selectedBody)
                .map((body, index) => (
                  <motion.div
                    key={body.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.02 }}
                    style={getPositionStyle(body.x, body.y)}
                    className="absolute cursor-pointer z-10"
                    onClick={() => setSelectedBody(body.id)}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`${body.size} rounded-full overflow-hidden`}
                    >
                      <img
                        src={body.image}
                        alt={body.name}
                        className="w-full h-full object-contain"
                      />
                    </motion.div>

                    <div className="absolute -bottom-5 md:-bottom-6 left-1/2 -translate-x-1/2 text-[10px] md:text-xs text-white bg-black/50 px-2 py-0.5 rounded-full">
                      {body.name}
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          )}
        </div>

        <motion.div
          key={`info-${selectedBody}`}
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-50 border-t backdrop-blur-sm border-white/10"
        >
          <Footer />
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-5">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-45 h-45 sm:w-65 sm:h-65 md:w-85 md:h-85 rounded-full border border-white/10" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-65 h-65 sm:w-90 sm:h-90 md:w-115 md:h-115 rounded-full border border-white/5" />
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 rounded-full border border-white/5" />
      </div>
    </div>
  );
}
