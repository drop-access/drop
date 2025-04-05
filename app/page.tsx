"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Star, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const upcomingDrops = [
    {
      id: 1,
      title: "Nike Air Max 2025",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      date: "2024-04-15T10:00:00",
      price: "$199",
      participants: 1234,
    },
    {
      id: 2,
      title: "Coachella VIP Experience",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3",
      date: "2024-04-20T18:00:00",
      price: "$899",
      participants: 567,
    },
    {
      id: 3,
      title: "Limited Edition Watch",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
      date: "2024-04-25T15:00:00",
      price: "$499",
      participants: 890,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-gradient-to-b from-primary/10 to-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
            Exclusive Drops
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Be the first to access exclusive products and experiences
          </p>
          <Button size="lg" className="animate-pulse">
            <Zap className="mr-2 h-4 w-4" />
            Join Waitlist
          </Button>
        </div>
      </section>

      {/* Upcoming Drops */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Upcoming Drops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingDrops.map((drop) => (
            <Link href={`/drops/${drop.id}`} key={drop.id}>
              <Card className="group overflow-hidden transition-all hover:shadow-xl">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={drop.image}
                    alt={drop.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                    <h3 className="font-semibold text-lg mb-2">{drop.title}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-sm">
                          {new Date(drop.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1" />
                        <span className="text-sm">{drop.participants}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}