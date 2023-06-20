import gpt4all

import os
import discord
from dotenv import load_dotenv

load_dotenv()
token = os.getenv('MTEyMDgxMjk0OTk4OTI0NTAxMA.GkFp78.7koYT-_LC425MFNtaBIOtsYJ_NbkfzisAldUqo')
gpt_model = gpt4all.GPT4All("ggml-gpt4all-j-v1.3-groovy")

client = discord.Client()


@client.event
async def on_ready():
    print(f'{gpt_model.chat_completion([{"role": "user", "content": "Name 3 products"}])}')
          
client.run(token)
