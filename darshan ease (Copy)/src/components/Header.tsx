import { Globe, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { TempleSelector } from "./TempleSelector";
import { Temple } from "../data/temples";

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  selectedTemple: Temple | null;
  onSelectTemple: (temple: Temple) => void;
}

export function Header({ activeSection, onSectionChange, language, onLanguageChange, selectedTemple, onSelectTemple }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'crowd', label: 'Live Status' },
    { id: 'booking', label: 'Book Darshan' },
    { id: 'map', label: 'Navigation' },
    { id: 'donate', label: 'Donate' },
    { id: 'accommodation', label: 'Stay' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              🕉️
            </div>
            <span className="font-semibold">DarshanEase</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`transition-colors hover:text-primary ${
                  activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Temple Selector, Language Selector & Mobile Menu */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <TempleSelector
                selectedTemple={selectedTemple}
                onSelectTemple={onSelectTemple}
              />
            </div>

            <Select value={language} onValueChange={onLanguageChange}>
              <SelectTrigger className="w-[140px]">
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

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 space-y-2">
            <div className="px-4 pb-2 sm:hidden">
              <TempleSelector
                selectedTemple={selectedTemple}
                onSelectTemple={onSelectTemple}
              />
            </div>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
