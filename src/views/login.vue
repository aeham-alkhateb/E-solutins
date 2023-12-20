
<template>
  <v-app class="body">
    <div class="rrow">
    
      <v-card   class="left_panlerounded-l-xl" elevation="0"  style="z-index: 1; background-color: #7f0804 ;">
      
        <lottie-animation
          ref="anim"
          :animationData="require('@/assets/theme/113207-wondercave-header.json')"
          :autoPlay="true"
          :speed="2"
          style="z-index: 2;position: absolute;display:inline-grid;left: 1;"
          @complete="complete"
          @enterFrame="enterFrame"
          @segmentStart="segmentStart"
          @stopped="stopped"
          loop
        />
      </v-card>
  
      <transition name="slide" mode="out-in">
          <div  class="signup-form" v-show="!showLoginForm">
        <h1>Welcome to E-Solutions</h1>
        <p style="padding-top: 10px;">Create your account</p>
        <v-container>
        <v-form class="signform" ref="formsign" v-model="valid">
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
            v-model="signup.commpany_name"
            label="Company Name"
            prepend-icon="fa-building"
            filled
            rounded
            dense
            required
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
               <h6 class="text-h6 text-medium-emphasis d-flex align-center mt-6 font-weight-medium">Already have an Account?
              <v-btn @click="showLoginForm = true" rounded text style="color:#305BBD;padding-top: 2px;">Sign in</v-btn></h6>
        </v-form>
      </v-container>
      </div>
    </transition>
    <transition name="slide" mode="out-in">

      <div ref="loginForm" class="login-form" v-show="showLoginForm">
        <h1>Welcome to E-Solutions</h1>
        <p style="padding-top: 10px;">Login to Your Dashboard</p>
        <v-container>
        <v-form class="logform" ref="formlog" v-model="valid"  >
          <v-text-field
            v-model="login.email"
            label="E-Mail"

            filled
            rounded
            dense
            :rules="emailRule"
            required
           ></v-text-field>
           <v-text-field
            v-model="login.password"
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
          <a style="color:#305BBD;padding-top: 40px;">Forgot Password ?</a>
          <div class="text-center my-4" style="padding-top: 20px;">
              <v-btn
                rounded
                color="secondary"
                dark
                x-large
                style="font-size: large;"
                width="250px"
               @click="loginMethod()"
              >
                Log in
              </v-btn>
            </div>
           <h6 class="text-h6 text-medium-emphasis d-flex align-center mt-6 font-weight-medium gray-text">Don't have account?
            <v-btn text @click="showSignupForm" style="color:#305BBD;padding-top: 2px;" rounded>Create an account</v-btn></h6>
        </v-form>
      </v-container>
      </div>
    </transition>

        </div>
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
  </v-app>
</template>

<script>
import LottieAnimation from 'lottie-web-vue'
import axios from 'axios'

export default {

  data() {
    return {



      show1: false,
      showLoginForm: true,
      password: '',
      wrongcr: false,
      wrgmsg: '',
      valid: true,


      login: {
        email: '',
        password: ''
      },
      signup: {
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        commpany_name: '',
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
  components: {
    LottieAnimation,
    
  },
  
  methods: {
    
    showSignupForm() {
      this.showLoginForm = false;
    },
    showLoginForm() {
      this.showLoginForm = true;
    },
    loginMethod() {
      this.$refs.formlog.validate()

      axios
        .post(
          '/api/login',
          
          {
             email: this.login.email,
            password: this.login.password,
             headers: {
              "ngrok-skip-browser-warning": true,
              "content-type": "application/json",
            }
          }
        )
        .then(res => {
          console.log(res)
          if (res.data.status == 'success') {
            if (res.data.role == 'Admin') {
               localStorage.setItem('token', res.data.access_token)
              this.$router.push('/mainpage')
             
                        console.log(localStorage.getItem('token'))



            } else if (res.data.role == 'Customer') {
              localStorage.setItem('token', res.data.access_token)
              this.$router.push('/Customer_mainpage')

            } else {
              localStorage.setItem('token', res.data.access_token)
              this.$router.push('/operator_mainpage')
            }
          } else {
            this.wrgmsg = 'Check the E-mail or password'
            this.wrongcr = true
          }
        }).catch(error => {
          this.wrgmsg = error.response.data.message
          this.wrongcr = true

        })
    },

    signinMethod() {
      this.$refs.formsign.validate()
      axios
        .post(
          '/api/register',
          {
           
            f_name: this.signup.first_name,
            l_name: this.signup.last_name,
            address: this.signup.address,
            phone: this.signup.phone,
            email: this.signup.email,
            password: this.signup.password,
            company_name: this.signup.commpany_name

          }
        )
        .then(res => {
          console.log(res)
          if (res.data.status == 'success') {
            localStorage.setItem('token', res.data.access_token)
            window.location.href = "/Customer_mainpage"
          }
        }).catch(error => {
          this.wrgmsg = error.response.data.message
          this.wrongcr = true

        })
    },



  },

}
</script>

<style >
#app .body{
  background-color:#F6F6F6;
  display: flex;
  display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
  
}
.left_panlerounded-l-xl {
  background-color: #7f0804;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 500px !important;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;

  margin-right: 0px;
  
  width: 60%;
  height: 100%;

}

.rrow {
    display: flex;
    flex-wrap: wrap;
    flex: 1 1 auto;
   
}




.login-form {
  position: absolute;
  right: 0;
  top: 0;
  
  text-align: center;
padding-top: 10%;
color:#A02520;
width: 40%;
}

.signup-form {
  position: absolute;
  right: 0;
  top: 0;
  
  text-align: center;
  color:#A02520;
width: 38%;

}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s ease-in-out;}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}


.v-text-field--filled {
    border-radius: 4px 0 0 40px;
}

</style>
