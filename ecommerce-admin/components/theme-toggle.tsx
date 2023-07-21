"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Switch } from "@/components/ui/switch";
import { MountedCheck } from "@/lib/mounted-check";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <MountedCheck>
      <div className="flex items-center space-x-2">
        {theme === "light" ? <Sun /> : <Moon />}
        <Switch
          onClick={toggleTheme}
          checked={theme === "dark"}
          id={`${theme}-mode`}
        />
      </div>
    </MountedCheck>
  );
}
