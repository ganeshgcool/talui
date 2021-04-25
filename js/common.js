
'use strict';

$(document).ready(function () {
	// Custom function which toggles between sticky class (is-sticky)
	var stickyToggle = function (sticky, stickyWrapper, scrollElement) {
		var stickyHeight = sticky.outerHeight();
		var stickyTop = stickyWrapper.offset().top;
		if (scrollElement.scrollTop() >= stickyTop) {
			stickyWrapper.height(stickyHeight);
			sticky.addClass("is-sticky");
		}
		else {
			sticky.removeClass("is-sticky");
			stickyWrapper.height('auto');
		}
	};

	// Find all data-toggle="sticky-onscroll" elements
	$('[data-toggle="sticky-onscroll"]').each(function () {
		var sticky = $(this);
		var stickyWrapper = $('<div>').addClass('sticky-wrapper'); // insert hidden element to maintain actual top offset on page
		sticky.before(stickyWrapper);
		sticky.addClass('sticky');

		// Scroll & resize events
		$(window).on('scroll.sticky-onscroll resize.sticky-onscroll', function () {
			stickyToggle(sticky, stickyWrapper, $(this));
		});

		// On page load
		stickyToggle(sticky, stickyWrapper, $(window));
	});
});

$(function() {

	$("input[type='password'][data-eye]").each(function(i) {
		var $this = $(this),
			id = 'eye-password-' + i,
			el = $('#' + id);

		$this.wrap($("<div/>", {
			style: 'position:relative',
			id: id
		}));

		$this.css({
			paddingRight: 60
		});
		$this.after($("<div/>", {
			html: 'Show',
			class: 'btn btn-primary btn-sm',
			id: 'passeye-toggle-'+i,
		}).css({
				position: 'absolute',
				right: 10,
				top: ($this.outerHeight() / 2) - 12,
				padding: '2px 7px',
				fontSize: 12,
				cursor: 'pointer',
		}));

		$this.after($("<input/>", {
			type: 'hidden',
			id: 'passeye-' + i
		}));

		var invalid_feedback = $this.parent().parent().find('.invalid-feedback');

		if(invalid_feedback.length) {
			$this.after(invalid_feedback.clone());
		}

		$this.on("keyup paste", function() {
			$("#passeye-"+i).val($(this).val());
		});
		$("#passeye-toggle-"+i).on("click", function() {
			if($this.hasClass("show")) {
				$this.attr('type', 'password');
				$this.removeClass("show");
				$(this).removeClass("btn-outline-primary");
			}else{
				$this.attr('type', 'text');
				$this.val($("#passeye-"+i).val());				
				$this.addClass("show");
				$(this).addClass("btn-outline-primary");
			}
		});
	});

	$(".my-login-validation").submit(function() {
		var form = $(this);
        if (form[0].checkValidity() === false) {
          event.preventDefault();
		  event.stopPropagation();
        }
		form.addClass('was-validated');
		document.location.replace('/talui/basicinformation.html');
	});
});
