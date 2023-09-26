"use client"

// =============== IMPORTS ===============
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
// =============== COMPONENTS ===============
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function DarkModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="xs:h-[2.3rem] xs:w-[2.3rem] 2xs:h-[2.1rem] 2xs:w-[2.1rem] h-[1.8rem] w-[1.8rem] md:h-[2.5rem] md:w-[2.5rem]"
      >
        <Button variant="outline" size="icon">
          <Sun className="xs:h-[1.2rem] xs:w-[1.2rem] 2xs:h-[1.1rem] 2xs:w-[1.1rem] h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 md:h-[1.45rem] md:w-[1.45rem]" />
          <Moon className="xs:h-[1.2rem] xs:w-[1.2rem] 2xs:h-[1.1rem] 2xs:w-[1.1rem] absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 md:h-[1.45rem] md:w-[1.45rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
