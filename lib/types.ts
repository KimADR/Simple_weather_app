export interface WeatherData {
    weather: Array<{
      icon: string
      description: string
    }>
    name: string
    main: {
      temp: number
      feels_like: number
      temp_max: number
      temp_min: number
      humidity: number
      pressure: number
    }
    wind: {
      speed: number
    }
    clouds: {
      all: number
    }
    sys: {
      sunrise: number
      sunset: number
    }
  }
  
  export interface ForecastData {
    list: Array<{
      dt: number
      main: {
        temp: number
        humidity: number
        pressure: number
      }
      weather: Array<{
        icon: string
        description: string
      }>
      wind: {
        speed: number
      }
      clouds: {
        all: number
      }
    }>
  }
  
  