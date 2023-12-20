<template>
    <v-container>
       <v-overlay 
                    :value="loading" >
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
              </v-overlay>
     
    <v-row justify="center" class="space">
      
      <v-spacer></v-spacer>
      
      <v-col
        justify="center"
        cols="12"
        md="3"
        v-for="(item,index) in request"
        :key="item.id"
        
      ><v-card
      class="mx-auto"
      max-width="344"
    >
        <v-img
                :src="`https://3b9d-31-9-64-111.ngrok-free.app/receipts/${item.image}`"
                
                  cover
                ></v-img>
  
      <v-card-title >
        {{ item.customer_fname }} {{ item.customer_lname }}
 </v-card-title>
  
      <v-card-subtitle >

        {{ item.package_name }}      {{ item.request_type }}  </v-card-subtitle>
  
      <v-card-actions>
        <v-btn
          color="primary"
          variant="text"
          @click=" ShowRequestData(index) "
         rounded
        >
          Check On
        </v-btn>
  
       
      </v-card-actions>
  
     
    </v-card>
      </v-col>

      <v-spacer></v-spacer>

      <v-dialog v-model="Check_request" max-width="800px">
                     <vue-custom-scrollbar class="scroll-area">

          <v-card
              class="mx-auto"
              max-width="800px"
            >
              <v-img
              :src="`https://3b9d-31-9-64-111.ngrok-free.app/receipts/${request[check_id].image}`"
                height="400px"
                width="800px"
                cover
              ></v-img>

              <v-card-title>
              <h4>Customer Name:</h4>  {{ request[check_id].customer_fname }} {{request[check_id].customer_lname }}
              </v-card-title>

              <v-card-subtitle>
                <h4>Hosting Plan Name:</h4>{{request[check_id].package_name }}
                            </v-card-subtitle>
                             <v-card-subtitle>
                 <h4>Hosting Plan Price:</h4> {{ request[check_id].final_price }}{{ request[check_id].currency }}
                              </v-card-subtitle>
                                  <v-card-subtitle>
                   <h4>Request Date:</h4> {{ request[check_id].created_at }}
                                </v-card-subtitle>
                              <v-card-subtitle>
                     <h4>Request type:</h4> {{ request[check_id].request_type }}
                                  </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="edit" text @click="disapp = true">Disapprove</v-btn>
            <v-btn color="edit" text @click="save=true">Approve</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
                     </vue-custom-scrollbar>
      </v-dialog>
            <v-dialog v-model="save" max-width="600px">
        <v-card>
         
          <v-card-title class="font-weight-bold te justify-center" style="">Are you Sure you want to approve the request?</v-card-title>
        
          <v-card-actions>
          
            <v-spacer></v-spacer>
            <v-btn color="primary"  class="font-weight-bold te" text @click="reqest()" :loading="loading">Yes</v-btn>
           
            <v-btn color="primary" class="font-weight-bold te" text @click="save = false">No</v-btn>
            <v-spacer></v-spacer>
          
          </v-card-actions>
      
        </v-card>
      </v-dialog>
           <v-dialog v-model="disapp" max-width="600px">
          <v-card>
         
            <v-card-title class="font-weight-bold te justify-center" style="">Are you Sure you want to disapprove the request?</v-card-title>
        
            <v-card-actions>
          
              <v-spacer></v-spacer>
              <v-btn color="primary"  class="font-weight-bold te" text @click="disapprove()"   :loading="loading"  >Yes</v-btn>
           
              <v-btn color="primary" class="font-weight-bold te" text @click="disapp = false">No</v-btn>
              <v-spacer></v-spacer>
          
            </v-card-actions>
      
          </v-card>
        </v-dialog>
    </v-row>
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
              Operation <strong>copmleted</strong> successfully      
                </v-snackbar>
</v-container>
  </template>
  <script>
  import axios from 'axios'
  import vueCustomScrollbar from 'vue-custom-scrollbar'

  export default {
    data: () => ({
      Check_request:false,
      check_id:0,
      request:[],
      save: false,
      wrongcr: false,
      wrgmsg: '',
        disapp: false,
        successmsg: false,
      loading:false

}),
methods: {
 
    ShowRequestData(item) {
      this.Check_request=!this.Check_request 
      this.check_id=item
    
    },
    reqest() {
        if (this.request[this.check_id].request_type == 'Upgrade') { this.approveupdate() }
      else if (this.request[this.check_id].request_type == 'Purchase') { this.approve() }
      else{this.approveReactive()}
    },
    approve() {
      { 
        this.loading=true
          axios.post(`api/admin/add-acc-test`, {
            username: this.request[this.check_id].customer_fname,
            domain: this.request[this.check_id].customer_fname+'.com',
            plan: this.request[this.check_id].package_name,
            password:"fsdkljf234@#EWDFF34234",
            headers: {
              "ngrok-skip-browser-warning": true,

            }
          }).then((response) => {
            console.log(response)
              if (response.data.account_created == "Account was created successfully") {
              
              axios.post(`api/approved/${this.request[this.check_id].order_id}`, {
                customer_id: this.request[this.check_id].customer_id,
                hostingplan_id: this.request[this.check_id].hostingplan_id,
                 price:this.request[this.check_id].final_price,
               
                headers: {
                  "ngrok-skip-browser-warning": true,
                  "content-type": "application/json",

                }
              }).then((response) => {
                console.log(response)
                
                  this.successmsg = true
                  this.wrgmsg = response.data.message

              

            }).catch((error) => {
              console.log(error)
            this.wrgmsg = response.data.message
            this.wrongcr = true
            })

            }
            else {
              console.log(response)
              this.wrgmsg = response.data.message
              this.wrongcr = true
            }

            this.loading = false
              this.Check_request = false,
                this.save = false
                this.getdata()


          }).catch((error) => console.log(error))
        }


    
  },
      approveReactive() {
        {
          this.loading = true
          axios.post(`api/unsus-acc`, {
            account: this.request[this.check_id].customer_fname,
            headers: {
              "ngrok-skip-browser-warning": true,

            }
          }).then((response) => {
               this.successmsg = true
            this.wrgmsg = response.data.message
            console.log(response)
           
            this.loading = false
            this.Check_request = false,
              this.save = false


          }).catch((error) => {
            console.log(error)
            this.wrgmsg = response.data.message
            this.wrongcr = true
          })
        }



      },

  


    approveupdate() {
      {
        this.loading = true
        axios.post(`api/change-plan`, {
          account: this.request[this.check_id].customer_fname,
          package: this.request[this.check_id].package_name,
          headers: {
            "ngrok-skip-browser-warning": true,
            "content-type": "application/json",

          }
        }).then((response) => {
          console.log(response)
          if (response.data == "success") {

            axios.post(`/api/admin/upgrade/${this.request[this.check_id].hostingplan_id}`, {
            
              headers: {
                "ngrok-skip-browser-warning": true,
                "content-type": "application/json",

              }
            }).then((response) => {
              console.log(response)

              this.successmsg = true
              this.wrgmsg = response.data.message



            }).catch((error) => {
              console.log(error)
              this.wrgmsg = response.data.message
              this.wrongcr = true
            })

          }
          else {
            console.log(response)
            this.wrgmsg = response.data.message
            this.wrongcr = true
          }

          this.loading = false
          this.Check_request = false,
            this.save = false


        }).catch((error) => console.log(error))
      }
  },







    disapprove() {
              this.loading = true

     axios.post(`api/admin/disapproved/${this.request[this.check_id].order_id}`, {

          headers: {
            "ngrok-skip-browser-warning": true,
            "content-type": "application/json",

          }
        }).then((response) => {
          console.log(response)
         
            this.successmsg = true
          }).catch((error) => {
          console.log(error)
            this.wrgmsg = error.data.message
          this.wrongcr = true
            })
              this.loading = false
        this.Check_request = false,
          this.disapp = false
              this.getdata()

    },
    getdata() {

        axios.get(`/api/admin/showorders`, {
          headers: {
            "ngrok-skip-browser-warning": true
          }
        }).then((response) => {
          console.log(response)
          this.request = response.data.orders

        }).catch((error) => console.log(error))
      }


  },
  created() {
    this.getdata()
    }
,
   components: {
      vueCustomScrollbar
    },
  }
  </script>
  <style scoped>
  .scroll-area {
    height: 600px;
  }
  </style>