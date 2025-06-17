document.addEventListener('DOMContentLoaded', () => {

    // --- Hero Slideshow ---
    const heroSection = document.querySelector('.hero');
    const heroTitle = document.getElementById('hero-title');
    const heroSubtitle = document.getElementById('hero-subtitle');
    const heroDescription = document.getElementById('hero-description');
    const heroTextElements = document.querySelectorAll('.hero-text-element'); // Select all text elements
    const indicators = document.querySelectorAll('.indicator');
    const arrowLeft = document.getElementById('hero-arrow-left');
    const arrowRight = document.getElementById('hero-arrow-right');
    
    const heroSlides = [
        {
            title: 'Embrace Your Heritage',
            subtitle: 'Timeless Oromo Designs',
            description: 'Discover our exclusive collection of handcrafted cultural attire, blending tradition with contemporary elegance. Each piece tells a story of identity and pride.',
            image: 'images/lali.webp',
            alt: 'Oromo Heritage Dress'
        },
        {
            title: 'Celebrate Tradition',
            subtitle: 'Modern Cultural Fashion',
            description: 'Experience the perfect blend of traditional craftsmanship and contemporary style. Our pieces honor the past while embracing the future of Oromo fashion.',
            image: 'images/dfa.jpg',
            alt: 'Oromo Modern Fashion'
        },
        {
            title: 'Handcrafted Excellence',
            subtitle: 'Artisan Made Attire',
            description: 'Every piece is carefully crafted by skilled artisans who preserve the authentic techniques passed down through generations of Oromo culture.',
            image: 'images/laldf.jpg',
            alt: 'Oromo Artisan Attire'
        }
    ];
    
    let currentSlide = 0;
    let slideInterval;
    
    function setHeroBackground(imageUrl) {
        heroSection.style.backgroundImage = `url('${imageUrl}')`;
    }
    
    function changeSlide(slideIndex) {
        indicators[currentSlide].classList.remove('active');
        // Fade out text elements
        heroTextElements.forEach(el => el.classList.add('fade-out'));
        
        setTimeout(() => {
            // Update background image and text
            setHeroBackground(heroSlides[slideIndex].image);
            heroTitle.textContent = heroSlides[slideIndex].title;
            heroSubtitle.textContent = heroSlides[slideIndex].subtitle;
            heroDescription.textContent = heroSlides[slideIndex].description;
            // Fade in text elements
            heroTextElements.forEach(el => el.classList.remove('fade-out'));
            
            currentSlide = slideIndex;
            indicators[currentSlide].classList.add('active');
        }, 500);
    }
    
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % heroSlides.length;
        changeSlide(nextIndex);
    }
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
        changeSlide(prevIndex);
    }
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopSlideshow();
            changeSlide(index);
            startSlideshow();
        });
    });
    if (arrowLeft) arrowLeft.addEventListener('click', () => { stopSlideshow(); prevSlide(); startSlideshow(); });
    if (arrowRight) arrowRight.addEventListener('click', () => { stopSlideshow(); nextSlide(); startSlideshow(); });
    heroSection.addEventListener('mouseenter', stopSlideshow);
    heroSection.addEventListener('mouseleave', startSlideshow);
    // Set initial background
    setHeroBackground(heroSlides[0].image);
    startSlideshow();

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // --- Region Filter Functionality ---
    const regionFilters = document.querySelectorAll('.product-filters a');
    const regionShowcase = document.getElementById('region-showcase');
    const regionTitle = document.getElementById('region-title');
    const regionDescription = document.getElementById('region-description');

    const regionData = {
        shewa: {
            title: 'Shewa Collection',
            description: 'Discover the elegant patterns and sophisticated designs that define Shewa\'s cultural heritage. Each piece is carefully crafted to honor tradition while embracing modern elegance.',
            image: 'images/lali.webp'
        },
        arsi: {
            title: 'Arsi Collection',
            description: 'Explore the bold and vibrant designs of Arsi region. These pieces reflect the strength and dignity of Arsi culture with their distinctive patterns and rich colors.',
            image: 'images/dfa.jpg'
        },
        wollega: {
            title: 'Wollega Collection',
            description: 'Experience the artistic brilliance of Wollega through our handwoven pieces. Each design showcases the region\'s unique color palette and intricate weaving techniques.',
            image: 'images/laldf.jpg'
        },
        accessories: {
            title: 'Accessories Collection',
            description: 'Complete your traditional look with our handcrafted accessories. From headpieces to jewelry, each piece adds the perfect finishing touch to your cultural ensemble.',
            image: 'images/laladf.jpg'
        }
    };

    regionFilters.forEach(filter => {
        filter.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all filters
            regionFilters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            filter.classList.add('active');
            
            // Get region data
            const region = filter.getAttribute('data-region');
            const data = regionData[region];
            
            if (data && regionShowcase && regionTitle && regionDescription) {
                // Update showcase with fade effect
                regionShowcase.style.opacity = '0';
                regionTitle.style.opacity = '0';
                regionDescription.style.opacity = '0';
                
                setTimeout(() => {
                    regionShowcase.src = data.image;
                    regionTitle.textContent = data.title;
                    regionDescription.textContent = data.description;
                    
                    regionShowcase.style.opacity = '1';
                    regionTitle.style.opacity = '1';
                    regionDescription.style.opacity = '1';
                }, 300);
            }
        });
    });

    // --- Modal Functionality ---
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close');

    // Close modal when clicking close button
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            modal.style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        modals.forEach(modal => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    // --- Review Slider ---
    const reviewCards = document.querySelectorAll('.review-card');
    const prevButton = document.getElementById('prev-review');
    const nextButton = document.getElementById('next-review');
    
    let currentReviewIndex = 0;

    function showReview(index) {
        // Hide all cards
        reviewCards.forEach(card => {
            card.classList.remove('active');
        });
        
        // Show the card at the specified index
        reviewCards[index].classList.add('active');
    }

    if (reviewCards.length > 0) {
        // Show the first review initially
        showReview(currentReviewIndex);

        nextButton.addEventListener('click', () => {
            currentReviewIndex++;
            if (currentReviewIndex >= reviewCards.length) {
                currentReviewIndex = 0; // Loop back to the first review
            }
            showReview(currentReviewIndex);
        });

        prevButton.addEventListener('click', () => {
            currentReviewIndex--;
            if (currentReviewIndex < 0) {
                currentReviewIndex = reviewCards.length - 1; // Loop back to the last review
            }
            showReview(currentReviewIndex);
        });
    }

    // --- Custom Design Form Submission ---
    const customDesignForm = document.querySelector('.custom-design-form');
    if (customDesignForm) {
        customDesignForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(customDesignForm);
            const designType = document.getElementById('design-type').value;
            const regionStyle = document.getElementById('region-style').value;
            const colorPreference = document.getElementById('color-preference').value;
            const designDescription = document.getElementById('design-description').value;
            const contactEmail = document.getElementById('contact-email').value;
            
            // Show success message (in a real app, this would send to a server)
            alert('Thank you for your custom design request! We will contact you at ' + contactEmail + ' within 24 hours to discuss your vision.');
            
            // Close modal and reset form
            document.getElementById('custom-design-modal').style.display = 'none';
            customDesignForm.reset();
        });
    }

    // --- Smooth Scrolling for Navigation Links ---
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Add loading animation to images ---
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });

    // --- Scroll to Top Button ---
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--accent-color);
        color: var(--secondary-color);
        border: none;
        cursor: pointer;
        font-size: 18px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Add hover effects to product cards ---
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
    });

    // --- Newsletter form enhancement ---
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            if (email) {
                alert('Thank you for subscribing! You\'ll receive 10% off your first order.');
                newsletterForm.reset();
            }
        });
    }

    // --- Add intersection observer for animations ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature-card, .product-card, .zone-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});

// --- Global Functions for Modal Opening ---
function openSizeGuide() {
    document.getElementById('size-guide-modal').style.display = 'block';
}

function openCustomForm() {
    document.getElementById('custom-design-modal').style.display = 'block';
}

function openStories() {
    alert('Cultural Stories feature coming soon! This will showcase the rich history and significance behind each design and pattern.');
}