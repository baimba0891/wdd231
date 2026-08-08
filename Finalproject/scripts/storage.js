export function saveFavorite(id) {
  const key = 'sl-favorites';
  let favs = JSON.parse(localStorage.getItem(key)) || [];
  if (!favs.includes(id)) { favs.push(id); localStorage.setItem(key, JSON.stringify(favs)); }
}
export function getFavorites() { return JSON.parse(localStorage.getItem('sl-favorites')) || []; }