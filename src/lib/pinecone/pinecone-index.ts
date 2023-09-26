import { env } from "@/configs/env"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { PineconeStore } from "langchain/vectorstores/pinecone"
import { PineconeClient } from "@pinecone-database/pinecone"

// Grab all Vectors from Pinecone Index
export async function GetPineconeIndex(client: PineconeClient) {
  try {
    const embeddings = new OpenAIEmbeddings()
    const index = client.Index(env.PINECONE_INDEX_NAME)

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      textKey: "text",
    })

    return vectorStore
  } catch (error) {
    console.log("Error: ", error)
    throw new Error(
      `Error: Something went wrong while retrieving your Pinecone Index Named: ${env.PINECONE_INDEX_NAME}.`
    )
  }
}
