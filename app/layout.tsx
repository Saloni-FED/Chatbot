import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BeyondChats - Chatbot Setup",
  description: "Set up your intelligent chatbot in minutes",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </body>
    </html>
  )
}

