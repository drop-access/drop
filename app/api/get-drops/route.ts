import { drops } from '@/lib/drops'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ drops })
}