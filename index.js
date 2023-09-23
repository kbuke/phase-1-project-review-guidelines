//Load Web Pahe
document.addEventListener("DOMContentLoaded", () => {
  //Create a variable to store all Pokemon Cards
  let kantoPokemon = document.getElementById("Pokemon-List")

  //Create a variable for the drop down list
  let typeSelector = document.getElementById("Pokemon-List")

  //Now fetch available data of original 151 pokemon, ALSO limit the number to 151
  fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
  .then(resp => resp.json())
  .then(data => data.results.forEach(pokemon => createCard(pokemon)))

  //Create the pokemon cards
  function createCard(pokemon){
    //Create the card holders
    let pokeCardDiv = document.createElement("div")
    pokeCardDiv.className = "pokemonCards"

    //Get names of each pokemon using "pokemon" arg
    let pokeName = document.createElement("h2")
    pokeName.className = "pokemonName"
    pokeName.innerText = `${pokemon.name}`.toUpperCase()
  }
})









// document.addEventListener("DOMContentLoaded", () => {
//   //Create variable where Pokemon Cards will be stored
//   let kantoPokemon = document.getElementById("Pokemon-List")

//   //Create variable for the dropdown list
//   let typeSelector = document.getElementById("type-dropdown")

//   //Fetch the data limit it to thd original 151 Pokemon
//   fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
//   .then(resp => resp.json())
//   .then(data => data.results.forEach(pokemon => createCard(pokemon)))

//   //Create Pokemon Card
//   function createCard(pokemon){
//     //create card holder
//     let pokeCardDiv = document.createElement("div")
//     pokeCardDiv.className = "pokemonCards"
    
    
//     //get the names of each pokemon
//     let pokeName = document.createElement("h2")
//     pokeName.className = "pokemonName"
//     pokeName.innerText = `${pokemon.name}`.toUpperCase()

//     //Retreive Additional Pokemon Data nested in original fetch
//     let pokeUrl = pokemon.url 
//     fetch(pokeUrl)
//     .then(resp => resp.json())
//     .then(data => pokeStats(data))

//     function pokeStats(pokeInfo){
//       //Get type of pokemon and make the id of the card that type
//       let types = pokeInfo.types
//       let specificType = types.map(pokeType => pokeType.type.name)
//       //console.log(specificType)
//       for(let i = 0; i < specificType.length; i++){
//         pokeCardDiv.classList.add(specificType[i])
//       }
//       // if(specificType.length > 0){
//       //   pokeCardDiv.id = specificType[0]
//       //   pokeCardDiv.classList.add(specificType[1])
//       // } else  {
//       //   pokeCardDiv.id = specificType
//       // }

//       //Create back of Pokemon Card
//       let backOfPokeCard = document.createElement("img")
//       backOfPokeCard.className = "backEnd"
//       backOfPokeCard.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fit/w_828,h_1148/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA"
//       pokeCardDiv.appendChild(backOfPokeCard)

//       //When mouse hovers over the back of the card create an event so that it flips card forward
//       backOfPokeCard.addEventListener("mouseover", () => {
//         //Create front of Pokemon Card
//         let frontOfPokeCard = document.createElement("div")
//         frontOfPokeCard.className = "frontCard"

//         //show image of Pokemon
//         let pokeImg = document.createElement("img")
//         pokeImg.className = "pokemonImages"
//         pokeImg.src = `${pokeInfo.sprites["front_default"]}`

//         //Allow Pokemon Image to be draggable
//         pokeImg.draggable = "true"

//         //Allows side panel to open when image is dragged
//         let isPanelOpen = false;

//         pokeImg.addEventListener("dragstart", () => {
//           if (!isPanelOpen) {
//             document.querySelector(".wrapper").classList.add("side-panel-open");
//             isPanelOpen = true;
//           } 
//           pokeImg.classList.add("dragging");
//         });
                  
//         // Return opacity to normal when stop dragging
//         pokeImg.addEventListener("dragend", () => {
//           pokeImg.classList.remove("dragging");
//         });
          
//         //Set up containers and make them able to receive Pokemon Images
//         let containers = document.getElementsByClassName("select-team");

//         const handleDragOver = (container) => {
//           container.addEventListener("dragover", (e) => {
//             e.preventDefault();
//           });

//           container.addEventListener("drop", (e) => {
//             e.preventDefault();
//             frontOfPokeCard.remove()
//             let pokeDrag = document.getElementsByClassName("dragging")[0];
//             if (pokeDrag && container.children.length === 0) {
//               pokeDrag.className = "teamImage";
//               pokeDrag.classList.remove("dragging");
//               container.appendChild(pokeDrag);
//             }
//           });
//         };
//         Array.from(containers).forEach(handleDragOver) 
        
//         //Get all Kanto region number id's
//         let pokeId = document.createElement("b")
//         pokeId.className = "pokemonID"
//         // let kantoId = document.createElement("b")
//         // kantoId.innerText = "Kanto ID: "
//         pokeCardDiv.id = pokeInfo.id
//         pokeId.innerText = `KANTO REGION ID: ${pokeInfo.id}`

//         //Append info to front of card
//         frontOfPokeCard.append(pokeName, pokeImg, pokeId)

//         //Append front of card to pokeCardDiv
//         pokeCardDiv.replaceChild(frontOfPokeCard, backOfPokeCard) 


//         frontOfPokeCard.addEventListener("mouseout", () => {
//           pokeCardDiv.replaceChild(backOfPokeCard, frontOfPokeCard)
//         })
//       })
//       //Append all card info to pokeCardDiv
//     }
//     kantoPokemon.append(pokeCardDiv)
//   }
//   //Handle drop down bar
//   typeSelector.addEventListener("change", () => {
//     let selectedType = typeSelector.value
    
//     let pokemonCards = document.querySelectorAll(".pokemonCards")
  
//     //Show Pokemon whos pokeTypes match the dropselect option 
//     pokemonCards.forEach((card) => {
//       if(selectedType == "all pokemon"){
//         card.style.display = "block"
//       } else if (card.classList.contains(selectedType)) {
//         card.style.display = "block";
//       } else {
//         card.style.display = "none";
//       }
//     })
//   })
// })


//To bring cards back after they are put into team selector
//Create a variable that contains all card info.
//Try and get the classtypes to be the actual types of pokemon
//set the id of each card, to its Kanto id number
//set id of team selector image as its Kanto id number
//Create a variable where the card used to be
//When the image is dragged back over that empty space replace it with the card info