import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { IndianRupee, MapPin, Star, Wifi, UtensilsCrossed, AirVent, Tv, Phone } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Temple } from "../data/temples";

interface AccommodationSectionProps {
  temple: Temple | null;
}

export function AccommodationSection({ temple }: AccommodationSectionProps) {
  const accommodations = [
    {
      id: 1,
      name: "Temple Dharamshala",
      type: "Dharamshala",
      price: 200,
      priceType: "per room/night",
      distance: "100m from temple",
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1708616178113-f687b1113414?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaW1wbGUlMjBkaGFyYW1zaGFsYSUyMGFjY29tbW9kYXRpb258ZW58MXx8fHwxNzYwMzUwNjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["Basic Rooms", "Clean Beds", "Common Bathroom"],
      availability: "Available",
      rooms: 12,
    },
    {
      id: 2,
      name: "Pilgrim's Rest Hotel",
      type: "Budget Hotel",
      price: 800,
      priceType: "per room/night",
      distance: "500m from temple",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1497128742402-653a7e07f344?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRnZXQlMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYwMzUwNjM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["AC", "TV", "Wifi", "Attached Bathroom"],
      availability: "Available",
      rooms: 8,
    },
    {
      id: 3,
      name: "Divine Stay Lodge",
      type: "Lodge",
      price: 500,
      priceType: "per room/night",
      distance: "300m from temple",
      rating: 4.0,
      image: "https://images.unsplash.com/photo-1716875672821-7325be489634?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2RnZSUyMGV4dGVyaW9yJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYwMzUwNjM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["Fan", "Clean Rooms", "Hot Water"],
      availability: "Available",
      rooms: 15,
    },
    {
      id: 4,
      name: "Sacred Heights Resort",
      type: "Resort",
      price: 2500,
      priceType: "per room/night",
      distance: "2km from temple",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1722409195473-d322e99621e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBwb29sfGVufDF8fHx8MTc2MDI3MDA1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["AC", "TV", "Wifi", "Restaurant", "Swimming Pool"],
      availability: "Limited",
      rooms: 3,
    },
    {
      id: 5,
      name: "Temple View Guest House",
      type: "Guest House",
      price: 1200,
      priceType: "per room/night",
      distance: "200m from temple",
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1650816570002-828b44ff7a2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWVzdGhvdXNlJTIwcmVjZXB0aW9ufGVufDF8fHx8MTc2MDM1MDYzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["AC", "TV", "Wifi", "Breakfast Included"],
      availability: "Available",
      rooms: 10,
    },
    {
      id: 6,
      name: "Devotee's Comfort Inn",
      type: "Budget Hotel",
      price: 600,
      priceType: "per room/night",
      distance: "800m from temple",
      rating: 3.9,
      image: "https://images.unsplash.com/photo-1608022099316-02dbaebb4d7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWRnZXQlMjBpbm4lMjBob3RlbHxlbnwxfHx8fDE3NjAzNTA2MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      amenities: ["Fan", "TV", "Clean Rooms"],
      availability: "Available",
      rooms: 20,
    },
  ];

  const amenityIcons: Record<string, React.ReactNode> = {
    "AC": <AirVent className="h-4 w-4" />,
    "TV": <Tv className="h-4 w-4" />,
    "Wifi": <Wifi className="h-4 w-4" />,
    "Restaurant": <UtensilsCrossed className="h-4 w-4" />,
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="mb-2">Accommodation & Lodging</h2>
        <p className="text-muted-foreground">
          Verified hotels, dharamshalas, and lodges near the temple
        </p>
      </div>

      {/* Filter/Sort (Simplified) */}
      <div className="mb-6 flex flex-wrap gap-2">
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">All Types</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">Dharamshala</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">Budget Hotels</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">Resorts</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">Sort by Price</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-accent">Sort by Distance</Badge>
      </div>

      {/* Accommodation Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accommodations.map((place) => (
          <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <ImageWithFallback
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-3 right-3">
                {place.type}
              </Badge>
              <Badge 
                variant={place.availability === "Available" ? "secondary" : "destructive"}
                className="absolute top-3 left-3"
              >
                {place.availability}
              </Badge>
            </div>
            
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-lg">{place.name}</CardTitle>
                <div className="flex items-center gap-1 text-sm shrink-0">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{place.rating}</span>
                </div>
              </div>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {place.distance}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {place.amenities.map((amenity, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs gap-1">
                    {amenityIcons[amenity]}
                    {amenity}
                  </Badge>
                ))}
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <div className="flex items-center gap-1 text-2xl">
                    <IndianRupee className="h-5 w-5" />
                    {place.price}
                  </div>
                  <p className="text-xs text-muted-foreground">{place.priceType}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {place.rooms} rooms available
                  </p>
                </div>
                <Button size="sm">Book Now</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Important Information */}
      <Card className="mt-8 bg-muted">
        <CardHeader>
          <CardTitle>Booking Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="mb-3">General Guidelines</h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Advance booking recommended during festivals</li>
                <li>• Check-in time: 12:00 PM</li>
                <li>• Check-out time: 11:00 AM</li>
                <li>• ID proof mandatory at check-in</li>
                <li>• Prices may vary during peak season</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3">Contact for Booking</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 XXXXX XXXXX (24/7 Helpline)</span>
                </div>
                <p className="text-muted-foreground">
                  Our team can help you find the best accommodation based on your budget and preferences.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
