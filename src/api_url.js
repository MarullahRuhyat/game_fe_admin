import { use } from "react";

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

const api_url = {
  base_url: BASE_URL,
  login: `${BASE_URL}/api/auth/login/admin/`,
  genreGame: `${BASE_URL}/api/game-genre/`,
  serviceGame: `${BASE_URL}/api/game-service/`,
  game: `${BASE_URL}/api/game/`,
  checkToken: `${BASE_URL}/api/auth/check-token/`,
  user: `${BASE_URL}/api/user/`,
  product: `${BASE_URL}/api/product/`,
  transaction: `${BASE_URL}/api/transaction/`,
  review: `${BASE_URL}/api/review/`,
  withdraw: `${BASE_URL}/api/withdraw/`,
  sellerApplication: `${BASE_URL}/api/seller-application/`,
  reportProblem: `${BASE_URL}/api/report-problem/`,
  sellerLevel: `${BASE_URL}/api/seller-level/`,
  chat: `${BASE_URL}/api/chat/`,
};

export default api_url;
