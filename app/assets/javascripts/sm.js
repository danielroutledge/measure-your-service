var SmLoaded = (function($) {
  'use strict'
  var init = function() {
    loaded()
  }
  var loaded = function() {
    console.log('Street Manager Loaded...')
  }
  return {
    init: init
  }
})(window.jQuery)

/**
 * Date picker
 * * This function is called in the view template on a conditional basis.
 * * An ESLint error will be thrown for variable SmDatePicker being unused in the js file
 * @param datepickerHiddenInput - hidden input field id selector
 * @param dayInput - day input field id selector
 * @param monthInput - month input field id selector
 * @param yearInput - year input field id selector
 */

var SmDatePicker = function(datepickerHiddenInput, dayInput, monthInput, yearInput) {
  'use strict';
  var init = function() {
    loadDatePicker();
  }

  var loadDatePicker = function() {
    $(datepickerHiddenInput).datepicker({
      onSelect: function(date) {
        var thisDate = splitDate(date)
        $(dayInput).val(thisDate.day).change()
        $(monthInput).val(thisDate.month).change()
        $(yearInput).val(thisDate.year).change()
      }
    }).focus(function () {
      $('.ui-icon-circle-triangle-w').remove();
      $('.ui-icon-circle-triangle-e').remove();
    });
  }

  function splitDate(date) {
    var split = date.split('/')
    return {
      day: split[1],
      month: split[0],
      year: split[2]
    }
  }

  return {
    init: init
  }
}

var SmDatePickerA11y = function(datepickerHiddenInput, dayInput, monthInput, yearInput) {
  'use strict';
  var init = function() {
    console.log('jquery ui date picker a11y')
    loadDatePicker()
  }

  var loadDatePicker = function() {
    $(datepickerHiddenInput).datepicker({
      dayNamesShort: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ],
      showButtonPanel: true,
      closeText: 'Close',
      onClose: removeAria,
      onSelect: function(date) {
        var thisDate = splitDate(date)
        $(dayInput).val(thisDate.day).change()
        $(monthInput).val(thisDate.month).change()
        $(yearInput).val(thisDate.year).change()
      }
    })
  }

  function splitDate(date) {
    var split = date.split('/')
    return {
      day: split[1],
      month: split[0],
      year: split[2]
    }
  }

  return {
    init: init
  }
}

var SmDateRangePicker = function(datepickerFrom, datepickerTo) {
  'use strict';

  var init = function() {
    loadDateRangePicker()
  }

  var loadDateRangePicker = function() {
    var dateFormatting = 'dd/mm/yy';
    var fromSelector = datepickerFrom+' + .sm-calendar-icon';
    var toSelector = datepickerTo+' + .sm-calendar-icon';

    var from = $(datepickerFrom).datepicker({
      dateFormat: dateFormatting
    }).on('change', function() {
      to.datepicker('option', 'minDate', getDate(this, dateFormatting));
    });
    var to = $(datepickerTo).datepicker({
      dateFormat: dateFormatting
    }).on('change', function() {
      from.datepicker('option', 'maxDate', getDate(this, dateFormatting));
    });
    $(fromSelector).click(function() {
      $(datepickerFrom).focus();
    });
    $(toSelector).click(function() {
      $(datepickerTo).focus();
    });
  }

  function getDate(e, dateFormatting) {
    var date;
    try {
      date = $.datepicker.parseDate( dateFormatting, e.value );
    } catch( error ) {
      date = null;
    }
    return date;
  }

  return {
    init: init
  }
}

/**
 * Tabs
 * * This is a function to invoke the .tabs function (jQuery UI) on selected elemented so that content can be rendered in accessibile tabs
 * * This function is called in the view template on a conditional basis.
 * * An ESLint error will be thrown for variable SmTabs being unused in the js file
 * @param tabSelector - selector of tab container
 */

var SmTabs = function(tabSelector, selectedTab) {
  'use strict';
  var init = function() {
    tabFunc(tabSelector, selectedTab);
  }

  var tabFunc = function(tabSelector, selectedTab) {
    // Declare some variables
    var $container = tabSelector;
    var $tablist = '.tabs-list';
    var $tabpanel = '.tabs-panel';

    // The setup
    $($container + " " + $tablist).attr('role','tablist');
    $($container + " " + '[role="tablist"] li').attr('role','presentation');
    $($container + " " + '[role="tablist"] li a').attr('role','tab');

    // Make the first tab selected by default and allow it focus
    $(selectedTab || '[role="tablist"] li:first-child a').attr('aria-selected','true');

    // Make each section focusable and give it the tabpanel role
    $($container + " " + $tabpanel).attr('role','tabpanel');

    // Make all but the first section hidden (ARIA state and display CSS)
    $($container + " " + '[role="tabpanel"]:not(:first-of-type)').attr('aria-hidden','true');

    if ( !$('.clickable').length > 0 ) {
      // Change focus between tabs with arrow keys
      $($container + " " + '[role="tab"]').on('keydown', function(e) {

        // Define current, previous and next (possible) tabs
        var $original = $(this);
        var $prev = $(this).parents('li').prev().children('[role="tab"]');
        var $next = $(this).parents('li').next().children('[role="tab"]');
        var $target;

        // Find the direction (prev or next)
        switch (e.keyCode) {
          case 37:
            $target = $prev;
            break;
          case 39:
            $target = $next;
            break;
          default:
            $target = false
            break;
        }

        if ($target.length) {
          $original.attr('aria-selected','false');
          $target.attr('aria-selected','true').focus();
        }

        // Hide panels
        $($container + " " + '[role="tabpanel"]').attr('aria-hidden', 'true');

        // Show panel which corresponds to target
        $('#' + $(document.activeElement).attr('href').substring(1)).attr('aria-hidden', 'false');

      });
    }

    // Handle click on tab to show + focus tabpanel
    $($container + " " + '[role="tab"]').on('click', function(e) {

      // Remove focusability [sic] and aria-selected
      $($container + " " + '[role="tab"]').attr('aria-selected','false');

      // Replace above on clicked tab
      $(this).attr('aria-selected','true');

      // Hide panels
      $($container + " " + '[role="tabpanel"]').attr('aria-hidden', 'true');

      // Show corresponding panel
      $('#' + $(this).attr('href').substring(1)).attr('aria-hidden', 'false');

      if ( !$('.clickable').length > 0 ) {
        e.preventDefault();
      }

    });
  }
  return {
    init: init
  }
}

/**
 * * Search and filtering
 * * This provides front end functionality for the search and filters tabs and filtering form
 * * This function is called in the view template on a conditional basis.
 * * An ESLint error will be thrown for variable searchFiltering being unused in the js file
 * @param searchFilteringContainerId - selector of search and filtering container
 * @param filterFormContainerId - selector of filter form container
 * @param filterClickId - selector of filter button
 */
var searchFiltering = function(searchFilteringContainerId, filterFormContainerId, filterClickId) {
  'use strict'
  var init = function() {
    hideFilters()
    filterToggle()
    showTabTitle()
  }

  var showTabTitle = function() {
    $('.tab-title').addClass('visually-hidden')
  }

  var hideFilters = function() {
    if ($('.error-summary').length > 0) {
      $(filterClickId).removeClass('caret-down');
      $(filterClickId).addClass('caret-up');
      $(filterFormContainerId).removeClass('inactive');
      $(filterFormContainerId).addClass('active');
      $(searchFilteringContainerId).removeClass('close')
      $(searchFilteringContainerId).addClass('open')
      $('#filter_options_text').removeClass('hide')
      $('#filter_options_text').addClass('show')
      $(filterClickId).text($(filterClickId).data("text-swap"));
    } else {
      $(searchFilteringContainerId).addClass('close')
      $(filterFormContainerId).addClass('inactive')
      $('#filter_options_text').removeClass('hide')
      $('#filter_options_text').addClass('show')
      $('.active-filter-container').removeClass('hide')
      $('.active-filter-container').addClass('show')
    }
  }

  function filterToggle() {
    filterToggleEvent(filterClickId, filterFormContainerId)
  }
  var filterToggleEvent = function(selector, hide_show_panel) {
    $(selector).click(function(e) {
      e.preventDefault();
      $(this).toggleClass('caret-up caret-down');
      $(hide_show_panel).toggleClass('inactive active');
      $(searchFilteringContainerId).toggleClass('close open')
      $('#filter_options_text').toggleClass('show hide')
      $('.active-filter-container').toggleClass('show hide')

      if ($(searchFilteringContainerId).hasClass('open')) {
        document.querySelector(searchFilteringContainerId).setAttribute('aria-expanded', 'true');
        document.querySelector(filterFormContainerId).setAttribute('aria-hidden', 'false');
        document.querySelector(searchFilteringContainerId+" .tabs-panel-inner").setAttribute('aria-hidden', 'false');
      } else {
        document.querySelector(searchFilteringContainerId).setAttribute('aria-expanded', 'false');
        document.querySelector(filterFormContainerId).setAttribute('aria-hidden', 'true');
        document.querySelector(searchFilteringContainerId+" .tabs-panel-inner").setAttribute('aria-hidden', 'true');
      }

      if ($(filterClickId).text() == $(filterClickId).data("text-swap")) {
        $(filterClickId).text($(filterClickId).data("text-original"))
      } else {
        $(filterClickId).text($(filterClickId).data("text-swap"));
      }
    })
  }
  return {
    init: init
  }
}

var autoComplete = function(selectorClass) {
  'use strict'
  var init = function() {
    autoCompleteComponent()
    autoCompleteA11y()
  }

  var autoCompleteComponent = function() {
    var selectEl = document.querySelector(selectorClass)
    accessibleAutocomplete.enhanceSelectElement({
      autoselect: true,
      defaultValue: "",
      minLength: 2,
      selectElement: selectEl,
      showAllValues: true
    })
  }

  var autoCompleteA11y = function() {
    var selectField = document.querySelector(selectorClass+'-select')
    selectField.remove()
  }

  return {
    init: init
  }
}

// Init JS Functions
SmLoaded.init()