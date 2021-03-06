var map;
var map_refresh_rate = 5000;
var actionxml;
var current = 0;
var count = 0;

function loadMapWithMarker(mapId, latitude, longitude){
	initialize(mapId);
	 if (GBrowserIsCompatible()) {
	
	var latlng = new GLatLng( latitude, longitude );
	var marker = new GMarker(latlng);
	map.addOverlay(marker);
	map.setCenter(latlng, 10);
	}
}

function loadEvents(mapId){
	initialize(mapId);

	jQuery.each( jQuery("#eventList tbody tr") , function(i, n){
	var event = jQuery(n);

	if(event.attr("rel") != ','){
	var location = event.attr("rel");
	var link = event.find("td.name a").attr('href');
	var html = "<div class='eventInfo'><strong><a href='" + link + "'>" + event.find("td.name a").text() + "</a></strong>";
	html += "<p><strong>Location: </strong>" + event.find("td.location").html() + "<br/>";
	html += "<strong>Date: </strong>" + event.find("td.date").html() + "</p>";
	
	//html += "<p>" + event.find("td.name span").html() + "</p>";

	html += "<a href='" + link + "'>Read more about this event</a></div>";
	
	addMarker(html, location, link);
	}
	});
}

function initialize(mapId) {
    if (GBrowserIsCompatible()) {
        map = new GMap2(document.getElementById(mapId));
	map.setCenter( new GLatLng(49.61070993807422, -33.3984375), 2);
        map.setUIToDefault();
    }
}

function addMarker(html, location, link) {
    if (GBrowserIsCompatible()) {
	
        var i = new GIcon();
        i.image = "/images/map/smallmarker.png";
        i.shadow = "/images/map/smallmarker_shadow.png";
        i.iconSize = new GSize(12, 20);
        i.shadowSize = new GSize(22, 20);
        i.iconAnchor = new GPoint(6, 20);
        i.infoWindowAnchor = new GPoint(4, 1);
        markerOptions = { icon: i };

	var latlng = new GLatLng( location.split(",")[0], location.split(",")[1] );
	var marker = new GMarker(latlng, markerOptions);

	GEvent.addListener(marker, "click", function() {
            marker.openInfoWindowHtml(html);
        });

        map.addOverlay(marker);
     
        //var info = new Infowin(latlng,'<img src=\''+ avatar +'\' style=\'float:left;width:32px;height:32px;margin-right:5px;\' />' + html + '<br/><a href=\'' + link + '\'>Details</a>');
        //map.addOverlay(info);
    }
}