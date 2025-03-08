document.addEventListener('DOMContentLoaded', function() {
    // Ensure proper viewport meta tag exists
    const ensureViewportMeta = () => {
        let viewportMeta = document.querySelector('meta[name="viewport"]');
        if (!viewportMeta) {
            viewportMeta = document.createElement('meta');
            viewportMeta.name = 'viewport';
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
            document.head.appendChild(viewportMeta);
        } else if (!viewportMeta.content.includes('width=device-width')) {
            viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
        }
    };
    
    ensureViewportMeta();
    
    // Add tech-themed decorative elements to hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        // Add circuit overlay
        const circuitOverlay = document.createElement('div');
        circuitOverlay.className = 'circuit-overlay';
        heroImage.appendChild(circuitOverlay);
        
        // Add binary code animations
        const binary1 = document.createElement('div');
        binary1.className = 'binary binary-1';
        binary1.textContent = '01001001 01010100 00100000 01010011 01110000 01100101 01100011 01101001 01100001 01101100 01101001 01110011 01110100';
        heroImage.appendChild(binary1);
        
        const binary2 = document.createElement('div');
        binary2.className = 'binary binary-2';
        binary2.textContent = '01010111 01100101 01100010 00100000 01000100 01100101 01110110 01100101 01101100 01101111 01110000 01100101 01110010';
        heroImage.appendChild(binary2);
    }
    
    // Fix for iOS Safari 100vh issue
    const fixIOSHeight = () => {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        
        // Apply to hero section
        const heroSection = document.querySelector('.hero');
        if (heroSection) {
            heroSection.style.minHeight = `calc(100 * var(--vh))`;
        }
    };
    
    fixIOSHeight();
    window.addEventListener('resize', fixIOSHeight);
    
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');
    
    // Get all sections that have an ID defined
    const sections = document.querySelectorAll("section[id]");
    
    // Add click event listeners to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(navLink => {
                navLink.classList.remove('active');
            });
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the target section ID from the href attribute
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            // Scroll to the target section
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Create a map of section IDs to nav links
    const sectionToNavMap = {};
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href.startsWith('#')) {
            sectionToNavMap[href.substring(1)] = link;
        }
    });
    
    // Set up Intersection Observer for each section
    const observerOptions = {
        root: null, // viewport is the root
        rootMargin: '-100px 0px -70% 0px', // adjust these values to control when sections are considered "visible"
        threshold: 0 // trigger when any part of the element is visible
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            // Get the section ID
            const id = entry.target.getAttribute('id');
            
            // Find the corresponding nav link
            const link = sectionToNavMap[id];
            
            if (link) {
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    navLinks.forEach(navLink => {
                        navLink.classList.remove('active');
                    });
                    
                    // Add active class to the link for this section
                    link.classList.add('active');
                }
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Handle the "Contact me" button
    const contactBtn = document.querySelector('.contact-btn');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active state in navigation
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#contact') {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Project card expansion - Modal style
    const projectCards = document.querySelectorAll('.project-card');
    const body = document.body;
    
    // Create overlay element
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    
    // Create modal container
    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal-container';
    document.body.appendChild(modalContainer);
    
    // Function to open modal
    const openModal = (card) => {
        const cardClone = card.cloneNode(true);
        cardClone.classList.add('expanded');
        
        // Make sure the expand-content is visible
        const expandContent = cardClone.querySelector('.expand-content');
        if (expandContent) {
            expandContent.style.display = 'block';
            expandContent.style.maxHeight = 'none';
            expandContent.style.opacity = '1';
        }
        
        // Clear modal container and add the expanded card
        modalContainer.innerHTML = '';
        modalContainer.appendChild(cardClone);
        
        // Add close button to the modal container (not to the card)
        const closeBtn = document.createElement('div');
        closeBtn.className = 'close-btn';
        modalContainer.appendChild(closeBtn);
        
        // Show overlay and modal
        overlay.classList.add('active');
        modalContainer.classList.add('active');
        
        // Disable scrolling on the main content
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        
        // Add event listener to close button
        closeBtn.addEventListener('click', closeModal);
    };
    
    // Function to close modal
    const closeModal = () => {
        // Hide overlay and modal
        overlay.classList.remove('active');
        modalContainer.classList.remove('active');
        
        // Re-enable scrolling
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        
        // Clear modal container after animation
        setTimeout(() => {
            modalContainer.innerHTML = '';
        }, 300);
    };
    
    // Add click event to project cards
    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            openModal(card);
        });
    });
    
    // Close modal when clicking overlay
    overlay.addEventListener('click', closeModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Copy email to clipboard functionality
    const copyEmailBtn = document.querySelector('.copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', function() {
            const emailAddress = document.querySelector('.email-address').textContent;
            
            // Use modern clipboard API if available
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(emailAddress)
                    .then(showCopiedFeedback)
                    .catch(err => {
                        console.error('Could not copy text: ', err);
                        // Fallback to older method
                        copyWithFallback();
                    });
            } else {
                // Fallback for browsers that don't support clipboard API
                copyWithFallback();
            }
            
            function copyWithFallback() {
                // Create a temporary input element
                const tempInput = document.createElement('input');
                tempInput.value = emailAddress;
                tempInput.style.position = 'absolute';
                tempInput.style.left = '-9999px';
                document.body.appendChild(tempInput);
                
                // Select and copy the text
                tempInput.select();
                document.execCommand('copy');
                
                // Remove the temporary element
                document.body.removeChild(tempInput);
                
                showCopiedFeedback();
            }
            
            function showCopiedFeedback() {
                // Save original content including SVG
                const originalHTML = copyEmailBtn.innerHTML;
                
                // Visual feedback
                copyEmailBtn.textContent = 'Copied!';
                copyEmailBtn.classList.add('copied');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    const currentLang = getCurrentLanguage ? getCurrentLanguage() : 'en';
                    const buttonText = currentLang === 'sv' ? 'Kopiera E-post' : 'Copy Email';
                    
                    // Restore button with correct text and icon
                    copyEmailBtn.innerHTML = `${buttonText} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
                    copyEmailBtn.classList.remove('copied');
                }, 2000);
            }
        });
        
        // Update button text when language changes
        const updateCopyButtonText = () => {
            const currentLang = getCurrentLanguage ? getCurrentLanguage() : 'en';
            const buttonText = currentLang === 'sv' ? 'Kopiera E-post' : 'Copy Email';
            copyEmailBtn.innerHTML = `${buttonText} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;
        };
        
        // Add language change listeners
        const svBtn = document.getElementById('sv-btn');
        const enBtn = document.getElementById('en-btn');
        
        if (svBtn) {
            svBtn.addEventListener('click', updateCopyButtonText);
        }
        
        if (enBtn) {
            enBtn.addEventListener('click', updateCopyButtonText);
        }
    }
}); 