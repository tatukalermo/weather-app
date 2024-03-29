const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || '';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const targetCity = process.env.TARGET_CITY || 'Helsinki,fi';

const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async (requestCity) => {
  const endpoint = `${mapURI}/weather?q=${requestCity ? requestCity : targetCity}&appid=${appId}&units=metric`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

const fetchWeatherByCoordinates = async (lon, lat) => {
  const endpoint = `${mapURI}/weather?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

const fetchForecastByCoordinates = async (lon, lat) => {
  const endpoint = `${mapURI}/forecast?lat=${lat}&lon=${lon}&appid=${appId}&units=metric`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

const fetchForecast = async (requestCity) => {
  const endpoint = `${mapURI}/forecast?q=${requestCity ? requestCity : targetCity}&appid=${appId}&cnt=3&units=metric`;
  const response = await fetch(endpoint);

  return response ? response.json() : {};
};

router.get('/api/weatherbycity', async ctx => {
  const { city } = ctx.request.query;
  const weatherData = await fetchWeather(city);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.weather ? weatherData : {};
});

router.get('/api/weatherbycoordinates', async ctx => {
  if (ctx.request.query.lon && ctx.request.query.lat) {
    const { lon, lat, } = ctx.request.query;
    const weatherData = await fetchWeatherByCoordinates(lon, lat);
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = weatherData.weather ? weatherData : {};
  }
});

router.get('/api/forecastbycoordinates', async ctx => {
  if (ctx.request.query.lon && ctx.request.query.lat) {
    const { lon, lat, } = ctx.request.query;
    const weatherData = await fetchForecastByCoordinates(lon, lat);
    ctx.type = 'application/json; charset=utf-8';
    ctx.body = weatherData.list
      ? {
        weather: weatherData.list[1].weather[0],
        time: weatherData.list[1].dt_txt,
        main: weatherData.list[1].main,
        weather_2: weatherData.list[2].weather[0],
        time_2: weatherData.list[2].dt_txt,
        main_2: weatherData.list[2].main,
        weather_3: weatherData.list[3].weather[0],
        time_3: weatherData.list[3].dt_txt,
        main_3: weatherData.list[3].main,
      }
      : {};
  }
});

router.get('/api/forecast', async ctx => {
  const { city } = ctx.request.query;
  const weatherData = await fetchForecast(city);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.list
    ? {
      weather: weatherData.list[1].weather[0],
      time: weatherData.list[1].dt_txt,
    }
    : {};
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
