/**
 *
 * @param {import('../infra/client.js').Client} client
 * @param {Object} interaction
 * @returns {Promise<void>}
 */
export const interaction_create = async(client, interaction) => {
  const command = client.commands.find(({ name }) => name === interaction.data.name)

  if (command) {
    const {
      [ `${command.name}_command` ]: command_function
    } = await import(`../commands/${command.name}.js`)

    command_function(client,interaction)
  }
}
