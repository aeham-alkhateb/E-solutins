<template>
    <v-app>
      <adminsidebar  />
      <v-app-bar app>
        <appbar :user="user" />
     
      </v-app-bar>
      <v-main>
        <home v-show="home" :user="user"/>
        <hosting_plans v-show="hosting_plans" :user="user"/>
        <support v-show="support" :user="user" />
      </v-main>
    </v-app>
  </template>

  <script>
  import adminsidebar from '../components/customer/Customer_SideBar'
  import appbar from '../components/customer/Customer_app_bar'
  import home from '../components/customer/home'
  import hosting_plans from '../components/customer/hosting_plans'
  import support from '../components/customer/support'
 

  import axios from "axios";

  import { mapState } from "vuex";
  export default {
    data: () => ({
     user:[]
  }),
   computed:{
    ...mapState([
            'home',
            'hosting_plans',
            'support',
            
        ])
   },
    components:{
        appbar,
        adminsidebar,
        home,
        hosting_plans,
        support,
       
    },
     created() {
     {
        axios.get(`/api/customer/info`, {
          headers: {
            "ngrok-skip-browser-warning": true
          }
        }).then((response) => {
          console.log(response)
          this.user = response.data
        }).catch((error) => console.log(error))
      }
    },
  }
  </script>
  <style scoped>
  
  </style>