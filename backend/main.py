from fastapi import FastAPI
from backend.api.endpoints import router

app = FastAPI(title="EIA Electricity Data API")

# Include API routes
app.include_router(router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Welcome to the EIA Electricity Data API"}