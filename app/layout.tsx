import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import AnimatedBackground from "@/components/animated-background"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Modern Weather App",
  description: "Get real-time weather updates with a beautiful interface",
  openGraph: {
    title: "Modern Weather App",
    description: "Get real-time weather updates with a beautiful interface",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AnimatedBackground />
        {children}
      </body>
    </html>
  )
}