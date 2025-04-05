"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock } from "lucide-react"

export default function MyDropsPage() {
  return (
    <main className="container max-w-md mx-auto p-4 pt-6">
      <h1 className="text-2xl font-bold mb-6">My Drops</h1>
      <Card className="p-8 text-center">
        <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold mb-2">No drops yet</h2>
        <p className="text-muted-foreground mb-4">
          Join some drops to see them here
        </p>
        <Button>Browse Drops</Button>
      </Card>
    </main>
  )
}