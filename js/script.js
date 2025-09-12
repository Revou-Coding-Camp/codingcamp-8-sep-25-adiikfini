document.addEventListener("DOMContentLoaded", function () {
  // ===LOGIKA LAYAR PENYAMBUT (WELCOME SCREEN)
  const welcomeScreen = document.getElementById("welcome-screen");
  const mainApp = document.getElementById("main-app");
  const nameInput = document.getElementById("name-input");
  const enterButton = document.getElementById("enter-button");
  const userNameElement = document.getElementById("user-name");

  const enterHomepage = (name) => {
    if (userNameElement) {
        userNameElement.textContent = name;
    }
    if (welcomeScreen) {
        welcomeScreen.classList.add('hidden');
    }
    if (mainApp) {
        mainApp.classList.remove('hidden');
    }
    //Panggil fungsi untuk menginisialisasi carousel SETELAH homepage ditampilkan
    initializeCarousel();
  };

  const savedName = localStorage.getItem('userName');
  if (savedName) {
    // Jika nama sudah tersimpan, langsung tampilkan homepage
    enterHomepage(savedName);
  } else if (welcomeScreen) {
    // Hanya tampilkan welcome screen jika nama belum tersimpan
    welcomeScreen.classList.remove('hidden');
  }


  if (enterButton) {
    enterButton.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name) {
            localStorage.setItem('userName', name);
            enterHomepage(name);
        } else {
            alert("Harap masukkan nama Anda.");
        }
    });
  }

  if (nameInput) {
    nameInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            enterButton.click();
        }
    });
  }

  // ===LOGIKA CAROUSEL SEPENUHNYA RESPONSIF
  const initializeCarousel = () => {
    const carousel = document.querySelector(".layanan-carousel");
    if (!carousel) return; // Hentikan jika carousel tidak ada di halaman

    const track = carousel.querySelector(".carousel-track");
    const originalSlides = Array.from(track.children);
    const nextButton = carousel.querySelector(".carousel-arrow.right");
    const prevButton = carousel.querySelector(".carousel-arrow.left");

    let isTransitioning = false;
    let autoplayInterval;
    let slidesToShow = 4;
    let currentIndex = 0;
    let step = 0;

    const updateSlidesToShow = () => {
      if (window.matchMedia("(max-width: 480px)").matches) {
        slidesToShow = 1;
      } else if (window.matchMedia("(max-width: 768px)").matches) {
        slidesToShow = 2;
      } else {
        slidesToShow = 4;
      }
    };

    const setupCarousel = () => {
      updateSlidesToShow();
      const clones = track.querySelectorAll('[data-clone="true"]');
      clones.forEach(clone => clone.remove());
      
      if (originalSlides.length === 0) return;

      // Kloning slide berdasarkan slidesToShow
      for (let i = 0; i < slidesToShow; i++) {
        if (!originalSlides[i]) continue;
        const clone = originalSlides[i].cloneNode(true);
        clone.setAttribute('data-clone', 'true');
        track.appendChild(clone);
      }
      for (let i = originalSlides.length - 1; i >= originalSlides.length - slidesToShow; i--) {
        if (!originalSlides[i]) continue;
        const clone = originalSlides[i].cloneNode(true);
        clone.setAttribute('data-clone', 'true');
        track.prepend(clone);
      }

      currentIndex = slidesToShow;
      const slideWidth = originalSlides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      step = slideWidth + gap;

      track.style.transition = "none";
      track.style.transform = `translateX(-${step * currentIndex}px)`;

      if (originalSlides.length <= slidesToShow) {
        nextButton.style.display = 'none';
        prevButton.style.display = 'none';
      } else {
        nextButton.style.display = 'block';
        prevButton.style.display = 'block';
      }
    };

    const moveToSlide = (index) => {
      if (isTransitioning) return;
      isTransitioning = true;
      track.style.transition = "transform 0.5s ease-in-out";
      track.style.transform = `translateX(-${step * index}px)`;
      currentIndex = index;
    };
    
    nextButton.addEventListener("click", () => moveToSlide(currentIndex + 1));
    prevButton.addEventListener("click", () => moveToSlide(currentIndex - 1));

    track.addEventListener("transitionend", () => {
      isTransitioning = false;
      if (currentIndex >= originalSlides.length + slidesToShow) {
        track.style.transition = "none";
        currentIndex = slidesToShow;
        track.style.transform = `translateX(-${step * currentIndex}px)`;
      }
      if (currentIndex < slidesToShow) {
        track.style.transition = "none";
        currentIndex = originalSlides.length + slidesToShow - 1;
        track.style.transform = `translateX(-${step * currentIndex}px)`;
      }
    });

    const startAutoplay = () => {
      stopAutoplay();
      autoplayInterval = setInterval(() => nextButton.click(), 3000);
    };
    const stopAutoplay = () => clearInterval(autoplayInterval);

    setupCarousel();
    window.addEventListener("resize", setupCarousel);
    
    startAutoplay();
    carousel.addEventListener("mouseenter", stopAutoplay);
    carousel.addEventListener("mouseleave", startAutoplay);
  };

  // === LOGIKA FORM BIODATA
  const biodataForm = document.getElementById('biodata-form');
  const formOutput = document.getElementById('form-output');
  const outputContent = document.getElementById('output-content');

  if (biodataForm) {
    biodataForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const birthdate = document.getElementById('birthdate').value;
        const message = document.getElementById('message').value.trim();
        const genderElement = document.querySelector('input[name="gender"]:checked');
        
        if (!name || !birthdate || !genderElement || !message) {
            alert('Harap isi semua kolom.');
            return;
        }

        const gender = genderElement.value;
        const formattedDate = new Date(birthdate).toLocaleDateString('id-ID', {
            day: 'numeric', month: 'long', year: 'numeric'
        });

        const outputText = `Nama           : ${name}\nTanggal Lahir  : ${formattedDate}\nJenis Kelamin  : ${gender}\nPesan          : ${message}`;

        outputContent.textContent = outputText;
        formOutput.classList.remove('hidden');
        formOutput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        biodataForm.reset();
    });
  }

  // LOGIKA SMOOTH SCROLLING

  const navLinks = document.querySelectorAll('header a[href^="#"]');

  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          const targetSection = document.querySelector(targetId);

          if (targetSection) {
              targetSection.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });

  //LOGIKA ACTIVE NAVIGATION ON SCROLL
  const sections = document.querySelectorAll('main section[id]');
  const navLi = document.querySelectorAll('header ul li a');

  const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6 // 60% dari section harus terlihat
  };

  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              navLi.forEach(link => {
                  link.classList.remove('active');
              });
              const activeLink = document.querySelector(`header a[href="#${entry.target.id}"]`);
              if (activeLink) {
                  activeLink.classList.add('active');
              }
          }
      });
  }, observerOptions);

  sections.forEach(section => {
      observer.observe(section);
  });

});