# Discord Bot Template

This project consists of a lightweight, optimized discord bot using nodejs and the discord api.
**Furthermore, the bot starts in 15µs (0.015ms)**

> [!CAUTION]
> This template is only recommended for those who are familiar with the discord api, so if you are new to programming, or don't know the discord api, I suggest you choose another template.

Technologies used:

- NodeJS ([Install Here](https://nodejs.org))
- NPM or Yarn ([Install NPM Here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) or [Install Yarn Here](https://classic.yarnpkg.com/lang/en/docs/install))

Here's a step-by-step guide on how to use the bot:

1. Replace the environment variables in `.env`
   ```
   DISCORD_TOKEN=<YOUR_DISCORD_TOKEN>
   DISCORD_INTENTS=<INTENTS_THAT_YOU'LL_NEED>
   ```
   _If you need help to discover what intents you'll need, you can use: [Discord Intents Calculator](https://discord-intents-calculator.vercel.app)_
2. Turn on the discord bot
   ```
   $ if you are using npm: npm install
   $ if you are using yarn: yarn install
   $ node .
   ```
