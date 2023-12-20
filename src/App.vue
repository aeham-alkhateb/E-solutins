<template >
<v-app class="pt-0">
 <router-view :user="user"/>
</v-app>
</template>


<script>
import axios from 'axios'
import vuex from './vuex'
export default {
  name: "App",
  data () {
    return{
    fab: null,
    color: "",
    flat: null,
    user:[]
    } },
  components: {
  },
  

}
</script>


<style scoped>
#app {
  background-size: cover;
   background-attachment: fixed;
  background-position: center;
  background-color: #e4e4e4;
}
</style>

