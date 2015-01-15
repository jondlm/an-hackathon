(function(document, chrome, $) {
  'use strict';

  var url = 'http://10.10.32.17:8081/';
  // var url = 'http://localhost:8081/';

  // fetch initial code
  var languageCode = 'fr';
  var sidebarUrl = chrome.extension.getURL('sidebar.html');

  // var fields = $('[data-tr-key]');

  // Load sidebar
  $.get(sidebarUrl, function (template) {
    var sidebar = $(template);
    $('body').append(sidebar);

    var saveButton = $('.tr-save');

    var lang = sidebar.find('.tr-translation-language select');

    lang.val(languageCode);

    lang.on('change', function() {
      languageCode = lang.val();
      reloadPhrases(true);
    });

    saveButton.on('click', function() {
      var newKey = sidebar.find('.tr-text-key').text();
      var newValue = sidebar.find('.tr-text-value').val();

      $.ajax({
        type: 'POST',
        url: url + 'keys/' + newKey,
        dataType: 'json',
        data: {
          language_code: languageCode,
          value: newValue
        },
        success: function(){
          // Preview the current page with the change
          var justChanged = $("[data-tr-key='"+ newKey +"']");
          justChanged.html(newValue);

          justChanged.removeClass('pulse');
          justChanged.addClass('pulse');
          setTimeout(function() {
            justChanged.removeClass('pulse');
          }, 1000);

          reloadPhrases();
        }
      });
    });

    reloadPhrases();
  });

  // Completely reloads all phrases for the current language
  function reloadPhrases (animate) {
    var nav = $('.tr-translation-navigation');
    nav.html('');
    $.getJSON(url + 'keys?language_code=' + languageCode, function (items) {
      items.forEach(function (item) {
        var itemTemplate = $(boxTemplate(item));
        nav.append(itemTemplate);
        itemTemplate.on('click', function(e) {
          updateSidebar(item.key, item.value, "");
        });
        $("[data-tr-key='"+ item.key +"']").html(item.value);
        $("[data-tr-key='"+ item.key +"']").addClass('animated');
        if (animate) {
          $("[data-tr-key='"+ item.key +"']").addClass('fadeIn');
          setTimeout(function() {
            $("[data-tr-key='"+ item.key +"']").removeClass('fadeIn');
          }, 1000);
          // $("[data-tr-key='"+ item.key +"']").addClass('pulse');
        }
      });

    });
  }

  function updateSidebar(key, value, orig) {
    $('.tr-text-key').text(key);
    $('.tr-text-value').val(value);
    $('.tr-original-text').text(escapeTrText(orig));
  }

  function escapeTrText(text) {
    return $('<div />').text(text).html();
  }

  function boxTemplate (data) {
    return '' +
    '<div class="tr-translation">' +
      '<div class="tr-translation-key">' +
        data.key +
      '</div>' +
      '<p class="tr-translation-value" title="click to edit">' +
        escapeTrText(data.value) +
      '</p>' +
    '</div>';
  }

})(document, chrome, $);
