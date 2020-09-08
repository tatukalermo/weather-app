# Weather App

Weather app done with React. Allows the user to get the weather of their location and a forecast for few hours ahead.

Utilises [OpenWeatherMap API](https://openweathermap.org/) for weather data. For icons uses [OpenWeatherMap Icons](https://openweathermap.org/weather-conditions) and [Flaticon icons](https://www.flaticon.com/).

### Install

- Clone this repo `git clone https://github.com/TatuKalermo/weather-app.git` or `git clone git@github.com:TatuKalermo/weather-app.git`
- Have [Docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed on your machine
- Go and get API key from [openweathermap.org](https://openweathermap.org/)
- Open docker-compose.yml file and replace APPID variable value with your API key
- Run `docker-compose up -d`
- Application is now running in [http://localhost:8000/](http://localhost:8000/)

#### Useful commands for Docker

- `docker-compose up --force-recreate --build -d` for recreating your image if you make changes
- `docker image prune -f` gets rid of the old images

### Tests

- For unit tests run `npm run test:unit` or `npm run test:unit:watch` if you want to test changes all the time

### Support

Reach out to me if you have any questions!

- Email [`tatukalermo@gmail.com`](tatukalermo@gmail.com)
- Linkedin [`tatu-kalermo`](https://www.linkedin.com/in/tatu-kalermo-07079912a/)
