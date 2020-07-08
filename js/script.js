;(function ($) {
    $(function () {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            fade: true,
            autoplay: true,
            autoplaySpeed: 5000
            // asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 6,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            centerMode: false,
            focusOnSelect: true
        });

        /*TABS*/
        $('#tab-btn-1').click(function () {
            $('html, body').animate({
                scrollTop: $('header').offset().top
            }, 500);
        });
        $('#tab-btn-2').click(function () {
            $('html, body').animate({
                scrollTop: $('header').offset().top
            }, 500);
        });
        $('#tab-btn-3').click(function () {
            $('html, body').animate({
                scrollTop: $('header').offset().top
            }, 500);
        });

    });
})(jQuery);

/*IZOTOPE*/
// init Isotope
let $grid = $('.grid').isotope({
    itemSelector: '.element-item',
    layoutMode: 'fitRows'
});
// filter functions
let filterFns = {
    // show if number is greater than 50
    numberGreaterThan50: function () {
        let number = $(this).find('.number').text();
        return parseInt(number, 10) > 50;
    },
    // show if name ends with -ium
    ium: function () {
        let name = $(this).find('.name').text();
        return name.match(/ium$/);
    }
};
// bind filter button click
$('.filters-button-group').on('click', 'button', function () {
    let filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({filter: filterValue});
});
// change is-checked class on buttons
$('.button-group').each(function (i, buttonGroup) {
    let $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});
