<template>
<v-container fluid>
      <v-row>
      <v-col lg="4"></v-col>
      <v-col lg="4" cols="12" class="text-center mx-auto">
          <div id="tittle-wrapper">
          <h1 id="error404-title">Error 4<v-img src="../assets/img/deathstar.png" class="ma-auto" id="deathstar"></v-img>4</h1>
          </div>
        <div id="img-text-btn-wrappper">

          <v-img src="../assets/img/obiwan.png" id="error404-img" class="mx-auto"></v-img>
          <h1 id="error404-img-text" class="text-center">
              I have a very bad feeling about this... <br>
              You should come back!
              </h1>
              
              <v-btn id="go-back-btn" @mouseover="playAudio" @mouseleave="stopAudio" @click="goBack()">Go back</v-btn>
              

              <audio src="../assets/audio/saberfx.mp3" id="audiofx" preload="preload"></audio>
        </div>
          
      </v-col>
      <v-col lg="4"></v-col>
      </v-row>

</v-container>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        playAudio() {
            const audio = document.getElementById("audiofx")
            audio.play();
        },
        stopAudio() {
            const audio = document.getElementById("audiofx")
            audio.pause();
            audio.currentTime = 0;
        },
        goBack() {
            return this.$router.go(-1);
        }

    },
}
</script>

<style lang="scss">
@import 'src/scss/variables';

// COMMON

#tittle-wrapper{
    display: flexbox;
    margin-top: 100px;
}

#deathstar {
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    animation: move 3s linear infinite;
}

@-webkit-keyframes move {
    from { -webkit-transform: rotate(0deg) translateX(10px) rotate(0deg); }
    to   { -webkit-transform: rotate(360deg) translateX(10px) rotate(-360deg); }
}

@-moz-keyframes move {
    from { -moz-transform: rotate(0deg) translateX(10px) rotate(0deg); }
    to   { -moz-transform: rotate(360deg) translateX(10px) rotate(-360deg); }
}

@-o-keyframes move {
    from { -o-transform: rotate(0deg) translateX(10px) rotate(0deg); }
    to   { -o-transform: rotate(360deg) translateX(10px) rotate(-360deg); }
}

@keyframes move {
    from { transform: rotate(0deg) translateX(10px) rotate(0deg); }
    to   { transform: rotate(360deg) translateX(10px) rotate(-360deg); }
}


// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {

    
#error404-img {
    width: 100px;
}

#error404-img-text {
    color: white;
    text-shadow: 0px 0px 10px aqua, 0px 0px 5px white;
}

#error404-title {
    font-size: 5em;
    display: flex;
    font-family: $style4;
    letter-spacing: 4px;
    color: white;
    text-shadow: 0px 0px 20px red, 0px 0px 10px white;

}
#deathstar {
    max-width: 60px;
    max-height: 60px;
}

#img-text-btn-wrappper {
    position: absolute;
    bottom: 200px;

}

#go-back-btn {
    margin-top: 50px;
    box-shadow: 0px 0px 20px greenyellow;
    transition: 0.3s;
    width: 80%;
    color: $dark;
    background: white;
    font-size: auto;
}
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {

#error404-img {
    width: 150px;
}

#error404-img-text {
    color: white;
    text-shadow: 0px 0px 10px aqua, 0px 0px 5px white;
}

#error404-title {
    font-size: 6em;
    display: flex;
    font-family: $style4;
    letter-spacing: 2px;
    color: white;
    text-shadow: 0px 0px 20px red, 0px 0px 10px white;

}

#deathstar {
    max-width: 90px;
    max-height: 90px;
}

#img-text-btn-wrappper {
    position: relative;
    bottom: 0px;

}

#go-back-btn {
    margin-top: 20px;
    box-shadow: none;
    transition: 0.3s;
    width: auto;
    color: white;
    background: $dark;
    font-size: auto;

    &:hover {
     box-shadow: 0px 0px 30px greenyellow, 0px 0px 10px white;
     width: 100%;
     color: $dark;
     letter-spacing: 10px;
     font-size: 18px;
     background: white;
    }
}
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {

    
#error404-img {
    width: 200px;
}

#error404-img-text {
    color: white;
    text-shadow: 0px 0px 10px aqua, 0px 0px 5px white;
}

#error404-title {
    font-size: 9em;
    display: flex;
    font-family: $style4;
    letter-spacing: 15px;
    color: white;
    text-shadow: 0px 0px 20px red, 0px 0px 10px white;

}

#deathstar {
    max-width: 100px;
    max-height: 100px;
}

#img-text-btn-wrappper {
    position: absolute;
    bottom: 200px;

}

#go-back-btn {
    margin-top: 50px;
    box-shadow: none;
    transition: 0.3s;
    width: auto;
    color: white;
    background: $dark;
    font-size: auto;

    &:hover {
     box-shadow: 0px 0px 30px greenyellow, 0px 0px 10px white;
     width: 100%;
     color: $dark;
     letter-spacing: 10px;
     font-size: 18px;
     background: white;
    }
}
}



</style>