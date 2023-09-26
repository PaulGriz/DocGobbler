"use client"

// =============== IMPORTS ===============
import { useRef, useEffect } from "react"
import { IoSend } from "react-icons/io5"
// =============== COMPONENTS ===============
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
// =============== CONFIGS ===============
import { ALLOW_SUBMIT_ON_ENTER } from "@/configs/ui-configs"

type InputMessageProps = {
  input: string
  setInput: (value: string) => void
  placeholder: string
  handleSubmit: (value: string) => void
  isLoading: boolean
}

export function InputMessage({
  input,
  setInput,
  placeholder,
  handleSubmit,
  isLoading,
}: InputMessageProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  // Updates the height of the textarea based on the content
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px"

      if (input.length < 2) {
        textAreaRef.current.style.height = "auto"
      }
    }
  }, [input])

  return (
    <div className="flex min-h-[60px] w-full items-center">
      <div className="shadow-xs dark:shadow-xs relative flex w-full flex-grow flex-col rounded-xl border border-black/10 bg-white dark:border-gray-900/50 dark:bg-gray-700 dark:text-white">
        <Textarea
          aria-label="chat input"
          className="m-0 max-h-[200px] w-full resize-none overflow-auto border-0 bg-transparent py-5 pl-4 pr-14 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pr-16"
          required
          placeholder={placeholder}
          value={input}
          ref={textAreaRef}
          rows={1}
          onKeyDown={(e) => {
            if (ALLOW_SUBMIT_ON_ENTER && e.key === "Enter") {
              handleSubmit(input)
              setInput("")
            }
          }}
          onChange={(e) => {
            setInput(e.target.value)
          }}
        />
        <Button
          type="submit"
          disabled={input.length < 2}
          className="absolute bottom-3 right-3 rounded-md px-2 py-2 text-white shadow-none transition-colors hover:text-green-500 disabled:bg-transparent  disabled:text-gray-400 dark:bg-slate-200 dark:text-black dark:hover:bg-gray-900"
          onClick={() => {
            handleSubmit(input)
            setInput("")
          }}
        >
          {isLoading ? <Spinner /> : <IoSend className="h-4 w-4 md:h-5 md:w-5" />}
        </Button>
      </div>
    </div>
  )
}
