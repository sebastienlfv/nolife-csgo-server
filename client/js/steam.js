// item
const openMenu = document.querySelector('.burger-steam')

const ipAPI = 'http://localhost:4050'

// vérification connexion
axios.get(ipAPI + '/api/checkSession', { withCredentials: true })
  .then(response => {
    console.log('connected?', response.data); 
    const steamAvatar = document.querySelector('.steam-avatar')
    steamAvatar.style.display = 'flex'


    if(response.data === 'connected') {
      // Connnected, masquer le bouton Steam
      document.querySelector(".button-steam").style.display = "none";

      // Récupération des informations utilisateur côté client
      axios.get(ipAPI + '/api/user', { withCredentials: true })
      .then(response => {
        console.log('steam info', response.data);
        localStorage.setItem('steam_id', response.data.id)
        const avatar = response.data.photos[2].value
        const steamAvatar = document.querySelector('.steam-avatar')
        steamAvatar.src = avatar
        
        function toggleOpenMenu() {
          openMenu.style.display = openMenu.style.display === 'flex' ? 'none' : 'flex';
        }

        document.addEventListener('click', (event) => {
          if (!openMenu.contains(event.target) && event.target !== steamAvatar) {
            openMenu.style.display = 'none';
          }
        });

        steamAvatar.addEventListener('click', (event) => {
          toggleOpenMenu();
        });
        
        steamAvatar.addEventListener('click', (event) => {
          openMenu.style.display = 'flex';
        });
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      // masquer burger steam
      document.querySelector('.steam').style.display = "none"
      localStorage.clear()

      // disconnected, masquer le bouton Steam
      document.querySelector(".button-steam").style.display = "flex";
      document.querySelector(".button-steam").style.alignItems = "center";
      document.querySelector(".button-steam").style.gap = "5px";

      // Désactivation du bouton connect
      const connectButton = document.querySelectorAll('.server-link')

      connectButton.forEach(element => {
        element.href = '#'
        element.addEventListener('click', () => {
          const bodyServeur = document.querySelector('.general-server')
          const popupDiv = document.createElement('div')
          const popupText = document.createElement('p')
          bodyServeur.appendChild(popupDiv)
          popupDiv.appendChild(popupText)
          popupDiv.className = 'popupDiv'
          popupDiv.style.display = 'flex'
          popupDiv.style.flexDirection = 'column'
          popupText.innerHTML = 'Connecte toi pour pouvoir accéder aux serveurs'
          popupText.className = 'popupText'
          popupText.style.fontSize = '20px'
  
          const buttonSteam = document.createElement('a')
          const icone = document.createElement('i')
          const textSpan = document.createElement('span')
          buttonSteam.className = 'button-steam'
          buttonSteam.href = ipAPI + '/api/auth/steam'
          buttonSteam.style.marginTop = '20px'
          icone.className = 'fa-brands fa-steam text-2xl'
          textSpan.innerHTML = 'Login with Steam'
          popupDiv.appendChild(buttonSteam)
          buttonSteam.appendChild(icone)
          buttonSteam.appendChild(textSpan)
  
        })
      })
    }
  })
  .catch(error => {
    console.error(error);
  });

// deconnexion

function logoutSteam(e) {
  e.preventDefault();
  axios.get(ipAPI + '/api/logout', { withCredentials: true })
    .then(response => {
      console.log(response);
      window.location.href = '/'
    })
}

document.querySelector('#steam-logout').addEventListener('click', logoutSteam);
console.log(document.querySelector('#steam-logout'));


// fetch('http://localhost:4050/api/user', {
//   credentials: 'include' // Autoriser l'envoi de cookies
// })
// .then(response => {
//   if (response.ok) {
//     // L'utilisateur est connecté
//     return response.json();
//   } else {
//     // L'utilisateur n'est pas connecté
//     console.log(response);
//     throw new Error('User not authenticated');
//   }
// })
// .then(userInfo => {
//   // Utiliser l'objet userInfo pour afficher les informations de l'utilisateur
//   console.log(userInfo);
// })
// .catch(error => {
//   // L'utilisateur n'est pas connecté, afficher un message d'erreur ou rediriger vers la page de connexion
//   console.error(error);
// });