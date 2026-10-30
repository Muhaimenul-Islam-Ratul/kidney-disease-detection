# Kidney Disease Detection

Flask web application for kidney CT image classification, object detection, and segmentation.

## Project contents

- `Backend/app.py` — Flask API and static frontend server
- `Fontend/` — HTML, CSS, and JavaScript frontend
- `Model+Extension/` — trained model weights (stored with Git LFS)
- `requirements.txt` — pinned Python dependencies
- `Procfile` — Gunicorn start command for Linux hosting platforms that support Procfile

## Run locally

Use Python 3.10 or 3.11 in a virtual environment, then install dependencies:

```bash
python -m pip install -r requirements.txt
python Backend/app.py
```

Open `http://localhost:5000`. Model files must be present in `Model+Extension/`.

## Health checks

- `GET /health/live` — confirms the web process is responding
- `GET /health/ready` — confirms all three models loaded

## Deployment

Deploy the repository root on a Linux Python hosting service. The platform must support the root `Procfile`, provide a `PORT` environment variable, and have enough memory for all three models. Install dependencies from `requirements.txt`. Model weights are tracked using Git LFS; the host's build process must fetch LFS objects.
