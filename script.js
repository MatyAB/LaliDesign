document.addEventListener('DOMContentLoaded', () => {

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
    }

    // Product Gallery
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');
    if (mainImage && thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                mainImage.src = this.dataset.image;
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    // Product Details Accordion
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const openItem = document.querySelector('.accordion-item.active');
            if (openItem && openItem !== item) {
                openItem.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // Simple Quantity Selector (for product page, cart, etc.)
    document.body.addEventListener('click', function(e) {
        if (e.target.matches('.quantity-minus')) {
            const input = e.target.nextElementSibling;
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        }
        if (e.target.matches('.quantity-plus')) {
            const input = e.target.previousElementSibling;
            let value = parseInt(input.value);
            input.value = value + 1;
        }
    });

    // Checkout Form Multi-Step Logic (Example)
    const steps = document.querySelectorAll('.checkout-steps .step');
    const sections = document.querySelectorAll('.checkout-form .checkout-section');
    const nextButtons = document.querySelectorAll('.next-step');
    const prevButtons = document.querySelectorAll('.prev-step');

    function goToStep(stepNumber) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index < stepNumber);
        });
        sections.forEach(section => {
            section.style.display = 'none';
        });
        const currentSection = document.querySelector(`.checkout-section[data-section="${stepNumber}"]`);
        if (currentSection) currentSection.style.display = 'block';
    }

    if (steps.length > 0) {
        nextButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const nextStep = parseInt(e.target.dataset.next);
                goToStep(nextStep);
            });
        });

        prevButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const prevStep = parseInt(e.target.dataset.prev);
                goToStep(prevStep);
            });
        });
        // Initialize on first step
        goToStep(1);
    }
});