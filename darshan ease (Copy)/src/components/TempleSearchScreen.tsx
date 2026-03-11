import { useState } from "react";
import { Search, MapPin, Filter, Sparkles } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Temple, temples } from "../data/temples";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";

interface TempleSearchScreenProps {
  onSelectTemple: (temple: Temple) => void;
}

export function TempleSearchScreen({ onSelectTemple }: TempleSearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedState, setSelectedState] = useState<string>("all");

  // Get unique states
  const states = ["all", ...Array.from(new Set(temples.map(t => t.state)))];

  // Filter temples based on search and state
  const filteredTemples = temples.filter(temple => {
    const matchesSearch = temple.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         temple.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         temple.deity?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === "all" || temple.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-orange-950/20 dark:via-amber-950/20 dark:to-yellow-950/20">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-red-600 text-white py-16 md:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Experience Divine Darshan with Ease</span>
            </div>
            
            <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl">
              Discover Sacred Temples
            </h1>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Select your temple to access live updates, online booking, and comprehensive facilities
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="container mx-auto px-4 md:px-8 -mt-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card rounded-xl shadow-2xl p-6 md:p-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for a temple, city, or deity..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>

            {/* State Filter */}
            <div className="flex gap-2">
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger className="w-full md:w-[200px] h-12">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All States" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All States</SelectItem>
                  {states.filter(s => s !== "all").map(state => (
                    <SelectItem key={state} value={state}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Found <span className="font-semibold text-foreground">{filteredTemples.length}</span> temple{filteredTemples.length !== 1 ? 's' : ''}
            </p>
            {(searchQuery || selectedState !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedState("all");
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Temple Grid */}
      <div className="container mx-auto px-4 md:px-8 py-12">
        {filteredTemples.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="mb-2">No temples found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredTemples.map((temple, index) => (
              <motion.div
                key={temple.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index % 8) }}
              >
                <TempleCard temple={temple} onSelect={onSelectTemple} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function TempleCard({ temple, onSelect }: { temple: Temple; onSelect: (temple: Temple) => void }) {
  return (
    <div className="group bg-card border rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={temple.image}
          alt={temple.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <Badge className="bg-white/90 text-foreground backdrop-blur-sm hover:bg-white">
            {temple.state}
          </Badge>
          {temple.history && (
            <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm">
              📖 History
            </Badge>
          )}
        </div>

        {/* Temple Name Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white mb-1 line-clamp-1 text-sm md:text-base">
            {temple.name}
          </h3>
          <p className="text-white/90 text-xs flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            {temple.city}, {temple.state}
          </p>
        </div>
      </div>

      <div className="p-4">
        {/* Temple Details */}
        <div className="space-y-2 mb-4">
          {temple.deity && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span>🙏</span>
              <span>Deity: <span className="text-foreground font-medium">{temple.deity}</span></span>
            </p>
          )}
          {temple.established && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span>🏛️</span>
              <span>Est. <span className="text-foreground font-medium">{temple.established}</span></span>
            </p>
          )}
          {temple.timings && (
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <span>🕐</span>
              <span className="text-foreground font-medium line-clamp-1">{temple.timings}</span>
            </p>
          )}
        </div>

        {/* Select Button */}
        <Button 
          className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors" 
          variant="outline"
          onClick={() => onSelect(temple)}
        >
          Select Temple
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </Button>
      </div>
    </div>
  );
}
