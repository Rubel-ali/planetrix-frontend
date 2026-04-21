import { celestialBodies } from "@/data/data";

export const PlanetNavButton = ({
  direction,
  planetId,
  onClick,
}: {
  direction: "left" | "right";
  planetId: string;
  onClick: () => void;
}) => {
  const planet = celestialBodies.find((b) => b.id === planetId);
  if (!planet) return null;

  return (
    <button
      onClick={onClick}
      className="absolute top-1/2 -translate-y-1/2 z-40 cursor-pointer transition-all duration-200 group"
      style={{ 
        [direction === "left" ? "left" : "right"]: "-50px", // Half button outside layout
      }}
    >
      <div className="relative">
        {/* Main container with half visible */}
        <div 
          className="w-30 h-30 md:w-30 md:h-30 rounded-full overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-600 group-hover:border-yellow-400 transition-all duration-300"
          
        >
          <img
            src={planet.image}
            alt={planet.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        {/* Extended half that shows outside */}
        <div 
          className="absolute top-0 w-30 h-30 md:w-30 md:h-30 rounded-full overflow-hidden bg-gray-800/50 backdrop-blur-sm"
        >
          <img
            src={planet.image}
            alt={planet.name}
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        
        {/* Center cut line */}
        <div 
          className={`absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white to-transparent ${
            direction === "left" ? "left-0" : "right-0"
          }`}
        />
      </div>
      
      {/* Planet name label */}
      <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 px-2 py-0.5 rounded-full backdrop-blur-sm">
        {planet.name}
      </span>
    </button>
  );
};