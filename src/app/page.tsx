import ChatWindow from "@/components/chat-window"

export default function Home() {
  return (
    <main className="mx-auto w-full px-4">
      <section className="flex w-full py-4">
        <div className="w-full">
          <ChatWindow />
        </div>
      </section>
    </main>
  )
}
