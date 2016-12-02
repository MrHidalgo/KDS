function initialize() {
    var myOptions = {
        zoom: 14,
        scrollwheel: false,
        center: new google.maps.LatLng(50.440592, 30.49163599999997),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("gmap_canvas"), myOptions);
    marker = new google.maps.Marker({
        map: map,
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
        $(".seconds__wrap-line").eq(sec).addClass('prev');
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


$(document).ready(function(){
    getfrominputs();
});