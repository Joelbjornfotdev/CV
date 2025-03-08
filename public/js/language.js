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
    
    // Add event listener to CV download link
    const cvDownloadLink = document.getElementById('cv-download-link');
    if (cvDownloadLink) {
        cvDownloadLink.addEventListener('click', function(e) {
            e.preventDefault();
            const language = document.documentElement.lang || 'en';
            downloadCV(language);
        });
    }
    
    // Function to force download CV
    function downloadCV(language) {
        // Create an invisible anchor element
        const link = document.createElement('a');
        link.style.display = 'none';
        
        // Set the file path based on language
        const filePath = `public/files/CV_${language}.pdf`;
        
        // Set download attributes
        link.href = filePath;
        link.setAttribute('download', `Joel_Bjornfot_CV_${language}.pdf`);
        link.setAttribute('target', '_blank');
        
        // Append to body, trigger click, and remove
        document.body.appendChild(link);
        link.click();
        
        // Clean up after a short delay
        setTimeout(() => {
            document.body.removeChild(link);
        }, 100);
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
    }
}); 