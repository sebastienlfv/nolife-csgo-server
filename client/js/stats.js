// change stats

const retakeButton = document.querySelector('.retake-button')
const ffaButton = document.querySelector('.ffa-button')
const hsmodButton = document.querySelector('.hsmod-button')

const retakeStats = document.querySelector('.retake-stats')
const ffaStats = document.querySelector('.ffa-stats')
const hsmodStats = document.querySelector('.hsmod-stats')

retakeButton.addEventListener('click', () => {
  retakeButton.classList.add('activ-stats')
  ffaButton.classList.remove('activ-stats')
  hsmodButton.classList.remove('activ-stats')
  retakeStats.style.display = 'flex'
  ffaStats.style.display = 'none'
  hsmodStats.style.display = 'none'
})

ffaButton.addEventListener('click', () => {
  retakeButton.classList.remove('activ-stats')
  ffaButton.classList.add('activ-stats')
  hsmodButton.classList.remove('activ-stats')
  ffaStats.style.display = 'flex'
  retakeStats.style.display = 'none'
  hsmodStats.style.display = 'none'
})

hsmodButton.addEventListener('click', () => {
  retakeButton.classList.remove('activ-stats')
  ffaButton.classList.remove('activ-stats')
  hsmodButton.classList.add('activ-stats')
  hsmodStats.style.display = 'flex'
  retakeStats.style.display = 'none'
  ffaStats.style.display = 'none'
})

console.log(retakeButton);

// search stats to api servers

axios.get('http://localhost:4050/api/statsFFA/Players')
  .then(players => {
    console.log('api stats ffa', players.data);
    const steamID = localStorage.getItem('steam_id');
    console.log('steamID localstorage', steamID);
    
    const player = players.data.find((player) => player.steam_id === steamID);
    
    if (player) {
      console.log('Information du joueur du joueur :', player);

      console.log('account_id', player.account_id);
      // Effectuer des actions avec les statistiques du joueur
    } else {
      console.log('Le joueur correspondant au steamID n\'a pas été trouvé.');
    }
  })
  .catch(error => {
    console.log(error);
  })
