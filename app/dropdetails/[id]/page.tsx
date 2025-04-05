"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Zap, Wallet, Star, Timer, Sparkles, TrendingUp, Users, Calendar } from "lucide-react"
import { Drop, drops } from "@/lib/drops"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { MiniKit } from "@worldcoin/minikit-js"
import { sendWLDABI } from "@/lib/abi"
import { parseEther } from 'viem'
import { SelfAppBuilder, getUniversalLink, countries } from "@selfxyz/core"
import { v4 } from "uuid"

export default function DropDetailsPage() {
  const params = useParams()
  const [drop, setDrop] = useState<Drop | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAgeVerified, setIsAgeVerified] = useState(false)
  const [showAgeDialog, setShowAgeDialog] = useState(false)
  const [isJoining, setIsJoining] = useState(false)
  const [hasJoined, setHasJoined] = useState(false)

  useEffect(() => {
    async function fetchDrop() {
      try {
        // Get the drop details
        const response = await fetch(`/api/get-drops`)
        const data = await response.json()
        const foundDrop = data.drops.find((d: Drop) => d.id === params.id)
        setDrop(foundDrop || null)

        // Check if user has joined this drop
        const myDropsResponse = await fetch('/api/get-my-drops')
        const myDropsData = await myDropsResponse.json()
        if (myDropsData.status === 200) {
          const joined = myDropsData.joinedDrops.some((d: any) => d.id === params.id)
          setHasJoined(joined)
        }
      } catch (error) {
        console.error('Error fetching drop:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (MiniKit.isInstalled()) {
      fetchDrop()
    } else {
      setIsLoading(false)
    }
  }, [params.id])

  const handleSelf = async () => {
  const userId = v4();
  const selfApp = new SelfAppBuilder({
    appName: "Drop",
    scope: "drop",
    endpoint: `https://2b49-111-235-226-130.ngrok-free.app/api/verifyself/`,
    logoBase64: "https://pluspng.com/img-png/images-owls-png-hd-owl-free-download-png-png-image-485.png",
    // userIdType: 'hex',
    userId: userId,
    disclosures: {
      minimumAge: 20,
      excludedCountries: [countries.FRANCE],
    },
    // devMode: true,

  }).build();
  const deeplink = getUniversalLink(selfApp);
  window.open(deeplink, '_blank')
}

  const handleDropIn = async () => {
    if (drop?.ageRestriction && !isAgeVerified) {
      setShowAgeDialog(true)
      return
    }
    
    try {
      setIsJoining(true)

        const {finalPayload} = await MiniKit.commandsAsync.sendTransaction({
          transaction: [
            {
              address: '0x2cFc85d8E48F8EAB294be644d9E25C3030863003', // world coin token
              abi: sendWLDABI,
              functionName: 'transfer',
              args: ['0x9c193649611f2379f10b1b558cc48301c581544d', parseEther(drop!.price.toString())], // To Whom
            },
          ],
        })
        const check = await fetch('/api/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ payload: finalPayload })
        })
        console.log(finalPayload)
      

      if (finalPayload.status === "error") {
        console.error("Error minting tokens:", finalPayload);
        return;
      } 
      const response = await fetch('/api/join-drop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dropId: drop?.id })
      })
      
      const data = await response.json()
      if (data.status === 200) {
        setDrop(prev => prev ? { ...prev, participants: data.participants } : null)
        setHasJoined(true)
      }
    } catch (error) {
      console.error('Error joining drop:', error)
    } finally {
      setIsJoining(false)
    }
  }

  const handleAgeVerify = () => {
    setIsAgeVerified(true)
    setShowAgeDialog(false)
    handleSelf()
  }

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
                  Loading Drop...
                </h1>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  if (!drop) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
        <div className="relative">
          <div className="container mx-auto p-4 pt-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-1 bg-gradient-to-b from-primary/50 to-accent/50 rounded-full" />
              <div>
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-primary to-neutral-400">
                  Drop Not Found
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
          <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-primary/10">
            <div className="aspect-[21/9] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/20 to-transparent z-10" />
              <img
                src={drop.image}
                alt={drop.title}
                className="object-cover w-full h-full"
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
            <div className="p-6">
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-bold">{drop.title}</h1>
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <div className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500">
                  @{drop.creator}
                </div>
              </div>
              <div className="prose prose-invert max-w-none mb-8">
                <p>{drop.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-4 bg-card/50">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Participants</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {drop.participants.toLocaleString()} {drop.maxParticipants == -1 ? "" : " / " + drop.maxParticipants}
                  </p>
                </Card>

                <Card className="p-4 bg-card/50">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">Drop Time</span>
                  </div>
                  <p className="text-2xl font-bold">{drop.time}</p>
                </Card>

                <Card className="p-4 bg-card/50">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Wallet className="w-4 h-4" />
                    <span className="text-sm">Price</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {drop.price > 0 ? `$${drop.price.toFixed(2)} WLD` : 'Free'}
                  </p>
                </Card>

                <Card className="p-4 bg-card/50">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Age Restriction</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {drop.ageRestriction ? `${drop.ageRestriction}+` : 'None'}
                  </p>
                </Card>
              </div>


              <Button
                onClick={handleDropIn}
                className="w-full"
                size="lg"
                disabled={isJoining || hasJoined || (drop.maxParticipants !== -1 && drop.participants >= drop.maxParticipants)}
              >
                <Zap className="w-5 h-5 mr-2 text-yellow-500" />
                {isJoining ? "JOINING..." : hasJoined ? "READY TO ROLL" : "DROP IN"}
                <Zap className="w-5 h-5 ml-2 text-yellow-500" />
              </Button>

              <Dialog open={showAgeDialog} onOpenChange={setShowAgeDialog}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Age Verification Required</DialogTitle>
                    <DialogDescription className="pt-3">
                      This drop requires you to be {drop.ageRestriction}+ years old.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center space-x-2 pt-4">
                    <Checkbox id="age-verify" onCheckedChange={() => handleAgeVerify()} />
                    <label
                      htmlFor="age-verify"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I confirm that I am {drop.ageRestriction} years or older
                    </label>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </Card>
        </div>
      </div>
      <br></br>

    </main>
  )
}