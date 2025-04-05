import { drops, myDrops } from '@/lib/drops'
import { NextResponse } from 'next/server'

export async function GET() {
  // Get all drops that I've created or joined
  const myDropDetails = myDrops.map(myDrop => {
    const drop = drops.find(d => d.id === myDrop.id)
    return {
      ...drop,
      isCreator: myDrop.creator,
      joined: myDrop.joined
    }
  })

  // Separate into created and joined drops
  const createdDrops = myDropDetails.filter(drop => drop.isCreator)
  const joinedDrops = myDropDetails.filter(drop => drop.joined)

  return NextResponse.json({
    status: 200,
    createdDrops,
    joinedDrops
  })
}