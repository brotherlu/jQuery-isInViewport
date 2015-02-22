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

  $.fn.isInViewport = function(options){

    var settings = {
      visibleClass: "isVisible"
    };

    $.extend(settings, options);

    return this.each(function(){
      if(isInViewport(this)){
        $(this).addClass(settings.visibleClass);
      } else if (isInViewport(this) && $(this).hasClass(settings.visibleClass)){
        $(this).removeClass(settings.visibleClass);
      }
    });

  };

}(jQuery));
