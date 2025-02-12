import { request as http_request } from 'node:https'

/**
 * Make a Request
 * @param {'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'} method
 * @param {string} host
 * @param {string} path
 * @param {string | Object} [data='']
 * @returns {Promise<Object>}
 */
export function request(method, host, path, data = '') {
  return new Promise((resolve) => {
    const req = http_request(
      {
        method,
        host,
        path: `/api/v10${path}`,
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          'Content-Type': 'application/json'
        }
      },
      (response) => response.on('data', (chunk) => resolve(JSON.parse(chunk)))
    )

    req.write(JSON.stringify(data))
    req.end()
  })
}
