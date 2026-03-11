import { useState } from "react";
import { temples, Temple } from "../data/temples";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Search, MapPin, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface TempleSelectorProps {
  selectedTemple: Temple | null;
  onSelectTemple: (temple: Temple) => void;
}

export function TempleSelector({ selectedTemple, onSelectTemple }: TempleSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(!selectedTemple);

  const filteredTemples = temples.filter((temple) => {
    const query = searchQuery.toLowerCase();
    return (
      temple.name.toLowerCase().includes(query) ||
      temple.city.toLowerCase().includes(query) ||
      temple.state.toLowerCase().includes(query) ||
      temple.deity.toLowerCase().includes(query)
    );
  });

  const handleSelectTemple = (temple: Temple) => {
    onSelectTemple(temple);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {selectedTemple ? (
          <Button variant="outline" className="gap-2">
            <MapPin className="h-4 w-4" />
            <span className="hidden sm:inline">{selectedTemple.name}</span>
            <span className="sm:hidden">{selectedTemple.city}</span>
            <X className="h-3 w-3 opacity-50" />
          </Button>
        ) : (
          <Button className="gap-2">
            <Search className="h-4 w-4" />
            Select Temple
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select a Temple</DialogTitle>
          <DialogDescription>
            Choose from major temples in South India
          </DialogDescription>
        </DialogHeader>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by temple name, city, state, or deity..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid md:grid-cols-2 gap-4">
            {filteredTemples.map((temple) => (
              <Card
                key={temple.id}
                className="cursor-pointer hover:shadow-lg transition-all hover:border-primary overflow-hidden"
                onClick={() => handleSelectTemple(temple)}
              >
                <div className="relative h-32">
                  <ImageWithFallback
                    src={temple.image}
                    alt={temple.name}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 right-2">
                    {temple.state}
                  </Badge>
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{temple.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-xs">
                    <MapPin className="h-3 w-3" />
                    {temple.city}, {temple.state}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-2">
                    {temple.deity}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {temple.architecture}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTemples.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No temples found matching your search.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
