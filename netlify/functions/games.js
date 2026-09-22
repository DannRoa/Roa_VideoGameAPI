// netlify/functions/games.js

exports.handler = async function (event) {
  const API_KEY = process.env.GAMEBRAIN_API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing GAMEBRAIN_API_KEY in Netlify environment variables." }),
    };
  }

  const query = event.queryStringParameters?.query || "";

  const apiUrl = `https://api.gamebrain.co/v1/games?api-key=${API_KEY}&query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET"
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ 
          error: data.message || data.detail || `GameBrain returned error ${response.status}` 
        }),
      };
    }

    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to connect to GameBrain server." }),
    };
  }
};