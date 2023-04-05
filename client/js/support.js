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
