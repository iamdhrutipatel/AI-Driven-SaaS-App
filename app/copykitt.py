import os
from typing import List
import openai
import argparse
import re

MAX_INPUT_LENGTH = 20
# Main Function For Entry Point
def main():
    print("Running Copy Kitt")
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input

    if validate_length(user_input):
        brand = branding_snippet(user_input)
        brand_name = branding_name(user_input)
        keywords = generate_keywords(user_input)
        print(brand)
        print(brand_name)
        print(keywords)
    else:
        raise ValueError(f"Input length is too long. Must be under {MAX_INPUT_LENGTH}. Submiteed input is {user_input}.")


def validate_length(prompt: str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGTH

def generate_keywords(prompt: str) -> List[str]:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    prompt_engineering = f"Generate a list of relevant keywords that align with our brand's identity and relate to the prompt: {prompt}. These keywords should encompass the core themes, products, or services associated with our brand and be suitable for search engine optimization and online marketing efforts."
    response = openai.Completion.create(
      model="gpt-3.5-turbo-instruct",
      prompt=prompt_engineering,
      max_tokens=40
    )

    # Extracting the response generated and modifying
    keywords_text: str = response["choices"][0]["text"]
    keywords_text = keywords_text.strip()
    keywords_array = re.split(",|\n|;|-", keywords_text)
    keywords_array = [item.split('. ', 1)[1] if '. ' in item else item for item in keywords_array]
    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]
    
    return keywords_array

def branding_name(prompt: str) -> List[str]:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    prompt_engineering = f"Generate a list of unique and memorable branding name for {prompt}. The branding name should encapsulate the essence of the brand, be easy to pronounce and remember, and should resonate with our target audience."
    response = openai.Completion.create(
      model="gpt-3.5-turbo-instruct",
      prompt=prompt_engineering,
      max_tokens=40
    )

    # Extracting the response generated and modifying
    name_text: str = response["choices"][0]["text"]
    name_text = name_text.strip()
    name_array = re.split(",|\n|;|-", name_text)
    name_array = [item.split('. ', 1)[1] if '. ' in item else item for item in name_array]
    name_array = [k.lower().strip() for k in name_array]
    name_array = [k for k in name_array if len(k) > 0]
    
    return name_array

def branding_snippet(prompt: str) -> str:
    # Load your API key from an environment variable or secret management service
    openai.api_key = os.getenv("OPENAI_API_KEY")

    prompt_engineering = f"Create a compelling branding snippet that encapsulates the essence of our brand based on the following prompt: {prompt}. The branding snippet should be engaging, concise, and memorable, representing our brand's unique value proposition."
    response = openai.Completion.create(
      model="gpt-3.5-turbo-instruct",
      prompt=prompt_engineering,
      max_tokens=34
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