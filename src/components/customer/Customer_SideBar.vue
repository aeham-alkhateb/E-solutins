<template> 

    <v-navigation-drawer
      class="side elevation-10"
  
      app
      color="white"
     disable-resize-watcher
     disable-route-watcher
     mobile-breakpoint
     
    >
    <v-list>
        
<v-list-item >
  <v-list-item-icon max-width="100px">
         <v-img src="@/assets/icon/logoo1.png" />
          </v-list-item-icon>
          <v-list-item-title class="text-h6" style="overflow:visible;">
           E-Solutions
            </v-list-item-title>
</v-list-item>
        
      </v-list>

      <v-divider class=" my-4"></v-divider>
       
     <v-list
        nav
        dense
      >
    
        <v-list-item link   @click="setView('home')" >
          <v-list-item-icon  >
            <v-icon color="secondary">mdi-calendar-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="setView('hosting_plans')">
          <v-list-item-icon>
          <v-icon color="secondary">mdi-cart-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Buy Hosting Plan</v-list-item-title>

        </v-list-item>
        <v-list-item link @click="setView('support')">
          <v-list-item-icon>
            <v-icon color="secondary">mdi-card-account-mail</v-icon>   
                   </v-list-item-icon>
          <v-list-item-title>Support</v-list-item-title>
        </v-list-item>
        
      </v-list>
     
     

    </v-navigation-drawer>

  
</template>

<script>
import axios from 'axios'
import { mapGetters, mapState } from 'vuex'
export default {
  
created(){
 

},
methods: {
  setView(view) {
      this.$store.commit("setView", view);
    }
  },

  data(){ 
     return{
      user:{
        full_name :"aeham",
        email:"aehamalkhateb@gmail.com"
      },
      drawer:true
     }
     
   },
   computed:{
   }
   
}
</script>
<style>
.side{
  border-color: "white";
    border-bottom-right-radius: 150px !important;
   }
  .theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
    background-color:white;
}
</style>