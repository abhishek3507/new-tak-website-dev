/* otp verify */
$('.digit-group').find('input').each(function() {
    $(this).attr('maxlength', 1);
    $(this).on('keyup', function(e) {
        var parent = $($(this).parent());

        if (e.keyCode === 8 || e.keyCode === 37) {
            var prev = parent.find('input#' + $(this).data('previous'));

            if (prev.length) {
                $(prev).select();
            }
        } else if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 96 && e.keyCode <= 105) || e.keyCode === 39) {
            var next = parent.find('input#' + $(this).data('next'));

            if (next.length) {
                $(next).select();
            } else {
                if (parent.data('autosubmit')) {
                    parent.submit();
                }
            }
        }
    });
});
/* nav slider */
$(".sidebar-dropdown > a").click(function() {
    $(".sidebar-submenu").slideUp(200);
    if (
        $(this)
        .parent()
        .hasClass("active")
    ) {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
            .parent()
            .removeClass("active");
    } else {
        $(".sidebar-dropdown").removeClass("active");
        $(this)
            .next(".sidebar-submenu")
            .slideDown(200);
        $(this)
            .parent()
            .addClass("active");
    }
});

$("#close-sidebar").click(function() {
    $(".page-wrapper").removeClass("toggled");
});
$("#show-sidebar").click(function() {
    $(".page-wrapper").addClass("toggled");
});

//   for an individual element
var flkty = new Flickity('#brandCarousel', {
    contain: true,
    pageDots: false,
    wrapAround: true,
    freeScroll: true,
    autoPlay: false
});

$(document).ready(function() {
    $(".gallery-cell a").click(function() {
        $(".gallery-cell a").css({
            "color": "#000",
            "font-weight": "normal"
        });
        $(this).css({
            "color": "red",
            "font-weight": "bold"
        });
    });
});
$('.top-new-carousel').flickity({
    // options
    cellAlign: 'left',
    freeScroll: true,
    contain: false,
    prevNextButtons: false,
    pageDots: false,
    autoPlay: 1500,
    initialIndex: 1,
});
$(document).ready(function(){
      $('.news-carouse').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        dotsEach:true,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
});
$(document).ready(function(){
      $('.live-news-carouse').owlCarousel({
        loop:true,
        margin:0,
        nav:false,
        dots: false,
        dotsEach:false,
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
});
$(document).ready(function(){
//     $('.ongoing-news-carouse').owlCarousel({
//       loop:true,
//       margin:0,
//       nav:false,
//       dotsEach:true,
//       responsive:{
//           0:{
//               items:1
//           },
//           600:{
//               items:1
//           },
//           1000:{
//               items:1
//           }
//       }
//   })
});
$(document).ready(function(){
      $('.spotlite-carouse').owlCarousel({
        loop:true,
        margin:10,
        nav:false,
        dots:false,
        dotsEach:false,
        responsive:{
            0:{
                items:3
            },
            360:{
                items:4
            },
            468:{
                items:5
            },
            600:{
                items:6
            },
            1000:{
                items:5
            }
        }
    })
});
$(document).ready(function(){
    $('.channel-carouse').owlCarousel({
      loop:true,
      margin:0,
      nav:false,
      dots:false,
      dotsEach:false,
      responsive:{
          0:{
              items:3
          },
          468:{
              items:4
          },
          600:{
              items:5
          },
          1000:{
              items:4
          }
      }
  })
});
