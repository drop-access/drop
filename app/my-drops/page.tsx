"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, Plus, Sparkles } from "lucide-react"
import Link from "next/link"

export default function MyDropsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="container max-w-md mx-auto p-4 pt-6 relative">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-primary to-neutral-400">
            My Drops
          </h1>
          <Link href="/create">
            <Button variant="outline" className="group bg-background/50 backdrop-blur-sm border-primary/20">
              <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-200" />
              Create Drop
            </Button>
          </Link>
        </div>
        
        <Card className="p-8 text-center bg-card/50 backdrop-blur-sm border-primary/10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent blur-3xl" />
            <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4 relative" />
          </div>
          <h2 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/80">
            No drops yet
          </h2>
          <p className="text-muted-foreground mb-6">
            Start creating your first drop and watch the magic happen
          </p>
          <Link href="/create">
            <Button className="bg-primary/10 hover:bg-primary/20 backdrop-blur-sm border border-primary/20 group">
              <Sparkles className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
              Create Your First Drop
            </Button>
          </Link>
        </Card>
      </div>
    </main>
  )
}
