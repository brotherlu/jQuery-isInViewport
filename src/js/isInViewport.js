(function($, window){
  'user strict';

  function isInViewport(elem){
    var elemTop = $(elem).offset().top,
        elemBottom = elemTop + $(elem).height(),
        viewportTop = $(window).scrollTop(),
        viewportBottom = viewportTop + $(window).height(),
        topDistance = ((viewportBottom - elemTop) >= 0) ? viewportBottom - elemTop : 0,
        bottomDistance = ((elemBottom - viewportTop) >= 0) ? elemBottom - viewportTop : 0,
        percentageOfViewport = (Math.min($(elem).height(),topDistance, bottomDistance ))/$(window).height(),
        percentageOfElement = (Math.min($(elem).height(),topDistance, bottomDistance ))/$(elem).height();

    return {
      isVisible: (elemTop < viewportBottom && elemBottom >= viewportTop),
      percentageOfViewport: percentageOfViewport,
      percentageOfElement: percentageOfElement
    };
  }

  $.fn.isInViewport = function(options){

    // default settings
    var settings = {
      className: 'isVisible',
      isVisibleEnterCallback: function(){},
      isVisibleExitCallback: function(){},
      focusName: 'isFocus',
      isFocusEnterCallback: function(){},
      isFocusExitCallback: function(){}
    };

    // Extend the settings with the inputted options
    $.extend(settings, options);
    
    // Holding maximum percentage
    var maxPercent = {
      percentage: 0,
      element: null
    };

    return this.each(function(){

      var viewData = isInViewport(this);

      // Check for visible elements
      if(viewData.isVisible){
        
        if(!$(this).hasClass(settings.className)){
          // Add ClassName
          $(this).addClass(settings.className);

          // Execute the enter visible callback
          settings.isVisibleEnterCallback.call(this);
        }

        // Check if the element is the most visible element
        if(viewData.percentageOfViewport > maxPercent.percentage ){
          
          // Store the new max view percentage
          maxPercent.percentage = viewData.percentageOfViewport;
          maxPercent.element = this;
        }

        // Cleanup all non visible elements
      } else if (!viewData.isVisible && $(this).hasClass(settings.className)){
        // Remove all classes from the elements
        $(this).removeClass(settings.className).removeClass(settings.focusName);
        // Execute the disappear callback
        settings.isVisibleExitCallback.call(this);
      }
      // Once each is completed start the defered function
    }).promise().done(function(){
      
      var e = $('.'+settings.focusName)[0];

      if (e !== maxPercent.element) {
        if (e !== undefined){
          settings.isFocusExitCallback.call(e);

          // remove the old focus element
          $(e).removeClass(settings.focusName);
        }

        // add the focus class to the current element
        $(maxPercent.element).addClass(settings.focusName);
        // run the enter callback on the new element
        settings.isFocusEnterCallback.call(maxPercent.element);
      }
    });

  };

}(jQuery, window));
