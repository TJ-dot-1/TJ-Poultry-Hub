// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Initialize products if on products page
    if (document.getElementById('products-grid')) {
        initializeProducts();
    }

    // Initialize forms
    initializeForms();

    // Initialize WhatsApp button
    const whatsappBtn = document.getElementById('whatsapp-float');
    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', openWhatsApp);
    }
});

// WhatsApp Function
function openWhatsApp() {
    const phoneNumber = "254066667129";
    const message = "Hello TJ Poultry Farm! I'm interested in your products and services.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
}

// Order Product Function (for homepage)
function orderProduct(productName) {
    const message = `Hello TJ Poultry Farm! I'm interested in ordering ${productName}. Please provide more details.`;
    const whatsappUrl = `https://wa.me/254066667129?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
}

// Products Data
const productsData = [
    {
        id: 1,
        name: "Kienyeji Day-Old Chicks",
        category: "chicks",
        price: "KSh 80",
        originalPrice: "KSh 100",
        description: "Hardy indigenous chickens perfect for free-range farming",
        features: ["High survival rate", "Disease resistant", "Good for meat & eggs"],
        image: "images/chicks1.jpg",
        inStock: true,
        popular: true
    },
    {
        id: 2,
        name: "Broiler Day-Old Chicks",
        category: "chicks",
        price: "KSh 120",
        description: "Fast-growing broiler chicks for commercial meat production",
        features: ["Rapid growth", "High feed conversion", "Market ready in 6-8 weeks"],
        image: "images/chicks2.jpg",
        inStock: true,
        popular: false
    },
    {
        id: 3,
        name: "Layer Day-Old Chicks",
        category: "chicks",
        price: "KSh 150",
        description: "High-producing layer chicks for egg production",
        features: ["High egg production", "Long laying period", "Quality eggs"],
        image: "images/chicks3.jpg",
        inStock: true,
        popular: true
    },
    {
        id: 4,
        name: "Automatic Tube Feeder",
        category: "equipment",
        price: "KSh 2,500",
        description: "Durable plastic tube feeder with adjustable flow control",
        features: ["30kg capacity", "Weather resistant", "Easy to clean"],
        image: "images/feeder.jpg",
        inStock: true,
        popular: false
    },
    {
        id: 5,
        name: "Bell Drinker System",
        category: "equipment",
        price: "KSh 800",
        description: "Automatic water drinker system for clean water supply",
        features: ["Leak-proof design", "Easy installation", "Adjustable height"],
        image: "images/drinker.jpg",
        inStock: true,
        popular: true
    },
    {
        id: 6,
        name: "Poultry Housing Kit",
        category: "equipment",
        price: "KSh 15,000",
        description: "Complete housing kit for 100 birds",
        features: ["Galvanized materials", "Easy assembly", "Includes perches & nests"],
        image: "images/housing.jpg",
        inStock: false,
        popular: false
    },
    {
        id: 7,
        name: "Newcastle Disease Vaccine",
        category: "health",
        price: "KSh 150",
        description: "Essential vaccine for Newcastle disease prevention",
        features: ["100 doses per vial", "Long shelf life", "Easy administration"],
        image: "images/vaccine.jpg",
        inStock: true,
        popular: true
    },
    {
        id: 8,
        name: "Poultry Multivitamins",
        category: "health",
        price: "KSh 300",
        description: "Complete vitamin supplement for optimal poultry health",
        features: ["Boosts immunity", "Improves growth", "500g pack"],
        image: "images/vitamins.jpg",
        inStock: true,
        popular: false
    },
    {
        id: 9,
        name: "Coccidiosis Treatment",
        category: "health",
        price: "KSh 450",
        description: "Effective treatment for coccidiosis in poultry",
        features: ["Fast acting", "Safe for all ages", "1 liter bottle"],
        image: "images/treatment.jpg",
        inStock: true,
        popular: false
    }
];

// Products Page Functions
function initializeProducts() {
    displayProducts('all');
    
    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
}

function filterProducts(category) {
    // Update active filter button
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Display filtered products
    displayProducts(category);
}

function displayProducts(category) {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    const filteredProducts = category === 'all' 
        ? productsData 
        : productsData.filter(product => product.category === category);
    
    productsGrid.innerHTML = '';
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="no-products">No products found in this category.</div>';
        return;
    }
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    // Add popular badge if applicable
    const popularBadge = product.popular 
        ? '<div class="product-badge">Popular</div>' 
        : '';
    
    // Add out of stock overlay if applicable
    const outOfStock = !product.inStock 
        ? '<div class="out-of-stock">Out of Stock</div>' 
        : '';
    
    // Create features list
    const featuresList = product.features.map(feature => 
        `<li><span class="feature-icon"></span>${feature}</li>`
    ).join('');
    
    card.innerHTML = `
        ${popularBadge}
        ${outOfStock}
        
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        
        <div class="product-details">
            <h3>${product.name}</h3>
            
            <div class="price-container">
                <span class="current-price">${product.price}</span>
                ${product.originalPrice ? `<span class="original-price">${product.originalPrice}</span>` : ''}
            </div>
            
            <p class="product-description">${product.description}</p>
            
            <div class="product-features">
                <h4>Key Features:</h4>
                <ul>${featuresList}</ul>
            </div>
            
            <button class="order-btn ${!product.inStock ? 'disabled' : ''}" 
                onclick="${product.inStock ? `handleOrderProduct('${product.name}')` : 'return false'}"
                ${!product.inStock ? 'disabled' : ''}>
                ${product.inStock ? 'Order Now' : 'Out of Stock'}
            </button>
        </div>
    `;
    
    return card;
}

// Form Handling
function initializeForms() {
    // Order Form
    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmit);
    }
    
    // Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }
}

function handleOrderSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const orderData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        product: formData.get('product'),
        quantity: formData.get('quantity'),
        message: formData.get('message')
    };
    
    // Validate required fields
    if (!orderData.name || !orderData.phone || !orderData.product) {
        showNotification('Error', 'Please fill in all required fields', 'error');
        return;
    }
    
    // Generate WhatsApp message
    const whatsappMessage = `New Order Inquiry:
Name: ${orderData.name}
Phone: ${orderData.phone}
${orderData.email ? `Email: ${orderData.email}\n` : ''}
Product: ${orderData.product}
Quantity: ${orderData.quantity || 'Not specified'}

Message:
${orderData.message || 'No additional message'}

I've made payment to Till Number: 3137482
Please confirm receipt.`;

    const whatsappUrl = `https://wa.me/254066667129?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Show success message
    showNotification('Order Submitted', 'You will be redirected to WhatsApp for confirmation', 'success');
    
    // Redirect to WhatsApp after delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1500);
    
    // Reset form
    e.target.reset();
}

function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };
    
    // Validate required fields
    if (!contactData.name || !contactData.message) {
        showNotification('Error', 'Name and message are required', 'error');
        return;
    }
    
    // Generate WhatsApp message
    const whatsappMessage = `New Contact Message:
Name: ${contactData.name}
${contactData.phone ? `Phone: ${contactData.phone}\n` : ''}
${contactData.email ? `Email: ${contactData.email}\n` : ''}
${contactData.subject ? `Subject: ${contactData.subject}\n` : ''}

Message:
${contactData.message}`;

    const whatsappUrl = `https://wa.me/254066667129?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Show success message
    showNotification('Message Sent', 'You will be redirected to WhatsApp', 'success');
    
    // Redirect to WhatsApp after delay
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
    }, 1500);
    
    // Reset form
    e.target.reset();
}

// Notification System
function showNotification(title, message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
