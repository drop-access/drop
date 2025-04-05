export type Drop = {
    id: string
    title: string
    description: string
    image: string
    participants: number
    category: string
    time: string
    trending: boolean
  }
  
  declare global {
    var _drops: Drop[] | undefined
  }
  
  export const drops: Drop[] = global._drops ?? (global._drops = [])