import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarIcon, CheckCircle2, IndianRupee } from "lucide-react";
import { Badge } from "./ui/badge";
import { Temple } from "../data/temples";

interface BookingSectionProps {
  temple: Temple | null;
}

export function BookingSection({ temple }: BookingSectionProps) {
  const [date, setDate] = useState<Date>();
  const [bookingComplete, setBookingComplete] = useState(false);

  const darshanSlots = [
    { id: 1, time: "5:00 AM - 7:00 AM", price: 0, type: "Free", available: 45 },
    { id: 2, time: "7:00 AM - 9:00 AM", price: 50, type: "Regular", available: 30 },
    { id: 3, time: "9:00 AM - 12:00 PM", price: 100, type: "Priority", available: 20 },
    { id: 4, time: "4:00 PM - 6:00 PM", price: 150, type: "Premium", available: 15 },
    { id: 5, time: "6:00 PM - 9:00 PM", price: 100, type: "Evening", available: 25 },
  ];

  const specialPoojas = [
    { id: 1, name: "Abhishekam", price: 500, duration: "30 mins", available: true },
    { id: 2, name: "Archana", price: 200, duration: "15 mins", available: true },
    { id: 3, name: "Sahasranama Archana", price: 1000, duration: "1 hour", available: true },
    { id: 4, name: "Kalyana Utsavam", price: 5000, duration: "2 hours", available: false },
    { id: 5, name: "Seva", price: 300, duration: "20 mins", available: true },
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingComplete(true);
    setTimeout(() => setBookingComplete(false), 5000);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="mb-2">{temple ? `Book Darshan - ${temple.name}` : "Online Booking"}</h2>
        <p className="text-muted-foreground">
          {temple ? `${temple.city}, ${temple.state} - ` : ""}Reserve your darshan slot and special pooja services in advance
        </p>
      </div>

      <Tabs defaultValue="darshan" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="darshan">Darshan Booking</TabsTrigger>
          <TabsTrigger value="pooja">Special Pooja</TabsTrigger>
        </TabsList>

        {/* Darshan Booking */}
        <TabsContent value="darshan">
          {bookingComplete ? (
            <Card className="border-green-500">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                  <h3>Booking Confirmed!</h3>
                  <p className="text-muted-foreground">
                    Your darshan slot has been booked successfully. A confirmation has been sent to your email.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Booking ID: <strong>DE{Math.floor(Math.random() * 100000)}</strong>
                  </p>
                  <Button onClick={() => setBookingComplete(false)}>
                    Book Another Slot
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleBooking}>
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Booking Form */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select Date & Time</CardTitle>
                    <CardDescription>Choose your preferred darshan slot</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? date.toLocaleDateString() : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slot">Time Slot</Label>
                      <Select required>
                        <SelectTrigger id="slot">
                          <SelectValue placeholder="Select time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {darshanSlots.map((slot) => (
                            <SelectItem key={slot.id} value={slot.id.toString()}>
                              {slot.time} - {slot.type} ({slot.available} slots)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="people">Number of People</Label>
                      <Select required>
                        <SelectTrigger id="people">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Person</SelectItem>
                          <SelectItem value="2">2 People</SelectItem>
                          <SelectItem value="3">3 People</SelectItem>
                          <SelectItem value="4">4 People</SelectItem>
                          <SelectItem value="5">5+ People</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="Enter your name" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                    </div>

                    <Button type="submit" className="w-full">
                      Confirm Booking
                    </Button>
                  </CardContent>
                </Card>

                {/* Available Slots */}
                <div className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Darshan Slots</CardTitle>
                      <CardDescription>For today, October 5, 2025</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {darshanSlots.map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                        >
                          <div>
                            <p>{slot.time}</p>
                            <p className="text-sm text-muted-foreground">
                              {slot.available} slots available
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant={slot.price === 0 ? "secondary" : "default"}>
                              {slot.type}
                            </Badge>
                            <p className="mt-1 flex items-center justify-end gap-1">
                              {slot.price > 0 && <IndianRupee className="h-4 w-4" />}
                              {slot.price === 0 ? "Free" : slot.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-muted">
                    <CardContent className="pt-6">
                      <h4 className="mb-2">Important Information</h4>
                      <ul className="text-sm space-y-2 text-muted-foreground">
                        <li>• Please arrive 15 minutes before your slot</li>
                        <li>• Carry a valid ID proof</li>
                        <li>• Booking confirmation will be sent via email</li>
                        <li>• Cancellation allowed up to 24 hours before</li>
                        <li>• Senior citizens get priority entry</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </form>
          )}
        </TabsContent>

        {/* Special Pooja Booking */}
        <TabsContent value="pooja">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specialPoojas.map((pooja) => (
              <Card key={pooja.id} className={!pooja.available ? "opacity-60" : ""}>
                <CardHeader>
                  <CardTitle>{pooja.name}</CardTitle>
                  <CardDescription>{pooja.duration}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <IndianRupee className="h-5 w-5" />
                      <span className="text-2xl">{pooja.price}</span>
                    </div>
                    <Badge variant={pooja.available ? "secondary" : "destructive"}>
                      {pooja.available ? "Available" : "Booked"}
                    </Badge>
                  </div>
                  <Button className="w-full" disabled={!pooja.available}>
                    {pooja.available ? "Book Now" : "Not Available"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-6 bg-muted">
            <CardContent className="pt-6">
              <h4 className="mb-2">Special Pooja Guidelines</h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• All poojas are performed by temple priests</li>
                <li>• Prasadam will be provided after the pooja</li>
                <li>• You can participate in the ritual</li>
                <li>• Advance booking required (minimum 24 hours)</li>
                <li>• Special requests can be made during booking</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
