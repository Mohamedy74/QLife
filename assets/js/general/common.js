$(function () {
    "use strict";
    var isDir = document.getElementsByTagName("html")[0].getAttribute("dir");

    /* fixed header */
    $(document).scroll(function () {
        var $nav = $(".app-header");
        $nav.toggleClass("sticky", $(this).scrollTop() > $nav.height());
        if ($('#sticky-links')) {
            if ($(this).scrollTop() > $nav.height()) {
                $('#sticky-links').css('top', $nav.outerHeight());
            } else {
                $('#sticky-links').css('top', 0);
            }
            onScroll();
        }
    });

    // Menu bar
    $('.app-header .toggle_menu_bar').on('click', function () {
        $('.app-header .navbar-collapse').toggleClass('show');
        if ($(".app-header .navbar-collapse").hasClass("show")) {
            $(".app-header .overlay_sidebar").show();
        } else {
            $(".app-header .overlay_sidebar").hide();
        }
    });

    // Scroll To
    $('a.anchorLink').click(function () {
        $('.title_tabs a').removeClass("active");
        $(this).addClass("active");

        $('html, body').stop().animate({
            scrollTop: $($(this).attr('href')).offset().top - 160
        }, 300);
        return false;
    });

    function onScroll(event) {
        var scrollPos = $(document).scrollTop();
        $('a.anchorLink').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('#sticky-links a').removeClass("active");
                currLink.addClass("active");
            }
            else {
                currLink.removeClass("active");
            }
        });
    }


    const inputElements = [...document.querySelectorAll('input.code-input')]

    inputElements.forEach((ele, index) => {
        ele.addEventListener('keydown', (e) => {
            // if the keycode is backspace & the current field is empty
            // focus the input before the current. Then the event happens
            // which will clear the "before" input box.
            if (e.keyCode === 8 && e.target.value === '') inputElements[Math.max(0, index - 1)].focus()
        })
        ele.addEventListener('input', (e) => {
            // take the first character of the input
            // this actually breaks if you input an emoji like ....
            // but I'm willing to overlook insane security code practices.
            const [first, ...rest] = e.target.value
            e.target.value = first ?? '' // first will be undefined when backspace was entered, so set the input to ""
            const lastInputBox = index === inputElements.length - 1
            const didInsertContent = first !== undefined
            if (didInsertContent && !lastInputBox) {
                // continue to input the rest of the string
                inputElements[index + 1].focus()
                inputElements[index + 1].value = rest.join('')
                inputElements[index + 1].dispatchEvent(new Event('input'))
            }
        })
    })

    $('input[name="paymentmethod"]').on('change', function (e) {
        if (e.target.value === 'fawry') {
            $('#fawryModal').modal('show');
        }
    });

    $(".toggle-password").on('click', function () {
        $(this).find('i').toggleClass("fa-eye fa-eye-slash");
        var input = $($(this).attr("data-toggle"));
        if (input.attr("type") == "password") {
            input.attr("type", "text");
        } else {
            input.attr("type", "password");
        }
    });

    if ($("#stepper-wizard").length) {
        $("#stepper-wizard").steps({
            headerTag: ".stepper_title",
            bodyTag: ".stepper_content",
            transitionEffect: "slideLeft",
            titleTemplate: '<span class="number">#index#</span> #title#',
            labels: {
                cancel: "Cancel",
                finish: "Checkout",
                next: "Next",
                previous: "Back",
            },
            autoFocus: true
        });
    }


    // select2
    if ($('.select2').length > 0) {
        $('.select2').each(function (i, obj) {
            $(obj).select2({
                placeholder: $(this).attr('placeholder')
            });
        });
    }

});