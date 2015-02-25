(function($){

  function isInViewport(elem){
    var elemTop = $(elem).offset().top,
        elemBottom = elemTop + $(elem).height(),
        viewportTop = $(window).scrollTop(),
        viewportBottom = viewportTop + $(window).height();

   /* console.table ({
      element: this.className,
      elemTop: elemTop,
      elemBottom: elemBottom,
      viewportTop: viewportTop,
      viewportBottom: viewportBottom,
      isVisible: elemTop <= viewportBottom && elemBottom >= viewportTop
    });*/

    return (elemTop <= viewportBottom && elemBottom >= viewportTop);
  }

  $.fn.isInViewport = function(options,callback,exitCallback){

    callback = callback || function(el){};
    exitCallback = exitCallback || function(el){};

    var settings = {
      className: 'isVisible'
    };

    $.extend(settings, options);

    return this.each(function(){
      if(isInViewport(this) && !(this).hasClass(settings.className)){
        $(this).addClass(settings.className);
        callback(this);
      } else if (!isInViewport(this) && $(this).hasClass(settings.className)){
        $(this).removeClass(settings.className);
        exitCallback(this);
      }
    });

  };

}(jQuery));
