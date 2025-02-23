import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherUnit } from "./weather-dashboard"
import WeatherIcon from "./weather-icon"
import { Skeleton } from "@/components/ui/skeleton"
import { Cloud, Droplets, Gauge, Thermometer, Wind, Sunrise, Sunset } from "lucide-react"
import { WeatherData } from "@/lib/types"

interface WeatherDisplayProps {
  weather: WeatherData
  unit: WeatherUnit
  loading: boolean
}

export default function WeatherDisplay({ weather, unit, loading }: WeatherDisplayProps) {
  if (loading) {
    return <WeatherSkeleton />
  }

  const tempUnit = unit === "metric" ? "°C" : "°F"
  const windUnit = unit === "metric" ? "m/s" : "mph"

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <Card className="weather-glass animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-white/10">
              <WeatherIcon iconCode={weather.weather[0].icon} size={48} className="animate-pulse-slow" />
            </div>
            <div className="space-y-1">
              <span className="text-xl font-semibold">{weather.name}</span>
              <p className="text-sm font-normal text-muted-foreground">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-6xl font-bold tracking-tighter flex items-start">
              {Math.round(weather.main.temp)}
              <span className="text-2xl mt-2">{tempUnit}</span>
            </p>
            <p className="text-sm text-muted-foreground capitalize flex items-center gap-2">
              <Cloud className="w-4 h-4" />
              {weather.weather[0].description}
            </p>
          </div>
          <div className="text-right space-y-2">
            <div className="flex items-center justify-end gap-2 text-sm">
              <Thermometer className="w-4 h-4" />
              <span>
                Feels like: {Math.round(weather.main.feels_like)}
                {tempUnit}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              H: {Math.round(weather.main.temp_max)}
              {tempUnit}
              <span className="mx-1">•</span>
              L: {Math.round(weather.main.temp_min)}
              {tempUnit}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          <WeatherDetail icon={<Droplets className="w-4 h-4" />} label="Humidity" value={`${weather.main.humidity}%`} />
          <WeatherDetail
            icon={<Wind className="w-4 h-4" />}
            label="Wind Speed"
            value={`${weather.wind.speed} ${windUnit}`}
          />
          <WeatherDetail icon={<Gauge className="w-4 h-4" />} label="Pressure" value={`${weather.main.pressure} hPa`} />
          <WeatherDetail icon={<Cloud className="w-4 h-4" />} label="Clouds" value={`${weather.clouds.all}%`} />
        </div>
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <WeatherDetail
            icon={<Sunrise className="w-4 h-4" />}
            label="Sunrise"
            value={formatTime(weather.sys.sunrise)}
          />
          <WeatherDetail icon={<Sunset className="w-4 h-4" />} label="Sunset" value={formatTime(weather.sys.sunset)} />
        </div>
      </CardContent>
    </Card>
  )
}

function WeatherDetail({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm text-muted-foreground flex items-center gap-2">
        {icon}
        {label}
      </p>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  )
}

function WeatherSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-12 w-[200px]" />
      </CardHeader>
      <CardContent className="grid gap-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-14 w-32" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

