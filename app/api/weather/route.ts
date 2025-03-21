import { NextResponse } from "next/server"
import { headers } from "next/headers"

export const runtime = "nodejs"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")
  const units = searchParams.get("units") || "metric"
  const headersList = await headers()

  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 })
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city,
      )}&units=${units}&appid=${process.env.OPENWEATHER_API_KEY}`,
      {
        headers: {
          Accept: "application/json",
          "User-Agent": headersList.get("user-agent") || "Weather App",
        },
        next: {
          revalidate: 300, // Cache for 5 minutes
        },
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Weather data fetch failed")
    }

    const data = await response.json()

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=59",
      },
    })
  } catch (error) {
    console.error("Weather API Error:", error)
    return NextResponse.json({ error: "Failed to fetch weather data" }, { status: 500 })
  }
}

