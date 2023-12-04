from fastapi import FastAPI, HTTPException
from helpers import CustomError, validate_prompt
from brandguru import branding_snippet, branding_name, generate_keywords

app = FastAPI()

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
        validate_prompt(prompt)
    except CustomError as custom_error:
        raise custom_error
    
    try:
        snippet = await branding_snippet(prompt)
        names = await branding_name(prompt)
        keywords = await generate_keywords(prompt)
    except SpecificException as specific_error:
        raise CustomError(status_code=400, detail=f"Error in processing input: {str(specific_error)}")
    except Exception as error:
        raise CustomError(status_code=500, detail="Internal Server Error!")

    return {"snippet": snippet, "names": names, "keywords": keywords}