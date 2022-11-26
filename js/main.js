$(document).ready(function() {
    $('.reviews-wrap').flexslider({
		selector: ".reviews > li",
		animation: "slide",
		controlNav: false,
		slideshow: false,
		smoothHeight: true,
		start: function(){
			$('.reviews').children('li').css({
				'opacity': 1,
				'position': 'relative'
			});
		}
	});
});

$(function(){
	
	var ts = new Date(2022, 0, 1),
		clos = true;
	
	if((new Date()) > ts){
		ts = (new Date()).getTime() + 30*60*1000;
		clos = false;
	}
		
	$('#countdown').countdown({
		timestamp: ts
	});
	
});