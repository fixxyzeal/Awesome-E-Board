<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-overlay :value="loading">
        <v-progress-circular :size="90" :width="7" color="white" indeterminate></v-progress-circular>
      </v-overlay>
      <v-flex v-for="(item,key) in datalist" :key="key" lg3 sm6 xs12>
        <mini-statistic
          :icon="item.icon"
          :title="item.title"
          :sub-title="item.subtitle"
          :color="item.color"
        ></mini-statistic>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ChartCard from "../components/ChartCard.vue";
import MiniStatistic from "@/components/statistic/MiniStatistic";
import aqi from "../services/AqiService";
import weather from "../services/WeatherService";
import covid from "../services/CovidService";

export default {
  components: { ChartCard, MiniStatistic },
  data: () => ({
    loading: true

    // datalist: [
    //   {
    //     icon: "mdi-emoticon-outline",
    //     title: "0",
    //     subtitle: "BKK AQI",
    //     color: "green"
    //   },
    //   {
    //     icon: "mdi-emoticon-dead-outline",
    //     title: "0",
    //     subtitle: "CNX AQI",
    //     color: "deep-purple"
    //   },
    //   {
    //     icon: "mdi-weather-hazy",
    //     title: "0",
    //     subtitle: "C",
    //     color: "blue"
    //   },
    //   { icon: "mdi-chart-line", title: "0", subtitle: "SET", color: "teal" },
    //   { icon: "mdi-oil", title: "0", subtitle: "฿", color: "grey" },
    //   { icon: "mdi-gold", title: "0", subtitle: "฿", color: "amber" },
    //   {
    //     icon: "mdi-emoticon-devil-outline",
    //     title: "0",
    //     subtitle: "Covit",
    //     color: "red darken-4"
    //   },
    //   {
    //     icon: "mdi-twitter",
    //     title: "#ผนงรจตกม",
    //     subtitle: "#Trend",
    //     color: "cyan"
    //   }
    // ]
  }),
  async asyncData({ $axios, params }) {
    //get data from api
    let datalist = [];
    let bkkaqi = await $axios.get(
      "https://dbgateway.herokuapp.com/aqi/bangkok/bangkok"
    );

    datalist.push(
      aqi.SetAqiData(
        bkkaqi.data.data.current.pollution.aqius,
        bkkaqi.data.data.city
      )
    );
    datalist.push(
      weather.SetWeather(
        bkkaqi.data.data.current.weather.tp,
        bkkaqi.data.data.city
      )
    );

    let cnxaqi = await $axios.get(
      "https://dbgateway.herokuapp.com/aqi/Chiang Mai/Chiang Mai"
    );

    datalist.push(
      aqi.SetAqiData(
        cnxaqi.data.data.current.pollution.aqius,
        cnxaqi.data.data.city
      )
    );
    datalist.push(
      weather.SetWeather(
        cnxaqi.data.data.current.weather.tp,
        cnxaqi.data.data.city
      )
    );
    //get covid-19 thailand
    let covidData = await $axios.get(
      "http://lab.isaaclin.cn/nCoV/api/area?latest=1&provinceEng=Thailand"
    );
    datalist.push(
      covid.SetCovid(
        covidData.data.results[0].confirmedCount,
        covidData.data.results[0].countryEnglishName
      )
    );

    return { datalist: datalist, loading: false };
  }
};
</script>
