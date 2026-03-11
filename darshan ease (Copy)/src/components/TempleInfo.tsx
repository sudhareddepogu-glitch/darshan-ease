import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Badge } from "./ui/badge";
import { Calendar, Clock, History, Book, Sparkles, BookOpen } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Temple } from "../data/temples";

interface TempleInfoProps {
  temple: Temple | null;
}

export function TempleInfo({ temple }: TempleInfoProps) {
  const festivals = [
    { name: "Maha Shivaratri", date: "February 26, 2025", description: "Grand celebration with special rituals" },
    { name: "Ram Navami", date: "April 6, 2025", description: "Nine-day festival celebration" },
    { name: "Janmashtami", date: "August 16, 2025", description: "Lord Krishna's birthday celebration" },
    { name: "Navaratri", date: "October 2-10, 2025", description: "Nine nights of devotion" },
    { name: "Diwali", date: "October 20, 2025", description: "Festival of lights" },
  ];

  const dailyRituals = [
    { name: "Suprabhata Seva", time: "5:00 AM", description: "Morning awakening ritual" },
    { name: "Abhishekam", time: "6:00 AM", description: "Holy bath ceremony" },
    { name: "Morning Pooja", time: "7:00 AM", description: "Morning worship" },
    { name: "Afternoon Pooja", time: "12:00 PM", description: "Midday offering" },
    { name: "Evening Aarti", time: "6:00 PM", description: "Evening prayer ceremony" },
    { name: "Night Pooja", time: "8:00 PM", description: "Final ritual of the day" },
  ];

  const rules = [
    { icon: "👕", title: "Dress Code", description: "Traditional attire recommended. Shorts and sleeveless not allowed." },
    { icon: "📱", title: "Mobile Phones", description: "Switch to silent mode. Photography restricted in main sanctum." },
    { icon: "👞", title: "Footwear", description: "Must be removed before entering the temple premises." },
    { icon: "🚭", title: "No Smoking/Alcohol", description: "Strictly prohibited within temple premises." },
    { icon: "🗑️", title: "Cleanliness", description: "Use dustbins provided. Keep the temple clean." },
    { icon: "🤫", title: "Maintain Silence", description: "Respect the sanctity by maintaining silence in prayer areas." },
    { icon: "👨‍👩‍👧", title: "Queue System", description: "Follow the designated queue lines. No pushing or rushing." },
    { icon: "♿", title: "Priority Entry", description: "Senior citizens, disabled, and pregnant women get priority." },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-2">
          <div>
            <h2 className="mb-2">{temple ? `About ${temple.name}` : "About the Temple"}</h2>
            <p className="text-muted-foreground">
              {temple ? `${temple.city}, ${temple.state}` : "Learn about the temple's rich history, traditions, and guidelines"}
            </p>
          </div>
          {temple?.history && (
            <Badge variant="secondary" className="gap-2 px-4 py-2">
              <BookOpen className="h-4 w-4" />
              <span>Detailed History Available</span>
            </Badge>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* History */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                {temple?.history?.title || "Temple History"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Main temple image */}
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <ImageWithFallback
                  src={temple?.image || "https://images.unsplash.com/photo-1704788564069-d54cab4169aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZW1wbGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU5NjU0NTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"}
                  alt={temple?.name || "Temple"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm opacity-90">📍 {temple?.location || "Sacred Temple"}</p>
                  <p className="text-xs opacity-75 mt-1">Established: {temple?.established || "Ancient Times"}</p>
                </div>
              </div>

              {/* History paragraphs */}
              {temple?.history?.paragraphs ? (
                <div className="space-y-4">
                  {temple.history.paragraphs.map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed text-justify">
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {temple?.description || "The temple has a rich history spanning over 500 years. Built in the 16th century by the renowned King Rajendra, this sacred shrine is dedicated to Lord Shiva and is considered one of the most important pilgrimage sites in the region."}
                  </p>
                  <div className="p-4 bg-muted/50 border border-dashed rounded-lg">
                    <p className="text-sm text-muted-foreground text-center">
                      📚 Detailed historical information for this temple is being compiled. Check back soon for a comprehensive history with images and legends.
                    </p>
                  </div>
                </div>
              )}

              {/* Additional history images */}
              {temple?.history?.images && temple.history.images.length > 0 && (
                <div className="mt-8">
                  <h4 className="mb-4 flex items-center gap-2">
                    <span className="text-xl">🏛️</span>
                    Architectural Gallery
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {temple.history.images.map((image, index) => (
                      <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-md group">
                        <ImageWithFallback
                          src={image}
                          alt={`${temple.name} architecture ${index + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Accordions for additional info */}
              <Accordion type="single" collapsible className="mt-6">
                {temple?.legend && (
                  <AccordionItem value="legend">
                    <AccordionTrigger>{temple.legend.title}</AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground leading-relaxed">
                        {temple.legend.story}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {temple?.architecturalHighlights && temple.architecturalHighlights.length > 0 && (
                  <AccordionItem value="architecture">
                    <AccordionTrigger>Architectural Marvels</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {temple.architecturalHighlights.map((highlight, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✦</span>
                            <span className="text-muted-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}

                {temple?.religiousSignificance && temple.religiousSignificance.length > 0 && (
                  <AccordionItem value="significance">
                    <AccordionTrigger>Religious Significance</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        {temple.religiousSignificance.map((significance, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1">✦</span>
                            <span className="text-muted-foreground">{significance}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </CardContent>
          </Card>

          {/* Daily Rituals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Daily Rituals & Timings
              </CardTitle>
              <CardDescription>Schedule of daily temple activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dailyRituals.map((ritual, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 border rounded-lg hover:bg-accent transition-colors">
                    <div className="min-w-24 text-sm bg-primary/10 px-3 py-1 rounded">
                      {ritual.time}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{ritual.name}</p>
                      <p className="text-sm text-muted-foreground">{ritual.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Rules & Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                Rules & Guidelines
              </CardTitle>
              <CardDescription>Please follow these rules for a peaceful darshan</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {rules.map((rule, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    <div className="text-2xl">{rule.icon}</div>
                    <div>
                      <p className="font-medium mb-1">{rule.title}</p>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-sm">
                  <strong>⚠️ Important:</strong> Violation of temple rules may result in denial of entry. 
                  Please cooperate with temple staff and security personnel at all times.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div>
                <p className="text-muted-foreground">Deity</p>
                <p className="font-medium">{temple?.deity || "Lord Shiva"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Established</p>
                <p className="font-medium">{temple?.established || "16th Century (c. 1520)"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Architecture</p>
                <p className="font-medium">{temple?.architecture || "Dravidian Style"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Temple Hours</p>
                <p className="font-medium">{temple?.timings || "5:00 AM - 9:00 PM"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Best Time to Visit</p>
                <p className="font-medium">October to March</p>
              </div>
              <div>
                <p className="text-muted-foreground">Entry Fee</p>
                <p className="font-medium">{temple?.entryFee || "Free (VIP tickets available)"}</p>
              </div>
              {temple && (
                <>
                  <div>
                    <p className="text-muted-foreground">Contact</p>
                    <p className="font-medium">{temple.phone}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Address</p>
                    <p className="font-medium text-xs">{temple.address}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Festivals */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Upcoming Festivals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {festivals.map((festival, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-start gap-2 mb-1">
                    <Calendar className="h-4 w-4 mt-1 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium">{festival.name}</p>
                      <p className="text-xs text-muted-foreground">{festival.date}</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground ml-6">{festival.description}</p>
                  <Badge variant="outline" className="mt-2 ml-6 text-xs">Special Darshan</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weather */}
          <Card>
            <CardHeader>
              <CardTitle>Current Weather</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-5xl mb-2">☀️</div>
                <p className="text-3xl mb-1">28°C</p>
                <p className="text-sm text-muted-foreground mb-4">Clear Sky</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="p-2 bg-muted rounded">
                    <p className="text-muted-foreground">Humidity</p>
                    <p className="font-medium">65%</p>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <p className="text-muted-foreground">Wind</p>
                    <p className="font-medium">12 km/h</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Updated: Today, 2:30 PM
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
