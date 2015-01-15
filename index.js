(function(document, chrome, $) {
  'use strict';

  var url = 'http://localhost:8081/';
  var languageCode = 'en';
  var sidebarUrl = chrome.extension.getURL('sidebar.html');

  // var fields = $('[data-tr-key]');

  // Load sidebar
  $.get(sidebarUrl, function (sidebar) {
    document.body.innerHTML += sidebar;

    var saveButton = $('.tr-save');

    saveButton.on('click', function() {
      var newKey = $('.tr-text-key').text();
      var newValue = $('.tr-text-value').val();

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

          reloadPhrases();
        }
      })

    });

    reloadPhrases();
  });

  // Completely reloads all phrases for the current language
  function reloadPhrases () {
    var nav = $('.tr-translation-navigation');
    nav.html('');
    $.getJSON(url + 'keys?language_code=' + languageCode, function (items) {
      items.forEach(function (item) {
        nav.append(boxTemplate(item));
      });
    });
  }

  function boxTemplate (data) {
    return '' +
    '<div class="tr-translation">' +
      data.key +
      '<p class="tr-translation-value" title="click to edit">' +
        data.value +
      '</p>' +
    '</div>';
  }

})(document, chrome, $);
