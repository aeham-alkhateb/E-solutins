<template>
    <v-app>
      <adminsidebar  />
      <v-app-bar app>
        <appbar :user="user" />
     
      </v-app-bar>
      <v-main>
        <admin_addOp v-show="addOp" :user="user"  />
        <admin_allUsers v-show="allUsers" :user="user" />
        <admin_ShowLog v-show="showLog" :user="user" />
        <operator_massages v-show="operator_massages" :user="user" />
        <operator_requsts v-show="operator_requsts" :user="user" />
        <new_package v-show="new_package" :user="user" />

      </v-main>
    </v-app>
  </template>

  <script>
  import appbar from '../components/app_bar'
  import adminsidebar from '../components/AdminSideBar'
  import admin_addOp from '../components/admin_addOp'
  import admin_allUsers from '../components/admin_allUsers'
  import admin_ShowLog from '../components/admin_ShowLog'
  import operator_massages from '../components/operator_massages'
  import operator_requsts from '../components/operator_requsts'
  import new_package from '../components/addPackge'

  import axios from 'axios'
  import { mapState } from "vuex";
  export default {
    data: () => ({
     user:[]
  }),
   computed:{
    ...mapState([
            'allUsers',
            'showLog',
            'addOp',
            'operator_requsts',
            'operator_massages',
            'new_package'
        ])
   },
    components:{
        appbar
        ,adminsidebar,
        admin_addOp,
        admin_allUsers,
        admin_ShowLog,
        operator_massages,
        operator_requsts,
        new_package

    }, created() {
      {
        axios.get(`/api/admin/info`, {
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