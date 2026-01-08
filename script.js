document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Efeito de Menu ---
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. Menu Mobile Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if(menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if(navLinks.classList.contains('active')){
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 992) {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- 3. Carrossel de Reviews ---
    const track = document.getElementById('reviewsTrack');
    const cards = document.querySelectorAll('.review-card-google');
    const dots = document.querySelectorAll('.dot');
    
    if (track && cards.length > 0) {
        let currentSlide = 0;
        const totalSlides = cards.length;
        
        const updateCarousel = () => {
            const trackStyle = window.getComputedStyle(track);
            const gap = parseFloat(trackStyle.gap) || 0;
            const cardWidth = cards[0].offsetWidth;
            const moveSize = cardWidth + gap;

            track.style.transform = `translateX(-${currentSlide * moveSize}px)`;
            
            dots.forEach((dot, index) => {
                if(index === currentSlide) dot.classList.add('active');
                else dot.classList.remove('active');
            });
        };

        const nextSlide = () => {
            const containerWidth = document.querySelector('.reviews-viewport').offsetWidth;
            const cardWidth = cards[0].offsetWidth;
            const visibleCards = Math.floor(containerWidth / cardWidth);
            
            if (currentSlide >= totalSlides - visibleCards) {
                currentSlide = 0;
            } else {
                currentSlide++;
            }
            updateCarousel();
        };

        setInterval(nextSlide, 3000);
        window.addEventListener('resize', updateCarousel);
    }

    // --- 4. Smooth Scroll ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if(href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 90; 
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // --- 5. Voltar ao Topo ---
    const backToTopBtn = document.getElementById('backToTopBtn');
    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});