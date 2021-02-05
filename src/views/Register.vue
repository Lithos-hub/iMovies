<template>
<div>
    <v-row class="register">
        <v-col></v-col>
        <v-col>
            <v-card class="pa-5" dark>
                <v-btn to="/" class="btn-gradient2 mb-5" block>Come back</v-btn>
                <h5 class="text-center">Make an account</h5>
                <v-divider></v-divider>
                
                <v-form @submit.prevent="validate" ref="form" v-model="valid">
                <v-dialog
                v-model="dialog"
                width="800"
                persistent
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn color="info" rounded block class="my-5" v-bind="attrs" v-on="on" disabled>Choose an avatar (Soon available)</v-btn>
                </template>

                <v-card>
                    <v-card-title class="headline primary darken-2 white--text">
                    Choose an avatar
                    </v-card-title>
                    <v-container class="pa-5">
                        <v-row>
                            <v-col lg="3" v-for="(item, i) in avatar_imgs" :key="i">
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

                <v-text-field required autocompleted="false" :rules="nameRules" label="User name" type="text" v-model="username" placeholder="Write your username or alias"></v-text-field>
                <v-text-field required autocompleted="false" :rules="emailRules" label="Email" type="email" v-model="email" placeholder="Write your email"></v-text-field>
                <v-text-field required autocompleted="false" label="Password" type="password" v-model.trim="password" placeholder="Write your password"></v-text-field>
                <v-text-field required autocompleted="false" label="Repeat password" type="password" v-model.trim="repassword" placeholder="Repeat your password"></v-text-field>

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

    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      color="primary"
      absolute
      top
    >
      Avatar selected!
    </v-snackbar>


</div>
</template>

<script>
import {mapState} from "vuex";

export default {
    data() {
        return {
            snackbar: false,
            dialog: false,
            valid: true,
            username: "",
            email: "",
            password: "",
            repassword: "",
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
                require("../assets/img/comedyimg.jpg"),
                require("../assets/img/crimeimg.jpg"),
                require("../assets/img/documentaryimg.jpg"),
                require("../assets/img/dramaticimg.jpg"),
                require("../assets/img/fantasyimg.jpg"),
                require("../assets/img/historyimg.jpg"),
                require("../assets/img/musicalimg.jpg"),
                require("../assets/img/romanticimg.jpg"),
                require("../assets/img/warimg.jpg"),
                require("../assets/img/westernimg.jpg"),
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
        const userData = {
            userName: this.username,
            userEmail: this.email,
            userPassword: this.password,
        };

        this.$store.commit("setUser", userData);

        this.$refs.form.validate()

        if(this.user){
        this.registered = !this.registered;

        
        const storage = JSON.parse(localStorage.getItem("storageUserDATA")) || [];
        userData.id = storage.length;
        storage.push(userData);
        localStorage.setItem("storageUserDATA", JSON.stringify(storage));

        setTimeout(() => {
        this.$router.push("/")
        }, 2500);  
        }
    },
    selectAvatar(item) {
        const storage = JSON.parse(localStorage.getItem("storageUserAVATAR")) || [];
        storage.push(item);
        localStorage.setItem("storageUserAVATAR", JSON.stringify(storage));
        this.dialog = false;
        this.snackbar = true;
    }
    }
}
</script>

<style lang="scss">
@import 'src/scss/variables';

.register {
    position: relative;
    margin-top: 5%;
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
</style>