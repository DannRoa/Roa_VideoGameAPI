document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const gamesGrid = document.getElementById("gamesGrid");
  const loading = document.getElementById("loading");
  const errorMessage = document.getElementById("errorMessage");

  async function searchGames() {
    const query = searchInput.value.trim() || "action";

    loading.style.display = "block";
    errorMessage.style.display = "none";
    gamesGrid.innerHTML = "";

    // Calls Netlify backend function relative endpoint
    const endpoint = `/.netlify/functions/games?query=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch games.");
      }

      // GameBrain returns games under data.results or data.games or as an array
      const games = Array.isArray(data) ? data : (data.results || data.games || []);
      renderGames(games);
    } catch (err) {
      errorMessage.textContent = err.message;
      errorMessage.style.display = "block";
    } finally {
      loading.style.display = "none";
    }
  }

  function renderGames(games) {
    if (!games || games.length === 0) {
      gamesGrid.innerHTML = "<p>No games found.</p>";
      return;
    }

    gamesGrid.innerHTML = games
      .map((game) => `
        <div class="game-card">
          <img src="${game.image || game.cover || 'https://via.placeholder.com/300x160?text=No+Image'}" alt="${game.name || game.title}" />
          <div style="padding: 1rem;">
            <h3>${game.name || game.title || "Untitled Game"}</h3>
            <p style="color: #9ca3af; margin-top: 0.5rem;">⭐ Rating: ${game.rating || "N/A"}</p>
          </div>
        </div>
      `)
      .join("");
  }

  searchBtn.addEventListener("click", searchGames);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") searchGames();
  });

  searchGames();
});