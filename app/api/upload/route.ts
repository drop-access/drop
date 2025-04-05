// app/api/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { writeFile } from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  const data = await req.formData()
  const file: File | null = data.get('file') as unknown as File

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = new Uint8Array(bytes) // 👈 This is the fix

  const filename = `${uuidv4()}-${file.name}`
  const filePath = path.join(process.cwd(), 'public/uploads', filename)

  await writeFile(filePath, buffer) // ✅ Now works

  return NextResponse.json({ url: `/uploads/${filename}` }, { status: 200 })
}
