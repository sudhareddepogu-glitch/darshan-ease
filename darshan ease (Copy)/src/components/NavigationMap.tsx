import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Navigation, Car, Utensils, Heart, Info, Accessibility } from "lucide-react";
import { Temple } from "../data/temples";

interface NavigationMapProps {
  temple: Temple | null;
}

export function NavigationMap({ temple }: NavigationMapProps) {
  const facilities = [
    { name: "Main Entrance", icon: <MapPin />, location: "North Gate", color: "text-blue-500" },
    { name: "Parking Area", icon: <Car />, location: "500m from entrance", color: "text-purple-500" },
    { name: "Prasadam Counter", icon: <Utensils />, location: "Near Exit", color: "text-green-500" },
    { name: "First Aid", icon: <Heart />, location: "East Wing", color: "text-red-500" },
    { name: "Information Desk", icon: <Info />, location: "Main Hall", color: "text-orange-500" },
    { name: "Wheelchair Access", icon: <Accessibility />, location: "All areas", color: "text-indigo-500" },
  ];

  const nearbyPlaces = [
    { name: "City Bus Stand", distance: "2 km", type: "Transport" },
    { name: "Railway Station", distance: "5 km", type: "Transport" },
    { name: "Airport", distance: "45 km", type: "Transport" },
    { name: "Market Area", distance: "1 km", type: "Shopping" },
    { name: "ATM", distance: "500 m", type: "Service" },
    { name: "Hospital", distance: "3 km", type: "Emergency" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="mb-2">{temple ? `Navigation - ${temple.name}` : "Temple Navigation & Map"}</h2>
        <p className="text-muted-foreground">
          {temple ? `${temple.city}, ${temple.state} - ` : ""}Interactive map showing temple layout and nearby facilities
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map Placeholder */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Temple Layout</CardTitle>
              <CardDescription>Interactive temple map with facilities</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Mock Temple Map */}
              <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-8 h-[500px] border-2 border-dashed">
                {/* Main Temple */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg shadow-lg flex items-center justify-center text-white">
                  <div className="text-center">
                    <div className="text-3xl mb-1">🛕</div>
                    <p className="text-xs">Main Sanctum</p>
                  </div>
                </div>

                {/* North Entrance */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow text-sm flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Main Entrance
                </div>

                {/* Parking */}
                <div className="absolute bottom-4 left-4 bg-purple-500 text-white px-4 py-2 rounded-lg shadow text-sm flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  Parking
                </div>

                {/* Prasadam */}
                <div className="absolute bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow text-sm flex items-center gap-2">
                  <Utensils className="h-4 w-4" />
                  Prasadam
                </div>

                {/* First Aid */}
                <div className="absolute top-1/3 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow text-sm flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  First Aid
                </div>

                {/* Info Desk */}
                <div className="absolute top-1/3 left-4 bg-orange-500 text-white px-4 py-2 rounded-lg shadow text-sm flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Info Desk
                </div>

                {/* Compass */}
                <div className="absolute top-4 right-4 bg-white rounded-full p-3 shadow-lg">
                  <Navigation className="h-6 w-6 text-primary" />
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-4 py-2 rounded-lg shadow text-xs">
                  Scale: 1 cm = 20 meters
                </div>
              </div>

              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  <strong>📍 Temple Address:</strong> {temple?.address || "Sacred Temple Road, Pilgrimage City, State - 123456"}
                </p>
                <p className="text-sm mt-2">
                  <strong>🧭 GPS Coordinates:</strong> {temple ? `${temple.coordinates.lat}° N, ${temple.coordinates.lng}° E` : "12.9716° N, 77.5946° E"}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Facilities & Nearby */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Temple Facilities</CardTitle>
              <CardDescription>Available amenities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <div className={`${facility.color} mt-1`}>
                    {facility.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{facility.name}</p>
                    <p className="text-xs text-muted-foreground">{facility.location}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Nearby Places</CardTitle>
              <CardDescription>Key locations around the temple</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {nearbyPlaces.map((place, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="text-sm">{place.name}</p>
                    <Badge variant="outline" className="mt-1 text-xs">
                      {place.type}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">{place.distance}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Directions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Reach</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                🚗 By Car
              </h4>
              <p className="text-sm text-muted-foreground">
                Take Highway NH-44, exit at Junction 12. The temple is 3 km from the exit. Ample parking available.
              </p>
            </div>
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                🚌 By Bus
              </h4>
              <p className="text-sm text-muted-foreground">
                Regular buses from city center. Bus numbers: 101, 205, 308. Get down at Temple Stop.
              </p>
            </div>
            <div>
              <h4 className="mb-3 flex items-center gap-2">
                🚂 By Train
              </h4>
              <p className="text-sm text-muted-foreground">
                Nearest railway station is 5 km away. Auto-rickshaws and taxis available at the station.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
