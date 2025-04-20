import React, { memo } from "react";
import { Trophy, BarChart3, ChevronDown, Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  currentSeason?: string;
  className?: string;
}

const Logo = memo(() => (
  <div className="flex items-center gap-3 group">
    <Trophy
      size={28}
      className="text-blue-500 transition-transform duration-300 group-hover:scale-110"
      aria-hidden="true"
    />
    <div>
      <h1 className="text-xl md:text-2xl font-bold text-white">Soccer Championship Analysis</h1>
      <p className="text-xs text-gray-400 hidden md:block">Professional Soccer Statistics & Analysis</p>
    </div>
  </div>
));

Logo.displayName = "Logo";

export const Header = memo(({ currentSeason = "2023-2024", className = "" }: HeaderProps) => {
  return (
    <header
      className={`bg-[#0a0f14]/90 backdrop-blur-md border-b border-white/5 text-white shadow-lg sticky top-0 z-50 transition-all duration-300 ease-in-out ${className}`}
    >
      <nav role="navigation" aria-label="Main navigation">
        {/* Navigation Content */}
      </nav>
    </header>
  );
});

Header.displayName = "Header";
