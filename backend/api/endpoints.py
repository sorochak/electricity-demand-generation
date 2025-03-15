from fastapi import APIRouter, Query, HTTPException
import logging
import pandas as pd
from backend.services.eia_service import get_eia_grid_mix_timeseries

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "FastAPI is running!"}

@router.get("/grid-mix")
def fetch_grid_mix(
    balancing_authority: str = Query(..., description="Balancing Authority ID")
):
    """
    API endpoint to fetch electricity generation data by fuel type.

    Parameters:
    - balancing_authority (str): The balancing authority ID for which to fetch electricity generation data.

    Returns:
    - JSON: A list of records, where each record contains:
        - "timestamp" (str): The date of the data point in ISO format.
        - "Generation (MWh)" (float): The electricity generation in megawatt-hours.

    Example Request:
        GET /grid-mix?balancing_authority=CISO

    Example Response:
    [
        {
            "timestamp": "2025-03-15T00:00:00",
            "Generation (MWh)": 1200.5
        },
        {
            "timestamp": "2025-03-14T00:00:00",
            "Generation (MWh)": 1100.3
        }
    ]
    """
    try:
        data = get_eia_grid_mix_timeseries([balancing_authority])

        if data.empty:
            raise HTTPException(status_code=404, detail="No data found for the given balancing authority.")

        return data.to_dict(orient="records")  # Convert DataFrame to JSON
    
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")