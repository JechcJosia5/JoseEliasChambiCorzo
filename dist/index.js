var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchPokemon } from './pokemon';
import { renderPokemon } from './ui';
const input = document.getElementById('searchInput');
const button = document.getElementById('searchBtn');
const resultDiv = document.getElementById('result');
let currentPokemonId = 1;
// Función para buscar un Pokémon por ID
function searchPokemonById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        resultDiv.innerHTML = "🔄 Buscando...";
        try {
            const pokemon = yield fetchPokemon(id.toString());
            currentPokemonId = id;
            renderPokemon(pokemon, resultDiv); // Renderiza el Pokémon y el historial
        }
        catch (error) {
            resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
        }
    });
}
// Evento del botón de búsqueda
button.addEventListener('click', () => __awaiter(void 0, void 0, void 0, function* () {
    const name = input.value.trim();
    if (!name)
        return;
    resultDiv.innerHTML = "🔄 Buscando...";
    try {
        const pokemon = yield fetchPokemon(name);
        currentPokemonId = pokemon.id;
        renderPokemon(pokemon, resultDiv); // Renderiza el Pokémon y el historial
    }
    catch (error) {
        resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
    }
}));
// Navegación con flechas
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        searchPokemonById(currentPokemonId - 1);
    }
    else if (event.key === 'ArrowRight') {
        searchPokemonById(currentPokemonId + 1);
    }
});
// Cargar el primer Pokémon al iniciar la página
searchPokemonById(currentPokemonId);
