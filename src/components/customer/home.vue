<template>
    <v-container>
        <v-sheet
        class="mx-auto mod2"
        elevation="8"
        max-width="1130"
        
      >
     <header style="font-size: x-large; font-weight: 500; color: #A02520;">Your Hosting Plans</header>
        <v-slide-group
          v-model="model"
          class="pa-4"
          show-arrows
          
        >
                <v-btn v-show="user.packages.length === 0" @click="setView('hosting_plans')" color='white lighten-1 primary--text'   elevation="8"
     height="130" class="ma-4 mod"
                      width="300"> Purchase Hosting Plan</v-btn>
          <v-slide-item
            v-for="(item,index) in user.packages"
            :key="index"
            v-slot="{ active, toggle }"
            class="mod"
          >
          
            <v-card
              :color="active ? 'primary' : 'white lighten-1'"
              v-on:click="selectpacakge(item),usedpack=index"
              class="ma-4 mod"
              height="230"
              width="300"
              @click="toggle"
              elevation="8"
            >
                 <v-card-subtitle style="font-size:40px;"  :class="active ? 'white--text lighten-1':'secondary--text'">{{ item.package_name }}</v-card-subtitle>
                <v-img
                  max-width="150px"
                  :src="require('@/assets/img/' + item.package_name + '.png')"
                  style="left: 25%; "
                >
             
                </v-img>
               <v-card-subtitle></v-card-subtitle>
          
           
          
            </v-card>
          </v-slide-item>
        </v-slide-group>
<v-divider></v-divider>
          <v-sheet
            
            class="mod"
          >
        <v-row style="margin-top: 2%;">
            <v-col><v-container>
              <apexchart  type="donut" :options="options" :series="[ 1* used, 1* space - used]" ></apexchart>
              <v-btn
      color="secondary"
      elevation="2"
      large
      @click="reactivatdialog = !reactivatdialog"
      v-show="user.packages.length !== 0"
  >reactivate</v-btn>
              <v-btn outlined class="mr-4" color="primary darken-2"    v-show="user.packages.length !== 0"   elevation="2" @click="dialog=!dialog"
    >upgrade</v-btn><v-container v-show="user.packages.length !== 0"><v-expansion-panels
          v-model="Cpanel"
          focusable
        >
      <v-expansion-panel>
            <v-expansion-panel-header>Your Cpanel</v-expansion-panel-header>
            <v-expansion-panel-content>
           <strong>click <a href="https://hosting.e-solutionsgroup.org:2083">here</a> to login</strong>   <br>
              <strong>Username :</strong>  {{ user.f_name }} <br>
              
              <strong>Password :</strong>  fsdkljf234@#EWDFF34234<br>
             <strong>Your Domain :</strong>  {{ user.f_name }}.com <br>
             note: "this is a default Password please change it"

            </v-expansion-panel-content>
          </v-expansion-panel></v-expansion-panels></v-container>
            </v-container>

      
            </v-col>
            <v-col><v-container><calender :user="user"></calender></v-container></v-col>
          </v-row>
          </v-sheet>
      </v-sheet>

















                  <template>
    
          <v-row justify="center">
              <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

                  <v-card>
                      <v-toolbar dark color="secondary">
                          <v-btn icon dark @click="dialog = false">
                              <v-icon>mdi-close</v-icon>
                          </v-btn> <v-spacer></v-spacer>

                          <v-toolbar-title><strong>Upgrade</strong> Hosting Plan from {{ item.package_name }}</v-toolbar-title>
                          <v-spacer></v-spacer>

                      </v-toolbar>
                      <v-container>
                          <v-list three-line subheader>
                              <v-subheader>Al-Haram payment</v-subheader>
                              <v-list-item>
                                  <v-list-item-content>
                                      <v-list-item-title>if you don't have Al-Haram receipt </v-list-item-title>
                                      <v-list-item-subtitle>Please go to any payment branch near you of Al-Haram to pay the
                                          following amount </v-list-item-subtitle>
                                      <v-list-item-title style="font-size: xx-large;">{{allpackages[updatepackage].yearly_price}}</v-list-item-title>
                                  </v-list-item-content>

                              </v-list-item>
                              <v-list-item>
                                  <v-list-item-content>
                                      <v-list-item-title>if you have Al-Haram receipt</v-list-item-title>
                                      <v-list-item-subtitle>Please make sure that the amount sent in the receipt is {{ allpackages[updatepackage].yearly_price }} </v-list-item-subtitle>
                                      <v-list-item-subtitle>then insert a clear picture of the receipt here
                                      </v-list-item-subtitle>
                                  </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                  <v-file-input accept="image/*" placeholder="Enter the receipt picture" prepend-icon="mdi-camera"
                                      label="Receipt" v-model="haramreceipt"></v-file-input>
                              </v-list-item>
                              <v-list-item>
                                <v-select
                                v-if="item.package_name == 'GOLD'"
                                      :items="goldallpacakes"
                                          label="Upgrade to .."
                                        item-value="id"
                                      item-text="package_type"
                                      v-model="updatepackage"
                                    ></v-select>
                                    <v-select
                                        v-if="item.package_name == 'SILVER'"

                                        :items="selverallpacakes"
                                          label="Upgrade to .."
                                          item-value="id"
                                        item-text="package_type"
                                        v-model="updatepackage"
                                      ></v-select>
                                      <v-select
                                      v-if="item.package_name=='BRONZE'"
                                        :items="bronzallpacakes"
                                        label="Upgrade to .."
                                        item-value="id"
                                        item-text="package_type"
                                        v-model="updatepackage"
                                      ></v-select>

                          
                              </v-list-item>
                              <v-list-item>

                                  <v-btn rounded color="secondary" dark x-large @click="upgrade_alharam()" :loading="loading">
                                      Request
                                  </v-btn>
                              </v-list-item>


                          </v-list>
                          <v-divider></v-divider>
                          <v-list three-line subheader>
                              <v-subheader>Other payment method</v-subheader>
                              <v-list-item>

                                  <v-btn rounded color="secondary" dark x-large @click="paypale(), paybal_dialog = !paybal_dialog">
                                      pay using paypal
                                  </v-btn>
                              </v-list-item>
                          </v-list></v-container>
                  </v-card>


              </v-dialog>
              <v-dialog v-model="paybal_dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                  <v-toolbar dark color="secondary">
                      <v-btn icon dark @click="paybal_dialog = false">
                          <v-icon>mdi-close</v-icon>
                      </v-btn> <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card width="100%" height="100%">
                      <iframe :src="(`${url}`)" width="100%" height="100%" title="description"></iframe>
                  </v-card>

              </v-dialog>
              <v-snackbar v-model="done" :timeout="4001" :value="true" absolute color="success accent-2" shaped bottom>
                  Order added successfully
              </v-snackbar>
              <v-snackbar v-model="wrongcr" :timeout="4001" :value="true" absolute color="red accent-2" shaped bottom>
                  {{ wrgmsg }}
              </v-snackbar>

          </v-row>
  
  </template>














  <template>
    
            <v-row justify="center">
                <v-dialog v-model="reactivatdialog" fullscreen hide-overlay transition="dialog-bottom-transition">

                    <v-card>
                        <v-toolbar dark color="secondary">
                            <v-btn icon dark @click="reactivatdialog = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn> <v-spacer></v-spacer>

                            <v-toolbar-title><strong>Reactive</strong> the Hosting Plan {{ item.package_name }}</v-toolbar-title>
                            <v-spacer></v-spacer>

                        </v-toolbar>
                        <v-container>
                            <v-list three-line subheader>
                                <v-subheader>Al-Haram payment</v-subheader>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>if you don't have Al-Haram receipt </v-list-item-title>
                                        <v-list-item-subtitle>Please go to any payment branch near you of Al-Haram to pay the
                                            following amount </v-list-item-subtitle>
                                        <v-list-item-title style="font-size: xx-large;">{{ allpackages[updatepackage].yearly_price }}</v-list-item-title>
                                    </v-list-item-content>

                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>if you have Al-Haram receipt</v-list-item-title>
                                        <v-list-item-subtitle>Please make sure that the amount sent in the receipt is {{ allpackages[updatepackage].yearly_price }} </v-list-item-subtitle>
                                        <v-list-item-subtitle>then insert a clear picture of the receipt here
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-file-input accept="image/*" placeholder="Enter the receipt picture" prepend-icon="mdi-camera"
                                        label="Receipt" v-model="haramreceipt"></v-file-input>
                                </v-list-item>
                                
                                <v-list-item>

                                    <v-btn rounded color="secondary" dark x-large @click="Reactive_alharam()" :loading="loading">
                                        Request
                                    </v-btn>
                                </v-list-item>


                            </v-list>
                            <v-divider></v-divider>
                            <v-list three-line subheader>
                                <v-subheader>Other payment method</v-subheader>
                                <v-list-item>

                                    <v-btn rounded color="secondary" dark x-large @click="paypale(), paybal_dialog = !paybal_dialog">
                                        pay using paypal
                                    </v-btn>
                                </v-list-item>
                            </v-list></v-container>
                    </v-card>


                </v-dialog>
                <v-dialog v-model="paybal_dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                    <v-toolbar dark color="secondary">
                        <v-btn icon dark @click="paybal_dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn> <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card width="100%" height="100%">
                        <iframe :src="(`${url}`)" width="100%" height="100%" title="description"></iframe>
                    </v-card>

                </v-dialog>
                <v-snackbar v-model="done" :timeout="4001" :value="true" absolute color="success accent-2" shaped bottom>
                    Order added successfully
                </v-snackbar>
                <v-snackbar v-model="wrongcr" :timeout="4001" :value="true" absolute color="red accent-2" shaped bottom>
                    {{ wrgmsg }}
                </v-snackbar>

            </v-row>
          
      </template>
    </v-container>
</template>
<script>
import calender from './calender.vue'
import axios from 'axios'

export default {
        props: ['user'],

  components: { calender },
    data: () => ({
      allusage:[],
        usedpack:0,
        options: {
            labels: [ 'used space','free space'],
            colors: ['#F44336','#494443'],

            plotOptions: {
                pie: {
                    expandOnClick: false,
                   
                       
                    
                }
            }
      },
      Cpanel:false,
        reactivatdialog:false,
        space:1,
        used: 1,
        model: null,
        dialog:false,
      item: [],
      allpackages: [],
      updatepackage:0, 
      goldallpacakes: [ {
      id: 1,
      package_type: 'SILVER',
      yearly_price: 161999
    }, {
      id: 0,
      package_type: 'BRONZE',
      yearly_price: 94999
    },],
      selverallpacakes:[ {
      id: 0,
      package_type: 'BRONZE',
      yearly_price: 94999
      },
        {
      id: 2,
      package_type: 'GOLD',
      yearly_price: 215999
    },],
      bronzallpacakes: [{
      id: 1,
      package_type: 'SILVER',
      yearly_price: 161999
    },
        {
      id: 2,
      package_type: 'GOLD',
      yearly_price: 215999
        },
      ],
    dialog: false,
    package_req: 0,
    ind: 0,
    sendData: {},
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
     
            setView(view) {
                this.$store.commit("setView", view);
            }
      ,
      

      selectpacakge(item) {
              this.item= item;
              console.log(item)
            }
      ,
    renew_alharam() {
      this.loading = true

      const formData = new FormData();
      formData.append('customer_id', this.user.id);
      formData.append('hostingplan_id', this.usedpack);
      formData.append('final_price', this.allpackages[this.updatepackage].yearly_price);
      formData.append('receipt', this.haramreceipt);
      formData.append('request_type', 'Renew');
      formData.append('hostingplan_type', this.allpackages[this.updatepackage].package_type);

      axios
        .post('/api/customer/alharam', formData, {
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
            this.wrgmsg = res.response.data.message

          } else {
            this.wrgmsg = res.response.data.message
            this.wrongcr = true
            this.loading = false
            this.dialog = false

          }
        })
        .catch(error => {
          console.log(error)
          this.wrgmsg = error.response.data.message
          this.wrongcr = true
          this.loading = false
          this.dialog = false

        })
    },

    Reactive_alharam() {
      this.loading = true

      const formData = new FormData();
       formData.append('customer_id', this.user.id);
      formData.append('hostingplan_id', this.usedpack + 1);
      formData.append('final_price', this.allpackages[this.updatepackage].yearly_price);
      formData.append('receipt', this.haramreceipt);
      formData.append('request_type', 'Reactive');
      formData.append('hostingplan_type', this.allpackages[this.updatepackage].package_type);

      axios
        .post('/api/customer/alharam', formData, {
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
            this.reactivatdialog = false
            this.wrgmsg = res.data.message

          } else {
            this.wrgmsg = res.data.message
            this.wrongcr = true
            this.loading = false
            this.reactivatdialog = false

          }
        })
        .catch(error => {
          console.log(error)
          this.wrgmsg = error.data.message
          this.wrongcr = true
          this.loading = false
          this.reactivatdialog = false

        })
      },
    upgrade_alharam() {
      this.loading = true

      const formData = new FormData();
      formData.append('customer_id', this.user.id);
      formData.append('hostingplan_id', this.allpackages[this.updatepackage].id);
      formData.append('final_price', this.allpackages[this.updatepackage].yearly_price);
      formData.append('receipt', this.haramreceipt);
      formData.append('request_type', 'Upgrade');
      formData.append('hostingplan_type', this.allpackages[this.updatepackage].package_type);

      axios
        .post('/api/customer/alharam', formData, {
          headers: {
                  "ngrok-skip-browser-warning": true,

            'Content-Type': `multipart/form-data `
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
          this.wrgmsg = error.data.message
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
            customer_id: this.user.id,
            package_id: this.package_req,
            final_price: this.packages[this.ind].yearly_price_outside_syria
          },

        )
        .then(res => {
          console.log(res)
          const dataToSave = { name: this.user.f_name, package: this.packages[this.ind].package_type };

          sessionStorage.setItem("requested_package", JSON.stringify(dataToSave));
          this.url = res.data.URL

        })


    },

  },
  created()  {

    axios.get(`/api/get-usage-disk`, {
      headers: {
        "ngrok-skip-browser-warning": true,

      }
    }).then((response) => {
      console.log(response)
      this.allusage = response.data.users.forEach(element => {
        if (element.user == this.user.f_name) {
          this.used = element.blocks_used
          this.space = element.blocks_limit
        }
      this.lod = false
    }).catch((error) => console.log(error))

      
    });


  axios.get(`/api/customer/showpackages`, {
    headers: {
      "ngrok-skip-browser-warning": true,

    }
  }).then((response) => {
    console.log(response)
    this.allpackages = response.data.packages
    this.lod = false
  }).catch((error) => console.log(error))
},
    computed: {
      
       
    },
 
}
</script>

<style>
.v-card--link:before {
     background: white;}
.mod  {
    border-top-right-radius: 10px !important;
    border-bottom-right-radius: 60px !important;
    border-top-left-radius: 60px !important;
    border-bottom-left-radius: 10px !important;
}
.rev_mod  {
    border-top-right-radius: 60px !important;
    border-bottom-right-radius: 10px !important;
    border-top-left-radius: 10px !important;
    border-bottom-left-radius: 60px !important;
}
.mod2  {
    border-top-right-radius: 60px !important;
    border-bottom-right-radius: 0px !important;
    border-top-left-radius: 60px !important;
    border-bottom-left-radius: 0px !important;
    text-align: center;
}

</style>