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

apiKey = '4fe074c5bc82d2e1fdaad4458bc598e7';
weekday = new Array(7);
weekday[0]=  "SUN";
weekday[1] = "MON";
weekday[2] = "TUE";
weekday[3] = "WED";
weekday[4] = "THU";
weekday[5] = "FRI";
weekday[6] = "SAT";
formattedAddress = '';

function hideLoader(){
    $('.loader').css({
        opacity: 0
    }).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
        $(this).addClass('hidden');
    });
}

function showLoader(){
    $('.loader').removeClass('hidden').css('opacity','1');
}

$(document).ready(function(){
    $('body').on("animationend MSAnimationEnd webkitAnimationEnd oAnimationEnd", function(){
       console.log('end');
    });

    $('#cityNameInput').geocomplete({
        details: '.main-form'
    }).bind("geocode:result", function(event, result){
        formattedAddress = result.address_components[0].long_name +','+result.address_components[result.address_components.length-1].short_name;
        console.log(formattedAddress);
    }).bind("geocode:error",function(){
        console.log('Error with autocomplete');
    });

//    $("#cityNameInput").keypress(function (e) {
//        var key = e.which;
//        if(key == 13){  // the enter key code
//            console.log('hello');
//            $('#cityNameSubmit').click();
//            return false;
//        }
//    });
//    setTimeout(function(){
//        $('.loader').css({
//            opacity: 0
//        }).bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(){
//            $(this).hide()
//        });
//    },2000);

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

    function weatherAjax(url){
        $.ajax({
            url: url
        }).done(function(result){
            var dayForecasts = result.list;
            var day = new Date();
            //change city and country
            $('.forecast .city-info > .city-name').text(result.city.name);
            $('.forecast .city-info > .country-code').text(result.city.country);
            $.each(dayForecasts,function(index, dayForecast){
                //change weather icons
                var weatherCondition = dayForecast.weather[0].id.toString();
                if(weatherCondition.startsWith('2')){
                    $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons','O');
                }
                else if(weatherCondition.startsWith('3')){
                    $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons','Q');
                }
                else if(weatherCondition.startsWith('5')){
                    $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons','R');
                }
                else if(weatherCondition.startsWith('6')){
                    $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons','W');
                }
                else if(weatherCondition.startsWith('7')){
                    $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons','M');
                }
                else if(weatherCondition.startsWith('8')){
                    if(weatherCondition === '800'){
                        //day or night
                        if(dayForecast.weather[0].icon.endsWith('d')){
                            $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons','B');
                        }
                        else{
                            $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons','C');
                        }

                    }
                    else{
                        $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons','Y');
                    }
                }
                else{
                    $('.day-forecast').eq(index).find('.weather-icon').attr('meteocons','(');
                }
                if(index != 0){
                    //change day labels
                    //check if one of the next days is over sunday
                    if(day.getDay()+index < 7){
                        $('.day-forecast').eq(index).find('.day-label').text(weekday[day.getDay()+index]);
                    }
                    else{
                        $('.day-forecast').eq(index).find('.day-label').text(weekday[(day.getDay()+index)-7]);
                    }
                }
                //change temperatures
                $('.day-forecast').eq(index).find('.temp > .highest > .temp-text').text(parseInt(dayForecast.temp.max));
                $('.day-forecast').eq(index).find('.temp > .lowest > .temp-text').text(parseInt(dayForecast.temp.min));
            });
            $('.forecast').removeClass('hidden');
        }).fail(function(){
            $('.error').removeClass('hidden');
        }).always(function(){
            setTimeout(function(){
                hideLoader();
            },2000);
        });
    }

    function showGeolocationError(error) {
        e.preventDefault();
        $('input').blur();
        showLoader();
        switch(error.code) {
            case error.PERMISSION_DENIED:
                x.innerHTML = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                x.innerHTML = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                x.innerHTML = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                x.innerHTML = "An unknown error occurred."
                break;
        }
    }
    $('#locationSubmit').on('click',function(e){
        showLoader();
        if (navigator.geolocation) {

            navigator.geolocation.getCurrentPosition(function(location){
                console.log('all well');
                console.log(location.coords.latitude);
                console.log(location.coords.longitude);
                    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat='+parseFloat(location.coords.latitude)+
                        '&lon='+parseFloat(location.coords.longitude)+'&mode=json&units=metric&cnt=6&appid='+apiKey;
                    console.log(url);
                    weatherAjax(url);
            },function(){
                    showGeolocationError();
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            $('.error > .text').text('Geolocation is not supported by this browser, please try Firefox');
            hideLoader();
        }
    });

    $('#cityNameSubmit').on('click', function(e){
        $('input').blur();
        showLoader();
        e.preventDefault();
        if (formattedAddress ==''){
            formattedAddress = $('#cityNameInput').val();
        }
        var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?q='+formattedAddress+
            '&mode=json&units=metric&cnt=6&appid='+apiKey;
        console.log(url);
        weatherAjax(url);

    });

});

$(window).on('load',function(){
//    hideLoader();
});