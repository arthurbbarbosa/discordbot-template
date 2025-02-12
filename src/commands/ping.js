import { request } from '../utils/request.js'
import { discord_uri } from '../utils/endpoints.js'

export const ping_options = {
  type: 1,
  name: 'ping',
  description: 'Ping Pong',
  options: []
}

/**
 * Ping Example Command Discord Event
 * @param {import('../infra/client.js').Client} _client
 * @param {Object} interaction
 */
export const ping_command = (client, interaction) => {
  request(
    'POST',
    discord_uri,
    `/interactions/${interaction.id}/${interaction.token}/callback`,
    {
      type: 4,
      data: {
        content: 'Pong!'
      }
    }
  )
}
