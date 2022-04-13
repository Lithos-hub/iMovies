<template>
  <div id="error-404">
    <h1 class="text-h1 centered">Error 404</h1>
    <h5 class="text-h5 text-center">{{ $t("error-404.text1") }}</h5>
    <v-btn tile width="200" @click="comeback" id="comeback-btn">{{
      $t("error-404.comeback")
    }}</v-btn>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$store.dispatch('getReward', 37);
    }, 1000)
  },
  methods: {
    comeback() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
@import "src/scss/app";

#error-404 {
  background: url("../assets/img/404-background.png");
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;

  h1 {
    width: 100%;
    text-align: center;
    background: $gradient_1;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

h5 {
  width: 100%;
  background: $gradient_3;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: absolute;
  left: 50%;
  top: 65%;
  transform: translate(-50%, -50%);
}

#comeback-btn {
  position: absolute;
  left: 50%;
  top: 75%;
  transform: translate(-50%, -50%);
  background: $gradient_2;
  color: white;

  &:hover {
    background: transparent;
    backdrop-filter: blur(2px);
    border: 1px solid white;
    box-shadow: 0px 0px 5px white, 0px 0px 10px cyan, 0px 0px 20px blue;
  }
}
</style>
