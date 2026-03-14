#!/bin/bash
# Frontend build script - builds React app and copies to FastAPI static folder

echo "🔨 Building frontend..."
npm run build

echo "✅ Frontend built successfully!"
echo "📁 Files are in: ../api/static/"
echo ""
echo "To run the server:"
echo "  python -m uvicorn api.server:app --reload"
