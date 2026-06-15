$(document).ready(function() {
  // 1. SESSION MANAGEMENT & LOGOUT
  const adminLoginContainer = $("#admin-login-container");
  const adminDashboardContainer = $("#admin-dashboard-container");
  const adminPasscodeInput = $("#admin-passcode");
  const loginErrorMsg = $("#login-error");

  // Check login state on load
  if (sessionStorage.getItem("acc_admin_logged_in") === "true") {
    showDashboard();
  } else {
    adminLoginContainer.removeClass("d-none");
    adminPasscodeInput.focus();
  }

  // Handle Login submission
  $("#submit-login-btn").on("click", function() {
    authenticateAdmin();
  });

  adminPasscodeInput.on("keypress", function(e) {
    if (e.which === 13) {
      authenticateAdmin();
    }
  });

  function authenticateAdmin() {
    const val = adminPasscodeInput.val().trim();
    if (val === "admin123") {
      sessionStorage.setItem("acc_admin_logged_in", "true");
      showDashboard();
    } else {
      loginErrorMsg.removeClass("d-none");
    }
  }

  function showDashboard() {
    adminLoginContainer.addClass("d-none");
    adminDashboardContainer.removeClass("d-none");
    loadAdminEventsList();
    
    // Reset tabs on fresh login
    $(".admin-tab-btn").removeClass("active");
    $('.admin-tab-btn[data-tab="tab-events"]').addClass("active");
    $(".admin-tab-content").removeClass("active");
    $("#tab-events").addClass("active");
  }

  // Handle Logout
  $("#admin-logout-btn").on("click", function() {
    sessionStorage.removeItem("acc_admin_logged_in");
    window.location.reload();
  });


  // 2. TAB TRANSITIONS
  $(document).on("click", ".admin-tab-btn", function() {
    const targetTab = $(this).data("tab");
    
    $(".admin-tab-btn").removeClass("active");
    $(this).addClass("active");
    
    $(".admin-tab-content").removeClass("active");
    $(`#${targetTab}`).addClass("active");
    
    if (targetTab === "tab-team") {
      loadAdminTeamList();
      resetTeamForm();
    } else if (targetTab === "tab-gallery") {
      loadAdminGalleryPreview();
    } else if (targetTab === "tab-events") {
      loadAdminEventsList();
    }
  });


  // 3. CALENDAR EVENTS MANAGEMENT
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

  function getEventsData() {
    let eventsData = JSON.parse(localStorage.getItem('acc_calendar_events_v2'));
    if (!eventsData) {
      eventsData = defaultEvents;
      localStorage.setItem('acc_calendar_events_v2', JSON.stringify(eventsData));
    }
    return eventsData;
  }

  function saveEventsData(data) {
    localStorage.setItem('acc_calendar_events_v2', JSON.stringify(data));
  }

  // Load existing events list
  function loadAdminEventsList() {
    const listContainer = $("#admin-events-list");
    listContainer.empty();

    const data = getEventsData();
    const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    if (sorted.length === 0) {
      listContainer.html("<p class='text-muted text-center p-3'>No events added yet.</p>");
      return;
    }

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    sorted.forEach(evt => {
      const catLabels = {
        feast: "Feast Day",
        acc: "ACC General",
        liturgy: "Liturgy & Prayers",
        outreach: "Outreach & Charity"
      };

      const dateObj = new Date(evt.date);
      const formattedDate = `${monthNames[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;

      const itemHtml = `
        <div class="admin-event-row">
          <div class="admin-event-info">
            <div class="admin-event-title text-primary">${evt.title}</div>
            <div class="admin-event-date">
              <i class="far fa-calendar-alt"></i> ${formattedDate} | <span class="badge bg-secondary px-2 py-1">${catLabels[evt.category]}</span>
            </div>
          </div>
          <button type="button" class="btn-delete-event" data-id="${evt.id}" title="Delete Event">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      `;
      listContainer.append(itemHtml);
    });
  }

  // Create new event
  $("#add-event-form").on("submit", function(e) {
    e.preventDefault();

    const title = $("#event-title").val().trim();
    const date = $("#event-date").val();
    const time = $("#event-time").val().trim();
    const category = $("#event-category").val();
    const description = $("#event-desc").val().trim();

    const newEvent = {
      id: Date.now(),
      title,
      date,
      category,
      time,
      description
    };

    const data = getEventsData();
    data.push(newEvent);
    saveEventsData(data);

    $("#add-event-form")[0].reset();
    loadAdminEventsList();
    alert("Event added successfully!");
  });

  // Event deletion
  $(document).on("click", ".btn-delete-event", function() {
    const idToDelete = parseInt($(this).data("id"));
    if (confirm("Are you sure you want to delete this event?")) {
      let data = getEventsData();
      data = data.filter(evt => evt.id !== idToDelete);
      saveEventsData(data);
      loadAdminEventsList();
    }
  });


  // 4. CORE TEAM MANAGEMENT
  let activeEditMember = null;
  let teamBase64Image = null;

  function loadAdminTeamList() {
    const listContainer = $("#admin-team-list");
    listContainer.empty();
    
    const db = window.getTeamDB();
    const filterCat = $("#filter-team-category").val();
    const filtered = filterCat === "all" ? db : db.filter(m => m.category === filterCat);
    
    if (filtered.length === 0) {
      listContainer.html("<p class='text-muted text-center p-3'>No team members found.</p>");
      return;
    }
    
    filtered.forEach(m => {
      const catLabels = {
        coordinators: "Coordinator",
        student_coordinators: "Student Coordinator",
        domain_heads: "Domain Head",
        department_heads: "Department Head"
      };
      
      const avatarHtml = m.image 
        ? `<img class="admin-row-avatar" src="${m.image}" alt="${m.name}">`
        : `<div class="admin-row-avatar d-flex align-items-center justify-content-center text-muted" style="font-size:1.2rem;background:rgba(255,255,255,0.05);"><i class="fas fa-user"></i></div>`;

      const itemHtml = `
        <div class="admin-row-item">
          ${avatarHtml}
          <div class="admin-row-details">
            <div class="admin-row-name">${m.name}</div>
            <div class="admin-row-role">${m.role} | <span class="text-secondary small font-monospace">${catLabels[m.category]}</span></div>
          </div>
          <div class="admin-row-actions">
            <button type="button" class="btn-edit-action btn-edit-team-member" data-id="${m.id}" title="Edit Profile">
              <i class="fas fa-pencil-alt"></i>
            </button>
          </div>
        </div>
      `;
      listContainer.append(itemHtml);
    });
  }

  // Handle category filter
  $("#filter-team-category").on("change", function() {
    loadAdminTeamList();
  });

  // Handle Edit click
  $(document).on("click", ".btn-edit-team-member", function() {
    const id = $(this).data("id");
    const db = window.getTeamDB();
    const member = db.find(m => m.id === id);
    
    if (!member) return;
    activeEditMember = member;
    
    const form = $("#edit-team-form");
    form.removeClass("disabled-form opacity-50").css("pointer-events", "auto");
    form.find("input, select, button").removeAttr("disabled");
    
    $("#member-id").val(member.id);
    $("#member-name").val(member.name);
    $("#member-role").val(member.role);
    
    const linkedinObj = member.links ? member.links.find(l => l.type === "linkedin") : null;
    $("#member-linkedin").val(linkedinObj ? linkedinObj.url : "");
    
    if (member.image) {
      if (member.image.startsWith("data:image")) {
        $("#member-img-url").val("");
        $("#member-img-preview").attr("src", member.image).removeClass("d-none");
        $("#member-img-preview-placeholder").addClass("d-none");
      } else {
        $("#member-img-url").val(member.image);
        $("#member-img-preview").attr("src", member.image).removeClass("d-none");
        $("#member-img-preview-placeholder").addClass("d-none");
      }
    } else {
      $("#member-img-url").val("");
      $("#member-img-preview").addClass("d-none").attr("src", "");
      $("#member-img-preview-placeholder").removeClass("d-none");
    }
    
    $("#team-form-title").html(`<i class="fas fa-edit text-orange"></i> Edit: ${member.name}`);
  });

  // Team file picker base64
  $("#member-img-file").on("change", function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        teamBase64Image = e.target.result;
        $("#member-img-preview").attr("src", teamBase64Image).removeClass("d-none");
        $("#member-img-preview-placeholder").addClass("d-none");
        $("#member-img-url").val("");
      };
      reader.readAsDataURL(file);
    }
  });

  // Team text URL input
  $("#member-img-url").on("input", function() {
    const url = $(this).val().trim();
    if (url) {
      teamBase64Image = null;
      $("#member-img-file").val("");
      $("#member-img-preview").attr("src", url).removeClass("d-none");
      $("#member-img-preview-placeholder").addClass("d-none");
    } else {
      $("#member-img-preview").addClass("d-none").attr("src", "");
      $("#member-img-preview-placeholder").removeClass("d-none");
    }
  });

  // Cancel edit
  $("#btn-cancel-team-edit").on("click", function() {
    resetTeamForm();
  });

  function resetTeamForm() {
    activeEditMember = null;
    teamBase64Image = null;
    $("#edit-team-form")[0].reset();
    
    const form = $("#edit-team-form");
    form.addClass("disabled-form opacity-50").css("pointer-events", "none");
    form.find("input, select, button").attr("disabled", true);
    
    $("#member-img-preview").addClass("d-none").attr("src", "");
    $("#member-img-preview-placeholder").removeClass("d-none").text("No Image Chosen");
    $("#team-form-title").text("Select Member to Edit");
  }

  // Save Team profile
  $("#edit-team-form").on("submit", function(e) {
    e.preventDefault();
    if (!activeEditMember) return;
    
    const id = $("#member-id").val();
    const name = $("#member-name").val().trim();
    const role = $("#member-role").val().trim();
    const linkedinUrl = $("#member-linkedin").val().trim();
    const textUrl = $("#member-img-url").val().trim();
    
    const db = window.getTeamDB();
    const idx = db.findIndex(m => m.id === id);
    if (idx === -1) return;
    
    db[idx].name = name;
    db[idx].role = role;
    
    if (!db[idx].links) db[idx].links = [];
    const linkIdx = db[idx].links.findIndex(l => l.type === "linkedin");
    if (linkedinUrl) {
      if (linkIdx > -1) {
        db[idx].links[linkIdx].url = linkedinUrl;
      } else {
        db[idx].links.push({ type: "linkedin", url: linkedinUrl });
      }
    } else {
      if (linkIdx > -1) {
        db[idx].links.splice(linkIdx, 1);
      }
    }
    
    if (teamBase64Image) {
      db[idx].image = teamBase64Image;
    } else if (textUrl) {
      db[idx].image = textUrl;
    }
    
    window.saveTeamDB(db);
    loadAdminTeamList();
    resetTeamForm();
    alert("Profile saved successfully!");
  });


  // 5. DOMAIN GALLERIES MANAGEMENT
  let galleryBase64Image = null;

  $("#gallery-img-file").on("change", function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        galleryBase64Image = e.target.result;
        $("#gallery-img-preview").attr("src", galleryBase64Image).removeClass("d-none");
        $("#gallery-img-preview-placeholder").addClass("d-none");
        $("#gallery-img-url").val("");
      };
      reader.readAsDataURL(file);
    }
  });

  $("#gallery-img-url").on("input", function() {
    const url = $(this).val().trim();
    if (url) {
      galleryBase64Image = null;
      $("#gallery-img-file").val("");
      $("#gallery-img-preview").attr("src", url).removeClass("d-none");
      $("#gallery-img-preview-placeholder").addClass("d-none");
    } else {
      $("#gallery-img-preview").addClass("d-none").attr("src", "");
      $("#gallery-img-preview-placeholder").removeClass("d-none");
    }
  });

  function loadAdminGalleryPreview() {
    const domain = $("#gallery-domain-select").val();
    const grid = $("#admin-gallery-preview-grid");
    const countLabel = $("#gallery-count-label");
    
    grid.empty();
    const db = window.getGalleryDB();
    const images = db[domain] || [];
    
    countLabel.text(`${images.length} Images`);
    
    if (images.length === 0) {
      grid.html("<p class='text-muted text-center col-12 p-3'>No images in this domain gallery yet.</p>");
      return;
    }
    
    images.forEach((img, idx) => {
      const itemHtml = `
        <div class="admin-gallery-item">
          <img src="${img}" alt="Preview">
          <button type="button" class="btn-remove-gallery-img" data-idx="${idx}" title="Remove Image">&times;</button>
        </div>
      `;
      grid.append(itemHtml);
    });
  }

  $("#gallery-domain-select").on("change", function() {
    loadAdminGalleryPreview();
  });

  $("#add-gallery-form").on("submit", function(e) {
    e.preventDefault();
    
    const domain = $("#gallery-domain-select").val();
    const textUrl = $("#gallery-img-url").val().trim();
    
    let imageToAdd = null;
    if (galleryBase64Image) {
      imageToAdd = galleryBase64Image;
    } else if (textUrl) {
      imageToAdd = textUrl;
    }
    
    if (!imageToAdd) {
      alert("Please select a file or enter an image URL.");
      return;
    }
    
    const db = window.getGalleryDB();
    if (!db[domain]) db[domain] = [];
    db[domain].push(imageToAdd);
    
    window.saveGalleryDB(db);
    
    $("#add-gallery-form")[0].reset();
    galleryBase64Image = null;
    $("#gallery-img-preview").addClass("d-none").attr("src", "");
    $("#gallery-img-preview-placeholder").removeClass("d-none");
    
    loadAdminGalleryPreview();
    alert("Image added successfully!");
  });

  $(document).on("click", ".btn-remove-gallery-img", function() {
    const idx = parseInt($(this).data("idx"));
    const domain = $("#gallery-domain-select").val();
    
    if (confirm("Are you sure you want to remove this image from the gallery?")) {
      const db = window.getGalleryDB();
      if (db[domain] && db[domain][idx] !== undefined) {
        db[domain].splice(idx, 1);
        window.saveGalleryDB(db);
        loadAdminGalleryPreview();
      }
    }
  });
});
