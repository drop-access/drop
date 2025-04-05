import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { FooterNav } from '@/components/footer-nav';
import MiniKitProvider from '@/components/minikit-provider';
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Drop | Exclusive Drops',
  description: 'Join exclusive drops for events, sneakers, and more.',
  icons: ['/drop.png']
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const ErudaProvider = dynamic(
    () => import("../components/Eruda").then((c) => c.ErudaProvider),
    {
      ssr: false,
    }
  );
  return (
    <html lang="en" suppressHydrationWarning>

      <MiniKitProvider>
      <body className={`${inter.className} overflow-x-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen pb-[4.5rem]">
            {children}
          </div>
          <FooterNav />
          <Toaster />
        </ThemeProvider>
      </body>
      </MiniKitProvider>
    </html>
  );
}
