"use client"

import { Button } from "@/components/ui/button"
import type { WeatherUnit } from "./weather-dashboard"

interface UnitToggleProps {
  unit: WeatherUnit
  onUnitChange: (unit: WeatherUnit) => void
}

export default function UnitToggle({ unit, onUnitChange }: UnitToggleProps) {
  return (
    <div className="flex items-center space-x-2 animate-fade-in">
      <Button
        onClick={() => onUnitChange("metric")}
        className={
          unit === "metric"
            ? "bg-white/20 hover:bg-white/30 text-white"
            : "border-white/20 text-white hover:bg-white/20"
        }
      >
        °C
      </Button>
      <Button
        onClick={() => onUnitChange("imperial")}
        className={
          unit === "imperial"
            ? "bg-white/20 hover:bg-white/30 text-white"
            : "border-white/20 text-white hover:bg-white/20"
        }
      >
        °F
      </Button>
    </div>
  )
}

