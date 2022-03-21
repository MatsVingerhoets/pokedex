import { Task } from "../lib/tasker"
import { join } from "path"
import downloadJson from "src/utils/downloadJson"
import downloadImage from "src/utils/downloadImage"
import { PrismaClient } from "@prisma/client"
import { withDbConnection } from "src/lib/database/utils"
const env = process.env

// eslint-disable-next-line @typescript-eslint/naming-convention
const DOMAIN = "https://api.pokemontcg.io/v2"
// eslint-disable-next-line @typescript-eslint/naming-convention
const BASE_PATH = join(__dirname, "../../assets")

type SetList = {
  data: Set[]
}

type CardList = {
  data: Card[]
}
type Set = {
  id: string
  name: string
}
type Card = {
  id: string
  name: string
  set: { id: string; name: string }
  images: {
    small: string
    large: string
  }
}

const task = new Task({
  name: "Fetch Cards",
  description: "Fetches cards from pokemon api",
  task: withDbConnection(fetchData),
}).create()

async function fetchData(db: PrismaClient): Promise<void> {
  const setId = env.SET_ID
  const set = await db.pokemonSetList.findFirst({ where: { setId } })
  if (set) {
    console.log("set already added")
    return
  }
  await fetchCards(setId)
  const { data } = await downloadJson<SetList>({
    url: `${DOMAIN}/sets?q=id:${setId}`,
    filePath: `${BASE_PATH}/public/sets/sets.json`,
  })
  const { name, id } = data[0]
  await db.pokemonSetList.create({
    data: {
      name,
      setId: id,
    },
  })
}

async function fetchCards(setId: string): Promise<void> {
  const { data } = await downloadJson<CardList>({
    url: `${DOMAIN}/cards?q=set.id:${setId}`,
    filePath: `${BASE_PATH}/public/cards/${setId}.json`,
  })
  await fetchImages(data)
}

async function fetchImages(cards: Card[]): Promise<void> {
  for (const {
    images: { small },
    set: { id: setName },
    id,
  } of cards) {
    if (small) {
      await downloadImage({
        url: `${small}`,
        folderPath: `${BASE_PATH}/public/images/${setName}`,
        fileName: `/${id}`,
      })
    }
  }
}

export default task
