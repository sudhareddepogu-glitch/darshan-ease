import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "./Sidebar";
import { HeroSection } from "./HeroSection";
import { CrowdStatus } from "./CrowdStatus";
import { BookingSection } from "./BookingSection";
import { InteractiveTempleMap } from "./InteractiveTempleMap";
import { DonationSection } from "./DonationSection";
import { AccommodationSection } from "./AccommodationSection";
import { TempleInfo } from "./TempleInfo";
import { FeedbackSection } from "./FeedbackSection";
import { TemplesSection } from "./TemplesSection";
import { GeneralSettings } from "./GeneralSettings";
import { Footer } from "./Footer";
import { Temple } from "../data/temples";
import { Language } from "../data/translations";
import { useTranslation } from "../hooks/useTranslation";
import { TempleSelector } from "./TempleSelector";
import { temples } from "../data/temples";
import { LogOut, Cloud, QrCode, Globe, Download, Printer, Upload, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { QRCodeSVG } from "qrcode.react";

interface UserDashboardProps {
  selectedTemple: Temple | null;
  onSelectTemple: (temple: Temple | null) => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onLogout: () => void;
  userName: string;
}

export function UserDashboard({
  selectedTemple,
  onSelectTemple,
  language,
  onLanguageChange,
  onLogout,
  userName,
}: UserDashboardProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const { t } = useTranslation(language, onLanguageChange);

  // Mock weather data
  const [weather] = useState({
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    icon: "🌤️",
  });

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

  const handleViewTempleDetails = (templeId: string) => {
    const temple = temples.find((t) => t.id === templeId);
    if (temple) {
      onSelectTemple(temple);
      setActiveSection("about");
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully!");
    onLogout();
  };

  const handleQRModalOpen = () => {
    // Reset form or keep previous data - let's reset for fresh generation
    setGeneratedQRData(null);
    setQrFormData({
      devoteeName: "",
      ticketId: `TKT-${Date.now()}`,
      age: "",
      gender: "",
      dateTime: new Date().toISOString().slice(0, 16),
      photo: null,
    });
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
    if (!qrFormData.devoteeName || !qrFormData.dateTime) {
      toast.error("Please fill in all required fields!");
      return;
    }

    const qrData = {
      ...qrFormData,
      temple: selectedTemple?.name || "Temple",
      generatedAt: new Date().toISOString(),
    };

    setGeneratedQRData(qrData);
    toast.success("QR Code generated successfully!");
  };

  const handleDownloadQR = () => {
    const canvas = document.querySelector("#qr-code-canvas canvas") as HTMLCanvasElement;
    if (canvas) {
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = `QR-${qrFormData.ticketId}.png`;
      link.href = url;
      link.click();
      toast.success("QR Code downloaded!");
    }
  };

  const handlePrintQR = () => {
    window.print();
    toast.success("Print dialog opened!");
  };

  const renderSection = () => {
    if (!selectedTemple && activeSection !== "home" && activeSection !== "temples" && activeSection !== "settings") {
      return (
        <div className="container mx-auto px-4 md:px-8 py-16 text-center">
          <h2 className="mb-4">{t("pleaseSelectTemple")}</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            {t("selectTempleMessage")}
          </p>
          <TempleSelector selectedTemple={selectedTemple} onSelectTemple={onSelectTemple} />
        </div>
      );
    }

    switch (activeSection) {
      case "temples":
        return <TemplesSection onViewDetails={handleViewTempleDetails} />;
      case "crowd":
        return <CrowdStatus temple={selectedTemple} />;
      case "booking":
        return <BookingSection temple={selectedTemple} />;
      case "map":
        return <InteractiveTempleMap temple={selectedTemple} />;
      case "donate":
        return <DonationSection temple={selectedTemple} />;
      case "accommodation":
        return <AccommodationSection temple={selectedTemple} />;
      case "about":
        return <TempleInfo temple={selectedTemple} />;
      case "feedback":
        return <FeedbackSection temple={selectedTemple} />;
      case "settings":
        return <GeneralSettings language={language} onLanguageChange={onLanguageChange} />;
      case "home":
      default:
        return (
          <>
            {selectedTemple && (
              <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-8 md:py-12">
                <div className="container mx-auto px-4 md:px-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <div className="text-4xl md:text-5xl mb-3">🛕</div>
                    <h1 className="mb-2 text-2xl md:text-3xl">Welcome to {selectedTemple.name}</h1>
                    <p className="text-base md:text-lg opacity-90">
                      {selectedTemple.city}, {selectedTemple.state}
                      {selectedTemple.deity && ` • Deity: ${selectedTemple.deity}`}
                    </p>
                  </motion.div>
                </div>
              </div>
            )}

            {!selectedTemple && <HeroSection onNavigate={setActiveSection} language={language} setLanguage={onLanguageChange} />}

            {/* User-specific Quick Actions */}
            <div className="container mx-auto px-4 md:px-8 py-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickActionCard
                  icon="🕉️"
                  title={t("bookDarshan")}
                  description="Book your temple visit"
                  onClick={() => setActiveSection("booking")}
                  gradient="from-orange-500 to-red-500"
                />
                <QuickActionCard
                  icon="👥"
                  title={t("checkLiveStatus")}
                  description="View current crowd"
                  onClick={() => setActiveSection("crowd")}
                  gradient="from-blue-500 to-cyan-500"
                />
                <QuickActionCard
                  icon="💸"
                  title={t("digitalDonations")}
                  description="Make offerings online"
                  onClick={() => setActiveSection("donate")}
                  gradient="from-green-500 to-emerald-500"
                />
                <QuickActionCard
                  icon="🏨"
                  title={t("accommodationTitle")}
                  description="Book lodging"
                  onClick={() => setActiveSection("accommodation")}
                  gradient="from-purple-500 to-pink-500"
                />
              </div>
            </div>

            {/* Weather Widget */}
            {selectedTemple && (
              <div className="container mx-auto px-4 md:px-8 pb-8">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="mb-1">🌦️ Weather Update</h3>
                      <p className="text-sm text-muted-foreground">{selectedTemple.city}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-4xl mb-2">{weather.icon}</div>
                      <div className="text-2xl">{weather.temp}°C</div>
                      <div className="text-sm text-muted-foreground">{weather.condition}</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Humidity: {weather.humidity}%
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Temple History Section */}
            <div className="bg-muted/30 py-12">
              <div className="container mx-auto px-4 md:px-8">
                <div className="text-center mb-8">
                  <h2 className="mb-4">{t("discoverSacredHeritage")}</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {t("exploreRichHistory")}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {temples
                    .filter((t) => t.history)
                    .slice(0, 6)
                    .map((temple) => (
                      <div
                        key={temple.id}
                        onClick={() => handleViewTempleDetails(temple.id)}
                        className="group bg-card border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-primary"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={temple.image}
                            alt={temple.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                          <div className="absolute bottom-3 left-3 right-3">
                            <h3 className="text-white mb-1 line-clamp-1">{temple.name}</h3>
                            <p className="text-white/90 text-sm">
                              📍 {temple.city}, {temple.state}
                            </p>
                          </div>
                        </div>
                        <div className="p-5">
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                            {temple.history?.paragraphs[0]}
                          </p>
                          <button className="text-primary text-sm hover:underline flex items-center gap-1 group-hover:gap-2 transition-all">
                            {t("explore")} →
                          </button>
                        </div>
                      </div>
                    ))}
                </div>

                <div className="text-center">
                  <button
                    onClick={() => setActiveSection("temples")}
                    className="bg-primary text-primary-foreground px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
                  >
                    <span>{t("viewAllTemples", { count: temples.length })}</span>
                    <span>🕉️</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex"
    >
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
                      className="w-full px-4 py-2 rounded-lg border bg-muted cursor-not-allowed"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-sm mb-2">Age</label>
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
                    <label className="block text-sm mb-2">Gender</label>
                    <select
                      value={qrFormData.gender}
                      onChange={(e) => setQrFormData({ ...qrFormData, gender: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Date & Time */}
                  <div className="md:col-span-2">
                    <label className="block text-sm mb-2">Visit Date & Time <span className="text-red-500">*</span></label>
                    <input
                      type="datetime-local"
                      value={qrFormData.dateTime}
                      onChange={(e) => setQrFormData({ ...qrFormData, dateTime: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border bg-background focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm mb-2">Devotee Photo (Optional)</label>
                  <div className="flex items-center gap-4">
                    {qrFormData.photo && (
                      <div className="relative w-24 h-24 rounded-lg overflow-hidden border-2 border-orange-300">
                        <img src={qrFormData.photo} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          onClick={() => setQrFormData({ ...qrFormData, photo: null })}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    <label className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950 transition-all">
                      <Upload size={20} />
                      <span className="text-sm">{qrFormData.photo ? "Change Photo" : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
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
                {/* Generated QR Code Display */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 border-2 border-orange-200 dark:border-orange-800 rounded-xl p-8">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* QR Code */}
                    <div className="flex flex-col items-center">
                      <div id="qr-code-canvas" className="bg-white p-6 rounded-xl shadow-lg">
                        <QRCodeSVG
                          value={JSON.stringify(generatedQRData)}
                          size={220}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <p className="mt-4 text-sm text-muted-foreground text-center">
                        Scan this QR code at the temple entrance
                      </p>
                    </div>

                    {/* Devotee Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 mb-4">
                        {qrFormData.photo && (
                          <img src={qrFormData.photo} alt="Devotee" className="w-16 h-16 rounded-full object-cover border-2 border-orange-300" />
                        )}
                        <div>
                          <h3 className="text-lg">{qrFormData.devoteeName}</h3>
                          <p className="text-sm text-muted-foreground">ID: {qrFormData.ticketId}</p>
                        </div>
                      </div>
                      <div className="space-y-2 bg-white/50 dark:bg-black/20 rounded-lg p-4">
                        {qrFormData.age && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Age:</span>
                            <span className="text-sm">{qrFormData.age} years</span>
                          </div>
                        )}
                        {qrFormData.gender && (
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Gender:</span>
                            <span className="text-sm">{qrFormData.gender}</span>
                          </div>
                        )}
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

      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        language={language}
        setLanguage={onLanguageChange}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarCollapsed ? "lg:ml-0" : "lg:ml-[280px]"}`}>
        <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-16 items-center justify-between px-4 md:px-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    setIsMobileMenuOpen(!isMobileMenuOpen);
                  } else {
                    setIsSidebarCollapsed(!isSidebarCollapsed);
                  }
                }}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <span className="text-xl">☰</span>
              </button>

              {selectedTemple && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg">
                  <span className="text-lg">🛕</span>
                  <div className="flex flex-col">
                    <span className="text-xs text-muted-foreground">{t("selectedTemple")}</span>
                    <span className="text-sm truncate max-w-[200px]">{selectedTemple.name}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
                <span className="text-sm">👤</span>
                <span className="text-sm">{userName}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Select value={language} onValueChange={(value) => onLanguageChange(value as Language)}>
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
                className="p-2 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderSection()}
            </motion.div>
          </AnimatePresence>
        </main>

        {activeSection !== "feedback" && (
          <button
            onClick={() => setActiveSection("feedback")}
            className="fixed bottom-6 right-6 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:scale-110 transition-transform z-40"
            title={t("giveFeedback")}
          >
            <span className="text-2xl">💬</span>
          </button>
        )}

        <Footer />
      </div>
    </motion.div>
  );
}

function QuickActionCard({
  icon,
  title,
  description,
  onClick,
  gradient,
}: {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  gradient: string;
}) {
  return (
    <button
      onClick={onClick}
      className="group bg-card border rounded-xl p-6 hover:shadow-xl transition-all text-left hover:border-primary"
    >
      <div className={`w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </button>
  );
}
