from fastapi.testclient import TestClient
from backend.main import app

# Create a test client for FastAPI
test_client = TestClient(app)  

def test_root():
    """Test the root (/) endpoint."""
    response = test_client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Welcome to the EIA Electricity Data API"}