'use client';

interface NavigationProps {
  setSelectedBody: (body: string) => void;
}

const planets = [
  { id: 'mercury', name: 'MERCURY' },
  { id: 'venus', name: 'VENUS' },
  { id: 'earth', name: 'EARTH' },
  { id: 'mars', name: 'MARS' },
  { id: 'jupiter', name: 'JUPITER' },
  { id: 'saturn', name: 'SATURN' },
  { id: 'uranus', name: 'URANUS' },
  { id: 'neptune', name: 'NEPTUNE' },
];

export default function Navigation({ setSelectedBody }: NavigationProps) {
  return (
    <nav className="fixed left-0 right-0 top-24 z-40 bg-gradient-to-b from-background to-transparent pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4 pointer-events-auto">
          <button
            onClick={() => setSelectedBody('sun')}
            className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors border border-transparent hover:border-primary rounded"
          >
            SUN
          </button>
          {planets.map((planet) => (
            <button
              key={planet.id}
              onClick={() => setSelectedBody(planet.id)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors border border-transparent hover:border-primary rounded"
            >
              {planet.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
