new Swiper(".wrapper", {
  loop: true,
  spaceBetween: 30,

  // Autoplay
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },

  // Pagination bullets
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // Responsive breakpoints
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});


function generateOrderId() {
    const timestamp = Date.now();
    const randomNum = Math.floor(Math.random() * 10000);
    const paddedRandomNum = randomNum.toString().padStart(4, '0');
    return `ORD-${timestamp}-${paddedRandomNum}`;
  }

  document.getElementById('buyNowBtn').addEventListener('click', () => {
    const orderId = generateOrderId();
    // Redirect to checkout page with orderId and product info as URL params
    const productName = encodeURIComponent("Rockstar Games Themed Template");
    const amount = encodeURIComponent("49.99");
    window.location.href = `buy-product-1.html?orderId=${orderId}&product=${productName}&amount=${amount}`;
  });

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get modal elements
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImg");
  var captionText = document.getElementById("caption");
  var closeBtn = document.getElementsByClassName("close")[0];

  // Attach click event to all images inside .card-image
  document.querySelectorAll('.card-image img').forEach(function(img) {
    img.style.cursor = 'pointer';
    img.onclick = function() {
      modal.style.display = "block";
      modalImg.src = this.src;
      captionText.innerHTML = this.alt || '';
    }
  });

  // Close modal when clicking on <span> (x)
  closeBtn.onclick = function() { 
    modal.style.display = "none";
  }

  // Optional: Close modal when clicking outside the image
  modal.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const modal = document.getElementById('imageModal');
  const closeBtn = modal.querySelector('.close');
  const swiperWrapper = modal.querySelector('.swiper-wrapper');
  let modalSwiper;

  // Collect all images inside .card-image containers
  const galleryImages = document.querySelectorAll('.card-image img');

  // Create slides array from gallery images (src and alt)
  const slidesData = Array.from(galleryImages).map(img => ({
    src: img.src,
    alt: img.alt || ''
  }));

  // Populate modal swiper slides dynamically
  function populateSlides() {
    swiperWrapper.innerHTML = '';
    slidesData.forEach(({src, alt}) => {
      const slide = document.createElement('div');
      slide.classList.add('swiper-slide');
      slide.innerHTML = `<img src="${src}" alt="${alt}">`;
      swiperWrapper.appendChild(slide);
    });
  }

  // Initialize Swiper inside modal
  function initModalSwiper() {
    if (modalSwiper) modalSwiper.destroy(true, true); // destroy previous instance if any

    modalSwiper = new Swiper('.modal-swiper', {
      loop: true,
      navigation: {
        nextEl: '.modal-swiper .swiper-button-next',
        prevEl: '.modal-swiper .swiper-button-prev',
      },
      pagination: {
        el: '.modal-swiper .swiper-pagination',
        clickable: true,
      },
      keyboard: {
        enabled: true,
      },
      spaceBetween: 20,
      slidesPerView: 1,
      centeredSlides: true,
    });
  }

  // Open modal and slide to clicked image index
  galleryImages.forEach((img, index) => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => {
      populateSlides();
      initModalSwiper();
      modal.style.display = 'block';
      modalSwiper.slideToLoop(index, 0); // slideToLoop respects looped slides
      document.body.style.overflow = 'hidden'; // prevent background scroll
    });
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  });

  // Close modal when clicking outside the swiper container
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
  });
});


// ===== Video Modal =====
const videoBox = document.querySelector('.video-box video');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeVideoModal = document.querySelector('.video-modal .close');

modalVideo.volume = 0.5;

videoBox.addEventListener('click', () => {
  videoModal.style.display = 'flex';
  modalVideo.currentTime = 0; // restart video each time
  modalVideo.play();
});

closeVideoModal.addEventListener('click', () => {
  videoModal.style.display = 'none';
  modalVideo.pause();
});

// Optional: close modal if user clicks outside the video
window.addEventListener('click', (e) => {
  if (e.target === videoModal) {
    videoModal.style.display = 'none';
    modalVideo.pause();
  }
});
