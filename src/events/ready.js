import { request } from '../utils.js'

export default async function({ commands, startTime }, { user }) {
  console.log(`Starting in ${Date.now() - startTime}ms`)

  commands.forEach((command) => request(
    'GET',
    `/applications/${user.id}/commands`,
    command
  ))
}
