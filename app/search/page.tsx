"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchPage() {
  return (
    <main className="container max-w-md mx-auto p-4 pt-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search drops..."
          className="pl-9"
        />
      </div>
    </main>
  )
}


// const handleSelf = async () => {
//   const userId = v4();
//   const selfApp = new SelfAppBuilder({
//     appName: "Drop",
//     scope: "drop",
//     endpoint: `https://3c98-111-235-226-130.ngrok-free.app/api/verifyself/`,
//     logoBase64: "https://pluspng.com/img-png/images-owls-png-hd-owl-free-download-png-png-image-485.png",
//     // userIdType: 'hex',
//     userId: userId,
//     disclosures: {
//       minimumAge: 20,
//       excludedCountries: [countries.FRANCE],
//     },
//     // devMode: true,

//   }).build();
//   const deeplink = getUniversalLink(selfApp);
//   window.open(deeplink, '_blank')
// }