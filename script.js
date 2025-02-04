import { PokemonData } from "./data.js";

const PokemonContainer = document.querySelector(".hellomain");
const SelectBox = document.querySelector("#SelectBox");
async function FetchingPokemon(url) {
  
    const response = await fetch(url);
    const data = await response.json();
    
      
    console.log(error);
  }


async function PokemonDisplay() {
  for (const user of PokemonData) {
    const { image, types } = await FetchingPokemon(user.url);
    
    const div = document.createElement("div");
    div.classList.add("PokemonData");

    const img = document.createElement("img");
    img.classList.add("PokemonImage");
    img.src = image;

    const h1 = document.createElement("h1");
    h1.classList.add("PokemonName");
    h1.innerText = user.name;

    const typeText = document.createElement("p");
    typeText.classList.add("PokemonType");
    typeText.innerText = `${types.join(", ")}`;

    div.append(img, h1, typeText);
    PokemonContainer.append(div);

    allPokemon.push(div); 
  }
}

async function fetchingTypes() {

    const response = await fetch("https://pokeapi.co/api/v2/type/?limit=21");
    const data = await response.json();
    
    data.results.forEach((type) =>{
      const option = document.createElement("option");
      option.value = type.name;
      option.innerText = type.name;
      // console.log(option)
      SelectBox.appendChild(option);
    });
  }
