document.addEventListener("DOMContentLoaded",() => {
    const kantoPokemon = document.getElementById("Pokemon-List")
    fetch("https://pokeapi.co/api/v2/pokemon?limit=50")
    .then(res => res.json())
    .then(data => console.log(data))
})