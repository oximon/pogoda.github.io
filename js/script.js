const api = new Api(config);
const weather = new Weather();
if (navigator.geolocation) {
  let startPos;
  let geoOptions = {
    timeout: 10 * 1000,
  };

  let geoSuccess = function (position) {
    startPos = position;
    api
      .getWeatherByCoord([startPos.coords.latitude, startPos.coords.longitude])
      .then((res) => {
        weather.current({
          name: res.name,
          country: res.sys.country,
          date: res.dt,
          temp: res.main.temp,
          icon: res.weather[0].icon,
          wind: res.wind.speed,
        });
        api
          .getForecastByCoord([
            startPos.coords.latitude,
            startPos.coords.longitude,
          ])
          .then((res) => {
            for (point of res.list) {
              if (point.dt_txt.match(/00:00:00/)) {
                weather.add({
                  day: point.dt,
                  icon: point.weather[0].icon,
                  temp: point.main.temp,
                });
              }
            }
          });
      });
  };

  let geoError = function (error) {
    console.log("Error occurred. Error code: " + error.code);
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
} else {
  console.log("Geolocation is not supported for this Browser/OS version yet.");
}

document.addEventListener(
  "blur",
  (event) => {
    if (event.target.classList.contains("main__search-input")) {
      api
        .getWeatherByName(document.querySelector("#input").value)
        .then((res) => {
          const list = [...document.querySelectorAll(".main__days-of-week")];
          list.forEach((el) => {
            el.remove();
          });
          weather.current({
            name: res.name,
            country: res.sys.country,
            date: res.dt,
            temp: res.main.temp,
            icon: res.weather[0].icon,
            wind: res.wind.speed,
          });
          api
            .getForecastByName(document.querySelector("#input").value)
            .then((res) => {
              for (point of res.list) {
                if (point.dt_txt.match(/00:00:00/)) {
                  weather.add({
                    day: point.dt,
                    icon: point.weather[0].icon,
                    temp: point.main.temp,
                  });
                }
              }
            });
        });
    }
  },
  true
);
