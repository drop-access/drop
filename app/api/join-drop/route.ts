import { drops, myDrops } from '@/lib/drops'
import { NextRequest, NextResponse } from 'next/server'
import { MiniKit } from '@worldcoin/minikit-js'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { dropId } = body

  const drop = drops.find(d => d.id === dropId)
  if (!drop) {
    return NextResponse.json({ status: 404, message: "Drop not found" })
  }

  // Check if drop is full
  if (drop.maxParticipants !== -1 && drop.participants >= drop.maxParticipants) {
    return NextResponse.json({ status: 400, message: "Drop is full" })
  }

  // Check if user has already joined
  const existingDrop = myDrops.find(d => d.id === dropId && d.joined)
  if (existingDrop) {
    return NextResponse.json({ status: 400, message: "Already joined this drop" })
  }

  // Add to myDrops
  myDrops.push({
    id: dropId,
    creator: false,
    joined: true
  })

  drop.participants += 1
  return NextResponse.json({ status: 200, participants: drop.participants })
}