// =============== IMPORTS ===============
import fs from "fs"
import path from "path"
import { ProgressBar } from "@opentf/cli-pbar"
// =============== Langchain ===============
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { DirectoryLoader } from "langchain/document_loaders/fs/directory"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { TextLoader } from "langchain/document_loaders/fs/text"
// =============== Pinecone ===============
import { PineconeStore } from "langchain/vectorstores/pinecone"
import { GetPineconeClient } from "@/lib/pinecone/pinecone-client"
// =============== CONFIGS ===============
import { env } from "@/configs/env"
import { CHUNK_SIZE, CHUNK_OVERLAP } from "@/configs/ai-configs"

const filePath = env.PDF_PATH ?? "./public/docs/"

const pBar = new ProgressBar()

async function ChunkDocsFromFiles() {
  try {
    fs.readdirSync(filePath).forEach((file) => {
      // Remove any .DS_Store files from the directory
      if (file === ".DS_Store") {
        fs.unlinkSync(path.join(filePath, file))
      }
      // Can remove more files here if needed...
    })
    const directoryLoader = new DirectoryLoader(filePath, {
      ".pdf": (path) => new PDFLoader(path),
      ".md": (path) => new TextLoader(path),
      ".txt": (path) => new TextLoader(path),
    })
    const rawDocs = await directoryLoader.load()

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: CHUNK_SIZE,
      chunkOverlap: CHUNK_OVERLAP,
    })

    const chunkedDocs = await textSplitter.splitDocuments(rawDocs)

    return chunkedDocs
  } catch (e) {
    console.error(e)
    throw new Error("Failed to chunk your documents. Please try again.")
  }
}

export async function RunIngest() {
  try {
    pBar.start({ total: 100 })

    // 1.) Initialize Pinecone Client
    const pineconeClient = await GetPineconeClient()

    pBar.update({ value: 10, suffix: "Preparing chucks for upload...\n" })

    // 2.) Chunk Docs
    const docs = await ChunkDocsFromFiles()

    // 3.) Embed Docs and Upload to Pinecone
    const embeddings = new OpenAIEmbeddings()
    const index = pineconeClient.Index(env.PINECONE_INDEX_NAME)

    pBar.update({ value: 50, suffix: `Loading ${docs.length} chunks into pinecone...` })

    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      textKey: "text",
    })

    pBar.update({ value: 100, suffix: "Successfully loaded docs into pinecone!" })
    pBar.stop()
  } catch (error) {
    console.error("Error: Ingest Docs Script Failed \n", error)
    throw new Error("Failed to ingest your data")
  }
}

// For my Python friends:
// if __name__ == "__main__":
;(async () => {
  await RunIngest()
  console.log("Successfully loaded docs into pinecone!")
})()
