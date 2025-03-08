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
    
    // Function to check if device is mobile
    function isMobileDevice() {
        return (window.innerWidth <= 768) || 
               (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }
    
    // Set up CV download link based on device
    const cvDownloadLink = document.getElementById('cv-download-link');
    if (cvDownloadLink) {
        if (isMobileDevice()) {
            // For mobile: remove download attribute to open in new tab
            cvDownloadLink.removeAttribute('download');
        } else {
            // For desktop: ensure download attribute is set
            const language = document.documentElement.lang || 'en';
            cvDownloadLink.setAttribute('download', `Joel_Bjornfot_CV_${language}.pdf`);
        }
        
        // Update link when language changes
        cvDownloadLink.addEventListener('click', function(e) {
            const language = document.documentElement.lang || 'en';
            if (!isMobileDevice()) {
                // Only set download attribute on desktop
                cvDownloadLink.setAttribute('download', `Joel_Bjornfot_CV_${language}.pdf`);
            }
        });
    }
    
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
            
            // Only set download attribute on desktop
            if (!isMobileDevice()) {
                cvDownloadLink.setAttribute('download', `Joel_Bjornfot_CV_${language}.pdf`);
            }
        }
    }
}); 