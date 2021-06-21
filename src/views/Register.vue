<template>
<div>
    <v-row class="register">
        <v-col></v-col>
        <v-col>
            <v-card class="pa-5" dark>
                <v-btn to="/" class="btn-gradient2 mb-5" block>Come back</v-btn>
                <h5 class="text-center">Create an account</h5>
                <v-divider></v-divider>
                
                <v-form @submit.prevent="validate" ref="form" v-model="valid">
                <v-dialog
                v-model="dialog"
                width="800"
                persistent
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="info" rounded block class="my-5" v-bind="attrs" v-on="on">Choose an avatar</v-btn>
                </template>

                <v-card>
                    <v-card-title class="headline primary darken-2 white--text">
                    Choose an avatar
                    </v-card-title>
                    <v-container fluid class="pa-5">
                        <v-row>
                            <v-col lg="2" v-for="(item, i) in avatar_imgs" :key="i">
                                <v-avatar size="100" id="avatar-img" @click="selectAvatar(item)">
                                <v-img
                                    :src="item"
                                    aspect-ratio="1"
                                ></v-img>
                                </v-avatar>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
                </v-dialog>

                <div v-if="avatar !== ''">
                 <v-divider></v-divider>

                 <v-img :src="avatar" width="120" height="120" class="avatar ma-5 ma-auto"></v-img>

                 <v-divider></v-divider>
                </div>

                <v-text-field required :rules="nameRules" label="User name" type="text" v-model="username" placeholder="Write your username or alias" counter="20"></v-text-field>
                <v-text-field required :rules="emailRules" label="E-mail" type="email" v-model="email" placeholder="Write your email"></v-text-field>
                <v-text-field required label="Password" type="password" v-model.trim="password" placeholder="Write your password"></v-text-field>
                <v-text-field required label="Repeat password" type="password" v-model.trim="repassword" placeholder="Repeat your password"></v-text-field>

                <div class="text-center">
                <v-btn color="darken-1" class="btn-gradient1" :disabled="validForm" type="submit">Register</v-btn>
                </div>
                </v-form>

            </v-card>
            <div v-show="registered">
            <v-alert class="mt-5 text-center success-alert">Great! You made your account with success!</v-alert>
            <h4 class="cyan--text mt-5 text-center">Coming back...
                    <v-progress-circular
                    :size="50"
                    color="cyan"
                    class="d-block mx-auto mt-5"
                    indeterminate
                    ></v-progress-circular>
                </h4>
            </div>

        </v-col>
        <v-col></v-col>
    </v-row>


    <!-- SNACKBAR -->
<v-row class="d-flex">
    <v-snackbar
      v-model="snackbar"
      height="50px"
      tile
      absolute
      :color="snackColor"
    >
      {{ snackMsg }}
    </v-snackbar>
</v-row>


</div>
</template>

<script>
import {mapState} from "vuex";

export default {
    data() {
        return {
            snackbar: false,
            snackColor: '',
            snackMsg: '',
            dialog: false,
            valid: false,
            username: '',
            email: '',
            password: '',
            repassword: '',
            avatar: '',
            registered: false,
            nameRules: [
                v => v.length < 11 || '10 characters maximum'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
            ],
            avatar_imgs: [
                require("../assets/avatars/godfather1.jpg"),
                require("../assets/avatars/godfather2.jpg"),
                require("../assets/avatars/interstellar1.jpg"),
                require("../assets/avatars/interstellar2.jpg"),
                require("../assets/avatars/jurassicpark1.jpg"),
                require("../assets/avatars/jurassicpark2.jpg"),
                require("../assets/avatars/lotr1.jpg"),
                require("../assets/avatars/lotr2.jpg"),
                require("../assets/avatars/matrix1.jpg"),
                require("../assets/avatars/matrix2.png"),
                require("../assets/avatars/potter1.jpg"),
                require("../assets/avatars/potter2.jpg"),
                require("../assets/avatars/runner1.jpg"),
                require("../assets/avatars/runner2.jpeg"),
                require("../assets/avatars/spiderman1.png"),
                require("../assets/avatars/spiderman2.jpeg"),
                require("../assets/avatars/starwars1.jpg"),
                require("../assets/avatars/starwars2.jpg"),
                require("../assets/avatars/wick1.jpg"),
                require("../assets/avatars/wick2.jpg")
            ]
        }
    },
    computed: {
        ...mapState(["user"]),
        validForm() {
            if (this.password.length > 5 && this.password === this.repassword) {
                return false
            }else{
                return true
            }
        }
    },
    methods: {
    validate(){
        let storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
        if (storage) {
            for (let user of storage) {
                if (user.userEmail === this.email || user.userName === this.username) {
                    this.valid = false
                    this.showError('That user already exists!')
                } else {
                    this.valid = true
                }
            }
        }

        let userData = {
            id: storage.length,
            userName: this.username,
            userEmail: this.email,
            userPassword: this.password,
            userAvatar: this.avatar,
            toWatchMovies: [],
            watchedMovies: [],
            favoriteMovies: [],
            ratedMovies: []
        };


        if (this.valid) {
    
            storage.push(userData);
            localStorage.setItem("storageUserDATA", JSON.stringify(storage));

            this.$store.commit("setUser", userData);

            this.$refs.form.validate()

            this.registered = !this.registered;
            setTimeout(() => {
                this.$router.push("/")
            }, 2500);  
        }
    },
    selectAvatar(item) {
        this.avatar = item
        this.dialog = false;
    },
    showError (text) {
        this.snackbar = true
        this.snackColor = 'red'
        this.snackMsg = text
    },
    showSuccess (text) {
        this.snackbar = true
        this.snackColor = 'success'
        this.snackMsg = text
    }
    }
}
</script>

<style lang="scss">
@import 'src/scss/variables';

.register {
    position: relative;
    margin-top: 1%;
}

.btn-gradient1 {
    background: $gradient_btn1;
    color: white !important;
    padding-left: 10px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-right: 10px;
    border-radius: 5px;
    font-size: 18px;
    width: 150px;
}

.btn-gradient2 {
    background: $gradient_btn2;
    color: white !important;
}

.success-alert {
    background: $gradient_success;
    color: white !important;
}

#avatar-img {
    transition: 0.5s;

    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
}

.avatar {
    border-radius: 50%;
    border: 2px solid white;
}
</style>