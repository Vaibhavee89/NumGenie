"use client"

import { useEffect } from "react"
import Calculator from "../components/calculator"

export default function Home() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js").then(
          (registration) => {
            console.log("Service Worker registration successful with scope: ", registration.scope)
          },
          (err) => {
            console.log("Service Worker registration failed: ", err)
          },
        )
      })
    }
  }, [])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-500 to-purple-600">
      <h1 className="mb-8 text-4xl font-bold text-white">NumGenie</h1>
      <Calculator />
    </main>
  )
}

