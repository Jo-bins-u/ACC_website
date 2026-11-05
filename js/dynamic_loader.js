// ACC Website Dynamic Content Loader & Database Engine
(function() {
  // 1. Baseline Datasets for Seeding
  const defaultEvents = [
    { id: 1, title: "Feast of Mary, Mother of God", date: "2026-01-01", category: "feast", time: "All Day", description: "Solemnity of Mary, Holy Mother of God." },
    { id: 2, title: "Feast of St. Kuriakose Elias Chavara", date: "2026-01-03", category: "feast", time: "All Day", description: "Feast of the founder of the CMI congregation and Patron of Christ University." },
    { id: 3, title: "The Epiphany of the Lord", date: "2026-01-06", category: "feast", time: "All Day", description: "Commemorating the visit of the Magi to the Christ child." },
    { id: 4, title: "Conversion of St. Paul", date: "2026-01-25", category: "feast", time: "All Day", description: "Feast of the conversion of the Apostle Paul." },
    { id: 5, title: "Presentation of the Lord", date: "2026-02-02", category: "feast", time: "All Day", description: "Feast of the presentation of Jesus in the temple." },
    { id: 6, title: "Feast of St. Joseph", date: "2026-03-19", category: "feast", time: "All Day", description: "Solemnity of Saint Joseph, Husband of the Blessed Virgin Mary." },
    { id: 7, title: "Feast of the Annunciation", date: "2026-03-25", category: "feast", time: "All Day", description: "Annunciation of the Lord by Angel Gabriel to Mary." },
    { id: 8, title: "Good Friday", date: "2026-04-03", category: "feast", time: "All Day", description: "Commemoration of the Crucifixion of Jesus Christ." },
    { id: 9, title: "Easter Sunday", date: "2026-04-05", category: "feast", time: "All Day", description: "Celebrating the glorious Resurrection of our Lord Jesus Christ." },
    { id: 10, title: "Pentecost Sunday", date: "2026-05-24", category: "feast", time: "All Day", description: "Commemorating the descent of the Holy Spirit upon the Apostles." },
    { id: 11, title: "Corpus Christi", date: "2026-06-04", category: "feast", time: "All Day", description: "Solemnity of the Most Holy Body and Blood of Christ." },
    { id: 12, title: "Feast of St. Peter and St. Paul", date: "2026-06-29", category: "feast", time: "All Day", description: "Honoring the martyrdom of the two chief Apostles in Rome." },
    { id: 13, title: "Feast of St. Thomas the Apostle", date: "2026-07-03", category: "feast", time: "All Day", description: "Patron Saint of India, who brought Christ's message to Indian shores." },
    { id: 14, title: "Feast of St. Joachim and St. Anne", date: "2026-07-26", category: "feast", time: "All Day", description: "Feast of the parents of the Blessed Virgin Mary." },
    { id: 15, title: "Feast of St. Ignatius of Loyola", date: "2026-07-31", category: "feast", time: "All Day", description: "Feast of the founder of the Society of Jesus (Jesuits)." },
    { id: 16, title: "Transfiguration of the Lord", date: "2026-08-06", category: "feast", time: "All Day", description: "Commemorating the Transfiguration of Jesus on Mount Tabor." },
    { id: 17, title: "Assumption of Mother Mary", date: "2026-08-15", category: "feast", time: "All Day", description: "The Assumption of the Blessed Virgin Mary into Heaven." },
    { id: 18, title: "Feast of St. Augustine", date: "2026-08-28", category: "feast", time: "All Day", description: "Feast of Saint Augustine, Bishop and Doctor of the Church." },
    { id: 19, title: "Nativity of Blessed Virgin Mary", date: "2026-09-08", category: "feast", time: "All Day", description: "Celebrating the birth of the Blessed Virgin Mary (Monti Fest)." },
    { id: 20, title: "Feast of St. Vincent de Paul", date: "2026-09-27", category: "feast", time: "All Day", description: "Feast of the patron saint of charity." },
    { id: 21, title: "Feast of the Archangels", date: "2026-09-29", category: "feast", time: "All Day", description: "Feast of Saints Michael, Gabriel, and Raphael." },
    { id: 22, title: "Feast of St. Therese of Lisieux", date: "2026-10-01", category: "feast", time: "All Day", description: "Feast of the Little Flower, Patroness of missions." },
    { id: 23, title: "Feast of St. Francis of Assisi", date: "2026-10-04", category: "feast", time: "All Day", description: "Patron Saint of animals and the environment." },
    { id: 24, title: "Feast of St. Teresa of Avila", date: "2026-10-15", category: "feast", time: "All Day", description: "Feast of the great Carmelite mystic and doctor of the Church." },
    { id: 25, title: "All Saints' Day", date: "2026-11-01", category: "feast", time: "All Day", description: "Solemnity honoring all the saints, known and unknown." },
    { id: 26, title: "All Souls' Day", date: "2026-11-02", category: "feast", time: "All Day", description: "Day of prayer and remembrance for all the faithful departed." },
    { id: 27, title: "Feast of St. Cecilia", date: "2026-11-22", category: "feast", time: "All Day", description: "Feast of St. Cecilia, patroness of musicians and singers." },
    { id: 28, title: "Feast of St. Andrew the Apostle", date: "2026-11-30", category: "feast", time: "All Day", description: "Feast of Saint Andrew, Apostle of Christ." },
    { id: 29, title: "Feast of St. Francis Xavier", date: "2026-12-03", category: "feast", time: "All Day", description: "Feast of the great Jesuit missionary to Asia." },
    { id: 30, title: "Immaculate Conception", date: "2026-12-08", category: "feast", time: "All Day", description: "Solemnity of the Immaculate Conception of the Blessed Virgin Mary." },
    { id: 31, title: "Christmas", date: "2026-12-25", category: "feast", time: "All Day", description: "The Nativity of our Lord and Savior Jesus Christ." },
    { id: 32, title: "Feast of St. Stephen", date: "2026-12-26", category: "feast", time: "All Day", description: "Feast of the first Christian martyr." }
  ];

  const defaultTeam = window.ACC_DEFAULT_TEAM || [];

  const defaultGalleries = {
    "animation": ["https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/anim/anim1.png", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/anim/anim2.png", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/anim/anim3.JPG", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/anim/anim4.jpg"],
    "liturgy": ["https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/lit/lit1.jpg", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/lit/lit2.JPG", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/lit/lit3.JPG", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/lit/lit4.JPG"],
    "outreach": ["https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/outr/outr1.jpg", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/outr/outr2.jpg", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/outr/outr3.jpg", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/outr/outr4.jpg"],
    "audiovisual": ["https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/AV/av1.JPG", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/AV/av2.JPG", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/AV/av3.JPG", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/AV/av4.JPG"],
    "logistic": [],
    "mediadoc": ["https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/mnc/mnc1.JPG", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/mnc/mnc2.png", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/mnc/mnc3.png", "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/mnc/mnc4.PNG"]
  };

  const SUPABASE_ASSET_PREFIX = "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/";
  window.ACC_ASSET_URL = function(source) {
    if (!source) return "";
    const value = String(source);
    if (/^(?:https?:|data:|blob:)/i.test(value)) return value;
    const match = value.match(/^(?:\.\.\/)?\/?Images\/(.*)$/i);
    if (!match) return value;
    const objectPath = match[1].replace(/\\/g, "/").split("/").map(encodeURIComponent).join("/");
    return SUPABASE_ASSET_PREFIX + objectPath;
  };
  window.ACC_ESCAPE_HTML = function(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  };
  window.ACC_SAFE_LINK = function(value) {
    try { const url = new URL(String(value || ""), window.location.href); return url.protocol === "https:" ? url.href : "#"; }
    catch (_) { return "#"; }
  };
  const teamPhotoOverrides = {
    "jerin geo jacob": "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/Core%20Team%20Photos/Jerin%20Geo%20Jacob.JPG",
    "jincy cherian": "https://snddwjckkdejnnmnwrgz.supabase.co/storage/v1/object/public/acc-site-media/Core%20Team%20Photos/Jincy%20Cherian.JPG"
  };
  const teamPhotoPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='130' height='130' viewBox='0 0 130 130'%3E%3Crect width='130' height='130' fill='%231a1d2e'/%3E%3Ccircle cx='65' cy='50' r='28' fill='%23d4af37' opacity='0.25'/%3E%3Cpath d='M25 115 Q25 88 65 88 Q105 88 105 115' fill='%23d4af37' opacity='0.18'/%3E%3C/svg%3E";
  window.ACC_TEAM_IMAGE = function(member) {
    if (!member) return teamPhotoPlaceholder;
    const override = teamPhotoOverrides[String(member.name || '').trim().toLowerCase()];
    if (override) return override;
    const image = String(member.image || '');
    if (/^(?:\.\.\/)?\/?Images\/CORE TEAM\//i.test(image) || !image) return teamPhotoPlaceholder;
    return image;
  };

  // 2. Global cache Database layer
  window.ACC_DB_CACHE = null;
  let refreshStarted = false;

  function readLocalJson(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  async function ensureCacheLoaded() {
    if (window.ACC_DB_CACHE) return;

    const currentTeam = localStorage.getItem("acc_db_team_version") === "4"
      ? readLocalJson("acc_db_team_v4", null)
      : null;
    window.ACC_DB_CACHE = {
      events: readLocalJson("acc_calendar_events_v2", defaultEvents),
      team: currentTeam && currentTeam.length ? currentTeam : defaultTeam,
      gallery: readLocalJson("acc_db_gallery_v3", defaultGalleries)
    };

    // Render from local data immediately; refresh the cache in the background.
    if (refreshStarted) return;
    refreshStarted = true;
    const dbApiUrl = "https://script.google.com/macros/s/AKfycbwh0oKgp7KbjyKzsSlzv_KvgUJPBlh6_7C8uJMcLiOgl8cD-FjF59BWbHKpJiSLCL_ytA/exec";
    if (dbApiUrl) {
      fetch(dbApiUrl, { signal: AbortSignal.timeout(7000) })
        .then(response => response.ok ? response.json() : null)
        .then(remoteDb => {
          if (!remoteDb || !window.ACC_DB_CACHE || window.ACC_DB_DIRTY) return;
          const previousTeam = JSON.stringify(window.ACC_DB_CACHE.team);
          if (Array.isArray(remoteDb.events)) window.ACC_DB_CACHE.events = remoteDb.events;
          if (Array.isArray(remoteDb.team) && remoteDb.team.length) window.ACC_DB_CACHE.team = remoteDb.team;
          if (remoteDb.gallery && typeof remoteDb.gallery === "object") window.ACC_DB_CACHE.gallery = remoteDb.gallery;
          localStorage.setItem("acc_calendar_events_v2", JSON.stringify(window.ACC_DB_CACHE.events));
          localStorage.setItem("acc_db_team_v4", JSON.stringify(window.ACC_DB_CACHE.team));
          localStorage.setItem("acc_db_team_version", "4");
          localStorage.setItem("acc_db_gallery_v3", JSON.stringify(window.ACC_DB_CACHE.gallery));
          if (previousTeam !== JSON.stringify(window.ACC_DB_CACHE.team)) {
            window.dispatchEvent(new Event("acc:team-updated"));
          }
        })
        .catch(err => console.warn("Using cached ACC content; database refresh failed:", err));
    }
  }

  // 3. Centralized Database Operations (Promises / Async)

  // 3.1 EVENTS API
  window.getEventsDB = async function() {
    await ensureCacheLoaded();
    return window.ACC_DB_CACHE.events;
  };

  // 3.2 TEAM API
  window.getTeamDB = async function() {
    await ensureCacheLoaded();
    return window.ACC_DB_CACHE.team;
  };

  // 3.3 GALLERY API
  window.getGalleryDB = async function() {
    await ensureCacheLoaded();
    return window.ACC_DB_CACHE.gallery;
  };

  // 4. Render Handlers (Async-Aware)
  window.renderAboutTeam = async function() {
    const db = await window.getTeamDB();
    const container = $("#team-groups-container");
    if (!container.length) return;
    container.empty();
    const groups = [["coordinators","Coordinators"],["student_coordinators","Student Coordinators"],["animators","Animators"],["documentation","Documentation"],["finance","Finance"],["logistics","Logistics"],["decor","Decor"],["outreach","Outreach"],["liturgy","Liturgy"],["choir","Choir"],["dance","Dance"],["theatre","Theatre"],["media","Media"],["engineering","Engineering"],["psychology","Psychology"],["bba","BBA"],["architecture","Architecture"],["mba","MBA"]];
    groups.forEach(function(group) {
      const members = db.filter(function(member){ return member.category === group[0]; });
      if (!members.length) return;
      const section = $("<div class=\"row justify-content-center px-2 team-group\"></div>");
      section.append($("<h2 class=\"col-12 text-center\" data-aos=\"blur-reveal\"></h2>").text(group[1]));
      members.forEach(function(member, idx) {
        const card = $("<div class=\"col-lg-3 col-md-4 col-6 mb-4 profile\" data-aos=\"blur-reveal\"></div>");
        const profile = $("<div class=\"profile-card\"></div>");
        const imageBox = $("<div class=\"img-box\"></div>");
        const image = $("<img loading=\"lazy\" decoding=\"async\" width=\"320\" height=\"320\">").attr("src", window.ACC_ASSET_URL(window.ACC_TEAM_IMAGE(member))).attr("alt", member.name);
        image.on("error", function(){ this.onerror=null; this.src=teamPhotoPlaceholder; });
        imageBox.append(image); profile.append(imageBox);
        profile.append($("<h3></h3>").text(member.name), $("<h4></h4>").text(member.role));
        if(member.links && member.links.length){ const links=$("<ul class=\"social-media-icons\"></ul>"); member.links.forEach(function(link){ const icon=link.type==="instagram"?"fa-brands fa-instagram":link.type==="whatsapp"?"fa-brands fa-whatsapp":"fa-brands fa-linkedin"; links.append($("<li></li>").append($("<a target=\"_blank\" rel=\"noopener noreferrer\"></a>").attr("href",window.ACC_SAFE_LINK(link.url)).append($("<i></i>").addClass(icon)))); }); profile.append(links); }
        card.append(profile); section.append(card);
      });
      container.append(section);
    });
    if (window.AOS && typeof window.AOS.refreshHard === "function") {
      window.AOS.refreshHard();
    }
  };

  window.renderDomainHeadsAndGalleries = async function(domainKey) {
    const teamDb = await window.getTeamDB();
    const galleryDb = await window.getGalleryDB();
    
    // Render Heads
    const headContainer = $("#domain-head-container");
    if (headContainer.length) {
      headContainer.empty();
      
      const domainHeadMap = {
        "animation": ["shohil", "atlin_chacko"],
        "liturgy": ["joseph_john", "sreya_ann_binoy", "abin_joseph"],
        "outreach": ["kevin_samuel", "jonnet_shaji_john", "sani_sajayan"],
        "logistic": ["abel_francis", "savio_soy"],
        "mediadoc": ["jis_mariya", "cerine_roy_thomas", "joseph_padayatty", "daine_cyriac_sinoj", "george_sebastian"],
        "audiovisual": ["michelle_devasia", "alex_baby", "tobit_siby", "ann_maria_aby", "tisha_pinheiro", "amvi_jerone", "diya_susan_binu", "max_t_alenchery", "anson_toji"]
      };
      
      const headIds = domainHeadMap[domainKey] || [];
      const heads = headIds.map(id => teamDb.find(m => m.id === id)).filter(Boolean);
      
      if (heads.length === 1) {
        const m = heads[0];
        let linksHtml = '';
        if (m.links && m.links.length > 0) {
          linksHtml = `<ul class="social-media-icons">`;
          m.links.forEach(l => {
            let iconClass = "fab fa-linkedin";
            if (l.type === "instagram") iconClass = "fab fa-instagram";
            else if (l.type === "whatsapp") iconClass = "fab fa-whatsapp";
            linksHtml += `<li><a href="${window.ACC_SAFE_LINK(l.url)}" target="_blank"><i class="${iconClass}"></i></a></li>`;
          });
          linksHtml += `</ul>`;
        }
        
        const html = `
          <div class="profile-section-wrapper" data-aos="blur-reveal" data-aos-duration="1200">
            <div class="profile-img-circle">
              <img src="${window.ACC_ESCAPE_HTML(window.ACC_ASSET_URL(window.ACC_TEAM_IMAGE(m)))}" alt="${window.ACC_ESCAPE_HTML(m.name)}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%231a1d2e\'/%3E%3Ccircle cx=\'50\' cy=\'38\' r=\'20\' fill=\'%23d4af37\' opacity=\'0.2\'/%3E%3Cpath d=\'M15 90 Q15 65 50 65 Q85 65 85 90\' fill=\'%23d4af37\' opacity=\'0.15\'/%3E%3C/svg%3E'">
            </div>
            <div class="proftext">
              <h3>${window.ACC_ESCAPE_HTML(m.name)}</h3>
              <h4>${window.ACC_ESCAPE_HTML(m.role)}</h4>
              ${linksHtml}
            </div>
          </div>
        `;
        headContainer.html(html);
      } else if (heads.length > 1) {
        let innerHtml = `<div class="row g-3">`;
        heads.forEach((m, idx) => {
          let linksHtml = '';
          if (m.links && m.links.length > 0) {
            linksHtml = `<ul class="social-media-icons">`;
            m.links.forEach(l => {
              let iconClass = "fab fa-linkedin";
              if (l.type === "instagram") iconClass = "fab fa-instagram";
              else if (l.type === "whatsapp") iconClass = "fab fa-whatsapp";
              linksHtml += `<li><a href="${window.ACC_SAFE_LINK(l.url)}" target="_blank"><i class="${iconClass}"></i></a></li>`;
            });
            linksHtml += `</ul>`;
          }
          
          let colClass = "col-12";
          let imgStyle = "";
          let titleStyle = "";
          let subtitleStyle = "";
          let wrapperClass = "profile-section-wrapper";
          
          if (domainKey === "audiovisual") {
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
          } else if (domainKey === "mediadoc") {
            colClass = "col-6 col-md-12";
            imgStyle = "width:100px; height:100px;";
          }
          
          const delay = idx * 100;
          innerHtml += `
            <div class="${colClass}" data-aos="blur-reveal" data-aos-duration="1200" data-aos-delay="${delay}">
              <div class="${wrapperClass}">
                <div class="profile-img-circle" style="${imgStyle}">
                  <img src="${window.ACC_ESCAPE_HTML(window.ACC_ASSET_URL(window.ACC_TEAM_IMAGE(m)))}" alt="${window.ACC_ESCAPE_HTML(m.name)}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Crect width=\'100\' height=\'100\' fill=\'%231a1d2e\'/%3E%3Ccircle cx=\'50\' cy=\'38\' r=\'20\' fill=\'%23d4af37\' opacity=\'0.2\'/%3E%3Cpath d=\'M15 90 Q15 65 50 65 Q85 65 85 90\' fill=\'%23d4af37\' opacity=\'0.15\'/%3E%3C/svg%3E'">
                </div>
                <div class="proftext">
                  <h3 style="${titleStyle}">${window.ACC_ESCAPE_HTML(m.name)}</h3>
                  <h4 style="${subtitleStyle}">${window.ACC_ESCAPE_HTML(m.role)}</h4>
                  ${linksHtml}
                </div>
              </div>
            </div>
          `;
        });
        innerHtml += `</div>`;
        headContainer.html(innerHtml);
      }
    }
    
    // Render Galleries
    const galleryContainer = $("#domain-gallery-container");
    if (galleryContainer.length) {
      galleryContainer.empty();
      const images = galleryDb[domainKey] || [];
      images.forEach((imgSrc, idx) => {
        const delay = (idx + 1) * 100;
        const imgHtml = `
          <div class="col-md-3 col-6 work" data-aos="blur-reveal" data-aos-duration="1200" data-aos-delay="${delay}">
            <div class="img-box">
              <img src="${window.ACC_ESCAPE_HTML(window.ACC_ASSET_URL(imgSrc))}" alt="${window.ACC_ESCAPE_HTML(domainKey)} Gallery ${idx + 1}">
            </div>
          </div>
        `;
        galleryContainer.append(imgHtml);
      });
    }
  };

  // 5. Auto Render Trigger on Document Ready
  $(document).ready(function() {
    // Determine which page we are on by looking at unique elements in the DOM
    if ($('#team-groups-container').length > 0) {
      window.addEventListener("acc:team-updated", window.renderAboutTeam);
      window.renderAboutTeam();
    } 
    
    // For domain pages, they all have #domain-head-container
    if ($('#domain-head-container').length > 0) {
      // Get the domain from the body ID or URL
      const path = window.location.pathname.toLowerCase();
      let domainKey = '';
      if (path.includes('animation')) domainKey = 'animation';
      else if (path.includes('liturgy')) domainKey = 'liturgy';
      else if (path.includes('outreach')) domainKey = 'outreach';
      else if (path.includes('audiovisual')) domainKey = 'audiovisual';
      else if (path.includes('logistic')) domainKey = 'logistic';
      else if (path.includes('mediadoc')) domainKey = 'mediadoc';
      
      if (domainKey) {
        window.renderDomainHeadsAndGalleries(domainKey);
      }
    }
  });
})();
