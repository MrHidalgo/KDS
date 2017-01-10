function initialize() {
    var myOptions = {
        zoom: 15,
        scrollwheel: false,
        center: new google.maps.LatLng(50.3778063, 30.4773671),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
    var iconMarker = '../img/i-header-arrow-maps.png';
    marker = new google.maps.Marker({
        map: map,
        icon: iconMarker,
        position: new google.maps.LatLng(50.3778063, 30.4773671)
    });
    infowindow = new google.maps.InfoWindow({
        content: "<b>Kyiv Data Spring</b><br/>Akademika Hlushkova Ave, 1<br/>Kyiv, 03680"
    });
    google.maps.event.addListener(marker, "click", function() {
        infowindow.open(map, marker);
    });
    var center = map.getCenter();

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
    });
    infowindow.open(map, marker);
}
if($("#gmap_canvas").length > 0) {
    google.maps.event.addDomListener(window, 'load', initialize);
}


function dateDiff( date2 ) {
    var date1 = new Date(),
        date2 = new Date( date2 );

    var seconds = date2.getSeconds() - date1.getSeconds();
    if ( seconds < 0 ) {
        seconds += 60;
        date2.setMinutes( date2.getMinutes() - 1 );
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    $(".seconds__wrap-line").removeClass('current');
    $(".seconds__wrap-line:gt(" + seconds + ")").addClass('prev');
    $(".seconds__wrap-line:lt(" + seconds + ")").removeClass('prev');
    $(".seconds__wrap-line").eq(seconds).attr("data-second", seconds).addClass('current');

    var minutes = date2.getMinutes() - date1.getMinutes();
    if ( minutes < 0 ) {
        minutes += 60;
        date2.setHours( date2.getHours() - 1 );
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    $(".timer__data-minute .timer__data_value").text(minutes);

    var hours = date2.getHours() - date1.getHours();
    if ( hours < 0 ) {
        hours += 24;
        date2.setDate( date2.getDate() - 1 );
    }
    if (hours < 10) {
        hours = "0" + hours;
    }
    $(".timer__data-hour .timer__data_value").text(hours);

    var days = date2.getDate() - date1.getDate();
    if ( days < 0 ) {
        days += new Date( date2.getFullYear(), date2.getMonth() - 1, 0 ).getDate() + 1;
        date2.setMonth( date2.getMonth() - 1 );
    }
    if (days < 10) {
        days = "0" + days;
    }
    $(".timer__data-day .timer__data_value").text(days);

    var months = date2.getMonth() - date1.getMonth();
    if ( months < 0 ) {
        months += 12;
        date2.setFullYear( date2.getFullYear() - 1 );
    }
    if (months < 10) {
        months = "0" + months;
    }
    $(".timer__data-month .timer__data_value").text(months);


    // var years = date2.getFullYear() - date1.getFullYear();
    // return [ years, months, days, hours, minutes, seconds ];
}


function getfrominputs() {
    var string = "March 11,2017 11:00";

    dateDiff(string);

    setInterval(function() {
        dateDiff(string);
    }, 1000);
}

function scrollWindowNavigationFixedLarge() {
    var countScroll     = $(window).scrollTop(),
        navigationBlock = $('.navigation_fixed');

    if (countScroll > 130 ) {
        navigationBlock.slideDown(500);
    }
    else {
        navigationBlock.slideUp(500);
    }
}

function scrollWindowNavigationFixedMobile() {
    var countScroll     = $(window).scrollTop(),
        navigationBlock = $('.btn-mobile');

    if (countScroll > 130 ) {
        navigationBlock.addClass("btn_fixed");
    }
    else {
        navigationBlock.removeClass("btn_fixed");
    }
}


$(window).on("load resize ready scroll", function(){
    if($(window).width() > '991') {
        scrollWindowNavigationFixedLarge();
    } else {
        $('.navigation_fixed').slideUp(500);
        scrollWindowNavigationFixedMobile();
    }
});


/* MAIN HEADER REMOVE ACTIVE CLASS AFTER SCROLL TOP*/
$(window).on("scroll", function() {
    if($("body").scrollTop() === 0 ) {
        $('.nav__link').removeClass('active');
    }
});


$(document).ready(function(){
    /* TIMER */
    getfrominputs();


    /* BODY CLICK */
    $('body').on('click', function (e) {
        if (!$(e.target).closest('.nav__link').length) {
            $('.nav__link').removeClass('active');
        }
    });


    /* BTN MORE MOBILE - SPEAKER */
    $(".btn__more").on("click", function(e){
        e.preventDefault();
        $('.speaker__dop-row').css(
            "display","flex"
        ).slideDown(400);
        // $(this).hide();
    });


    /* BTN MOBILE MENU */
    $(".btn-mobile").on("click", function(e) {
        e.preventDefault();
        $(".nav").addClass("animated flipInX");
        $("body").addClass('open-menu');
        $(this).css(
            "opacity" , "0"
        );
    });
    $(".btn-mobile_close").on("click", function(e){
        e.preventDefault();
        $(".nav").removeClass("animated flipInX");
        $("body").removeClass('open-menu');
        $(".btn-mobile").css(
            "opacity" , "1"
        );
    });


    /* NAV LINK */
    $(".nav__link").on("click", function(e){
        e.preventDefault();

        var id  = $(this).attr('href');

        $(".nav__link").removeClass("active");
        $("a[href=" + id + "]").addClass("active");

        $(".nav").removeClass("animated flipInX");
        $("body").removeClass('open-menu');
        $(".btn-mobile").css(
            "opacity" , "1"
        );
    });


    /* SMOOTH SCROLL */
    $(".nav, .navigation__row").on("click", "a", function (e) {
        e.preventDefault();

        var id          = $(this).attr('href'),
            navHeight   = $(".navigation").outerHeight(),
            top         = $(id).offset().top - navHeight;

        $('body, html').animate(
            {
                scrollTop: top
            }, 1000);
    });


    /* LOGO CLICK SCROLL TO TOP */
    $(".img-logo-fixed").on("click", function(e) {
        $('body,html').animate(
            {
                scrollTop: 0
            }, 1000
        );
    });


    /* NOIZE */
    var strClass = ".header__wrap-row, .btn-mobile, " +
        ".video__skale-blue, .video__skale-white, .video__skale-gray, " +
        ".navigation__wrap, " +
        ".timer__seconds, .timer__btn, " +
        ".price__left, .price__right, " +
        ".discover__wrap, " +
        ".program__left, .program__right, " +
        ".subscribe, " +
        ".footer__wrap, " +
        ".preparation__form";

    $(strClass).noisy({
            intensity: 0.2,
            size: 200,
            opacity: 0.3,
            fallback: '',
            randomColors: false, // true by default
            color: '#e6e6e6'
        }
    );


    /* ANIMATION - VIEW PORT CHECK PAGE */
    if($(window).width() > '767') {
        $('.advantages').addClass('hidden').viewportChecker({
                classToAdd: 'visible animated fadeInRight',
                classToRemove : 'hidden'
            }
        );
        $('.new').addClass('hidden').viewportChecker({
                classToAdd: 'visible animated slideInLeft',
                classToRemove : 'hidden'
            }
        );
        $('.speaker').addClass('hidden').viewportChecker({
                classToAdd: 'visible animated slideInUp',
                classToRemove : 'hidden'
            }
        );
        $('.price').addClass('hidden').viewportChecker({
                classToAdd: 'visible animated bounceInLeft',
                classToRemove : 'hidden'
            }
        );
        $('.program__left').addClass('hidden').viewportChecker({
                classToAdd: 'visible animated slideInLeft',
                classToRemove : 'hidden'
            }
        );
        $('.program__right').addClass('hidden').viewportChecker({
                classToAdd: 'visible animated slideInRight',
                classToRemove : 'hidden'
            }
        );
    }
});
