document.addEventListener('DOMContentLoaded', function() {
    // Get language buttons
    const enBtn = document.getElementById('en-btn');
    const svBtn = document.getElementById('sv-btn');
    
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
        setLanguage(savedLanguage);
    }
    
    // Add event listeners to language buttons
    enBtn.addEventListener('click', function() {
        setLanguage('en');
    });
    
    svBtn.addEventListener('click', function() {
        setLanguage('sv');
    });
    
    // Function to apply language
    function setLanguage(language) {
        document.documentElement.lang = language;
        localStorage.setItem('language', language);
        
        // Update active button
        if (language === 'en') {
            enBtn.classList.add('active');
            svBtn.classList.remove('active');
        } else {
            svBtn.classList.add('active');
            enBtn.classList.remove('active');
        }
        
        // Update all elements with data-en and data-sv attributes
        const elements = document.querySelectorAll('[data-en][data-sv]');
        elements.forEach(function(element) {
            element.textContent = element.getAttribute(`data-${language}`);
        });
        
        // Also update timeline badge durations
        const durations = document.querySelectorAll('.timeline-badge .duration[data-en][data-sv]');
        durations.forEach(function(element) {
            element.textContent = element.getAttribute(`data-${language}`);
        });
        
        // Update CV download link based on language
        const cvDownloadLink = document.getElementById('cv-download-link');
        if (cvDownloadLink) {
            cvDownloadLink.href = `public/files/CV_${language}.pdf`;
        }
    }
}); 