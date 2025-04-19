from fastapi.testclient import TestClient
from backend.main import app
import backend.api.endpoints


test_client = TestClient(app)

def test_fetch_balancing_authorities_success():
    """Test the /balancing-authorities endpoint."""
    response = test_client.get("/api/balancing-authorities")

    # Ensure the request was successful
    assert response.status_code == 200
    
    # Ensure the response contains "balancing_authorities"
    assert "balancing_authorities" in response.json()
    
    # Ensure it's a list
    assert isinstance(response.json()["balancing_authorities"], list)
    
    # Ensure there is at least one balancing authority in the response
    assert len(response.json()["balancing_authorities"]) > 0

def test_fetch_balancing_authorities_failure(monkeypatch):
    """Test the /balancing-authorities endpoint when an error occurs."""

    # Mock function that returns an error
    def mock_get_balancing_authorities():
        return {"error": "Simulated API failure"}

    # Apply the mock function to the actual function
    monkeypatch.setattr(backend.api.endpoints, "get_balancing_authorities", mock_get_balancing_authorities)

    response = test_client.get("/api/balancing-authorities")
    
    assert response.status_code == 500
    assert response.json() == {"detail": "Simulated API failure"}


def test_fetch_balancing_authorities_empty_list(monkeypatch):
    """Test the /balancing-authorities endpoint when no data is available."""

    # Mock function to return an empty list
    def mock_get_balancing_authorities():
        return {"balancing_authorities": []}

    # Monkeypatch the function
    monkeypatch.setattr(backend.api.endpoints, "get_balancing_authorities", mock_get_balancing_authorities)

    response = test_client.get("/api/balancing-authorities")

    assert response.status_code == 200
    assert response.json() == {"balancing_authorities": []}