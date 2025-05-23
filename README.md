# Electricity Demand & Generation Full Stack Application

## Overview

This project provides a full-stack web application that allows users to fetch, analyze, and visualize electricity demand and generation data from the U.S. Energy Information Administration (EIA) API. The application consists of a FastAPI backend for data retrieval and a React + TypeScript frontend for interactive visualization (currently in development).

## Features

- **FastAPI Backend:**
  - Fetch electricity generation data by fuel type for specified balancing authorities.
  - Retrieve a list of balancing authorities from the EIA API.
  - Calculates CO2 emissions for fuel types.
  - Structured API responses with error handling.
  - Unit tests for API endpoints.
- **React + TypeScript Frontend:**
  - Select a balancing authority and fetch electricity grid data.
  - Interactive charts to visualize electricity demand and generation.
  - Modern UI with real-time data updates.
- **Full-Stack Deployment:**
  - Backend served via FastAPI and Uvicorn.
  - Frontend built with Vite (development in progress).
  - Docker support for containerized deployment.

## Why Does This Exist?

This application enables researchers, developers, and energy analysts to efficiently query electricity grid data by balancing authority. The structured API and interactive frontend (once built) will allow for seamless analysis and visualization of real-time energy trends.

## Set up the Backend:

Refer to the [backend README](https://github.com/sorochak/electricity-demand-generation/blob/main/backend/README.md) for detailed backend installation and API usage instructions.

## Running Tests in CI/CD

This project includes a GitHub Actions workflow to automatically run tests on every push to `main`.

### Running Locally with `act`

You can use [`act`](https://github.com/nektos/act) to simulate GitHub Actions workflows locally.

#### Install `act`

If you're on macOS and using Homebrew:

```sh
brew install act
```

For Linux users:

```sh
curl -s https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
```

#### Running the Workflow Locally

To test the CI/CD workflow locally, run:

```sh
act -j test --container-architecture linux/amd64 -s EIA_API_KEY=your_eia_api_key_here
```

#### Running the Workflow on GitHub

This workflow runs automatically when you push changes to `main`. If you encounter API key errors, ensure you have set`EIA_API_KEY` as a GitHub Secret under: Settings → Secrets and Variables → Actions.

## Future Improvements

- Develop the Frontend UI: Build out the planned React + TypeScript interface.
- **Add CO2e Emissions Calculations:**
  - Map fuel types to CO2e emission factors
  - Compute total CO2e emissions and CO2e per MWh (CO2e/kWh)
  - Modify API responses to include emissions data
