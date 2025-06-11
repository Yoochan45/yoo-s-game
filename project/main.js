/**
 * Yoo's Game - Main JavaScript
 * Menambahkan interaktivitas dan animasi untuk tampilan game
 */

// Tunggu hingga dokumen selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Event listener untuk tombol next
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        });
    }
    
    // Event listener untuk tombol prev
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentSlide--;
            if (currentSlide < 0) {
                currentSlide = slides.length - 1;
            }
            showSlide(currentSlide);
        });
    }
    
    // Event listener untuk dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto slide setiap 5 detik
    setInterval(function() {
        if (document.visibilityState === 'visible') {
            currentSlide++;
            if (currentSlide >= slides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }
    }, 5000);
    
    // ===== TOMBOL START GAME =====
    const startGameBtn = document.getElementById('start-game');
    if (startGameBtn) {
        startGameBtn.addEventListener('click', function() {
            // Efek klik tombol
            this.classList.add('clicked');
            
            // Tampilkan pesan game dimulai
            alert('Game dimulai! Selamat bermain!');
            
            // Hapus kelas setelah animasi selesai
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
        });
    }
    
    // ===== ANIMASI SCROLL =====
    // Animasi elemen saat di-scroll
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.game-section');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    };
    
    // Jalankan animasi saat scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Jalankan sekali saat halaman dimuat
    animateOnScroll();
    
    // ===== EFEK HOVER PADA KARTU =====
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

// ===== EFEK PARTIKEL BACKGROUND =====
// Fungsi untuk membuat efek partikel di latar belakang (opsional, dapat diaktifkan jika diinginkan)
function createParticles() {
    const body = document.querySelector('body');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    
    body.appendChild(particlesContainer);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Posisi acak
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Ukuran acak
        const size = Math.random() * 5 + 1;
        
        // Kecepatan animasi acak
        const duration = Math.random() * 20 + 10;
        
        particle.style.left = posX + '%';
        particle.style.top = posY + '%';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = duration + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// Aktifkan efek partikel jika diinginkan
// createParticles();