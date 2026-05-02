document.addEventListener('DOMContentLoaded', function() {
    // Project Filter Functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active state
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
    
    if (carouselTrack && slides.length > 0 && prevBtn && nextBtn && indicatorsContainer) {
        let currentIndex = 0;
        const totalSlides = slides.length;
        let autoPlayInterval;
        const autoPlayDelay = 5000; // 5 seconds
        
        // Update slide position (define first before use)
        const updateCarousel = (index) => {
            carouselTrack.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active classes for animations
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            
            // Update indicators
            const indicators = document.querySelectorAll('.indicator');
            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[index].classList.add('active');
        };
        
        const goToSlide = (index) => {
            currentIndex = index;
            updateCarousel(currentIndex);
            resetAutoPlay();
        };
        
        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel(currentIndex);
        };
        
        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel(currentIndex);
        };
        
        // Auto play functionality
        const startAutoPlay = () => {
            autoPlayInterval = setInterval(nextSlide, autoPlayDelay);
        };
        
        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };
        
        // Create indicators (after functions are defined)
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => goToSlide(index));
            indicatorsContainer.appendChild(indicator);
        });
        
        const indicators = document.querySelectorAll('.indicator');
        
        // Update slide position
        const updateCarousel = (index) => {
            carouselTrack.style.transform = `translateX(-${index * 100}%)`;
            
            // Update active classes for animations
            slides.forEach(slide => slide.classList.remove('active'));
            slides[index].classList.add('active');
            
            // Update indicators
            indicators.forEach(ind => ind.classList.remove('active'));
            indicators[index].classList.add('active');
        };
        
        const resetAutoPlay = () => {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        };
        
        // Event listeners
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                nextSlide();
                resetAutoPlay();
            } else if (e.key === 'ArrowLeft') {
                prevSlide();
                resetAutoPlay();
            }
        });
        
        // Pause on hover
        carouselTrack.parentElement.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carouselTrack.parentElement.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
        
        // Touch/Swipe support
        let touchStartX = 0;
        let touchEndX = 0;
        
        carouselTrack.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carouselTrack.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (touchStartX - touchEndX > swipeThreshold) {
                nextSlide();
                resetAutoPlay();
            } else if (touchEndX - touchStartX > swipeThreshold) {
                prevSlide();
                resetAutoPlay();
            }
        };
        
        // Initialize
        updateCarousel(0);
        startAutoPlay();
        
        // Ensure first slide is visible immediately
        setTimeout(() => {
            slides[0].classList.add('active');
        }, 100);
    } else {
        console.warn('Carousel elements not found');
    }
});
