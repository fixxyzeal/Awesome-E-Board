<template>
  <v-container grid-list-xl fluid>
    <v-layout row wrap>
      <v-flex v-for="(item,key) in datalist" :key="key" lg3 sm6 xs12>
        <v-skeleton-loader
          ref="skeleton"
          :loading="loading"
          :transition="transition"
          :type="type"
          :tile="tile"
          class="mx-auto"
        >
          <mini-statistic
            :icon="item.icon"
            :title="item.title"
            :sub-title="item.subtitle"
            :color="item.color"
          ></mini-statistic>
        </v-skeleton-loader>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ChartCard from "../components/ChartCard.vue";
import MiniStatistic from "@/components/statistic/MiniStatistic";

export default {
  components: { ChartCard, MiniStatistic },
  data: () => ({
    loading: true,
    tile: true,
    type: "list-item-avatar-two-line",
    transition: "scale-transition"
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
    let bangkokaqi = await $axios.get(
      "https://dbgateway.herokuapp.com/aqi/bangkok/bangkok"
    );

    datalist.push({
      icon: SetIconAqi(bangkokaqi.data.data.current.pollution.aqius),
      title: bangkokaqi.data.data.current.pollution.aqius,
      subtitle: bangkokaqi.data.data.city + " AQI",
      color: SetColorAqi(bangkokaqi.data.data.current.pollution.aqius)
    });

    let cnxaqi = await $axios.get(
      "https://dbgateway.herokuapp.com/aqi/Chiang Mai/Chiang Mai"
    );

    datalist.push({
      icon: SetIconAqi(cnxaqi.data.data.current.pollution.aqius),
      title: cnxaqi.data.data.current.pollution.aqius,
      subtitle: cnxaqi.data.data.city + " AQI",
      color: SetColorAqi(cnxaqi.data.data.current.pollution.aqius)
    });

    datalist.push({
      icon: "mdi-weather-hazy",
      title: bangkokaqi.data.data.current.weather.tp,
      subtitle: bangkokaqi.data.data.city + " °C",
      color: "blue"
    });

    return { datalist: datalist, loading: false };
  }
};

function SetColorAqi(aqi) {
  if (aqi < 50) {
    return "green";
  } else if (aqi < 100) {
    return "yellow darken-2";
  } else if (aqi < 300) {
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
  } else if (aqi < 300) {
    return "mdi-emoticon-angry-outline";
  } else {
    return "deep-purple";
  }
}
</script>
