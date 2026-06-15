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

$(document).ready(function() {
    // Open Lightbox when clicking a card
    $(".media-card").click(function() {
        const galleryKey = $(this).data("gallery");
        if (eventMedia[galleryKey]) {
            currentGallery = eventMedia[galleryKey];
            currentIndex = 0;
            openLightbox();
        }
    });

    // Close Lightbox
    $(".lightbox-close").click(closeLightbox);
    
    // Clicking outside content area
    $(".lightbox-overlay").click(function(e) {
        if ($(e.target).hasClass("lightbox-overlay")) {
            closeLightbox();
        }
    });

    // Navigation arrows
    $(".lightbox-prev").click(showPrev);
    $(".lightbox-next").click(showNext);

    // Keyboard controls
    $(document).keydown(function(e) {
        if ($(".lightbox-overlay").is(":visible")) {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
        }
    });
});

function openLightbox() {
    $(".lightbox-overlay").fadeIn(300).css("display", "flex");
    renderMediaItem();
    renderThumbnails();
}

function closeLightbox() {
    $(".lightbox-overlay").fadeOut(200);
    // Pause any playing videos
    const video = $(".lightbox-content-container video")[0];
    if (video) {
        video.pause();
    }
}

function renderMediaItem() {
    const item = currentGallery.items[currentIndex];
    const container = $(".lightbox-content-container");
    
    // Pause previous video if any
    const prevVideo = container.find("video")[0];
    if (prevVideo) {
        prevVideo.pause();
    }
    
    container.empty();
    
    if (item.type === "image") {
        container.append(`<img src="${item.src}" alt="${item.caption}" class="img-fluid" style="opacity: 0;">`);
        container.find("img").animate({ opacity: 1 }, 300);
    } else if (item.type === "video") {
        container.append(`<video src="${item.src}" controls autoplay class="img-fluid" style="opacity: 0;"></video>`);
        container.find("video").animate({ opacity: 1 }, 300);
    }

    $(".lightbox-caption").text(`${currentGallery.title} - ${item.caption} (${currentIndex + 1}/${currentGallery.items.length})`);
    
    // Sync active class on thumbnails
    $(".lightbox-thumb").removeClass("active");
    $(`.lightbox-thumb[data-index="${currentIndex}"]`).addClass("active");
    
    // Auto-scroll thumbnails into view
    const thumb = $(`.lightbox-thumb[data-index="${currentIndex}"]`)[0];
    if (thumb) {
        thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}

function renderThumbnails() {
    const thumbContainer = $(".lightbox-thumbnails");
    thumbContainer.empty();
    
    currentGallery.items.forEach((item, index) => {
        let thumbSrc = item.src;
        // For video items, we can show a placeholder icon or represent it using a cover, or a play icon style.
        // Let's use the video link itself for browser to render frames, or a generic placeholder.
        // Actually, we can use a nice custom play icon block for video thumbnails.
        let isVideo = item.type === "video";
        
        if (isVideo) {
            thumbContainer.append(`
                <div class="position-relative" style="display:inline-block;">
                    <video src="${item.src}" class="lightbox-thumb" data-index="${index}"></video>
                    <i class="fas fa-play position-absolute text-white" style="top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;font-size:0.8rem;text-shadow:0 0 4px #000;"></i>
                </div>
            `);
        } else {
            thumbContainer.append(`<img src="${item.src}" alt="Thumb" class="lightbox-thumb" data-index="${index}">`);
        }
    });

    // Thumbnails click binders
    $(".lightbox-thumb").click(function() {
        currentIndex = parseInt($(this).data("index"));
        renderMediaItem();
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
