import gpt4all

import os
import discord
from dotenv import load_dotenv


load_dotenv()
gpt_model = gpt4all.GPT4All("GPT4All-13B-snoozy.ggmlv3.q4_0.bin")


intents = discord.Intents.default()
intents.message_content = True
client = discord.Client(intents=intents)


@client.event
async def on_ready():
    print('bot ready!')

@client.event
async def on_message(message):
    if message.author == client.user:
        return
       
    response = gpt_model.chat_completion([{"role": "user", "content": str(message.content)}])
    await message.channel.send(response['choices'][0]['message']['content'])

client.run('token')
