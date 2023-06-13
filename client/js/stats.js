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
