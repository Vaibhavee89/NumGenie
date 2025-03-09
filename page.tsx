import Calculator from "./calculator"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-br from-blue-500 to-purple-600">
      <h1 className="mb-8 text-4xl font-bold text-white">NumGenie</h1>
      <Calculator />
    </main>
  )
}

