<template>
  <div>
    <SectionTitle :sectionSubtitle="subtitle" />

    <!-- SEARCH BAR -->
    <v-container>
      <v-row no-gutters>
        <v-col></v-col>
        <v-col cols="12">
          <form @submit.prevent="searchMovie(input)">
            <div class="input-container">
              <v-text-field
                v-model="input"
                outlined
                placeholder="Search"
                append-outer-icon="mdi-magnify"
                dark
                full-width
              ></v-text-field>
            </div>
          </form>
        </v-col>
        <v-col></v-col>
      </v-row>
    </v-container>


    <!-- RESULTS -->
    <v-divider></v-divider>
    <v-container v-if="searchedMovies.length > 0">
      <v-btn id="show-where-btn" dark :color="wheretowatch ? 'red' : 'green'" @click="wheretowatch = !wheretowatch">{{wheretowatch ? "Hide info" : "Show where to watch"}}</v-btn>
    </v-container>
    <v-container fluid>
      
      <v-row v-for="(item, i) in searchedMovies" :key="i" class="pb-10 mt-10">
       
          <v-col lg="3" md="4">
            <v-img
              :src="item.poster_path != null ? url + item.poster_path : no_image"
              id="movie-img"
              class="rounded"
            ></v-img>
          </v-col>
          <v-col lg="4" md="8">
            <h1 class="movie-title">{{ item.title }}</h1>
            <small :class="item.release_date !== undefined ? 'blue--text' : 'red--text'">
              {{
                item.release_date !== undefined
                  ? item.release_date
                  : "Release date no availble"
              }}</small
            >
            
            <v-expand-transition>
            <v-row no-gutters class="mt-2" v-if="wheretowatch">
              <v-col lg="4">
              <h3 class="text-center red--text">Buy</h3>
              <li style="list-style: none;" v-for="(buy_provider, z) in item.providers_buy" :key="z" class="text-center">
                <v-divider></v-divider>
                <p>{{buy_provider === undefined || buy_provider === null ? "No data" : buy_provider.provider_name}}</p>
               
                <img :src="buy_provider === undefined || buy_provider === null ? false : url + buy_provider.logo_path" class="provider-logo">
              </li>
              </v-col>
              <v-col lg="4">
                <h3 class="text-center orange--text">Flatrate</h3>
              <li style="list-style: none;" v-for="(flatrate_provider, z) in item.providers_flatrate" :key="z" class="text-center">
                <v-divider></v-divider>
                <p>{{flatrate_provider === undefined || flatrate_provider === null ? "No data" : flatrate_provider.provider_name}}</p>
                <img :src="flatrate_provider === undefined || flatrate_provider === null ? false : url + flatrate_provider.logo_path" class="provider-logo">
              </li>
              </v-col>
              <v-col lg="4">
                <h3 class="text-center green--text">Rent</h3>
              <li style="list-style: none;" v-for="(rent_provider, z) in item.providers_rent" :key="z" class="text-center">
                <v-divider></v-divider>
                <p>{{rent_provider === undefined || rent_provider === null ? "No data" : rent_provider.provider_name}}</p>
                <img :src="rent_provider === undefined || rent_provider === null ? false : url + rent_provider.logo_path" class="provider-logo">
              </li>
              </v-col>
          
            </v-row>
               </v-expand-transition>
          </v-col>
      </v-row>



    </v-container>
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import axios from "axios";

export default {
  components: {
    SectionTitle,
  },
  data() {
    return {
      subtitle: "Search movies",
      input: "",
      url: "https://image.tmdb.org/t/p/original",
      no_image: require("../assets/img/no-image.jpg"),
      no_overview: "We are sorry. This movie has not available overview.",
      searchedMovies: [],
      wheretowatch: false,
    };
  },
  methods: {
    searchMovie(input) {
      const apikey = "c9a3e87b703c630c13d5ea61ef62c7b6";
      const url = "https://api.themoviedb.org/3";
      const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${input}`;

      axios
        .get(movieURL)
        .then((res) => {
          this.searchedMovies = res.data.results;
        })
        .catch((e) => {
          console.log(e);
        });

      axios
        .get(movieURL)
        .then((res) => {
          // GET WATCH PROVIDERS (NETFLIX, GOOGLE PLAY, HBO, ETC)

          const data = res.data.results;

          for (let i = 0; i < 20; i++) {
            const movie_list = data[i];

            const id = movie_list.id;

            const providers = `https://api.themoviedb.org/3/movie/${id}/watch/providers?api_key=${apikey}`;

      axios
      .get(providers)
      .then((res) => {

        const ES_buy_providers = res.data.results.ES.buy;

        const providers_buy_array = [];

        for(let z = 0; z < ES_buy_providers.length; z++) {
          const buy = ES_buy_providers[z]
          if(buy !== undefined || buy !== null) {
            providers_buy_array.push(buy)
          }else{
            console.log(buy + " has not providers")
          }
        }

        const ES_flatrate_providers = res.data.results.ES.flatrate;

        const providers_flatrate_array = [];

        for(let y = 0; y < ES_flatrate_providers.length; y++) {
          const flatrate = ES_flatrate_providers[y]
          if(flatrate !== undefined || flatrate !== null) {
            providers_flatrate_array.push(flatrate)
          }else{
            console.log(flatrate + " has not providers")
          }
        }

        const ES_rent_providers = res.data.results.ES.rent;

        const providers_rent_array = [];

        for(let y = 0; y < ES_flatrate_providers.length; y++) {
          const rent = ES_rent_providers[y]
          if(rent !== undefined || rent !== null) {
            providers_rent_array.push(rent)
          }else{
            console.log(rent + " has not providers")
          }
        }

        this.searchedMovies[i].providers_buy = providers_buy_array;
        this.searchedMovies[i].providers_flatrate = providers_flatrate_array;
        this.searchedMovies[i].providers_rent = providers_rent_array;

            })
            .catch((e) => {
              console.log(e)
            })

          }
       
        console.log(this.searchedMovies)

        this.input = "";

        this.wheretowatch = false;

        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";




// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  #show-where-btn {
  position: relative;
  top: auto;
  right: auto;
  width: 100%;
  border-radius: 30px 30px 30px 30px;
  padding: 20px;

}
p {
  font-size: 14px;
}

.provider-logo {
  border-radius: 10px;
  max-width: 40px;
}

.input-container {
  margin-top: 10px;
}


.movie-title {
  font-size: 30px;
  text-align: center;
}

#movie-img {
  width: 90%;
  margin: 0 auto;
}

}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  #show-where-btn {
  position: fixed;
  top: 80;
  right: 0px;
  width: auto;
  border-radius: 30px 0px 0px 30px;
  padding: 20px;

}

p {
  font-size: 14px;
}

.provider-logo {
  border-radius: 10px;
  max-width: 40px;
}

.input-container {
  margin-top: 10px;
}


.movie-title {
  font-size: 30px;
  text-align: left;
}

#movie-img {
  width: 100%;
  margin: 0 auto;
}

}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  #show-where-btn {
  position: fixed;
  top: 80;
  right: 0px;
  width: auto;
  border-radius: 30px 0px 0px 30px;
  padding: 20px;

}

p {
  font-size: 14px;
}

.provider-logo {
  border-radius: 10px;
  max-width: 40px;
}

.input-container {
  margin-top: 10px;
}


.movie-title {
  font-size: 30px;
  text-align: left;
}

}


</style>
