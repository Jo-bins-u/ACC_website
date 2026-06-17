window._driveGalleryLoaded = false;
// Media Gallery Lightbox Logic
const eventMedia = {
    "bereshith": {
        title: "Bereshith 1 & 2",
        items: [
            { type: "image", src: "Images/Berishith 1 and 2/_DSC4285.JPG", caption: "Bereshith Celebration" },
            { type: "image", src: "Images/Berishith 1 and 2/DSC04992.JPG", caption: "Bereshith Gathering" },
            { type: "image", src: "Images/Berishith 1 and 2/DSC04988.JPG", caption: "Bereshith Session" },
            { type: "image", src: "Images/Berishith 1 and 2/DSC05036.JPG", caption: "Bereshith Worship" },
            { type: "image", src: "Images/Berishith 1 and 2/DSC05102.JPG", caption: "Bereshith Fellowship" },
            { type: "image", src: "Images/Berishith 1 and 2/DSC05097.JPG", caption: "Bereshith Sharing" },
            { type: "image", src: "Images/Berishith 1 and 2/_DSC4290.JPG", caption: "Bereshith Team" },
            { type: "image", src: "Images/Berishith 1 and 2/_DSC4372.JPG", caption: "Bereshith Action" },
            { type: "image", src: "Images/Berishith 1 and 2/_DSC4374.JPG", caption: "Bereshith Blessing" }
        ]
    },
    "transcend": {
        title: "Transcend '23",
        items: [
            { type: "image", src: "Images/Transcend '23/_DSC6913.JPG", caption: "Transcend Opening" },
            { type: "image", src: "Images/Transcend '23/_DSC6977.JPG", caption: "Transcend Worship Session" },
            { type: "image", src: "Images/Transcend '23/_DSC7088.JPG", caption: "Transcend Choir" },
            { type: "image", src: "Images/Transcend '23/_DSC7119.JPG", caption: "Transcend Intercession" },
            { type: "image", src: "Images/Transcend '23/_DSC7151.JPG", caption: "Transcend Fellowship" },
            { type: "image", src: "Images/Transcend '23/_DSC7250.JPG", caption: "Transcend Group Blessing" },
            { type: "image", src: "Images/Transcend '23/_DSC7437.JPG", caption: "Transcend Speakers" },
            { type: "image", src: "Images/Transcend '23/_DSC7442.JPG", caption: "Transcend Sharing" },
            { type: "image", src: "Images/Transcend '23/_DSC7490.JPG", caption: "Transcend Closing Ceremony" },
            { type: "video", src: "Video/trancend23-1.mp4", caption: "Transcend Highlights Reel" },
            { type: "video", src: "Video/trancend23-2.mp4", caption: "Transcend Session Highlights" }
        ]
    },
    "inaugural": {
        title: "Inaugural Mass & Anointing Ceremony",
        items: [
            { type: "video", src: "Video/INAGURAL_VID.mp4", caption: "Inaugural Mass & Anointing video" },
            { type: "image", src: "Images/Inaugural Mass & Anointing Ceremony/_DSC7746.JPG", caption: "Anointing Ceremony" },
            { type: "image", src: "Images/Inaugural Mass & Anointing Ceremony/DSC06112.JPG", caption: "Inaugural Holy Mass" },
            { type: "image", src: "Images/Inaugural Mass & Anointing Ceremony/_DSC7780.JPG", caption: "Worshipping Students" },
            { type: "image", src: "Images/Inaugural Mass & Anointing Ceremony/_DSC7771.JPG", caption: "Anointing Ceremony Blessing" },
            { type: "image", src: "Images/Inaugural Mass & Anointing Ceremony/_DSC7778.JPG", caption: "Anointing Oil Blessing" },
            { type: "image", src: "Images/Inaugural Mass & Anointing Ceremony/_DSC7846.JPG", caption: "Blessing Hand" },
            { type: "image", src: "Images/Inaugural Mass & Anointing Ceremony/_DSC7769.JPG", caption: "Priests in Mass" },
            { type: "image", src: "Images/Inaugural Mass & Anointing Ceremony/_DSC7781.JPG", caption: "Worshippers" },
            { type: "image", src: "Images/Inaugural Mass & Anointing Ceremony/DSC05731.JPG", caption: "Inaugural Mass Gathering" },
            { type: "image", src: "Images/Inaugural Mass & Anointing Ceremony/DSC06051.JPG", caption: "Chapel View during Mass" },
            { type: "image", src: "Images/Inaugural Mass & Anointing Ceremony/DSC06100.JPG", caption: "Inaugural Mass Celebrants" }
        ]
    },
    "mothermary": {
        title: "Assumption of Mother Mary",
        items: [
            { type: "video", src: "Video/Mother_Mary_VID.mp4", caption: "Feast of Assumption video" },
            { type: "image", src: "Images/Assumption of Mother Mary/_DSC9366.JPG", caption: "Mother Mary Grotto" },
            { type: "image", src: "Images/Assumption of Mother Mary/_DSC9269.JPG", caption: "Feast Procession" },
            { type: "image", src: "Images/Assumption of Mother Mary/_DSC9272.JPG", caption: "Mass Celebrant and Grotto" },
            { type: "image", src: "Images/Assumption of Mother Mary/_DSC9284.JPG", caption: "Worshippers with Candles" },
            { type: "image", src: "Images/Assumption of Mother Mary/_DSC9293.JPG", caption: "Statue of Mother Mary" },
            { type: "image", src: "Images/Assumption of Mother Mary/_DSC9426.JPG", caption: "Blessing of the Grotto" },
            { type: "image", src: "Images/Assumption of Mother Mary/_DSC9423.JPG", caption: "Procession Walk" },
            { type: "image", src: "Images/Assumption of Mother Mary/_DSC9496.JPG", caption: "Concluding Prayers" }
        ]
    }
};

let currentGallery = null;
let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    // Bind click events to existing static cards
    bindMediaCardClicks();

    const lightboxCloseBtn = document.querySelector(".lightbox-close");
    if (lightboxCloseBtn) {
        lightboxCloseBtn.addEventListener("click", closeLightbox);
    }
    
    const lightboxOverlay = document.querySelector(".lightbox-overlay");
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener("click", (e) => {
            if (e.target.classList.contains("lightbox-overlay")) {
                closeLightbox();
            }
        });
    }

    const prevBtn = document.querySelector(".lightbox-prev");
    if (prevBtn) {
        prevBtn.addEventListener("click", showPrev);
    }
    
    const nextBtn = document.querySelector(".lightbox-next");
    if (nextBtn) {
        nextBtn.addEventListener("click", showNext);
    }

    document.addEventListener("keydown", (e) => {
        const overlay = document.querySelector(".lightbox-overlay");
        if (overlay && overlay.style.display === "flex") {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
        }
    });

    loadDriveGallery();
});

function bindMediaCardClicks() {
    const mediaCards = document.querySelectorAll(".media-card");
    mediaCards.forEach(card => {
        // Prevent multiple bindings if called again
        if (!card.dataset.bound) {
            card.addEventListener("click", function() {
                const galleryKey = this.getAttribute("data-gallery");
                if (eventMedia[galleryKey]) {
                    currentGallery = eventMedia[galleryKey];
                    currentIndex = 0;
                    openLightbox();
                }
            });
            card.dataset.bound = "true";
        }
    });
}

function openLightbox() {
    const overlay = document.querySelector(".lightbox-overlay");
    if (overlay) {
        overlay.style.display = "flex";
        overlay.style.opacity = 0;
        // Fade in
        let op = 0;
        const timer = setInterval(() => {
            if (op >= 1){
                clearInterval(timer);
                overlay.style.opacity = 1;
            }
            overlay.style.opacity = op;
            op += 0.1;
        }, 30);
    }
    renderMediaItem();
    renderThumbnails();
}

function closeLightbox() {
    const overlay = document.querySelector(".lightbox-overlay");
    if (overlay) {
        // Fade out
        let op = 1;
        const timer = setInterval(() => {
            if (op <= 0){
                clearInterval(timer);
                overlay.style.display = "none";
            }
            overlay.style.opacity = op;
            op -= 0.1;
        }, 20);
    }
    
    // Pause any playing videos
    const video = document.querySelector(".lightbox-content-container video");
    if (video) {
        video.pause();
    }
}

function renderMediaItem() {
    if (!currentGallery) return;
    
    const item = currentGallery.items[currentIndex];
    const container = document.querySelector(".lightbox-content-container");
    if (!container) return;
    
    // Pause previous video if any
    const prevVideo = container.querySelector("video");
    if (prevVideo) {
        prevVideo.pause();
    }
    
    // Preserve navigation arrows, clear existing content
    const prevArrow = container.querySelector(".lightbox-prev");
    const nextArrow = container.querySelector(".lightbox-next");
    
    container.innerHTML = "";
    if (prevArrow) container.appendChild(prevArrow);
    
    const contentEl = document.createElement(item.type === "video" ? "video" : "img");
    console.log("Rendering:", item.src);
    contentEl.src = item.src;
    contentEl.className = "img-fluid";
    contentEl.style.opacity = 0;
    contentEl.style.transition = "opacity 0.3s ease";
    
    if (item.type === "image") {
        contentEl.alt = item.caption;
    } else if (item.type === "video") {
        contentEl.controls = true;
        contentEl.autoplay = true;
    }
    
    container.appendChild(contentEl);
    if (nextArrow) container.appendChild(nextArrow);
    
    // Trigger reflow and fade in
    void contentEl.offsetWidth;
    contentEl.style.opacity = 1;

    const captionEl = document.querySelector(".lightbox-caption");
    if (captionEl) {
        captionEl.textContent = `${currentGallery.title} - ${item.caption} (${currentIndex + 1}/${currentGallery.items.length})`;
    }
    
    // Sync active class on thumbnails
    const thumbnails = document.querySelectorAll(".lightbox-thumb");
    thumbnails.forEach(thumb => thumb.classList.remove("active"));
    
    const activeThumb = document.querySelector(`.lightbox-thumb[data-index="${currentIndex}"]`);
    if (activeThumb) {
        activeThumb.classList.add("active");
        activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

function renderThumbnails() {
    if (!currentGallery) return;
    
    const thumbContainer = document.querySelector(".lightbox-thumbnails");
    if (!thumbContainer) return;
    
    thumbContainer.innerHTML = "";
    
    currentGallery.items.forEach((item, index) => {
        let isVideo = item.type === "video";
        
        if (isVideo) {
            const wrapper = document.createElement("div");
            wrapper.className = "position-relative";
            wrapper.style.display = "inline-block";
            
            const videoEl = document.createElement("video");
            videoEl.src = item.src;
            videoEl.className = "lightbox-thumb";
            videoEl.setAttribute("data-index", index);
            
            const icon = document.createElement("i");
            icon.className = "fas fa-play position-absolute text-white";
            icon.style.cssText = "top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;font-size:0.8rem;text-shadow:0 0 4px #000;";
            
            wrapper.appendChild(videoEl);
            wrapper.appendChild(icon);
            thumbContainer.appendChild(wrapper);
        } else {
            const imgEl = document.createElement("img");
            imgEl.src = item.src;
            imgEl.alt = "Thumb";
            imgEl.className = "lightbox-thumb";
            imgEl.setAttribute("data-index", index);
            if (item.thumb) imgEl.src = item.thumb; // Use thumb URL if available
            thumbContainer.appendChild(imgEl);
        }
    });

    const thumbs = thumbContainer.querySelectorAll(".lightbox-thumb");
    thumbs.forEach(thumb => {
        thumb.addEventListener("click", function() {
            currentIndex = parseInt(this.getAttribute("data-index"), 10);
            renderMediaItem();
        });
    });
}

function showPrev() {
    if (currentGallery) {
        currentIndex = (currentIndex - 1 + currentGallery.items.length) % currentGallery.items.length;
        renderMediaItem();
    }
}

function showNext() {
    if (currentGallery) {
        currentIndex = (currentIndex + 1) % currentGallery.items.length;
        renderMediaItem();
    }
}

async function loadDriveGallery() {
    const driveUrl = localStorage.getItem("acc_drive_url");
    if (!driveUrl) {
        window._driveGalleryLoaded = true;
        document.dispatchEvent(new Event('driveGalleryReady'));
        return;
    }

    const galleryContainer = document.querySelector(".library .row.g-4.justify-content-center");
    if (galleryContainer) {
        galleryContainer.insertAdjacentHTML("beforeend", `
<div class="col-lg-4 col-md-6 drive-skeleton">
  <div class="media-card" style="opacity:0.4;pointer-events:none;">
    <div class="media-card-img-wrapper" style="background:#2a2a2a;min-height:180px;"></div>
    <div class="media-card-body"><h4 style="color:#555;">Loading...</h4></div>
  </div>
</div>`);
    }

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const response = await fetch(driveUrl, { signal: controller.signal });
        clearTimeout(timeout);
        
        if (!response.ok) throw new Error("Failed to fetch drive gallery");
        const data = await response.json();
        
        if (!data || !data.events) {
            const skeleton = document.querySelector(".drive-skeleton");
            if (skeleton) skeleton.remove();
            window._driveGalleryLoaded = true;
            document.dispatchEvent(new Event('driveGalleryReady'));
            return;
        }
        
        if (!galleryContainer) {
            window._driveGalleryLoaded = true;
            document.dispatchEvent(new Event('driveGalleryReady'));
            return;
        }
        
        data.events.forEach((eventData, index) => {
            const galleryKey = `drive_${index}`;
            
            // Format title by stripping leading number prefix like "01_"
            const title = eventData.event.replace(/^\d+_/, '');
            
            // Register in eventMedia
            eventMedia[galleryKey] = {
                title: title,
                items: eventData.images.map(img => ({
                    type: "image",
                    src: img.url,
                    caption: img.name,
                    thumb: img.thumb || img.url
                }))
            };
            
            // Create card HTML
            const colDiv = document.createElement("div");
            colDiv.className = "col-lg-4 col-md-6 drive-injected";
            
            colDiv.innerHTML = `
                <div class="media-card" data-gallery="${galleryKey}">
                  <div class="media-card-img-wrapper">
                    <img src="${eventData.cover}" alt="${title}" onerror="this.style.background='#2a2a2a';this.style.opacity='0.3';this.removeAttribute('onerror');">
                  </div>
                  <div class="media-card-body">
                    <h4>${title}</h4>
                    <p>${eventData.images.length} Photos</p>
                  </div>
                </div>
            `;
            
            galleryContainer.appendChild(colDiv);
        });
        
        const skeleton = document.querySelector(".drive-skeleton");
        if (skeleton) skeleton.remove();

        // Rebind clicks so new cards work
        bindMediaCardClicks();
        
        window._driveGalleryLoaded = true;
        document.dispatchEvent(new Event('driveGalleryReady'));
        
    } catch (err) {
        const skeleton = document.querySelector(".drive-skeleton");
        if (skeleton) skeleton.remove();

        if (err.name === "AbortError") {
            console.warn("Drive gallery timed out — skipping.");
        } else {
            console.error("Drive gallery error:", err);
        }
        window._driveGalleryLoaded = true;
        document.dispatchEvent(new Event('driveGalleryReady'));
    }
}
