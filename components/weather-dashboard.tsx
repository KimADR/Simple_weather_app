"use client"

import { useState } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import SearchForm from "./search-form"
import WeatherDisplay from "./weather-display"
import ForecastDisplay from "./forecast-display"
import UnitToggle from "./unit-toggle"
import type { WeatherData, ForecastData } from "@/lib/types"

export type WeatherUnit = "metric" | "imperial"

export default function WeatherDashboard() {
  const [city, setCity] = useState<string>("")
  const [unit, setUnit] = useState<WeatherUnit>("metric")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [forecast, setForecast] = useState<ForecastData | null>(null)

  const handleSearch = async (searchCity: string) => {
    setLoading(true)
    setError(null)
    try {
      const [weatherRes, forecastRes] = await Promise.all([
        fetch(`/api/weather?city=${encodeURIComponent(searchCity)}&units=${unit}`),
        fetch(`/api/forecast?city=${encodeURIComponent(searchCity)}&units=${unit}`),
      ])

      if (!weatherRes.ok || !forecastRes.ok) {
        const errorData = !weatherRes.ok ? await weatherRes.json() : await forecastRes.json()
        throw new Error(errorData.message || "Failed to fetch weather data")
      }

      const [weatherData, forecastData] = await Promise.all([weatherRes.json(), forecastRes.json()])

      setWeather(weatherData)
      setForecast(forecastData)
      setCity(searchCity)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error fetching weather data")
    } finally {
      setLoading(false)
    }
  }

  const handleUnitChange = (newUnit: WeatherUnit) => {
    setUnit(newUnit)
    if (city) {
      handleSearch(city)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
        <SearchForm onSearch={handleSearch} />
        <UnitToggle unit={unit} onUnitChange={handleUnitChange} />
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {weather && (
        <div className="space-y-6">
          <WeatherDisplay weather={weather} unit={unit} loading={loading} />
          {forecast && <ForecastDisplay forecast={forecast} unit={unit} loading={loading} />}
        </div>
      )}
    </div>
  )
}

