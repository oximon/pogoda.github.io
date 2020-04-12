class Weather {
  create = ({ day, icon, temp }) => {
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

  add = (day, icon, temp) => {
    return document
      .querySelector(".main__forecast-for-week")
      .appendChild(this.create(day, icon, parseInt(temp)));
  };

  current = ({ name, country, date, temp, icon, wind }) => {
    document.querySelector("#city").textContent = `${name}, ${country}`;
    document.querySelector("#time").textContent = new Date(date * 1000)
      .toString()
      .slice(0, 15);
    document.querySelector("#current-day").textContent = `${
      parseInt(temp) - 273
    }°`;
    document
      .querySelector("#current-day-icon")
      .setAttribute(
        "style",
        `background-image: url('http://openweathermap.org/img/wn/${icon}@2x.png')`
      );
    document.querySelector("#day-of-week").textContent = new Date(date * 1000)
      .toString()
      .slice(0, 3);
    document.querySelector("#wind-speed").textContent = `${wind} mph`;
  };
}
