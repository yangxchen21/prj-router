<template>
  <button @click="confirmInput">confirm</button>
  <button @click="saveChange">SaveChange</button>
  <ul>
    <user-item
      v-for="user in users"
      :key="user.id"
      :name="user.fullName"
      :role="user.role"
    ></user-item>
  </ul>
</template>

<script>
import UserItem from '../components/users/UserItem.vue';

export default {
  components: {
    UserItem,
  },
  inject: ['users'],
  data() {
    return {
      change: false,
    };
  },
  methods: {
    saveChange() {
      this.change = true;
    },
    confirmInput() {
      this.$router.push('/teams');
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('Users List');
    next();
  },
  beforeRouteUpdate() {
    // this.loadTeamMembers(to.params.teamId);
    console.log('before route update');
  },
  beforeRouteLeave(to, from, next) {
    console.log('UsersList before leave');
    if (this.change) {
      next();
    } else {
      const flag = confirm('Are you sure?');
      next(flag);
    }
  },
  unmounted() {
    console.log('unmounted');
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 20rem;
  padding: 0;
}
</style>
