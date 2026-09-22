document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const gamesGrid = document.getElementById("gamesGrid");
  const loading = document.getElementById("loading");
  const errorMessage = document.getElementById("errorMessage");

  async function searchGames() {
    const query = searchInput.value.trim();

    loading.style.display = "block";
    errorMessage.style.display = "none";
    gamesGrid.innerHTML = "";

    try {
t
      const response = await fetch(`/.netlify/functions/games?query=${encodeURIComponent(query)}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Server returned status ${response.status}`);
      }

      const games = Array.isArray(data) 
        ? data 
        : (data.results || data.games || data.items || []);

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
      gamesGrid.innerHTML = "<p style='grid-column: 1/-1; text-align: center; color: #9ca3af;'>No games found.</p>";
      return;
    }

    gamesGrid.innerHTML = games
      .map((game) => {
        const title = game.name || game.title || "Untitled Game";
        const image = game.image || game.cover || game.background_image || "https://via.placeholder.com/300x160?text=No+Image";
        const rating = game.computed_rating || game.rating || game.score || "N/A";

        return `
          <div class="game-card">
            <img src="${image}" alt="${title}" loading="lazy" />
            <div style="padding: 1rem;">
              <h3>${title}</h3>
              <p style="color: #9ca3af; margin-top: 0.5rem;">⭐ Rating: ${rating}</p>
            </div>
          </div>
        `;
      })
      .join("");
  }


  if (searchBtn) {
    searchBtn.addEventListener("click", searchGames);
  }

  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") searchGames();
    });
  }


  searchGames();
});