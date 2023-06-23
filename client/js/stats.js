// vérification connect
const statsContainer = document.querySelector('.stats-container')

axios.get(ipAPI + '/api/checkSession', { withCredentials: true })
  .then(response => {
    if(response.data === 'connected') {
      const statsConnect = document.querySelector('.stats-connect')
      statsConnect.style.display = 'none'


      // search stats to api servers
      axios.get(ipAPIstats + '/api/statsFFA/Players')
      .then(players => {
        const steamID = localStorage.getItem('steam_id');

        const player = players.data.find((player) => player.steam_id === steamID);

        if (player) {
          console.log('Information du joueur :', player);
          console.log('account_id', player.account_id);

          // Effectuer des actions avec les statistiques du joueur
          axios.get(ipAPIstats + '/api/statsFFA/Players_stats')
            .then(stats => {

              const playerStats = stats.data.find((stats) => stats.account_id === player.account_id);

              if (playerStats) {
                console.log('Statistiques du joueur :', playerStats);

                console.log('Pseudo', player.nickname);
                // importation stats ffa
                document.querySelector('.pseudo-stats-ffa').innerHTML = player.nickname
                document.querySelector('.ffa-ratio-stats').innerHTML = playerStats.kills / playerStats.deaths
                if (isNaN(playerStats.kills / playerStats.deaths)) {
                  document.querySelector('.ffa-ratio-stats').innerHTML = '0.00';
                }
                document.querySelector('.ffa-kill-stats').innerHTML = playerStats.kills
                document.querySelector('.ffa-death-stats').innerHTML = playerStats.deaths
                document.querySelector('.ffa-points-stats').innerHTML = playerStats.points
                
                const playtimeSeconds = playerStats.playtime;
                const hours = Math.floor(playtimeSeconds / 3600);
                const minutes = Math.floor((playtimeSeconds % 3600) / 60);
                const seconds = playtimeSeconds % 60;

                const formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');

                document.querySelector('.ffa-times-stats').innerHTML = formattedTime;

                console.log('kills',playerStats.kills / playerStats.deaths);
                console.log('morts',playerStats.deaths);
              } else {
                console.log('Les statistiques du joueur n\'ont pas été trouvées.');
              }
            })
            .catch(error => {
              console.log(error);
            });

          // Effectuer des actions avec les statistiques des armes du joueur
          axios.get(ipAPIstats + '/api/statsFFA/Weapons_player_stats')
            .then(stats => {

              const weaponStats = stats.data.find((stats) => stats.account_id === player.account_id);

              if (weaponStats) {
                console.log('Statistiques du joueur arme :', weaponStats);

                if (weaponStats.kills === 0) {
                  document.querySelector('.ffa-hsrate-stats').innerHTML = '0%';
                } else {
                  const hsRate = (weaponStats.headshot / weaponStats.kills) * 100;
                  document.querySelector('.ffa-hsrate-stats').innerHTML = hsRate + '%';
                }

              } else {
                console.log('Les statistiques du joueur n\'ont pas été trouvées.');
              }
            })
            .catch(error => {
              console.log(error);
            });

        } else {
          console.log('Le joueur correspondant au steamID n\'a pas été trouvé.');
        }
      })
      .catch(error => {
        console.log(error);
        statsContainer.style.display = 'none'

        const noStats = document.querySelector('.no-stats')
        noStats.style.display = 'flex'
      });

    } else {
      statsContainer.style.display = 'none'
    }
  })
  .catch(error => {
    console.error(error);
  });

// change stats
const ipAPIstats = 'http://localhost:4050'

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

