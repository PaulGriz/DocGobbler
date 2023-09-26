import { NextRequest, NextResponse } from "next/server"
import RunChain from "@/lib/langchain/run-chain"

export const runtime = "edge"

export async function POST(req: NextRequest) {
  const { question, chatHistory } = await req.json()

  if (!question) {
    return NextResponse.json("Error: No question in the request.", {
      status: 400,
    })
  }

  if (!chatHistory) {
    return NextResponse.json("Error: No chatHistory in the request", {
      status: 400,
    })
  }

  try {
    // Docs: https://developer.mozilla.org/en-US/docs/Web/API/TransformStream
    const transformStream = new TransformStream()
    const readableStream = RunChain({
      question,
      chatHistory,
      transformStream,
    })

    return new Response(await readableStream)
  } catch (error) {
    console.error("Internal Server Error: ", error)
    return NextResponse.json("Error: Something went wrong. Please try again.", {
      status: 500,
    })
  }
}
