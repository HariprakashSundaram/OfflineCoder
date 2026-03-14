# Frontend Setup Guide

This is a React-based UI for the Offline Code AI assistant.

## Features
- ✨ Modern chat interface
- 📝 Code blocks with syntax highlighting
- 📋 Copy button for code blocks
- 📊 Add line numbers to code
- 🌙 Dark/Light mode toggle
- 💬 Chat history
- ⚡ Real-time responses

## Requirements
- Node.js 16+ and npm

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Start the development server with hot reload:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

Build the frontend and output to `../api/static/`:
```bash
npm run build
```

This creates optimized production files that the FastAPI server will serve.

## How It Works

- The React dev server proxies API calls to `http://localhost:8000` (FastAPI backend)
- In production, the built files are served from the FastAPI server at `/api/static`
- The chat interface communicates with the `/chat` endpoint
