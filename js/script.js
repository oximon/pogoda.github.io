const api = new Api(config);

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
        document.querySelector(
          "#city"
        ).textContent = `${res.name}, ${res.sys.country}`;
        document.querySelector("#time").textContent = new Date(res.dt * 1000)
          .toString()
          .slice(0, 15);
        document.querySelector("#current-day").textContent = `${
          parseInt(res.main.temp) - 273
        }°`;
        document
          .querySelector("#current-day-icon")
          .setAttribute(
            "style",
            `background-image: url('http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png')`
          );
        document.querySelector("#day-of-week").textContent = new Date(
          res.dt * 1000
        )
          .toString()
          .slice(0, 3);
        document.querySelector(
          "#wind-speed"
        ).textContent = `${res.wind.speed} mph`;
        api
          .getForecastByCoord([
            startPos.coords.latitude,
            startPos.coords.longitude,
          ])
          .then((res) => {
            for (point of res.list) {
              if (point.dt_txt.match(/00:00:00/)) {
                add({
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

create = (day, icon, temp) => {
  const fragment = document.createDocumentFragment();
  const daysOfWeek = document.createElement("div");
  const dayOfWeek = document.createElement("p");
  const iconWeather = document.createElement("div");
  const dayTemperature = document.createElement("p");

  daysOfWeek.classList.add("main__days-of-week");
  dayOfWeek.classList.add("main__day-of-week");
  iconWeather.classList.add("main__icon-weather", "main__icon-weather_sm");
  dayTemperature.classList.add("main__day-temperature");

  fragment.appendChild(daysOfWeek);
  daysOfWeek.appendChild(dayOfWeek);
  daysOfWeek.appendChild(iconWeather);
  daysOfWeek.appendChild(dayTemperature);

  dayOfWeek.textContent = new Date(day * 1000).toString().slice(0, 3);
  iconWeather.setAttribute(
    "style",
    `background-image: url('http://openweathermap.org/img/wn/${icon}@2x.png')`
  );
  dayTemperature.textContent = `${parseInt(temp) - 273}°`;

  return fragment;
};

const add = ({ day, icon, temp }) => {
  return document
    .querySelector(".main__forecast-for-week")
    .appendChild(create(day, icon, parseInt(temp)));
};

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
          document.querySelector(
            "#city"
          ).textContent = `${res.name}, ${res.sys.country}`;
          document.querySelector("#time").textContent = new Date(res.dt * 1000)
            .toString()
            .slice(0, 15);
          document.querySelector("#current-day").textContent = `${
            parseInt(res.main.temp) - 273
          }°`;
          document
            .querySelector("#current-day-icon")
            .setAttribute(
              "style",
              `background-image: url('http://openweathermap.org/img/wn/${res.weather[0].icon}@2x.png')`
            );
          document.querySelector("#day-of-week").textContent = new Date(
            res.dt * 1000
          )
            .toString()
            .slice(0, 3);
          document.querySelector(
            "#wind-speed"
          ).textContent = `${res.wind.speed} mph`;
        });
      api
        .getForecastByName(document.querySelector("#input").value)
        .then((res) => {
          for (point of res.list) {
            if (point.dt_txt.match(/00:00:00/)) {
              add({
                day: point.dt,
                icon: point.weather[0].icon,
                temp: point.main.temp,
              });
            }
          }
        });
    }
  },
  true
);
