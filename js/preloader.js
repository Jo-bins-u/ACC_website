// Immediately set theme based on localStorage to prevent FOUC
(function() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const isLight = savedTheme === 'light' || (!savedTheme && systemPrefersLight);
    if (isLight) {
        document.documentElement.classList.add('light-theme');
        if (document.body) document.body.classList.add('light-theme');
    }
})();

document.addEventListener("DOMContentLoaded", function() {
    // Sync theme class to body
    if (document.documentElement.classList.contains('light-theme')) {
        document.body.classList.add('light-theme');
    }

    const isLight = document.body.classList.contains('light-theme');
    updateThemeUI(isLight);

    // Theme toggle
    document.addEventListener('click', function(e) {
        const toggleBtn = e.target.closest('#theme-toggle');
        if (toggleBtn) {
            document.body.classList.toggle('light-theme');
            const nowLight = document.body.classList.contains('light-theme');
            document.documentElement.classList.toggle('light-theme', nowLight);
            localStorage.setItem('theme', nowLight ? 'light' : 'dark');
            updateThemeUI(nowLight);
        }
    });

    function updateThemeUI(isLightMode) {
        document.querySelectorAll('#theme-toggle').forEach(btn => {
            btn.innerHTML = '<i class="fas fa-moon"></i><i class="fas fa-sun"></i>';
        });
        updateLogos(isLightMode);
    }

    function updateLogos(isLightMode) {
        document.querySelectorAll('.acc-logo').forEach(function(logo) {
            const src = logo.getAttribute('src') || '';
            if (isLightMode) {
                if (src.includes('ACC_LOGO_WH.png')) logo.setAttribute('src', 'Images/ACC_LOGO_BLCK.png');
                else if (src.includes('ACC_WHITE.png')) logo.setAttribute('src', 'Images/ACC_BLACK.png');
            } else {
                if (src.includes('ACC_LOGO_BLCK.png')) logo.setAttribute('src', 'Images/ACC_LOGO_WH.png');
                else if (src.includes('ACC_BLACK.png')) logo.setAttribute('src', 'Images/ACC_WHITE.png');
            }
        });
        document.querySelectorAll('.uni-logo').forEach(function(logo) {
            logo.setAttribute('src', isLightMode ? 'Images/UniversityLogo.png' : 'Images/University_logo_WH.png');
        });
    }

    // ─── Navbar Scroll Morph ─────────────────────────────────────────────
    const header = document.querySelector('header');
    if (header) {
        const checkScroll = () => {
            header.classList.toggle('nav-scrolled', window.scrollY > 60);
        };
        checkScroll();
        window.addEventListener('scroll', checkScroll, { passive: true });
    }

    // ─── Mobile Nav Drawer ───────────────────────────────────────────────
    buildMobileNav();
});

// ─── Mobile Nav (completely independent of Bootstrap collapse) ────────────
function buildMobileNav() {
    const toggler = document.querySelector('.navbar-toggler');
    if (!toggler) return;

    // Build link list from the desktop nav DOM
    const desktopLinks = document.querySelectorAll(
        '.navbar-nav a.nav-link:not(.dropdown-toggle), .navbar-nav a.dropdown-item'
    );

    let linksHTML = '';
    desktopLinks.forEach((a, i) => {
        const text = a.textContent.trim();
        const href = a.getAttribute('href') || '#';
        if (!text) return;
        linksHTML += `<a href="${href}" class="mnav-link" style="--idx:${i}">${text}</a>`;
    });

    // Create the overlay
    const overlay = document.createElement('div');
    overlay.id = 'mnav-overlay';
    overlay.innerHTML = `
        <div class="mnav-drawer" id="mnav-drawer">
            <div class="mnav-header">
                <img src="Images/ACC_WHITE.png" class="acc-logo mnav-logo" alt="ACC" style="height:34px;">
                <button class="mnav-close-btn" id="mnav-close" aria-label="Close">
                    <span></span><span></span>
                </button>
            </div>
            <nav class="mnav-body">
                ${linksHTML}
            </nav>
            <div class="mnav-footer">
                <a href="https://www.instagram.com/acc_kengeri/" target="_blank" aria-label="Instagram" class="mnav-social"><i class="fab fa-instagram"></i></a>
                <a href="https://chat.whatsapp.com/KoTpbOt0HZB8Uq0PbNUqrj" target="_blank" aria-label="WhatsApp" class="mnav-social"><i class="fab fa-whatsapp"></i></a>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);

    // Update logo when theme switches
    document.addEventListener('click', function(e) {
        if (e.target.closest('#theme-toggle')) {
            setTimeout(() => {
                const logo = overlay.querySelector('.mnav-logo');
                if (logo) {
                    logo.setAttribute('src', document.body.classList.contains('light-theme')
                        ? 'Images/ACC_BLACK.png' : 'Images/ACC_WHITE.png');
                }
            }, 50);
        }
    });

    function openNav() {
        overlay.classList.add('open');
        document.body.classList.add('menu-open');
        toggler.classList.remove('collapsed');
        toggler.setAttribute('aria-expanded', 'true');
    }

    function closeNav() {
        overlay.classList.remove('open');
        document.body.classList.remove('menu-open');
        toggler.classList.add('collapsed');
        toggler.setAttribute('aria-expanded', 'false');
    }

    // Intercept Bootstrap's click handler using capture phase
    toggler.addEventListener('click', function(e) {
        e.stopImmediatePropagation();
        overlay.classList.contains('open') ? closeNav() : openNav();
    }, true);

    document.getElementById('mnav-close').addEventListener('click', closeNav);

    // Close on backdrop click
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) closeNav();
    });

    // Close on nav link click (page navigation)
    overlay.querySelectorAll('.mnav-link').forEach(a => {
        a.addEventListener('click', closeNav);
    });
}

// ─── Hero Writing Reveal (CSS clip-path, not JS typewriter) ───────────────
function startHeroTypewriter() {
    const h1s = document.querySelectorAll('.over-text h1');
    const btns = document.querySelectorAll('.over-text a.btn-gold');

    // Small pause, then trigger the fade-up reveal
    setTimeout(() => {
        h1s.forEach(h1 => h1.classList.add('hero-reveal'));

        // Reveal button slightly after text fades up
        setTimeout(() => {
            btns.forEach(btn => {
                btn.style.transition = 'opacity 1.5s ease, transform 1.5s cubic-bezier(0.16,1,0.3,1)';
                btn.style.opacity = '1';
                btn.style.transform = 'translateY(0)';
            });
        }, 800);

        startRotator();
    }, 250);
}

function startRotator() {
    var els = document.querySelectorAll('.rotator-word');
    if (!els || els.length === 0) return;

    var HOLD = 2600;        // how long each word stays visible, ms
    var TRANSITION = 600;   // must match the CSS transition duration above

    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var timer = null;

    els.forEach(function(el) {
        el.idx = 0;
        var wordsData = el.getAttribute('data-words');
        el.words = wordsData ? JSON.parse(wordsData) : ['Faith', 'Grace', 'Love', 'Purpose'];
    });

    function showNextWord() {
        els.forEach(function(el) {
            el.idx = (el.idx + 1) % el.words.length;

            if (reduceMotion) {
                el.textContent = el.words[el.idx];
                return;
            }

            el.classList.add('exiting');

            setTimeout(function () {
                el.style.transition = 'none';
                el.classList.remove('exiting');
                el.classList.add('entering');
                el.textContent = el.words[el.idx];
                void el.offsetWidth; // force reflow so the entering state applies instantly
                el.style.transition = '';
                requestAnimationFrame(function () {
                    el.classList.remove('entering');
                });
            }, TRANSITION);
        });
    }

    function start() {
        if (timer) return;
        timer = setInterval(showNextWord, HOLD);
    }

    function stop() {
        clearInterval(timer);
        timer = null;
    }

    start();

    // pause while the tab isn't visible, resume when it is
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            stop();
        } else {
            start();
        }
    });
}

// ─── Preloader Logic ──────────────────────────────────────────────────────
function hidePreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        setTimeout(function() {
            if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
            startHeroTypewriter();
        }, 520);
    } else {
        startHeroTypewriter();
    }
}

window.addEventListener('load', function() {
    if (window._driveGalleryLoaded) {
        hidePreloader();
    } else {
        // Only wait long on pages with a drive gallery component
        const hasDriveGallery = !!document.querySelector('.gallery-container, #media-gallery, [data-drive-gallery]');
        const timeout = hasDriveGallery ? 9000 : 1800;

        const fallbackTimer = setTimeout(hidePreloader, timeout);
        document.addEventListener('driveGalleryReady', function() {
            clearTimeout(fallbackTimer);
            hidePreloader();
        }, { once: true });
    }
});
