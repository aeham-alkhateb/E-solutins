<template>
    <v-container>
        <v-data-table
      :headers="headers"
      :items="users"
      :loading="loadTable"
      loading-text="Loading... Please wait"
      class="elevation-0"
      
    >
      <template v-slot:top>
        <v-toolbar
          flat
        >
          <v-toolbar-title class="theme--text">Activity Log</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          ></v-divider>
          <v-spacer></v-spacer>
        
            
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      
    </v-data-table>
      </v-container>
      </template>
      <script>
     import axios from 'axios'
    export default {
    data: () => ({
         users:[
         { first_name:'aeham',
          last_name:'kh',
          email:'aehamalkhateb@gmail.com',
          gender:'male',
          role_id:'operator'}
    
    ],
          loadTable: true,
          headers: [
            {
              text: 'Name',
              align: 'start',
              sortable: true,
              value: 'first_name' ,
              
            },
            { text: 'Last name', value: 'last_name' },
            { text: 'E-mail', value: 'email' },
            { text: 'Action', value: 'activity',sortable: false },
          ],
        }),
        
        computed: {
          formTitle () {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
          },
        },
    
      
     
    
        methods: {
           GetAllData(){
            {
          axios
            .get(`/api/users/`, {
              headers: {
                'ngrok-skip-browser-warning': true
              }
            })
            .then(response => {
              this.users = response.data
              this.loadTable= false;
            })
            .catch(error => console.log(error))
        }
           },
          }
      
      }
    
    
    
      </script>