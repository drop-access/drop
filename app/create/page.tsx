"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ImagePlus, Sparkles } from "lucide-react"
import { useState, useRef } from "react"
import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js'
import { useRouter } from "next/navigation"
import { v4 } from 'uuid'

export default function CreatePage() {
  const [isVerified, setIsVerified] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const router = useRouter()

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
      return
    }

    const res = await fetch("/api/create-drop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        image: imageUrl,
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
            {isVerified ? "Create Drop" : "Verify & Create"}
          </Button>
        </Card>
      </div>
    </main>
  )
}
