// Color Customization Panel
const colorPanel = document.getElementById('colorPanel');
const colorPanelToggle = document.getElementById('colorPanelToggle');
const colorPanelContent = document.getElementById('colorPanelContent');
const colorOptions = document.querySelectorAll('.color-option');
const resetColorBtn = document.getElementById('resetColorBtn');

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLeft = document.getElementById('navLeft');
const navRight = document.getElementById('navRight');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

// Toggle color panel and mobile menu
colorPanelToggle.addEventListener('click', function() {
    colorPanel.classList.toggle('active');
    
    // Also toggle mobile menu when customize button is clicked
    mobileMenuToggle.classList.toggle('active');
    navLeft.classList.toggle('active');
    navRight.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navLeft.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close color panel when clicking outside
document.addEventListener('click', function(e) {
    if (!colorPanel.contains(e.target)) {
        colorPanel.classList.remove('active');
    }
});

// Color change functionality
colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        const selectedColor = this.dataset.color;
        
        // Remove active class from all options
        colorOptions.forEach(opt => opt.classList.remove('active'));
        
        // Add active class to selected option
        this.classList.add('active');
        
        // Apply color to CSS custom property and entire page
        document.documentElement.style.setProperty('--primary-color', selectedColor);
        document.body.style.backgroundColor = selectedColor;
        
        // Update other elements that use primary color
        updatePrimaryColor(selectedColor);
        
        // Store in localStorage
        localStorage.setItem('primaryColor', selectedColor);
    });
});

// Reset color button functionality
resetColorBtn.addEventListener('click', function() {
    const defaultColor = '#ffffff';
    
    // Remove active class from all options
    colorOptions.forEach(opt => opt.classList.remove('active'));
    
    // Reset to white background
    document.documentElement.style.setProperty('--primary-color', defaultColor);
    document.body.style.backgroundColor = defaultColor;
    
    // Update other elements that use primary color
    updatePrimaryColor(defaultColor);
    
    // Remove from localStorage
    localStorage.removeItem('primaryColor');
});

// Function to update primary color across the site
function updatePrimaryColor(color) {
    // Update CSS custom property
    document.documentElement.style.setProperty('--primary-color', color);
    
    // Only update minimal empty spaces - body and main containers
    document.body.style.backgroundColor = color;
    
    // Update only the main page container if it exists
    const mainContainer = document.querySelector('.container');
    if (mainContainer) {
        mainContainer.style.background = color;
    }
}

// Load saved color on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedColor = localStorage.getItem('primaryColor');
    if (savedColor) {
        // Find and activate the saved color option
        colorOptions.forEach(opt => {
            if (opt.dataset.color === savedColor) {
                opt.classList.add('active');
                updatePrimaryColor(savedColor);
                document.body.style.backgroundColor = savedColor;
            }
        });
    } else {
        // Start with white background by default
        document.body.style.backgroundColor = '#ffffff';
        document.documentElement.style.setProperty('--primary-color', '#ffffff');
    }
});

// Mobile menu functionality (now also controlled by customize button)
mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLeft.classList.toggle('active');
    navRight.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (navLeft.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link, .nav-link-signup').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenuToggle.classList.remove('active');
        navLeft.classList.remove('active');
        navRight.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        colorPanel.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Close mobile menu when clicking on overlay
mobileMenuOverlay.addEventListener('click', function() {
    mobileMenuToggle.classList.remove('active');
    navLeft.classList.remove('active');
    navRight.classList.remove('active');
    colorPanel.classList.remove('active');
    this.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!mobileMenuToggle.contains(e.target) && 
        !navLeft.contains(e.target) && 
        !navRight.contains(e.target) &&
        !mobileMenuOverlay.contains(e.target) &&
        !colorPanel.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        navLeft.classList.remove('active');
        navRight.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        colorPanel.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Open/Close dropdown
document.querySelector('.toggle-icon-mode').addEventListener('click', function (e) {
    e.stopPropagation();
    this.querySelector('.dropdown-menu').classList.toggle('show');
});

// Light Mode
document.querySelector('.light-mode').addEventListener('click', function (e) {
    e.preventDefault();
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
});

// Dark Mode
document.querySelector('.dark-mode').addEventListener('click', function (e) {
    e.preventDefault();
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
});

// Close dropdown if clicked outside
document.addEventListener('click', function () {
    document.querySelectorAll('.dropdown-menu').forEach(menu => menu.classList.remove('show'));
});
