// Función para guardar el historial en LocalStorage
function saveToHistory(pokemon) {
    const history = JSON.parse(localStorage.getItem('pokemonHistory') || '[]');
    history.push({ id: pokemon.id, name: pokemon.name });
    localStorage.setItem('pokemonHistory', JSON.stringify(history));
}
// Función para renderizar el historial de búsquedas
function renderHistory(resultDiv) {
    const history = JSON.parse(localStorage.getItem('pokemonHistory') || '[]');
    const historyDiv = document.createElement('div');
    historyDiv.innerHTML = '<h3>Historial de Búsquedas</h3>';
    historyDiv.innerHTML += history.map((p) => `<p>${p.name} (ID: ${p.id})</p>`).join('');
    resultDiv.appendChild(historyDiv);
}
// Función para renderizar el Pokémon y llamar al historial
export function renderPokemon(pokemon, resultDiv) {
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
