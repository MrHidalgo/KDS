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


$(document).ready(function(){});