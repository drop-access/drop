"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Star, Timer, Sparkles, TrendingUp } from "lucide-react"
import { Drop } from "@/lib/drops"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [drops, setDrops] = useState<Drop[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDrops() {
      try {
        const response = await fetch('/api/get-drops')
        const data = await response.json()
        setDrops(data.drops)
      } catch (error) {
        console.error('Error fetching drops:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDrops()
  }, [])

  const filteredDrops = drops.filter(drop =>
    drop.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="relative">
        <div className="container mx-auto p-4 pt-6">
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search drops..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {isLoading ? (
            <div className="text-center text-muted-foreground">Loading drops...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredDrops.map((drop) => (
                <Link key={drop.id} href={`/dropdetails/${drop.id}`}>
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Star className="h-4 w-4" />
                          <span>{drop.participants.toLocaleString()} going</span>
                        </div>
                        <div className="text-sm font-medium text-primary">
                          {drop.price > 0 ? `$${drop.price.toFixed(2)}` : 'Free'}
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {!isLoading && filteredDrops.length === 0 && (
            <div className="text-center text-muted-foreground mt-8">
              No drops found matching "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
