const BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error || 'Request failed');
  return json;
}

export const api = {
  // Brews
  getBrews: (userId) => request(`/brews${userId ? `?user_id=${userId}` : ''}`),
  getBrew: (id) => request(`/brews/${id}`),
  createBrew: (body) => request('/brews', { method: 'POST', body: JSON.stringify(body) }),

  // Recipes
  getRecipes: (userId) => request(`/recipes${userId ? `?user_id=${userId}` : ''}`),
  getRecipe: (id) => request(`/recipes/${id}`),
  createRecipe: (body) => request('/recipes', { method: 'POST', body: JSON.stringify(body) }),
  rateRecipe: (recipeId, body) => request(`/recipes/${recipeId}/ratings`, { method: 'POST', body: JSON.stringify(body) }),

  // Pantry
  getPantry: (userId) => request(`/pantry${userId ? `?user_id=${userId}` : ''}`),
  addPantryItem: (body) => request('/pantry', { method: 'POST', body: JSON.stringify(body) }),
  updatePantryItem: (id, body) => request(`/pantry/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  deletePantryItem: (id) => request(`/pantry/${id}`, { method: 'DELETE' }),

  // Feedback
  getFeedback: (brewId) => request(`/feedback/${brewId}`),
  createFeedback: (body) => request('/feedback', { method: 'POST', body: JSON.stringify(body) }),

  // Ingredients
  getIngredients: () => request('/ingredients'),
};
