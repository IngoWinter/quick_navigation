$(document).on('rex:ready', function() {
       quicknavi_filter_init();

       var ctype = getUrlVars()["ctype"];
       if (ctype)
       {
	   $(".quicknavi a").attr('href', function(i, h) {
	     return h + (h.indexOf('?') != -1 ? "&ctype="+ctype : "?ctype="+ctype);
	   		});
       }

});

$(document).on("shown.bs.dropdown", function() {
   $(this).find(".dropdown-menu li.bg-primary a").focus();
   $(this).find('.dropdown-menu.quicknavi li:first-child input').focus();
});

function quicknavi_filter_init() {
    $('#qsearch').closest('form').submit(function (e) {
        var input_val = $('#qsearch').val(),
            suggestions = $(".quicknavi.list-group li.quickitem:visible");
        if (!$.isNumeric(input_val) || !suggestions.length) {
            e.stopImmediatePropagation();
            return false;
        }
    });
	$('#qsearch').keyup(function(){
		var current_query = $('#qsearch').val();
		if (current_query !== "") {
			$(".quicknavi.list-group li.quickitem").hide();
			$(".quicknavi.list-group li.quickitem").each(function(){
				var current_keyword = $(this).text();
				 var upercase = current_query.substr(0,1).toUpperCase() + current_query.substr(1);
			    if ((current_keyword.indexOf(current_query) >=0) ||  (current_keyword.indexOf(upercase) >=0)) {
				$(this).show();
				}

			});
		} else {
			$(".quicknavi.list-group li.quickitem").show();
		}
	});
}

function getUrlVars() {
var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
vars[key] = value;
});
return vars;
}
