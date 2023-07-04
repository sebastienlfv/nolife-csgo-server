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

        // récupere les VIPS
        axios.get(ipAPI + '/api/vips/getVips', { withCredentials: true })
          .then(vips => {
            console.log('list vips', vips);
            const steamId = localStorage.getItem('steam_id');
            const userVip = vips.data.find(vip => vip.steamID === steamId);
            const vipStatus = document.querySelector('.vip-status')
            const buyVip = document.querySelectorAll('.buy-vip')
            console.log(buyVip);

            if (userVip) {
              vipStatus.innerHTML = 'Actif'
              vipStatus.style.color = 'green'
              buyVip.forEach(el => el.innerHTML = 'Déjà VIP') // Modify each element in the list
              buyVip.forEach(link => {
                link.addEventListener('click', (event) => {
                  // Empêchez le lien de fonctionner
                  event.preventDefault();
                });
              });
          } else {
              vipStatus.innerHTML = 'Inactif'
              vipStatus.style.color = 'red'
          }
          })
          .catch(error => {
            console.log(error);
          })
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