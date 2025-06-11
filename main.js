/**
 * Yoo's Game - Main JavaScript
 * Menambahkan interaktivitas dan animasi untuk tampilan game
 */

// Tunggu hingga dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah ada redirect otomatis yang terjadi
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const currentPage = window.location.pathname.split('/').pop();
    
    // Jika ini adalah halaman index dan ada parameter noredirect, hapus dari session storage
    if (currentPage === 'index.html' || currentPage === '') {
        sessionStorage.removeItem('redirected');
    }
    // ===== NAVIGASI MOBILE =====
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Toggle menu mobile
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Tutup menu saat link diklik
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });
    
    // ===== SLIDER =====
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;
    
    // Fungsi untuk menampilkan slide
    function showSlide(n) {
        // Hapus kelas active dari semua slide
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Hapus kelas active dari semua dot
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Tampilkan slide aktif
        slides[n].classList.add('active');
        dots[n].classList.add('active');
    }
    
    // Fungsi untuk slide berikutnya
    function nextSlide() {
        currentSlide++;
        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }
    
    // Fungsi untuk slide sebelumnya
    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }
        showSlide(currentSlide);
    }
    
    // Event listener untuk tombol next
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            resetInterval();
        });
    }
    
    // Event listener untuk tombol prev
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            resetInterval();
        });
    }
    
    // Event listener untuk dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
            resetInterval();
        });
    });
    
    // Fungsi untuk reset interval
    function resetInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    // Fungsi untuk memulai interval slide
    function startSlideInterval() {
        slideInterval = setInterval(function() {
            if (document.visibilityState === 'visible') {
                nextSlide();
            }
        }, 8000);
    }
    
    // Mulai interval slide otomatis
    startSlideInterval();
    
    // Reset interval saat tab menjadi aktif
    document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
            resetInterval();
        } else {
            clearInterval(slideInterval);
        }
    });
    
    // ===== ANIMASI SCROLL =====
    // Animasi elemen saat di-scroll dengan throttling
    let scrollTimeout;
    const animateOnScroll = function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                
                const sections = document.querySelectorAll('.game-section');
                
                sections.forEach(section => {
                    const sectionTop = section.getBoundingClientRect().top;
                    const windowHeight = window.innerHeight;
                    
                    if (sectionTop < windowHeight * 0.75) {
                        section.classList.add('visible');
                    }
                });
            }, 100);
        }
    };
    
    // Jalankan animasi saat scroll dengan passive listener
    window.addEventListener('scroll', animateOnScroll, { passive: true });
    
    // Jalankan sekali saat halaman dimuat
    animateOnScroll();
    
    // ===== EFEK HOVER PADA KARTU =====
    // Hanya aktifkan efek hover pada desktop
    if (window.matchMedia('(min-width: 768px)').matches) {
        const cards = document.querySelectorAll('.game-card, .feature-card, .feature-item');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.6)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.boxShadow = '';
            });
        });
    }
    
    // ===== FORM VALIDASI =====
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Validasi sederhana
            if (!name || !email || !message) {
                alert('Mohon isi semua field!');
                return;
            }
            
            // Simulasi pengiriman form
            alert(`Terima kasih ${name}! Pesan Anda telah dikirim.`);
            contactForm.reset();
        });
    }
});