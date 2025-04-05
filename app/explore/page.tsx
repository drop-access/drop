"use client"

import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import Link from "next/link"

export default function ExplorePage() {
  const featuredDrops = [
    {
      id: "1",
      title: "Supreme x Nike SB Dunk",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
      participants: 25678,
      category: "Sneakers",
    },
    {
      id: "2",
      title: "Tomorrowland 2024",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
      participants: 45123,
      category: "Events",
    },
    {
      id: "3",
      title: "Apple Vision Pro",
      image: "https://images.unsplash.com/photo-1626218174358-7769486c4b79",
      participants: 89012,
      category: "Tech",
    },
    {
      id: "4",
      title: "Rolex Submariner",
      image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa",
      participants: 34567,
      category: "Watches",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="relative">
        <div className="container mx-auto p-4 pt-6">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500">
              Trending Drops
            </h1>
            <div className="text-sm text-muted-foreground">
              {featuredDrops.length} drops available
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredDrops.map((drop) => (
              <Link href={`/drops/${drop.id}`} key={drop.id}>
                <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-muted/20 hover:border-muted/40 transition-all duration-300">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-lg">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent z-10" />
                    <img
                      src={drop.image}
                      alt={drop.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-background/30 backdrop-blur-md rounded-full text-xs font-medium z-20">
                      {drop.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {drop.title}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="h-4 w-4" />
                      <span>{drop.participants.toLocaleString()} interested</span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
