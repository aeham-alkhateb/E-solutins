<template>
  <v-container>
    <v-card>
      <v-card-title class="white grey--text text-h5">
        User Directory
      </v-card-title>
      <v-row class="pa-4" justify="space-between">
        <v-col cols="5">
          <v-treeview :active.sync="active" :items="items" :load-children="fetchUsers" :open.sync="open" activatable rounded
            color="primary" open-on-click transition>
            <template v-slot:prepend="{ item }">
              <v-icon v-if="!item.children">
                mdi-account
              </v-icon>
            </template>
          </v-treeview>
        
        </v-col>

        <v-divider vertical></v-divider>

        <v-col class="d-flex text-center">
          <v-scroll-y-transition mode="out-in">
            <div v-if="!selected" class="text-h6 grey--text text--lighten-1 font-weight-light"
              style="align-self: center;">
              Select a User
            </div>
            <v-card v-else :key="selected.id" class="pt-6 mx-auto" flat max-width="400">
              <v-card-text>
                
                <h3 class="text-h5 mb-2">
                  {{ selected.f_name }} {{ selected.l_name }} 
                </h3>
                <div class="blue--text mb-2">
                  {{ selected.email }}
                </div>
                <div class="blue--text subheading font-weight-bold">
                  {{ selected.role }}
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-divider></v-divider>
              <v-row
                class="text-left"
                tag="v-card-text"
              >
                <v-col
                  class="text-right mr-4 mb-2"
                  tag="strong"
                  cols="5"
                  v-show="selected.role=='Customer'"
                >
                  Company:
                </v-col>
                <v-col v-show="selected.role == 'Customer'">{{ selected.company_name }}</v-col>
                <v-col
                  class="text-right mr-4 mb-2"
                  tag="strong"
                  cols="5"
                >
                  Address:
                </v-col>
                <v-col>
                  <p>{{ selected.address }}</p>
                </v-col>
                <v-col
                  class="text-right mr-4 mb-2"
                  tag="strong"
                  cols="5"
                >
                  Phone:
                </v-col>
                <v-col>{{ selected.phone }}</v-col>
              </v-row>
                            <v-divider></v-divider>
            <v-row>
              <v-col>
                  <v-btn icon @click="dialogUserDelete=!dialogUserDelete , editedIndex=selected.id,deleterole= selected.role">
                    <v-icon color="primary" >mdi-delete</v-icon>
                  </v-btn><v-col></v-col><v-btn color="secondary" icon @click="dialogSuspend = !dialogSuspend, editedIndex = selected.id">
                      Suspend
                    </v-btn></v-col>
                 </v-row>
            </v-card>
          </v-scroll-y-transition>
        </v-col>
      </v-row>
    </v-card>
    <v-dialog v-model="dialogUserDelete" max-width="500px">
          <v-card>
            <v-card-title
              >Are you sure you want to delete this user?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="edit" text @click="dialogUserDelete = false">Cancel</v-btn>
              <v-btn color="edit" text @click="deleteUserConfirm()">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogSuspend" max-width="500px">
            <v-card>
              <v-card-title
                >Are you sure you want to Suspend this user?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="edit" text @click="dialogSuspend = false">Cancel</v-btn>
                <v-btn color="edit" text @click="SuspendConfirm()">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

        <v-snackbar
              v-model="wrongcr"
              :timeout="4001"
              :value="true"
              absolute
              color="red accent-2"
              shaped
              bottom
            >
              {{ wrgmsg }}
            </v-snackbar>
              <v-snackbar
                        v-model="successmsg"
                        :timeout="4001"
                        :value="true"
                        absolute
                        color="success accent-2"
                        shaped
                        bottom
                      >
              User <strong>Deleted</strong> successfully      
                </v-snackbar>
  </v-container>
  
</template>

  <script>
     import axios from 'axios'
  
    const pause = ms => new Promise(resolve => setTimeout(resolve, ms))

    export default {
      data: () => ({
        active: [],
        deleterole:'',
        editedIndex: -1,
        full:true,
        dialogUserDelete:false,
        avatar: null,
         wrongcr: false,
      wrgmsg: '',
      successmsg: false,
        open: [],
        users: [],
        customers:[],
          operators: [],
        dialogSuspend:false
      }),

    computed: {
        
        items() {
          return [
            {
              name: 'Users',
              children: this.customers,
            },
            {
            name: 'operators',
            children: this.operators,
          }
          ]
        },
        selected() {
          if (!this.active.length) return undefined

        const id = this.active[0]
           
         
           return this.users.find(user => user.id === id)
        },
        
     
      },

      watch: {
        selected: 'randomAvatar',
      },

    methods: {
      SuspendConfirm() {
        axios.post(`api/sus-acc`, {
          account: this.users[this.editedIndex-1].f_name,
          headers: {
            "ngrok-skip-browser-warning": true,

          }
        }).then((response) => {
          console.log(response)
          
         
            console.log(response)
            this.wrgmsg = response.data.message
            this.successmsg = true
          }

          


          ).catch((error) => {
          console.log(error)
            this.loading = false
          this.Check_request = false,
            this.save = false
          this.getdata()
            })
      


    
      },
      deleteUserConfirm() {
          if (this.deleterole == 'Customer') {
            axios
              .delete(
                `/api/admin/deletecustomer/${this.editedIndex}`
              )
              .then(res => {
                console.log(res)
                if (res.data.status == 'success') {
                  this.successmsg = true
                  this.wrgmsg = res.data.message

                }
                else {
                  console.log(res)
                  this.wrgmsg = res.data.message
                  this.wrongcr = true
                }
              })
              .catch(error => {
                console.log(error)
              this.wrgmsg = error.data.message
                this.wrongcr = true

              })

            this.dialogUserDelete = false
            } else {
          axios
            .delete(
              `/api/admin/deleteoperator/${this.editedIndex}`
            )
            .then(res => {
              console.log(res)
              if (res.data.status == 'success') {
                this.successmsg = true
                this.wrgmsg = res.data.message

              }
              else {
                console.log(res)
                this.wrgmsg = res.data.message
                this.wrongcr = true
              }
            })
            .catch(error => {
              console.log(error)
              this.wrgmsg = error.data.message
              this.wrongcr = true

            })

          this.dialogUserDelete = false
        }
      },

    async fetchUsers(item) {
        
       await pause(1000) 
       
        return fetch(this.customers)
        
          .then(json => (item.children.push(...json)))
            .catch(err => console.warn(err))
      
      },
       async ofetchUsers(item) {

        await pause(1000)

        return fetch(this.operators)

          .then(json => (item.children.push(...json)))
          .catch(err => console.warn(err))

      },
     
  },
   
        
    created() {
      axios.get("/api/admin/showusers", {
        headers: {
          "ngrok-skip-browser-warning": true,
          "content-type": "application/json",
        },
      })
        .then((response) => {
          console.log(response);
          this.users = response.data.users;

          this.users.forEach((user) => {
            if (user.role === "Customer") {
              this.customers.push(user);
            } else if (user.role === "Operator") {
              this.operators.push(user);
            }
          });

          this.customers.forEach((user) => {
            user.name = user.f_name + " " + user.l_name;
          });

          this.operators.forEach((user) => {
            user.name = user.f_name + " " + user.l_name;
          });

        })
        .catch((error) => console.log(error));
    }

    
      }
  
  



  </script>