"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar as CalendarIcon, ImagePlus, Sparkles, MapPin } from "lucide-react"
import { useState, useRef } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js'
import { useRouter } from "next/navigation"
import { v4 } from 'uuid'

export default function CreatePage() {
  const [isVerified, setIsVerified] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [category, setCategory] = useState("Uncategorized")
  const [location, setLocation] = useState("")
  const [dropDate, setDropDate] = useState<Date>()
  const [maxParticipants, setMaxParticipants] = useState<number>(100)
  const [isUnlimited, setIsUnlimited] = useState(false)
  const [price, setPrice] = useState<number>(0)
  const [ageRestriction, setAgeRestriction] = useState<number | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

  const categories = [
    "Sneakers",
    "Tech",
    "Events",
    "Watches",
    "Art",
    "Fashion",
    "Collectibles",
    "Gaming",
    "Music",
    "Sports",
    "Other"
  ]

  const verifyPayload: VerifyCommandInput = {
    action: 'create-drop',
    verification_level: VerificationLevel.Orb,
  }

  const handleVerify = async () => {
    try {
      if (!MiniKit.isInstalled()) return
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload)

      if (finalPayload.status === 'error') {
        console.log('Error payload', finalPayload)
        return
      }

      const verifyResponse = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          payload: finalPayload as ISuccessResult,
          action: 'create-drop',
        }),
      })

      const verifyResponseJson = await verifyResponse.json()
      if (verifyResponseJson.status === 200) {
        console.log('Verification success!')
        setIsVerified(true)
      }
    } catch (err) {
      console.error(err)
    }
  }

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    setImageUrl(data.url)
    setIsUploading(false)
  }

  const handleCreate = async () => {
    if (!isVerified) {
      await handleVerify()
    }

    const res = await fetch("/api/create-drop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        image: imageUrl,
        category,
        location,
        time: dropDate ? format(dropDate, "PPP") : "Soon",
        maxParticipants: isUnlimited ? -1 : maxParticipants,
        price,
        ageRestriction,
        creator: MiniKit.user!.username!
      }),
    })

    const data = await res.json()
    if (data.status === 200) {
      router.push("/")
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="container max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Create Drop</h1>
        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10 space-y-6">
          <div>
            <label className="text-sm font-medium mb-2 block">Drop Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Limited Edition Sneakers"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your drop..."
              className="min-h-[120px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Category</label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., New York City or Online"
                className="pl-9"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Drop Time</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dropDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dropDate ? format(dropDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dropDate}
                  onSelect={setDropDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Maximum Participants</label>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="unlimited"
                  checked={isUnlimited}
                  onCheckedChange={(checked) => setIsUnlimited(checked as boolean)}
                />
                <label
                  htmlFor="unlimited"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Unlimited participants
                </label>
              </div>
              {!isUnlimited && (
                <Input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
                  min={1}
                  placeholder="Enter maximum number of participants"
                />
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Price (in USD)</label>
            <Input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              min={0}
              step={0.01}
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Age Restriction</label>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasAgeRestriction"
                  checked={ageRestriction !== null}
                  onCheckedChange={(checked) => setAgeRestriction(checked ? 18 : null)}
                />
                <label
                  htmlFor="hasAgeRestriction"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Has age restriction
                </label>
              </div>
              {ageRestriction !== null && (
                <Input
                  type="number"
                  value={ageRestriction}
                  onChange={(e) => setAgeRestriction(parseInt(e.target.value))}
                  min={13}
                  placeholder="Enter minimum age"
                />
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Cover Image</label>
            <Button
              type="button"
              variant="outline"
              className="w-full h-32 border-dashed"
              onClick={() => fileRef.current?.click()}
            >
              <div className="flex flex-col items-center gap-2">
                <ImagePlus className="h-8 w-8" />
                {isUploading ? "Uploading..." : imageUrl ? "Uploaded!" : "Click to upload"}
              </div>
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
              className="hidden"
            />
          </div>

          <Button onClick={handleCreate} className="w-full">
            <Sparkles className="w-4 h-4 mr-2" />
            {isVerified ? "Creating..." : "Verify & Create Drop"}
          </Button>
        </Card>
      </div>
    </main>
  )
}
