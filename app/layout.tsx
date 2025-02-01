import { Inter } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import type React from "react" // Added import for React

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BeyondChats - Chatbot Setup",
  description: "Set up your intelligent chatbot in minutes",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen">
          <div className="container mx-auto px-4 py-8">{children}</div>
        </main>
      </body>
    </html>
  )
}

