$(document).ready(function() {
  // 1. Database Initialization
  // Complete baseline of Christian Feasts and Saints' Days (including St. Kuriakose Elias Chavara)
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

  let eventsData = [];

  // 2. Calendar State Variables
  let currentDate = new Date(2026, 5, 15); // Start on June 15, 2026
  let selectedDate = new Date(2026, 5, 15);
  let activeCategoryFilter = "all";

  // Month names array
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Initialize Calendar UI elements
  const currentMonthYearHeader = $("#current-month-year");
  const calendarDaysGrid = $("#calendar-days-grid");
  const prevMonthBtn = $("#prev-month-btn");
  const nextMonthBtn = $("#next-month-btn");
  const todayBtn = $("#today-btn");
  const detailsTitle = $("#details-title");
  const detailsDateBadge = $("#selected-date-badge");
  const eventsContainer = $("#events-details-container");

  // Render Initial Calendar View after loading from DB
  async function initCalendar() {
    try {
      eventsData = await window.getEventsDB();
    } catch (e) {
      console.error("Failed to load events database:", e);
      eventsData = [];
    }
    renderCalendar();
    updateEventsSidebar(selectedDate, true);
  }

  initCalendar();

  // 3. Render Calendar Grid function
  function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Set Month Year title text
    currentMonthYearHeader.text(`${monthNames[month]} ${year}`);

    // Clean previous calendar grid
    calendarDaysGrid.empty();

    // Find the first day of the month
    const firstDayIndex = new Date(year, month, 1).getDay();

    // Find the total number of days in the month
    const totalDays = new Date(year, month + 1, 0).getDate();

    // Find total days of the previous month
    const prevTotalDays = new Date(year, month, 0).getDate();

    // 3.1. Append overlapping days from previous month
    for (let i = firstDayIndex; i > 0; i--) {
      const dayNum = prevTotalDays - i + 1;
      calendarDaysGrid.append(`<div class="calendar-day empty">
        <span class="day-number text-muted">${dayNum}</span>
      </div>`);
    }

    // 3.2. Append current month's days
    for (let day = 1; day <= totalDays; day++) {
      const dateString = formatDateString(year, month, day);
      
      // Determine classes
      let classes = "calendar-day";
      const isToday = checkIsToday(year, month, day);
      const isSelected = checkIsSelected(year, month, day);
      
      if (isToday) classes += " today";
      if (isSelected) classes += " selected";

      // Filter events on this specific date
      const dateEvents = eventsData.filter(event => {
        const catMatch = activeCategoryFilter === "all" || event.category === activeCategoryFilter;
        return event.date === dateString && catMatch;
      });

      // Generate indicators HTML
      let indicatorsHtml = '<div class="day-indicators">';
      dateEvents.forEach(event => {
        indicatorsHtml += `<span class="indicator-dot ${event.category}-dot" title="${event.title}"></span>`;
      });
      indicatorsHtml += '</div>';

      // Create cell DOM element
      const cellHtml = `
        <div class="${classes}" data-date="${dateString}">
          <span class="day-number">${day}</span>
          ${indicatorsHtml}
        </div>
      `;

      calendarDaysGrid.append(cellHtml);
    }

    // 3.3. Append overlapping days of the next month to pad the grid
    const totalGridCells = firstDayIndex + totalDays;
    const paddingCells = 42 - totalGridCells; 
    const finalPadding = totalGridCells <= 35 ? 35 - totalGridCells : paddingCells;

    for (let i = 1; i <= finalPadding; i++) {
      calendarDaysGrid.append(`<div class="calendar-day empty">
        <span class="day-number text-muted">${i}</span>
      </div>`);
    }

    // Bind click events on day cells
    $(".calendar-day:not(.empty)").on("click", function() {
      const dateStr = $(this).data("date");
      const parts = dateStr.split("-");
      selectedDate = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));

      // Highlight selected cell
      $(".calendar-day").removeClass("selected");
      $(this).addClass("selected");

      // Update details sidebar
      updateEventsSidebar(selectedDate, false);
    });
  }

  // 4. Update Events Details Sidebar
  function updateEventsSidebar(date, showMonthWide = false) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    eventsContainer.empty();

    if (showMonthWide) {
      detailsTitle.text(`Events in ${monthNames[month]}`);
      detailsDateBadge.text(`${monthNames[month]} ${year}`);

      const monthEvents = eventsData.filter(event => {
        const eventDate = new Date(event.date);
        const dateMatch = eventDate.getFullYear() === year && eventDate.getMonth() === month;
        const catMatch = activeCategoryFilter === "all" || event.category === activeCategoryFilter;
        return dateMatch && catMatch;
      }).sort((a, b) => new Date(a.date) - new Date(b.date));

      if (monthEvents.length === 0) {
        renderEmptyState("No events listed for this month.");
      } else {
        monthEvents.forEach(event => renderEventItem(event, true));
      }
    } else {
      const dateString = formatDateString(year, month, day);
      detailsTitle.text("Selected Day Events");
      detailsDateBadge.text(`${monthNames[month].substring(0, 3)} ${day}, ${year}`);

      const dayEvents = eventsData.filter(event => {
        const catMatch = activeCategoryFilter === "all" || event.category === activeCategoryFilter;
        return event.date === dateString && catMatch;
      });

      if (dayEvents.length === 0) {
        renderEmptyState(`No events scheduled for ${monthNames[month]} ${day}.`);
      } else {
        dayEvents.forEach(event => renderEventItem(event, false));
      }
    }
  }

  // Render a single event item card
  function renderEventItem(event, showFullDate) {
    let dateLabel = "";
    if (showFullDate) {
      const d = new Date(event.date);
      dateLabel = `<span class="event-item-date-label"><i class="far fa-calendar-alt"></i> ${monthNames[d.getMonth()].substring(0,3)} ${d.getDate()} | </span>`;
    }

    const eventHtml = `
      <div class="event-item ${event.category} fade-in-up">
        <h4 class="event-item-title">${event.title}</h4>
        <div class="event-item-time">
          ${dateLabel}
          <i class="far fa-clock"></i> ${event.time}
        </div>
        <p class="event-item-desc">${event.description}</p>
      </div>
    `;
    eventsContainer.append(eventHtml);
  }

  // Render empty state placeholder
  function renderEmptyState(message) {
    const emptyHtml = `
      <div class="empty-events-state">
        <i class="fas fa-calendar-times"></i>
        <p>${message}</p>
      </div>
    `;
    eventsContainer.append(emptyHtml);
  }

  // Helper date formatting utilities
  function formatDateString(year, month, day) {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  }

  function checkIsToday(year, month, day) {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  }

  // Check if dates match
  function checkIsSelected(year, month, day) {
    return selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
  }

  // 5. Interactive Click Handlers & Navigation
  
  prevMonthBtn.on("click", function() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    renderCalendar();
    updateEventsSidebar(selectedDate, true);
  });

  nextMonthBtn.on("click", function() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    renderCalendar();
    updateEventsSidebar(selectedDate, true);
  });

  todayBtn.on("click", function() {
    const today = new Date();
    currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    renderCalendar();
    updateEventsSidebar(selectedDate, false);
  });

  $(".filter-option-btn").on("click", function() {
    $(".filter-option-btn").removeClass("active");
    $(this).addClass("active");

    activeCategoryFilter = $(this).data("category");
    renderCalendar();
    updateEventsSidebar(selectedDate, true); 
  });

  // 6. ADMIN PORTAL REDIRECTIONS
  $(document).on("dblclick", ".calendar-hero-title", function() {
    openAdminPortal();
  });

  $(document).on("click", "#admin-hidden-trigger", function(e) {
    e.preventDefault();
    openAdminPortal();
  });

  checkUrlForAdmin();

  $(window).on("hashchange", function() {
    checkUrlForAdmin();
  });

  function checkUrlForAdmin() {
    if (window.location.hash === '#admin' || window.location.search.includes('admin')) {
      openAdminPortal();
    }
  }

  function openAdminPortal() {
    window.location.href = "admin/index.html";
  }
});
