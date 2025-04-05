"use client"

import { MiniKit } from '@worldcoin/minikit-js'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'

export default function Home() {
  const router = useRouter()
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  let result;

  useEffect(() => {
    if (MiniKit.isInstalled() && MiniKit.user?.username) {
      router.push('/explore')
    }
  }, [router])
  
  const signInWithWallet = async () => {
    if (!MiniKit.isInstalled()) return

    const res = await fetch(`/api/nonce`)
    const { nonce } = await res.json()

    const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
      nonce,
      requestId: '0',
      expirationTime: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      notBefore: new Date(Date.now() - 24 * 60 * 60 * 1000),
      statement: 'Drop me in to Drop ⚡️',
    })

    if (finalPayload.status === 'error') return

    const response = await fetch('/api/complete-siwe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: finalPayload, nonce }),
    })

    result = await response.json()
    if (result.status === 200) {
      setIsSignedIn(true)
      router.push('/explore')
    }
    setWalletAddress(MiniKit.user!.username!)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="relative">
        <div className="container mx-auto p-4 pt-6 flex flex-col items-center justify-center min-h-screen">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-1 bg-gradient-to-b from-primary/50 to-accent/50 rounded-full" />
            <div>
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 via-primary to-neutral-400">
                Welcome to Drop
              </h1>
              <p className="text-muted-foreground">
                Sign in to explore exclusive drops
              </p>
            </div>
          </div>
          
          <Button
            onClick={signInWithWallet}
            className="bg-primary/20 hover:bg-primary/30 backdrop-blur-md text-primary hover:text-primary-foreground transition-all duration-300 px-6 py-6 text-lg group"
          >
            Drop in to Drop 
            <Zap className="w-5 h-5 ml-2 text-yellow-500" />
          </Button>
        </div>
      </div>
    </main>
  )
}
