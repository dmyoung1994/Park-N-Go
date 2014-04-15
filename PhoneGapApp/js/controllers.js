(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-45645834-1', 'parkngo.me');
ga('send', 'pageview');

$(document).ready(function(){
	StatusBar.backgroundColorByHexString("#6BDA8D");
	/* Geolocation and Map init */
	var geocoder = new google.maps.Geocoder();
	$('#map_canvas').gmap({ 'center': new google.maps.LatLng(42.345573,-71.098326), "zoom": 3, zoomControl: false});
	$('#map_canvas').gmap().bind('init', function(evt, map) {
		$('#map_canvas').gmap('getCurrentPosition', function(position, status) {
			/* gets users location if loc services are enabled */
			if ( status === 'OK' ) {
				$('#map_canvas').gmap('option','center',new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
				$('input[name="add_lat"]').val(position.coords.latitude);
				$('input[name="add_long"]').val(position.coords.longitude);
				$('#map_canvas').gmap('option','zoom',14);
				$('#map_canvas').gmap('addMarker', {
					'position': new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
					'icon': '/img/green_pin.png'
				});$.ajax({
			type: "GET",
			url: "http://parkngo.me/scripts/get_spots.php",
			dataType: "json"
		}).done(function(dataJSON){
			var pinData = dataJSON.Pins;
			for(var i=0; i<pinData.length; i++){
				(function(){
				var content = "<b>Type:</b> " + pinData[i].Type + 
							  "<br><b>Capacity:</b> " + pinData[i].Capacity +
							  "<br><b>Rate per half hour:</b> $ " + pinData[i].Rate30 +
							  "<br><b>Rate per day:</b> $ " + pinData[i].RateDay + 
							  "<br><b>Payment Methods</b>: " + pinData[i].Methods +
							  "<br><a href='https://maps.google.com/maps?saddr=" + position.coords.latitude +"," + position.coords.longitude + "&daddr="+ pinData[i].Lat +"," + pinData[i].Long + "' target='_blank'>Get Directions</a>" +
							  "</div>";
				$('#map_canvas').gmap('addMarker', {
					'position': new google.maps.LatLng(pinData[i].Lat, pinData[i].Long),
					'bounds': false,
					'icon': '/img/spot_marker_green.png'
				}).click(function(){
					$('#map_canvas').gmap('openInfoWindow', {'content': content, 'maxWidth': '250'}, this);
				});
				})();
			}
		});
	
	/* ajax call to get user added markers */
		$.ajax({
			type: "GET",
			url: "http://parkngo.me/scripts/get_user_spots.php",
			dataType: "json"
		}).done(function(dataJSON){
			var pinData2 = dataJSON.Pins;
			for(var i=0; i<pinData2.length; i++){
				(function(){
				var content = "<b>Type:</b> " + "Street" +
							  "<br><b>Rate:</b> $ " + pinData2[i].Cost +
							  "<br><b>Notes:</b> " + pinData2[i].notes +
							 "<br><a href='https://maps.google.com/maps?saddr=" + position.coords.latitude +"," + position.coords.longitude + "&daddr="+ pinData2[i].Lat +"," + pinData2[i].Long + "' target='_blank'>Get Directions</a>" +
							  "</div>";
				$('#map_canvas').gmap('addMarker', {
					'position': new google.maps.LatLng(pinData2[i].Lat, pinData2[i].Long),
					'bounds': false,
					'icon': '/img/spot_marker_green.png'
				}).click(function(){
					$('#map_canvas').gmap('openInfoWindow', {'content': content, 'maxWidth': '250'}, this);
				});
				})();
			}
		});
			}
			else {
				alert("Please enable location services in your privacy settings");
			}
		});   
	});
	
	/* this function decodes an address into its lat, long position */
	function codeAddress() {
    var address = $('#street_add').val();
    var city = $('#city_add').val();
    geocoder.geocode( { 'address': address, 'componentRestrictions': {'locality': city}}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
	    $('input[name="add_lat"]', '#form_add').val(results[0].geometry.location.ob);
	    $('input[name="add_long"]', '#form_add').val(results[0].geometry.location.pb);
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
	/* google maps geecomplete search */
	$("#search").geocomplete({
		details: ".search_details"
	}).bind("geocode:result", function(event, result){
		$('#map_canvas').gmap('option','center',new google.maps.LatLng($('.search_details input[name="lat"]').val(), $('.search_details input[name="lng"]').val()));
		$('#map_canvas').gmap('option','zoom',11);
	});
	
	/* Ajax call for user to add marker */
	$('button[name="submit"]').click(function(){
		if ($('#cur_loc_slider option:selected').val() === 'N'){
			codeAddress();
		}
		setTimeout(function(){
			dataStringAdd += "&lat=" + $('input[name="add_lat"]', '#form_add').val();
			dataStringAdd += "&lng=" + $('input[name="add_long"]', '#form_add').val();
			dataStringAdd += "&cost=" + $('input[name="cost_add"]', '#form_add').val();
			dataStringAdd += "&notes=" + $('.notes').val();
			$.ajax({
				type   : "POST",
				data   : dataStringAdd,
				url    : "http://parkngo.me/scripts/add_spot.php"
			}).done(function(data) {
				if (data === "SUCCESS") {
					alert("Parking spot added.");
					var spotVal = $('input[name="add_lat"]', '#form_add').val() +','+$('input[name="add_long"]', '#form_add').val()
					ga('set', 'Spot Add', spotVal);
					window.location.href = "http://parkngo.me";
				} else {
					alert("Error occured. Please try again");
					location.reload();
				}
			});
		return false;
		}, 1000);
	});
	
	
	$('#cur_loc_slider').change(function(){
		if ($('#cur_loc_slider option:selected').val() === 'N') {
			$('.loc_input').slideToggle();
		}
		if ($('.loc_input:visible') && $('#cur_loc_slider option:selected').val() === 'Y') {
			$('.loc_input').slideToggle();
		}
	});
	
	$('#spots').click(function(){
		window.plugins.childBrowser.showWebPage('http://parkngo.me/sell', {showAddress:false});
	});
});