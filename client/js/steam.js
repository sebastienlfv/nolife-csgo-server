// Récupération des informations utilisateur côté client

fetch('http://localhost:4050/api/userinfo')
.then(response => {
  if (response.ok) {
    // L'utilisateur est connecté
    return response.json();
  } else {
    // L'utilisateur n'est pas connecté
    throw new Error('User not authenticated');
  }
})
.then(userInfo => {
  // Utiliser l'objet userInfo pour afficher les informations de l'utilisateur
  console.log(userInfo);
})
.catch(error => {
  // L'utilisateur n'est pas connecté, afficher un message d'erreur ou rediriger vers la page de connexion
  console.error(error);
});