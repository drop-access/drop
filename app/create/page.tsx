"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, ImagePlus, Sparkles } from "lucide-react"
import { useState } from "react"
import { MiniKit, VerifyCommandInput, VerificationLevel, ISuccessResult } from '@worldcoin/minikit-js'
import { useRouter } from "next/navigation"



export default function CreatePage() {
  const [isUploading, setIsUploading] = useState(false)
  const [isVerified, setIsVerified] =  useState(false)
  const router = useRouter();

  const verifyPayload: VerifyCommandInput = {
    action: 'create-drop',
    verification_level: VerificationLevel.Orb,
  }

  const handleVerify = async () => {
    try {
    if (!MiniKit.isInstalled()) {
      return
    }
    const {finalPayload} = await MiniKit.commandsAsync.verify(verifyPayload)
      if (finalPayload.status === 'error') {
        return console.log('Error payload', finalPayload)
      }
  
      // Verify the proof in the backend
      const verifyResponse = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
  } 
  catch (error) {
    console.log(error)
  }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="container max-w-2xl mx-auto p-4 pt-6 relative">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-1 bg-gradient-to-b from-primary/50 to-accent/50 rounded-full" />
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-primary to-neutral-400">
              Create Drop
            </h1>
            <p className="text-muted-foreground">
              Launch something amazing into the world
            </p>
          </div>
        </div>

        <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-foreground/80">
                Drop Title
              </label>
              <Input 
                placeholder="e.g., Limited Edition Sneakers" 
                className="bg-background/50 border-primary/10 focus-visible:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground/80">
                Description
              </label>
              <Textarea 
                placeholder="Describe your drop in detail..." 
                className="bg-background/50 border-primary/10 focus-visible:ring-primary/20 min-h-[120px]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground/80">
                Cover Image
              </label>
              <Button 
                variant="outline" 
                className="w-full h-32 border-dashed border-primary/20 bg-background/50 hover:bg-background/80"
                onClick={() => setIsUploading(true)}
              >
                <div className="flex flex-col items-center gap-2">
                  <ImagePlus className="h-8 w-8 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {isUploading ? "Uploading..." : "Click to upload"}
                  </span>
                </div>
              </Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-foreground/80">
                Drop Date
              </label>
              <Button 
                variant="outline" 
                className="w-full justify-start text-muted-foreground bg-background/50 border-primary/20"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Select date and time
              </Button>
            </div>

            {isVerified ? 'verified': 'not verified'}

            <Button onClick={async() => {
 console.log("dhf")
              if(!isVerified) {
              await handleVerify()
              }
            }} className="w-full bg-primary/10 hover:bg-primary/20 backdrop-blur-sm border border-primary/20 group">
              <Sparkles className="w-4 h-4 mr-2 group-hover:text-primary transition-colors" />
              Create Drop
            </Button>
          </div>
        </Card>
      </div>
    </main>
  )
}
