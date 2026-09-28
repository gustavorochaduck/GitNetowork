import { CreateTopBar } from "./components/Topbar.js";
import { CreateSearchbar } from "./components/Seach.js";
CreateTopBar();
CreateSearchbar();
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
form.addEventListener('submit', (e) => {
  e.preventDefault(); 
  const username = input.value.trim();
  if (!username) return;
  window.location.href = `./usuario.html?user=${encodeURIComponent(username)}`;
});

