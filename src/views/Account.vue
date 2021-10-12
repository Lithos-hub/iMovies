<template>
  <div>
    <SectionTitle :sectionSubtitle="subtitle" />
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
      subtitle: "My Account",
    };
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";
</style>
