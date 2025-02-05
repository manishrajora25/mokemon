
const nameData = document.querySelector("#hellotask");

let url = "https://pokeapi.co/api/v2/pokemon?limit=40&offset=18";


window.addEventListener("load", async () => {
    const pokemonData = await loadPokemon(url);
    console.log(pokemonData);
    appendImage(pokemonData);
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
    for (let i = 0; i < data.length; i++) {
        const parent = document.createElement("div");
        parent.classList = "box";

        const parent2 = document.createElement("div2");
        parent2.classList.add = "box1";

        const image = document.createElement("img");
        image.src = data[i].sprites.other.dream_world.front_default; 

        const heading = document.createElement("h3");
        heading.innerText = data[i].name;

        const para = document.createElement("p");
        para.innerText = data[i].types[0].type.name;


        const selectElement = document.createElement("select"); 
        selectElement.id = "pokemonSelect";
      

        parent.append(image);
        parent.append(heading);
        parent.append(para);
        nameData.append(parent);



        
    }
}











        













