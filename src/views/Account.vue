<template>
  <div>
    <SectionTitle :sectionName="name" />
  </div>
</template>

<script>
import SectionTitle from "../components/SectionTitle";

export default {
  name: "Account",
  components: {
    SectionTitle,
  },
  data() {
    return {
      name: "My Account",
    };
  },
};
</script>

<style lang="scss">
@import "src/scss/variables";
</style>
