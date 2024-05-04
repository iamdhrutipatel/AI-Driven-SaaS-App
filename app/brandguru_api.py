from fastapi import FastAPI
from helpers import CustomError, validate_prompt
from brandguru import (
    branding_snippet,
    generate_tagline,
    branding_name,
    generate_keywords,
)
from brandguru_image import generate_image
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

handler = Mangum(app)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/branding_snippet")
async def branding_snippet_api(prompt: str):
    snippet = await branding_snippet(prompt)
    return snippet


@app.get("/branding_name")
async def branding_name_api(prompt: str):
    names = await branding_name(prompt)
    return names


@app.get("/generate_keyword")
async def generate_keywords_api(prompt: str):
    keywords = await generate_keywords(prompt)
    return keywords


@app.get("/generate_all_together")
async def generate_all_together_api(prompt: str):
    try:
        prompt = validate_prompt(prompt, field_name="Prompt")
    except CustomError as custom_error:
        raise custom_error

    try:
        snippet = await branding_snippet_api(prompt)
        tagline = await generate_tagline(prompt)
        names = await branding_name_api(prompt)
        keywords = await generate_keywords_api(prompt)
    except Exception as error:
        status_code = getattr(error, "status_code", 500)
        raise CustomError(status_code=status_code, detail="Internal Server Error!")

    return {
        "snippet": snippet,
        "tagline": tagline,
        "names": names,
        "keywords": keywords,
    }


@app.get("/generate_image")
async def generate_brand_logo_image_api(
    brand_name: str,
    brand_identity: str,
    design_qualities: str,
    brand_values: str,
    additional_descriptors: str,
    style_qualities: str,
    color_preferences: str,
    theme_description: str,
):
    try:
        brand_name = validate_prompt(brand_name, field_name="Brand Name")
        brand_identity = validate_prompt(brand_identity, field_name="Brand Identity")
        design_qualities = validate_prompt(
            design_qualities, field_name="Design Qualities"
        )
        brand_values = validate_prompt(brand_values, field_name="Brand Values")
        additional_descriptors = validate_prompt(
            additional_descriptors, field_name="Additional Descriptors"
        )
        style_qualities = validate_prompt(style_qualities, field_name="Style Qualities")
        color_preferences = validate_prompt(
            color_preferences, field_name="Color Preferences"
        )
        theme_description = validate_prompt(
            theme_description, field_name="Theme Description"
        )
    except CustomError as custom_error:
        raise custom_error

    try:
        url = await generate_image(
            brand_name,
            brand_identity,
            design_qualities,
            brand_values,
            additional_descriptors,
            style_qualities,
            color_preferences,
            theme_description,
        )
    except Exception as error:
        status_code = getattr(error, "status_code", 500)
        raise CustomError(status_code=status_code, detail="Internal Server Error!")

    return {"url": url}
