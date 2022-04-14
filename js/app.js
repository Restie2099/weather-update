const apiKey = 'c0467d485fcb1d18d5e9dae63da98950';

// https://openweathermap.org/current
const openweathermapRoute = `https://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&appid=${apiKey}`;

function updateLocation(location) {
  $('#location').text(`${location.cityName}, ${location.countryCode}`);
  $('#coordinates').text(`(${location.latitude}, ${location.longitude})`);
}

function updateWeatherConditions(weather) {
  $('#temperature').text(weather.temp);
  $('#weather').text(`${weather.main} (${weather.desc})`);
  $('#feels-like').text(weather.tempFeelsLike);

  $('#icon').attr(
    'src',
    // https://openweathermap.org/weather-conditions
    `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
  );
}

function updateExtraWeatherConditions(weather) {
  $('#cloudiness').text(weather.cloudiness);
  $('#humidity').text(weather.humidity);
  $('#pressure').text(weather.pressure);
  $('#visibility').text(weather.visibility);
  $('#wind').text(weather.wind);
}

function updateWeather(data) {
  let location = {
    cityName: data.name,
    countryCode: data.sys.country,
    latitude: data.coord.lat,
    longitude: data.coord.lon,
  };

  let weather = {
    icon: data.weather[0].icon,
    main: data.weather[0].main,
    desc: data.weather[0].description,
    temp: data.main.temp,
    tempFeelsLike: data.main.feels_like,
  };

  let weatherExtra = {
    cloudiness: data.clouds.all,
    humidity: data.main.humidity,
    pressure: data.main.pressure,
    visibility: data.visibility / 1000,
    wind: data.wind.speed,
  };

  updateLocation(location);
  updateWeatherConditions(weather);
  updateExtraWeatherConditions(weatherExtra);
}

// ON LOAD
function getWeather() {
  $.get(openweathermapRoute, updateWeather).fail(function () {
    $('#location').text('Unable to load weather data');
  });
}
