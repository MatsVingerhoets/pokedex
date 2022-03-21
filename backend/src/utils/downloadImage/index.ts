import axios from "axios"
import { createWriteStream, mkdirSync, existsSync } from "fs"
import { Stream } from "stream"

type Data = {
  url: string
  fileName: string
  folderPath: string
}
export default async function downloadImage(data: Data): Promise<void> {
  const { url, fileName, folderPath } = data
  if (!existsSync(folderPath)) {
    mkdirSync(folderPath)
  }
  const writer = createWriteStream(folderPath + fileName)
  const { data: body } = await axios.get<Stream>(url, { responseType: "stream" })

  body.pipe(writer)
  return await new Promise((resolve, reject) => {
    writer.on("finish", resolve)
    writer.on("error", reject)
  })
}
