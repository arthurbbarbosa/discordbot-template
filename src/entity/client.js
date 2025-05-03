import { readdirSync } from 'node:fs'
import { createRequire } from 'node:module'

import { Gateway } from './gateway.js'

const require = createRequire(import.meta.url)

export class Client extends Gateway {
  constructor({ token, intents }) {
    super(token, intents)

    this.startTime = Date.now()

    readdirSync('./src/events').forEach((path) =>
      this.on(path.split('.')[0], (payload) =>
        require(`../events/${path}`).default(this, payload)
      )
    )
  }

  get commands() {
    return readdirSync('./src/commands').map(
      (path) => require(`../commands/${path}`).commandOptions
    )
  }
}
