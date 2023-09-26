import { env } from "@/configs/env"
import { PineconeClient } from "@pinecone-database/pinecone"

let pineconeClient: PineconeClient | null = null

export async function GetPineconeClient() {
  if (!pineconeClient) {
    pineconeClient = await CreateNewPineconeClient()
  }

  return pineconeClient
}

async function CreateNewPineconeClient() {
  try {
    const pineconeClient = new PineconeClient()
    await pineconeClient.init({
      apiKey: env.PINECONE_API_KEY,
      environment: env.PINECONE_ENVIRONMENT,
    })

    return pineconeClient
  } catch (error) {
    console.error("error", error)
    throw new Error(`Failed to initialize Pinecone Client. Please check your .env file.`)
  }
}
