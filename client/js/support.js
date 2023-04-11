const reasonChoose = document.querySelector('#contact-reason')

const signalementDiv = document.querySelector('.signalement')
const adhesionDiv = document.querySelector('.adhesion-staff')

const submitButton = document.querySelector('#submit')

reasonChoose.addEventListener('change', function() {
  if (reasonChoose.value === 'signalement') {
    signalementDiv.style.display = 'block'
    adhesionDiv.style.display = 'none'
    submitButton.style.display = 'block'
  } else if(reasonChoose.value === 'adhesion') {
    signalementDiv.style.display = 'none'
    adhesionDiv.style.display = 'block'
    submitButton.style.display = 'block'
  }
})

axios.get('http://localhost:4050/api/checkSession', { withCredentials: true })
  .then(response => {
    console.log('connected?', response.data); 
    const steamAvatar = document.querySelector('.steam-avatar')
    steamAvatar.style.display = 'flex'


    if(response.data === 'not_connected') {
      // masquer formulaire
      const formSupport = document.querySelector('.form-support')
      formSupport.style.display = 'none'
      document.querySelector('.separator').style.marginBottom = '125px'
    } else {
      document.querySelector('.not_connected-form').style.display = 'none'
    }
  })
  .catch(error => {
    console.error(error);
  });


submitButton.addEventListener('click', (e) => {
  e.preventDefault()

  // récuperer les valeurs du formulaire
  let pseudo = document.getElementById('pseudo').value
  let pseudo2 = document.getElementById('pseudo2').value
  let email = document.getElementById('email').value
  let email2 = document.getElementById('email2').value
  let steamLink = document.getElementById('steam-link').value
  let explication = document.getElementById('explication').value
  let name = document.getElementById('name').value
  let birthday = document.getElementById('birthday').value
  let explainModo = document.getElementById('explain-modo').value
  let expStaff = document.getElementById('exp-staff').value
  var data = { pseudo: pseudo, pseudo2: pseudo2, email: email, email2: email2, steamLink: steamLink, explication: explication, name: name, birthday: birthday, explainModo: explainModo, expStaff: expStaff }
    
  // if(reasonChoose.value === 'signalement' && pseudo === '' || email === '' || steamLink === '' || explication === '') {
  //   document.querySelector('.errorForm').innerHTML = 'Veuillez remplir les informations obligatoire'
  //   return false
  // } else if (reasonChoose.value === 'adhesion' && pseudo2 === '' || name === '' || birthday === '' || explainModo === '' || expStaff === '') {
  //   document.querySelector('.errorForm').innerHTML = 'Veuillez remplir les informations obligatoire'
  //   return false
  // }

  // if(pseudo === '' || email === '' || steamLink === '' || explication === '' || name === '' || birthday === '' || explainModo === '' || expStaff === '') {
  //   document.querySelector('.errorForm').innerHTML = 'Veuillez remplir les informations obligatoire'
  //   return false
  // }

  fetch('http://localhost:4050/api/send-mail', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(err => {
    console.log(err);
  })

  document.querySelector('.errorForm').innerHTML = 'Formulaire envoyé !'

  setTimeout(() => {
    window.location.href = '../index.html'
  }, 1000)

  // les datas

  
  // fetch
})