<template>
  <v-container fluid>
    <v-img class="error-404-background" src="../assets/img/404-background.png"></v-img>
    <v-row>
      <v-col lg="4"></v-col>
      <v-col lg="4" cols="12" class="text-center mx-auto">
        <v-btn
          color="secondary"
          tile
          @click="sound = !sound"
          id="sound-btn"
          elevation="10"
        >
          <small class="d-block white--text px-5">{{
            !sound ? "Sound is disabled" : "Sound is activated"
          }}</small>
          <v-icon color="white">{{
            sound === true ? soundon : soundoff
          }}</v-icon>
        </v-btn>
        <div id="tittle-wrapper">
          <h1 id="error404-title">
            Error 4<v-img
              src="../assets/img/deathstar.png"
              class="ma-auto"
              id="deathstar"
            ></v-img
            >4
          </h1>
        </div>
        <div class="centered-wrapper">
          <v-img
            src="../assets/img/obiwan.png"
            id="error404-img"
          ></v-img>
          <div class="saber-wrapper">
            <div class="saber"></div>
          </div>
        </div>

          <h1 id="error404-img-text" class="text-center">
            {{ $t('error-404.text1') }} <br />
          </h1>

          <v-btn
            id="go-back-btn"
            @mouseover="playAudio"
            @mouseleave="stopAudio"
            @click="goBack()"
            >Go back</v-btn
          >

          <audio
            src="../assets/audio/saberfx.mp3"
            id="audiofx"
            preload="preload"
            v-if="sound"
          ></audio>
      </v-col>
      <v-col lg="4"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      sound: false,
      soundon: "mdi-volume-high",
      soundoff: "mdi-volume-low",
    };
  },
  methods: {
    playAudio() {
      const audio = document.getElementById("audiofx");
      audio.play();
    },
    stopAudio() {
      const audio = document.getElementById("audiofx");
      audio.pause();
      audio.currentTime = 0;
    },
    goBack() {
      return this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss">
@import "src/scss/variables";

// COMMON

.error-404-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

#content-row {
  z-index: 999;
}

#sound-btn:focus {
  outline: none;
}

#tittle-wrapper {
  display: flexbox;
  margin: 0;
}

#deathstar {
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  animation: move 3s linear infinite;
}

.saber-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.saber {
  width: 110px;
  background: white;
  position: relative;
  height: 14px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px white, 0px 0px 15px blue, 0px 0px 25px cyan;
  transform: rotate(45deg);
  animation: neon 100ms linear infinite alternate-reverse;
  z-index: 99;
}

.centered-wrapper {
  width: auto;
  height: auto;
  position: absolute;
  top: 50%;
  left: 45%;
  transform: translate(-50%, -50%);
}

// neon animation

@keyframes neon {
  0% {
    box-shadow: 0px 0px 10px white, 0px 0px 15px blue, 0px 0px 25px cyan;
  }
  50% {
    box-shadow: 0px 0px 10px white, 0px 0px 15px cyan, 0px 0px 25px white;
  }
  100% {
    box-shadow: 0px 0px 10px white, 0px 0px 15px blue, 0px 0px 25px cyan;
  }
}

@-webkit-keyframes move {
  from {
    -webkit-transform: rotate(0deg) translateX(10px) rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg) translateX(10px) rotate(-360deg);
  }
}

@-moz-keyframes move {
  from {
    -moz-transform: rotate(0deg) translateX(10px) rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg) translateX(10px) rotate(-360deg);
  }
}

@-o-keyframes move {
  from {
    -o-transform: rotate(0deg) translateX(10px) rotate(0deg);
  }
  to {
    -o-transform: rotate(360deg) translateX(10px) rotate(-360deg);
  }
}

@keyframes move {
  from {
    transform: rotate(0deg) translateX(10px) rotate(0deg);
  }
  to {
    transform: rotate(360deg) translateX(10px) rotate(-360deg);
  }
}

  #error404-img {
    width: 200px;
    position: relative;
    left: 30%;

  }

  #error404-img-text {
    color: white;
    text-shadow: 0px 0px 10px aqua, 0px 0px 5px white;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  #error404-title {
    width: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -150%);
    font-size: 12em;
    display: flex;
    font-family: $style4;
    letter-spacing: 15px;
    color: white;
    text-shadow: 0px 0px 20px red, 0px 0px 10px white;
  }

  #deathstar {
    max-width: 180px;
    max-height: 180px;
  }

  #go-back-btn {
    bottom: 10%;
    left: 50%;
    transform: translate(-50%, 0);
    position: absolute;
    box-shadow: none;
    transition: 0.3s;
    width: auto;
    color: white;
    background: $dark;
    font-size: auto;

    &:hover {
      box-shadow: 0px 0px 30px greenyellow, 0px 0px 10px white;
      width: 50%;
      color: $dark;
      letter-spacing: 10px;
      font-size: 18px;
      background: white;
    }

}
</style>
