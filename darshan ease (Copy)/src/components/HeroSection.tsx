import { Button } from "./ui/button";
import { Calendar, MapPin, Users, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useTranslation } from "../hooks/useTranslation";
import { Language } from "../data/translations";

interface HeroSectionProps {
  onNavigate: (section: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function HeroSection({ onNavigate, language, setLanguage }: HeroSectionProps) {
  const { t } = useTranslation(language, setLanguage);
  return (
    <div className="relative">
      {/* Hero Image */}
      <div className="relative h-[500px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1704788564069-d54cab4169aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZW1wbGUlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzU5NjU0NTk2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Temple"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl text-white">
              <h1 className="mb-4 text-3xl md:text-5xl">{t("heroTitle")}</h1>
              <p className="mb-8 text-base md:text-xl opacity-90">
                {t("heroSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Button size="lg" onClick={() => onNavigate('booking')} className="bg-white text-primary hover:bg-white/90">
                  {t("bookDarshanNow")}
                </Button>
                <Button size="lg" variant="outline" onClick={() => onNavigate('crowd')} className="border-white text-white hover:bg-white/10">
                  {t("exploreLiveStatus")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="container mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <QuickStatCard
            icon={<Users className="h-6 w-6" />}
            title="Current Crowd"
            value="Moderate"
            subtitle="~2 hrs wait"
            color="bg-yellow-500"
            onClick={() => onNavigate('crowd')}
          />
          <QuickStatCard
            icon={<Calendar className="h-6 w-6" />}
            title="Next Available"
            value="Today"
            subtitle="4:00 PM - 5:00 PM"
            color="bg-green-500"
            onClick={() => onNavigate('booking')}
          />
          <QuickStatCard
            icon={<MapPin className="h-6 w-6" />}
            title="Temple Hours"
            value="5 AM - 9 PM"
            subtitle="Open Daily"
            color="bg-blue-500"
            onClick={() => onNavigate('about')}
          />
          <QuickStatCard
            icon={<AlertCircle className="h-6 w-6" />}
            title="Weather"
            value="28°C"
            subtitle="Clear Sky"
            color="bg-orange-500"
            onClick={() => onNavigate('home')}
          />
        </div>
      </div>
    </div>
  );
}

function QuickStatCard({ 
  icon, 
  title, 
  value, 
  subtitle, 
  color,
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  subtitle: string; 
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-card rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-left"
    >
      <div className="flex items-start gap-4">
        <div className={`${color} rounded-lg p-3 text-white`}>
          {icon}
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-sm">{title}</p>
          <p className="mt-1">{value}</p>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
    </button>
  );
}
