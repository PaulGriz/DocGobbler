import type { Metadata } from "next"

const siteConfig = {
  name: "DocGobbler",
  description:
    "DocGobbler - Customizable AI Retrieval Chatbot. Powered by Langchain, OpenAI, and Next.js.",
  keywords: [
    "DocGobbler",
    "Next.js",
    "React",
    "Langchain",
    "TypeScript",
    "AI",
    "AI Retrieval",
    "Chat with Your Documents",
    "Vercel",
    "shadcn/ui",
  ],
  authorName: "Paul Griz",
  authorURL: "https://github.com/PaulGriz",
  deploymentURL: `https://irs-pubs.vercel.app`,
  ogImage: {
    file: `/og.png`,
    width: 1200,
    height: 630,
    alt: "IRS AI Publication Search",
  },
  links: {
    twitter: "https://twitter.com/PaulGrizII",
    github: "https://github.com/PaulGriz",
  },
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.deploymentURL),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.authorName,
      url: siteConfig.authorURL,
    },
  ],
  creator: siteConfig.authorName,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.deploymentURL,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage.file,
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
        alt: siteConfig.ogImage.alt,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage.file,
        width: siteConfig.ogImage.width,
        height: siteConfig.ogImage.height,
        alt: siteConfig.ogImage.alt,
      },
    ],
    creator: siteConfig.authorName,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}
