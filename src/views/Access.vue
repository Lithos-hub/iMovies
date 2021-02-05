<template>
<div>
    <!-- <v-img src="../assets/img/favicon.jpg" id="background"></v-img> -->
    <v-row class="access">
        <v-col></v-col>
        <v-col>
            <v-card color="white" elevation="10" class="transparent" width="100%" height="110%" dark>
                <v-card-title id="card-title">
               Welcome to iMovies
                </v-card-title>
                <v-card-text class="pa-5">
                <v-row class="mt-5">
                    <v-col class="text-center">
                        <h4>Access with email and password</h4>
                        <v-divider class="my-5" dark></v-divider>
                        <v-sheet color="secondary darken-1" class="py-5 px-2" elevation="10" rounded="2">

                            <form v-on:submit.prevent="login">
                         
                        <v-text-field required id="email-input" :rules="emailRules" v-model="email" autocomplete="email" label="Email" filled type="email" color="cyan darken-1"></v-text-field>

                        <v-text-field required id="pass-input" v-model.trim="password" autocomplete="password" label="Password" filled type="password" color="cyan darken-1"></v-text-field>
                        
                        <v-alert dense v-if="formAlert" :color="validUser ? 'success darken-1' : 'red darken-1'">{{validUser ? 'Correct data! Loading app...' : 'Email or password are wrong. Please, try again'}}</v-alert>
                       
                        <v-btn type="submit" block class="gradient-btn1 mt-5">Enter</v-btn>

                            </form>

                        <v-divider></v-divider>
                        <p class="mt-2 green--text">Don't you have an account?</p>
                        <v-btn block class="mb-2 gradient-btn2" to="/register">Register</v-btn>
                        </v-sheet>
                    </v-col>
                    <v-col  class="text-center">
                        <h4>Access with a default account</h4>
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
        <v-col></v-col>
    </v-row>
</div>
</template>

<script>
import axios from "axios";
import {mapState} from "vuex";

export default {
    data() {
        return {
            validUser: false,
            formAlert: false,
            email: "",
            password: "",
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ]
        }
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {
        login(){
            this.formAlert = true;

                if(localStorage.getItem("storageUserDATA")) {

                    const user = JSON.parse(localStorage.getItem("storageUserDATA"));

                    setTimeout(() => {
                        this.$router.push("/home")
                    }, 2500);  

                }else{
                    this.validUser = false;
            }
        },
        setDefault(){
        const userData = {};

        userData.userName = "defaultUser";
        userData.userEmail = "";
        userData.userPassword = "";
        
        this.$store.commit("setUser", userData);

        setTimeout(() => {
            this.$router.push("/home")
            }, 500);  
        
        },
        getUsers() {

        }
    },
    created() {
        this.getUsers();
    }

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