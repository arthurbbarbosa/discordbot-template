import { request as httpsRequest } from 'node:https'

export const request = (method, path, body = '') => {
  return new Promise((resolve) => {
    const req = httpsRequest(
      {
        method,
        host: 'discord.com',
        path: `/api/v10${path}`,
        headers: {
          Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
          'Content-Type': 'application/json'
        }
      },
      (res) => res.on('data', (chunk) => resolve(JSON.parse(chunk)))
    )

    req.write(JSON.stringify(body))
    req.end()
  })
}
