// From LangChain Examples: https://github.com/langchain-ai/langchainjs/tree/main/examples
export const formatChatHistory = (chatHistory: [string, string][]) => {
  const formattedDialogueTurns = chatHistory.map(
    (dialogueTurn) => `Human: ${dialogueTurn[0]}\nAssistant: ${dialogueTurn[1]}`
  )
  return formattedDialogueTurns.join("\n")
}
