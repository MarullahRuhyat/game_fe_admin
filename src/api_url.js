// const DOMAIN_BE = "app.whatsbroad.com";
// const BASE_URL = `https://${DOMAIN_BE}`;
const DOMAIN_BE = "localhost:8000";
const BASE_URL = `http://${DOMAIN_BE}`;

const api_url = {
  domain_be: DOMAIN_BE,
  base_url: BASE_URL,
  login: `${BASE_URL}/api/auth/login/admin`,
  genreGame: `${BASE_URL}/api/game-genre/`,
  serviceGame: `${BASE_URL}/api/game-service/`,
  game: `${BASE_URL}/api/game/`,
};

export default api_url;
