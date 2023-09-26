// =============== VECTOR STORES ===============
import { GetPineconeIndex } from "@/lib/pinecone/pinecone-index"
import { GetPineconeClient } from "@/lib/pinecone/pinecone-client"
// =============== Utils ===============
import MakeChain from "@/lib/langchain/make-chain"
import { formatChatHistory } from "@/lib/langchain/utils"

export default async function RunChain({
  question,
  chatHistory,
  transformStream,
}: {
  question: string
  chatHistory: [string, string][]
  transformStream: TransformStream
}) {
  try {
    const sanitizedQuestion = question.trim().replaceAll("\n", " ")
    const pineconeClient = await GetPineconeClient()
    const vectorStore = await GetPineconeIndex(pineconeClient)

    const encoder = new TextEncoder()
    const writer = transformStream.writable.getWriter()
    const chain = MakeChain(vectorStore, writer)
    const formattedChatHistory = formatChatHistory(chatHistory)

    chain
      .call({
        question: sanitizedQuestion,
        chat_history: formattedChatHistory,
      })
      .then(async (res) => {
        const sourceDocuments = res?.sourceDocuments

        // Helpful for viewing source document metadata
        if (process.env.SHOW_DEBUG_LOGS === "true") {
          console.log("----------------------")
          console.log("sourceDocuments", sourceDocuments.slice(0, 1))
          console.log("----------------------")
        }

        await writer.ready
        // Used in chat-window to determine when to format sources
        await writer.write(encoder.encode("gpt-generation-complete"))

        setTimeout(async () => {
          await writer.write(encoder.encode(`${JSON.stringify(sourceDocuments)}`))
          await writer.close()
        }, 100)
      })

    return transformStream.readable
  } catch (e) {
    console.error(e)
    throw new Error("RunChain method failed to execute successfully...")
  }
}
