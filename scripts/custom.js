$(document).ready(function() {
    //Scroll to Certain div
    $(function() {
        $('header .navigation a').click(function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $('html, body').animate({ scrollTop: $(target).offset().top }, '500');
        });
    });

    (function() {
        var backToTop = $("a.backToTop");
        backToTop.on("click", function(event) {
            $("html, body").animate({
                scrollTop: 0
            }, 500);
            event.preventDefault();
        });
        $(window).on("scroll", function() {
            var self = $(this),
                height = self.height() / 8,
                top = self.scrollTop();

            if (top > height) {
                if (!backToTop.hasClass("show")) {
                    backToTop.addClass("show");
                }
            } else {
                backToTop.removeClass("show");
            }
        });
    })();
    //Back to top button

    // Tabs Radios
    $('.radio').each(function() {
        $(this).click(function(){
            var input = $(this).find('input')
            if (input.is(":checked")) {
                $('.radio').removeClass('checked')
                $(this).addClass('checked')
            }
            if(input.val() === 'annually') {
                $('.plan_save').addClass('show')
            } else {
                $('.plan_save').removeClass('show')
            }
        });
    });

    // Team Cost Slider
    $('.range>input').change(function(){
        var val = $('.range .output').text()
        $('.cost span').text(val * 12)
    });
});