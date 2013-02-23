$(document).ready(function(){
	$("#carousel").rcarousel({
		width: 200,
		height: 250,
		visible: 1,
		step: 1,
		auto: {enabled: true, direction: "next", interval: 200},
		speed: 10
	});
});