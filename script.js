
const nameData = document.querySelector("#hellotask");
const SelectBox = document.querySelector("#SelectBox");
const input = document.querySelector("#input")

const addbtn = document.querySelector("#addbtn")

let url= "https://pokeapi.co/api/v2/pokemon?limit=21&offset=0"



window.addEventListener("load", async () => {
    const pokemonData = await loadPokemon(url);
    console.log(pokemonData);
    appendImage(pokemonData); 
    appendOptions(pokemonData);
    addDropdownListener(pokemonData); 
    addSearchListener(pokemonData);
});

async function loadPokemon(pokiData) {
    const response = await fetch(pokiData);
    const result = await response.json();

    const promised = result.results.map(async (object) => {
        const pokemonData = await fetch(object.url);
        return pokemonData.json();
    });
    return await Promise.all(promised);
}

function appendImage(data) {
    nameData.innerHTML = ""; 
    data.forEach((pokemon) => {
        const parent = document.createElement("div");
        parent.classList = "box";

        const image = document.createElement("img");
        image.src = pokemon.sprites.other.dream_world.front_default;

        const heading = document.createElement("h3");
        heading.innerText = pokemon.name;

        const para = document.createElement("p");
        para.innerText = pokemon.types.map(typeinfo => typeinfo.type.name).join(", ")

        parent.append(image, heading, para);
        nameData.append(parent);
    });
}
function appendOptions(data) {
    const uniTypes = [];
    data.forEach((pokemon) => {
        pokemon.types.forEach((type) => {
            uniTypes.push(type.type.name);
            //console.log(data)
        }); 
    });
    SelectBox.innerHTML = "<option value=''>Select a Pokemon Type</option>";

    uniTypes.forEach((type) => {
        const option = document.createElement("option");
        option.value = type; 
        option.innerText = type; 
        SelectBox.appendChild(option);
    });
}

function addDropdownListener(data) {
    SelectBox.addEventListener("change", (event) => {
        const selectedType = event.target.value; 
        if (selectedType) {
            const filteredPokemons = data.filter((pokemon) =>
                pokemon.types.some((type) => type.type.name === selectedType)
            );
            appendImage(filteredPokemons); 
        } else {
            appendImage(data); 
        }
    });
}

function addSearchListener(data) {
    input.addEventListener("input", (event) => {
        const searchText = event.target.value.toLowerCase(); 
        const filteredPokemons = data.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchText) 
        );
        appendImage(filteredPokemons);
    });
}



addbtn.addEventListener("click", loadMorePokemons);

async function loadMorePokemons() {
    offset = limit+offset;
    let newUrl = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}";
    const newPokemonData = await loadpokimon(newUrl);
    
    allPokemonDetails = allPokemonDetails.concat(newPokemonData);
    showPokemon(allPokemonDetails);

}



addbtn.addEventListener("click", () => {
    setTimeout(loadMorePokemons, 3000);
});

async function loadMorePokemons() {
    offset += 20;
    let newUrl = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;
    const newPokemonData = await loadPokemon(newUrl); 
    
    allPokemonDetails = allPokemonDetails.concat(newPokemonData);
    appendImage(allPokemonDetails); 
}










