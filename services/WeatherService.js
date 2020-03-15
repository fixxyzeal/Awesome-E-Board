const SetWeather = (weather, city) => {
  return {
    icon: "mdi-weather-cloudy",
    title: weather.toString(),
    subtitle: city + " °C",
    color: "blue"
  };
};

export default { SetWeather };
