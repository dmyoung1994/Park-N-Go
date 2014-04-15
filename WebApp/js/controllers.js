(function(a) {
	(jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);

if (!jQuery.browser.mobile) {
	//window.location.href="http://parkngo.me/desktop";
}

(function(i, s, o, g, r, a, m) {
	i['GoogleAnalyticsObject'] = r;
	i[r] = i[r] ||
	function() {
		(i[r].q = i[r].q || []).push(arguments)
	}, i[r].l = 1 * new Date();
	a = s.createElement(o), m = s.getElementsByTagName(o)[0];
	a.async = 1;
	a.src = g;
	m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-45645834-1', 'parkngo.me');
ga('send', 'pageview');

$(document).ready(function() {
	var userLong = null;
	var userLat = null;
	var geocoder = new google.maps.Geocoder();
	var directionsDisplay;
	var directionsService = new google.maps.DirectionsService(); 
	
	/* Geolocation and Map init */
	$('#map_canvas').gmap({
		'center': new google.maps.LatLng(42.345573, -71.098326),
		"zoom": 3,
		zoomControl: false
	});
	
	$('#map_canvas').gmap().bind('init', function(evt, map) {
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(map);
		$('#map_canvas').gmap('getCurrentPosition', function(position, status) { /* gets users location if loc services are enabled */
			if (status === 'OK') {
				userLat = position.coords.latitude;
				userLong = position.coords.longitude;
				$('#map_canvas').gmap('option', 'center', new google.maps.LatLng(userLat, userLong));
				$('#map_canvas').gmap('option', 'zoom', 14);
				$('#map_canvas').gmap('addMarker', {
					'position': new google.maps.LatLng(userLat, userLong),
					'icon': '/img/green_pin.png'
				});
				$.ajax({
					type: "GET",
					url: "scripts/get_spots.php",
					dataType: "json"
				}).done(function(dataJSON) {
					var pinData = dataJSON.Pins;
					for (var i = 0; i < pinData.length; i++) {
						(function() {
							var content = "<div>"+
										  "<b>Type:</b> "+pinData[i].Type + 
										  "<br><b>Capacity:</b> " + pinData[i].Capacity + 
										  "<br><b>Rate per half hour:</b> $ "+pinData[i].Rate30 + 
										  "<br><b>Rate per day:</b> $ " + pinData[i].RateDay + 
										  "<br><b>Payment Methods:</b> " + pinData[i].Methods + 
										  "<br><div class='getDirections button' lat='"+pinData[i].Lat+"'long='"+pinData[i].Long+"'>Get Directions</button>" +
										  "</div>";
							$('#map_canvas').gmap('addMarker', {
								'position': new google.maps.LatLng(pinData[i].Lat, pinData[i].Long),
								'bounds': false,
								'icon': '/img/spot_marker_green.png'
							}).click(function() {
								$('#map_canvas').gmap('openInfoWindow', {
									'content': content,
									'maxWidth': '250',
								}, this);
							});
						})();
					}
				});
				
				/* ajax call to get user added markers */
				$.ajax({
					type: "GET",
					url: "scripts/get_user_spots.php",
					dataType: "json"
				}).done(function(dataJSON) {
					var pinData2 = dataJSON.Pins;
					for (var i = 0; i < pinData2.length; i++) {
						(function() {
							var content = "<div>"+
										  "<b>Type:</b> " + "Street" + 
										  "<br><b>Rate:</b> $ " + pinData2[i].Cost + 
										  "<br><b>Notes:</b> " + pinData2[i].notes + 
										  "<br><div class='getDirections button' lat='"+pinData2[i].Lat+"' long='"+pinData2[i].Long+"'>Get Directions</div>" +
										  "</div>";
							$('#map_canvas').gmap('addMarker', {
								'position': new google.maps.LatLng(pinData2[i].Lat, pinData2[i].Long),
								'bounds': false,
								'icon': '/img/spot_marker_green.png'
							}).click(function() {
								$('#map_canvas').gmap('openInfoWindow', {
									'content': content,
									'maxWidth': '250'
								}, this);
							});
						})();
					}
				});
			} else {
				alert("Please enable location services in your privacy settings");
			}
		});
	}); 
	
	/* this function decodes an address into its lat, long position */

	function codeAddress() {
		var address = $('#street_add').val();
		var city = $('#city_add').val();
		geocoder.geocode({
			'address': address,
			'componentRestrictions': {
				'locality': city
			}
		}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				$('input[name="add_lat"]', '#form_add').val(results[0].geometry.location.ob);
				$('input[name="add_long"]', '#form_add').val(results[0].geometry.location.pb);
			} else {
				alert("Geocode was not successful for the following reason: " + status);
			}
		});
	}

	function calcRoute(startLong, startLat, endLong, endLat) {
		var start = new google.maps.LatLng(startLat, startLong);
		var end = new google.maps.LatLng(endLat, endLong);
		var request = {
			origin: start,
			destination: end,
			travelMode: google.maps.TravelMode.DRIVING
		};
		directionsService.route(request, function(response, status) {
			if (status == google.maps.DirectionsStatus.OK) {
				directionsDisplay.setDirections(response);
			}
		});
	} 
	
	/* google maps geecomplete search */
	$("#search").geocomplete({
		details: ".search_details"
	}).bind("geocode:result", function(event, result) {
		$('#map_canvas').gmap('option', 'center', new google.maps.LatLng($('.search_details input[name="lat"]').val(), $('.search_details input[name="lng"]').val()));
		$('#map_canvas').gmap('option', 'zoom', 11);
	}); 
	
	/* Ajax call for user to add marker */
	$('button[name="submit"]').click(function() {
		if ($('#cur_loc_slider option:selected').val() === 'N') {
			codeAddress();
		}
		setTimeout(function() {
			dataStringAdd += "&lat=" + $('input[name="add_lat"]', '#form_add').val();
			dataStringAdd += "&lng=" + $('input[name="add_long"]', '#form_add').val();
			dataStringAdd += "&cost=" + $('input[name="cost_add"]', '#form_add').val();
			dataStringAdd += "&notes=" + $('.notes').val();
			$.ajax({
				type: "POST",
				data: dataStringAdd,
				url: "scripts/add_spot.php"
			}).done(function(data) {
				if (data === "SUCCESS") {
					alert("Parking spot added.");
					var spotVal = $('input[name="add_lat"]', '#form_add').val() + ',' + $('input[name="add_long"]', '#form_add').val()
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
	
	// Directions api calls
	$('.getDirections').click(function() {
		console.log('press');
		var endLat = $(this).attr('lat');
		var endLong = $(this).attr('long');
		calcRoute(userLong, userLat, endLong, endLat);
	});
	
	// Logic for add spot switch
	$('#cur_loc_slider').change(function() {
		if ($('#cur_loc_slider option:selected').val() === 'N') {
			$('.loc_input').slideToggle();
		}
		if ($('.loc_input:visible') && $('#cur_loc_slider option:selected').val() === 'Y') {
			$('.loc_input').slideToggle();
		}
	});
});