// get players
function manyPlayersNolife() {
  const url = 'http://localhost:4050'
  
  const getInfoRetake1 = '/api/serveur/InfoRetake1'
  const getInfoFfa1 = '/api/serveur/InfoFfa1'
  const getInfoFfa2 = '/api/serveur/InfoFfa2'

  const retake1 = url + getInfoRetake1
  const ffa1 = url + getInfoFfa1
  const ffa2 = url + getInfoFfa2

  axios.get(retake1)
  .then((retake1) => {
    axios.get(ffa1)
      .then((ffa1) => {
        axios.get(ffa2)
          .then((ffa2) => {
            console.log(ffa2);
            const generalPlayers = document.querySelector('.player-online')
            const TotalPlayers = retake1.data.players + ffa1.data.players + ffa2.data.players
            const maxPlayers = retake1.data.maxPlayers + ffa1.data.maxPlayers + ffa2.data.maxPlayers
    
            generalPlayers.innerHTML = 'Joueurs en ligne: ' + TotalPlayers + '/' + maxPlayers
          })
      })
  })
}

manyPlayersNolife()


// get server info
const url = 'http://localhost:4050'

const getInfoRetake1 = '/api/serveur/InfoRetake1'
const getPlayerRetake1 = '/api/serveur/PlayerRetake1'

axios.get(url + getInfoRetake1)
  .then((response) => {
    console.log('api info', response.data);
    const manyPlayerRetake1 = document.querySelector('.server-manyPlayer-retake1')
    const mapRetake1 = document.querySelector('.server-map-retake1')

    manyPlayerRetake1.innerHTML = response.data.players + '/' + response.data.maxPlayers
    mapRetake1.innerHTML = response.data.map
  })

const getInfoFfa1 = '/api/serveur/InfoFfa1'
const getPlayerFfa1 = '/api/serveur/PlayerFfa1'

axios.get(url + getInfoFfa1)
  .then((response) => {
    console.log('api info', response.data);
    const manyPlayerFfa1 = document.querySelector('.server-manyPlayer-ffa1')
    const mapFfa1 = document.querySelector('.server-map-ffa1')

    manyPlayerFfa1.innerHTML = response.data.players + '/' + response.data.maxPlayers
    mapFfa1.innerHTML = response.data.map
  })

const getInfoFfa2 = '/api/serveur/InfoFfa2'
const getPlayerFfa2 = '/api/serveur/PlayerFfa2'

axios.get(url + getInfoFfa2)
  .then((response) => {
    console.log('api info', response.data);
    const manyPlayerFfa2 = document.querySelector('.server-manyPlayer-ffa2')
    const mapFfa2 = document.querySelector('.server-map-ffa2')

    manyPlayerFfa2.innerHTML = response.data.players + '/' + response.data.maxPlayers
    mapFfa2.innerHTML = response.data.map
  })





// filter sever
filterSelection("all")
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("servers");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);     
    }
  }
  element.className = arr1.join(" ");
}

var btnContainer = document.getElementsByClassName("list-mod-servers");
var btns = btnContainer.getElementsByClassName("btn-filter");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}