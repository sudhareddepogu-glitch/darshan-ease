import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { QRCodeGenerator } from "./QRCodeGenerator";
import { CrowdMonitoringPanel } from "./CrowdMonitoringPanel";
import { LogOut, Settings, Users, BookOpen, MessageSquare, IndianRupee, Home, QrCode, Download, Printer, Upload, X, Globe } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Temple } from "../data/temples";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface AdminDashboardProps {
  selectedTemple: Temple | null;
  onLogout: () => void;
  userName: string;
}

interface Booking {
  id: string;
  devotee: string;
  date: string;
  time: string;
  type: string;
  status: "confirmed" | "pending" | "cancelled";
}

interface Feedback {
  id: string;
  devotee: string;
  rating: number;
  comment: string;
  date: string;
  status: "new" | "reviewed";
}

interface Donation {
  id: string;
  donor: string;
  amount: number;
  purpose: string;
  date: string;
  method: string;
}

export function AdminDashboard({ selectedTemple, onLogout, userName }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "qr" | "crowd" | "bookings" | "feedback" | "donations">("overview");
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  
  // QR Form State
  const [qrFormData, setQrFormData] = useState({
    devoteeName: "",
    ticketId: "",
    age: "",
    gender: "",
    dateTime: "",
    photo: null as string | null,
  });
  const [generatedQRData, setGeneratedQRData] = useState<any>(null);

  // Mock data
  const [bookings] = useState<Booking[]>([
    { id: "BK001", devotee: "Ramesh Kumar", date: "2025-10-28", time: "10:00 AM", type: "Darshan", status: "confirmed" },
    { id: "BK002", devotee: "Lakshmi Devi", date: "2025-10-28", time: "11:30 AM", type: "Special Puja", status: "confirmed" },
    { id: "BK003", devotee: "Suresh Patel", date: "2025-10-28", time: "02:00 PM", type: "Darshan", status: "pending" },
    { id: "BK004", devotee: "Anitha Reddy", date: "2025-10-29", time: "09:00 AM", type: "Abhishekam", status: "confirmed" },
  ]);

  const [feedbacks] = useState<Feedback[]>([
    { id: "FB001", devotee: "Rajesh Kumar", rating: 5, comment: "Excellent darshan experience!", date: "2025-10-27", status: "new" },
    { id: "FB002", devotee: "Priya Sharma", rating: 4, comment: "Good facilities, but waiting time was long.", date: "2025-10-27", status: "new" },
    { id: "FB003", devotee: "Vijay Mohan", rating: 5, comment: "Very peaceful and well-maintained temple.", date: "2025-10-26", status: "reviewed" },
  ]);

  const [donations] = useState<Donation[]>([
    { id: "DN001", donor: "Anonymous", amount: 5000, purpose: "General", date: "2025-10-27", method: "UPI" },
    { id: "DN002", donor: "Srinivas Rao", amount: 10000, purpose: "Annadanam", date: "2025-10-27", method: "Card" },
    { id: "DN003", donor: "Meera Bai", amount: 2500, purpose: "Temple Maintenance", date: "2025-10-26", method: "UPI" },
    { id: "DN004", donor: "Ganesh Iyer", amount: 15000, purpose: "Festival", date: "2025-10-26", method: "Net Banking" },
  ]);

  const handleLogout = () => {
    toast.success("Admin logged out successfully!");
    onLogout();
  };

  const handleQRModalOpen = () => {
    // Auto-generate Ticket ID
    const newTicketId = `TKT${Date.now().toString().slice(-8)}`;
    setQrFormData({
      devoteeName: "",
      ticketId: newTicketId,
      age: "",
      gender: "",
      dateTime: "",
      photo: null,
    });
    setGeneratedQRData(null);
    setQrModalOpen(true);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setQrFormData({ ...qrFormData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateQR = () => {
    if (!qrFormData.devoteeName || !qrFormData.age || !qrFormData.gender || !qrFormData.dateTime) {
      toast.error("Please fill in all required fields");
      return;
    }

    const qrData = {
      ticketId: qrFormData.ticketId,
      name: qrFormData.devoteeName,
      age: qrFormData.age,
      gender: qrFormData.gender,
      dateTime: qrFormData.dateTime,
      temple: selectedTemple?.name || "Temple",
      generated: new Date().toISOString(),
    };

    setGeneratedQRData(qrData);
    toast.success("QR Code generated successfully!");
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById("modal-qr-code-svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QR_${qrFormData.ticketId}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast.success("QR Code downloaded!");
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handlePrintQR = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    if (!printWindow) return;

    const qrContent = document.getElementById('qr-preview-content');
    if (!qrContent) return;

    printWindow.document.write('<html><head><title>QR Code - ' + qrFormData.ticketId + '</title>');
    printWindow.document.write('<style>body{font-family:Arial;text-align:center;padding:20px;} .qr-container{display:inline-block;border:2px solid #f97316;padding:20px;border-radius:10px;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<div class="qr-container">');
    printWindow.document.write(qrContent.innerHTML);
    printWindow.document.write('</div>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
    
    toast.success("Print dialog opened!");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "qr":
        return <QRCodeGenerator templeName={selectedTemple?.name || "Temple"} />;
      
      case "crowd":
        return <CrowdMonitoringPanel />;
      
      case "bookings":
        return (
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-2xl">
                📋
              </div>
              <div>
                <h3 className="mb-1">Booking Management</h3>
                <p className="text-sm text-muted-foreground">View and manage all bookings</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm">Booking ID</th>
                    <th className="text-left py-3 px-4 text-sm">Devotee</th>
                    <th className="text-left py-3 px-4 text-sm">Date & Time</th>
                    <th className="text-left py-3 px-4 text-sm">Type</th>
                    <th className="text-left py-3 px-4 text-sm">Status</th>
                    <th className="text-left py-3 px-4 text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">{booking.id}</td>
                      <td className="py-3 px-4 text-sm">{booking.devotee}</td>
                      <td className="py-3 px-4 text-sm">
                        {booking.date} • {booking.time}
                      </td>
                      <td className="py-3 px-4 text-sm">{booking.type}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-1 text-xs rounded-full ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                              : booking.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-primary hover:underline text-sm">View</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case "feedback":
        return (
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-2xl">
                💬
              </div>
              <div>
                <h3 className="mb-1">Feedback Management</h3>
                <p className="text-sm text-muted-foreground">Review devotee feedback and suggestions</p>
              </div>
            </div>

            <div className="space-y-4">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{feedback.devotee}</span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            feedback.status === "new"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                          }`}
                        >
                          {feedback.status}
                        </span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < feedback.rating ? "text-yellow-400" : "text-gray-300"}>
                            ⭐
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{feedback.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{feedback.comment}</p>
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90">
                      Mark as Reviewed
                    </button>
                    <button className="text-xs px-3 py-1 border rounded hover:bg-accent">
                      Respond
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case "donations":
        return (
          <div className="bg-card border rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-2xl">
                💰
              </div>
              <div>
                <h3 className="mb-1">Donation Management</h3>
                <p className="text-sm text-muted-foreground">Track and manage temple donations</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 p-4 rounded-lg border border-green-200 dark:border-green-800">
                <div className="text-sm text-muted-foreground mb-1">Today's Total</div>
                <div className="text-2xl">₹17,500</div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-sm text-muted-foreground mb-1">This Month</div>
                <div className="text-2xl">₹4,23,000</div>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="text-sm text-muted-foreground mb-1">Total Donors</div>
                <div className="text-2xl">1,247</div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm">Donation ID</th>
                    <th className="text-left py-3 px-4 text-sm">Donor</th>
                    <th className="text-left py-3 px-4 text-sm">Amount</th>
                    <th className="text-left py-3 px-4 text-sm">Purpose</th>
                    <th className="text-left py-3 px-4 text-sm">Date</th>
                    <th className="text-left py-3 px-4 text-sm">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.map((donation) => (
                    <tr key={donation.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">{donation.id}</td>
                      <td className="py-3 px-4 text-sm">{donation.donor}</td>
                      <td className="py-3 px-4 text-sm">₹{donation.amount.toLocaleString()}</td>
                      <td className="py-3 px-4 text-sm">{donation.purpose}</td>
                      <td className="py-3 px-4 text-sm">{donation.date}</td>
                      <td className="py-3 px-4 text-sm">{donation.method}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case "overview":
      default:
        return (
          <div className="space-y-6">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-xl p-6 md:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl mb-2">Welcome, {userName}!</h2>
                  <p className="text-purple-100">
                    {selectedTemple ? `Managing ${selectedTemple.name}` : "Temple Administration Dashboard"}
                  </p>
                </div>
                <div className="text-5xl">🛠️</div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard
                icon="📊"
                title="Total Bookings"
                value="342"
                change="+12%"
                trend="up"
                color="from-blue-500 to-blue-600"
              />
              <StatCard
                icon="👥"
                title="Today's Visitors"
                value="1,247"
                change="+8%"
                trend="up"
                color="from-green-500 to-green-600"
              />
              <StatCard
                icon="💰"
                title="Today's Donations"
                value="₹17,500"
                change="+15%"
                trend="up"
                color="from-yellow-500 to-yellow-600"
              />
              <StatCard
                icon="⭐"
                title="Avg Rating"
                value="4.8"
                change="+0.2"
                trend="up"
                color="from-orange-500 to-orange-600"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-4">
              <button
                onClick={() => setActiveTab("qr")}
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all text-left hover:border-purple-500 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  📱
                </div>
                <h3 className="mb-2 group-hover:text-purple-600 transition-colors">Generate QR Code</h3>
                <p className="text-sm text-muted-foreground">Create entry passes for devotees</p>
              </button>

              <button
                onClick={() => setActiveTab("crowd")}
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all text-left hover:border-blue-500 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  📊
                </div>
                <h3 className="mb-2 group-hover:text-blue-600 transition-colors">Monitor Crowd</h3>
                <p className="text-sm text-muted-foreground">Real-time visitor analytics</p>
              </button>

              <button
                onClick={() => setActiveTab("bookings")}
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-all text-left hover:border-green-500 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  📋
                </div>
                <h3 className="mb-2 group-hover:text-green-600 transition-colors">Manage Bookings</h3>
                <p className="text-sm text-muted-foreground">View all darshan bookings</p>
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border rounded-xl p-6">
              <h3 className="mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <ActivityItem
                  icon="✅"
                  text="New booking confirmed - Ramesh Kumar"
                  time="5 mins ago"
                />
                <ActivityItem
                  icon="💬"
                  text="New feedback received - 5 stars"
                  time="15 mins ago"
                />
                <ActivityItem
                  icon="💰"
                  text="Donation received - ₹10,000 for Annadanam"
                  time="32 mins ago"
                />
                <ActivityItem
                  icon="📱"
                  text="QR Code generated for Lakshmi Devi"
                  time="1 hour ago"
                />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* QR Code Generator Modal */}
      <Dialog open={qrModalOpen} onOpenChange={setQrModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <QrCode className="text-white" size={20} />
              </div>
              QR Code Generator
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4">
            {!generatedQRData ? (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  {/* Devotee Name */}
                  <div>
                    <label className="block text-sm mb-2">Devotee Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={qrFormData.devoteeName}
                      onChange={(e) => setQrFormData({ ...qrFormData, devoteeName: e.target.value })}
                      placeholder="Enter devotee name"
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Ticket/Booking ID */}
                  <div>
                    <label className="block text-sm mb-2">Ticket/Booking ID</label>
                    <input
                      type="text"
                      value={qrFormData.ticketId}
                      readOnly
                      className="w-full px-4 py-2 rounded-lg border bg-muted text-muted-foreground cursor-not-allowed"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm mb-2">Age <span className="text-red-500">*</span></label>
                    <input
                      type="number"
                      value={qrFormData.age}
                      onChange={(e) => setQrFormData({ ...qrFormData, age: e.target.value })}
                      placeholder="Enter age"
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm mb-2">Gender <span className="text-red-500">*</span></label>
                    <select
                      value={qrFormData.gender}
                      onChange={(e) => setQrFormData({ ...qrFormData, gender: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Date & Time of Visit */}
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2">Date & Time of Visit <span className="text-red-500">*</span></label>
                    <input
                      type="datetime-local"
                      value={qrFormData.dateTime}
                      onChange={(e) => setQrFormData({ ...qrFormData, dateTime: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Upload Photo */}
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2">Upload Photo (Optional)</label>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 px-4 py-2 border border-dashed rounded-lg hover:bg-muted cursor-pointer transition-colors">
                        <Upload size={18} />
                        <span className="text-sm">Choose Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                      {qrFormData.photo && (
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden border">
                          <img src={qrFormData.photo} alt="Preview" className="w-full h-full object-cover" />
                          <button
                            onClick={() => setQrFormData({ ...qrFormData, photo: null })}
                            className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <button
                  onClick={handleGenerateQR}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
                >
                  Generate QR Code
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* QR Preview Section */}
                <div id="qr-preview-content" className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 rounded-xl p-6 border-2 border-orange-300 dark:border-orange-700">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* QR Code */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="bg-white p-6 rounded-lg shadow-lg">
                        <QRCodeSVG
                          id="modal-qr-code-svg"
                          value={JSON.stringify(generatedQRData)}
                          size={200}
                          level="H"
                          includeMargin
                          imageSettings={{
                            src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='50' x='50' text-anchor='middle' dominant-baseline='central' font-size='60'%3E🕉️%3C/text%3E%3C/svg%3E",
                            height: 30,
                            width: 30,
                            excavate: true,
                          }}
                        />
                      </div>
                      <p className="text-sm mt-3 px-3 py-1 bg-orange-200 dark:bg-orange-800 rounded-full">
                        {qrFormData.ticketId}
                      </p>
                    </div>

                    {/* Devotee Details */}
                    <div className="space-y-4">
                      <h3 className="border-b border-orange-300 dark:border-orange-700 pb-2">Devotee Details</h3>
                      
                      {qrFormData.photo && (
                        <div className="flex justify-center">
                          <img src={qrFormData.photo} alt="Devotee" className="w-24 h-24 rounded-lg object-cover border-2 border-orange-400" />
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Name:</span>
                          <span className="text-sm">{qrFormData.devoteeName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Age:</span>
                          <span className="text-sm">{qrFormData.age} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Gender:</span>
                          <span className="text-sm">{qrFormData.gender}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Visit Date:</span>
                          <span className="text-sm">{new Date(qrFormData.dateTime).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Temple:</span>
                          <span className="text-sm">{selectedTemple?.name || "Temple"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={handleDownloadQR}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
                  >
                    <Download size={18} />
                    Download
                  </button>
                  <button
                    onClick={handlePrintQR}
                    className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
                  >
                    <Printer size={18} />
                    Print
                  </button>
                </div>

                {/* Generate Another */}
                <button
                  onClick={handleQRModalOpen}
                  className="w-full border-2 border-dashed border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950 px-6 py-3 rounded-lg transition-all"
                >
                  Generate Another QR Code
                </button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Header */}
      <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center justify-between px-4 md:px-8">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🕉️</span>
              <div>
                <h1 className="text-sm">DarshanEase Admin</h1>
                <p className="text-xs text-muted-foreground">Temple Management</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-800">
              <span className="text-sm">🛠️</span>
              <span className="text-sm">{userName}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[100px] sm:w-[140px]">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">हिन्दी</SelectItem>
                  <SelectItem value="ta">தமிழ்</SelectItem>
                  <SelectItem value="te">తెలుగు</SelectItem>
                  <SelectItem value="kn">ಕನ್ನಡ</SelectItem>
                  <SelectItem value="ml">മലയാളം</SelectItem>
                </SelectContent>
              </Select>
              
              <button
                onClick={handleQRModalOpen}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white transition-all shadow-md hover:shadow-lg"
                title="Generate QR Code"
              >
                <QrCode size={20} />
              </button>
            </div>
            
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex gap-1 overflow-x-auto">
            <TabButton
              icon={<Home size={18} />}
              label="Overview"
              active={activeTab === "overview"}
              onClick={() => setActiveTab("overview")}
            />
            <TabButton
              icon={<span className="text-lg">📱</span>}
              label="QR Generator"
              active={activeTab === "qr"}
              onClick={() => setActiveTab("qr")}
            />
            <TabButton
              icon={<Users size={18} />}
              label="Crowd Monitor"
              active={activeTab === "crowd"}
              onClick={() => setActiveTab("crowd")}
            />
            <TabButton
              icon={<BookOpen size={18} />}
              label="Bookings"
              active={activeTab === "bookings"}
              onClick={() => setActiveTab("bookings")}
            />
            <TabButton
              icon={<MessageSquare size={18} />}
              label="Feedback"
              active={activeTab === "feedback"}
              onClick={() => setActiveTab("feedback")}
            />
            <TabButton
              icon={<IndianRupee size={18} />}
              label="Donations"
              active={activeTab === "donations"}
              onClick={() => setActiveTab("donations")}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function TabButton({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
        active
          ? "border-purple-600 text-purple-600"
          : "border-transparent text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}
      <span className="text-sm hidden sm:inline">{label}</span>
    </button>
  );
}

function StatCard({
  icon,
  title,
  value,
  change,
  trend,
  color,
}: {
  icon: string;
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  color: string;
}) {
  return (
    <div className={`bg-gradient-to-br ${color} text-white rounded-xl p-5`}>
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{icon}</div>
        <div className={`text-xs px-2 py-1 rounded-full ${trend === "up" ? "bg-green-500/30" : "bg-red-500/30"}`}>
          {change}
        </div>
      </div>
      <div className="text-2xl mb-1">{value}</div>
      <div className="text-sm opacity-90">{title}</div>
    </div>
  );
}

function ActivityItem({ icon, text, time }: { icon: string; text: string; time: string }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
      <div className="text-xl">{icon}</div>
      <div className="flex-1">
        <p className="text-sm">{text}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}
