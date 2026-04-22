"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CelestialDisplay from "./CelestialDisplay";
import DataCard from "./DataCard";
import { celestialData } from "@/data/data";

interface HeroProps {
  selectedBody: string;
  setSelectedBody: (body: string) => void;
}

export default function Hero({ selectedBody, setSelectedBody }: HeroProps) {
  const data =
    celestialData[selectedBody as keyof typeof celestialData] ||
    celestialData.sun;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [selectedBody]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="py-4 sm:py-5 flex justify-center">
          <img src="/Group.png" className="h-8 sm:h-10" />
        </div>

        <div className="text-center mb-8 sm:mb-12 min-h-30 sm:min-h-35 md:min-h-40">

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="title-skeleton"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-10 sm:h-14 md:h-16 w-40 sm:w-64 md:w-80 bg-white/10 rounded-lg mx-auto mb-6 animate-pulse"
              />
            ) : (
              <motion.h2
                key={selectedBody}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-3xl sm:text-5xl md:text-6xl font-bold mb-6"
              >
                {data.name}
              </motion.h2>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
            {data.data.map((item, index) => (
              <DataCard
                key={index}
                label={item.label}
                value={item.value}
                isLoading={loading}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex-1">
        <CelestialDisplay
          selectedBody={selectedBody}
          setSelectedBody={setSelectedBody}
        />
      </div>
    </main>
  );
}