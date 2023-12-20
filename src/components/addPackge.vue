<template>
  <v-container>
   <v-overlay 
                  :value="loading" >
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay>
    <v-row >
        <v-col v-for="(item, index) in packages" :key="item.id">
            <div style="max-width: 270px;">
          <v-card  class="upper" elevation="7"  >
             <v-card-subtitle style="font-size:40px;">{{ item.package_type }}</v-card-subtitle>
           <v-img
                      max-width="150px"
                      :src="require('@/assets/img/' + item.package_type + '.png')"
                      style="left: 25%; "
                    >
             
                    </v-img>
             <v-card-subtitle><h1>{{ item.yearly_price}}</h1><p>SYP</p></v-card-subtitle>
          
           
            <v-divider></v-divider>
           
           <v-list>
            <v-list-item><v-list-item-title><b>Bandwidth:</b> {{ item.bandwidth }}</v-list-item-title></v-list-item>
                <v-divider></v-divider>
                  <v-list-item><v-list-item-title><b>Email Accounts:</b> {{ item.email_accounts}}</v-list-item-title></v-list-item>
                              <v-divider></v-divider>

                <v-list-item><v-list-item-title><b>MySQL Accounts:</b> {{ item.mysql_accounts }}</v-list-item-title></v-list-item>
                <v-divider></v-divider>

                <v-list-item><v-list-item-title><b>SSL Certificate: </b> {{ item.ssl_certificate }}</v-list-item-title></v-list-item>

           </v-list>
            <div class="text-center my-4" ><v-container>
                    <v-btn
                      rounded
                      color="secondary"
                      dark
                      x-large
                      @click="dialog = true ,package_req = item.id, ind=index"
                      >
                      edit
                    </v-btn>
                  
                      <v-btn
                        rounded
                        color="secondary"
                        dark
                        large
                        @click="dialogpackDelete=true"
                        icon
                        >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                      </v-container>
                    </div>
          </v-card>
          </div>
        </v-col>
        </v-row>
<v-btn rounded @click="addnew=true" color="secondary">Create New Package</v-btn>

   <template>
      <v-row justify="center">
        <v-dialog
          v-model="dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
        
          <v-card>
            <v-toolbar
              dark
              color="secondary"
            >
              <v-btn
                icon
                dark
                @click="dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>            <v-spacer></v-spacer>

              <v-toolbar-title><strong>Edit</strong> {{ packages[ind].package_type }} Hosting Plan</v-toolbar-title>
              <v-spacer></v-spacer>
           
            </v-toolbar>
            <v-container>
            <template>
      <v-container>
        <v-card>
          <v-container>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-list >
          <v-row>
            <v-col> 
        <v-text-field v-model="packages[ind].package_type"  label="Package Name" required></v-text-field>
        </v-col><v-col>
        <v-text-field v-model="packages[ind].space"  label="Space" required></v-text-field>  </v-col>
        </v-row><v-row><v-col>
        <v-text-field v-model="packages[ind].bandwidth"  label="Bandwidth" required></v-text-field></v-col><v-col>
        <v-text-field v-model="packages[ind].email_accounts"   label="E-mail Accounts" required></v-text-field></v-col>
        </v-row><v-row><v-col>
        <v-text-field v-model="packages[ind].mysql_accounts"   label="MySQL Accounts" required></v-text-field></v-col><v-col>
        <v-text-field v-model="packages[ind].php_enabled"  label="php Enable" required></v-text-field></v-col>
      </v-row>
      <v-row><v-col>
          <v-text-field v-model="packages[ind].ssl_certificate"  label="SSL certificate" required></v-text-field></v-col><v-col>
          <v-text-field v-model="packages[ind].duration"  label="Duration" required></v-text-field></v-col>
        </v-row>
      <v-row><v-col>
          <v-text-field v-model="packages[ind].yearly_price"   label="Yearly Price" required></v-text-field></v-col><v-col>
          <v-text-field v-model="packages[ind].yearly_price_outside_syria"   label="Yearly price Outside Syria" required></v-text-field></v-col>
        </v-row>
         <div class="text-center my-4" >
                    <v-btn
                      rounded
                      color="secondary"
                      dark
                      x-large
                      style="font-size: large;"
                      width="250px"
                      @click="editPackage()"
                    >
                      Update
                    </v-btn>
                  </div>
        </v-list>
      </v-form>
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
        package updated successfully      
          </v-snackbar>
      </v-container>  
      </v-card>
      </v-container>
    </template>
  
        </v-container>
</v-card></v-dialog></v-row></template>













  <template>
        <v-row justify="center">
          <v-dialog
            v-model="addnew"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
          >
        
            <v-card>
              <v-toolbar
                dark
                color="secondary"
              >
                <v-btn
                  icon
                  dark
                  @click="addnew = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>            <v-spacer></v-spacer>

                <v-toolbar-title><strong>New</strong>  Hosting Plan</v-toolbar-title>
                <v-spacer></v-spacer>
           
              </v-toolbar>
              <v-container>
              <template>
        <v-container>
          <v-card>
            <v-container>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-list >
            <v-row>
              <v-col> 
          <v-text-field v-model="sendData.Package_Name"  label="Package Name" required></v-text-field>
          </v-col><v-col>
          <v-text-field v-model="sendData.space"  label="Space" required></v-text-field>  </v-col>
          </v-row><v-row><v-col>
          <v-text-field v-model="sendData.Bandwidth"  label="Bandwidth" required></v-text-field></v-col><v-col>
          <v-text-field v-model="sendData.Email_Accounts"   label="E-mail Accounts" required></v-text-field></v-col>
          </v-row><v-row><v-col>
          <v-text-field v-model="sendData.MySQL_Accounts"   label="MySQL Accounts" required></v-text-field></v-col><v-col>
          <v-text-field v-model="sendData.php_enable"  label="php Enable" required></v-text-field></v-col>
        </v-row>
        <v-row><v-col>
            <v-text-field v-model="sendData.ssl_certificate"  label="SSL certificate" required></v-text-field></v-col><v-col>
            <v-text-field v-model="sendData.Duration"  label="Duration" required></v-text-field></v-col>
          </v-row>
        <v-row><v-col>
            <v-text-field v-model="sendData.Yearly_Price"   label="Yearly Price" required></v-text-field></v-col><v-col>
            <v-text-field v-model="sendData.Yearly_price_Outside_Syria"   label="Yearly price Outside Syria" required></v-text-field></v-col>
          </v-row>
           <div class="text-center my-4" >
                      <v-btn
                        rounded
                        color="secondary"
                        dark
                        x-large
                        style="font-size: large;"
                        width="250px"
                        @click="savePackage()"
                      >
                        Create
                      </v-btn>
                    </div>
          </v-list>
        </v-form>
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
                    v-model="successmsgcrt"
                    :timeout="4001"
                    :value="true"
                    absolute
                    color="success accent-2"
                    shaped
                    bottom
                  >
          package created successfully      
            </v-snackbar>
        </v-container>  
        </v-card>
        </v-container>
      </template>
  
          </v-container>
  </v-card></v-dialog></v-row></template>
  <v-dialog v-model="dialogpackDelete" max-width="500px">
            <v-card>
              <v-card-title
                >Are you sure you want to delete this packge?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="edit" text @click="dialogpackDelete = false">Cancel</v-btn>
                <v-btn color="edit" text @click="deletepackge()">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    ind: 0,
    successmsgcrt:false,
    dialogpackDelete:false,
    dialog: false,
    addnew:false,
    package_req: 0,
    packages: [{}],
    url: '',
    loading:true,
    successmsg: false,
    wrongcr: '',
    wrgmsg: false,
    sendData: {
      Package_Name: "",
      space: "",
      Bandwidth: "",
      Email_Accounts: "",
      MySQL_Accounts: "",
      php_enable: "",
      ssl_certificate: "",
      Duration: "",
      Yearly_Price: "",
      Yearly_price_Outside_Syria: "",
      available: 1
    }
    }),

    methods: {
     
     
      filterItems: function (e) {
        console.log(JSON.stringify(this.sendData))
      },
      savePackage() {
        axios
          .post(
            '/api/admin/addpackage',
            {
              package_type: this.sendData.Package_Name,
              space: this.sendData.space,
              bandwidth: this.sendData.Bandwidth,
              email_accounts: this.sendData.Email_Accounts,
              mysql_accounts: this.sendData.MySQL_Accounts,
              php_enabled: this.sendData.php_enable,
              ssl_certificate: this.sendData.ssl_certificate,
              duration: this.sendData.Duration,
              yearly_price: this.sendData.Yearly_Price,
              yearly_price_outside_syria: this.sendData.Yearly_price_Outside_Syria,
              available: 1
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
            this.wrgmsg = error.data.message
            this.wrongcr = true

          })

      },
      deletepackge() {
       this.dialogpackDelete=false
        axios
          .delete(
          `/api/admin/deletepackage/${this.package_req}`
          )
          .then(res => {
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
      },
    editPackage() {
      axios
        .put(
          `/api/admin/updatepackage/${this.package_req}`,
          {
            package_type: this.packages[this.ind].package_type,
            space: this.packages[this.ind].space,
            bandwidth: this.packages[this.ind].bandwidth,
            email_accounts: this.packages[this.ind].email_accounts,
            mysql_accounts: this.packages[this.ind].mysql_accounts,
            php_enabled: this.packages[this.ind].php_enabled,
            ssl_certificate: this.packages[this.ind].ssl_certificate,
            duration: this.packages[this.ind].duration,
            yearly_price: this.packages[this.ind].yearly_price,
            yearly_price_outside_syria: this.packages[this.ind].yearly_price_outside_syria,
            available: 1,
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

      },
      GetAllData() {
      {
        this.loading = true

        axios.get(`/api/admin/showpackages`, {
          headers: {
            "ngrok-skip-browser-warning": true,
            "content-type": "application/json",
            "Accept": "application/json"
          }
        }).then((response) => {
          console.log(response)
          this.packages = response.data.packages
          this.loading = false
        }).catch((error) => console.log(error))
      }


        
    }
    },
    created() {
      this.GetAllData()

    }


  }
</script>

<style>
</style>
