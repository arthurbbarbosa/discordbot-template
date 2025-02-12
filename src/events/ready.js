import { discord_uri } from '../utils/endpoints.js'
import { request } from '../utils/request.js'

/**
 * Ready Discord Event
 * @param {import('../infra/client.js').Client} client 
 * @param {Object} param1 
 * @returns {Promise<void>}
 */
export const ready = (client, { user }) => {
  client.commands.forEach((command) => request(
    'POST',
    discord_uri,
    `/applications/${user.id}/commands`,
    command
  ))
}
