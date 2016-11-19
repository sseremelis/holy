/**
 * code from https://codepen.io/patrickkahl/pen/DxmfG
 * jQuery function to prevent default anchor event and take the href * and the title to make a share popup
 *
 * @param  {[object]} e           [Mouse event]
 * @param  {[integer]} intWidth   [Popup width defalut 500]
 * @param  {[integer]} intHeight  [Popup height defalut 400]
 * @param  {[boolean]} blnResize  [Is popup resizeabel default true]
 */
$.fn.customerPopup = function (e, intWidth, intHeight, blnResize) {

    // Prevent default anchor event
    e.preventDefault();

    // Set values for window
    intWidth = intWidth || '500';
    intHeight = intHeight || '400';
    strResize = (blnResize ? 'yes' : 'no');

    // Set title and open popup with focus on it
    var strTitle = ((typeof this.attr('title') !== 'undefined') ? this.attr('title') : 'Social Share'),
        strParam = 'width=' + intWidth + ',height=' + intHeight + ',resizable=' + strResize,
        objWindow = window.open(this.attr('href'), strTitle, strParam).focus();
};

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

    $('.social-icons > a').on("click", function(e) {
        $(this).customerPopup(e);
    });

});