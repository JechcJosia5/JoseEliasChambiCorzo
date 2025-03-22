import { PokemonResponse } from './pokemon';

// Definir la interfaz para el historial
interface HistoryEntry {
  id: number;
  name: string;
}

// Función para guardar el historial en LocalStorage
function saveToHistory(pokemon: PokemonResponse) {
  const history = JSON.parse(localStorage.getItem('pokemonHistory') || '[]') as HistoryEntry[];
  history.push({ id: pokemon.id, name: pokemon.name });
  localStorage.setItem('pokemonHistory', JSON.stringify(history));
}

// Función para renderizar el historial de búsquedas
function renderHistory(resultDiv: HTMLElement) {
  const history = JSON.parse(localStorage.getItem('pokemonHistory') || '[]') as HistoryEntry[];
  const historyDiv = document.createElement('div');
  historyDiv.innerHTML = '<h3>Historial de Búsquedas</h3>';
  historyDiv.innerHTML += history.map((p: HistoryEntry) => `<p>${p.name} (ID: ${p.id})</p>`).join('');
  resultDiv.appendChild(historyDiv);
}

// Función para renderizar el Pokémon y llamar al historial
export function renderPokemon(pokemon: PokemonResponse, resultDiv: HTMLElement): void {
  console.log("Renderizando Pokémon:", pokemon); // Verifica en la consola
  resultDiv.innerHTML = `
    <h2>${pokemon.name.toUpperCase()}</h2>
    <p>ID: ${pokemon.id}</p>
    <p>Peso: ${pokemon.weight / 10} kg</p>
    <p>Tipos: ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    <p>Habilidades: ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
    <div>
      ${Object.entries(pokemon.sprites)
        .filter(([_, value]) => typeof value === "string" && value !== null)
        .map(([key, value]) => `<img src="${value}" alt="${key}" title="${key}" />`)
        .join('')}
    </div>
  `;
  saveToHistory(pokemon); // Guardar en el historial
  renderHistory(resultDiv); // Llamar a renderHistory después de renderizar el Pokémon
}
