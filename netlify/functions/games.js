

exports.handler = async function (event) {
  const API_KEY = process.env.GAMEBRAIN_API_KEY;

  if (!API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing GAMEBRAIN_API_KEY in Netlify environment variables." }),
    };
  }

  const query = event.queryStringParameters.query || "mario";

  const apiUrl = `https://api.gamebrain.co/games?key=${API_KEY}&search=${encodeURIComponent(query)}&page_size=12`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: data.detail || `GameBrain returned error ${response.status}` }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to connect to GameBrain server." }),
    };
  }
};