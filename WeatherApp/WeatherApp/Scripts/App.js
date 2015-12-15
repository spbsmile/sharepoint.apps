$(function () {

    $('.weather-temperature').openWeather({
        key: '20a2e62715e21640afbebd96e0a5972d',
        lang: 'ru',
        city: 'Toronto, ON',
        placeTarget: '.weather-place',
        units: 'f',
        descriptionTarget: '.weather-description',
        minTemperatureTarget: '.weather-min-temperature',
        maxTemperatureTarget: '.weather-max-temperature',
        windSpeedTarget: '.weather-wind-speed',
        humidityTarget: '.weather-humidity',
        sunriseTarget: '.weather-sunrise',
        sunsetTarget: '.weather-sunset',
        iconTarget: '.weather-icon',
        customIcons: '/img/icons/weather/',
        success: function () {
            $('.weather-temperature').show();
        },
        error: function (message) {
            console.log(message);
        }
    });

});