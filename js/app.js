console.log("app.js is loaded");


$(document).ready(function() {
    $('.navbar-nav .nav-link').on('click', function() {
        if ($('.navbar-toggler').attr('aria-expanded') === "true") {
            $('.navbar-toggler').click();
        }
    });
});
$(document).ready(function() {
    $(document).on('click', function(event) {
        const clickOver = $(event.target);
        const _opened = $(".navbar-collapse").hasClass("show");
        if (_opened === true && !clickOver.hasClass("navbar-toggler")) {
            $(".navbar-toggler").click();
        }
    });
});
