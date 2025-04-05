"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchPage() {
  return (
    <main className="container max-w-md mx-auto p-4 pt-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search drops..."
          className="pl-9"
        />
      </div>
    </main>
  )
}