# DocGobbler - A Customizable Retrieval Chatbot

<p align="center" width="100%">
  <img src="./public/gobblers/gobbler_1.jpg" alt="Mr. Doc Gobbler" width="50%" />
</p>
<p align="center">
  <strong>
    "Mr. Doc Gobbler"
  </strong>
</p>
Welcome to DocGobbler! This project allows you to quickly build out a customizable chatbot trained on your files. Just ingest your documents, edit the `src/configs` files, and deploy to Vercel!

####  Examples:

- Turkey Facts: https://docgobbler.vercel.app/
- Tax Advice from IRS 2022 Publications: TODO ADD LINK



#### Key Features of DocGobbler:

- ✅ Chat with Multiple Documents & File Types 
- ✅ API Streaming
- ✅ View Context Sources & Metadata
- ✅ Easy to Customize the Entire Project via the `src/configs` Folder
- ✅ Light/Dark Mode Theme Switching

Ready to get started building your own document assistant? Check out the code in this repo!



## 📚 Tech Stack

- [Next.js 13](https://nextjs.org/docs)
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Langchain](https://js.langchain.com/docs/get_started/introduction)
- [PineconeDB](https://docs.pinecone.io/docs/overview)
- [Tailwind](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)



## 🪜 API Setup

#### Prerequisites

1. Copy the .env example file: `cp .env.example .env` 
2. Get an OpenAI API Key - [Link](https://openai.com/)
   - Enter as `OPENAI_API_KEY` in .env
3. Make a Pinecone Account (free) - [Link](https://www.pinecone.io/)

#### Pinecone Index Setup:

**Create a new Index:**

- Give it a name
  - Enter as `PINECONE_INDEX_NAME` in .env

- Set Dimensions to exactly `1536` (required for embedding models)
- Set Metric to `cosine`
- Select the free `starter` Pod Type

**On the side panel, Click on "API Keys"**

- Copy the `ENVIRONMENT` location
  - Enter as `PINECONE_ENVIRONMENT`  in .env 
- Reveal and Copy the `Value`
  - Enter as `PINECONE_API_KEY`  in .env 

**In the `.env`**

- Set `PINECONE_NAME_SPACE` as a name to categorize your data in the Pinecone admin pannel

  

## 🖥️ Project Install & Document Ingest

#### 1.) Clone or Fork Repository

```shell
git clone https://github.com/PaulGriz/DocGobbler
```

#### 2.) Install Dependancies

```shell
pnpm install
```

#### 3.) Copy your Documents into the `public/docs` Directory

- Note: The `public/docs` folder is reccomended because it allows Next.js to easily link to sources files. 

#### 4.) Run `pnpm run ingest` to chuck and vectorize docs into Pincone Index

- Note: This can take a few minutes. Do not abort the command!
- You should see `Loading X chunks into pinecone...` where "X" is the number of vectors from your docs.

#### 5.) Go to `src/configs/ai-configs.ts` and edit the QA_TEMPLATE

- The `QA_TEMPLATE` is the "System Prompt" for the AI. Customize it to fit your documents or objective for your own goals.
- The `CONDENSE_TEMPLATE` is not as important, and I'm using the standard prompt from other Langchain projects. 

#### 6.) 🏃‍♂️ Run the Project!

- `pnpm run dev`

  

## 🎨 How to Customize

Use the `src/configs/` folder to make this project your own!

- `ai-configs.ts`: For Langchain prompts

- `ui-configs.ts`: For Project Titles and Inital UI Messages

- `metadata.ts`: For the Next.js App's Metadata 

- `env.ts`: Uses zod to validate env variables. Not needed, just used for basic type/error checking.

  

## 📋 Commands

All commands are run from the root of the project, from a terminal:

| Command       | Action                                                       |
| :------------ | :----------------------------------------------------------- |
| `pnpm i`      | Installs dependencies                                        |
| `pnpm ingest` | Chucks docs in the `public/docs/` folder and uploads vectors to Pinecone |
| `pnpm dev`    | Starts the local development server at `localhost:3000`      |



## 🚸 Roadmap

- [ ] Add more Langchain file loaders
- [ ] Improve metadata typing, error handling, missing data fallbacks
- [ ] Write documentation how to edit and use metadata from different file types in the `public/docs` folder
- [ ] Allow users to upload files directly from the web interface
- [ ] Add an "About" Page
- [ ] Add a "Prompting Tips" Page
- [ ] Add User Authentication & Multiple Chat Histories/Sessions



## 💬 Questions?

- Reach out to me on Twitter: [@PaulGrizII](https://twitter.com/PaulGrizII)
- Submit a PR or Feature Request



## 📓 Learn More

- Langchain Blog on [Similar Project](https://blog.langchain.dev/langchain-chat/)
- [Next.js Docs](https://nextjs.org/docs)
