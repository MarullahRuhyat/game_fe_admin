import { use } from "react";

// const DOMAIN_BE = "api-game.ruhyat.com";
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
  checkToken: `${BASE_URL}/api/auth/check-token`,
  user: `${BASE_URL}/api/user/`,
  product: `${BASE_URL}/api/product/`,
  transaction: `${BASE_URL}/api/transaction/`,
  review: `${BASE_URL}/api/review/`,
  withdraw: `${BASE_URL}/api/withdraw/`,
  sellerApplication: `${BASE_URL}/api/seller-application/`,
};

export default api_url;
