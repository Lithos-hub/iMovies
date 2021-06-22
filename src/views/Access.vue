<template>
<div>
    <!-- <v-img src="../assets/img/favicon.jpg" id="background"></v-img> -->
    <v-row :class="displayCols ? 'access' : ''">
        <v-col v-if="displayCols"></v-col>
        <v-col lg="6">
            <v-card color="white" elevation="10" class="transparent" width="100%" height="100%" dark>
                <v-card-title id="card-title">
               Welcome to iMovies
                </v-card-title>
                <v-card-text class="pa-5">
                <v-row>
                    <v-col lg="6" cols="12" class="text-center">
                        <h4>Access with <br> email and password</h4> 
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon class="info-icon" v-bind="attrs" v-on="on">mdi-information</v-icon>
                            </template>
                            <span>You will be able to save movies in different categories such as: favourites, watched, rated, etc.</span>
                        </v-tooltip>
                        <v-divider class="my-5" dark></v-divider>
                        <v-sheet color="secondary darken-1" class="py-5 px-2" elevation="10" rounded="2">

                            <form v-on:submit.prevent="login(email, password)">
                         
                        <v-text-field required id="email-input" :rules="emailRules" v-model="email" label="E-mail" filled type="email" color="cyan darken-1"></v-text-field>

                        <v-text-field required id="pass-input" v-model.trim="password" label="Password" filled type="password" color="cyan darken-1"></v-text-field>
                        
                        <v-alert dense v-if="formAlert" :color="validUser ? 'success darken-1' : 'red darken-1'">{{validUser ? 'Correct data! Loading app...' : 'Email or password are wrong. Please, try again'}}</v-alert>
                       
                        <v-btn :loading="loading" :disabled="email === '' || password === ''" type="submit" block class="gradient-btn1 mt-5">Enter</v-btn>

                            </form>

                        <v-divider></v-divider>
                        <p class="mt-2 green--text">Don't you have an account?</p>
                        <v-btn block class="mb-2 gradient-btn2" to="/register">Register</v-btn>
                        </v-sheet>
                    </v-col>
                    <v-col lg="6" cols="12" class="text-center">
                        <h4>Access with a <br> default account</h4> 
                         <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon class="info-icon" v-bind="attrs" v-on="on">mdi-information</v-icon>
                            </template>
                            <span>You will be able to access the application, but some features will be hidden.</span>
                        </v-tooltip>
                        <v-divider class="my-5" dark></v-divider>
                        <v-card rounded="2" width="140" class="mx-auto justify-content-center" elevation="5" id="card-default" @click="setDefault">
                            <v-icon id="card-default-icon">mdi-account-circle</v-icon>
                            <h5 class="pa-2" id="card-default-text">@DefaultUser</h5>
                        </v-card>
                    </v-col>
                </v-row>
                </v-card-text>
            </v-card>
        </v-col>
        <v-col v-if="displayCols"></v-col>
    </v-row>
</div>
</template>

<script>
// import axios from "axios";
import { mapState } from "vuex";

export default {
    data() {
        return {
            loader: null,
            loading: false,
            validUser: false,
            formAlert: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ]
        }
    },
    computed: {
        ...mapState(["user"]),
        displayCols() {
            switch (this.$vuetify.breakpoint.name) {
          case 'xs': return false
          case 'sm': return false
          case 'md': return true
          case 'lg': return true
          case 'xl': return true
            }
        }
    },
    mounted() {
        this.$store.commit("setDefault", false);
    },
    watch: {
      loader () {
        const l = this.loader
        this[l] = !this[l]

        setTimeout(() => (this[l] = false), 3000)

        this.loader = null
      },
    },
    methods: {
        login(email, password){
            this.formAlert = true;

                if(localStorage.getItem("storageUserDATA")) {
                    const user = JSON.parse(localStorage.getItem("storageUserDATA"));

                    for (let item of user) {
                        if (item.userEmail === email && item.userPassword === password) {
                            this.validUser = true

                            this.$store.commit("setUser", item);
                            this.$store.commit("setID", item.id);
                            this.$store.commit("isLogged", true);
                            

                            const storage = JSON.parse(localStorage.getItem("USERID")) || {};
                            storage.id = item.id

                            localStorage.setItem("USERID", JSON.stringify(storage));

                            this.loader = 'loading'
                            
                             setTimeout(() => {
                            this.$router.push("/home")
                            }, 2000)
                        }
                    }

                }else{
                    this.validUser = false;
                    this.$store.commit("isLogged", false);
            }
        },
        setDefault(){
        this.$store.commit("isLogged", true);
        const userData = {};

        userData.userName = "defaultUser";
        userData.userEmail = "";
        userData.userPassword = "";
        userData.toWatchMovies = [];
        userData.watchedMovies = [];
        userData.favoriteMovies = [];
        userData.ratedMovies = [];
        
        this.$store.commit("setUser", userData);
        this.$store.commit("setDefault", true);

        setTimeout(() => {
            this.$router.push("/home")
            }, 500);  
        
        },
    },

}
</script>

<style lang="scss" scoped>
@import 'src/scss/variables';

#background {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0px;
    left: 0px;
    bottom: 0px;
}

.access {
    position: relative;
    margin-top: 5%;
}

.info-icon {
    background: linear-gradient(25deg, rgb(255, 199, 126), rgb(206, 130, 30), rgb(214, 52, 52), rgb(196, 17, 213));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    cursor: pointer;
    font-size: 30px;
}

.v-tooltip__content {
    background: linear-gradient(25deg, rgb(255, 199, 126), rgb(206, 130, 30), rgb(214, 52, 52), rgb(196, 17, 213));
    color: white;
    padding: 10px;
    max-width: 150px;
    opacity: 1 !important;
    box-shadow: 0px 0px 20px $dark;
    text-align: center;
    
}

#card-title{
    background: linear-gradient(25deg, rgb(153, 35, 27), rgb(218, 159, 50), rgb(247, 94, 255), rgb(0, 110, 255));
    color: white;
    font-size: 2em;
    justify-content: center;
}

#card-default {
    background: linear-gradient(25deg, rgb(255, 199, 126), rgb(206, 130, 30), rgb(214, 52, 52), rgb(196, 17, 213));
}

#card-default-icon {
    font-size: 8em;
    color: white;
}

#card-default-text {
    color: white;
    text-shadow: 0px 0px 10px black;
}

h4 {
    font-size: 18px;
    font-family: $style2;
    background: linear-gradient(25deg, rgb(136, 174, 255), rgb(51, 123, 255), rgb(183, 75, 255), rgb(48, 217, 255));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    filter: brightness(2);
}

h3 {
    font-family: $style1;
}

h5 {
    color: black;
    font-size: 15px;
}

#card-default{
transition: 0.3s;

    &:hover {
        transform: scale(1.2);
        cursor: pointer;
        box-shadow: 0px 0px 10px white;
    }

}

.gradient-btn1 {
    background: $gradient_btn3;
}

.gradient-btn2 {
    background: $gradient_btn4;
}


</style>