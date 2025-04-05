"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Timer, Sparkles, TrendingUp, Users, Calendar } from "lucide-react"
import { Drop } from "@/lib/drops"
import { useEffect, useState } from "react"
import { MiniKit } from '@worldcoin/minikit-js'
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MyDropsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [createdDrops, setCreatedDrops] = useState<Drop[]>([])
  const [joinedDrops, setJoinedDrops] = useState<Drop[]>([])
  const [username, setUsername] = useState<string>("")

  useEffect(() => {
    if (MiniKit.isInstalled() && MiniKit.user?.username) {
      setUsername(MiniKit.user.username)
    }
    async function fetchMyDrops() {
      try {
        const response = await fetch('/api/get-my-drops')
        const data = await response.json()
        if (data.status === 200) {
          setCreatedDrops(data.createdDrops)
          setJoinedDrops(data.joinedDrops)
        }
      } catch (error) {
        console.error('Error fetching my drops:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMyDrops()
  }, [])

  const DropCard = ({ drop }: { drop: Drop }) => (
    <Link href={`/dropdetails/${drop.id}`}>
      <Card className="group overflow-hidden bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-all duration-300">
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
  )

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
                  Loading My Drops...
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
            <div className="h-20 w-1 bg-gradient-to-b from-primary/50 to-accent/50 rounded-full" />
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-primary to-neutral-400">
                My Drops
              </h1>
              {username && (
                <div className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
                  @{username}
                </div>
              )}
              <p className="text-muted-foreground mt-1">
                {createdDrops.length + joinedDrops.length} drops total
              </p>
            </div>
          </div>

          <Tabs defaultValue="joined" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="joined">Joined ({joinedDrops.length})</TabsTrigger>
              <TabsTrigger value="created">Created ({createdDrops.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="joined" className="space-y-6">
              {joinedDrops.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <p>You haven't joined any drops yet.</p>
                  <Link href="/explore">
                    <Button className="mt-4">Explore Drops</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {joinedDrops.map((drop) => (
                    <DropCard key={drop.id} drop={drop} />
                  ))}
                </div>
              )}
            </TabsContent>
            <TabsContent value="created" className="space-y-6">
              {createdDrops.length === 0 ? (
                <div className="text-center text-muted-foreground py-12">
                  <p>You haven't created any drops yet.</p>
                  <Link href="/create">
                    <Button className="mt-4">Create Your First Drop</Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Link href="/create" className="mt-4 col-span-full">
                    <Button className="w-full">Create a new Drop</Button>
                  </Link>
                  {createdDrops.map((drop) => (
                    <DropCard key={drop.id} drop={drop} />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
