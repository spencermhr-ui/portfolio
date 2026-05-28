const slides = document.querySelectorAll('.project-slide')
const carouselTrack = document.querySelector('.carousel-track')
let currentIndex = 0

const bgA = document.getElementById('bg-a')
const bgB = document.getElementById('bg-b')
let activeBg = bgA

// clone items for infinite loop
const originalItems = Array.from(document.querySelectorAll('.carousel-item'))
const totalOriginal = originalItems.length

// prepend and append clones
originalItems.forEach(item => {
  const cloneEnd = item.cloneNode(true)
  const cloneStart = item.cloneNode(true)
  cloneEnd.classList.add('clone')
  cloneStart.classList.add('clone')
  carouselTrack.appendChild(cloneEnd)
  carouselTrack.insertBefore(cloneStart, carouselTrack.firstChild)
})

function getAllItems() {
  return Array.from(document.querySelectorAll('.carousel-item'))
}

function centerCarousel(animate = true) {
  const items = getAllItems()
  const itemWidth = items[0].getBoundingClientRect().width
  const gap = 3
  const centerOffset = (window.innerWidth / 2) - (itemWidth / 2)
  const translateX = centerOffset - (currentIndex + totalOriginal) * (itemWidth + gap)

  carouselTrack.style.transition = animate ? 'transform 0.5s ease' : 'none'
  carouselTrack.style.transform = `translateX(${translateX}px)`
}

function updateActiveCarousel() {
  const items = getAllItems()
  items.forEach(item => item.classList.remove('active'))
  items[currentIndex + totalOriginal].classList.add('active')
}

function handleLoopJump() {
  const items = getAllItems()
  const itemWidth = items[0].getBoundingClientRect().width
  const gap = 3
  const centerOffset = (window.innerWidth / 2) - (itemWidth / 2)
  const translateX = centerOffset - (currentIndex + totalOriginal) * (itemWidth + gap)
  carouselTrack.style.transition = 'none'
  carouselTrack.style.transform = `translateX(${translateX}px)`
}

function goToProject(index) {
  slides[currentIndex].classList.remove('active')
  currentIndex = (index + totalOriginal) % totalOriginal
  slides[currentIndex].classList.add('active')

  const bgSrc = slides[currentIndex].dataset.bg
  const inactiveBg = activeBg === bgA ? bgB : bgA

  // set up inactive layer invisibly
  inactiveBg.style.transition = 'none'
  inactiveBg.style.opacity = '0'
  inactiveBg.src = bgSrc

  // wait for image to load then fade in
  inactiveBg.onload = () => {
    inactiveBg.style.transition = 'opacity 0.8s ease'
    inactiveBg.style.opacity = '1'
    activeBg.style.transition = 'opacity 0.8s ease'
    activeBg.style.opacity = '0'
    activeBg = inactiveBg
  }

  updateActiveCarousel()
  centerCarousel()
  carouselTrack.addEventListener('transitionend', handleLoopJump, { once: true })
  alignArrows()
}

function alignArrows() {
  setTimeout(() => {
    const btn = document.querySelector('.project-slide.active .explore-btn')
    const leftArrow = document.querySelector('.arrow-left')
    const rightArrow = document.querySelector('.arrow-right')
    if (!btn) return
    const btnRect = btn.getBoundingClientRect()
    const heroRect = document.querySelector('.project-hero').getBoundingClientRect()
    const btnCenter = btnRect.top - heroRect.top + btnRect.height / 2
    leftArrow.style.top = btnCenter + 'px'
    rightArrow.style.top = btnCenter + 'px'
    leftArrow.style.transform = 'translateY(-50%)'
    rightArrow.style.transform = 'translateY(-50%)'
  }, 50)
}

originalItems.forEach((item) => {
  item.addEventListener('click', () => {
    goToProject(parseInt(item.dataset.index))
  })
})

document.querySelector('.arrow-left').addEventListener('click', () => {
  goToProject(currentIndex - 1)
})

document.querySelector('.arrow-right').addEventListener('click', () => {
  goToProject(currentIndex + 1)
})

window.addEventListener('load', () => {
  bgA.src = slides[0].dataset.bg
  bgA.style.transition = 'none'
  bgA.style.opacity = '1'
  centerCarousel(false)
  updateActiveCarousel()
  alignArrows()
})

window.addEventListener('resize', () => {
  centerCarousel(false)
  alignArrows()
})
