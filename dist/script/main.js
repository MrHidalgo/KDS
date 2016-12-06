function initialize() {
    var myOptions = {
        zoom: 14,
        scrollwheel: false,
        center: new google.maps.LatLng(50.440592, 30.49163599999997),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
    var iconMarker = '../img/i-header-arrow-maps.png';
    marker = new google.maps.Marker({
        map: map,
        icon: iconMarker,
        position: new google.maps.LatLng(50.440592, 30.49163599999997)
    });
    infowindow = new google.maps.InfoWindow({
        content: "<b>KDS</b><br/>Vokzalna St, 1, Kyiv, <br/>02000 Kiev"
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


function get_timer(string) {
    var date_new = string;
    var date_t = new Date(date_new);
    var date = new Date();
    var timer = date_t - date;

    if (date_t > date) {
        var month = parseInt(timer / (60 * 60 * 60 * 1000 * 12));
        if (month < 10) {
            month = "0" + month;
        }
        month = month.toString();
        var day = parseInt(timer / (60 * 60 * 1000 * 24));
        if (day < 10) {
            day = "0" + day;
        }
        day = day.toString();
        var hour = parseInt(timer / (60 * 60 * 1000)) % 24;
        if (hour < 10) {
            hour = "0" + hour;
        }
        hour = hour.toString();
        var min = parseInt(timer / (1000 * 60)) % 60;
        if (min < 10) {
            min = "0" + min;
        }
        min = min.toString();
        var sec = parseInt(timer / 1000) % 60;
        if (sec < 10) {
            sec = "0" + sec;
        }
        sec = sec.toString();
        timethis = month + " : " + day + " : " + hour + " : " + min + " : " + sec;
        $(".timer__data-month .timer__data_value").text(month);
        $(".timer__data-day .timer__data_value").text(day);
        $(".timer__data-hour .timer__data_value").text(hour);
        $(".timer__data-minute .timer__data_value").text(min);

        $(".seconds__wrap-line").removeClass('current');
        $(".seconds__wrap-line:gt(" + sec + ")").addClass('prev');
        $(".seconds__wrap-line:lt(" + sec + ")").removeClass('prev');
        $(".seconds__wrap-line").eq(sec).attr("data-second", sec).addClass('current');
    } else {
        $(".timer__data-month .timer__data_value").text("00");
        $(".timer__data-day .timer__data_value").text("00");
        $(".timer__data-hour .timer__data_value").text("00");
        $(".timer__data-minute .timer__data_value").text("00");
    }
}

function getfrominputs() {
    string = "03/11/2017 00:00";

    get_timer(string);

    setInterval(function() {
        get_timer(string);
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
    var strClass = ".header__wrap-row, " +
        ".video__skale-blue, .video__skale-white, .video__skale-gray, " +
        ".navigation__wrap, " +
        ".timer__seconds, .timer__btn, " +
        ".price__left, .price__right, " +
        ".discover__wrap, " +
        ".program__left, .program__right, " +
        ".subscribe, " +
        ".footer__wrap, " +
        ".preparation__form";

    $(strClass).noisy(
        {
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
        $('.advantages').addClass('hidden').viewportChecker(
            {
                classToAdd: 'visible animated fadeInRight',
                classToRemove : 'hidden'
            }
        );
        $('.new').addClass('hidden').viewportChecker(
            {
                classToAdd: 'visible animated slideInLeft',
                classToRemove : 'hidden'
            }
        );
        $('.speaker').addClass('hidden').viewportChecker(
            {
                classToAdd: 'visible animated slideInUp',
                classToRemove : 'hidden'
            }
        );
        $('.price').addClass('hidden').viewportChecker(
            {
                classToAdd: 'visible animated bounceInLeft',
                classToRemove : 'hidden'
            }
        );
        $('.program__left').addClass('hidden').viewportChecker(
            {
                classToAdd: 'visible animated slideInLeft',
                classToRemove : 'hidden'
            }
        );
        $('.program__right').addClass('hidden').viewportChecker(
            {
                classToAdd: 'visible animated slideInRight',
                classToRemove : 'hidden'
            }
        );
    }
});
