// ACC Website Dynamic Content Loader & Database Engine
(function() {
  // 1. Default Database Baseline
  const defaultTeam = [
    // Coordinators
    { id: "frshijin", name: "Fr. Shijin PJ CMI", role: "Coordinator", category: "coordinators", image: "Images/CORE TEAM/frshijin.jpg", links: [] },
    { id: "jeringeo", name: "Jerin Geo Jacob", role: "Faculty Coordinator", category: "coordinators", image: "", links: [] },
    { id: "jincy", name: "Jincy Cherian", role: "Faculty Coordinator", category: "coordinators", image: "", links: [] },
    
    // Student Coordinators
    { id: "edwin", name: "Edwin Jose Cyril", role: "Student Coordinator", category: "student_coordinators", image: "Images/CORE TEAM/edwin.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/edwin-jose-9b7b8221a/" }] },
    { id: "cherry", name: "Cherry Rose Prakash", role: "Student Coordinator", category: "student_coordinators", image: "Images/CORE TEAM/cherry.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/cherry-rose-prakash-470960254/" }] },
    
    // Domain Heads
    { id: "teresa", name: "Teresa Jose", role: "Animation Head", category: "domain_heads", image: "Images/CORE TEAM/teresa.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/teresa-jose-643330260/" }, { type: "instagram", url: "https://www.instagram.com/_alp_hy_/" }, { type: "whatsapp", url: "https://wa.me/qr/7YQ4BGDJNV6YM1" }] },
    { id: "alphy", name: "Alphy Jose", role: "Liturgy Head", category: "domain_heads", image: "Images/CORE TEAM/Alphy.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/alphyjose777/" }] },
    { id: "akhilesh", name: "Akhilesh Kumar", role: "Media Head", category: "domain_heads", image: "Images/CORE TEAM/Akhilesh.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/akhilesh-kumar-4402a8248/" }] },
    { id: "steeva", name: "Steeva Xavier", role: "Communication Head", category: "domain_heads", image: "Images/CORE TEAM/steeva.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/steeva-xavier-aba68a262/" }] },
    { id: "joel", name: "Joel Mathew", role: "Choir Head", category: "domain_heads", image: "Images/CORE TEAM/joel.jpg", links: [] },
    { id: "alin", name: "Alin Teresa Jose", role: "Dance Head", category: "domain_heads", image: "Images/CORE TEAM/alin.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/alin-theresa-jose-a4a8b72a4/" }] },
    { id: "ashin", name: "Ashin Shibu Joseph", role: "Theatre Head", category: "domain_heads", image: "Images/CORE TEAM/ashin.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/ashin-shibu-joseph-68300126b/" }] },
    { id: "manjeera", name: "Manjeera Manoj", role: "Outreach Head", category: "domain_heads", image: "Images/CORE TEAM/manjeera.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/manjeera-manoj-088a7123b/" }] },
    { id: "elvin", name: "Elvin Davis", role: "Logistics & Hospitality Head", category: "domain_heads", image: "Images/CORE TEAM/elvin.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/elvin-davis-ba68a0246/" }] },
    
    // Department Heads
    { id: "williams", name: "Williams Palathingal", role: "Engineering Head", category: "department_heads", image: "Images/CORE TEAM/williams.jpg", links: [] },
    { id: "alex", name: "Alex OS", role: "Engineering Head", category: "department_heads", image: "Images/CORE TEAM/alex.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/os-alex/" }] },
    { id: "dona", name: "Dona Milton", role: "Architecture Head", category: "department_heads", image: "Images/CORE TEAM/dona.jpg", links: [] },
    { id: "karishma", name: "Karishma Devasia", role: "Architecture Head", category: "department_heads", image: "Images/CORE TEAM/karishma.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/karishma-devasia-07368a2a3/" }] },
    { id: "ruben", name: "Reuben Richards", role: "Psychology Head", category: "department_heads", image: "Images/CORE TEAM/ruben.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/richards-reuben-6707a4230/" }] },
    { id: "elaine", name: "Elaine Elsa Siby", role: "Psychology Head", category: "department_heads", image: "Images/CORE TEAM/alkaline.jpg", links: [{ type: "linkedin", url: "https://www.linkedin.com/in/elaine-elsa-siby-a1b93026b/" }] },
    { id: "melvin", name: "Melvin Kochummen Biju", role: "BBA Head", category: "department_heads", image: "Images/CORE TEAM/melvin.jpg", links: [] },
    { id: "soshan", name: "Soshan Ramung", role: "BBA Head", category: "department_heads", image: "Images/CORE TEAM/soshan.jpg", links: [] }
  ];

  const defaultGalleries = {
    "animation": [
      "Images/anim/anim1.png",
      "Images/anim/anim2.png",
      "Images/anim/anim3.JPG",
      "Images/anim/anim4.jpg"
    ],
    "liturgy": [
      "Images/lit/lit1.jpg",
      "Images/lit/lit2.JPG",
      "Images/lit/lit3.JPG",
      "Images/lit/lit4.JPG"
    ],
    "outreach": [
      "Images/outr/outr1.jpg",
      "Images/outr/outr2.jpg",
      "Images/outr/outr3.jpg",
      "Images/outr/outr4.jpg"
    ],
    "audiovisual": [
      "Images/AV/av1.JPG",
      "Images/AV/av2.JPG",
      "Images/AV/av3.JPG",
      "Images/AV/av4.JPG"
    ],
    "logistic": [],
    "mediadoc": [
      "Images/mnc/mnc1.JPG",
      "Images/mnc/mnc2.png",
      "Images/mnc/mnc3.png",
      "Images/mnc/mnc4.PNG"
    ]
  };

  // 2. Database Load Helpers
  window.getTeamDB = function() {
    let db = localStorage.getItem('acc_db_team_v3');
    if (!db) {
      localStorage.setItem('acc_db_team_v3', JSON.stringify(defaultTeam));
      return defaultTeam;
    }
    return JSON.parse(db);
  };

  window.saveTeamDB = function(data) {
    localStorage.setItem('acc_db_team_v3', JSON.stringify(data));
  };

  window.getGalleryDB = function() {
    let db = localStorage.getItem('acc_db_gallery_v3');
    if (!db) {
      localStorage.setItem('acc_db_gallery_v3', JSON.stringify(defaultGalleries));
      return defaultGalleries;
    }
    return JSON.parse(db);
  };

  window.saveGalleryDB = function(data) {
    localStorage.setItem('acc_db_gallery_v3', JSON.stringify(data));
  };

  // 3. Render Helpers
  window.renderAboutTeam = function() {
    const db = window.getTeamDB();
    
    const renderCategory = (category, containerId, title) => {
      const container = $(`#${containerId}`);
      if (!container.length) return;
      container.empty();
      container.append(`<h2 class="col-12 text-center" data-aos="fade-up">${title}</h2>`);
      
      const members = db.filter(m => m.category === category);
      members.forEach((m, idx) => {
        let linksHtml = '';
        if (m.links && m.links.length > 0) {
          linksHtml = `<ul class="social-media-icons">`;
          m.links.forEach(l => {
            let iconClass = "fa-brands fa-linkedin";
            if (l.type === "instagram") iconClass = "fa-brands fa-instagram";
            else if (l.type === "whatsapp") iconClass = "fa-brands fa-whatsapp";
            linksHtml += `<li><a href="${l.url}" target="_blank"><i class="${iconClass}"></i></a></li>`;
          });
          linksHtml += `</ul>`;
        }
        
        const delay = (idx + 1) * 50;
        const memberHtml = `
          <div class="col-lg-3 col-md-4 col-6 mb-4 profile" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${delay}">
            <div class="profile-card">
              <div class="img-box">
                <img src="${m.image || ''}" alt="${m.name}">
              </div>
              <h3>${m.name}</h3>
              <h4>${m.role}</h4>
              ${linksHtml}
            </div>
          </div>
        `;
        container.append(memberHtml);
      });
    };
    
    renderCategory("coordinators", "coordinators-container", "Coordinators");
    renderCategory("student_coordinators", "student-coordinators-container", "Student Coordinators");
    renderCategory("domain_heads", "domain-heads-container", "Domain Heads");
    renderCategory("department_heads", "dept-heads-container", "Department Heads");
  };

  window.renderDomainHeadsAndGalleries = function(domainKey) {
    const teamDb = window.getTeamDB();
    const galleryDb = window.getGalleryDB();
    
    // Render Heads
    const headContainer = $("#domain-head-container");
    if (headContainer.length) {
      headContainer.empty();
      
      const domainHeadMap = {
        "animation": ["teresa"],
        "liturgy": ["alphy"],
        "outreach": ["manjeera"],
        "logistic": ["elvin"],
        "mediadoc": ["akhilesh", "steeva"],
        "audiovisual": ["joel", "alin", "ashin"]
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
            linksHtml += `<li><a href="${l.url}" target="_blank"><i class="${iconClass}"></i></a></li>`;
          });
          linksHtml += `</ul>`;
        }
        
        const html = `
          <div class="profile-section-wrapper" data-aos="zoom-in" data-aos-duration="1000">
            <div class="profile-img-circle">
              <img src="${m.image || ''}" alt="${m.name}">
            </div>
            <div class="proftext">
              <h3>${m.name}</h3>
              <h4>${m.role}</h4>
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
              linksHtml += `<li><a href="${l.url}" target="_blank"><i class="${iconClass}"></i></a></li>`;
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
            <div class="${colClass}" data-aos="zoom-in" data-aos-duration="1000" data-aos-delay="${delay}">
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
          <div class="col-md-3 col-6 work" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="${delay}">
            <div class="img-box">
              <img src="${imgSrc}" alt="${domainKey} Gallery ${idx + 1}">
            </div>
          </div>
        `;
        galleryContainer.append(imgHtml);
      });
    }
  };

  // 4. Initialize Database on Page Load
  window.getTeamDB();
  window.getGalleryDB();

  // 5. Auto Render Trigger
  $(document).ready(function() {
    const filename = window.location.pathname.split('/').pop().toLowerCase();
    if (filename === 'about.html') {
      window.renderAboutTeam();
    } else if (filename === 'animation.html') {
      window.renderDomainHeadsAndGalleries('animation');
    } else if (filename === 'liturgy.html') {
      window.renderDomainHeadsAndGalleries('liturgy');
    } else if (filename === 'outreach.html') {
      window.renderDomainHeadsAndGalleries('outreach');
    } else if (filename === 'audiovisual.html') {
      window.renderDomainHeadsAndGalleries('audiovisual');
    } else if (filename === 'logistic.html') {
      window.renderDomainHeadsAndGalleries('logistic');
    } else if (filename === 'mediadoc.html') {
      window.renderDomainHeadsAndGalleries('mediadoc');
    }
  });
})();
