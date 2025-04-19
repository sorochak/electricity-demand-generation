from fastapi.testclient import TestClient
from backend.main import app
import backend.api.endpoints
import pandas as pd

test_client = TestClient(app)

def test_fetch_grid_mix_success(monkeypatch):
  """Test the /grid-mix endpoint with a valid balancing authority."""

  # Mock function to return dummy generated data
  def mock_get_eia_grid_mix_timeseries(balancing_authorities, **kwargs):
    return pd.DataFrame([
        {"timestamp": "2025-03-15T00:00:00", "Generation (MWh)": 1200.5},
        {"timestamp": "2025-03-14T00:00:00", "Generation (MWh)": 1100.3},
    ])
  
  # Apply the mock function to the actual function
  monkeypatch.setattr(backend.api.endpoints, "get_eia_grid_mix_timeseries", mock_get_eia_grid_mix_timeseries)

  response = test_client.get("/api/grid-mix?balancing_authority=CISO")

  # Ensure the request was successful
  assert response.status_code == 200
  assert isinstance(response.json(), list)
  assert len(response.json()) > 0
  assert "timestamp" in response.json()[0]
  assert "Generation (MWh)" in response.json()[0]

def test_fetch_grid_mix_failure(monkeypatch):
  """Test the /grid-mix endpoint when an error occurs."""

  # Mock function that simulates an error
  def mock_get_eia_grid_mix_timeseries(balancing_authorities, **kwargs):
        raise Exception("Simulated API failure")
  
  # Apply the mock function to the actual function
  monkeypatch.setattr(backend.api.endpoints, "get_eia_grid_mix_timeseries", mock_get_eia_grid_mix_timeseries)

  response = test_client.get("/api/grid-mix?balancing_authority=CISO")

  # Ensure the response contains an error message
  assert response.status_code == 500
  assert response.json() == {"detail": "Simulated API failure"}


def test_fetch_grid_mix_missing_param():
  """Test the /grid-mix endpoint when the balancing_authority parameter is missing."""

  response = test_client.get("/api/grid-mix") # Missing `balancing_authority`

  # Ensure it returns a 422 error (Unprocessable Entity)
  assert response.status_code == 422
  assert "detail" in response.json()