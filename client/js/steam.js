// Vérification cookie connexion
console.log(document.cookie.indexOf('connect.sid'));

if (document.cookie.indexOf('connect.sid') === -1) {
  // Le cookie n'existe pas, afficher le bouton Steam
  document.querySelector(".button-steam").style.display = "flex";
  document.querySelector(".button-steam").style.alignItems = "center";
  document.querySelector(".button-steam").style.gap = "5px";
} else {
  // Le cookie existe, masquer le bouton Steam
  document.querySelector(".button-steam").style.display = "none";
}

axios.get('http://localhost:4050/api/checkSession', { withCredentials: true })
  .then(response => {
    console.log('connected?', response.data); 

    if(response.data === 'connected') {
      // Connnected, masquer le bouton Steam
      document.querySelector(".button-steam").style.display = "none";

      // Récupération des informations utilisateur côté client
      axios.get('http://localhost:4050/api/user', { withCredentials: true })
      .then(response => {
        console.log('steam info', response.data);
        const avatar = response.data.photos[2].value
        const name = response.data.displayName
        document.querySelector('.steam-avatar').src = avatar
        document.querySelector('.steam-name').innerHTML = name
      })
      .catch(error => {
        console.error(error);
      });
    } else {
      // masquer burger steam
      document.querySelector('.burger-steam').style.display = "none"

      // disconnected, masquer le bouton Steam
      document.querySelector(".button-steam").style.display = "flex";
      document.querySelector(".button-steam").style.alignItems = "center";
      document.querySelector(".button-steam").style.gap = "5px";
    }
  })
  .catch(error => {
    console.error(error);
  });

// deconnexion

function logoutSteam(e) {
  e.preventDefault();
  axios.get('http://localhost:4050/api/logout', { withCredentials: true })
    .then(response => {
      console.log(response);
      window.location.href = '/'
    })
}

document.querySelector('.steam-logout').addEventListener('click', logoutSteam);


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