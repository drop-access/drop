"use client"

import { Card } from "@/components/ui/card"
import { Star, Timer, Sparkles, TrendingUp } from "lucide-react"
import { Drop } from "@/lib/drops"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect, useState } from "react"

export default function ExplorePage() {
  const [isLoading, setIsLoading] = useState(true)
  const [dropsByCategory, setDropsByCategory] = useState<Record<string, Drop[]>>({})
  const [trendingCount, setTrendingCount] = useState(0)

  useEffect(() => {
    async function fetchDrops() {
      try {
        const response = await fetch('/api/get-drops')
        const data = await response.json()
        
        // Filter only trending drops
        const trendingDrops = data.drops.filter((drop: Drop) => drop.trending)
        setTrendingCount(trendingDrops.length)

        // Group drops by category
        const grouped = trendingDrops.reduce((acc: Record<string, Drop[]>, drop: Drop) => {
          if (!acc[drop.category]) {
            acc[drop.category] = []
          }
          acc[drop.category].push(drop)
          return acc
        }, {})

        setDropsByCategory(grouped)
      } catch (error) {
        console.error('Error fetching drops:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDrops()
  }, [])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative">
          <div className="container mx-auto p-4 pt-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-1 bg-gradient-to-b from-primary/50 to-accent/50 rounded-full" />
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-primary to-neutral-400">
                  Loading Trending Drops...
                </h1>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

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
                {trendingCount} exclusive drops available
              </p>
            </div>
          </div>



          <div className="space-y-12">
            {Object.entries(dropsByCategory).map(([category, drops]) => (
              <div key={category} className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">{category}</h2>
                <Carousel className="w-full">
                  <CarouselContent>
                    {drops.map((drop) => (
                      <CarouselItem key={drop.id} className="md:basis-1/2">
                        <Link href={`/drops/${drop.id}`}>
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
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>
              </div>
            ))}
            <br></br>
            <br></br>
          </div>
        </div>
      </div>
    </main>
  )
}
