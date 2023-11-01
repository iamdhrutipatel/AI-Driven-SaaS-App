import os
from typing import List
import openai
import argparse
import re

MAX_INPUT_LENGTH = 12
# Main Function For Entry Point
def main():
    print("Running Copy Kitt")
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    if validate_length(user_input):
        brand = branding_snippet(user_input)
        keywords = generate_keywords(user_input)
        # logo = branding_logo(user_input)
        print(brand)
        print(keywords)
        # print(logo)
    else:
        raise ValueError(f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submiteed input is {user_input}.")


def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH

def generate_keywords(prompt: str) -> List[str]:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    prompt_engineering = f"Think about the core qualities, emotions, and values associated with the {prompt}. Consider its unique characteristics, what sets it apart, and how it connects with its target audience. Now, list down related branding keywords that capture the essence of the {prompt} and can be impactful for branding purposes."
    response = openai.Completion.create(
      model="gpt-3.5-turbo-instruct",
      prompt=prompt_engineering,
      max_tokens=32
    )

    # Extracting the response generated and modifying
    keywords_text: str = response["choices"][0]["text"]
    keywords_text = keywords_text.strip()
    keywords_array = re.split(",|\n|;|-", keywords_text)
    keywords_array = [item.split('. ', 1)[1] if '. ' in item else item for item in keywords_array]
    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]
    
    return keywords_array

def branding_snippet(prompt: str) -> str:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    prompt_engineering = f"Craft a concise and captivating branding snippet that embodies the essence of {prompt}. This snippet should resonate with the target audience, highlight the unique aspects of {prompt}, and be memorable enough to leave a lasting impression. Remember, brevity is key, and every word should have a purpose."
    response = openai.Completion.create(
      model="gpt-3.5-turbo-instruct",
      prompt=prompt_engineering,
      max_tokens=35
    )

    # Extracting the response generated and modifying
    branding_text = response["choices"][0]["text"]
    branding_text = branding_text.strip()
    last_char = branding_text[-1]

    if last_char not in {".", ",", "?"}:
        branding_text += "..."
    
    return branding_text

# def branding_logo(prompt: str) -> list:
#     openai.api_key = os.getenv("OPENAI_API_KEY")

#     prompt_engineering = f"Design a branding logo for a {prompt}. Create an iconic logo that conveys the essence of the {prompt}, its unique qualities, and the emotions it should evoke. Keep in mind that the logo should be memorable and instantly recognizable."
#     response = openai.Image.create(
#         prompt=prompt_engineering,
#         n=2,
#         size="1024x1024"
#     )

#     # Initialize a list to store the URLs
#     logo_urls = []

#     # Assuming the response structure is as you provided
#     if "data" in response and len(response["data"]) > 0:
#         for data in response["data"]:
#             if "url" in data:
#                 logo_urls.append(data["url"])

#     return logo_urls

if __name__ == "__main__":
    main()