<template>
     <v-container class="operator-form">
      <v-overlay 
                    :value="loading" >
                <v-progress-circular
                  indeterminate
                  size="64"
                ></v-progress-circular>
              </v-overlay>
        <h1>Create operator account</h1>
        <p style="padding-top: 10px;"></p>
       
          <v-container>
          <v-form class="signform" ref="form" v-model="valid">
            <v-row>
              <v-col>
            <v-text-field
              v-model="signup.first_name"
              label="First Name"
              prepend-icon="person"
              :rules="nameRules"
              filled
              rounded
              dense
              required
            
             ></v-text-field>
            </v-col><v-col>
             <v-text-field
              v-model="signup.last_name"
              label="Last Name"
              :rules="nameRules"
              filled
              rounded
              dense
              required
             ></v-text-field></v-col>
            </v-row>
             <v-text-field
              v-model="signup.email"
              label="E-Mail"
              prepend-icon="email"
              filled
              rounded
              dense
              required
              type="email"
              :rules="emailRule"

             ></v-text-field>
            
             <v-text-field
              v-model="signup.address"
              label="Address"
              prepend-icon="mdi-map-marker"
              filled
              rounded
              dense
              required
              :rules="addressRule"
  
             ></v-text-field>
             <v-text-field
              v-model="signup.phone"
              label="Phone Number"
              prepend-icon="fa-phone"
              :rules="phoneRule"
              filled
              rounded
              dense
              required
             ></v-text-field>
                    <v-row>
                    <v-col>
                      <v-text-field
                        :rules="passwordRule"
                        id="password"
                        label="Password"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                        color="primary accent-3"
                        filled
                        rounded
                        dense
                        required
                        v-model="signup.password"
                      />
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="signup.password_confirmation"
                        :rules="passwordConfirmRule"
                        label="Confirm Password"
                        name="password"
                        prepend-icon="lock"
                        type="password"
                        color="primary accent-3"
                        required
                        filled
                        rounded
                        dense
                      />
                    </v-col>
                  </v-row>
           
            <div class="text-center my-4" >
                <v-btn
                  rounded
                  color="secondary"
                  dark
                  x-large
                  @click="signinMethod()"
                  style="font-size: large;"
                  width="250px"
                >
                  Sign up
                </v-btn>
              </div>
          
          </v-form>
        </v-container>
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
  account created successfully      
    </v-snackbar>
      </v-container>
</template>
<script>
import axios from 'axios'
export default {
   
  data() {
    return {



      show1: false,
      showLoginForm: true,
      password: '',
      wrongcr: false,
      successmsg: false,
      wrgmsg: '',
      valid: false,
      loading:false,

      login: {
        email: '',
        password: ''
      },
      signup: {
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        phone: '',
        password: '',
        password_confirmation: '',
      },

      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
        v =>
          (v.length >= 2 && v.length <= 20) ||
          'Name must be less than 10 and more than 2 characters'
      ],
      addressRule: [
        v => !!v || 'Address is required',
        v => v.length >= 5 || 'Address must be at least 5 characters long'
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
      ],

      passwordConfirmRule: [
        v => !!v || 'Password confirmation is required',
        v => v === this.signup.password || 'Passwords do not match',
      ],


    }
  },
  methods: {
    
    signinMethod() {
      this.$refs.form.validate()
      this.loading=true,
      axios
        .post(
          '/api/admin/createoperator',
          {

            f_name: this.signup.first_name,
            l_name: this.signup.last_name,
            address: this.signup.address,
            phone: this.signup.phone,
            email: this.signup.email,
            password: this.signup.password,
            headers: {
                "ngrok-skip-browser-warning": true,
                "content-type": "application/json",
              }
          }
          
        )
        .then(res => {
          console.log(res)
          if (res.data.status == "success") {
            this.successmsg = true
             this.loading = false

          }
        }).catch(error => {
          this.wrgmsg = error.data.message
          this.wrongcr = true
          this.loading = false


        })
    },


  }
}
</script>
<style scoped>

.operator-form {
 
  
  text-align: center;
  color:#A02520;
width: 70%;

}
</style>