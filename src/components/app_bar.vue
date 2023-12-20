<template>
  <v-app-bar
    absolute
    color="secondary"
    dark
    scroll-target="#scrolling-techniques-2"
    elevation="0"
  >
  <v-app-bar-nav-icon @click="Mini_SideBar()"></v-app-bar-nav-icon>

    <v-toolbar color="rgba(0,0,0,0)" flat >
     
      <v-spacer></v-spacer>
    </v-toolbar
    >
    <v-spacer></v-spacer>
   <v-menu 
           v-model="profile_menu"
          :close-on-content-click="false"
          offset-y
            transition="slide-y-transition"
            rounded="b-xl"
            >
           <template v-slot:activator="{ on, attrs }">
      
              <v-btn icon  v-bind="attrs"
                v-on="on" > 
                <v-icon large>fa-user</v-icon>
              </v-btn>
      
       
      
        
          </template>
         <v-card>
              <v-list>
                <v-list-item>
                  <v-list-item-avatar>
                    <img
                      src="@/assets/img/download.svg"
                      alt="John"
                    >
                  </v-list-item-avatar>

                  <v-list-item-content>
                    <v-list-item-title>{{ user.f_name }} {{ user.l_name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ user.company_name }}</v-list-item-subtitle>
                  </v-list-item-content>

                 <v-list-item-icon>
              </v-list-item-icon>
                </v-list-item>
              </v-list>

              <v-divider></v-divider>
    <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-phone
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ user.phone }}</v-list-item-title>
              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>

          
          </v-list-item>


          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-email
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ user.email }}</v-list-item-title>
              <v-list-item-subtitle>E-mail</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>


          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo">
                mdi-map-marker
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ user.address }}</v-list-item-title>
              <v-list-item-subtitle>Address</v-list-item-subtitle>

            </v-list-item-content>
          </v-list-item>
        </v-list>
              <v-card-actions>

                <v-btn
                  color="primary"
                  rounded
                  @click="logout = true"
                  width="320px"
                >
                  Logout
                </v-btn>
              </v-card-actions>
            </v-card>
        </v-menu>
    <v-dialog v-model="logout" max-width="500px">
      <v-card>
         
        <v-card-title class="font-weight-bold te justify-center" style="">Are you Sure?</v-card-title>
        
        <v-card-actions>
          
          <v-spacer></v-spacer>
          <v-btn color="primary"  class="font-weight-bold te" text @click="Logout()">Yes</v-btn>
           
          <v-btn color="primary" class="font-weight-bold te" text @click="logout = false">No</v-btn>
          <v-spacer></v-spacer>
          
        </v-card-actions>
      
      </v-card>
    </v-dialog>




      <v-dialog
            max-width="500"
            v-model="edit_profile"
          >
               <vue-custom-scrollbar class="scroll-area">

      
        <v-card
        class="mx-auto"
        style="max-width: 500px;"
      >
   
        <v-toolbar
          color="primary accent-4"
          cards
          dark
          flat
        >
        
          <v-card-title class="text-h6 font-weight-regular">
            Edit Profile
          </v-card-title>
       
        </v-toolbar>
        <v-form
          ref="form"
          v-model="form"
          class="pa-4 pt-6"
          
        >
        
          <v-text-field
            v-model="user.f_name"
            filled
            rounded
            color="primary"
            label="First name"
            :rules="nameRules"

          ></v-text-field><v-text-field
              v-model="user.l_name"
              filled
              rounded
              color="primary"
              label="Last name"
              :rules="nameRules"

            ></v-text-field>
          <v-text-field
              v-model="user.email"
              filled
              rounded
              color="primary"
              label="email"
              :rules="emailRule"

            ></v-text-field>
            <v-text-field
              v-model="user.phone"
              filled
              rounded
              color="primary"
              label="Phone number"
              :rules="phoneRule"

            ></v-text-field>
            <v-text-field
                v-model="user.address"
                filled
                rounded
                color="primary"
                label="Address"
                :rules="addressRule"

              ></v-text-field>
               <v-text-field
                  v-model="user.company_name"
                  filled
                  rounded
                  color="primary"
                  label="Company name"

                ></v-text-field>
        
        </v-form>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            text
            @click="edit_profile = false"
            color="primary"
          >
            close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            
            class="white--text"
            color="primary accent-4"
            depressed
            @click="confirmpass = true"
          >
            Submit
          </v-btn>
        </v-card-actions>
     
      </v-card>
      
      
      
      
      
               </vue-custom-scrollbar>




               <v-dialog v-model="confirmpass" max-width="400px">
                <v-card>
                  <v-card-title>Enter your password</v-card-title>
                  <v-form  ref="form"
            v-model="form"
            class="pa-4 pt-6">
          <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="Password"
              filled
              rounded
              dense
              :rules="passwordRule"

              @click:append="show1 = !show1"
            ></v-text-field>
          </v-form>
                   <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              text
              @click="confirmpass = false"
              color="primary"
            >
              Cancle
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
                        :disabled="!form"

              class="white--text"
              color="primary accent-4"
              depressed
              @click="save_edit()"
            >
              Confirm
            </v-btn>
          </v-card-actions>
                </v-card>

               </v-dialog>
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
            User profile <strong>Changed</strong> successfully      
              </v-snackbar>
  </v-app-bar>
  
</template>
<script>
import vueCustomScrollbar from 'vue-custom-scrollbar'

 import axios from "axios";
export default {
  props: ['user'],
  
  data() {
    return {
    edit_profile:false,
      logout: false,
      mini:true,
    menu: false,
   wrongcr: false,
      wrgmsg: '',
      successmsg: false,
     confirmpass:false,
      password:'',
            show1: false,





        nameRules: [
        v => !!v || 'Name is required',
        v =>
          (v.length >= 2 && v.length <= 20) ||
          'Name must be less than 10 and more than 2 characters'
      ],
      addressRule: [
        v => !!v || 'Address is required',
        v => v.length >= 2 || 'Address must be at least 2 characters long'
      ],
      phoneRule: [
        v => !!v || 'Phone number is required',
        v => /^\d+$/.test(v) || 'Phone number must contain numbers only'
      ],

      email: '',
      emailRule: [
        v => !!v || 'Email is required',
        v => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(v) || 'Invalid email address'
      ],


      passwordRule: [
        v => !!v || 'Password is required',
        v => v.length >= 4 || 'The password field must be at least 4 characters.'

      ],

      passwordConfirmRule: [
        v => !!v || 'Password confirmation is required',
        v => v === this.signup.password || 'Passwords do not match',
      ],
    }
   },
   
 methods: {
  Mini_SideBar() {
      this.$store.commit("Mini_SideBar");
    }
   ,
   save_edit() {
      this.$refs.form.validate()
      axios
        .post(
          '/api/customer/confirmpassword',
        { password:this.password  },
          {
            headers: {
              'Content-Type': `multipart/form-data`
            }
          }
        )
        .then(res => {
          console.log(res)
          if (res.data.status == 'success') { 
             axios
              .put(
                `/api/admin/updateoperator/${this.user.id}`,
                {
                  f_name: this.user.f_name,
                  l_name: this.user.l_name,
                  address: this.user.address,
                  phone: this.user.phone,

                  company_name: this.user.company_name,
                  headers: {
                    "ngrok-skip-browser-warning": true,
                    "content-type": "application/json",
                  }
                },

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
              }).catch(error => {
                console.log(error)
                this.wrgmsg = error.data
                this.wrongcr = true

              })
          }
          else{
            console.log(res)
            this.wrgmsg = res.data.message
            this.wrongcr = true
          }
        })
        .catch(error => {
          console.log(error)
          this.notdone = true
          this.loading = false
        })
     
    
  },
  
    Logout() {
     
      axios.post(`/api/logout`, {
           headers: {
          "ngrok-skip-browser-warning": true,
          "content-type": "application/json",
        }
      }).then(res => {
        console.log(res)
        if (res.data.status == 'success') {
          localStorage.removeItem('token')
          this.$router.push('/login')
        }
      }).catch(error => {
        this.wrgmsg = error.response.data.message
        this.wrongcr = true

      })
     
    }
  },
   mounted() {
    
  
  },
 
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