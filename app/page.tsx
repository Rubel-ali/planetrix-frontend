"use client";

import { useState } from "react";
import Hero from "@/components/Hero";

export default function Home() {
  const [selectedCelestialBody, setSelectedCelestialBody] = useState("mercury");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <Hero
        selectedBody={selectedCelestialBody}
        setSelectedBody={setSelectedCelestialBody}
      />
    </div>
  );
}
