document.addEventListener('DOMContentLoaded', () => {
    
    // Preloader
    const loader = document.getElementById('loader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => loader.style.display = 'none', 500);
        }, 1000);
    });

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        
        cursor.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        }, { duration: 100, fill: "forwards" });

        follower.animate({
            left: `${clientX}px`,
            top: `${clientY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Magnetic Buttons & Hover Effects
    const links = document.querySelectorAll('a, button, .premium-card, .glass-card');
    links.forEach(link => {
        link.addEventListener('mousemove', (e) => {
            if (link.classList.contains('btn-primary') || link.classList.contains('btn-outline')) {
                const rect = link.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                link.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
            }
        });

        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(2)';
            cursor.style.background = 'rgba(197, 160, 89, 0.1)';
            cursor.style.borderColor = 'var(--accent-gold)';
            follower.style.transform = 'translate(-50%, -50%) scale(0)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = '';
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.background = 'transparent';
            cursor.style.borderColor = 'var(--accent-gold)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });

    // Navbar Scroll & Progress bar
    const nav = document.querySelector('nav');
    const progressBar = document.getElementById('scroll-progress');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let current = 0;
                const increment = target / 100;
                const update = () => {
                    if (current < target) {
                        current += increment;
                        entry.target.innerText = Math.floor(current) + '+';
                        requestAnimationFrame(update);
                    } else {
                        entry.target.innerText = target + '+';
                    }
                };
                update();
                counterObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredElements = form.querySelectorAll('[required]');
            
            requiredElements.forEach(el => {
                if (!el.value.trim()) {
                    isValid = false;
                    el.style.borderColor = 'red';
                } else if (el.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value)) {
                    isValid = false;
                    el.style.borderColor = 'red';
                } else {
                    el.style.borderColor = 'var(--glass-border)';
                }
            });

            if (isValid) {
                const btn = form.querySelector('button[type="submit"]');
                const originalText = btn.innerHTML;
                btn.innerHTML = 'SENDING... <i class="fas fa-spinner fa-spin"></i>';
                btn.disabled = true;

                // Create success message element if it doesn't exist
                let msgDiv = form.querySelector('.submit-msg');
                if (!msgDiv) {
                    msgDiv = document.createElement('div');
                    msgDiv.className = 'submit-msg';
                    msgDiv.style.marginTop = '1rem';
                    msgDiv.style.padding = '1rem';
                    msgDiv.style.borderRadius = '8px';
                    msgDiv.style.fontWeight = '600';
                    msgDiv.style.textAlign = 'center';
                    form.appendChild(msgDiv);
                }
                msgDiv.style.display = 'none';

                // Simulate API Call
                setTimeout(() => {
                    btn.innerHTML = 'SENT <i class="fas fa-check"></i>';
                    
                    msgDiv.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! Your request has been received. Our team will contact you shortly.';
                    msgDiv.style.background = 'rgba(37, 211, 102, 0.1)';
                    msgDiv.style.color = '#25D366';
                    msgDiv.style.border = '1px solid #25D366';
                    msgDiv.style.display = 'block';

                    form.reset();
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                        msgDiv.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });

        // Remove red border on input
        form.querySelectorAll('input, textarea, select').forEach(el => {
            el.addEventListener('input', () => {
                el.style.borderColor = 'var(--glass-border)';
            });
            el.addEventListener('change', () => {
                el.style.borderColor = 'var(--glass-border)';
            });
        });
    });

});
