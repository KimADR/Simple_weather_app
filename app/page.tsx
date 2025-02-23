"use client"

import { useState, useEffect } from 'react'
import WeatherDashboard from "@/components/weather-dashboard"
import { MoveRight } from 'lucide-react'

const backgrounds = [
  '/landscape.jpg',
  '/Arda.jpg',
  '/Ardara.jpg',
]

export default function Home() {
  const [currentBg, setCurrentBg] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length)
    }, 10000) // Change background every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <main 
      className="min-h-screen bg-cover bg-center bg-fixed transition-all duration-1000"
      style={{ backgroundImage: `url("${backgrounds[currentBg]}")` }}
    >
      <div className="min-h-screen backdrop-blur-sm bg-gradient-to-b from-black/60 via-black/50 to-black/30 dark:from-black/80 dark:via-black/70 dark:to-black/60">
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-6 animate-fade-in-up">
              <div className="inline-block">
                <div className="flex items-center gap-2 text-sm text-white/80 bg-white/10 rounded-full px-4 py-2 mb-6 backdrop-blur-md animate-bounce-subtle">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                  Real-time Weather Updates
                  <MoveRight className="w-4 h-4" />
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-xl tracking-tight">
                Weather
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 ml-4">
                  Forecast
                </span>
              </h1>
              <p className="text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
                Get accurate weather updates for any city worldwide with our beautiful and intuitive interface
              </p>
            </div>
            <WeatherDashboard />
          </div>
        </div>
      </div>
    </main>
  )
}