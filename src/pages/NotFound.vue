<template>
  <h2>
    Page not found! Please view our <router-link to="/teams">teams</router-link>
  </h2>
</template>
<script>
export default {
  created() {
    console.log(this.$route.params);
  },
};
</script>
