// Récupération des informations utilisateur côté client

axios.get('http://localhost:4050/api/user', { withCredentials: true })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

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