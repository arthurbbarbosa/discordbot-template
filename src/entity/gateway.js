import { platform } from 'node:os'
import Websocket from 'ws'

export class Gateway extends Websocket {
  #token
  #intents

  constructor(token, intents) {
    super('wss://gateway.discord.gg/?v=10&encoding=json')

    this.#token = token
    this.#intents = intents
  }

  load() {
    this.on('open', () =>
      this.send(
        JSON.stringify({
          op: 2,
          d: {
            token: this.#token,
            intents: this.#intents,
            properties: { $os: platform() }
          }
        })
      )
    )

    this.on('message', (data) => {
      const { d, t, op } = JSON.parse(data.toString())

      switch (op) {
        case 10: {
          setInterval(
            () => this.send(JSON.stringify({ op: 1, d: null })),
            d.heartbeat_interval
          )
          break
        }
        case 0: {
          this.emit(t.toLowerCase(), d)
          break
        }
      }
    })

    return this
  }
}
