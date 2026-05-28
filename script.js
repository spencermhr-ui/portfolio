function isMobile() {
  return window.innerWidth <= 768;
}





















const sidebar = document.querySelector(".sidebar");
const main = document.querySelector("main");
const hamburger = document.getElementById("hamburger");


function setInitialState() {
  if (isMobile()) {
    sidebar.classList.remove("open"); 
    main.classList.remove("pushed");
    main.classList.remove("hidden");
  } else {
    sidebar.classList.remove("closed"); 
    main.classList.add("pushed");
    main.classList.remove("hidden");
  }
}

setInitialState();

window.addEventListener("resize", setInitialState);

hamburger.onclick = function () {
  if (isMobile()) {
    sidebar.classList.toggle("open");
    main.classList.toggle("hidden");
  } else {
    sidebar.classList.toggle("closed");
    main.classList.toggle("pushed");
  }
};

const groups = document.querySelectorAll(".menu-group");
let userClosed = false;

groups.forEach(group => {
  const sectionBtn = group.querySelector(".menu-section");

  sectionBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const isOpen = group.classList.contains("open");

    groups.forEach(g => g.classList.remove("open"));

    if (!isOpen) {
      group.classList.add("open");
      userClosed = false;
    } else {
      userClosed = true;
    }
  });
});


const sections = document.querySelectorAll("section[id]");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !userClosed) {
      const id = entry.target.id;

      document.querySelectorAll(".menu-project").forEach(btn => {
        btn.classList.remove("active");
      });

      const activeBtn = document.querySelector(`.menu-project[data-section="${id}"]`);

      if (activeBtn) {
        activeBtn.classList.add("active");

        const parentGroup = activeBtn.closest(".menu-group");
        groups.forEach(g => g.classList.remove("open"));
        parentGroup.classList.add("open");
      }
    }
  });
}, { threshold: 0.3 });



// click on pictures


sections.forEach(section => observer.observe(section));

const lightboxImages = [];
let currentLightboxIndex = 0;

function buildLightbox() {
  const imgs = document.querySelectorAll('.p-full-img img, .p-full-img-t img');
  imgs.forEach((img, i) => {
    lightboxImages.push(img.src);
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(i));
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.src = lightboxImages[index];
  overlay.style.opacity = '1';
  overlay.style.pointerEvents = 'auto';
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => {
    lightboxImg.style.transform = 'scale(1)';
  });
}

function closeLightbox() {
  const overlay = document.getElementById('lightbox-overlay');
  const lightboxImg = document.getElementById('lightbox-img');
  overlay.style.opacity = '0';
  overlay.style.pointerEvents = 'none';
  overlay.classList.remove('active');
  lightboxImg.style.transform = 'scale(0.9)';
  document.body.style.overflow = '';
}

function lightboxNext() {
  currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
  document.getElementById('lightbox-img').src = lightboxImages[currentLightboxIndex];
}

function lightboxPrev() {
  currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
  document.getElementById('lightbox-img').src = lightboxImages[currentLightboxIndex];
}

// keyboard nav
document.addEventListener('keydown', (e) => {
  const overlay = document.getElementById('lightbox-overlay');
  if (overlay && overlay.style.display === 'flex') {
    if (e.key === 'ArrowRight') lightboxNext();
    if (e.key === 'ArrowLeft') lightboxPrev();
    if (e.key === 'Escape') closeLightbox();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  buildLightbox();

  document.getElementById('lightbox-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'lightbox-overlay') closeLightbox();
  });
});