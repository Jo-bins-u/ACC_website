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

$(document).ready(function() {
    // Sync class between HTML and body
    if (document.documentElement.classList.contains('light-theme')) {
        $('body').addClass('light-theme');
    }

    // Initialize Theme Toggles and Logos on DOM Ready
    const isLight = $('body').hasClass('light-theme');
    updateThemeUI(isLight);

    // Click handler for theme toggle
    $(document).on('click', '#theme-toggle', function() {
        const body = $('body');
        body.toggleClass('light-theme');
        const nowLight = body.hasClass('light-theme');
        
        if (nowLight) {
            document.documentElement.classList.add('light-theme');
        } else {
            document.documentElement.classList.remove('light-theme');
        }
        
        // Save to localStorage
        localStorage.setItem('theme', nowLight ? 'light' : 'dark');
        
        // Update UI
        updateThemeUI(nowLight);
    });

    function updateThemeUI(isLightMode) {
        const toggleBtn = $('#theme-toggle');
        if (isLightMode) {
            toggleBtn.html('<i class="fas fa-sun"></i>');
        } else {
            toggleBtn.html('<i class="fas fa-moon"></i>');
        }
        updateLogos(isLightMode);
    }

    function updateLogos(isLightMode) {
        // Update ACC Logos
        $('.acc-logo').each(function() {
            const currentSrc = $(this).attr('src') || '';
            if (isLightMode) {
                if (currentSrc.includes('ACC_LOGO_WH.png')) {
                    $(this).attr('src', 'Images/ACC_LOGO_BLCK.png');
                } else if (currentSrc.includes('ACC_WHITE.png')) {
                    $(this).attr('src', 'Images/ACC_BLACK.png');
                }
            } else {
                if (currentSrc.includes('ACC_LOGO_BLCK.png')) {
                    $(this).attr('src', 'Images/ACC_LOGO_WH.png');
                } else if (currentSrc.includes('ACC_BLACK.png')) {
                    $(this).attr('src', 'Images/ACC_WHITE.png');
                }
            }
        });

        // Update University Logos
        $('.uni-logo').each(function() {
            if (isLightMode) {
                $(this).attr('src', 'Images/UniversityLogo.png');
            } else {
                $(this).attr('src', 'Images/University_logo_WH.png');
            }
        });
    }
});

// Preloader Logic
$(window).on('load', function() {
    console.log("Page fully loaded");
    $('#preloader').delay(350).fadeOut('slow', function() {
        $('#preloader').remove();
    }); 
});
