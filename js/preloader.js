// Immediately set theme based on localStorage to prevent FOUC (Flash of Unstyled Content)
(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const isLight = savedTheme === 'light' || (!savedTheme && systemPrefersLight);
    
    if (isLight) {
        document.documentElement.classList.add('light-theme');
        // Also apply to body if it exists
        if (document.body) {
            document.body.classList.add('light-theme');
        }
    }
})();

document.addEventListener("DOMContentLoaded", function() {
    // Sync class between HTML and body
    if (document.documentElement.classList.contains('light-theme')) {
        document.body.classList.add('light-theme');
    }

    // Initialize Theme Toggles and Logos on DOM Ready
    const isLight = document.body.classList.contains('light-theme');
    updateThemeUI(isLight);

    // Click handler for theme toggle
    document.addEventListener('click', function(e) {
        // Use closest to handle clicks on the icon inside the button
        const toggleBtn = e.target.closest('#theme-toggle');
        if (toggleBtn) {
            document.body.classList.toggle('light-theme');
            const nowLight = document.body.classList.contains('light-theme');
            
            if (nowLight) {
                document.documentElement.classList.add('light-theme');
            } else {
                document.documentElement.classList.remove('light-theme');
            }
            
            // Save to localStorage
            localStorage.setItem('theme', nowLight ? 'light' : 'dark');
            
            // Update UI
            updateThemeUI(nowLight);
        }
    });

    function updateThemeUI(isLightMode) {
        const toggleBtns = document.querySelectorAll('#theme-toggle');
        toggleBtns.forEach(btn => {
            if (isLightMode) {
                btn.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                btn.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
        updateLogos(isLightMode);
    }

    function updateLogos(isLightMode) {
        // Update ACC Logos
        const accLogos = document.querySelectorAll('.acc-logo');
        accLogos.forEach(function(logo) {
            const currentSrc = logo.getAttribute('src') || '';
            if (isLightMode) {
                if (currentSrc.includes('ACC_LOGO_WH.png')) {
                    logo.setAttribute('src', 'Images/ACC_LOGO_BLCK.png');
                } else if (currentSrc.includes('ACC_WHITE.png')) {
                    logo.setAttribute('src', 'Images/ACC_BLACK.png');
                }
            } else {
                if (currentSrc.includes('ACC_LOGO_BLCK.png')) {
                    logo.setAttribute('src', 'Images/ACC_LOGO_WH.png');
                } else if (currentSrc.includes('ACC_BLACK.png')) {
                    logo.setAttribute('src', 'Images/ACC_WHITE.png');
                }
            }
        });

        // Update University Logos
        const uniLogos = document.querySelectorAll('.uni-logo');
        uniLogos.forEach(function(logo) {
            if (isLightMode) {
                logo.setAttribute('src', 'Images/UniversityLogo.png');
            } else {
                logo.setAttribute('src', 'Images/University_logo_WH.png');
            }
        });
    }
});

// Preloader Logic
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.6s ease';
        preloader.style.opacity = '0';
        setTimeout(function() {
            if (preloader.parentNode) {
                preloader.parentNode.removeChild(preloader);
            }
        }, 600);
    }
}

window.addEventListener('load', function() {
    // Wait for Drive gallery or timeout after 9 seconds, whichever comes first
    if (window._driveGalleryLoaded) {
        hidePreloader();
    } else {
        const fallbackTimer = setTimeout(hidePreloader, 9000);
        document.addEventListener('driveGalleryReady', function() {
            clearTimeout(fallbackTimer);
            hidePreloader();
        });
    }
});
