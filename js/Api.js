class Api {
  constructor(config) {
    this.config = config;
  }

  getWeatherByName = (cityName) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=${this.config.key}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  };

  getWeatherByID = (cityID) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityID}&APPID=${this.config.key}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  };

  getWeatherByCoord = ([lat, lon]) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${this.config.key}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  };

  getForecastByName = (cityName) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&APPID=${this.config.key}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  };

  getForecastByID = (cityID) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityID}&APPID=${this.config.key}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  };

  getForecastByCoord = ([lat, lon]) => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&APPID=${this.config.key}`
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => console.log(err));
  };
}
