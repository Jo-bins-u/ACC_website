$(document).ready(function() {
    // Accordion Toggle for Prayers
    $(".prayer-header").click(function() {
        var card = $(this).closest(".prayer-card");
        var body = card.find(".prayer-body");
        
        // Toggle the body height smoothly
        body.slideToggle(350, function() {
            card.toggleClass("open");
        });
    });

    // Smooth scroll navigation hooks
    $(".prayer-nav-links a").click(function(e) {
        e.preventDefault();
        var target = $(this).attr("href");
        
        $("html, body").animate({
            scrollTop: $(target).offset().top - 100
        }, 600);
    });
});