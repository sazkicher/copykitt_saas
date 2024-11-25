import argparse
import os
import re
from typing import List
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv(".env") # locally ../.env.dev
MAX_INPUT_LENGHT = 50

def validate_lenght(prompt:str) -> bool:
    return len(prompt) <= MAX_INPUT_LENGHT

def generate_branding_snippet(prompt: str, max_tokens:int= 32) -> str:
    '''
    TODO:
    '''
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    enriched_prompt = f"Generate upbeat branding snippet for {prompt}: "
    print(enriched_prompt)
    print(os.getenv("OPENAI_API_KEY")[0:14])

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": enriched_prompt
            }
        ],
        max_completion_tokens = max_tokens
    )
    # Extract output text.
    branding_text = completion.choices[0].message.content

    # Strip whitespace.
    branding_text = branding_text.replace("\n", "").strip()

    # Add "..." to truncated statements.
    last_char = (branding_text[-1])
    if last_char not in {".", "!", "?"}:
        branding_text += "..."

    print(f"Snippet: {branding_text}")
    return branding_text

def generate_keywords(prompt: str, max_tokens:int= 32) -> List[str]:
    '''
    TODO:
    '''
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    enriched_prompt = f"Generate related branding keywords for {prompt}, return only the keywords and all of them separeted by commas."
    print(enriched_prompt)
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {
                "role": "user",
                "content": enriched_prompt
            }
        ],
        max_completion_tokens = max_tokens
    )
    # Extract output text.
    keywords_text = completion.choices[0].message.content

    # Strip whitespace.
    keywords_text = keywords_text.replace("\n", "").strip()
    keywords_array = re.split(",|\n|;|-", keywords_text)
    keywords_array = [k.strip().lower() for k in keywords_array]
    keywords_array = [k for k in keywords_array if len(k) > 0]

    print(f"Keywords: {keywords_array}")
    return keywords_array

def main():    


    # Parse input
    parser = argparse.ArgumentParser()
    parser.add_argument("--input", "-i", type=str, required=True)
    args = parser.parse_args()
    user_input = args.input
    print(f"User input: {user_input}")
    if validate_lenght(user_input):
        # Calling generated text 
        generate_branding_snippet(prompt=user_input)
        generate_keywords(prompt=user_input)
    else:
        raise ValueError(f"Input lenght is too long. Must be under {MAX_INPUT_LENGHT}. Submitted input is {len(user_input)}.")



if __name__ == "__main__":
    main()