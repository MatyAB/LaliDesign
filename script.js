document.addEventListener('DOMContentLoaded', () => {
    // Remove loading overlay
    setTimeout(() => {
        document.querySelector('.loading-overlay').style.opacity = '0';
        setTimeout(() => {
            document.querySelector('.loading-overlay').style.display = 'none';
        }, 500);
    }, 1000);

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Mega menu toggle for mobile
    const megaMenuTriggers = document.querySelectorAll('.mega-menu-trigger');
    
    megaMenuTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const megaMenu = trigger.querySelector('.mega-menu');
                megaMenu.classList.toggle('active');
            }
        });
    });

    // Search toggle
    const searchToggle = document.querySelector('.search-toggle');
    const searchBar = document.querySelector('.search-bar');
    const closeSearch = document.querySelector('.close-search');
    
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => {
            searchBar.style.display = 'block';
            setTimeout(() => {
                searchBar.querySelector('input').focus();
            }, 100);
        });
        
        if (closeSearch) {
            closeSearch.addEventListener('click', () => {
                searchBar.style.display = 'none';
            });
        }
    }

    // Product filtering
    const filterToggleBtn = document.getElementById('filter-toggle-btn');
    const filterSidebar = document.querySelector('.filter-sidebar');
    const closeFilters = document.querySelector('.close-filters');
    
    if (filterToggleBtn && filterSidebar) {
        filterToggleBtn.addEventListener('click', () => {
            filterSidebar.classList.toggle('active');
        });
        
        if (closeFilters) {
            closeFilters.addEventListener('click', () => {
                filterSidebar.classList.remove('active');
            });
        }
    }

    // Price range slider
    const rangeInputs = document.querySelectorAll('.range-slider input');
    const priceInputs = document.querySelectorAll('.price-inputs input');
    const progress = document.querySelector('.range-slider .progress');
    
    if (rangeInputs.length > 0) {
        let priceGap = 50;
        
        rangeInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let minVal = parseInt(rangeInputs[0].value);
                let maxVal = parseInt(rangeInputs[1].value);
                
                if ((maxVal - minVal) < priceGap) {
                    if (e.target.className === "min-price") {
                        rangeInputs[0].value = maxVal - priceGap;
                    } else {
                        rangeInputs[1].value = minVal + priceGap;
                    }
                } else {
                    priceInputs[0].value = minVal;
                    priceInputs[1].value = maxVal;
                    progress.style.left = (minVal / rangeInputs[0].max) * 100 + "%";
                    progress.style.right = 100 - (maxVal / rangeInputs[1].max) * 100 + "%";
                }
            });
        });
        
        priceInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let minVal = parseInt(priceInputs[0].value) || 0;
                let maxVal = parseInt(priceInputs[1].value) || 500;
                
                if ((maxVal - minVal) >= priceGap && maxVal <= rangeInputs[1].max) {
                    if (e.target.className === "input-min") {
                        rangeInputs[0].value = minVal;
                        progress.style.left = (minVal / rangeInputs[0].max) * 100 + "%";
                    } else {
                        rangeInputs[1].value = maxVal;
                        progress.style.right = 100 - (maxVal / rangeInputs[1].max) * 100 + "%";
                    }
                }
            });
        });
    }

    // Color filter selection
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            option.classList.toggle('active');
        });
    });

    // Quick view modal
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = document.querySelector('.quick-view-modal');
    const modalClose = document.querySelector('.modal-close');
    
    if (quickViewButtons.length > 0) {
        quickViewButtons.forEach(button => {
            button.addEventListener('click', () => {
                // In a real implementation, you would load product data here
                quickViewModal.classList.add('active');
                document.body.classList.add('no-scroll');
            });
        });
        
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                quickViewModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        }
        
        quickViewModal.addEventListener('click', (e) => {
            if (e.target === quickViewModal) {
                quickViewModal.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    // Wishlist toggle
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist, .wishlist-button');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            if (button.classList.contains('active')) {
                // Add to wishlist
                showToast('Added to wishlist');
            } else {
                // Remove from wishlist
                showToast('Removed from wishlist');
            }
        });
    });

    // Quantity selector
    const quantityMinus = document.querySelector('.quantity-selector button:first-child');
    const quantityPlus = document.querySelector('.quantity-selector button:last-child');
    const quantityInput = document.querySelector('.quantity-selector input');
    
    if (quantityMinus && quantityPlus && quantityInput) {
        quantityMinus.addEventListener('click', () => {
            let value = parseInt(quantityInput.value) || 1;
            if (value > 1) {
                quantityInput.value = value - 1;
            }
        });
        
        quantityPlus.addEventListener('click', () => {
            let value = parseInt(quantityInput.value) || 1;
            quantityInput.value = value + 1;
        });
    }

    // Toast notification
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart, .add-to-cart-large');
    const cartCount = document.querySelector('.cart-count');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            let count = parseInt(cartCount.textContent) || 0;
            cartCount.textContent = count + 1;
            showToast('Added to cart');
            
            // Animate cart icon
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.classList.add('animate');
            setTimeout(() => {
                cartIcon.classList.remove('animate');
            }, 500);
        });
    });

    // Product image gallery for quick view
    const thumbnails = document.querySelectorAll('.modal-thumbnail');
    const mainImage = document.querySelector('.modal-image-slide img');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked thumbnail
                thumbnail.classList.add('active');
                
                // Change main image
                mainImage.src = thumbnail.querySelector('img').src;
            });
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    image.src = image.dataset.src || image.src;
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(image => {
            imageObserver.observe(image);
        });
    }

    // Initialize product sliders
    initProductSliders();

    // Initialize Instagram feed
    initInstagramFeed();
});

// Product sliders initialization
function initProductSliders() {
    // This would be replaced with actual product data fetching in a real implementation
    console.log('Initialize product sliders');
}

// Instagram feed initialization
function initInstagramFeed() {
    // This would be replaced with Instagram API calls in a real implementation
    console.log('Initialize Instagram feed');
}

// Global function to open size guide modal
function openSizeGuide() {
    const modal = document.getElementById('size-guide-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.classList.add('no-scroll');
    }
}

// Global function to open custom design modal
function openCustomForm() {
    const modal = document.getElementById('custom-design-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.classList.add('no-scroll');
    }
}

// Global function to open stories
function openStories() {
    alert('Cultural Stories feature coming soon!');
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }
    });
});

// Close modals with escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.classList.remove('no-scroll');
            }
        });
    }
});
