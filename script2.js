const slides = document.querySelectorAll('.project-slide')
const carouselTrack = document.querySelector('.carousel-track')
let currentIndex = 0

const bgA = document.getElementById('bg-a')
const bgB = document.getElementById('bg-b')
let activeBg = bgA

const originalItems = Array.from(document.querySelectorAll('.carousel-item'))
const totalOriginal = originalItems.length

// clone full set before and after
const beforeClones = originalItems.map(item => {
  const clone = item.cloneNode(true)
  clone.classList.add('clone')
  clone.removeAttribute('data-index')
  return clone
})

const afterClones = originalItems.map(item => {
  const clone = item.cloneNode(true)
  clone.classList.add('clone')
  clone.removeAttribute('data-index')
  return clone
})

// insert before clones in reverse so they appear in correct order
beforeClones.slice().reverse().forEach(clone => {
  carouselTrack.insertBefore(clone, carouselTrack.firstChild)
})

// append after clones in normal order
afterClones.forEach(clone => carouselTrack.appendChild(clone))

// click handlers — index i matches the original project index
beforeClones.forEach((clone, i) => {
  clone.addEventListener('click', () => goToProject(i))
})
afterClones.forEach((clone, i) => {
  clone.addEventListener('click', () => goToProject(i))
})

function getAllItems() {
  return Array.from(carouselTrack.querySelectorAll('.carousel-item'))
}

let virtualIndex = 0

function centerCarousel(animate = true) {
  const itemWidth = originalItems[0].getBoundingClientRect().width
  const gap = 3
  const centerOffset = (window.innerWidth / 2) - (itemWidth / 2)
  const translateX = centerOffset - (virtualIndex + totalOriginal) * (itemWidth + gap)
  carouselTrack.style.transition = animate ? 'transform 0.5s ease' : 'none'
  carouselTrack.style.transform = `translateX(${translateX}px)`
}

function updateActiveCarousel() {
  getAllItems().forEach(item => item.classList.remove('active'))
  getAllItems()[currentIndex + totalOriginal].classList.add('active')
}

function goToProject(index) {
  slides[currentIndex].classList.remove('active')

  const prevIndex = currentIndex
  currentIndex = ((index % totalOriginal) + totalOriginal) % totalOriginal

  let diff = currentIndex - prevIndex
  if (diff > totalOriginal / 2) diff -= totalOriginal
  if (diff < -totalOriginal / 2) diff += totalOriginal
  virtualIndex += diff

  slides[currentIndex].classList.add('active')

  const bgSrc = slides[currentIndex].dataset.bg
  const inactiveBg = activeBg === bgA ? bgB : bgA
  inactiveBg.style.transition = 'none'
  inactiveBg.style.opacity = '0'
  inactiveBg.src = bgSrc
  inactiveBg.onload = () => {
    inactiveBg.style.transition = 'opacity 0.8s ease'
    inactiveBg.style.opacity = '1'
    activeBg.style.transition = 'opacity 0.8s ease'
    activeBg.style.opacity = '0'
    activeBg = inactiveBg
  }

  updateActiveCarousel()
  centerCarousel()
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