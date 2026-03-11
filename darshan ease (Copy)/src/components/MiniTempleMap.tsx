import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { 
  DoorOpen,
  Car,
  Utensils,
  Heart,
  Info,
  Accessibility,
  Building,
  Maximize2
} from "lucide-react";

interface MiniTempleMapProps {
  onViewFullMap: () => void;
}

interface Facility {
  id: string;
  name: string;
  emoji: string;
  location: string;
  description: string;
  position: { top: string; left: string };
  color: string;
}

export function MiniTempleMap({ onViewFullMap }: MiniTempleMapProps) {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);

  const facilities: Facility[] = [
    {
      id: "entrance",
      name: "Main Entrance",
      emoji: "🛕",
      location: "North Gate",
      description: "Primary entrance for devotees. Open from 5 AM to 9 PM daily.",
      position: { top: "10%", left: "50%" },
      color: "bg-blue-500"
    },
    {
      id: "parking",
      name: "Parking Area",
      emoji: "🚗",
      location: "500m from entrance",
      description: "Spacious parking for cars, bikes, and buses.",
      position: { top: "70%", left: "20%" },
      color: "bg-purple-500"
    },
    {
      id: "prasadam",
      name: "Prasadam Counter",
      emoji: "🍛",
      location: "Near Exit",
      description: "Fresh prasadam available here.",
      position: { top: "70%", left: "80%" },
      color: "bg-green-500"
    },
    {
      id: "firstaid",
      name: "First Aid",
      emoji: "🚑",
      location: "East Wing",
      description: "24/7 medical assistance available.",
      position: { top: "40%", left: "80%" },
      color: "bg-red-500"
    },
    {
      id: "info",
      name: "Information Desk",
      emoji: "ℹ️",
      location: "Main Hall",
      description: "Get temple information and guidance.",
      position: { top: "40%", left: "20%" },
      color: "bg-orange-500"
    },
    {
      id: "wheelchair",
      name: "Wheelchair Access",
      emoji: "♿",
      location: "All areas",
      description: "Full accessibility throughout.",
      position: { top: "55%", left: "35%" },
      color: "bg-indigo-500"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Quick Navigation Map</span>
          <Button 
            size="sm" 
            variant="outline"
            onClick={onViewFullMap}
            className="gap-2"
          >
            <Maximize2 className="h-4 w-4" />
            Full Map
          </Button>
        </CardTitle>
        <CardDescription>Tap on facilities to see details</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Mini Map */}
        <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg p-4 h-[300px] border-2 border-dashed border-border">
          {/* Main Temple Sanctum */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg shadow-lg flex items-center justify-center text-white border-2 border-white">
            <div className="text-center">
              <div className="text-2xl">🛕</div>
              <p className="text-[10px] font-semibold">Sanctum</p>
            </div>
          </div>

          {/* Facility Markers */}
          {facilities.map((facility) => (
            <button
              key={facility.id}
              className={`absolute -translate-x-1/2 -translate-y-1/2 ${facility.color} text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:scale-125 transition-all duration-200 ${
                selectedFacility === facility.id ? 'ring-4 ring-white scale-125' : ''
              }`}
              style={{ 
                top: facility.position.top, 
                left: facility.position.left 
              }}
              onClick={() => setSelectedFacility(selectedFacility === facility.id ? null : facility.id)}
              title={facility.name}
            >
              <span className="text-base">{facility.emoji}</span>
            </button>
          ))}

          {/* Compass */}
          <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md">
            <div className="text-xs font-semibold">N</div>
          </div>
        </div>

        {/* Selected Facility Details */}
        {selectedFacility && (
          <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg animate-in fade-in slide-in-from-bottom-2 duration-200">
            {(() => {
              const facility = facilities.find(f => f.id === selectedFacility);
              return facility ? (
                <>
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-2xl">{facility.emoji}</span>
                    <div>
                      <h4 className="font-semibold text-sm">{facility.name}</h4>
                      <p className="text-xs text-muted-foreground">{facility.location}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{facility.description}</p>
                </>
              ) : null;
            })()}
          </div>
        )}

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          {facilities.slice(0, 6).map((facility) => (
            <div key={facility.id} className="flex items-center gap-2">
              <div className={`${facility.color} w-4 h-4 rounded-full flex items-center justify-center text-white text-[10px]`}>
                {facility.emoji}
              </div>
              <span className="text-muted-foreground truncate">{facility.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
