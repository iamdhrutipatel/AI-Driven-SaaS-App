from fastapi import FastAPI, HTTPException
from helpers import CustomError, validate_prompt
from brandguru import branding_snippet, branding_name, generate_keywords
from mangum import Mangum

app = FastAPI()

handler = Mangum(app)

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
        prompt = validate_prompt(prompt)
    except CustomError as custom_error:
        raise custom_error
    
    try:
        snippet = await branding_snippet_api(prompt)
        names = await branding_name_api(prompt)
        keywords = await generate_keywords_api(prompt)
    except Exception as error:
        status_code = getattr(error, "status_code", 500)
        raise CustomError(status_code=status_code, detail="Internal Server Error!")

    return {"snippet": snippet, "names": names, "keywords": keywords}