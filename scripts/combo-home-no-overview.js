$(function() {
    var timer;
    var delay = 1500;
    var initialHoveredItem = false;

    $('nav').hover(function() {
      $('#navigation a').hover(function() {
        if (!initialHoveredItem) {
          $(this).closest('li').addClass('hover-expansion');
          initialHoveredItem = true;
        }
      });
      timer = setTimeout(function() {
        $('#wrapper').addClass('hovering');
      }, delay);
    }, function() {
      clearTimeout(timer);
      $('#wrapper').removeClass('hovering');
      $('.hover-expansion').removeClass('hover-expansion');
      initialHoveredItem = false;
    });

    $('#wrapper > nav').delegate('a:not("#nav-toggle")', 'click', function(event) {
      clearTimeout(timer);
      var $clickedLink = $(this);
      var $listItem = $clickedLink.closest('li');

      // Handle expanding/collapsing nested lists
      if ($listItem.hasClass('expands')) {
        event.preventDefault();

        if ($('#wrapper').hasClass('nav-closed')) {
          $listItem.addClass('expanded');
          var $firstInnerLink = $listItem.find('ul a').first();
          $clickedLink = $firstInnerLink;

          if ($('#wrapper').hasClass('hovering')) {
            $listItem.toggleClass('hover-expansion');
          }
        } else {
          $listItem.toggleClass('expanded');
          $listItem.children('ul').slideToggle();
        }
      }

      // Handle active class
      $('#navigation a').removeClass('active');
      $('#navigation li.expands').removeClass('active-child');
      $clickedLink.addClass('active');

      // Swap content
      $('#content').removeClass();
      $('#content').addClass('content-' + $clickedLink.attr('id'));

      if ($clickedLink.is('#logo, #home')) {
        $('#content').removeClass();
        $('#content').addClass('content-home');
        $('#home').addClass('active');
        $('#local').html('Vantage');
        $('.page-content').hide();
      }
      else if ($clickedLink.parent('li').parent().is('#navigation')) {
        $('#local').html($clickedLink.children('span:last-of-type').html());
        $('.page-content').show();
        $('.page-content').html('<span class="material-symbols-outlined">' + $clickedLink.children('span').html() + '</span>');
      }
      else if ($clickedLink.closest('ul').parent().closest('#navigation').length > 0) {
        $('#local').html($clickedLink.children('span:last-of-type').html());
        $('.page-content').show();
        $('.page-content').html('<span class="material-symbols-outlined">' + $clickedLink.children('span').html() + '</span>');
      }

      // Add active-child class only to parent li elements with 'expands' class
      $clickedLink.parentsUntil('#navigation', 'li.expands').addClass('active-child');
    });

    // Simulate nav link click from "view all" links
    $('.tiling-card > footer').delegate('a', 'click', function(event) {
      event.preventDefault();
      
      var $clickedLink = $(this);

      $('#'+$clickedLink.attr('href')).click();
    });

    $("#help-toggle").click(function() {
      $("#wrapper").toggleClass("help-closed");
    });
    $("#nav-toggle").click(function() {
      $("#wrapper").toggleClass("nav-closed");
      $(".active-child").addClass("expanded");
    });
});