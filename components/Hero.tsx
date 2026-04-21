"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import CelestialDisplay from "./CelestialDisplay";
import DataCard from "./DataCard";

interface HeroProps {
  selectedBody: string;
  setSelectedBody: (body: string) => void;
}

const celestialData = {
  sun: {
    name: "SUN",
    position: "center",
    data: [
      { label: "GALAXY", value: "Milky Way" },
      { label: "DIAMETER", value: "1,392,684 km" },
      { label: "LENGTH OF DAY", value: "—" },
      { label: "AVERAGE TEMPERATURE", value: "5800 Kelvin" },
    ],
    description:
      "The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma...",
    color: "#ff6b35",
  },
  mercury: {
    name: "MERCURY",
    position: "left",
    data: [
      { label: "GALAXY", value: "Milky Way" },
      { label: "DIAMETER", value: "4,879 km" },
      { label: "LENGTH OF DAY", value: "59 Earth days" },
      { label: "AVERAGE TEMPERATURE", value: "167°C" },
    ],
    description:
      "Mercury is the smallest planet in our Solar System and the closest to the Sun.",
    color: "#9ca3b8",
  },
  venus: {
    name: "VENUS",
    position: "left-mid",
    data: [
      { label: "GALAXY", value: "Milky Way" },
      { label: "DIAMETER", value: "12,104 km" },
      { label: "LENGTH OF DAY", value: "243 Earth days" },
      { label: "AVERAGE TEMPERATURE", value: "464°C" },
    ],
    description:
      "Venus is the second planet from the Sun and is the hottest planet in our Solar System.",
    color: "#ffa500",
  },
  earth: {
    name: "EARTH",
    position: "left",
    data: [
      { label: "GALAXY", value: "Milky Way" },
      { label: "DIAMETER", value: "12,742 km" },
      { label: "LENGTH OF DAY", value: "24 hours" },
      { label: "AVERAGE TEMPERATURE", value: "15°C" },
    ],
    description:
      "Earth is our home. It is the only known planet to harbor life.",
    color: "#4a5a8f",
  },
  mars: {
    name: "MARS",
    position: "right",
    data: [
      { label: "GALAXY", value: "Milky Way" },
      { label: "DIAMETER", value: "6,779 km" },
      { label: "LENGTH OF DAY", value: "24.6 hours" },
      { label: "AVERAGE TEMPERATURE", value: "-65°C" },
    ],
    description:
      "Mars is the fourth planet from the Sun and is known as the Red Planet.",
    color: "#d74e09",
  },
  jupiter: {
    name: "JUPITER",
    position: "right",
    data: [
      { label: "GALAXY", value: "Milky Way" },
      { label: "DIAMETER", value: "139,820 km" },
      { label: "LENGTH OF DAY", value: "10 hours" },
      { label: "AVERAGE TEMPERATURE", value: "-110°C" },
    ],
    description:
      "Jupiter is the largest planet in our Solar System, a gas giant with a strong magnetic field.",
    color: "#c88b3a",
  },
  saturn: {
    name: "SATURN",
    position: "right-mid",
    data: [
      { label: "GALAXY", value: "Milky Way" },
      { label: "DIAMETER", value: "116,460 km" },
      { label: "LENGTH OF DAY", value: "10.7 hours" },
      { label: "AVERAGE TEMPERATURE", value: "-140°C" },
    ],
    description:
      "Saturn is known for its prominent ring system and is a gas giant.",
    color: "#f0d899",
  },
  uranus: {
    name: "URANUS",
    position: "right",
    data: [
      { label: "GALAXY", value: "Milky Way" },
      { label: "DIAMETER", value: "50,724 km" },
      { label: "LENGTH OF DAY", value: "17 hours" },
      { label: "AVERAGE TEMPERATURE", value: "-195°C" },
    ],
    description: "Uranus is an ice giant that rotates on its side.",
    color: "#4a9fb5",
  },
  neptune: {
    name: "NEPTUNE",
    position: "left",
    data: [
      { label: "GALAXY", value: "Milky Way" },
      { label: "DIAMETER", value: "49,244 km" },
      { label: "LENGTH OF DAY", value: "16 hours" },
      { label: "AVERAGE TEMPERATURE", value: "-200°C" },
    ],
    description:
      "Neptune is the eighth planet from the Sun and is an ice giant.",
    color: "#4166f5",
  },
};

export default function Hero({ selectedBody, setSelectedBody }: HeroProps) {
  const data =
    celestialData[selectedBody as keyof typeof celestialData] ||
    celestialData.sun;

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

        {/* Title and Stats Section */}
        <motion.div
          key={`top-${selectedBody}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-10 text-foreground">
            {data.name}
          </h2>

          {/* Data Cards Row */}
          <div className="flex flex-wrap gap-8 justify-center">
            {data.data.map((item, index) => (
              <DataCard key={index} label={item.label} value={item.value} />
            ))}
          </div>
        </motion.div>

        {/* Celestial Display - Full width */}
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
