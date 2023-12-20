<template> 

    <v-navigation-drawer
      class="side evaluation-20"
      app
      color="white"
     :mini-variant.sync="miniView"
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
      <v-list-item-subheader >Admin Section</v-list-item-subheader>
    
        <v-list-item link   @click="setView('allUsers')" >
          <v-list-item-icon  >
            <v-icon color="secondary">mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title>All Users</v-list-item-title>
        </v-list-item>
        
        <v-list-item link @click="setView('addOp')">
          <v-list-item-icon>
            <v-icon color="secondary">mdi-account-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Add Operator</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="setView('new_package')">
          <v-list-item-icon>
            <v-icon color="secondary">mdi-application-cog</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Customize package</v-list-item-title>
        </v-list-item>
        
      </v-list>
      <v-divider class="mx-10 my-5"></v-divider>
      <v-list
        nav
        dense
      >
    
        <v-list-item link   @click="setView('operator_massages')" >
          <v-list-item-icon  >
            <v-icon color="secondary">mdi-card-account-mail</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Customers messages</v-list-item-title>
        </v-list-item>
        <v-list-item link @click="setView('operator_requsts')">
          <v-list-item-icon>
            <v-icon color="secondary">mdi-archive-search</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Requests handler</v-list-item-title>
        </v-list-item>
        
        
        
      </v-list>
     

    </v-navigation-drawer>

  
</template>

<script>import axios from 'axios'
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
    border-bottom-right-radius: 250px !important;
   }

</style>