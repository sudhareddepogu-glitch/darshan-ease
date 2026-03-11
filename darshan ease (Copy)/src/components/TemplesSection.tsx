import { useState } from "react";
import { temples } from "../data/temples";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Search, MapPin, ArrowRight, BookOpen } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface TemplesSectionProps {
  onViewDetails: (templeId: string) => void;
}

export function TemplesSection({ onViewDetails }: TemplesSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  // Get unique states
  const states = Array.from(new Set(temples.map(t => t.state))).sort();

  // Filter and sort temples
  let filteredTemples = temples.filter((temple) => {
    const matchesSearch = searchQuery === "" || 
      temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      temple.deity.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = stateFilter === "all" || temple.state === stateFilter;
    
    return matchesSearch && matchesState;
  });

  // Sort temples
  filteredTemples = [...filteredTemples].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "state") {
      return a.state.localeCompare(b.state);
    }
    return 0;
  });

  return (
    <div className="container mx-auto px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="mb-2">Explore Temples</h1>
        <p className="text-muted-foreground">
          Discover the divine heritage of South India's most revered temples
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search temples by name, city, or deity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={stateFilter} onValueChange={setStateFilter}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All South Indian States</SelectItem>
            {states.map((state) => (
              <SelectItem key={state} value={state}>
                {state}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Sort by Name</SelectItem>
            <SelectItem value="state">Sort by State</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground">
          Showing {filteredTemples.length} {filteredTemples.length === 1 ? 'temple' : 'temples'}
        </p>
      </div>

      {/* Temple Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTemples.map((temple) => (
          <Card 
            key={temple.id}
            className="group overflow-hidden hover:shadow-xl transition-all duration-300 border hover:border-primary cursor-pointer"
            onClick={() => onViewDetails(temple.id)}
          >
            {/* Temple Image */}
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={temple.image}
                alt={temple.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                <Badge className="bg-background/90 backdrop-blur-sm">
                  {temple.state}
                </Badge>
                {temple.history && (
                  <Badge className="bg-primary/90 backdrop-blur-sm text-primary-foreground gap-1">
                    <BookOpen className="h-3 w-3" />
                    History
                  </Badge>
                )}
              </div>
            </div>

            {/* Temple Details */}
            <CardContent className="p-5">
              <h3 className="mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                {temple.name}
              </h3>
              
              <div className="flex items-start gap-2 mb-3">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground line-clamp-1">
                  {temple.city}, {temple.state}
                </p>
              </div>

              <p className="text-sm mb-4 line-clamp-2 text-foreground/80">
                ✨ {temple.highlight}
              </p>

              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-xs">
                  {temple.architecture}
                </Badge>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="gap-1 group-hover:gap-2 transition-all"
                >
                  View More
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredTemples.length === 0 && (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🕉️</div>
          <h3 className="mb-2">No temples found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery("");
              setStateFilter("all");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
