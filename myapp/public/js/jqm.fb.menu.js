$(document).bind("mobileinit", function () {
	$.mobile.pushStateEnabled = true;
});

$(function () {
	var menuStatus = false;

	// Show menu
	$("a.showMenu").on('vclick click', function () {
		if (menuStatus != true) {
			$('#menu').show();
			var pageId = $(".ui-page-active").attr("id");
			$(".ui-page-active").on('vclick click', function(e){
				if(e.target != $("a.showMenu") && menuStatus){
					return false;
				}
			});
			if(pageId === 'youtube') {
				$('#youtube').trigger('youtube-stop');
			}
			$(".page-container").animate({
				left: "240px",
			}, 300, function () {
				menuStatus = true;
			});
			return false;
		} else {
			$(".page-container").animate({
				left: "0px",
			}, 300, function () {
				$(".ui-page-active").off('vclick click');
				menuStatus = false;
				$('#menu').hide();
			});

			return false;
		}
	});

	// Menu behaviour
	$("#menu li a").on('vclick click', function () {
		var p = $(this).parent();
		if ($(p).hasClass('active')) {
			//$("#menu li").removeClass('active');
		} else {
			$("#menu li").removeClass('active');
			$(p).addClass('active');

			var pageName = '#' + this.text.toLowerCase();

			$(".page-container").animate({
				left: "0px",
			}, 300, function () {
				menuStatus = false;
				$(".ui-page-active").off('vclick click');
				$('#menu').hide();
				if(pageName === '#picture') {
					allShare.create(1);
				}
				else if(pageName === '#music') {
					allShare.create(2);
				}
				else if(pageName === '#video') {
					allShare.create(0);
				}
				$.mobile.changePage(pageName, {transition:'none'});
			});

		}
	});

});
 
