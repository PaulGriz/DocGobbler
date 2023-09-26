// =============== IMPORTS ===============
import { ChatOpenAI } from "langchain/chat_models/openai"
import { PineconeStore } from "langchain/vectorstores/pinecone"
import { ConversationalRetrievalQAChain } from "langchain/chains"
// =============== CONFIGS ===============
import { MODEL_NAME, TEMPERATURE, CONDENSE_TEMPLATE, QA_TEMPLATE } from "@/configs/ai-configs"

export default function MakeChain(vectorstore: PineconeStore, writer: WritableStreamDefaultWriter) {
  const encoder = new TextEncoder()

  const streamingModel = new ChatOpenAI({
    modelName: MODEL_NAME,
    temperature: TEMPERATURE,
    streaming: true,
    verbose: true,
    callbacks: [
      {
        async handleLLMNewToken(token) {
          await writer.ready
          await writer.write(encoder.encode(`${token}`))
        },
        async handleLLMEnd() {
          console.log("Success: LLM Call Complete")
        },
      },
    ],
  })

  // Uses the cheaper/faster gpt-3.5 model to create a condensed question
  // Can reduce unnecessary latency.
  const questionGeneratorModel = new ChatOpenAI({
    modelName: "gpt-3.5-turbo",
    temperature: TEMPERATURE,
    verbose: true,
  })

  // Docs: https://js.langchain.com/docs/modules/chains/popular/chat_vector_db
  const chain = ConversationalRetrievalQAChain.fromLLM(streamingModel, vectorstore.asRetriever(), {
    qaTemplate: QA_TEMPLATE,
    questionGeneratorTemplate: CONDENSE_TEMPLATE,
    returnSourceDocuments: true, //defaults to 4 sources
    questionGeneratorChainOptions: {
      llm: questionGeneratorModel,
    },
  })
  return chain
}
