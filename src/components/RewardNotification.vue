<template>
  <div id="notification">
      <v-sheet id="notification-sheet" color="secondary" rounded="3">
        <div class="text-h6 amber--text px-5 py-2"><v-icon id="trophy-icon" color="amber" class="mr-5" size="30">mdi-trophy</v-icon>¡Has conseguido un logro!</div>
      </v-sheet>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">

#notification-sheet {
  box-shadow: 0px 0px 5px white, 0px 0px 10px rgb(255, 217, 0), 0px 0px 20px #FFC400 !important;
}
</style>