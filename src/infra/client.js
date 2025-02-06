import { EventEmitter } from 'node:events'
import { readdirSync } from 'node:fs'
import { platform } from 'node:os'
import { WebSocket } from 'ws'

import { discord_gateway, version } from '../utils/endpoints.js'

/**
 * Discord Client
 * @constructor
 * @extends {EventEmitter}
 */
export class Client extends EventEmitter {
  constructor() {
    super()

    /** @type {WebSocket} */
    this.ws = new WebSocket(`${discord_gateway}/?v=${version}&encoding=json`)
    /** @type {{ type: number, name: string, description: string, options: any[] }[]} */
    this.commands = []
  }

  /**
   * Starts the Websocket
   * @returns {void}
   */
  #load_socket() {
    this.ws.on('open', () => this.ws.send(
      JSON.stringify({
        op: 2,
        d: {
          token: process.env.DISCORD_TOKEN,
          intents: process.env.INTENTS,
          properties: { $os: platform() }
        }
      })
    ))

    this.ws.on('message', (data) => {
      const payload = JSON.parse(data.toString())

      if (payload.op === 10)
        setInterval(() => this.ws.send(JSON.stringify({ op: 1, d: null })), payload.d.heartbeat_interval)
      else if (payload.op === 0)
        this.emit(payload.t.toLowerCase(), payload.d)
    })
  }

  /**
   * Starts the bot and the websocket as well as loads commands and events
   * @returns {Promise<void>}
   */
  async load() {
    this.#load_socket()

    this.commands = await Promise.all(
      readdirSync('./src/commands').forEach((file) =>
        import(`../commands/${file}`).then((command) =>
          command[`${file.split('.')[0]}_options`]
        )
      )
    )

    readdirSync('./src/events').forEach((file) =>
      import(`../events/${file}`).then((event) => {
        const [ event_name ] = file.split('.')
        this.on(event_name, (payload) => event[event_name](this, payload))
      })
    )
  }
}
