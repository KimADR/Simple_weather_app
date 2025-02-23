import Image from "next/image"

interface WeatherIconProps {
  iconCode: string
  size?: number
  className?: string
}

export default function WeatherIcon({ iconCode, size = 24, className = "" }: WeatherIconProps) {
  return (
    <Image
      src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
      alt="Weather icon"
      width={size}
      height={size}
      className={`select-none ${className}`}
      priority
    />
  )
}

