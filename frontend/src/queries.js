// ENVIRONMENT VARIABLES

const baseURL = process.env.ENDPOINT || "http://localhost:9000/api";

// QUERY FUNCTIONS

export const getWeatherFromApi = async (lat, lon) => {
  try {
    const response = await fetch(
      `${baseURL}/weatherbycoordinates?lat=${lat}&lon=${lon}`
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};

export const getForecastFromApi = async (lat, lon) => {
  try {
    const response = await fetch(
      `${baseURL}/forecastbycoordinates?lat=${lat}&lon=${lon}&count=10`
    );
    return response.json();
  } catch (error) {
    console.error(error);
  }

  return {};
};
