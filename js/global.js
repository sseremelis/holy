$(document).ready(function(){
    $('body').on("animationend MSAnimationEnd webkitAnimationEnd oAnimationEnd", function(){
       console.log('end');
    });
    setTimeout(function(){
        $('.loader').css({
            opacity: 0
        }).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
            $(this).hide()
        });
    },2000);

    /*close menu by clicking outside the sidebar*/
    $('html').click(function() {
        $('#burger-menu').removeClass('open');
        $('.sidebar').removeClass('open');
    });

    $('.menu').on('click',function(event){
        event.stopPropagation();
        $('#burger-menu').toggleClass('open');
        $('.sidebar').toggleClass('open');
    });

    $('.sidebar').on('click',function(event){
        event.stopPropagation();
    });
});