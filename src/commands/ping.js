import { request } from '../utils.js'

export const commandOptions = {
  type: 1,
  name: 'ping',
  description: 'Ping Pong',
  options: []
}

export const commandHandler = (client, { id, token }) => {
  request('POST', `/interactions/${id}/${token}/callback`, {
    type: 4,
    data: {
      content: 'Pong!'
    }
  })
}
