import os
from typing import List, Awaitable
import openai
import argparse
import re
import asyncio
from fastapi import HTTPException

MAX_INPUT_LENGTH = 30

def validate_input_length(prompt: str):
    print(len(prompt))
    if len(prompt) >= MAX_INPUT_LENGTH:
        return False
    return True

openai.api_key = os.getenv("OPENAI_API_KEY")

async def api_end_point(prompt_engineering: str, max_tokens: int) -> dict:
    response = openai.Completion.create(
        model="gpt-3.5-turbo-instruct",
        prompt=prompt_engineering,
        max_tokens=max_tokens,
    )
    return response


async def branding_snippet(prompt: str) -> str:
    prompt_engineering = f"Create a compelling branding snippet that encapsulates the essence of our brand based on the following prompt: {prompt}. The branding snippet should be engaging, concise, and memorable, representing our brand's unique value proposition."
    response = await api_end_point(prompt_engineering, max_tokens=34)

    branding_text = response["choices"][0]["text"]
    branding_text = branding_text.strip()
    last_char = branding_text[-1]

    if last_char not in {".", ",", "?"}:
        branding_text += "..."

    return branding_text


async def branding_name(prompt: str) -> List[str]:
    prompt_engineering = f"Generate a list of unique and memorable branding name for {prompt}. The branding name should encapsulate the essence of the brand, be easy to pronounce and remember, and should resonate with our target audience."
    response = await api_end_point(prompt_engineering, max_tokens=36)

    name_text: str = response["choices"][0]["text"]
    name_text = name_text.strip()
    name_array = re.split(",|\n|;|-", name_text)
    name_array = [
        item.split(". ", 1)[1] if ". " in item else item for item in name_array
    ]
    name_array = [k.lower().strip() for k in name_array]
    name_array = [k for k in name_array if len(k) > 0]

    return name_array


async def generate_keywords(prompt: str) -> List[str]:
    prompt_engineering = f"Generate a list of relevant keywords that align with our brand's identity and relate to the prompt: {prompt}. These keywords should encompass the core themes, products, or services associated with our brand and be suitable for search engine optimization and online marketing efforts."
    response = await api_end_point(prompt_engineering, max_tokens=36)

    keywords_text: str = response["choices"][0]["text"]
    keywords_text = keywords_text.strip()
    keywords_array = re.split(",|\n|;|-", keywords_text)
    keywords_array = [
        item.split(". ", 1)[1] if ". " in item else item for item in keywords_array
    ]
    keywords_array = [k.lower().strip() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]

    return keywords_array


# def branding_logo(prompt: str) -> list:
#     prompt_engineering = f"Design a branding logo for a {prompt}. Create an iconic logo that conveys the essence of the {prompt}, its unique qualities, and the emotions it should evoke. Keep in mind that the logo should be memorable and instantly recognizable."
#     response = openai.Image.create(
#         prompt=prompt_engineering,
#         n=2,
#         size="1024x1024"
#     )

#     logo_urls = []

#     if "data" in response and len(response["data"]) > 0:
#         for data in response["data"]:
#             if "url" in data:
#                 logo_urls.append(data["url"])

#     return logo_urls


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input
    print(user_input)

    if validate_input_length(user_input):
        await branding_snippet(user_input)
        await branding_name(user_input)
        await generate_keywords(user_input)
    else:
        raise HTTPException(
            status_code=400,
            detail="Input length is too long. Must be under {MAX_INPUT_LENGTH} charcters.",
        )

if __name__ == "__main__":
    asyncio.run(main())
