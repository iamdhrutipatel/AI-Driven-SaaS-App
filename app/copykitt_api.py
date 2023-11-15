from fastapi import FastAPI, HTTPException
from copykitt import branding_snippet, branding_name, generate_keywords

app = FastAPI()

MAX_INPUT_LENGTH = 30

@app.get("/branding_snippet")
async def branding_snippet_api(prompt: str):
    # validate_input_length(prompt)
    snippet = await branding_snippet(prompt)
    return {"snippet": snippet}

@app.get("/branding_name")
async def branding_name_api(prompt: str):
    # validate_input_length(prompt)
    names = await branding_name(prompt)
    return {"names": names}


@app.get("/generate_keyword")
async def generate_keywords_api(prompt: str):
    # validate_input_length(prompt)
    keywords = await generate_keywords(prompt)
    return {"keywords": keywords}

@app.get("/generate_all_together_api")
async def generate_all_together_api(prompt: str):
    # validate_input_length(prompt)
    try: 
        snippet = await branding_snippet(prompt)
        names = await branding_name(prompt)
        keywords = await generate_keywords(prompt)
        return {"snippet": snippet, "names": names, "keywords": keywords}
    except HTTPException as error:
        return error


# def validate_input_length(prompt: str):
#     if len(prompt) >= MAX_INPUT_LENGTH:
#         raise HTTPException(
#             status_code=400,
#             detail="Input length is too long. Must be under {MAX_INPUT_LENGTH} charcters.",
#         )
#     pass
