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

    // Multi-image product card thumbnail switching
    document.body.addEventListener('click', function(e) {
        if (e.target.classList.contains('thumb')) {
            const card = e.target.closest('.multi-image-card');
            if (!card) return;
            const mainImg = card.querySelector('.main-card-image');
            mainImg.src = e.target.dataset.image;
            card.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
        }
    });

    // --- PAYMENT TAB SWITCHING ---
    document.querySelectorAll('.payment-method-tabs .tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.payment-method-tabs .tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const tab = this.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(tc => {
                tc.classList.toggle('active', tc.dataset.tab === tab);
            });
        });
    });

    // --- FORM VALIDATION ---
    function validateShipping() {
        let valid = true;
        document.querySelectorAll('.shipping-section [required]').forEach(input => {
            const group = input.closest('.form-group');
            if (!input.value.trim()) {
                group.classList.add('has-error');
                valid = false;
            } else {
                group.classList.remove('has-error');
            }
            // Email validation
            if (input.type === 'email' && input.value) {
                const re = /^\S+@\S+\.\S+$/;
                if (!re.test(input.value)) {
                    group.classList.add('has-error');
                    valid = false;
                }
            }
        });
        return valid;
    }
    function validatePayment() {
        const activeTab = document.querySelector('.payment-method-tabs .tab-btn.active').dataset.tab;
        let valid = true;
        if (activeTab === 'credit-card') {
            const cardNumber = document.getElementById('card-number');
            const expiry = document.getElementById('expiry');
            const cvv = document.getElementById('cvv');
            const cardName = document.getElementById('card-name');
            [cardNumber, expiry, cvv, cardName].forEach(input => {
                const group = input.closest('.form-group');
                if (!input.value.trim()) {
                    group.classList.add('has-error');
                    valid = false;
                } else {
                    group.classList.remove('has-error');
                }
            });
            // Simple card number check
            if (cardNumber.value && !/^\d{16}$/.test(cardNumber.value.replace(/\s+/g, ''))) {
                cardNumber.closest('.form-group').classList.add('has-error');
                valid = false;
            }
            // Simple expiry check
            if (expiry.value && !/^(0[1-9]|1[0-2])\/(\d{2})$/.test(expiry.value)) {
                expiry.closest('.form-group').classList.add('has-error');
                valid = false;
            }
            // Simple CVV check
            if (cvv.value && !/^\d{3,4}$/.test(cvv.value)) {
                cvv.closest('.form-group').classList.add('has-error');
                valid = false;
            }
        }
        return valid;
    }

    // --- ENHANCED MULTI-STEP LOGIC ---
    document.querySelectorAll('.next-step').forEach(button => {
        button.addEventListener('click', function(e) {
            const nextStep = parseInt(this.dataset.next);
            if (nextStep === 2 && !validateShipping()) {
                e.preventDefault();
                return;
            }
            if (nextStep === 3 && !validatePayment()) {
                e.preventDefault();
                return;
            }
            goToStep(nextStep);
            if (nextStep === 3) populateReview();
        });
    });
    document.querySelectorAll('.prev-step').forEach(button => {
        button.addEventListener('click', function(e) {
            const prevStep = parseInt(this.dataset.prev);
            goToStep(prevStep);
        });
    });

    // --- DYNAMIC REVIEW POPULATION ---
    function populateReview() {
        // Shipping
        const firstName = document.getElementById('first-name').value;
        const lastName = document.getElementById('last-name').value;
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const zip = document.getElementById('zip').value;
        const country = document.getElementById('country').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const shippingMethod = document.querySelector('input[name="shipping"]:checked + label .method-name').textContent;
        const shippingDetails = document.querySelector('input[name="shipping"]:checked + label .method-details').textContent;
        const shippingPrice = document.querySelector('input[name="shipping"]:checked + label .method-price').textContent;
        document.querySelector('.shipping-summary').innerHTML = `
            <h3>Shipping Information</h3>
            <p>${firstName} ${lastName}<br>
            ${address}<br>
            ${city}, ${country} ${zip}<br>
            ${phone}<br>
            ${email}</p>
            <p><strong>Shipping Method:</strong> ${shippingMethod} (${shippingPrice})<br><span style="font-size:0.95em;color:var(--text-secondary)">${shippingDetails}</span></p>
        `;
        // Payment
        const activeTab = document.querySelector('.payment-method-tabs .tab-btn.active').dataset.tab;
        let paymentHtml = '';
        if (activeTab === 'credit-card') {
            const cardNumber = document.getElementById('card-number').value;
            const cardType = 'Visa'; // Could be improved with card detection
            paymentHtml = `<p><i class="fab fa-cc-visa"></i> ${cardType} ending in ${cardNumber.slice(-4)}</p>`;
        } else if (activeTab === 'paypal') {
            paymentHtml = `<p><i class="fab fa-paypal"></i> PayPal</p>`;
        } else if (activeTab === 'bank-transfer') {
            paymentHtml = `<p><i class="fas fa-university"></i> Bank Transfer</p>`;
        }
        document.querySelector('.payment-summary').innerHTML = `
            <h3>Payment Method</h3>
            ${paymentHtml}
        `;
    }

    // --- BACK TO CART BUTTON ---
    document.querySelectorAll('.back-to-cart').forEach(btn => {
        btn.addEventListener('click', function() {
            window.location.href = 'cart.html';
        });
    });

    // --- ACCESSIBILITY: FOCUS FIRST FIELD ON STEP ---
    function focusFirstField(step) {
        const section = document.querySelector(`.checkout-section[data-section="${step}"]`);
        if (!section) return;
        const input = section.querySelector('input, select, button');
        if (input) input.focus();
    }
    function goToStep(stepNumber) {
        document.querySelectorAll('.checkout-steps .step').forEach((step, index) => {
            step.classList.toggle('active', index < stepNumber);
        });
        document.querySelectorAll('.checkout-form .checkout-section').forEach(section => {
            section.style.display = 'none';
        });
        const currentSection = document.querySelector(`.checkout-section[data-section="${stepNumber}"]`);
        if (currentSection) currentSection.style.display = 'block';
        focusFirstField(stepNumber);
    }
    // Initialize on first step
    if (document.querySelector('.checkout-steps')) {
        goToStep(1);
    }
});