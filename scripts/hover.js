$(function() {
    $('#wrapper > nav').delegate('a:not("#nav-toggle")', 'click', function(event) {
      var $clickedLink = $(this);
      var $listItem = $clickedLink.closest('li');

      // Handle expanding/collapsing nested lists
      if ($listItem.hasClass('expands')) {
        event.preventDefault();

        if ($('#wrapper').hasClass('nav-closed')) {
          $listItem.addClass('expanded');
          var $firstInnerLink = $listItem.find('ul a').first();
          $clickedLink = $firstInnerLink;
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

      if ($clickedLink.is('#logo')) {
        $('#home').addClass('active');
        $('#local').html('Home');
        $('.page-content').html('<span class="material-symbols-outlined">home</span>');
      }
      else if ($clickedLink.parent('li').parent().is('#navigation')) {
        $('#local').html($clickedLink.children('span:last-of-type').html());
        $('.page-content').html('<span class="material-symbols-outlined">' + $clickedLink.children('span').html() + '</span>');
      }
      else if ($clickedLink.attr('id') && $clickedLink.attr('id').endsWith('_overview')) {
        $('#local').html($clickedLink.closest('.expands').children('a:first').children('span:last-of-type').html());
        $('.page-content').html('<span class="material-symbols-outlined">' + $clickedLink.closest('.expands').children('a:first').children('span').html() + '</span>');
      }
      else if ($clickedLink.closest('ul').parent().closest('#navigation').length > 0) {
        $('#local').html($clickedLink.children('span:last-of-type').html());
        $('.page-content').html('<span class="material-symbols-outlined">' + $clickedLink.closest('.expands').children('a:first').children('span').html() + '</span>');
      }

      // Add active-child class only to parent li elements with 'expands' class
      $clickedLink.parentsUntil('#navigation', 'li.expands').addClass('active-child');
    });
    $("#help-toggle").click(function() {
      $("#wrapper").toggleClass("help-closed");
    });
    $("#nav-toggle").click(function() {
      $("#wrapper").toggleClass("nav-closed");
      $(".active-child").addClass("expanded");
    });
});