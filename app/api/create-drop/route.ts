// app/api/create-drop/route.ts
import { drops, myDrops } from '@/lib/drops'
import { v4 as uuidv4 } from 'uuid'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const id = (drops.length + 1).toString()
  
  const newDrop = {
    id,
    title: body.title,
    description: body.description,
    image: body.image,
    participants: 0,
    category: body.category || "Uncategorized",
    time: body.time || "Soon",
    trending: true,
    maxParticipants: body.maxParticipants,
    price: body.price || 0,
    ageRestriction: body.ageRestriction || null,
    creator: body.creator
  }

  // Add to drops array
  drops.push(newDrop)

  // Add to myDrops array as creator
  const myDrop = {
    id,
    creator: true,
    joined: false
  }
  myDrops.push(myDrop)

  console.log({ drops, myDrops })
  return NextResponse.json({ status: 200, drop: newDrop })
}

