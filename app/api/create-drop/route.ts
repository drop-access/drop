// app/api/create-drop/route.ts
import { drops } from '@/lib/drops'
import { v4 as uuidv4 } from 'uuid'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const newDrop = {
    id: uuidv4(),
    title: body.title,
    description: body.description,
    image: body.image,
    participants: 0,
    category: body.category || "Uncategorized",
    time: body.time || "Soon",
    trending: true,
  }

  drops.push(newDrop)

  return NextResponse.json({ status: 200, drop: newDrop })
}
