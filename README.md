# Association of Christian Christites (ACC) Website

A modern, responsive, and feature-rich static web portal for the **Association of Christian Christites (ACC)** at Christ (Deemed to be University), Kengeri Campus.

This repository hosts a multi-page web application complete with interactive domain portals, a custom calendar engine, an media gallery viewer, local form validation, and read-only public content data.

---

## 🌟 Key Features

- **Client-Side Database Engine:** Backed by a persistent **LocalStorage** database seeded with default core configurations.
- **Calendar & Events Planner:** Interactive calendar view displaying solemn feasts, saints' days (e.g., St. Kuriakose Elias Chavara), and general ACC community events. Includes categorization filters.
- **Interactive Media Galleries:** High-fidelity custom lightbox overlay with responsive image sliding, video play integration, keyboard navigation hookups, and dynamic thumbnail syncing.
- **Christ University Form Validation:** The Contact Form employs strict domain matching (`christuniversity.in`) using the jQuery Validation plugin.
- **Theming Engine:** Seamless Dark and Light theme toggle, optimized with a client-side head hook script to completely eliminate Flash of Unstyled Content (FOUC).

---

## 📂 Codebase Architecture

```plaintext
acc-website-main/
├── css/
│   ├── theme.css         # Typography, global variables & HSL-curated core palettes
│   ├── indexstyle.css    # Custom styles for home page components & fact carousels
│   ├── hnfstyle.css      # Shared Header/Footer styling
│   ├── calendarstyle.css # Grid system for custom calendar & event cards
│   ├── preloader.css     # CSS preloader animation
│   └── ...               # Domain specific stylesheets
├── js/
│   ├── dynamic_loader.js # Central database controller, seeding & content rendering
│   ├── calendar.js       # Calendar grid calculations, month routing & event sidebar
│   ├── javacont.js       # jQuery validation rules & form submission
│   ├── javaindex.js      # Carousel bindings & dynamic Bible verse rotating
│   ├── javamedia.js      # Custom gallery lightbox & thumbnail engine
│   └── preloader.js      # Global preloader fade & theme UI syncing
├── Images/               # Optimized asset assets, logo variations, and domain media directories
├── Video/                # Media video files & event highlight reels
├── index.html            # Main Landing Portal
├── about.html            # About Page (renders core team roster)
├── calendar.html         # Feast Calendar Page
├── media.html            # Event Gallery & Lightbox Page
├── contactus.html        # Custom Contact & Submission Page
└── success.html          # Success confirmation page upon message submission
```

---

## ⚙️ Database Architecture

The website uses a client-side database model utilizing the browser's `localStorage`.
On first load, the database checks for local records. If none are found, it seeds standard default arrays for events, core team profiles, and domain galleries.
The public website reads events, team profiles, and galleries from the configured read-only Google Apps Script endpoint, with local cache and built-in defaults for resilience. The public pages have no browser write interface.

## 🖼️ Image Storage

Website images are served from the public Supabase Storage bucket `acc-site-media`. The local image assets were optimized before upload; the site's HTML, CSS, and JavaScript now reference the Supabase URLs. Legacy relative image paths returned by the existing database are mapped by `js/dynamic_loader.js`.

Do not add a Supabase secret key to the static site. Store it only in a local server-side environment file when performing uploads.

---

## 🚀 Running Locally

Because this project is built using vanilla HTML, CSS, and jQuery, you do not need heavy compilation frameworks.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) or Python installed to run a local dev server.

### 1. Clone the project and navigate to the directory:
```bash
cd acc-website-main/acc-website-main
```

### 2. Run a local development server:
You can spin up a quick HTTP server using NPM or Python:
```bash
# Using Python
python -m http.server 8000

# Or using Node.js (npx)
npx local-server
```

Open `http://localhost:8000` (or the port specified) in your browser.

