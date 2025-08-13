const colorPanel = document.getElementById('colorPanel');
const colorPanelToggle = document.getElementById('colorPanelToggle');
const colorPanelContent = document.getElementById('colorPanelContent');
const colorOptions = document.querySelectorAll('.color-option');
const resetColorBtn = document.getElementById('resetColorBtn');

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLeft = document.getElementById('navLeft');
const navRight = document.getElementById('navRight');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

colorPanelToggle.addEventListener('click', function() {
    colorPanel.classList.toggle('active');
    
    mobileMenuToggle.classList.toggle('active');
    navLeft.classList.toggle('active');
    navRight.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    
    if (navLeft.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

document.addEventListener('click', function(e) {
    if (!colorPanel.contains(e.target)) {
        colorPanel.classList.remove('active');
    }
});

colorOptions.forEach(option => {
    option.addEventListener('click', function() {
        const selectedColor = this.dataset.color;
        
        colorOptions.forEach(opt => opt.classList.remove('active'));
        
        this.classList.add('active');
        
        document.documentElement.style.setProperty('--primary-color', selectedColor);
        document.body.style.backgroundColor = selectedColor;
        
        updatePrimaryColor(selectedColor);
        
        localStorage.setItem('primaryColor', selectedColor);
    });
});

resetColorBtn.addEventListener('click', function() {
    const defaultColor = '#ffffff';
    
    colorOptions.forEach(opt => opt.classList.remove('active'));
    
    document.documentElement.style.setProperty('--primary-color', defaultColor);
    document.body.style.backgroundColor = defaultColor;
    
    updatePrimaryColor(defaultColor);
    
    localStorage.removeItem('primaryColor');
});

function updatePrimaryColor(color) {
    document.documentElement.style.setProperty('--primary-color', color);
    
    document.body.style.backgroundColor = color;
    
    const mainContainer = document.querySelector('.container');
    if (mainContainer) {
        mainContainer.style.background = color;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const savedColor = localStorage.getItem('primaryColor');
    if (savedColor) {
        colorOptions.forEach(opt => {
            if (opt.dataset.color === savedColor) {
                opt.classList.add('active');
                updatePrimaryColor(savedColor);
                document.body.style.backgroundColor = savedColor;
            }
        });
    } else {
        document.body.style.backgroundColor = '#ffffff';
        document.documentElement.style.setProperty('--primary-color', '#ffffff');
    }
});

mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navLeft.classList.toggle('active');
    navRight.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    
    if (navLeft.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

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

mobileMenuOverlay.addEventListener('click', function() {
    mobileMenuToggle.classList.remove('active');
    navLeft.classList.remove('active');
    navRight.classList.remove('active');
    colorPanel.classList.remove('active');
    this.classList.remove('active');
    document.body.style.overflow = 'auto';
});

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
