import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  MapPin, 
  Navigation, 
  Car, 
  Utensils, 
  Heart, 
  Info, 
  Accessibility,
  ZoomIn,
  ZoomOut,
  ExternalLink,
  DoorOpen,
  Building
} from "lucide-react";
import { Temple } from "../data/temples";
import { MiniTempleMap } from "./MiniTempleMap";

interface InteractiveTempleMapProps {
  temple: Temple | null;
}

interface Facility {
  id: string;
  name: string;
  icon: React.ReactNode;
  emoji: string;
  location: string;
  description: string;
  position: { top: string; left: string };
  color: string;
}

export function InteractiveTempleMap({ temple }: InteractiveTempleMapProps) {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredFacility, setHoveredFacility] = useState<string | null>(null);

  const facilities: Facility[] = [
    {
      id: "entrance",
      name: "Main Entrance",
      icon: <DoorOpen className="h-4 w-4" />,
      emoji: "🛕",
      location: "North Gate",
      description: "Primary entrance for devotees. Open from 5 AM to 9 PM daily.",
      position: { top: "8%", left: "50%" },
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      id: "parking",
      name: "Parking Area",
      icon: <Car className="h-4 w-4" />,
      emoji: "🚗",
      location: "500m from entrance",
      description: "Spacious parking for cars, bikes, and buses. 24/7 security.",
      position: { top: "75%", left: "15%" },
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      id: "prasadam",
      name: "Prasadam Counter",
      icon: <Utensils className="h-4 w-4" />,
      emoji: "🍛",
      location: "Near Exit",
      description: "Fresh prasadam available. Special meals on festival days.",
      position: { top: "75%", left: "85%" },
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      id: "firstaid",
      name: "First Aid",
      icon: <Heart className="h-4 w-4" />,
      emoji: "🚑",
      location: "East Wing",
      description: "24/7 medical assistance. Qualified doctors on duty.",
      position: { top: "35%", left: "85%" },
      color: "bg-red-500 hover:bg-red-600"
    },
    {
      id: "info",
      name: "Information Desk",
      icon: <Info className="h-4 w-4" />,
      emoji: "ℹ️",
      location: "Main Hall",
      description: "Get temple information, timings, and guidance.",
      position: { top: "35%", left: "15%" },
      color: "bg-orange-500 hover:bg-orange-600"
    },
    {
      id: "wheelchair",
      name: "Wheelchair Access",
      icon: <Accessibility className="h-4 w-4" />,
      emoji: "♿",
      location: "All areas",
      description: "Full accessibility with ramps and elevators throughout.",
      position: { top: "50%", left: "25%" },
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    {
      id: "northgate",
      name: "North Gate",
      icon: <DoorOpen className="h-4 w-4" />,
      emoji: "🚪",
      location: "Secondary Entrance",
      description: "Alternative entrance for VIP and special darshan.",
      position: { top: "12%", left: "75%" },
      color: "bg-cyan-500 hover:bg-cyan-600"
    },
    {
      id: "toilets",
      name: "Restrooms",
      icon: <Building className="h-4 w-4" />,
      emoji: "🚻",
      location: "Multiple Locations",
      description: "Clean restroom facilities available at multiple points.",
      position: { top: "60%", left: "50%" },
      color: "bg-teal-500 hover:bg-teal-600"
    }
  ];

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.6));
  };

  const openGoogleMaps = () => {
    if (temple) {
      const url = `https://www.google.com/maps/search/?api=1&query=${temple.coordinates.lat},${temple.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  const scrollToFullMap = () => {
    document.getElementById('full-map-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 md:px-8 py-8 md:py-12">
      <div className="mb-6 md:mb-8">
        <h2 className="mb-2">
          {temple ? `Navigation & Facilities - ${temple.name}` : "Temple Navigation & Map"}
        </h2>
        <p className="text-muted-foreground">
          {temple ? `${temple.city}, ${temple.state} - ` : ""}Interactive map showing temple layout and facilities
        </p>
      </div>

      {/* Mini Map Preview */}
      <div className="mb-8">
        <MiniTempleMap onViewFullMap={scrollToFullMap} />
      </div>

      <div id="full-map-section" className="grid lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
              <div>
                <CardTitle>Interactive Temple Layout</CardTitle>
                <CardDescription>Click on facilities for details • Zoom to explore</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 0.6}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-xs text-muted-foreground min-w-[60px] text-center">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 2}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {/* Map Container with Overflow */}
              <div className="relative overflow-auto bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 rounded-lg border-2 border-dashed border-border">
                <div 
                  className="relative w-full h-[500px] md:h-[600px] transition-transform duration-300"
                  style={{ 
                    transform: `scale(${zoomLevel})`,
                    transformOrigin: 'center center',
                    minWidth: '100%',
                    minHeight: '100%'
                  }}
                >
                  {/* Main Temple Sanctum */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg shadow-2xl flex items-center justify-center text-white border-4 border-white">
                    <div className="text-center">
                      <div className="text-4xl md:text-5xl mb-2">🛕</div>
                      <p className="text-xs md:text-sm font-semibold">Main Sanctum</p>
                      <p className="text-[10px] md:text-xs opacity-90">Garbhagriha</p>
                    </div>
                  </div>

                  {/* Dynamic Facilities */}
                  {facilities.map((facility) => (
                    <div
                      key={facility.id}
                      className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110 group"
                      style={{ 
                        top: facility.position.top, 
                        left: facility.position.left 
                      }}
                      onMouseEnter={() => setHoveredFacility(facility.id)}
                      onMouseLeave={() => setHoveredFacility(null)}
                    >
                      {/* Facility Marker */}
                      <div className={`${facility.color} text-white px-3 py-2 md:px-4 md:py-2 rounded-lg shadow-lg text-xs md:text-sm flex items-center gap-2 transition-all`}>
                        <span className="text-base md:text-lg">{facility.emoji}</span>
                        <span className="hidden sm:inline whitespace-nowrap">{facility.name}</span>
                      </div>

                      {/* Tooltip on Hover */}
                      {hoveredFacility === facility.id && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-border animate-in fade-in slide-in-from-bottom-2 duration-200">
                          <div className="flex items-start gap-2 mb-2">
                            <span className="text-xl">{facility.emoji}</span>
                            <div className="flex-1">
                              <p className="font-semibold text-sm">{facility.name}</p>
                              <p className="text-xs text-muted-foreground">{facility.location}</p>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {facility.description}
                          </p>
                          {/* Arrow */}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white dark:border-t-gray-800"></div>
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Compass */}
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
                    <Navigation className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-semibold">N</span>
                  </div>

                  {/* Scale */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 dark:bg-gray-800/95 backdrop-blur px-4 py-2 rounded-lg shadow text-xs font-medium">
                    Scale: 1 cm = 20 meters
                  </div>
                </div>
              </div>

              {/* Temple Information */}
              <div className="mt-4 p-4 bg-muted rounded-lg space-y-2">
                <p className="text-sm flex items-start gap-2">
                  <span className="font-semibold min-w-[120px]">📍 Address:</span>
                  <span className="text-muted-foreground">{temple?.address || "Sacred Temple Road, Pilgrimage City"}</span>
                </p>
                <p className="text-sm flex items-start gap-2">
                  <span className="font-semibold min-w-[120px]">🧭 GPS:</span>
                  <span className="text-muted-foreground">
                    {temple ? `${temple.coordinates.lat}° N, ${temple.coordinates.lng}° E` : "12.9716° N, 77.5946° E"}
                  </span>
                </p>
                <p className="text-sm flex items-start gap-2">
                  <span className="font-semibold min-w-[120px]">🕐 Hours:</span>
                  <span className="text-muted-foreground">{temple?.timings || "5:00 AM - 9:00 PM (Daily)"}</span>
                </p>
              </div>

              {/* Get Directions Button */}
              <Button 
                className="w-full mt-4" 
                onClick={openGoogleMaps}
                disabled={!temple}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Get Directions on Google Maps
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Legend & Facilities List */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Facilities Legend</CardTitle>
              <CardDescription>All available amenities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {facilities.map((facility) => (
                <div
                  key={facility.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors cursor-pointer"
                  onMouseEnter={() => setHoveredFacility(facility.id)}
                  onMouseLeave={() => setHoveredFacility(null)}
                >
                  <div className={`${facility.color} text-white p-2 rounded-lg shadow-sm transition-transform ${hoveredFacility === facility.id ? 'scale-110' : ''}`}>
                    <span className="text-base">{facility.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{facility.name}</p>
                    <p className="text-xs text-muted-foreground">{facility.location}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Nearby Places */}
          <Card>
            <CardHeader>
              <CardTitle>Nearby Locations</CardTitle>
              <CardDescription>Key places around temple</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { name: "City Bus Stand", distance: "2 km", type: "Transport", emoji: "🚌" },
                { name: "Railway Station", distance: "5 km", type: "Transport", emoji: "🚂" },
                { name: "Airport", distance: "45 km", type: "Transport", emoji: "✈️" },
                { name: "Market Area", distance: "1 km", type: "Shopping", emoji: "🛒" },
                { name: "ATM", distance: "500 m", type: "Service", emoji: "🏧" },
                { name: "Hospital", distance: "3 km", type: "Emergency", emoji: "🏥" },
              ].map((place, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{place.emoji}</span>
                    <div>
                      <p className="text-sm font-medium">{place.name}</p>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {place.type}
                      </Badge>
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">{place.distance}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* How to Reach */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Reach</CardTitle>
          <CardDescription>Multiple transport options available</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="mb-3 flex items-center gap-2 text-sm md:text-base">
                <span className="text-2xl">🚗</span>
                <span className="font-semibold">By Car</span>
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Take Highway NH-44, exit at Junction 12. The temple is 3 km from the exit. Ample parking available.
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="mb-3 flex items-center gap-2 text-sm md:text-base">
                <span className="text-2xl">🚌</span>
                <span className="font-semibold">By Bus</span>
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Regular buses from city center. Bus numbers: 101, 205, 308. Get down at Temple Stop.
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <h4 className="mb-3 flex items-center gap-2 text-sm md:text-base">
                <span className="text-2xl">🚂</span>
                <span className="font-semibold">By Train</span>
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nearest railway station is 5 km away. Auto-rickshaws and taxis available at the station.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
