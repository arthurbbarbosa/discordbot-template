import { createRequire } from 'node:module'

export default async function(client, interaction) {
  const command = client.commands.find(({ name }) => name === interaction.data.name)

  command && createRequire(import.meta.url)(`../commands/${command.name}.js`)
    .commandHandler(client, interaction)
}
