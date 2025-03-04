# Web Title to Markdown Converter

A web application that converts webpage URLs to markdown citations based on their titles. Built with FastAPI backend and Next.js frontend.

## Project Structure

```
/
├── backend/         # FastAPI backend
│   ├── app/
│   ├── requirements.txt
│   └── README.md
├── frontend/        # Next.js frontend
│   ├── src/
│   ├── package.json
│   └── README.md
└── README.md
```

## Features

- Input webpage URLs
- Extract webpage titles automatically
- Convert to markdown citation format
- Clean and modern user interface

## Setup

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   .\venv\Scripts\activate  # On Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Enter a webpage URL in the input field
3. Click "Convert" to generate the markdown citation
4. Copy the generated markdown to use in your documents