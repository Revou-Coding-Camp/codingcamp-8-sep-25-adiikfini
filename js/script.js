document.addEventListener("DOMContentLoaded", function () {
  //DEKLARASI ELEMEN & FUNGSI UTAMA
  const welcomeScreen = document.getElementById("welcome-screen");
  const mainApp = document.getElementById("main-app");
  const nameInput = document.getElementById("name-input");
  const enterButton = document.getElementById("enter-button");
  const userNameElement = document.getElementById("user-name");
  const header = document.querySelector("header");
  const navLinks = document.querySelectorAll('header a[href^="#"]');
  const sections = document.querySelectorAll("main section[id]");


  // Panggil fungsi ini dari dalam enterHomepage
  const initializeTalentGrid = () => {
    const talentData = [
      {
        icon: "assets/icons/MobDev.png",
        title: "Mobile Developer",
        techLogos: [
          "assets/logos/Kotlin.png",
          "assets/logos/react.png",
          "assets/logos/fluter.png",
        ],
      },
      {
        icon: "assets/icons/Fe.png",
        title: "Front-End Developer",
        techLogos: [
          "assets/logos/react.png",
          "assets/logos/vue.png",
          "assets/logos/angular.png",
          "assets/logos/css.png",
        ],
      },
      {
        icon: "assets/icons/be.jpg",
        title: "Back-End Developer",
        techLogos: [
          "assets/logos/Go.png",
          "assets/logos/phyton.png",
          "assets/logos/nodejs.png",
          "assets/logos/java.png",
        ],
      },
      {
        icon: "assets/icons/Devops.jpg",
        title: "DevOps Engineer",
        techLogos: [
          "assets/logos/docker.png",
          "assets/logos/kobernetes.png",
          "assets/logos/Jenkins.png",
          "assets/logos/github.png",
        ],
      },
      {
        icon: "assets/icons/data.png",
        title: "Data Engineer",
        techLogos: [
          "assets/logos/Logo-talend.jpg",
          "assets/logos/phyton.png",
          "assets/logos/abinitio.png",
        ],
      },
      {
        icon: "assets/icons/design.png",
        title: "UI/UX Designer",
        techLogos: ["assets/logos/figma.jpg"],
      },
      {
        icon: "assets/icons/QA.png",
        title: "Quality Assurance",
        techLogos: ["assets/logos/katalon.jpeg", "assets/logos/selenium.png"],
      },
    ];

   
    if (!gridContainer) return; // Hentikan jika grid tidak ditemukan

    gridContainer.innerHTML = ""; // Kosongkan grid untuk mencegah duplikasi

    talentData.forEach((talent) => {
      const card = document.createElement("div");
      card.className = "talent-card";
      card.innerHTML = `
            <div class="card-header">
                <img src="${talent.icon}" alt="${
        talent.title
      } icon" class="header-icon">
                <h3>${talent.title}</h3>
            </div>
            <div class="card-body">
                ${talent.techLogos
                  .map(
                    (logoSrc) =>
                      `<img src="${logoSrc}" alt="Tech logo" class="tech-logo">`
                  )
                  .join("")}
            </div>
        `;
      gridContainer.appendChild(card);
    });
  };

  // --- Deklarasi Fungsi Carousel (Dipindahkan ke atas) ---
  const initializeCarousel = () => {
    const carousel = document.querySelector(".layanan-carousel");
    if (!carousel) return;

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
      } else if (window.matchMedia("(max-width: 992px)").matches) {
        slidesToShow = 2;
      } else {
        slidesToShow = 4;
      }
    };

    const setupCarousel = () => {
      updateSlidesToShow();
      const clones = track.querySelectorAll('[data-clone="true"]');
      clones.forEach((clone) => clone.remove());

      if (originalSlides.length === 0) return;

      for (let i = 0; i < slidesToShow; i++) {
        if (!originalSlides[i]) continue;
        const clone = originalSlides[i].cloneNode(true);
        clone.setAttribute("data-clone", "true");
        track.appendChild(clone);
      }
      for (
        let i = originalSlides.length - 1;
        i >= originalSlides.length - slidesToShow;
        i--
      ) {
        if (!originalSlides[i]) continue;
        const clone = originalSlides[i].cloneNode(true);
        clone.setAttribute("data-clone", "true");
        track.prepend(clone);
      }

      currentIndex = slidesToShow;
      const slideWidth = originalSlides[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      step = slideWidth + gap;

      track.style.transition = "none";
      track.style.transform = `translateX(-${step * currentIndex}px)`;

      if (originalSlides.length <= slidesToShow) {
        nextButton.style.display = "none";
        prevButton.style.display = "none";
      } else {
        nextButton.style.display = "block";
        prevButton.style.display = "block";
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

  // --- Fungsi Utama untuk Masuk ke Aplikasi ---
  const enterHomepage = (name) => {
    if (userNameElement) {
      userNameElement.textContent = name;
    }
    if (welcomeScreen) {
      welcomeScreen.classList.add("hidden");
    }
    if (mainApp) {
      mainApp.classList.remove("hidden");
    }
    // Sekarang panggilan ini valid karena fungsinya sudah dideklarasikan di atas
    initializeCarousel();
    initializeTalentGrid();
  };

  // === BAGIAN 2: LOGIKA EKSEKUSI AWAL & EVENT LISTENERS

  // --- Logika Welcome Screen ---
  const savedName = localStorage.getItem("userName");
  if (savedName) {
    enterHomepage(savedName);
  } else if (welcomeScreen) {
    welcomeScreen.classList.remove("hidden");
  }

  if (enterButton) {
    enterButton.addEventListener("click", () => {
      const name = nameInput.value.trim();
      if (name) {
        localStorage.setItem("userName", name);
        enterHomepage(name);
      } else {
        alert("Harap masukkan nama Anda.");
      }
    });
  }

  if (nameInput) {
    nameInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        enterButton.click();
      }
    });
  }

  // --- Logika Form Biodata ---
  const biodataForm = document.getElementById("biodata-form");
  const formOutput = document.getElementById("form-output");
  const outputContent = document.getElementById("output-content");

  if (biodataForm) {
    biodataForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value.trim();
      const birthdate = document.getElementById("birthdate").value;
      const message = document.getElementById("message").value.trim();
      const genderElement = document.querySelector(
        'input[name="gender"]:checked'
      );

      if (!name || !birthdate || !genderElement || !message) {
        alert("Harap isi semua kolom.");
        return;
      }

      const gender = genderElement.value;
      const formattedDate = new Date(birthdate).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const outputText = `Nama           : ${name}\nTanggal Lahir  : ${formattedDate}\nJenis Kelamin  : ${gender}\nPesan          : ${message}`;

      outputContent.textContent = outputText;
      formOutput.classList.remove("hidden");
      formOutput.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      biodataForm.reset();
    });
  }

  // --- Logika Smooth Scrolling ---
  // Fungsi terpusat untuk meng-highlight link yang aktif
  const activateLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.remove("active");
      // Mencocokkan href link dengan id section
      if (link.getAttribute("href") === `#${id}`) {
        link.classList.add("active");
      }
    });
  };

  // --- Logika untuk Smooth Scrolling saat Link di Klik ---
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerOffset = header.offsetHeight;
        const elementPosition = targetSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // --- Logika untuk Active Navigation saat Halaman di Scroll ---
  const observerOptions = {
    root: null,
    rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
    threshold: 0.6, 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        activateLink(entry.target.id);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });
});
