from fastapi import HTTPException
from googletrans import Translator
import re

class CustomError(HTTPException):
    def __init__(self, status_code:int, detail:str):
        super().__init__(status_code=status_code, detail=detail)

MAX_INPUT_LENGTH = 30

def validate_prompt(input_str: str):
    if not input_str:
        raise CustomError(status_code=400, detail=f"Invalid input: Please provide a non-empty string.")

    if not isinstance(input_str, str):
        raise CustomError(status_code=400, detail=f"Invalid input type: Input must be a string.")

    if len(input_str.strip()) == 0:
        raise CustomError(status_code=400, detail=f"Invalid input: Please provide a non-empty and non-whitespace string.")

    input_str = input_str.strip()

    if len(input_str) > MAX_INPUT_LENGTH:
        raise CustomError(status_code=400, detail=f"Input length exceeds maximum allowed. Maximum allowed length: {MAX_INPUT_LENGTH} characters.")

    detector = Translator()
    dec_lan = detector.detect(input_str)

    if dec_lan is None or not (dec_lan.lang == "en") and not (dec_lan.confidence == 1):
            raise CustomError(status_code=400, detail=f"Invalid input language: Language must be English.")
    
    if not re.match("^[a-zA-Z0-9 ]+$", input_str):
        raise CustomError(status_code=400, detail=f"Invalid characters: Only alphanumeric characters are allowed.")

    return input_str