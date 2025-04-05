"use client"

import { Card } from "@/components/ui/card"
import { Star, Timer, Sparkles, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ExplorePage() {
  const featuredDrops = [
    {
      id: "1",
      title: "Supreme x Nike SB Dunk",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a",
      participants: 25678,
      category: "Sneakers",
      time: "2d 5h",
      trending: true,
    },
    {
      id: "2",
      title: "Tomorrowland 2024",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
      participants: 45123,
      category: "Events",
      time: "5d 12h",
      trending: true,
    },
    {
      id: "3",
      title: "Apple Vision Pro",
      image: "https://images.unsplash.com/photo-1626218174358-7769486c4b79",
      participants: 89012,
      category: "Tech",
      time: "1d 8h",
      trending: false,
    },
    {
      id: "4",
      title: "Rolex Submariner",
      image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa",
      participants: 34567,
      category: "Watches",
      time: "3d 15h",
      trending: true,
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="relative">
        <div className="container mx-auto p-4 pt-6">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-1 bg-gradient-to-b from-primary/50 to-accent/50 rounded-full" />
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-primary to-neutral-400">
                Trending Drops
              </h1>
              <p className="text-muted-foreground">
                {featuredDrops.length} exclusive drops available
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredDrops.map((drop) => (
              <Link href={`/drops/${drop.id}`} key={drop.id}>
                <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-primary/10 event hover:border-primary/30 transition-all duration-300">
                  <div className="aspect-[16/9] relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent z-10" />
                    <img
                      src={drop.image}
                      alt={drop.title}
                      className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 flex gap-2 z-20">
                      <div className="px-3 py-1 bg-background/30 backdrop-blur-md rounded-full text-xs font-medium flex items-center gap-1">
                        <Timer className="w-3 h-3" />
                        {drop.time}
                      </div>
                      {drop.trending && (
                        <div className="px-3 py-1 bg-primary/20 backdrop-blur-md rounded-full text-xs font-medium flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </div>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 z-20">
                      <div className="px-3 py-1 bg-background/30 backdrop-blur-md rounded-full text-xs font-medium">
                        {drop.category}
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                        {drop.title}
                      </h3>
                      <Sparkles className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                    </div>
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
