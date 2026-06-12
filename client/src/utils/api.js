import axios from "axios";

/**
 * Pre-configured Axios instance pointing at the Express backend.
 * The CRA proxy (package.json → "proxy") forwards /api/* to :5000 in dev.
 */
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

// ─── Request Interceptor ──────────────────────────────────────────────────────
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred.";
    return Promise.reject(new Error(message));
  }
);

// ─── Recommendation Endpoints ─────────────────────────────────────────────────

/** POST /recommendations — create & return a new recommendation */
export const createRecommendation = (payload) =>
  api.post("/recommendations", payload);

/** GET /recommendations — paginated history list */
export const getRecommendations = (page = 1, limit = 10) =>
  api.get(`/recommendations?page=${page}&limit=${limit}`);

/** GET /recommendations/:id — single record with full data */
export const getRecommendationById = (id) =>
  api.get(`/recommendations/${id}`);

/** DELETE /recommendations/:id */
export const deleteRecommendation = (id) =>
  api.delete(`/recommendations/${id}`);

/** GET /recommendations/stats */
export const getStats = () => api.get("/recommendations/stats");

export default api;
