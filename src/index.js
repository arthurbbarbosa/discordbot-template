import 'dotenv/config'
import { Client } from './entity/client.js'

const client = new Client({
  token: process.env.DISCORD_TOKEN,
  intents: process.env.DISCORD_INTENTS
})

client.load()
