import os
import openai

# Load your API key from an environment variable or secret management service
openai.api_key = os.getenv("OPENAI_API_KEY")

subject = "coffee"
prompt = f"Generate upbeat branding snippet for {subject}"
response = openai.Completion.create(
  model="gpt-3.5-turbo-instruct",
  prompt=prompt,
  max_tokens=32
)

print(response)