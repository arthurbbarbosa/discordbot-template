import 'dotenv/config'

import { Client } from './infra/client.js'

const discord_client = new Client()
discord_client.load()
