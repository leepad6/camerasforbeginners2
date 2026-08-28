(function ($) {
    "use strict";
    
    // Initiate the wowjs animation library
    new WOW().init();

    // Initiate nav menu
    $('.menu, .overlay').click(function () {
        $('.menu').toggleClass('clicked');
        $('#nav').toggleClass('show');
    });

    // Close nav menu automatically when a link is clicked (For Swup compatibility)
    $(document).on('click', '#nav a', function() {
        $('.menu').removeClass('clicked');
        $('#nav').removeClass('show');
        $('.overlay').removeClass('show');
    });
    
    // Portfolio modal slider (Protected: Only run if slick is loaded)
    if ($.fn.slick) {
        $('.port-slider').slick({
            autoplay: true,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.port-slider-nav'
        });
        $('.port-slider-nav').slick({
            autoplay: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.port-slider',
            arrows: false,
            dots: false,
            centerMode: true,
            focusOnSelect: true
        });
    }
    
    $('#popover-content-download').hide();
    $("[data-toggle=popover]").each(function (e) {
        $(this).popover({
            html: true,
            content: function () {
                var id = $(this).attr('id')
                return $('#popover-content-' + id).html();
            }
        });

    });
	
	// Date and time picker of booking section (Protected: Only run if datetimepicker is loaded)
    if ($.fn.datetimepicker) {
        $('#date-1, #date-2').datetimepicker({
            format: 'L'
        });
        $('#time-1, #time-2').datetimepicker({
            format: 'LT'
        });
    }

    // ==========================================
    // Dynamic Image Modal Setup
    // ==========================================

   $(document).ready(function() {
        // 1. Automatically inject the Modal HTML into the page if it doesn't exist
        if ($('#imageModal').length === 0) {
            $('body').append(
                '<div class="modal fade" id="imageModal" tabindex="-1" role="dialog" aria-hidden="true">' +
                    // REMOVED 'modal-lg' here to make the overall container narrower
                    '<div class="modal-dialog modal-dialog-centered" role="document">' +
                        '<div class="modal-content" style="background: transparent; border: none;">' +
                            '<div class="modal-body text-center position-relative p-0">' +
                                '<button type="button" class="close text-white" data-dismiss="modal" aria-label="Close" style="position: absolute; top: -30px; right: 0; opacity: 1; font-size: 2rem; text-shadow: none;">' +
                                    '<span aria-hidden="true">&times;</span>' +
                                '</button>' +
                                // ADDED 'max-height: 75vh;' to ensure it never gets taller than 75% of the screen height
                                '<img id="modalImageDisplay" src="" alt="Enlarged Image" style="max-width: 100%; max-height: 75vh; width: auto; border-radius: 12px; box-shadow: 0 5px 15px rgba(0,0,0,0.5); object-fit: contain;">' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        }
    });

    // 2. Image Modal Trigger (Listens for clicks on any image with the class)
    $(document).on('click', '.img-modal-trigger', function(e) {
        e.preventDefault(); // Prevents any weird jumping behavior
        var imageSrc = $(this).attr('src'); 
        $('#modalImageDisplay').attr('src', imageSrc); 
        $('#imageModal').modal('show'); 
    });

// ==========================================
    // Back to Top Button Setup
    // ==========================================

    $(document).ready(function() {
        // 1. Inject the button's CSS and HTML into the page automatically
        if ($('.back-to-top').length === 0) {
            // Add hover styles to the <head>
            $('head').append(`
                <style>
                    .back-to-top {
                        position: fixed;
                        display: none;
                        background: #ffffff;
                        color: #0c0c0c;
                        width: 45px;
                        height: 45px;
                        text-align: center;
                        line-height: 45px;
                        font-size: 20px;
                        border-radius: 50%;
                        right: 20px;
                        bottom: 20px;
                        z-index: 99;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 10px rgba(0,0,0,0.3);
                    }
                    .back-to-top:hover {
                        background: #a8a8a8;
                        color: #ffffff;
                    }
                </style>
            `);
            // Add the button HTML to the <body>
            $('body').append('<a href="#" class="back-to-top"><i class="fa fa-chevron-up"></i></a>');
        }
    });

    // 2. Show or hide the button based on scroll position
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow'); // Fades in after scrolling down 200px
        } else {
            $('.back-to-top').fadeOut('slow'); // Fades out when near the top
        }
    });

    // 3. Smooth scroll to the top when clicked
    $(document).on('click', '.back-to-top', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

// ==========================================
// Camera Type Page: Sensor Crop Simulator
// ==========================================
document.addEventListener('change', function(e) {
    if (e.target && e.target.id === 'sensor-selector') {
        var sensor = e.target.value;
        var overlayBox = document.getElementById('sensor-overlay-box');
        var overlayLabel = document.getElementById('sensor-overlay-label');
        
        if (!overlayBox || !overlayLabel) return;

        if(sensor === 'mediumformat') {
            overlayBox.style.width = '100%';
            overlayBox.style.height = '100%';
            overlayLabel.innerText = 'Medium Format';
        } else if(sensor === 'fullframe') {
            overlayBox.style.width = '81%';
            overlayBox.style.height = '72%';
            overlayLabel.innerText = 'Full Frame';
        } else if (sensor === 'apsc') {
            overlayBox.style.width = '53%';
            overlayBox.style.height = '47%';
            overlayLabel.innerText = 'APS-C';
        } else if (sensor === 'm43') {
            overlayBox.style.width = '39%';
            overlayBox.style.height = '39%';
            overlayLabel.innerText = 'Micro 4/3';
        } else if (sensor === '1inch') {
            overlayBox.style.width = '30%';
            overlayBox.style.height = '26%';
            overlayLabel.innerText = '1-Inch';
        }
    }
});

// ==========================================
// Camera Type Page: Auto-scroll for Brand Accordion
// ==========================================
$(document).on('shown.bs.collapse', '#brandAccordion .collapse', function (e) {
    var targetOffset = $(e.target).offset().top - 100;
    window.scrollTo({
        top: targetOffset,
        behavior: 'smooth'
    });
});

/* ================================================= */
/* -------------- Modal Image Viewer --------------- */
/* ================================================= */
document.addEventListener('click', function(e) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("expandedImg");
    
    // Safety check: stop if the modal HTML is missing on this page
    if (!modal || !modalImg) return; 

    // If an image with the trigger class is clicked
    if (e.target && (e.target.classList.contains('clickable-image') || e.target.classList.contains('img-modal-trigger'))) {
        modal.style.display = "block";
        // Small delay to allow CSS transition to trigger
        setTimeout(function() {
            modal.classList.add('show');
        }, 10);
        modalImg.src = e.target.src;
    }
    
    // If the close button or the dark background is clicked
    if (e.target && (e.target.classList.contains('img-modal-close') || e.target.classList.contains('img-modal'))) {
        modal.classList.remove('show');
        // Wait for CSS fade out transition before hiding completely
        setTimeout(function() {
            modal.style.display = "none";
        }, 300);
    }
});

})(jQuery);