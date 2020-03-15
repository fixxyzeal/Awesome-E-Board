function SetColorAqi(aqi) {
  if (aqi < 50) {
    return "green";
  } else if (aqi < 100) {
    return "yellow darken-2";
  } else if (aqi < 200) {
    return "red darken-4";
  } else {
    return "mdi-emoticon-dead-outline";
  }
}
function SetIconAqi(aqi) {
  if (aqi < 50) {
    return "mdi-emoticon-excited-outline";
  } else if (aqi < 100) {
    return "mdi-emoticon-outline";
  } else if (aqi < 200) {
    return "mdi-emoticon-angry-outline";
  } else {
    return "deep-purple";
  }
}

const SetAqiData = (aqi, city) => {
  return {
    icon: SetIconAqi(aqi),
    title: aqi.toString(),
    subtitle: city + " AQI",
    color: SetColorAqi(aqi)
  };
};

export default { SetAqiData };
