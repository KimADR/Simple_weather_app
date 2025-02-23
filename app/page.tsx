import WeatherDashboard from "@/components/weather-dashboard"

export default function Home() {
  return (
    <main className="min-h-screen weather-gradient">
      <div className="min-h-screen bg-gradient-to-b from-black/20 to-black/0 dark:from-black/40 dark:to-black/20 backdrop-blur-sm py-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center space-y-4 animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">Weather Forecast</h1>
            <p className="text-lg text-gray-200 drop-shadow">Get real-time weather updates for any city worldwide</p>
          </div>
          <WeatherDashboard />
        </div>
      </div>
    </main>
  )
}

