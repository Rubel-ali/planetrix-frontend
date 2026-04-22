"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
    <main className="min-h-screen pb-0 flex items-center justify-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex items-center justify-center">
            <img
              src="/Group.png"
              alt="Planetrrix Logo"
              className="h-8 md:h-10 object-contain"
            />
          </div>
        </div>

        <motion.div
          key={`top-${selectedBody}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
            {data.name}
          </h2>

          <div className="flex flex-wrap gap-8 justify-center">
            {data.data.map((item, index) => (
              <DataCard
                key={index}
                label={item.label}
                value={item.value}
                isLoading={loading}
              />
            ))}
          </div>
        </motion.div>

        <div className="mb-0">
          <CelestialDisplay
            selectedBody={selectedBody}
            setSelectedBody={setSelectedBody}
          />
        </div>
      </div>
    </main>
  );
}
