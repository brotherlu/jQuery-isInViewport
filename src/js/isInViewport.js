(function($, window){

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

  $.fn.isInViewport = function(options,callback,exitCallback){

    // prevent any errors by defining a default value
    // not classy but does the job
    callback = callback || function(el){};
    exitCallback = exitCallback || function(el){};

    // default settings
    var settings = {
      className: 'isVisible',
      focusName: 'isFocus'
    };

    // Extend the settings with the inputted options
    $.extend(settings, options);
    
    //
    var maxPercent = 0;

    return this.each(function(){
      // Check for visible elements
      if(isInViewport(this).isVisible){
        
        // Add ClassName
        $(this).addClass(settings.className);

        // Check if the element is the most visible element
        if(isInViewport(this).percentageOfViewport > maxPercent){
          
          // Store the new max view percentage
          maxPercent = isInViewport(this).percentageOfViewport;
          // Clear old focus element
          $('.'+settings.focusName).removeClass(settings.focusName);
          // Add New focus element class
          $(this).addClass(settings.focusName);
        }
        // Execute the callback
        callback(this);

        // Cleanup all non visible elements
      } else if (!isInViewport(this).isVisible && $(this).hasClass(settings.className)){
        // Remove all classes from the elements
        $(this).removeClass(settings.className).removeClass(settings.focusName);
        // Execute the disappear callback
        exitCallback(this);
      }
    });

  };

}(jQuery, window));
