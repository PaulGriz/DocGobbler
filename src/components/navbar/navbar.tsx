"use client"

import Image from "next/image"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { projectTitle } from "@/configs/ui-configs"

// TODO: Improve Navbar Title Scaling. Currently, using manual breakpoints. Would be better to use a more dynamic solution.

export default function Navbar() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 mx-auto flex h-16 w-full max-w-[900px] items-center justify-between border-b bg-background/95 p-4 backdrop-blur">
      <Image
        src="/turkey.png"
        className="mr-1 h-[28px] w-[28px] xs-nav:h-[32px] xs-nav:w-[32px]"
        alt="Logo"
        width={32}
        height={32}
        priority={true}
      />

      <span className="block flex-grow text-base font-bold xs-nav:hidden">
        {projectTitle.short}
      </span>

      <span className="hidden flex-grow text-center text-base font-bold xs-nav:inline sm:text-xl md:text-nav-lg">
        {projectTitle.long}
      </span>

      <DarkModeToggle />
    </div>
  )
}
