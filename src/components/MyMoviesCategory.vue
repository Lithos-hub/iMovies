<template>
      <v-container fluid>
        <v-row class="mt-5">
            <v-col></v-col>
            <v-col>
            <v-card color="error" class="white--text pa-2 m-5 empty-error-message" v-if="arrayMovies.length === 0">There are no movies in this category yet.</v-card>
            </v-col>
            <v-col></v-col>
            <v-row>
            <v-col cols="4" v-for="(item, i) in arrayMovies" :key="'A' + i">
                <div
                    class="movie-card indigo darken-4 white--text"
                >
                <v-row no-gutters>
                    <v-col cols="6">
                    <v-list-item three-line>
                    <v-list-item-content>
                        <p class="headline white--text text-center movie-title">
                        {{item.title}}
                        </p>
                        <p class="overline white--text text-center rounded movie-date mb-10">
                        {{item.release_date.slice(0,4)}}
                        </p>
                        <v-divider class="white"></v-divider>
                        <div v-if="category === 'byrate'">
                        <v-list-item-subtitle class="white--text mt-10 text-center">My rate: <span class="rate-number mt-10">{{rate}} (soon)</span></v-list-item-subtitle>
                        </div>
                    </v-list-item-content>
                    </v-list-item>
                    <div class="card-buttons">
                    <v-card-actions>
                    <v-btn
                        rounded
                        color="info"
                        elevation="5"
                        class="white--text mx-auto"
                    >   
                        <v-icon>mdi-information</v-icon>
                    </v-btn>
                    <v-btn
                        rounded
                        color="red"
                        elevation="5"
                        class="white--text mx-auto"
                        @click="removeMovie(item)"
                    >   
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    </v-card-actions>
                    </div>
                    </v-col>
                    <v-col cols="6">
                    <v-img :src="url + item.poster_path" class="movie-img"></v-img>
                    </v-col>
                    </v-row>
                    </div>
                </v-col>
                </v-row>
            </v-row>
    </v-container>
</template>

<script>
export default {
    props: ["arrayMovies", "category", "rate"],
    data() {
        return {
            url: "https://image.tmdb.org/t/p/original",
            rate: '',

        }
    },
    methods: {
        removeMovie(item) {
            if(this.category === 'watched') {
                const index = this.arrayMovies.indexOf(item);
            if (index > -1) {
                this.arrayMovies.splice(index, 1);
            }
            localStorage.setItem("storageWatchedMovies", JSON.stringify(this.arrayMovies));
            };
            if(this.category === 'towatch') {
                const index = this.arrayMovies.indexOf(item);
            if (index > -1) {
                this.arrayMovies.splice(index, 1);
            }
            localStorage.setItem("storageToWatchMovies", JSON.stringify(this.arrayMovies));
            };
            if(this.category === 'favorite') {
                const index = this.arrayMovies.indexOf(item);
            if (index > -1) {
                this.arrayMovies.splice(index, 1);
            }
            localStorage.setItem("storageFavoriteMovies", JSON.stringify(this.arrayMovies));
            };
            if(this.category === 'byrate') {
                const index = this.arrayMovies.indexOf(item);
            if (index > -1) {
                this.arrayMovies.splice(index, 1);
            }
            localStorage.setItem("storageRatedMovies", JSON.stringify(this.arrayMovies));
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/scss/variables';

.movie-card {
    width: auto;
    height: auto;
    background: linear-gradient(to right, rgb(35, 35, 107), rgb(0, 89, 255));
    margin-bottom: 50px;
    border-radius: 10px;
    box-shadow: 0px 10px 10px black;
}

.movie-img {
    width: auto !important;
    height: 100% !important;
    border-radius: 0px 10px 10px 0px;
}

.empty-error-message {
    margin: 50px;
    width: 400px;
    text-align: center;
    margin: 0 auto;
}

.card-buttons {
    position: relative; 
    margin-top: 100px;
}

.rate-number {
    font-size: 4em;
    color: white;
    display: block;
}

</style>