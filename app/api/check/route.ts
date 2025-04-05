import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()
    console.log(body.payload)
  
  return NextResponse.json({ status: 200})
}

