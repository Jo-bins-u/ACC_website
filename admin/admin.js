$(document).ready(function() {
  // Invalidate cache at startup in admin portal to force fresh reload
  window.ACC_DB_CACHE = null;

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
    window.ACC_DB_CACHE = null; // force fetch fresh database state
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
  async function getEventsData() {
    return await window.getEventsDB();
  }

  async function saveEventsData(data) {
    await window.saveEventsDB(data);
  }

  // Load existing events list
  async function loadAdminEventsList() {
    const listContainer = $("#admin-events-list");
    listContainer.html("<div class='text-center p-3'><div class='spinner-border text-orange' role='status'><span class='visually-hidden'>Loading...</span></div></div>");

    const data = await getEventsData();
    const sorted = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    listContainer.empty();

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
  $("#add-event-form").on("submit", async function(e) {
    e.preventDefault();

    const submitBtn = $(this).find('button[type="submit"]');
    const origText = submitBtn.text();
    submitBtn.attr("disabled", true).text("Saving...");

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

    try {
      const data = await getEventsData();
      data.push(newEvent);
      await saveEventsData(data);

      $("#add-event-form")[0].reset();
      await loadAdminEventsList();
      alert("Event added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save event.");
    } finally {
      submitBtn.removeAttr("disabled").text(origText);
    }
  });

  // Event deletion
  $(document).on("click", ".btn-delete-event", async function() {
    const idToDelete = parseInt($(this).data("id"));
    const btn = $(this);
    if (confirm("Are you sure you want to delete this event?")) {
      btn.attr("disabled", true);
      try {
        let data = await getEventsData();
        data = data.filter(evt => evt.id !== idToDelete);
        await saveEventsData(data);
        await loadAdminEventsList();
      } catch (err) {
        console.error(err);
        alert("Failed to delete event.");
        btn.removeAttr("disabled");
      }
    }
  });


  // 4. CORE TEAM MANAGEMENT
  let activeEditMember = null;
  let teamBase64Image = null;
  let newMemberBase64Image = null;

  // ── Mode Toggle (Add New / Edit) ──────────────────────────────
  $("#btn-mode-add").on("click", function() {
    $("#add-member-panel").removeClass("d-none");
    $("#edit-member-panel").addClass("d-none");
    $(this).addClass("btn-gold").removeClass("btn-outline-light");
    $("#btn-mode-edit").removeClass("btn-gold").addClass("btn-outline-light");
    resetTeamForm();
  });

  $("#btn-mode-edit").on("click", function() {
    $("#edit-member-panel").removeClass("d-none");
    $("#add-member-panel").addClass("d-none");
    $(this).addClass("btn-gold").removeClass("btn-outline-light");
    $("#btn-mode-add").removeClass("btn-gold").addClass("btn-outline-light");
  });

  // ── Add New Member ─────────────────────────────────────────────
  // Image preview for new member
  $("#new-member-img-file").on("change", function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        newMemberBase64Image = e.target.result;
        $("#new-member-img-preview").attr("src", newMemberBase64Image).removeClass("d-none");
        $("#new-member-img-placeholder").addClass("d-none");
        $("#new-member-img-url").val("");
      };
      reader.readAsDataURL(file);
    }
  });

  $("#new-member-img-url").on("input", function() {
    const url = $(this).val().trim();
    if (url) {
      newMemberBase64Image = null;
      $("#new-member-img-file").val("");
      $("#new-member-img-preview").attr("src", url).removeClass("d-none");
      $("#new-member-img-placeholder").addClass("d-none");
    } else {
      $("#new-member-img-preview").addClass("d-none").attr("src", "");
      $("#new-member-img-placeholder").removeClass("d-none");
    }
  });

  // Submit Add New Member
  $("#add-team-form").on("submit", async function(e) {
    e.preventDefault();

    const submitBtn = $(this).find('button[type="submit"]');
    submitBtn.attr("disabled", true).html('<i class="fas fa-spinner fa-spin"></i> Adding...');

    const name     = $("#new-member-name").val().trim();
    const role     = $("#new-member-role").val().trim();
    const category = $("#new-member-category").val();
    const linkedin = $("#new-member-linkedin").val().trim();
    const instagram= $("#new-member-instagram").val().trim();
    const whatsapp = $("#new-member-whatsapp").val().trim();
    const textUrl  = $("#new-member-img-url").val().trim();

    const links = [];
    if (linkedin)  links.push({ type: "linkedin",  url: linkedin });
    if (instagram) links.push({ type: "instagram", url: instagram });
    if (whatsapp)  links.push({ type: "whatsapp",  url: whatsapp });

    // Generate a simple slug-style id from name
    const id = name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") + "_" + Date.now();

    const newMember = {
      id,
      name,
      role,
      category,
      image: newMemberBase64Image || textUrl || "",
      links
    };

    try {
      const db = await window.getTeamDB();
      db.push(newMember);
      await window.saveTeamDB(db);

      $("#add-team-form")[0].reset();
      newMemberBase64Image = null;
      $("#new-member-img-preview").addClass("d-none").attr("src", "");
      $("#new-member-img-placeholder").removeClass("d-none").text("No Image Chosen");

      await loadAdminTeamList();
      alert(`✓ ${name} has been added to the Core Team!`);
    } catch (err) {
      console.error(err);
      alert("Failed to add member. Please try again.");
    } finally {
      submitBtn.removeAttr("disabled").html('<i class="fas fa-user-plus"></i> Add to Core Team');
    }
  });

  // ── Load Team List ─────────────────────────────────────────────

  async function loadAdminTeamList() {
    const listContainer = $("#admin-team-list");
    listContainer.html("<div class='text-center p-3'><div class='spinner-border text-orange' role='status'><span class='visually-hidden'>Loading...</span></div></div>");
    
    const db = await window.getTeamDB();
    const filterCat = $("#filter-team-category").val();
    const filtered = filterCat === "all" ? db : db.filter(m => m.category === filterCat);
    
    listContainer.empty();

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
        ? `<img class="admin-row-avatar" src="${window.ACC_ASSET_URL(window.ACC_TEAM_IMAGE(m))}" alt="${m.name}">`
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
            <button type="button" class="btn-delete-event btn-delete-team-member ms-1" data-id="${m.id}" title="Remove Member">
              <i class="fas fa-trash-alt"></i>
            </button>
          </div>
        </div>
      `;
      listContainer.append(itemHtml);
    });
  }

  // Handle category filter
  $("#filter-team-category").on("change", async function() {
    await loadAdminTeamList();
  });

  // Delete team member
  $(document).on("click", ".btn-delete-team-member", async function() {
    const id = $(this).data("id");
    const btn = $(this);
    if (confirm("Remove this member from the Core Team? This cannot be undone.")) {
      btn.attr("disabled", true);
      try {
        let db = await window.getTeamDB();
        db = db.filter(m => m.id !== id);
        await window.saveTeamDB(db);
        await loadAdminTeamList();
        resetTeamForm();
      } catch (err) {
        console.error(err);
        alert("Failed to remove member.");
        btn.removeAttr("disabled");
      }
    }
  });

  // Reset to Defaults
  $("#btn-reset-team").on("click", async function() {
    if (confirm("Reset the entire Core Team to the original default roster? All custom changes will be lost.")) {
      localStorage.removeItem("acc_db_team_v3");
      window.ACC_DB_CACHE = null;
      await loadAdminTeamList();
      resetTeamForm();
      alert("✓ Core Team has been reset to defaults.");
    }
  });

  // Handle Edit click — switches to Edit mode automatically
  $(document).on("click", ".btn-edit-team-member", async function() {
    const id = $(this).data("id");
    const db = await window.getTeamDB();
    const member = db.find(m => m.id === id);
    if (!member) return;

    // Switch to edit mode panel
    $("#edit-member-panel").removeClass("d-none");
    $("#add-member-panel").addClass("d-none");
    $("#btn-mode-edit").addClass("btn-gold").removeClass("btn-outline-light");
    $("#btn-mode-add").removeClass("btn-gold").addClass("btn-outline-light");

    activeEditMember = member;

    const form = $("#edit-team-form");
    form.removeClass("disabled-form opacity-50").css("pointer-events", "auto");
    form.find("input, select, button").removeAttr("disabled");

    $("#member-id").val(member.id);
    $("#member-name").val(member.name);
    $("#member-role").val(member.role);

    const links = member.links || [];
    const linkedinObj  = links.find(l => l.type === "linkedin");
    const instagramObj = links.find(l => l.type === "instagram");
    const whatsappObj  = links.find(l => l.type === "whatsapp");
    $("#member-linkedin").val(linkedinObj  ? linkedinObj.url  : "");
    $("#member-instagram").val(instagramObj ? instagramObj.url : "");
    $("#member-whatsapp").val(whatsappObj  ? whatsappObj.url  : "");

    if (member.image) {
      if (member.image.startsWith("data:image")) {
        $("#member-img-url").val("");
      } else {
        $("#member-img-url").val(member.image);
      }
      $("#member-img-preview").attr("src", window.ACC_ASSET_URL(window.ACC_TEAM_IMAGE(member))).removeClass("d-none");
      $("#member-img-preview-placeholder").addClass("d-none");
    } else {
      $("#member-img-url").val("");
      $("#member-img-preview").addClass("d-none").attr("src", "");
      $("#member-img-preview-placeholder").removeClass("d-none");
    }

    $("#team-form-title").html(`<i class="fas fa-edit text-orange"></i> Edit: ${member.name}`);

    // Scroll form into view on mobile
    document.getElementById("edit-member-panel").scrollIntoView({ behavior: "smooth", block: "start" });
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
    if ($("#edit-team-form").length) $("#edit-team-form")[0].reset();

    const form = $("#edit-team-form");
    form.addClass("disabled-form opacity-50").css("pointer-events", "none");
    form.find("input, select, button").attr("disabled", true);

    $("#member-img-preview").addClass("d-none").attr("src", "");
    $("#member-img-preview-placeholder").removeClass("d-none").text("No Image Chosen");
    $("#team-form-title").text("Select Member to Edit");
  }

  // Save Team profile (Edit mode)
  $("#edit-team-form").on("submit", async function(e) {
    e.preventDefault();
    if (!activeEditMember) return;

    const submitBtn = $(this).find('button[type="submit"]');
    submitBtn.attr("disabled", true).html('<i class="fas fa-spinner fa-spin"></i> Saving...');

    const id           = $("#member-id").val();
    const name         = $("#member-name").val().trim();
    const role         = $("#member-role").val().trim();
    const linkedinUrl  = $("#member-linkedin").val().trim();
    const instagramUrl = $("#member-instagram").val().trim();
    const whatsappUrl  = $("#member-whatsapp").val().trim();
    const textUrl      = $("#member-img-url").val().trim();

    try {
      const db = await window.getTeamDB();
      const idx = db.findIndex(m => m.id === id);
      if (idx === -1) { alert("Member not found."); return; }

      db[idx].name = name;
      db[idx].role = role;

      // Rebuild links array preserving order: linkedin, instagram, whatsapp
      const newLinks = [];
      if (linkedinUrl)  newLinks.push({ type: "linkedin",  url: linkedinUrl });
      if (instagramUrl) newLinks.push({ type: "instagram", url: instagramUrl });
      if (whatsappUrl)  newLinks.push({ type: "whatsapp",  url: whatsappUrl });
      db[idx].links = newLinks;

      if (teamBase64Image) {
        db[idx].image = teamBase64Image;
      } else if (textUrl) {
        db[idx].image = textUrl;
      }

      await window.saveTeamDB(db);
      await loadAdminTeamList();
      resetTeamForm();
      // Switch back to Add mode after save
      $("#add-member-panel").removeClass("d-none");
      $("#edit-member-panel").addClass("d-none");
      $("#btn-mode-add").addClass("btn-gold").removeClass("btn-outline-light");
      $("#btn-mode-edit").removeClass("btn-gold").addClass("btn-outline-light");
      alert(`✓ ${name}'s profile has been saved!`);
    } catch (err) {
      console.error(err);
      alert("Failed to save team profile.");
    } finally {
      submitBtn.removeAttr("disabled").text("Save Profile");
    }
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

  async function loadAdminGalleryPreview() {
    const domain = $("#gallery-domain-select").val();
    const grid = $("#admin-gallery-preview-grid");
    const countLabel = $("#gallery-count-label");
    
    grid.html("<div class='text-center p-3 col-12'><div class='spinner-border text-orange' role='status'><span class='visually-hidden'>Loading...</span></div></div>");
    
    const db = await window.getGalleryDB();
    const images = db[domain] || [];
    
    grid.empty();
    countLabel.text(`${images.length} Images`);
    
    if (images.length === 0) {
      grid.html("<p class='text-muted text-center col-12 p-3'>No images in this domain gallery yet.</p>");
      return;
    }
    
    images.forEach((img, idx) => {
      const itemHtml = `
        <div class="admin-gallery-item">
          <img src="${window.ACC_ASSET_URL(img)}" alt="Preview">
          <button type="button" class="btn-remove-gallery-img" data-idx="${idx}" title="Remove Image">&times;</button>
        </div>
      `;
      grid.append(itemHtml);
    });
  }

  $("#gallery-domain-select").on("change", async function() {
    await loadAdminGalleryPreview();
  });

  $("#add-gallery-form").on("submit", async function(e) {
    e.preventDefault();
    
    const submitBtn = $(this).find('button[type="submit"]');
    submitBtn.attr("disabled", true).text("Adding...");

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
      submitBtn.removeAttr("disabled").text("Add Image");
      return;
    }
    
    try {
      const db = await window.getGalleryDB();
      if (!db[domain]) db[domain] = [];
      db[domain].push(imageToAdd);
      
      await window.saveGalleryDB(db);
      
      $("#add-gallery-form")[0].reset();
      galleryBase64Image = null;
      $("#gallery-img-preview").addClass("d-none").attr("src", "");
      $("#gallery-img-preview-placeholder").removeClass("d-none");
      
      await loadAdminGalleryPreview();
      alert("Image added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to save image to gallery.");
    } finally {
      submitBtn.removeAttr("disabled").text("Add Image");
    }
  });

  $(document).on("click", ".btn-remove-gallery-img", async function() {
    const idx = parseInt($(this).data("idx"));
    const domain = $("#gallery-domain-select").val();
    const btn = $(this);

    if (confirm("Are you sure you want to remove this image from the gallery?")) {
      btn.attr("disabled", true);
      try {
        const db = await window.getGalleryDB();
        if (db[domain] && db[domain][idx] !== undefined) {
          db[domain].splice(idx, 1);
          await window.saveGalleryDB(db);
          await loadAdminGalleryPreview();
        }
      } catch (err) {
        console.error(err);
        alert("Failed to remove image.");
        btn.removeAttr("disabled");
      }
    }
  });
});

// ── API & Drive Tab — vanilla JS (no jQuery) ──────────────────
(function() {
  const DRIVE_KEY = "acc_drive_url";
  const DB_KEY = "acc_db_api_url";

  function refreshAPITabUI() {
    const savedDrive = localStorage.getItem(DRIVE_KEY);
    const driveDisplay = document.getElementById("drive-url-display");
    const driveInput = document.getElementById("drive-script-url");
    if (driveDisplay) driveDisplay.textContent = savedDrive || "None";
    if (driveInput && savedDrive) driveInput.value = savedDrive;

    const savedDB = localStorage.getItem(DB_KEY);
    const dbDisplay = document.getElementById("db-url-display");
    const dbInput = document.getElementById("db-script-url");
    if (dbDisplay) dbDisplay.textContent = savedDB || "None";
    if (dbInput && savedDB) dbInput.value = savedDB;
  }

  function initAPITab() {
    refreshAPITabUI();

    // Drive Event Listeners
    const saveDriveBtn = document.getElementById("btn-save-drive-url");
    const clearDriveBtn = document.getElementById("btn-clear-drive-url");
    const driveStatus = document.getElementById("drive-url-status");

    if (saveDriveBtn) {
      saveDriveBtn.addEventListener("click", function() {
        const input = document.getElementById("drive-script-url");
        const val = input ? input.value.trim() : "";
        if (!val) {
          driveStatus.textContent = "Please enter a URL.";
          driveStatus.style.color = "var(--accent-danger, #e05)";
          return;
        }
        localStorage.setItem(DRIVE_KEY, val);
        refreshAPITabUI();
        driveStatus.textContent = "✓ Saved successfully.";
        driveStatus.style.color = "var(--accent-green, #4c8)";
        setTimeout(() => { driveStatus.textContent = ""; }, 3000);
      });
    }

    if (clearDriveBtn) {
      clearDriveBtn.addEventListener("click", function() {
        if (confirm("Remove the saved Media Drive URL?")) {
          localStorage.removeItem(DRIVE_KEY);
          const input = document.getElementById("drive-script-url");
          if (input) input.value = "";
          refreshAPITabUI();
          driveStatus.textContent = "URL cleared.";
          driveStatus.style.color = "var(--text-muted, #888)";
          setTimeout(() => { driveStatus.textContent = ""; }, 3000);
        }
      });
    }

    // Database API Event Listeners
    const saveDbBtn = document.getElementById("btn-save-db-url");
    const clearDbBtn = document.getElementById("btn-clear-db-url");
    const dbStatus = document.getElementById("db-url-status");

    if (saveDbBtn) {
      saveDbBtn.addEventListener("click", function() {
        const input = document.getElementById("db-script-url");
        const val = input ? input.value.trim() : "";
        if (!val) {
          dbStatus.textContent = "Please enter a URL.";
          dbStatus.style.color = "var(--accent-danger, #e05)";
          return;
        }
        localStorage.setItem(DB_KEY, val);
        refreshAPITabUI();
        dbStatus.textContent = "✓ Saved successfully.";
        dbStatus.style.color = "var(--accent-green, #4c8)";
        setTimeout(() => { dbStatus.textContent = ""; }, 3000);
      });
    }

    if (clearDbBtn) {
      clearDbBtn.addEventListener("click", function() {
        if (confirm("Remove the Database API URL? The website will fall back to default cache.")) {
          localStorage.removeItem(DB_KEY);
          const input = document.getElementById("db-script-url");
          if (input) input.value = "";
          refreshAPITabUI();
          dbStatus.textContent = "URL cleared.";
          dbStatus.style.color = "var(--text-muted, #888)";
          setTimeout(() => { dbStatus.textContent = ""; }, 3000);
        }
      });
    }
  }

  // Init when tab becomes visible
  document.addEventListener("DOMContentLoaded", function() {
    refreshAPITabUI();

    const apiTabBtn = document.querySelector('.admin-tab-btn[data-tab="tab-drive"]');
    if (apiTabBtn) {
      apiTabBtn.addEventListener("click", function() {
        setTimeout(initAPITab, 50);
      });
    }
  });
})();
