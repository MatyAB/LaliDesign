document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

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

});