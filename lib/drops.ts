export type Drop = {
    id: string
    title: string
    description: string
    image: string
    participants: number
    category: string
    time: string
    trending: boolean
    maxParticipants: number
    price: number
    ageRestriction: number | null
    creator: string
  }

export type MyDrop = {
    id: string
    creator: boolean
    joined: boolean
}

declare global {
    var _drops: Drop[] | undefined
    var _myDrops: MyDrop[] | undefined
}

export const drops: Drop[] = global._drops ?? (global._drops = [])
export const myDrops: MyDrop[] = global._myDrops ?? (global._myDrops = [])
