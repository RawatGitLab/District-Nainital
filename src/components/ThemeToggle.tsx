import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

interface ThemeToggleProps {
  className?: string;
  onThemeChange?: (theme: "light" | "dark") => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = "", onThemeChange }) => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        return savedTheme;
      }
    }
    return "light"; // default light for the application
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
    if (onThemeChange) {
      onThemeChange(theme);
    }
  }, [theme, onThemeChange]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 cursor-pointer select-none border ${
        theme === "dark"
          ? "bg-slate-800 text-amber-300 border-slate-700 hover:bg-slate-700 shadow-sm"
          : "bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700 shadow-sm"
      } ${className}`}
      title={`Switch to ${theme === "light" ? "Dark" : "Light"} mode`}
      aria-label="Toggle Theme"
    >
      {theme === "dark" ? (
        <Moon className="w-3.5 h-3.5 text-amber-300 fill-amber-300/20" />
      ) : (
        <Sun className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
      )}
    </button>
  );
};

export default ThemeToggle;
