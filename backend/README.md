# FastAPI Backend for Electricity Data

## Overview

This backend provides an API for fetching electricity generation and demand data, using FastAPI. It integrates with external energy data sources, such as the **U.S. Energy Information Administration (EIA) API**, to retrieve and serve up-to-date grid mix and balancing authority information.

## Features

- Fetch electricity generation data by fuel type for specified balancing authorities.
- Retrieve a list of balancing authorities from the EIA API.
- Structured API responses with error handling.
- Unit tests for API endpoints.

## Why Does This Exist?

This API provides structured access to real-time electricity generation and demand data. It enables researchers, developers, and energy analysts to efficiently query electricity grid data by balancing authority. The API can serve as a backend for data analysis, visualization tools, or integration into larger energy research projects.

## Installation

### Prerequisites

- Python 3.12+
- `pip` and `venv`

### Setup

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/electricity-demand-generation.git
   cd electricity-demand-generation/backend
   ```

2. Create and activate a virtual environment:

   ```sh
   python -m venv venv
   source venv/bin/activate  # On macOS/Linux
   venv\Scripts\activate     # On Windows
   ```

3. Install dependencies:

   ```sh
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Create a `.env` file in the `backend/` directory.
   - Add the following:
     ```sh
     EIA_API_KEY=your_eia_api_key_here
     ```

## Running the Application

Start the FastAPI server:

```sh
uvicorn backend.main:app --reload
```

The API will be available at: [http://127.0.0.1:8000](http://127.0.0.1:8000)

## Running with Docker

You can run the FastAPI backend in a container using Docker

### Build the Docker Image

Run the following command from the `backend/` directory (where the Dockerfile is located):

```sh
docker build -t fastapi-electricity .
```

### Run the Container

To start the FastAPI server inside a Docker container:

```sh
docker run --env-file .env -p 8000:8000 fastapi-electricity
```

### Accessing the API

Once the container is running, you can access the API at http://127.0.0.1:8000

## API Endpoints

### Health Check

- **Endpoint:** `GET /health`
- **Description:** Check if the API is running.
- **Response:**
  ```json
  { "status": "FastAPI is running!" }
  ```

### Get Balancing Authorities

- **Endpoint:** `GET /balancing-authorities`
- **Description:** Fetch a list of available balancing authorities.
- **Response:**
  ```json
  {
    "balancing_authorities": ["CISO", "PJM", "MISO"]
  }
  ```

### Get Grid Mix Data

- **Endpoint:** `GET /grid-mix?balancing_authority=CISO`
- **Description:** Fetch electricity generation data by fuel type.
- **Response:**

  ```json
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
  ```

  ## Running Tests

  Run unit tests using `pytest`:

```sh
pytest tests/
```

To display test output:

```sh
pytest tests/ -s -v
```

## Project Structure

```
backend/
│── api/
│   ├── endpoints.py   # API route definitions
│── services/
│   ├── eia_service.py # Handles API calls to EIA
│── tests/
│   ├── test_main.py   # Tests for root & health
│   ├── test_balancing_authorities.py  # Tests for /balancing-authorities
│   ├── test_grid_mix.py  # Tests for /grid-mix
│── main.py            # FastAPI app entry point
│── config.py          # Configuration settings
│── requirements.txt   # Python dependencies
│── README.md
```

## Future Improvements

- Expand endpoints for more granular electricity data
- Implement caching for improved performance
- **Add CO2e Emissions Calculations:**
  - Map fuel types to CO2e emission factors
  - Compute total CO2e emissions and CO2e per MWh (CO2e/kWh)
  - Modify API responses to include emissions data
