

AOS.init(); //For Animation

//For Events slider
$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayHoverPause: true,
        center: true,
        smartSpeed: 600,
        navText: [
            "<i class='fa fa-angle-left'></i>",
            "<i class='fa fa-angle-right'></i>"
        ],
        responsive:{
            0:    { items: 1, margin: 10 },
            600:  { items: 2, margin: 16 },
            1000: { items: 3, margin: 20 }
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const verses = [
      { title: "For where two or three gather in my name, there I am with them.", reference: "Matthew 18:20" },
      { title: "The grace of our Lord Jesus Christ be with you.", reference: "1 Thessalonians 5:28" },
      { title: "Beloved, if God so loved us, we also ought to love one another.", reference: "1 John 4:11" },
      { title: "Faith is the assurance of things hoped for and the conviction of things not seen.", reference: "Hebrews 11:1" },
      { title: "Children, obey your parents in the Lord. It is reasonable.", reference: "Ephesians 6:1" },
      { title: "You are Christ's, and Christ is God's.", reference: "1 Corinthians 3:23" }
    ];

    let currentVerseIndex = 0;

    function switchVerse() {
      currentVerseIndex = (currentVerseIndex + 1) % verses.length;
      document.getElementById("verse-title").innerHTML = verses[currentVerseIndex].title;
      document.getElementById("verse-reference").innerHTML = verses[currentVerseIndex].reference;
    }

    setInterval(switchVerse, 4000); // Switch every 5 seconds
  });