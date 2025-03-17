# Use the official Python base image
FROM python:3.12

# Set the working directory in the container
WORKDIR /app

# Copy the backend directory explicitly so it remains inside /app/backend
COPY . /app/backend

# Set PYTHONPATH so the container can find the backend module
ENV PYTHONPATH=/app/backend

# Install dependencies from inside backend/
RUN pip install --no-cache-dir --upgrade -r /app/backend/requirements.txt

# Expose port 8000 for FastAPI
EXPOSE 8000

# Command to run FastAPI using Uvicorn
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]