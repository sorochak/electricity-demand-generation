import os
from dotenv import load_dotenv

load_dotenv()

EIA_API_KEY = os.getenv("EIA_API_KEY")

if not EIA_API_KEY:
    raise ValueError("EIA_API_KEY is not set. Please update your .env file.")