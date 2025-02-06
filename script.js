
// const nameData = document.querySelector("#hellotask");

// const SelectBox = document.querySelector("#SelectBox");

// let url = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=18";


// window.addEventListener("load", async () => {
//     const pokemonData = await loadPokemon(url);
//     console.log(pokemonData);
//     appendImage(pokemonData);
// });

// async function loadPokemon(pokiData) {
   
//         const response = await fetch(pokiData);
//         const result = await response.json();

//         const promised = result.results.map(async (object) => {
//             const pokemonData = await fetch(object.url);
//             return pokemonData.json();
//         });

//         return await Promise.all(promised);
//     } 
   

// function appendImage(data) {
//     for (let i = 0; i < data.length; i++) {
//         const parent = document.createElement("div");
//         parent.classList = "box";

//         const parent2 = document.createElement("div2");
//         parent2.classList.add = "box1";

//         const image = document.createElement("img");
//         image.src = data[i].sprites.other.dream_world.front_default; 

//         const heading = document.createElement("h3");
//         heading.innerText = data[i].name;

//         const para = document.createElement("p");
//         para.innerText = data[i].types[0].type.name;


//         const selectElement = document.createElement("select"); 
//         selectElement.id = "pokemonSelect";
      

//         parent.append(image);
//         parent.append(heading);
//         parent.append(para);
//         nameData.append(parent);



//         // parent.types.forEach((type) => {
//         //     const option = document.createElement("option");
//         //     option.value = type.type.name;
//         //     option.innerHTML = type.type.name;
//         //     SelectBox.appendChild(option);
//         // });

        
//     }
// }










// const nameData = document.querySelector("#hellotask");
// const SelectBox = document.querySelector("#SelectBox");

// let url = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=18";

// window.addEventListener("load", async () => {
//     const pokemonData = await loadPokemon(url);
//     console.log(pokemonData);
//     appendImage(pokemonData);
//     appendOptions(pokemonData);
// });

// async function loadPokemon(pokiData) {
//     const response = await fetch(pokiData);
//     const result = await response.json();

//     const promised = result.results.map(async (object) => {
//         const pokemonData = await fetch(object.url);
//         return pokemonData.json();
//     });

//     return await Promise.all(promised);
// }

// function appendImage(data) {
//     for (let i = 0; i < data.length; i++) {
//         const parent = document.createElement("div");
//         parent.classList = "box";

//         const image = document.createElement("img");
//         image.src = data[i].sprites.other.dream_world.front_default;

//         const heading = document.createElement("h3");
//         heading.innerText = data[i].name;

//         const para = document.createElement("p");
//         para.innerText = data[i].types[0].type.name;

//         parent.append(image);
//         parent.append(heading);
//         parent.append(para);
//         nameData.append(parent);
//     }
// }

// function appendOptions(data) {
  
//     SelectBox.innerHTML = "<option value=''>Select a Pokémon</option>";

//     data.forEach((pokemon) => {
//         const option = document.createElement("option");
//         option.value = pokemon.types[0].type.name; 
//         option.innerText = pokemon.types[0].type.name; 
//         SelectBox.appendChild(option); 
//     });
// }






const nameData = document.querySelector("#hellotask");
const SelectBox = document.querySelector("#SelectBox");
const input = document.querySelector("#input")

let url= "https://pokeapi.co/api/v2/pokemon?limit=21&offset=0"

//let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

//https://pokeapi.co/api/v2/type/?limit=21

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
        para.innerText = pokemon.types[0].type.name;

        parent.append(image, heading, para);
        nameData.append(parent);
    });
}
function appendOptions(data) {
    const uniqueTypes = [];
    data.forEach((pokemon) => {
        pokemon.types.forEach((type) => {
            uniqueTypes.push(type.type.name);
            //console.log(data)
        });
    });
    SelectBox.innerHTML = "<option value=''>Select a Pokemon Type</option>";

    uniqueTypes.forEach((type) => {
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





