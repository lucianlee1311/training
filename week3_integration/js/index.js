$( document ).ready(function() {

	$('.menu-item').parent('.panel').click(function(e){
		e.stopPropagation();

		$('ol').children('.panel').filter(function(item) {
			 return $(this).children('.menu-item').hasClass("active") === true;
		}).children('.panel-collapse').slideUp(200);

	  $('li a').removeClass("active");
	  $(this).children('.menu-item').addClass("active");

		$('li a .menu-sub-item').removeClass("active");
		$(this).children('div').children('.menu-sub-item:nth-child(1)').addClass("active");
	});

	$("div a.menu-sub-item").click(function (e) { 
		e.stopPropagation();

		let hasActiveClass = $(this).parent('div').parent('li').children('.menu-item').hasClass("active");
		if(!hasActiveClass) {
			$('ol').children('.panel').filter(function(item) {
				 return $(this).children('.menu-item').hasClass("active") === true;
			}).children('.panel-collapse').slideUp(200);
    }

	  $('li a').removeClass("active");
		$(this).parent('div').parent('li').children('.menu-item').addClass("active");

		$('li div .menu-sub-item').removeClass("active");
	  $(this).addClass("active");
	});
	
	$('.open-advanced-search').click(function(e) {
		let openAdvancedSearch = $('.open-advanced-search');
		let advancedSearch = $('.advanced-search');

		if(advancedSearch.hasClass('hidden')) {
			openAdvancedSearch.children('i').addClass('dark');
			advancedSearch.removeClass('hidden');
		} else {
			openAdvancedSearch.children('i').removeClass('dark');
			advancedSearch.addClass('hidden');
		}
	});


	$(".panel-heading").parent('.panel').hover(function() {
  	let hasActiveClass = $(this).children('.menu-item').hasClass("active");
    var submenu = $(this).children('.panel-collapse');
	  if ( $(submenu).is(':hidden') ) {
	    $(submenu).slideDown(200);
	  } else if(!hasActiveClass) {
		  $(submenu).slideUp(200);
	  }
  });

});