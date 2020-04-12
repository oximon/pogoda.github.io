class Weather {
  constructor(container, city, time, currentDay, icon, dayOfWeek, wind) {
    this.container = container;
    this.city = city;
    this.time = time;
    this.currentDay = currentDay;
    this.icon = icon;
    this.dayOfWeek = dayOfWeek;
    this.wind = wind;
  }
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
    return this.container.appendChild(this.create(day, icon, parseInt(temp)));
  };

  current = ({ name, country, date, temp, icon, wind }) => {
    this.city.textContent = `${name}, ${country}`;
    this.time.textContent = new Date(date * 1000).toString().slice(0, 15);
    this.currentDay.textContent = `${parseInt(temp) - 273}°`;
    this.icon.setAttribute(
      "style",
      `background-image: url('http://openweathermap.org/img/wn/${icon}@2x.png')`
    );
    this.dayOfWeek.textContent = new Date(date * 1000).toString().slice(0, 3);
    this.wind.textContent = `${wind} mph`;
  };
}
