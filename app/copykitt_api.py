from typing import Union
from copykitt import generate_branding_snippet, generate_keywords
from fastapi import FastAPI, HTTPException
from mangum import Mangum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
handler = Mangum(app)
MAX_INPUT_LENGHT = 50

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/generate_snippet")
async def generate_snippet_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    return {"snippet": f"{snippet}", "keyword": []}


@app.get("/generate_keywords")
async def generate_keywords_api(prompt: str):
    validate_input_length(prompt)
    keyword = generate_keywords(prompt)
    return {"snippet": None, "keyword": f"{keyword}"}


@app.get("/generate_snippet_and_keywords")
async def generate_snippet_and_keywords_api(prompt: str):
    validate_input_length(prompt)
    snippet = generate_branding_snippet(prompt)
    keyword = generate_keywords(prompt)
    return {"snippet": snippet, "keyword": keyword}


def validate_input_length(prompt: str):
    if len(prompt) >= MAX_INPUT_LENGHT:
        raise HTTPException(
            status_code=400,
            detail= f"Input lengh is too long. Must be under {MAX_INPUT_LENGHT} characters.",
        )
    pass


# @app.get("/items/{item_id}")
# async def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}


# fastapi dev copykitt_api.py
