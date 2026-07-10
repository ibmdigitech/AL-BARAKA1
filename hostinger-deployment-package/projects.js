document.addEventListener('DOMContentLoaded', function() {
    // Project Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Carousel Functionality
    const carouselTrack = document.querySelector('.carousel-track');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    
    if (!carouselTrack || !slides.length || !prevBtn || !nextBtn || !indicatorsContainer) {
        console.warn('Carousel not initialized - missing elements:', {
            carouselTrack, slides: slides.length, prevBtn, nextBtn, indicatorsContainer
        });
        return;
    }
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    const autoPlayDelay = 5000;
    
    // Ensure all slides have proper styling
    slides.forEach((slide, index) => {
        slide.style.flex = '0 0 100%';
        slide.style.minWidth = '100%';
        if (index === 0) slide.classList.add('active');
    });
    
    // Create indicators
    slides.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator' + (index === 0 ? ' active' : '');
        indicator.addEventListener('click', () => goToSlide(index));
        indicatorsContainer.appendChild(indicator);
    });
    
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    
    function updateCarousel(index) {
        const offsetPercent = -(index * 100);
        carouselTrack.style.transform = `translateX(${offsetPercent}%)`;
        
        slides.forEach(s => s.classList.remove('active'));
        slides[index].classList.add('active');
        
        indicators.forEach(ind => ind.classList.remove('active'));
        indicators[index].classList.add('active');
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel(currentIndex);
        resetAutoPlay();
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel(currentIndex);
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel(currentIndex);
    }
    
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
    }
    
    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }
    
    // Event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') { nextSlide(); resetAutoPlay(); }
        if (e.key === 'ArrowLeft') { prevSlide(); resetAutoPlay(); }
    });
    
    // Hover pause
    const carouselContainer = carouselTrack.closest('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => clearInterval(autoPlayInterval));
        carouselContainer.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Touch support
    let touchStart = 0;
    carouselTrack.addEventListener('touchstart', (e) => {
        touchStart = e.touches[0].clientX;
    });
    carouselTrack.addEventListener('touchend', (e) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) { nextSlide(); resetAutoPlay(); }
        if (touchEnd - touchStart > 50) { prevSlide(); resetAutoPlay(); }
    });
    
    // Initialize
    slides.forEach(slide => {
        const image = slide.querySelector('img');
        if (!image) return;
        image.addEventListener('error', () => {
            slide.classList.add('img-error');
            image.style.display = 'none';
            if (!slide.querySelector('.carousel-fallback')) {
                const fallback = document.createElement('div');
                fallback.className = 'carousel-fallback';
                fallback.innerHTML = '<i class="fas fa-image"></i><span>Project image unavailable</span>';
                slide.appendChild(fallback);
            }
        });
    });

    updateCarousel(0);
    startAutoPlay();
    
    console.log('Carousel initialized with', totalSlides, 'slides');
});
