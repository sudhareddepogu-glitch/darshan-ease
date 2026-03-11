import { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Users, TrendingUp, TrendingDown, Activity } from "lucide-react";

export function CrowdMonitoringPanel() {
  const [liveCount, setLiveCount] = useState(342);
  const [peakTime, setPeakTime] = useState("10:00 AM");
  const [avgWaitTime, setAvgWaitTime] = useState(25);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount((prev) => {
        const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
        return Math.max(50, Math.min(500, prev + change));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Hourly data for today
  const hourlyData = [
    { time: "6 AM", count: 45, scanned: 42 },
    { time: "7 AM", count: 78, scanned: 75 },
    { time: "8 AM", count: 145, scanned: 140 },
    { time: "9 AM", count: 234, scanned: 228 },
    { time: "10 AM", count: 389, scanned: 380 },
    { time: "11 AM", count: 356, scanned: 348 },
    { time: "12 PM", count: 298, scanned: 290 },
    { time: "1 PM", count: 245, scanned: 238 },
    { time: "2 PM", count: 312, scanned: 305 },
    { time: "3 PM", count: liveCount, scanned: liveCount - 5 },
  ];

  // Entry vs Exit data
  const entryExitData = [
    { name: "Monday", entry: 450, exit: 445 },
    { name: "Tuesday", entry: 380, exit: 375 },
    { name: "Wednesday", entry: 520, exit: 515 },
    { name: "Thursday", entry: 490, exit: 485 },
    { name: "Friday", entry: 610, exit: 605 },
    { name: "Saturday", entry: 780, exit: 775 },
    { name: "Sunday", entry: 890, exit: 885 },
  ];

  // Crowd distribution by area
  const areaDistribution = [
    { name: "Main Sanctum", value: 120, color: "#f97316" },
    { name: "Queue Area", value: 95, color: "#3b82f6" },
    { name: "Prasadam Hall", value: 67, color: "#10b981" },
    { name: "Other Areas", value: 60, color: "#8b5cf6" },
  ];

  const totalInTemple = areaDistribution.reduce((sum, area) => sum + area.value, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-2xl">
          📊
        </div>
        <div>
          <h3 className="mb-1">Live Crowd Monitoring</h3>
          <p className="text-sm text-muted-foreground">
            Real-time devotee tracking and analytics
          </p>
        </div>
      </div>

      {/* Live Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-5 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Users className="text-white" size={20} />
            </div>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs">
              <TrendingUp size={14} />
              <span>Live</span>
            </div>
          </div>
          <div className="text-2xl mb-1">{liveCount}</div>
          <div className="text-sm text-muted-foreground">Current Devotees</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-5 rounded-xl border border-green-200 dark:border-green-800">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Activity className="text-white" size={20} />
            </div>
            <div className="text-xs text-muted-foreground">Today</div>
          </div>
          <div className="text-2xl mb-1">{liveCount - 5}</div>
          <div className="text-sm text-muted-foreground">QR Codes Scanned</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 p-5 rounded-xl border border-orange-200 dark:border-orange-800">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white" size={20} />
            </div>
            <div className="text-xs text-muted-foreground">Peak</div>
          </div>
          <div className="text-2xl mb-1">{peakTime}</div>
          <div className="text-sm text-muted-foreground">Peak Time Today</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-5 rounded-xl border border-purple-200 dark:border-purple-800">
          <div className="flex items-start justify-between mb-3">
            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">⏱️</span>
            </div>
            <div className="flex items-center gap-1 text-red-600 dark:text-red-400 text-xs">
              <TrendingDown size={14} />
              <span>-3min</span>
            </div>
          </div>
          <div className="text-2xl mb-1">{avgWaitTime} min</div>
          <div className="text-sm text-muted-foreground">Avg Wait Time</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Hourly Trend Chart */}
        <div className="bg-card border rounded-xl p-6">
          <h4 className="mb-4">Today's Hourly Trend</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="time" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line
                type="monotone"
                dataKey="scanned"
                stroke="#10b981"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#10b981", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-muted-foreground">Total Count</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-green-500 border-dashed rounded"></div>
              <span className="text-muted-foreground">QR Scanned</span>
            </div>
          </div>
        </div>

        {/* Area Distribution */}
        <div className="bg-card border rounded-xl p-6">
          <h4 className="mb-4">Current Distribution by Area</h4>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={areaDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {areaDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            {areaDistribution.map((area, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: area.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{area.name}</span>
                <span className="text-sm ml-auto">{area.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Entry/Exit Chart */}
        <div className="bg-card border rounded-xl p-6 lg:col-span-2">
          <h4 className="mb-4">Weekly Entry & Exit Analysis</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={entryExitData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="entry" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              <Bar dataKey="exit" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-muted-foreground">Entry Count</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-muted-foreground">Exit Count</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Section */}
      <div className="bg-yellow-50 dark:bg-yellow-950/30 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="text-2xl">⚠️</div>
          <div>
            <h4 className="mb-1 text-yellow-900 dark:text-yellow-100">Capacity Alert</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Current crowd level is at 68% of maximum capacity. Consider optimizing queue flow at Main Sanctum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
