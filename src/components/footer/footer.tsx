import { FOOTER_TEXT } from "@/configs/ui-configs"

export default function Footer() {
  return (
    <footer className="mx-auto flex h-16 w-full max-w-[900px] flex-col items-center justify-center p-2 text-center">
      <p className="my-auto text-sm text-gray-500">{FOOTER_TEXT}</p>
    </footer>
  )
}
