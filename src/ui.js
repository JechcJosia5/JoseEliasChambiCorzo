Laboratorio;
SIS - 719;
Buscador;
Web;
de;
Pokémon;
usando;
TypeScript(2);
Objetivos;
Configurar;
un;
proyecto;
web;
con;
TypeScript;
desde;
cero.
;
Usar;
la;
PokéAPI;
para;
buscar;
y;
mostrar;
información;
de;
Pokémon.
;
Diseñar;
funciones;
genéricas;
para;
consumir;
APIs;
REST.
;
Construir;
una;
interfaz;
sencilla;
que;
muestre;
imágenes;
y;
datos.
;
Aplicar;
buenas;
prácticas;
de;
desarrollo(tipado, modularidad, reutilización).
;
Parte;
1;
Preparar;
el;
Proyecto;
1.1;
Crear;
estructura;
mkdir;
pokemon - lab;
cd;
pokemon - lab;
npm;
init - y;
1.2;
Instalar;
dependencias;
npm;
install;
typescript;
lite - server--;
save - dev;
1.3;
Configurar;
TypeScript;
npx;
tsc--;
init;
Modifica;
tsconfig.json;
{
    "compilerOptions";
    {
        "module";
        "ESNext",
            "target";
        "ES6", `
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src",                             
    "forceConsistentCasingInFileNames": true, 
    "strict": true,
    "skipLibCheck": true 
  },
  "exclude": ["vite.config.ts"]
}

Fix
Instalar vite 
npm install --save-dev vite 
Luego de la instalación, crea un archivo llamado vite.config.ts
con la siguiente configuración.
import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        target: 'esnext',
        outDir: 'dist',
    }
});
cambia la ejecion del package.json a 
"scripts": {
  "build": "tsc && vite build",
  "start": "lite-server --baseDir=dist",
  "dev": "tsc && vite build && lite-server --baseDir=dist"
}
📁 Estructura
pgsql
CopiarEditar
pokemon-lab/
├── dist/
├── src/
│   ├── index.ts
│   ├── api.ts
│   ├── pokemon.ts
│   ├── ui.ts
├── index.html
├── styles.css
├── tsconfig.json
├── package.json


🧱 Parte 2: HTML y CSS
2.1 index.html

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <title>Pokémon Finder</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <h1>🔍 Pokémon Finder</h1>
  <input type="text" id="searchInput" placeholder="Nombre o ID del Pokémon">
  <button id="searchBtn">Buscar</button>
  <div id="result"></div>

  <script type="module" src="./dist/index.js"></script>
</body>
</html>


2.2 styles.css
css
CopiarEditar
body {
  font-family: Arial, sans-serif;
  padding: 2rem;
  background-color: #f8f8f8;
  text-align: center;
}

#result img {
  width: 150px;
  margin: 0.5rem;
}


🧠 Parte 3: Código TypeScript
3.1 src/api.ts — Función genérica
ts
CopiarEditar
const BASE_URL = "https://pokeapi.co/api/v2/";

export async function fetchFromApi<T>(resource: string, identifier: string): Promise<T> {
  const url = `;
        $;
        {
            BASE_URL;
        }
        $;
        {
            resource;
        }
        /${identifier.toLowerCase()}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`No se pudo obtener ${resource} con identificador "${identifier}"`);
        }
        return await response.json();
    }
    3.2;
    src / pokemon.ts;
    Función;
    específica;
    import { fetchFromApi } from './api';
    export function fetchPokemon(nameOrId) {
        return fetchFromApi('pokemon', nameOrId);
    }
    3.3;
    src / ui.ts;
    Renderizar;
    resultados;
    import { PokemonResponse } from './pokemon';
    export function renderPokemon(pokemon) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
    <h2>${pokemon.name.toUpperCase()}</h2>
    <p>ID: ${pokemon.id}</p>
    <div>
      ${Object.entries(pokemon.sprites)
            .filter(([_, value]) => typeof value === "string" && value !== null)
            .map(([key, value]) => `<img src="${value}" alt="${key}" title="${key}" />`)
            .join('')}
    </div>
  `;
    }
}
