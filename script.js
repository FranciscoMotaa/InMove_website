// Fade-in ao entrar na viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

// Aplica animação a todas as secções
document.querySelectorAll('section').forEach((section) => {
  section.style.opacity = 0;
  section.style.transform = 'translateY(40px)';
  observer.observe(section);
});

// Botão de scroll para o topo (opcional)
const scrollBtn = document.createElement('button');
scrollBtn.innerHTML = `<i class="fas fa-arrow-up"></i>`;
scrollBtn.id = 'scrollTopBtn';
document.body.appendChild(scrollBtn);

scrollBtn.style.display = 'none';
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 400 ? 'block' : 'none';
});

// Animação de entrada no hero
window.addEventListener('load', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    heroContent.style.opacity = 1;
    heroContent.style.transform = 'translateY(0)';
  }
});

// parte do phone
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const overlay = document.getElementById('overlay');

// Toggle menu
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  overlay.classList.toggle('active');
});

// Fechar menu ao clicar no overlay
overlay.addEventListener('click', () => {
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
});

// Fechar menu ao clicar num link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    overlay.classList.remove('active');
  });
});


// Parte de colocar imagens a rodar
const images = [
    './img/1.jpg',
    './img/2.jpg',
    './img/3.jpg',
    './img/4.jpg',
    './img/5.jpg',
    './img/foto_povoa.jpg',
];

let current = 0;
const heroBg = document.querySelector('.hero-bg');
function changeImage() {
    heroBg.style.backgroundImage = `url(${images[current]})`;
    current = (current + 1) % images.length;
}

changeImage(); // Set initial image
setInterval(changeImage, 6000); // Change image every 5 seconds

// Carrossel premium do interior
const carouselImgs = document.querySelectorAll('.carousel-img');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');
let carouselIndex = 0;

function showCarouselImg(idx) {
  carouselImgs.forEach((img, i) => {
    img.classList.toggle('active', i === idx);
  });
}

if (carouselImgs.length) {
  showCarouselImg(carouselIndex);

  prevBtn.addEventListener('click', () => {
    carouselIndex = (carouselIndex - 1 + carouselImgs.length) % carouselImgs.length;
    showCarouselImg(carouselIndex);
  });

  nextBtn.addEventListener('click', () => {
    carouselIndex = (carouselIndex + 1) % carouselImgs.length;
    showCarouselImg(carouselIndex);
  });
}
