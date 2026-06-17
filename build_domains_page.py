import json

with open('domains_extracted.json', 'r', encoding='utf-8') as f:
    domains = json.load(f)

html_top = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Site Metas -->
    <meta name="keywords" content="acc-kengeri, domains, animation, liturgy, outreach, audiovisual, logistics, mediadoc" />
    <meta name="description" content="Explore the diverse domains of the Association of Christian Christites. Join us to make a change." />
    <title>Our Domains | ACC</title>
    <link rel="icon" href="Images/favicon.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/aos@2.3.1/dist/aos.css" />
    
    <!-- Style Links Local -->
    <link rel="stylesheet" href="css/theme.css" type="text/css">
    <link rel="stylesheet" href="css/preloader.css" type="text/css">
    <link rel="stylesheet" href="css/indexstyle.css" type="text/css">
    <link rel="stylesheet" href="css/hnfstyle.css" type="text/css">
    <link rel="stylesheet" href="css/ALOdomstyle.css" type="text/css">
    
    <style>
        /* Premium Interactive Domain Tabs */
        .domains-nav-wrapper {
            position: sticky;
            top: 85px;
            z-index: 900;
            padding: 15px 0;
            display: flex;
            justify-content: center;
        }
        
        .tabs-track {
            display: inline-flex;
            position: relative;
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(25px);
            -webkit-backdrop-filter: blur(25px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 50px;
            padding: 6px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1);
            overflow-x: auto;
            scrollbar-width: none; /* Firefox */
        }
        .tabs-track::-webkit-scrollbar { display: none; }
        
        body.light-theme .tabs-track {
            background: rgba(255, 255, 255, 0.5);
            border: 1px solid rgba(0, 0, 0, 0.05);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .tab-indicator {
            position: absolute;
            top: 6px;
            bottom: 6px;
            left: 0;
            border-radius: 40px;
            background: linear-gradient(135deg, var(--accent-gold) 0%, #ff8f00 100%);
            box-shadow: 0 4px 15px rgba(255, 111, 0, 0.4);
            transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
            z-index: 1;
            pointer-events: none;
        }

        .domain-tab {
            position: relative;
            z-index: 2;
            background: transparent;
            border: none;
            color: var(--text-secondary);
            font-family: var(--font-sans);
            font-weight: 600;
            font-size: 0.95rem;
            letter-spacing: 0.5px;
            text-transform: uppercase;
            padding: 10px 24px;
            border-radius: 40px;
            cursor: pointer;
            transition: color 0.3s ease;
            white-space: nowrap;
        }

        .domain-tab:hover {
            color: var(--text-primary);
        }

        .domain-tab.active {
            color: #ffffff !important;
        }
        
        /* Banner adjustment for unified page */
        .bnr { margin-top: 0; }
        .bnr-content-centered {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 95%;
            z-index: 2;
        }
    </style>
</head>
<body>
  <!-- Ambient background glows -->
  <div class="ambient-glow" style="top: 20%; left: -10%;"></div>
  <div class="ambient-glow" style="top: 60%; right: -15%;"></div>

  <div id="preloader">
    <div class="loader">
        <div class="horizontal"></div>
        <div class="vertical"></div>
    </div>
  </div>

  <header>
    <div class="container-fluid py-2">
      <div class="row align-items-center">
        <div class="col-md-6 col-7">
          <a href="index.html">
            <img src="Images/ACC_WHITE.png" alt="ACC Logo" class="img-fluid acc-logo" width="180" height="auto">
          </a>
        </div>
        <div class="col-md-6 col-5">
          <nav class="navbar navbar-expand-lg navbar-dark p-0 justify-content-end">
            <div class="collapse navbar-collapse text-start" id="navbarNavAltMarkup">
              <div class="navbar-nav ms-auto align-items-center">
                <a class="nav-item nav-link" href="index.html">Home</a>
                <a class="nav-item nav-link" href="about.html">About</a>
                <a class="nav-item nav-link active" href="domains.html">Domains</a>
                <a class="nav-item nav-link" href="prayer.html">Prayers</a>
                <a class="nav-item nav-link" href="calendar.html">Calendar</a>
                <a class="nav-item nav-link" href="media.html">Media</a>
                <a class="nav-item nav-link" href="contactus.html">Contact Us</a>
              </div>
            </div>
            <button id="theme-toggle" class="btn-theme-toggle ms-lg-3 ms-auto" aria-label="Toggle Theme">
              <i class="fas fa-moon"></i>
            </button>
            <button class="navbar-toggler collapsed d-flex d-lg-none flex-column justify-content-around ms-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
              <span class="toggler-icon top-bar"></span>
              <span class="toggler-icon middle-bar"></span>
              <span class="toggler-icon bottom-bar"></span>
            </button>
          </nav>
        </div>
      </div>
    </div>
  </header>

  <main style="padding-top: 75px;">
    <!-- Sticky Interactive Domain Track -->
    <div class="domains-nav-wrapper">
      <div class="container text-center">
        <div class="tabs-track nav" role="tablist" id="domainsTab">
          <div class="tab-indicator" id="tab-indicator"></div>
"""

html_nav = ""
for idx, d in enumerate(domains):
    active_cls = "active" if idx == 0 else ""
    aria_sel = "true" if idx == 0 else "false"
    html_nav += f'          <button class="domain-tab {active_cls}" id="pills-{d["id"]}-tab" data-bs-toggle="pill" data-bs-target="#pills-{d["id"]}" type="button" role="tab" aria-controls="pills-{d["id"]}" aria-selected="{aria_sel}">{d["title"]}</button>\n'

html_mid = """        </div>
      </div>
    </div>
    
    <!-- Domains Content -->
    <div class="tab-content" id="domainsTabContent">
"""

html_tabs = ""
for idx, d in enumerate(domains):
    active_show = "show active" if idx == 0 else ""
    
    contribs_html = ""
    for c in d["contributions"]:
        contribs_html += f'                <li data-aos="fade-right" data-aos-duration="800">{c}</li>\n'
        
    join_btn_html = ""
    if d["joinLink"] and d["joinLink"] != "#":
        join_btn_html = f'<a href="{d["joinLink"]}" class="btn-gold" target="_blank">Join Us</a>'
        
    mail_btn_html = ""
    if d["mailLink"]:
        mail_btn_html = f'<a href="{d["mailLink"]}" class="btn-gold">Mail Us</a>'
    else:
        mail_btn_html = f'<a href="contactus.html" class="btn-gold">Mail Us</a>'
        
    html_tabs += f"""
      <div class="tab-pane fade {active_show}" id="pills-{d["id"]}" role="tabpanel" aria-labelledby="pills-{d["id"]}-tab">
        <!-- Landing Banner -->
        <section>
          <div class="inner-container d-flex align-items-center bnr">
            <img src="{d["banner"]}" alt="{d["title"]} Banner">
            <div class="row bnr-content-centered">
              <div class="welctext-dom col-12 text-center">
                <h1>{d["title"]}</h1>
                <p>{d["subtitle"]}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- What We Do -->
        <section class="py-5">
          <div class="container py-3">
            <div id="domhis">
              <h1 class="gold-glow-text">What We Do?</h1>
              <p>{d["whatWeDo"]}</p>
            </div>
          </div>
        </section>

        <!-- Work Gallery -->
        <section class="team py-0">
          <div class="container">
            <div id="gallery-{d["id"]}" class="row domain-gallery-dynamic" data-domain="{d["id"]}"></div>
          </div>
        </section>

        <!-- How We Contribute & Heads -->
        <section class="py-5">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-md-8 divider">
                <div id="domhis">
                  <h1 class="gold-glow-text">How We Contribute?</h1>
                  <ul>
{contribs_html}                  </ul>
                </div>
              </div>
              <div id="head-{d["id"]}" class="col-md-4 mt-4 mt-md-0 domain-head-dynamic" data-domain="{d["id"]}"></div>
            </div>
            <div class="joinbtn mt-5">
              {join_btn_html}
            </div>
          </div>
        </section>

        <!-- More On Us -->
        <section class="domabt">
          <div class="container text-center">
            <h1 class="gold-glow-text">More On Us</h1>
            <p>{d["moreOnUs"]}</p>
            <div class="joinbtn m-0">
              {mail_btn_html}
            </div>
          </div>
        </section>
      </div>
"""

html_bottom = """    </div>
  </main>

  <footer>
    <div class="container py-5">
      <div class="row fttr justify-content-between">
        <!-- Brand & Address Column -->
        <div class="col-lg-4 col-md-12 mb-5 mb-lg-0 text-start pr-lg-5">
          <div class="mb-4 d-flex align-items-center">
            <span class="footer-brand-name">Association of Christian Christites</span>
            <a href="admin/index.html" id="admin-hidden-trigger"
              style="opacity: 0.15; margin-left: 8px; color: inherit; text-decoration: none;"
              aria-label="Admin Portal"><i class="fas fa-lock" style="font-size: 0.8rem;"></i></a>
          </div>
          
          <a id="lcft" href="https://g.co/kgs/7q6tTKC" target="_blank" rel="noopener noreferrer" class="mb-4">
            <i class="fas fa-map-marker-alt mt-1"></i>
            <span>CHRIST (Deemed to be University), Kengeri Campus, Bengaluru, 560074.</span>
          </a>

          <div class="footer-map-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3796.4602952788982!2d77.43629971030114!3d12.863339128212573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae472f365fe219%3A0xcae219b3b46324db!2sCHRIST%20(Deemed%20to%20be%20University)%20Bangalore%20Kengeri%20Campus!5e0!3m2!1sen!2sin!4v1719460544242!5m2!1sen!2sin"
              width="100%" height="170" style="border:0;" allowfullscreen="" loading="lazy"
              referrerpolicy="no-referrer-when-downgrade" aria-label="Google Map Location"></iframe>
          </div>
        </div>

        <!-- Links Columns Wrapper -->
        <div class="col-lg-8 col-md-12 pl-lg-5">
          <div class="row">
            <!-- Quick Links -->
            <div class="col-6 col-md-3 mb-4 mb-md-0">
              <h5>Quick Links</h5>
              <ul class="list-unstyled mb-0">
                <li><a href="index.html">Home</a></li>
                <li><a href="about.html">About Us</a></li>
                <li><a href="prayer.html">Prayers</a></li>
                <li><a href="calendar.html">Calendar</a></li>
                <li><a href="media.html">Media</a></li>
                <li><a href="contactus.html">Contact Us</a></li>
              </ul>
            </div>

            <!-- Domains -->
            <div class="col-6 col-md-3 mb-4 mb-md-0">
              <h5>Domains</h5>
              <ul class="list-unstyled mb-0">
                <li><a href="domains.html#animation">Animation</a></li>
                <li><a href="domains.html#liturgy">Liturgy</a></li>
                <li><a href="domains.html#outreach">Outreach</a></li>
                <li><a href="domains.html#audiovisual">Audio &amp; Visual</a></li>
                <li><a href="domains.html#logistic">Logistics</a></li>
                <li><a href="domains.html#mediadoc">Media &amp; Doc</a></li>
              </ul>
            </div>

            <!-- Campuses -->
            <div class="col-6 col-md-3 mb-4 mb-md-0">
              <h5>Campuses</h5>
              <ul class="list-unstyled mb-0">
                <li><a href="https://www.instagram.com/acc_christ/" target="_blank">Central</a></li>
                <li><a href="https://www.instagram.com/acc_kengeri/" target="_blank">Kengeri</a></li>
                <li><a href="https://www.instagram.com/acc_bgr/" target="_blank">Bannerghatta</a></li>
                <li><a href="https://www.instagram.com/acc_byc/" target="_blank">Yeshwanthpur</a></li>
                <li><a href="https://www.instagram.com/acc_christ_ncr/" target="_blank">Delhi NCR</a></li>
              </ul>
            </div>

            <!-- Social Media & Logo -->
            <div class="col-6 col-md-3 mb-4 mb-md-0">
              <h5>Connect</h5>
              <div class="social-links mb-4">
                <a href="https://www.instagram.com/acc_kengeri/" target="_blank" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                <a href="https://chat.whatsapp.com/KoTpbOt0HZB8Uq0PbNUqrj" target="_blank" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
              </div>
              <a href="https://christuniversity.in/" target="_blank" class="d-inline-block mt-2">
                <img class="img-fluid fim uni-logo" src="Images/University_logo_WH.png" alt="University Logo">
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Copyright Row -->
      <div class="footer-bottom mt-5 pt-4">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start mb-2 mb-md-0">
            <p class="mb-0">&copy; 2026 Association of Christian Christites. All rights reserved.</p>
          </div>
          <div class="col-md-6 text-center text-md-end">
            <p class="mb-0">Designed with <span style="color:var(--accent-gold);">❤️</span> by ACC Web Team</p>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <!--JavaScript Begins Here-->
  <script src="https://kit.fontawesome.com/6d286a1171.js" crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.7.1.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
  <script src="js/preloader.js"></script>
  
  <script src="js/dynamic_loader.js"></script>
  
  <!-- Custom Script for Unified Domains Page -->
  <script>
    $(document).ready(function() {
      // 1. Render all dynamic heads and galleries
      $('.domain-gallery-dynamic').each(function() {
        const domKey = $(this).data('domain');
        // We override the container ID temporarily for the existing function
        const originalGalleryContainer = $("#domain-gallery-container");
        const originalHeadContainer = $("#domain-head-container");
        
        $('<div id="domain-gallery-container"></div>').appendTo('body').hide();
        $('<div id="domain-head-container"></div>').appendTo('body').hide();
        
        // This is a bit hacky due to the existing function relying on hardcoded IDs,
        // so let's write a small custom render loop instead.
      });
      
      // Let's implement a robust render for all domains here
      async function renderAllDomains() {
        const teamDb = await window.getTeamDB();
        const galleryDb = await window.getGalleryDB();
        
        const domainHeadMap = {
          "animation": ["teresa"],
          "liturgy": ["alphy"],
          "outreach": ["manjeera"],
          "logistic": ["elvin"],
          "mediadoc": ["akhilesh", "steeva"],
          "audiovisual": ["joel", "alin", "ashin"]
        };
        
        $('.domain-head-dynamic').each(function() {
          const domKey = $(this).data('domain');
          const container = $(this);
          const headIds = domainHeadMap[domKey] || [];
          const heads = headIds.map(id => teamDb.find(m => m.id === id)).filter(Boolean);
          
          if (heads.length === 1) {
            const m = heads[0];
            let linksHtml = '';
            if (m.links && m.links.length > 0) {
              linksHtml = '<ul class="social-media-icons">';
              m.links.forEach(l => {
                let iconClass = "fab fa-linkedin";
                if (l.type === "instagram") iconClass = "fab fa-instagram";
                else if (l.type === "whatsapp") iconClass = "fab fa-whatsapp";
                linksHtml += `<li><a href="${l.url}" target="_blank"><i class="${iconClass}"></i></a></li>`;
              });
              linksHtml += '</ul>';
            }
            
            container.html(`
              <div class="profile-section-wrapper">
                <div class="profile-img-circle">
                  <img src="${m.image || ''}" alt="${m.name}">
                </div>
                <div class="proftext">
                  <h3>${m.name}</h3>
                  <h4>${m.role}</h4>
                  ${linksHtml}
                </div>
              </div>
            `);
          } else if (heads.length > 1) {
            let innerHtml = '<div class="row g-3">';
            heads.forEach((m, idx) => {
              let linksHtml = '';
              if (m.links && m.links.length > 0) {
                linksHtml = '<ul class="social-media-icons">';
                m.links.forEach(l => {
                  let iconClass = "fab fa-linkedin";
                  if (l.type === "instagram") iconClass = "fab fa-instagram";
                  else if (l.type === "whatsapp") iconClass = "fab fa-whatsapp";
                  linksHtml += `<li><a href="${l.url}" target="_blank"><i class="${iconClass}"></i></a></li>`;
                });
                linksHtml += '</ul>';
              }
              
              let colClass = "col-12";
              let imgStyle = "";
              let titleStyle = "";
              let subtitleStyle = "";
              let wrapperClass = "profile-section-wrapper";
              
              if (domKey === "audiovisual") {
                if (idx === 0) {
                  colClass = "col-12";
                  imgStyle = "width: 100px; height: 100px;";
                } else {
                  colClass = "col-6";
                  imgStyle = "width: 80px; height: 80px; margin-bottom:12px;";
                  titleStyle = "font-size:1.05rem;";
                  subtitleStyle = "font-size:0.75rem;margin-bottom:0;";
                  wrapperClass = "profile-section-wrapper py-3";
                }
              } else if (domKey === "mediadoc") {
                colClass = "col-6 col-md-12";
                imgStyle = "width:100px; height:100px;";
              }
              
              innerHtml += `
                <div class="${colClass}">
                  <div class="${wrapperClass}">
                    <div class="profile-img-circle" style="${imgStyle}">
                      <img src="${m.image || ''}" alt="${m.name}">
                    </div>
                    <div class="proftext">
                      <h3 style="${titleStyle}">${m.name}</h3>
                      <h4 style="${subtitleStyle}">${m.role}</h4>
                      ${linksHtml}
                    </div>
                  </div>
                </div>
              `;
            });
            innerHtml += '</div>';
            container.html(innerHtml);
          }
        });
        
        $('.domain-gallery-dynamic').each(function() {
          const domKey = $(this).data('domain');
          const container = $(this);
          const images = galleryDb[domKey] || [];
          let html = '';
          images.forEach((imgSrc, idx) => {
            html += `
              <div class="col-md-3 col-6 work">
                <div class="img-box">
                  <img src="${imgSrc}" alt="${domKey} Gallery ${idx + 1}">
                </div>
              </div>
            `;
          });
          container.html(html);
        });
      }
      
      renderAllDomains();
      
      // 2. Handle Hash Navigation (e.g. domains.html#liturgy)
      if(window.location.hash) {
        const targetId = window.location.hash.substring(1);
        const triggerEl = document.querySelector(`#pills-${targetId}-tab`);
        if(triggerEl) {
          const tab = new bootstrap.Tab(triggerEl);
          tab.show();
        }
      }
      
      // Update hash on tab click without scrolling
      $('button[data-bs-toggle="pill"]').on('shown.bs.tab', function (e) {
        const id = $(e.target).attr('id').replace('pills-', '').replace('-tab', '');
        history.replaceState(null, null, '#' + id);
        
        // Update Indicator
        updateIndicator(e.target);
        
        // Re-trigger AOS for the new tab
        AOS.refresh();
      });

      // Sliding Indicator Logic
      function updateIndicator(activeTab) {
        if(!activeTab) return;
        const indicator = document.getElementById('tab-indicator');
        if(indicator) {
          indicator.style.width = activeTab.offsetWidth + 'px';
          indicator.style.transform = `translateX(${activeTab.offsetLeft}px)`;
        }
      }
      
      // Init indicator
      setTimeout(() => {
        updateIndicator(document.querySelector('.domain-tab.active'));
      }, 100);
      
      $(window).resize(() => {
        updateIndicator(document.querySelector('.domain-tab.active'));
      });

      AOS.init({ once: false, duration: 800 });
    });
  </script>
</body>
</html>
"""

with open('domains.html', 'w', encoding='utf-8') as f:
    f.write(html_top + html_nav + html_mid + html_tabs + html_bottom)
print("Generated domains.html successfully.")
