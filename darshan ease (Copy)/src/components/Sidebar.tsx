import { 
  Home, 
  Users, 
  Calendar, 
  Map, 
  Heart, 
  Hotel, 
  Info, 
  MessageSquare,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

import { useTranslation } from "../hooks/useTranslation";
import { Language } from "../data/translations";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ activeSection, onSectionChange, isMobileMenuOpen, onMobileMenuToggle, language, setLanguage, isCollapsed, onToggleCollapse }: SidebarProps) {
  const { t } = useTranslation(language, setLanguage);

  const navItems = [
    { id: 'home', label: t('dashboard'), icon: Home },
    { id: 'temples', label: t('temples'), icon: Info },
    { id: 'crowd', label: t('liveStatus'), icon: Users },
    { id: 'booking', label: t('bookings'), icon: Calendar },
    { id: 'map', label: t('navigation'), icon: Map },
    { id: 'donate', label: t('donations'), icon: Heart },
    { id: 'accommodation', label: t('accommodation'), icon: Hotel },
    { id: 'feedback', label: t('feedback'), icon: MessageSquare },
    { id: 'settings', label: t('settings'), icon: Settings },
  ];

  const handleNavClick = (section: string) => {
    onSectionChange(section);
    // Close mobile menu when navigating
    if (isMobileMenuOpen) {
      onMobileMenuToggle();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onMobileMenuToggle}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 z-50 overflow-hidden
          ${isCollapsed ? 'w-0 lg:w-0' : 'w-[280px]'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground">
                🕉️
              </div>
              <span className="font-semibold text-sidebar-foreground">{t("appName")}</span>
            </div>
          )}
          {isCollapsed && (
            <div className="h-10 w-10 rounded-full bg-sidebar-primary flex items-center justify-center text-sidebar-primary-foreground mx-auto">
              🕉️
            </div>
          )}
          
          {/* Mobile Close Button */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 hover:bg-sidebar-accent rounded-lg text-sidebar-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto p-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                } ${isCollapsed ? 'justify-center' : ''}`}
                title={isCollapsed ? item.label : undefined}
              >
                <Icon className={`${isCollapsed ? 'h-5 w-5' : 'h-5 w-5'} flex-shrink-0`} />
                {!isCollapsed && (
                  <span className="text-left">{item.label}</span>
                )}
                {isActive && !isCollapsed && (
                  <div className="ml-auto w-1 h-6 bg-sidebar-primary rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Collapse Toggle - Desktop Only */}
        <div className="p-4 border-t border-sidebar-border hidden lg:block">
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground transition-colors"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <>
                <ChevronLeft className="h-5 w-5" />
                <span className="text-sm">{t("collapse")}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
