import "./globals.css"
import { Inter } from "next/font/google"
import { ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import Footer from "@/components/footer/footer"
import Navbar from "@/components/navbar/navbar"

const inter = Inter({
  subsets: ["latin"],
})

export { metadata } from "@/configs/metadata"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" className={inter.className} suppressHydrationWarning>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <head />
        <body>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <div className="grid h-[calc(100dvh)] w-screen grid-cols-1 grid-rows-[4rem_1fr_4rem]">
              <Navbar />
              {children}
              <Footer />
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
