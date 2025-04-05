"use client"

import { Compass, Search, User } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navigation = [
  {
    href: "/search",
    label: "Search",
    icon: Search,
  },
  {
    href: "/explore",
    label: "Explore  ",
    icon: Compass,
  },
  {
    href: "/my-drops",
    label: "Drops",
    icon: User,
  },
]

export function FooterNav() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 py-2 left-0 right-0 border-t bg-background/80 backdrop-blur-lg">
      <nav className="flex items-center justify-around max-w-md mx-auto">
        {navigation.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex flex-col items-center gap-1 p-4 text-sm transition-colors hover:text-primary",
              pathname === href
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}