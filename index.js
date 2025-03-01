//Load Web Pahe
document.addEventListener("DOMContentLoaded", () => {
  //Create a variable to store all Pokemon Cards
  let kantoPokemon = document.getElementById("Pokemon-List")

  //Create a variable for the drop down list
  let typeSelector = document.getElementById("type-dropdown")

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

    //Retreive additional Pokemon Info from the nested url in the above
    let pokeUrl = pokemon.url 
    fetch(pokeUrl)
    .then(resp => resp.json())
    .then(data => pokeStats(data))

    function pokeStats(pokeInfo){
      //Get the Pokemon Types, and add them to the class of each pokemon card
      let types = pokeInfo.types
      let specificType = types.map(pokeType => pokeType.type.name)
      //If there is more than one type, add them all to the classList
      for(let i = 0; i < specificType.length; i++){
        pokeCardDiv.classList.add(specificType[i])
      }

      //Get the id of each specific Pokemon, base this on the Kanto Regions id number
      // let pokeId = document.createElement("b")
      // pokeId.className = "pokemonID"
      let kantoId = pokeInfo.id
      pokeCardDiv.id = kantoId
      // pokeId.innerText = `KANTO REGION ID: ${pokeInfo.id}`

      //Get the image of each of the 151 Pokemon
      let pokeImg = document.createElement("img")
      pokeImg.className = "pokemonImages"
      pokeImg.src = `${pokeInfo.sprites["front_default"]}`

      //Create the back of the Pokemon Card
      let backOfPokeCard = document.createElement("img")
      backOfPokeCard.className = "backEnd"
      backOfPokeCard.src = "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/4f7705ec-8c49-4eed-a56e-c21f3985254c/dah43cy-a8e121cb-934a-40f6-97c7-fa2d77130dd5.png/v1/fit/w_828,h_1148/pokemon_card_backside_in_high_resolution_by_atomicmonkeytcg_dah43cy-414w-2x.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTQyMCIsInBhdGgiOiJcL2ZcLzRmNzcwNWVjLThjNDktNGVlZC1hNTZlLWMyMWYzOTg1MjU0Y1wvZGFoNDNjeS1hOGUxMjFjYi05MzRhLTQwZjYtOTdjNy1mYTJkNzcxMzBkZDUucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.9GzaYS7sd8RPY5FlHca09J9ZQZ9D9zI69Ru-BsbkLDA"
      //Append backOfPokeCard to the pokeCardDiv
      pokeCardDiv.appendChild(backOfPokeCard)

      //Create the front of the pokemon card, it will show the Pokemons name, img, and id number
      let frontOfPokeCard = document.createElement("div")
      frontOfPokeCard.className = "frontCard"
      //We already have img, name and id, but I want to make the id number a bit more specific
      let pokeId = document.createElement("b")
      pokeId.className = "pokemonID"
      pokeId.innerText = `KANTO REGION ID: ${kantoId}`

      //Append name, images and id to the front of card
      frontOfPokeCard.append(pokeName, pokeImg, pokeId)

      //Now show the front of the card, when i hover over the back of it
      backOfPokeCard.addEventListener("mouseover", () => {
        pokeCardDiv.replaceChild(frontOfPokeCard, backOfPokeCard)

        //Allow the Pokemon Image to be draggable
        pokeImg.draggable = true

        //When the sidepanel is closed, and you drag an image it will open
        let isPanelOpen = false;

        pokeImg.addEventListener("dragstart", () => {
          if (!isPanelOpen) {
            document.querySelector(".wrapper").classList.add("side-panel-open");
            isPanelOpen = true;
            //Makes the area you got the image from blurred
            pokeImg.classList.add("dragging");
          } 
          // //Makes the area you got the image from blurred
        });
        //Stop original image from being blurred when you stop dragging it.
        pokeImg.addEventListener("dragend", () => {
          pokeImg.classList.remove("dragging");
        });

        //Set up containers and make them available to receive img when dropped in them
        let containers = document.getElementsByClassName("select-team");

        const handleDragOver = (container) => {
          container.addEventListener("dragover", (e) => {
            e.preventDefault();
          });

          //Create empty Poke ball for when it does
          let emptyBall = document.createElement("img")
          emptyBall.className = "emptyBall"
          emptyBall.src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/8a5d5bc8-94fe-46e1-ac40-03969b602a62/dg4ex7f-e5102f8a-486e-4e98-8c85-bbdb70ff23f6.png/v1/fit/w_572,h_538/pokeball_recycle_bin__full__by_blacklem00n_dg4ex7f-375w-2x.png"


          //Allows us to drop the image into the container
          container.addEventListener("drop", (e) => {
            e.preventDefault();
            console.log(frontOfPokeCard)
            frontOfPokeCard.remove()
            let pokeDrag = document.getElementsByClassName("dragging")[0];
            //console.log(pokeDrag)
            //Make sure the container can only have one image
            if (pokeDrag && container.children.length === 0) {
              pokeDrag.className = "teamImage";
              pokeDrag.classList.remove("dragging");
              container.appendChild(pokeDrag);
            }
          });

        }
        Array.from(containers).forEach(handleDragOver) 
      })

      //When you leave the front of the card, the card will flip to the back
      frontOfPokeCard.addEventListener("mouseout", () => {
        pokeCardDiv.replaceChild(backOfPokeCard, frontOfPokeCard)
      })
    }
    kantoPokemon.append(pokeCardDiv)
  }
  //Now control the drop down bar
  typeSelector.addEventListener("change", () => {
    let selectedType = typeSelector.value
    
    let pokemonCards = document.querySelectorAll(".pokemonCards")
  
    //Show Pokemon whos pokeTypes match the dropselect option 
    pokemonCards.forEach((card) => {
      //Ensures if "all pokemon" is selected, then all pokemon will show
      if(selectedType == "all pokemon"){
        card.style.display = "block"
        //If the pokeTypes mention in classlist matches the value of dropdown it will return those cards
      } else if (card.classList.contains(selectedType)) {
        card.style.display = "block";
        //Otherwise nothing
      } else {
        card.style.display = "none";
      }
    })
  })
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