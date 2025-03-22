import { fetchPokemon } from './pokemon';
import { renderPokemon } from './ui';

const input = document.getElementById('searchInput') as HTMLInputElement;
const button = document.getElementById('searchBtn') as HTMLButtonElement;
const resultDiv = document.getElementById('result')!;

let currentPokemonId = 1;

// Función para buscar un Pokémon por ID
async function searchPokemonById(id: number) {
  resultDiv.innerHTML = "🔄 Buscando...";
  try {
    const pokemon = await fetchPokemon(id.toString());
    currentPokemonId = id;
    renderPokemon(pokemon, resultDiv); // Renderiza el Pokémon y el historial
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
  }
}

// Evento del botón de búsqueda
button.addEventListener('click', async () => {
  const name = input.value.trim();
  if (!name) return;

  resultDiv.innerHTML = "🔄 Buscando...";

  try {
    const pokemon = await fetchPokemon(name);
    currentPokemonId = pokemon.id;
    renderPokemon(pokemon, resultDiv); // Renderiza el Pokémon y el historial
  } catch (error) {
    resultDiv.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
  }
});

// Navegación con flechas
document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    searchPokemonById(currentPokemonId - 1);
  } else if (event.key === 'ArrowRight') {
    searchPokemonById(currentPokemonId + 1);
  }
});

// Cargar el primer Pokémon al iniciar la página
searchPokemonById(currentPokemonId);
