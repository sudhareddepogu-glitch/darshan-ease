import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { CheckCircle2, Download, Heart, IndianRupee } from "lucide-react";
import { Badge } from "./ui/badge";
import { Temple } from "../data/temples";

interface DonationSectionProps {
  temple: Temple | null;
}

export function DonationSection({ temple }: DonationSectionProps) {
  const [donationComplete, setDonationComplete] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");

  const predefinedAmounts = ["100", "500", "1000", "2500", "5000"];

  const donationPurposes = [
    { id: "general", name: "General Temple Maintenance", icon: "🛕" },
    { id: "annadanam", name: "Annadanam (Free Meals)", icon: "🍽️" },
    { id: "education", name: "Vedic Education", icon: "📚" },
    { id: "renovation", name: "Temple Renovation", icon: "🔨" },
    { id: "festivals", name: "Festival Celebrations", icon: "🎊" },
  ];

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    setDonationComplete(true);
    setTimeout(() => setDonationComplete(false), 5000);
  };

  const amount = customAmount || selectedAmount;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <h2 className="mb-2">{temple ? `Donate to ${temple.name}` : "Make a Donation"}</h2>
        <p className="text-muted-foreground">
          {temple ? `${temple.city}, ${temple.state} - ` : ""}Support the temple and its activities with secure online donations
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {donationComplete ? (
          <Card className="border-green-500">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                <h3>Thank You for Your Donation!</h3>
                <p className="text-muted-foreground">
                  Your contribution of ₹{amount} has been received successfully.
                </p>
                <div className="bg-muted p-4 rounded-lg inline-block">
                  <p className="text-sm text-muted-foreground">Transaction ID</p>
                  <p className="font-mono">TXN{Math.floor(Math.random() * 1000000)}</p>
                </div>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Receipt
                  </Button>
                  <Button onClick={() => setDonationComplete(false)}>
                    Make Another Donation
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="online" className="space-y-6">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="online">Online Donation</TabsTrigger>
              <TabsTrigger value="offline">Offline Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="online">
              <form onSubmit={handleDonation}>
                <div className="grid lg:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    {/* Amount Selection */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Select Amount</CardTitle>
                        <CardDescription>Choose or enter your donation amount</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-3 gap-3">
                          {predefinedAmounts.map((amt) => (
                            <Button
                              key={amt}
                              type="button"
                              variant={selectedAmount === amt && !customAmount ? "default" : "outline"}
                              onClick={() => {
                                setSelectedAmount(amt);
                                setCustomAmount("");
                              }}
                              className="h-16"
                            >
                              <div className="flex items-center gap-1">
                                <IndianRupee className="h-4 w-4" />
                                {amt}
                              </div>
                            </Button>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="custom">Custom Amount</Label>
                          <div className="relative">
                            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                              id="custom"
                              type="number"
                              placeholder="Enter amount"
                              value={customAmount}
                              onChange={(e) => setCustomAmount(e.target.value)}
                              className="pl-10"
                            />
                          </div>
                        </div>

                        <div className="text-center p-4 bg-primary/5 rounded-lg">
                          <p className="text-sm text-muted-foreground">Donation Amount</p>
                          <p className="text-3xl mt-1 flex items-center justify-center gap-1">
                            <IndianRupee className="h-6 w-6" />
                            {amount}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Purpose Selection */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Donation Purpose</CardTitle>
                        <CardDescription>Select how you'd like to contribute</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <RadioGroup defaultValue="general" className="space-y-3">
                          {donationPurposes.map((purpose) => (
                            <div
                              key={purpose.id}
                              className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors"
                            >
                              <RadioGroupItem value={purpose.id} id={purpose.id} />
                              <Label htmlFor={purpose.id} className="flex-1 cursor-pointer">
                                <span className="mr-2">{purpose.icon}</span>
                                {purpose.name}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Donor Details */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Donor Information</CardTitle>
                        <CardDescription>For receipt and records</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="donor-name">Full Name *</Label>
                          <Input id="donor-name" placeholder="Enter your name" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="donor-email">Email *</Label>
                          <Input id="donor-email" type="email" placeholder="your@email.com" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="donor-phone">Phone Number *</Label>
                          <Input id="donor-phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="pan">PAN Number (Optional)</Label>
                          <Input id="pan" placeholder="For 80G tax exemption" />
                          <p className="text-xs text-muted-foreground">
                            Required for tax exemption certificate
                          </p>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">Address (Optional)</Label>
                          <Input id="address" placeholder="Your address" />
                        </div>

                        <div className="flex items-start gap-2 p-3 bg-muted rounded-lg">
                          <input type="checkbox" id="anonymous" className="mt-1" />
                          <label htmlFor="anonymous" className="text-sm cursor-pointer">
                            I wish to remain anonymous
                          </label>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-green-50 border-green-200">
                      <CardContent className="pt-6 space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <Heart className="h-5 w-5 text-green-600" />
                          <h4 className="text-green-900">Tax Benefits</h4>
                        </div>
                        <p className="text-sm text-green-800">
                          All donations are eligible for 80G tax exemption under Income Tax Act.
                        </p>
                        <p className="text-sm text-green-800">
                          A tax exemption certificate will be sent to your registered email.
                        </p>
                      </CardContent>
                    </Card>

                    <Button type="submit" size="lg" className="w-full">
                      Proceed to Payment
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Secure payment powered by Razorpay/UPI. Your data is encrypted and safe.
                    </p>
                  </div>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="offline">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Bank Transfer</CardTitle>
                    <CardDescription>Direct bank transfer details</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Account Name</p>
                      <p className="font-mono">Temple Trust Account</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Account Number</p>
                      <p className="font-mono">1234567890123456</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">IFSC Code</p>
                      <p className="font-mono">SBIN0001234</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Bank Name</p>
                      <p>State Bank of India</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Branch</p>
                      <p>Temple Road Branch</p>
                    </div>
                    <Badge variant="outline">80G Eligible</Badge>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>UPI Payment</CardTitle>
                    <CardDescription>Pay using any UPI app</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white p-6 rounded-lg border-2 border-dashed flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl mb-2">📱</div>
                        <p className="text-sm text-muted-foreground">QR Code</p>
                        <p className="font-mono text-sm mt-2">temple@upi</p>
                      </div>
                    </div>
                    <p className="text-sm text-center text-muted-foreground">
                      Scan with any UPI app to donate
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cheque/DD</CardTitle>
                    <CardDescription>Payment by cheque or demand draft</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">
                      Make cheques/DD in favor of:
                    </p>
                    <p className="font-semibold mb-4">Temple Trust</p>
                    <p className="text-sm text-muted-foreground">
                      Send to: Temple Office, Sacred Temple Road, Pilgrimage City - 123456
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cash Donation</CardTitle>
                    <CardDescription>Donate in person</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">
                      Visit the temple office during working hours:
                    </p>
                    <p className="text-sm"><strong>Monday - Saturday:</strong> 9:00 AM - 5:00 PM</p>
                    <p className="text-sm"><strong>Sunday:</strong> Closed</p>
                    <p className="text-sm text-muted-foreground mt-3">
                      Receipt will be provided immediately
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}
