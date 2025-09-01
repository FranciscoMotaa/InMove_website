// Fade-in ao entrar na viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Aplica animação a todas as secções
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = 0;
  section.style.transform = "translateY(40px)";
  observer.observe(section);
});

// Botão de scroll para o topo (opcional)
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = `<i class="fas fa-arrow-up"></i>`;
scrollBtn.id = "scrollTopBtn";
document.body.appendChild(scrollBtn);

scrollBtn.style.display = "none";
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

// Animação de entrada no hero
window.addEventListener("load", () => {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.opacity = 1;
    heroContent.style.transform = "translateY(0)";
  }
});

// parte do phone
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const overlay = document.getElementById("overlay");

// Toggle menu
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  overlay.classList.toggle("active");
});

// Fechar menu ao clicar no overlay
overlay.addEventListener("click", () => {
  navLinks.classList.remove("open");
  overlay.classList.remove("active");
});

// Fechar menu ao clicar num link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    overlay.classList.remove("active");
  });
});

// Parte de colocar imagens a rodar
const images = [
  "./img/img_slide/1.jpeg",
  "./img/img_slide/2.jpeg",
  "./img/img_slide/3.jpeg",  
  "./img/img_slide/5.jpeg",
  "./img/img_slide/6.jpeg",
  "./img/img_slide/7.jpeg",
];

let current = 0;
const heroBg = document.querySelector(".hero-bg");
function changeImage() {
  heroBg.style.backgroundImage = `url(${images[current]})`;
  current = (current + 1) % images.length;
}

changeImage(); // Set initial image
setInterval(changeImage, 6000); // Change image every 5 seconds

// Carrossel premium do interior
const carouselImgs = document.querySelectorAll(".carousel-img");
const prevBtn = document.querySelector(".carousel-btn.prev");
const nextBtn = document.querySelector(".carousel-btn.next");
let carouselIndex = 0;

function showCarouselImg(idx) {
  carouselImgs.forEach((img, i) => {
    img.classList.toggle("active", i === idx);
  });
}

if (carouselImgs.length) {
  showCarouselImg(carouselIndex);

  prevBtn.addEventListener("click", () => {
    carouselIndex =
      (carouselIndex - 1 + carouselImgs.length) % carouselImgs.length;
    showCarouselImg(carouselIndex);
  });

  nextBtn.addEventListener("click", () => {
    carouselIndex = (carouselIndex + 1) % carouselImgs.length;
    showCarouselImg(carouselIndex);
  });
}

// Lightbox para galeria
const galeriaImgs = Array.from(document.querySelectorAll(".galeria-img"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");
const lightboxPrev = document.querySelector(".lightbox-prev");
const lightboxNext = document.querySelector(".lightbox-next");
let lightboxIndex = 0;
let isZoomed = false;

function openLightbox(idx) {
  lightboxIndex = idx;
  lightboxImg.src = galeriaImgs[lightboxIndex].src;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden"; // Bloqueia scroll
  isZoomed = false;
  lightboxImg.classList.remove("zoomed");
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  isZoomed = false;
  lightboxImg.classList.remove("zoomed");
}

function showPrev() {
  lightboxIndex = (lightboxIndex - 1 + galeriaImgs.length) % galeriaImgs.length;
  lightboxImg.src = galeriaImgs[lightboxIndex].src;
  isZoomed = false;
  lightboxImg.classList.remove("zoomed");
}

function showNext() {
  lightboxIndex = (lightboxIndex + 1) % galeriaImgs.length;
  lightboxImg.src = galeriaImgs[lightboxIndex].src;
  isZoomed = false;
  lightboxImg.classList.remove("zoomed");
}

galeriaImgs.forEach((img, idx) => {
  img.addEventListener("click", () => openLightbox(idx));
});

lightboxClose.addEventListener("click", closeLightbox);
lightboxPrev.addEventListener("click", showPrev);
lightboxNext.addEventListener("click", showNext);

// Fechar ao clicar fora da imagem
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Zoom e pan ao clicar na imagem

let isDragging = false;
let startX = 0,
  startY = 0;
let currentX = 0,
  currentY = 0;
let zoomLevel = 1;
const minZoom = 1;
const maxZoom = 3.5;

function updateTransform() {
  lightboxImg.style.transform = `scale(${zoomLevel}) translate(${
    currentX / zoomLevel
  }px, ${currentY / zoomLevel}px)`;
}

// Zoom com scroll do rato ou clique esquerdo
lightboxImg.addEventListener("wheel", (e) => {
  if (!lightbox.classList.contains("active")) return;
  e.preventDefault();
  let delta = e.deltaY < 0 ? 0.15 : -0.15;
  let newZoom = zoomLevel + delta;
  newZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
  if (newZoom !== zoomLevel) {
    // Ajustar pan para manter o ponto do cursor
    const rect = lightboxImg.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    currentX = (currentX + offsetX) * (newZoom / zoomLevel) - offsetX;
    currentY = (currentY + offsetY) * (newZoom / zoomLevel) - offsetY;
    zoomLevel = newZoom;
    isZoomed = zoomLevel > 1;
    lightboxImg.classList.toggle("zoomed", isZoomed);
    updateTransform();
  }
});

// Clique esquerdo: zoom in se normal, zoom out se já ampliado
lightboxImg.addEventListener("click", (e) => {
  e.stopPropagation();
  if (zoomLevel === 1) {
    zoomLevel = 1.7;
    isZoomed = true;
    lightboxImg.classList.add("zoomed");
    updateTransform();
  } else {
    // Zoom out
    zoomLevel = 1;
    isZoomed = false;
    lightboxImg.classList.remove("zoomed");
    currentX = 0;
    currentY = 0;
    updateTransform();
  }
});

// Pan só enquanto o botão esquerdo está pressionado e imagem está ampliada
lightboxImg.addEventListener("mousedown", (e) => {
  if (zoomLevel === 1) return;
  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
  lightboxImg.style.cursor = "grabbing";
});

// Pan só enquanto o botão esquerdo está pressionado sobre a imagem
lightboxImg.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  updateTransform();
});

lightboxImg.addEventListener("mouseleave", () => {
  if (!isDragging) return;
  isDragging = false;
  lightboxImg.style.cursor = zoomLevel > 1 ? "zoom-out" : "zoom-in";
});

lightboxImg.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  lightboxImg.style.cursor = zoomLevel > 1 ? "zoom-out" : "zoom-in";
});

lightboxImg.addEventListener("mousedown", (e) => {
  if (zoomLevel === 1) return;
  isDragging = true;
  startX = e.clientX - currentX;
  startY = e.clientY - currentY;
  lightboxImg.style.cursor = "grabbing";
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  currentX = e.clientX - startX;
  currentY = e.clientY - startY;
  updateTransform();
});

document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  lightboxImg.style.cursor = zoomLevel > 1 ? "zoom-out" : "zoom-in";
});

// Zoom com scroll do rato
lightboxImg.addEventListener("wheel", (e) => {
  if (!lightbox.classList.contains("active")) return;
  e.preventDefault();
  let delta = e.deltaY < 0 ? 0.15 : -0.15;
  let newZoom = zoomLevel + delta;
  newZoom = Math.max(minZoom, Math.min(maxZoom, newZoom));
  if (newZoom !== zoomLevel) {
    // Ajustar pan para manter o ponto do cursor
    const rect = lightboxImg.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    currentX = (currentX + offsetX) * (newZoom / zoomLevel) - offsetX;
    currentY = (currentY + offsetY) * (newZoom / zoomLevel) - offsetY;
    zoomLevel = newZoom;
    isZoomed = zoomLevel > 1;
    lightboxImg.classList.toggle("zoomed", isZoomed);
    updateTransform();
  }
});

// Reset pan/zoom ao mudar de imagem ou fechar
function resetZoomPan() {
  isZoomed = false;
  currentX = 0;
  currentY = 0;
  zoomLevel = 1;
  lightboxImg.classList.remove("zoomed");
  updateTransform();
}

// Atualizar funções existentes para resetar pan/zoom
function openLightbox(idx) {
  lightboxIndex = idx;
  lightboxImg.src = galeriaImgs[lightboxIndex].src;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden"; // Bloqueia scroll
  resetZoomPan();
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  resetZoomPan();
}

function showPrev() {
  lightboxIndex = (lightboxIndex - 1 + galeriaImgs.length) % galeriaImgs.length;
  lightboxImg.src = galeriaImgs[lightboxIndex].src;
  resetZoomPan();
}

function showNext() {
  lightboxIndex = (lightboxIndex + 1) % galeriaImgs.length;
  lightboxImg.src = galeriaImgs[lightboxIndex].src;
  resetZoomPan();
}

// Navegação com teclado
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "ArrowLeft") showPrev();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "Escape") closeLightbox();
  if (e.key === "z") {
    isZoomed = !isZoomed;
    lightboxImg.classList.toggle("zoomed", isZoomed);
  }
});
