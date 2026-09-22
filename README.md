# Video Game Explorer

A simple, responsive web application that allows users to search and discover video games.

## How the API Key is Handled

1. The GameBrain API key is **never** embedded directly in front-end code (`script.js` or `index.html`).
2. Frontend requests are routed to a relative serverless endpoint (`/.netlify/functions/games`).
3. The backend function reads the private `GAMEBRAIN_API_KEY` from Netlify's server-side environment variables (`process.env.GAMEBRAIN_API_KEY`).

## How to Run Locally

### Steps

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd <your-project-folder>