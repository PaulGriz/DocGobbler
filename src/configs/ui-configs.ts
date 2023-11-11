import { ChatGPTMessage } from "@/types"

// =======================
// Used in Navbar
// =======================
export const projectTitle: { short: string; long: string } = {
  short: "DocGobbler", // For small screen sizes
  long: "DocGobbler - AI Chatbot",
}

// =======================
// Used in chat-window
// =======================
export const INITIAL_MESSAGE: ChatGPTMessage[] = [
  {
    role: "assistant",
    content:
      "Hello! I'm DocGobbler. Here to gobble up all of your docs! \n\nYou can feed me anything. Right now, I'm trained on Turkey Facts. \n\n**For example:**\n - Where do turkeys nest? \n - What is the average life span of a wild turkey? \n - How long is a turkey wingspan? \n - Can turkeys fly?",
  },
]

export let INPUT_PLACEHOLDER: string = "Type your message here..."

export const API_ENDPOINT: string = "/api/chat"

// =======================
// Used in chat-message
// =======================

export const AI_TITLE_COLOR: string = "text-amber-500 dark:text-amber-200"
export const USER_TITLE_COLOR: string = "text-blue-500 dark:text-blue-200"

export const AI_TITLE_NAME: string = "AI"
export const USER_TITLE_NAME: string = "You"

// =======================
// Used in input-box
// =======================

export const ALLOW_SUBMIT_ON_ENTER: boolean = true

// =======================
// Used in footer
// =======================

export const FOOTER_TEXT: string = "Built by Paul Griz"
