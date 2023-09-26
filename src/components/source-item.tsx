"use client"

/* 
TODO: 
1.) Need to add Type for Source Metadata that conforms to Langchain 
2.) Need to add support for multiple different metadata file types
*/

function formatText(inputText: string) {
  let formattedText = inputText.replace(/[\n-]/g, " ")
  formattedText = formattedText.replace(/\s+/g, " ")
  return formattedText
}

function formatPDFLink(rawLink: string, pageNumber: string) {
  return rawLink.substring(rawLink.indexOf("/docs/")) + `#page=${pageNumber}`
}

export default function SourceLine(source: any, index: number) {
  const pageContent = source.source.pageContent
  const metaData = source.source.metadata

  let datePublished = new Date(
    metaData["pdf.metadata._metadata.xmp:createdate"]
  ).toLocaleDateString()

  if (datePublished === "Invalid Date" || datePublished === undefined) {
    const dateString = metaData["pdf.info.CreationDate"]
    const year = dateString.substring(2, 6)
    const month = dateString.substring(6, 8)
    const day = dateString.substring(8, 10)
    datePublished = `${month}/${day}/${year}`
  }

  const sourceID = `source-content-${index}`

  const pdfLink = formatPDFLink(metaData.source, metaData["loc.pageNumber"])
  const pdfTitle = metaData["pdf.info.Title"] || "Link to Source File"

  return (
    <div id={sourceID} key={sourceID}>
      <div>
        {/* ================== FILE NAME & LINK ================== */}
        <span className="font-bold">File: </span>
        <a href={pdfLink} target="_blank" className="text-blue-500 dark:text-blue-200">
          {pdfTitle}
        </a>
        {/* ================== DATE PUBLISHED ================== */}
        <p>
          <span className="font-bold">Date Published:</span> {datePublished}
        </p>

        {/* ================== PAGE NUMBERS ================== */}
        <p>
          <span className="font-bold">On Page:</span> {metaData["loc.pageNumber"]} of{" "}
          {metaData["pdf.totalPages"]}
        </p>

        <br />
        {/* ================== CONTEXT TEXT ================== */}
        <p>
          <span className="font-bold">Text:</span>
        </p>
      </div>
      <div className="relative">
        <div className="chat-bubble-text flex list-inside flex-col items-start gap-3 overflow-x-auto break-words">
          {formatText(pageContent)}
        </div>
      </div>
    </div>
  )
}
