const listPlayers = document.querySelector('.list-players')
const ipAPIstats = 'http://localhost:4050'
console.log('listPlayers', listPlayers);

axios.get(ipAPIstats + '/api/statsFFA/Players')
.then(players => {
    // Mélanger les joueurs dans le tableau
    players.data.sort(() => Math.random() - 0.5)
    // Ne récupérer que les 20 premiers joueurs
    const randomPlayers = players.data.slice(0, 20)
    // Afficher les joueurs dans la liste
    randomPlayers.forEach(player => {
        const playerDiv = document.createElement('div')
        playerDiv.textContent = player.nickname
        listPlayers.appendChild(playerDiv)
    })
})