import { Globe, Menu } from "lucide-react";
import { Temple } from "../data/temples";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Badge } from "./ui/badge";
import { Language } from "../data/translations";
import { useTranslation } from "../hooks/useTranslation";

interface TopBarProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  selectedTemple: Temple | null;
  onMobileMenuToggle?: () => void;
}

export function TopBar({ language, onLanguageChange, selectedTemple, onMobileMenuToggle }: TopBarProps) {
  const { t } = useTranslation(language, onLanguageChange);
  
  return (
    <div className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 md:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          
          {/* Current Context */}
          {selectedTemple && (
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-2">
                <span className="text-xs hidden sm:inline">{t("selectedTemple")}</span>
                <span className="truncate max-w-[150px] sm:max-w-none">{selectedTemple.name}</span>
              </Badge>
            </div>
          )}
        </div>

        {/* Right Side - Language Selector */}
        <div className="flex items-center gap-4">
          <Select value={language} onValueChange={onLanguageChange}>
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
        </div>
      </div>
    </div>
  );
}
