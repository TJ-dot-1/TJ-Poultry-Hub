// DOM Elements
const reviewForm = document.getElementById('reviewForm');
const stars = document.querySelectorAll('.star');
const ratingValue = document.getElementById('ratingValue');

// Star Rating
stars.forEach(star => {
    star.addEventListener('click', function() {
        const value = parseInt(this.getAttribute('data-value'));
        ratingValue.value = value;
        
        stars.forEach((s, index) => {
            if (index < value) {
                s.style.color = '#FFA500';
            } else {
                s.style.color = '#ddd';
            }
        });
    });
});

// Submit Review
if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewName').value;
        const text = document.getElementById('reviewText').value;
        const rating = parseInt(ratingValue.value);
        
        if (!name || !text || rating === 0) {
            alert('Please fill all fields and select a rating');
            return;
        }
        
        // In a real app, you would send this to a server
        const newReview = {
            name,
            rating,
            text
        };
        
        // Add to local storage (simulated)
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        reviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        
        // Reset form
        reviewForm.reset();
        stars.forEach(star => {
            star.style.color = '#ddd';
        });
        ratingValue.value = 0;
        
        // Show success message
        alert('Thank you for your review!');
        
        // Refresh reviews display
        displayReviews();
    });
}

// Display Reviews from Local Storage
function displayReviews() {
    const reviewsContainer = document.querySelector('.reviews-container');
    if (reviewsContainer) {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
        
        reviewsContainer.innerHTML = reviews.map(review => `
            <div class="review-card">
                <h4>${review.name}</h4>
                <div class="review-stars">${'★'.repeat(review.rating)}</div>
                <p class="review-text">${review.text}</p>
            </div>
        `).join('');
    }
}

// Initialize Reviews
displayReviews();