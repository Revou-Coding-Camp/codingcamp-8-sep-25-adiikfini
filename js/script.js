document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-arrow.right');
  const prevButton = document.querySelector('.carousel-arrow.left');

  // Dapatkan lebar dari satu slide
  const slideWidth = slides[0].getBoundingClientRect().width;

  // State: untuk melacak posisi slide saat ini
  let currentIndex = 0;

  // Fungsi untuk menggeser track
  const moveToSlide = (index) => {
    track.style.transform = 'translateX(-' + slideWidth * index + 'px)';
    currentIndex = index;
  };

  // Fungsi untuk memperbarui status tombol (aktif/nonaktif)
  const updateArrows = (index) => {
    // Tombol kiri nonaktif jika di slide pertama
    prevButton.disabled = index === 0;
    // Tombol kanan nonaktif jika di slide terakhir
    nextButton.disabled = index === slides.length - 1;
  };

  // Saat tombol kanan diklik
  nextButton.addEventListener('click', () => {
    // Jika bukan slide terakhir, geser ke slide berikutnya
    if (currentIndex < slides.length - 1) {
      const newIndex = currentIndex + 1;
      moveToSlide(newIndex);
      updateArrows(newIndex);
    }
  });

  // Saat tombol kiri diklik
  prevButton.addEventListener('click', () => {
    // Jika bukan slide pertama, geser ke slide sebelumnya
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      moveToSlide(newIndex);
      updateArrows(newIndex);
    }
  });

  // Inisialisasi posisi awal dan status tombol
  moveToSlide(0);
  updateArrows(0);
});