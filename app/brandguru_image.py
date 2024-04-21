from typing import List
import openai
import argparse
import os
import asyncio
import sys
from helpers import CustomError

openai.api_key = os.getenv("OPENAI_API_KEY")


async def api_end_point_image(prompt_engineering: str) -> dict:
    try:
        response = openai.Image.create(
            model="dall-e-3", prompt=prompt_engineering, n=1, size="1024x1024"
        )
        return response
    except openai.error.APIError as error:
        status_code = getattr(error, "status_code", 500)
        raise CustomError(
            status_code=status_code, detail=f"OpenAI API Error: {str(error)}"
        )
    except openai.error.APIConnectionError as error:
        status_code = getattr(error, "status_code", 500)
        raise CustomError(
            status_code=status_code,
            detail=f"Failed to connect to OpenAI API: {str(error)}",
        )
    except openai.error.RateLimitError as error:
        status_code = getattr(error, "status_code", 500)
        raise CustomError(
            status_code=status_code,
            detail=f"OpenAI API request exceeded rate limit: {str(error)}",
        )


async def generate_image(
    brand_name: str,
    brand_identity: str,
    design_qualities: str,
    brand_values: str,
    additional_descriptors: str,
    style_qualities: str,
    color_preferences: str,
    theme_description: str,
) -> List[str]:
    try:
        prompt_engineering = f"Create a single brand logo for '{brand_name}', a brand that symbolizes {brand_identity}. The logo should emphasize {design_qualities}, reflecting the brand's commitment to {brand_values}. Design the brand logo to be {additional_descriptors}, featuring the brand name '{brand_name}' in a style that is both {style_qualities}. Use a color palette that is {color_preferences}, aligning with a {theme_description} theme. The brand logo must focus solely on the brand name without any additional text or graphic elements. Ensure the text '{brand_name}' is displayed accurately, without any spelling errors, making it ready for immediate use on a website, Instagram, or other media."
        response = await api_end_point_image(prompt_engineering)
        url = response["data"][0]["url"]
        return url
    except CustomError as custom_error:
        raise custom_error


async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--brand", "-b", type=str, required=True, help="Brand name")
    parser.add_argument(
        "--identity", "-i", type=str, required=True, help="Brand identity"
    )
    parser.add_argument(
        "--qualities", "-q", type=str, required=True, help="Design qualities"
    )
    parser.add_argument("--values", "-v", type=str, required=True, help="Brand values")
    parser.add_argument(
        "--descriptors", "-d", type=str, required=True, help="Additional descriptors"
    )
    parser.add_argument(
        "--style", "-s", type=str, required=True, help="Style qualities"
    )
    parser.add_argument(
        "--colors", "-c", type=str, required=True, help="Color preferences"
    )
    parser.add_argument(
        "--theme", "-t", type=str, required=True, help="Theme description"
    )
    args = parser.parse_args()

    if len(sys.argv) != 17:
        parser.print_help(sys.stderr)
        sys.exit(1)

    brand_name = args.brand
    brand_identity = args.identity
    design_qualities = args.qualities
    brand_values = args.values
    additional_descriptors = args.descriptors
    style_qualities = args.style
    color_preferences = args.colors
    theme_description = args.theme

    try:
        # image = await generate_image("Evergreen", "eco-friendly home products", "elegance and modernity", "environmental sustainability", "sophisticated and impactful", "contemporary and minimalist", "earth tones", "natural")
        image = await generate_image(
            brand_name,
            brand_identity,
            design_qualities,
            brand_values,
            additional_descriptors,
            style_qualities,
            color_preferences,
            theme_description,
        )
        print(image)
    except CustomError as custom_error:
        raise custom_error


if __name__ == "__main__":
    asyncio.run(main())
