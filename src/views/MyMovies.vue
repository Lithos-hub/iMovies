<template>
    <div>
<SectionTitle :sectionName="name" />

<!-- SUPERIOR TABS MENU -->

<v-tabs class="bar-tabs" centered background-color="transparent">
      <v-tabs-slider color="error"></v-tabs-slider>
    <v-tab active-class="cyan--text" class="cyan--text tab" v-on:click="category = 'summary'" @click="getSummary()">Summary</v-tab>
    <v-tab active-class="error--text" class="white--text tab" v-on:click="category = 'towatch'" @click="getToWatchMovies()">To watch</v-tab>
    <v-tab active-class="error--text" class="white--text tab" v-on:click="category = 'favorite'" @click="getFavoriteMovies()">Favorite</v-tab>
    <v-tab active-class="error--text" class="white--text tab" v-on:click="category = 'watched'" @click="getWatchedMovies()">Watched</v-tab>
    <v-tab active-class="error--text" class="white--text tab" v-on:click="category = 'byrate'" @click="getRatedMovies()">By rate</v-tab>
</v-tabs>

<!-- SUMMARY AND DATA -->

<v-row class="mt-5" v-if="category === 'summary'">
    <v-container>
        <v-row no-gutters class="data-list">
            <v-col class="ma-auto">
                <div>
                Movies I want to watch:
                </div>
            </v-col>
            <v-col>
                <div class="data-list-number">{{toWatchMovies.length}}</div>
            </v-col>
        </v-row>
        <v-row no-gutters class="data-list">
            <v-col class="ma-auto">
                <div>
                Favourite movies:
                </div>
            </v-col>
            <v-col>
                <div class="data-list-number">{{favoriteMovies.length}}</div>
            </v-col>
        </v-row>
        <v-row no-gutters class="data-list">
            <v-col class="ma-auto">
                <div>
                Watched movies:
                </div>
            </v-col>
            <v-col>
                <div class="data-list-number">{{watchedMovies.length}}</div>
            </v-col>
        </v-row>
        <v-row no-gutters class="data-list">
            <v-col class="ma-auto">
                <div>
                Rated movies: 
                </div>
            </v-col>
            <v-col>
                <div class="data-list-number">{{ratedMovies.length}}</div>
            </v-col>
        </v-row>
    </v-container>
</v-row>


<MyMoviesCategory v-if="category === 'watched'" :arrayMovies="watchedMovies" :category="watched"/>
<MyMoviesCategory v-if="category === 'towatch'" :arrayMovies="toWatchMovies" :category="towatch"/>
<MyMoviesCategory v-if="category === 'favorite'" :arrayMovies="favoriteMovies" :category="favorite" />
<MyMoviesCategory v-if="category === 'byrate'" :arrayMovies="ratedMovies" :category="byrate"/>




    </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import MyMoviesCategory from "../components/MyMoviesCategory";

export default {
    name: "MyMovies",
    components: {
        SectionTitle,
        MyMoviesCategory
    },
    data() {
        return {
            name: "My movies",
            category: "summary",
            toWatchMovies: [],
            favoriteMovies: [],
            watchedMovies: [],
            ratedMovies: [],
            watched: 'watched',
            towatch: 'towatch',
            favorite: 'favorite',
            byrate: 'byrate',
        }
    },
    methods: {
        getToWatchMovies() {
        if (localStorage.getItem("storageToWatchMovies")) {
        this.toWatchMovies = JSON.parse(localStorage.getItem("storageToWatchMovies"));
            }
        },
        getWatchedMovies() {
        if (localStorage.getItem("storageWatchedMovies")) {
        this.watchedMovies = JSON.parse(localStorage.getItem("storageWatchedMovies"));
            }
        },
        getFavoriteMovies() {
        if (localStorage.getItem("storageFavoriteMovies")) {
        this.favoriteMovies = JSON.parse(localStorage.getItem("storageFavoriteMovies"));
            }
        },
        getRatedMovies() {
        if (localStorage.getItem("storageRatedMovies")) {
        this.ratedMovies = JSON.parse(localStorage.getItem("storageRatedMovies"));
            }
        },
        getRates() {

        }
    },
    created() {
        this.getWatchedMovies();
        this.getFavoriteMovies();
        this.getToWatchMovies();
        this.getRatedMovies();
    }
}
</script>

<style lang="scss" scoped>
@import 'src/scss/variables';

.data-list {
    font-size: 20px;
    background: $dark;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 2px solid $secondary;
}

.data-list-number {
    font-size: 5em;
    color: $primary;
    text-align: right;
}

</style>