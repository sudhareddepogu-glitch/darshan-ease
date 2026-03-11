import { Activity, Clock, TrendingDown, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Temple } from "../data/temples";

interface CrowdStatusProps {
  temple: Temple | null;
}

export function CrowdStatus({ temple }: CrowdStatusProps) {
  const crowdData = [
    { time: "5:00 AM - 7:00 AM", level: 30, status: "Low", color: "bg-green-500" },
    { time: "7:00 AM - 9:00 AM", level: 60, status: "Moderate", color: "bg-yellow-500" },
    { time: "9:00 AM - 12:00 PM", level: 85, status: "High", color: "bg-orange-500" },
    { time: "12:00 PM - 3:00 PM", level: 70, status: "Moderate", color: "bg-yellow-500" },
    { time: "3:00 PM - 6:00 PM", level: 90, status: "Very High", color: "bg-red-500" },
    { time: "6:00 PM - 9:00 PM", level: 75, status: "High", color: "bg-orange-500" },
  ];

  const currentStatus = {
    level: 65,
    status: "Moderate",
    waitTime: "2 hours",
    trend: "decreasing",
    lastUpdated: "2 mins ago"
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h2 className="mb-2">{temple ? `Live Crowd Status - ${temple.name}` : "Live Crowd Status"}</h2>
        <p className="text-muted-foreground">
          {temple ? `${temple.city}, ${temple.state} - ` : ""}Real-time updates to help you plan your visit better
        </p>
      </div>

      {/* Current Status */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Current Status</CardTitle>
              <CardDescription>Updated {currentStatus.lastUpdated}</CardDescription>
            </div>
            <Badge variant={currentStatus.level > 70 ? "destructive" : currentStatus.level > 40 ? "default" : "secondary"} className="px-4 py-2">
              <Activity className="h-4 w-4 mr-2" />
              {currentStatus.status}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Crowd Level</span>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={currentStatus.level} className="flex-1" />
                <span className="font-semibold">{currentStatus.level}%</span>
              </div>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Estimated Wait Time</span>
              </div>
              <p className="text-2xl">{currentStatus.waitTime}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-2">
                {currentStatus.trend === "decreasing" ? (
                  <TrendingDown className="h-5 w-5 text-green-500" />
                ) : (
                  <TrendingUp className="h-5 w-5 text-red-500" />
                )}
                <span className="text-sm text-muted-foreground">Trend</span>
              </div>
              <p className="text-2xl capitalize">{currentStatus.trend}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Forecast */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Crowd Forecast</CardTitle>
          <CardDescription>Plan your visit during off-peak hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {crowdData.map((slot, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="w-40 text-sm text-muted-foreground">
                  {slot.time}
                </div>
                <div className="flex-1">
                  <Progress value={slot.level} className="h-3" />
                </div>
                <div className="w-24 flex items-center gap-2">
                  <div className={`h-3 w-3 rounded-full ${slot.color}`} />
                  <span className="text-sm">{slot.status}</span>
                </div>
                <div className="w-20 text-right text-sm text-muted-foreground">
                  {slot.level}%
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>💡 Tip:</strong> Visit between 5:00 AM - 7:00 AM or 12:00 PM - 3:00 PM for shorter wait times.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
