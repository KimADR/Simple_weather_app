import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherUnit } from "./weather-dashboard"
import type { ForecastData } from "@/lib/types"
import WeatherIcon from "./weather-icon"
import { Skeleton } from "@/components/ui/skeleton"
import { Cloud, Droplets, Wind } from "lucide-react"

interface ForecastDisplayProps {
  forecast: ForecastData
  unit: WeatherUnit
  loading: boolean
}

export default function ForecastDisplay({ forecast, unit, loading }: ForecastDisplayProps) {
  if (loading) {
    return <ForecastSkeleton />
  }

  const tempUnit = unit === "metric" ? "°C" : "°F"
  const windUnit = unit === "metric" ? "m/s" : "mph"

  const dailyForecasts = forecast.list
    .reduce(
      (
        acc: Array<{
          date: string
          temp: number
          icon: string
          description: string
          humidity: number
          windSpeed: number
          clouds: number
        }>,
        item,
      ) => {
        const date = new Date(item.dt * 1000).toLocaleDateString()
        if (!acc.find((day) => day.date === date)) {
          acc.push({
            date,
            temp: item.main.temp,
            icon: item.weather[0].icon,
            description: item.weather[0].description,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed,
            clouds: item.clouds.all,
          })
        }
        return acc
      },
      [],
    )
    .slice(1, 6)

  return (
    <Card className="weather-glass animate-fade-in">
      <CardHeader>
        <CardTitle className="text-xl">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {dailyForecasts.map((day, index) => (
            <div
              key={index}
              className="forecast-card flex flex-col items-center space-y-3 p-4 rounded-xl bg-white/10 dark:bg-black/20"
            >
              <p className="text-sm font-medium">
                {new Date(day.date).toLocaleDateString("en-US", {
                  weekday: "short",
                })}
              </p>
              <div className="p-2 rounded-full bg-white/10">
                <WeatherIcon iconCode={day.icon} size={40} className="animate-pulse-slow" />
              </div>
              <p className="text-2xl font-bold">
                {Math.round(day.temp)}
                {tempUnit}
              </p>
              <p className="text-xs text-muted-foreground text-center capitalize">{day.description}</p>
              <div className="w-full pt-3 mt-1 border-t border-border/50 space-y-2">
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Droplets className="w-3 h-3" />
                  {day.humidity}%
                </p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Wind className="w-3 h-3" />
                  {Math.round(day.windSpeed)} {windUnit}
                </p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Cloud className="w-3 h-3" />
                  {day.clouds}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ForecastSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-8 w-32" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-4 w-20" />
              <div className="w-full pt-3 space-y-2">
                <Skeleton className="h-3 w-12 mx-auto" />
                <Skeleton className="h-3 w-12 mx-auto" />
                <Skeleton className="h-3 w-12 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

