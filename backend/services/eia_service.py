import datetime
import json
import requests
import pandas as pd
import logging
from backend.config import EIA_API_KEY

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Default time range for API calls
default_end_date = datetime.date.today().isoformat()
default_start_date = (datetime.date.today() - datetime.timedelta(days=365)).isoformat()

def get_eia_timeseries(
    url_segment,
    facets,
    value_column_name="value",
    start_date=default_start_date,
    end_date=default_end_date,
    start_page=0,
):
    """
    Fetches time series data from the EIA API, handling pagination and data transformation.

    Parameters:
        url_segment (str): The specific endpoint for the data type.
        facets (dict): Filtering options such as balancing authorities.
        value_column_name (str): The name to assign to the retrieved data column.
        start_date (str): Start date for the query (ISO format).
        end_date (str): End date for the query (ISO format).
        start_page (int): The pagination offset.

    Returns:
        pd.DataFrame: A cleaned pandas DataFrame containing the fetched time series data.
    """
    max_row_count = 5000  # Maximum allowed rows per API call
    api_url = f"https://api.eia.gov/v2/electricity/rto/{url_segment}/data/?api_key={EIA_API_KEY}"
    offset = start_page * max_row_count

    logging.info(f"Fetching data from: {api_url}")

    try:
        response = requests.get(
            api_url,
            headers={
                "X-Params": json.dumps(
                    {
                        "frequency": "daily",
                        "data": ["value"],
                        "facets": dict(**{"timezone": ["Pacific"]}, **facets),
                        "start": start_date,
                        "end": end_date,
                        "sort": [{"column": "period", "direction": "desc"}],
                        "offset": offset,
                        "length": max_row_count,
                    }
                )
            },
            timeout=10,  # Set a timeout to prevent hanging requests
        )
        response.raise_for_status()  # Raise an error for HTTP failures (4xx, 5xx)

        response_content = response.json()
        if "response" not in response_content:
            logging.error("Invalid API response format")
            return pd.DataFrame()  # Return an empty DataFrame on failure

        logging.info(f"Fetched {len(response_content['response']['data'])} rows.")

        dataframe = pd.DataFrame(response_content["response"]["data"])
        dataframe["timestamp"] = pd.to_datetime(dataframe["period"], errors="coerce")
        processed_df = dataframe.astype({"value": float}).rename(columns={"value": value_column_name})

        # Pagination logic
        rows_fetched = len(processed_df) + offset
        rows_total = int(response_content["response"]["total"])
        if rows_fetched != rows_total:
            additional_rows = get_eia_timeseries(
                url_segment=url_segment,
                facets=facets,
                value_column_name=value_column_name,
                start_date=start_date,
                end_date=end_date,
                start_page=start_page + 1,
            )
            return pd.concat([processed_df, additional_rows])
        return processed_df

    except requests.exceptions.RequestException as e:
        logging.error(f"Error fetching data from EIA API: {e}")
        return pd.DataFrame()

    except ValueError as e:
        logging.error(f"Data processing error: {e}")
        return pd.DataFrame()
    
def get_eia_grid_mix_timeseries(balancing_authorities, **kwargs):
    """
    Fetches electricity generation data by fuel type for specified balancing authorities.
    """
    return get_eia_timeseries(
        url_segment="daily-fuel-type-data",
        facets={"respondent": balancing_authorities},
        value_column_name="Generation (MWh)",
        **kwargs
    )

def get_eia_net_demand_and_generation_timeseries(balancing_authorities, **kwargs):
    """
    Fetches electricity demand and net generation data for specified balancing authorities.
    """
    return get_eia_timeseries(
        url_segment="daily-region-data",
        facets={"respondent": balancing_authorities, "type": ["D", "NG", "TI"]},
        value_column_name="Demand (MWh)",
        **kwargs
    )

def get_eia_interchange_timeseries(balancing_authorities, **kwargs):

    """
    Fetches electricity interchange data (imports & exports) for specified balancing authorities.
    """
    return get_eia_timeseries(
        url_segment="daily-interchange-data",
        facets={"toba": balancing_authorities},
        value_column_name="Interchange (MWh)",
        **kwargs
    )

def get_balancing_authorities():
    """
    Fetches a list of unique balancing authorities from the EIA API.
    """

    if not EIA_API_KEY:
        logging.error("EIA API key not found.")
        return {"error": "API key not found."}

    api_url = f"https://api.eia.gov/v2/electricity/rto/region-data/data/"
    params = {
        "api_key": EIA_API_KEY,
        "frequency": "hourly",
        "length": 5000,  # Max batch size
    }

    balancing_authorities = set()

    try:
        logging.info("Requesting data from EIA API")
        response = requests.get(api_url, params=params, timeout=10)
        response.raise_for_status()  # Raise an error for HTTP failures (4xx, 5xx)

        data = response.json()

        # Check for valid response format
        if "response" not in data or "data" not in data["response"]:
            logging.error("Invalid API response format")
            return {"error": "Invalid API response format"}

        records = data["response"]["data"]

        # Extract unique balancing authorities
        for record in records:
            ba = record.get("respondent")
            if ba:
                balancing_authorities.add(ba)

    except requests.exceptions.Timeout:
        logging.error("EIA API request timed out.")
        return {"error": "EIA API request timed out. Please try again later."}
    
    except requests.exceptions.RequestException as e:
        logging.error(f"Failed to fetch data from EIA API: {e}")
        return {"error": f"Failed to fetch data from EIA API: {str(e)}"}
    
    if not balancing_authorities:
        logging.warning("No balancing authorities found.")
        return {"error": "No balancing authorities found in EIA data."}
    
    logging.info(f"Found {len(balancing_authorities)} balancing authorities.")
    return {"balancing_authorities": sorted(balancing_authorities)}