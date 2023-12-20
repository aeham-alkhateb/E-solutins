<template>
  <v-container>
      <v-overlay 
                  :value="loading" >
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>
            </v-overlay>
            <v-overlay 
                    :value="lod" >
                <v-progress-circular
                  indeterminate
                  size="64"
                  color="primary"
                ></v-progress-circular>
              </v-overlay><v-row >
        <v-col v-for="(item,index) in packages" :key="item.id">
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
                    <v-list-item><v-list-item-title><b>Email Accounts:</b> {{ item.email_accounts }}</v-list-item-title></v-list-item>
                                <v-divider></v-divider>

                  <v-list-item><v-list-item-title><b>MySQL Accounts:</b> {{ item.mysql_accounts }}</v-list-item-title></v-list-item>
                  <v-divider></v-divider>

                  <v-list-item><v-list-item-title><b>SSL Certificate: </b> {{ item.ssl_certificate }}</v-list-item-title></v-list-item>

             </v-list>
            <div class="text-center my-4" >
                    <v-btn
                      rounded
                      color="secondary"
                      dark
                      x-large
                      @click="package_req = item.id,dialog = true,ind=index "
                      >
                      Request
                    </v-btn>
                  </div>
          </v-card>
          </div>
        </v-col>
        </v-row>



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

            <v-toolbar-title>{{ packages[ind].package_type }} Hosting Plan</v-toolbar-title>
            <v-spacer></v-spacer>
           
          </v-toolbar>
          <v-container>
          <v-list
            three-line
            subheader
          >             

          <v-list-item> 
             <v-list-item-content>
                    <v-list-item-title>Hosting plan details</v-list-item-title>
                   <v-col cols="5">
            <v-text-field
              label="Hoting plan name"
        
            ></v-text-field>
          </v-col>
      
      
          <v-col cols="5">
            <v-text-field
              label="Domain name"
              suffix=".com"
            ></v-text-field>
          </v-col>
                </v-list-item-content>
       
        
                        </v-list-item>
            <v-subheader>Al-Haram payment method</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>if you don't have Al-Haram receipt </v-list-item-title>
                <v-list-item-subtitle>Please go to any payment branch near you of Al-Haram to pay the following amount </v-list-item-subtitle>
                <v-list-item-title style="font-size: xx-large;">{{ packages[ind].yearly_price }}</v-list-item-title>
              </v-list-item-content>
              
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>if you have Al-Haram receipt</v-list-item-title>
                <v-list-item-subtitle>Please make sure that the amount sent in the receipt is {{ packages[ind].yearly_price }} </v-list-item-subtitle>
                <v-list-item-subtitle>then insert a clear picture of the receipt here </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-file-input
                  accept="image/*"
                  placeholder="Enter the receipt picture"
                  prepend-icon="mdi-camera"
                  label="Receipt"
                  v-model="haramreceipt"
                ></v-file-input>
            </v-list-item>
         

              <v-list-item>
               
                   <v-btn
                        rounded
                        color="secondary"
                        dark
                        x-large
                        @click="alharam()"
                        :loading="loading"
                        >
                        Request
                      </v-btn>
              </v-list-item>

           
          </v-list>
          <v-divider></v-divider>
          <v-list
            three-line
            subheader
          >
            <v-subheader>PayPal payment method</v-subheader>
            <v-list-item>
                
                   <v-btn
                        rounded
                        color="secondary"
                        dark
                        x-large
                        @click="paypale(), paybal_dialog=!paybal_dialog"
                        >
                        pay using paypal
                      </v-btn>
            </v-list-item>
          </v-list></v-container>
        </v-card>
         
          
      </v-dialog>
       <v-dialog
          v-model="paybal_dialog"
          fullscreen
          hide-overlay
          transition="dialog-bottom-transition"
        >
         <v-toolbar
              dark
              color="secondary"
            >
              <v-btn
                icon
                dark
                @click="paybal_dialog = false"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>            <v-spacer></v-spacer>
         </v-toolbar>
          <v-card width="100%" height="100%">
            <iframe :src="(`${url}`)" width="100%" height="100%" title="description"></iframe>
          </v-card>
      
        </v-dialog>
           <v-snackbar
                  v-model="done"
                  :timeout="4001"
                  :value="true"
                  absolute
                  color="success accent-2"
                  shaped
                  bottom
                >
                  Order added successfully   
                             </v-snackbar>
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
     
    </v-row>
    
  </template>
      </v-container>

</template>

<script>
import axios from 'axios'

export default {
          props: ['user'],

  data: () => ({
      dialog: false,
    package_req: 0,
      ind:0,
    sendData:{},
    packages: [{}],
    url: '',
    paybal_dialog: false,
    haramreceipt: null,
    loading: false,
    wrongcr: false,
    done: false,
    wrgmsg: '',
    absolute: true,
    lod: true,
    successurl: ''
     
  }), 

  methods: {
    changeClass(value) {
      return {
        'mod': value <2 ,
        'rev_mod': value >= 2,
        
      }
    },
    alharam() {
                this.loading = true

      const formData = new FormData();
      formData.append('customer_id', this.user.id);
      formData.append('hostingplan_id', this.package_req);
      formData.append('final_price', this.packages[this.ind].yearly_price);
      formData.append('receipt', this.haramreceipt);
      formData.append('request_type', 'Purchase');
      formData.append('hostingplan_type', this.packages[this.ind].package_type);


      axios
        .post('/api/customer/alharam', formData,{
            headers: {
              'Content-Type': `multipart/form-data; boundary=<calculated when request is sent>`
            }
        }

        )
      .then(res => {
        if (res.data.status == 'success') {

          console.log(res)
          this.loading = false
          this.done = true
          this.dialog = false
          this.wrgmsg = res.data.message

        } else {
            this.wrgmsg = res.data.message
            this.wrongcr = true
            this.loading = false
                    this.dialog = false

          }
        })
        .catch(error => {
          console.log(error)
          this.wrgmsg = error.data
          this.wrongcr = true
          this.loading = false
                    this.dialog = false

        })
    },
     paypale() {
      axios
        .post(
          '/api/customer/pay',
          {
            customer_id:this.user.id,
            package_id:this.package_req,
            final_price:this.packages[this.ind].yearly_price_outside_syria
          },
        
        )
        .then(res => {
          console.log(res)
          const dataToSave = { name: this.user.f_name, package: this.packages[this.ind].package_type };

          sessionStorage.setItem("requested_package", JSON.stringify(dataToSave));
          this.url = res.data.URL
         
        })
       
     
    },

    approve(order_id) {
      {
        const savedData = sessionStorage.getItem("requested_package");
        const parsedData = JSON.parse(savedData);
        this.loading = true
         const formData = new FormData();
        formData.append('username', parsedData.name);
        formData.append('domain', parsedData.name + '.com');
        formData.append('plan', parsedData.package);
        formData.append('password', "fsdkljf234@#EWDFF34234");

        axios.post(`api/customer/add-acc-test`, formData,{
          
          headers: {
            "ngrok-skip-browser-warning": true,

          }
        }).then((response) => {
          console.log(response)
          if (response.data.account_created == "Account was created successfully") {

            axios.post(`api/customer/approved/${order_id}`, {
                customer_id: this.user.id,
              hostingplan_id: this.packages[this.ind].id,
              price: this.packages[this.ind].yearly_price_outside_syria,
              headers: {
                "ngrok-skip-browser-warning": true,
                "content-type": "application/json",

              }
            }).then((response) => {
              console.log(response)
              window.location.href = 'http://localhost:8080/customer_mainpage'

              if (response.data.status == "Success") {
                this.successmsg = true
                this.wrgmsg = response.data.message

              }
              else {
                console.log(response)
                this.wrgmsg = res.data.message
                this.wrongcr = true
              }

            }).catch((error) => console.log(error))

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
    }


    
  },
   created() {
     {
     
      axios.get(`/api/customer/showpackages`, {
        headers: {
          "ngrok-skip-browser-warning": true,
          
        }
      }).then((response) => {
        console.log(response)
        this.packages = response.data.packages
        this.lod = false
      }).catch((error) => console.log(error))






        this.successurl = window.location.href
        const url = new URL(this.successurl);
        const searchParams = new URLSearchParams(url.search);
        const status = searchParams.get("status");
        const orderData = JSON.parse(decodeURIComponent(searchParams.get("order")));
      console.log(status);

        if (status == 'Payment_Complete.') {

          this.approve(orderData.id)
        }
      
    }
  }
}

</script>

<style>
.upper  {
    border-top-right-radius: 10px !important;
    border-bottom-right-radius: 60px !important;
    border-top-left-radius: 10px !important;
    border-bottom-left-radius: 60px !important;
    text-align: center;
}
.leftp  {
    border-top-right-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
    border-top-left-radius: 60px !important;
    border-bottom-left-radius: 60px !important;

}
.rightp  {
    border-top-right-radius: 60px !important;
    border-bottom-right-radius: 60px !important;
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
}
.bottom{
width: 75%;
left: 12%;
}
</style>