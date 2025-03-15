from fastapi import APIRouter
from services.eia_service import get_eia_grid_mix_timeseries

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
    data = get_eia_grid_mix_timeseries([balancing_authority])
    return data.to_dict(orient="records") # Convert DataFrame to JSON