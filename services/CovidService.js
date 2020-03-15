const SetCovid = (covid, city) => {
  return {
    icon: "mdi-emoticon-devil-outline",
    title: covid.toString(),
    subtitle: city + " Covid-19 Count",
    color: "red darken-4"
  };
};

export default { SetCovid };
