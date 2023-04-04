

// Info server

async function getServerInfo() {
  const url = 'http://localhost:4050';
  const servers = [
    {
      info: '/api/serveur/InfoRetake1',
      player: '/api/serveur/PlayerRetake1',
      manyPlayer: '.server-manyPlayer-retake1',
      map: '.server-map-retake1',
    },
    {
      info: '/api/serveur/InfoRetake2',
      player: '/api/serveur/PlayerRetake2',
      manyPlayer: '.server-manyPlayer-retake2',
      map: '.server-map-retake2',
    },
    {
      info: '/api/serveur/InfoRetake3',
      player: '/api/serveur/PlayerRetake3',
      manyPlayer: '.server-manyPlayer-retake3',
      map: '.server-map-retake3',
    },
    {
      info: '/api/serveur/InfoRetake4',
      player: '/api/serveur/PlayerRetake4',
      manyPlayer: '.server-manyPlayer-retake4',
      map: '.server-map-retake4',
    },
    {
      info: '/api/serveur/InfoRetake5',
      player: '/api/serveur/PlayerRetake5',
      manyPlayer: '.server-manyPlayer-retake5',
      map: '.server-map-retake5',
    },
    {
      info: '/api/serveur/InfoFfa1',
      player: '/api/serveur/PlayerFfa1',
      manyPlayer: '.server-manyPlayer-ffa1',
      map: '.server-map-ffa1'
    },
    {
      info: '/api/serveur/InfoFfa2',
      player: '/api/serveur/PlayerFfa2',
      manyPlayer: '.server-manyPlayer-ffa2',
      map: '.server-map-ffa2'
    },
    {
      info: '/api/serveur/InfoFfa3',
      player: '/api/serveur/PlayerFfa3',
      manyPlayer: '.server-manyPlayer-ffa3',
      map: '.server-map-ffa3'
    },
    {
      info: '/api/serveur/InfoHsMod1',
      player: '/api/serveur/PlayerHsMod1',
      manyPlayer: '.server-manyPlayer-hsmod1',
      map: '.server-map-hsmod1'
    },
    {
      info: '/api/serveur/InfoHsMod2',
      player: '/api/serveur/PlayerHsMod2',
      manyPlayer: '.server-manyPlayer-hsmod2',
      map: '.server-map-hsmod2'
    },
  ];

  const [retake1, retake2, retake3, retake4, retake5, ffa1, ffa2, ffa3, hsmod1, hsmod2] = await Promise.all([
    axios.get(url + servers[0].info),
    axios.get(url + servers[1].info),
    axios.get(url + servers[2].info),
    axios.get(url + servers[3].info),
    axios.get(url + servers[4].info),
    axios.get(url + servers[5].info),
    axios.get(url + servers[6].info),
    axios.get(url + servers[7].info),
    axios.get(url + servers[8].info),
    axios.get(url + servers[9].info)
  ])

  const TotalPlayers = retake1.data.players + retake2.data.players + retake3.data.players + retake4.data.players + retake5.data.players + ffa1.data.players + ffa2.data.players + ffa3.data.players + hsmod1.data.players + hsmod2.data.players;
  const maxPlayers = retake1.data.maxPlayers + retake2.data.maxPlayers + retake3.data.maxPlayers + retake4.data.maxPlayers + retake5.data.maxPlayers + ffa1.data.maxPlayers + ffa2.data.maxPlayers + ffa3.data.maxPlayers + hsmod1.data.maxPlayers + hsmod2.data.maxPlayers;
  const generalPlayers = document.querySelector('.player-online');
  generalPlayers.innerHTML = 'Joueurs en ligne: ' + TotalPlayers + '/' + maxPlayers;

  servers.forEach((server, index) => {
    axios.get(url + server.info)
      .then((response) => {
        console.log('api info', response.data);
        const manyPlayer = document.querySelector(server.manyPlayer);
        const map = document.querySelector(server.map);
        manyPlayer.innerHTML = response.data.players + '/' + response.data.maxPlayers;
        map.innerHTML = response.data.map;
      });
  });
}

getServerInfo();



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

