export interface ChatGPTMessage {
  role: "user" | "system" | "assistant"
  content: string
  sources?: string[]
}
