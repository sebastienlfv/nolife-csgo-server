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
  if(reasonChoose.value === 'signalement') {
    let email = document.getElementById('email')
    let steamLink = document.getElementById('steam-link')
    let explication = document.getElementById('explication')
    var data = { email: email, steamLink: steamLink, explication: explication }
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

    setTimeout(() => {
      window.location.href = '../index.html'
    }, 1000)
  } else if (reasonChoose.value === 'adhesion') {
    let name = document.getElementById('name')
    let email = document.getElementById('email')
    let birthday = document.getElementById('birthday')
    let explainModo = document.getElementById('explain-modo')
    let expStaff = document.getElementById('exp-staff')
    var data = { name: name, email: email, birthday: birthday, explainModo: explainModo, expStaff: expStaff }
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

    setTimeout(() => {
      window.location.href = '../index.html'
    }, 1000)
  }

  // les datas

  
  // fetch
})