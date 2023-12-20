<template>
  <v-container>
    <v-card class="rightp">
      <v-row>
        <v-col>
          <template>
            <v-card-title class="white--text primary darken-1  rightp">
              Customers Tickets


           
            </v-card-title>



            <v-divider></v-divider>
            <vue-custom-scrollbar class="scroll-area" he>

              <v-list>
                <template v-for="(item) in your_tickets">
                  <v-list-item v-if="item" :key="item">


                    <v-list-item-content>
                      <v-list-item-title>Ticket {{ item.id }}</v-list-item-title>
                    </v-list-item-content>
                    <v-icon v-if="item.status == 'closed'" color="red " right>
                      mdi-lightbulb-off
                    </v-icon>
                    <v-icon v-else color="green " right>
                      mdi-lightbulb-on
                    </v-icon>

                    <v-list-item-action>
                      <v-btn icon small @click="selected_id = item.id, get_ticket_messages()">
                        <v-icon color="orange darken-4" right>
                          mdi-open-in-new
                        </v-icon>
                      </v-btn>

                    </v-list-item-action>

                  </v-list-item>
                </template>
              </v-list>
            </vue-custom-scrollbar>
          </template></v-col>
        <v-divider vertical></v-divider>

        <v-col cols="9">
          <v-container>
            <div>
              <v-btn text color="primary" @click="v0 = !v0">Respond</v-btn>
              <v-banner v-model="v0" single-line transition="slide-y-transition">
                <v-textarea placeholder="type your message" outlined rows="5" row-height="50" shaped
                  v-model="message"></v-textarea>
                <template v-slot:actions="{ dismiss }">
                  <v-btn text color="primary" @click="dismiss">
                    close
                  </v-btn>
                  <v-btn color="primary" @click="send_message()">
                    send
                  </v-btn>
                </template>
              </v-banner>
            </div>
          </v-container>
          <div v-show="items != null">

       


            <v-list>
             <template  v-for="(item) in ticket_messages">
                  <v-list-item v-if="item" :key="item.id">


                    <v-list-item-content>
                      <v-card :class="changeClass(item.is_mine == false)" color="grey" dark max-width="550" style="margin-right: 0%;">

                        <v-card-text class="text-h5 font-weight-bold">
                          "{{ item.message }}"
                        </v-card-text>

                        <v-card-actions>
                          <v-list-item class="grow">
                            <v-list-item-avatar color="secondary">
                              <v-img class="elevation-6" alt="" 
                               src="@/assets/img/download.svg"  
                                v-if="item.is_mine == false"></v-img>
                              <v-icon class="elevation-6" v-else>fa-user</v-icon>
                            </v-list-item-avatar>

                            <v-list-item-content>
                              <v-list-item-title  v-if="item.is_mine == false">demo test</v-list-item-title>
                                <v-list-item-title  v-else>Operator 1</v-list-item-title>
                            </v-list-item-content>

                            <v-row align="center" justify="end">
                              <v-icon class="mr-1">
                                mdi-calendar
                              </v-icon>
                              <span class="subheading mr-2">{{ formatDate(item.created_at) }}</span>
                              <v-icon class="mr-1">
                                mdi-clock
                              </v-icon>
                              <span class="subheading mr-2">{{ formatTime(item.created_at) }}</span>

                            </v-row>
                          </v-list-item>
                        </v-card-actions>
                      </v-card>
                    </v-list-item-content>
                  </v-list-item>
              </template>
            </v-list>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>
<script>
import axios from 'axios'
import { computed } from 'vue'
import vueCustomScrollbar from 'vue-custom-scrollbar'


export default {
  props: ['user'],

  data: () => ({
    v0: false,
    inset: true,
    items: [],
    your_tickets: [{id:2 ,statuse:'open'}, { id: 10, statuse: 'open' }, { id: 28, statuse: 'open' }, { id: 29, statuse: 'open' }, { id: 31, statuse: 'open' }],
    ticket_messages: [{
      created_at
        :
        "2023-07-04T21:34:05.000000Z",
deleted_at
        :
        null,
id
        :
        22,
is_mine
        :
        false,
message
        :
        "hello i need your help",
sender
        :
        "0",
support_ticket_id
        :
        28,
updated_at
        :
        "2023-07-04T21:34:05.000000Z"
    }, ],

    message: '',
    selected_id: 0
  }),

  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    },
    formatTime(dateString) {
      const date = new Date(dateString);
      return date.toLocaleTimeString();
    },
    open_ticket() {
      axios
        .get(
          '/api/customer/open-ticket',

          {
            headers: {
              "ngrok-skip-browser-warning": true,
              "content-type": "application/json",

            }
          }
        )
        .then(res => {
          console.log(res)
          this.get_my_tickets()
        })
        .catch(error => {
          console.log(error)

        })
    },
   

    send_message() {
      axios
        .post(
          `/api/customer/send-message/${this.selected_id}`,
          {

            message: this.message
          },
          {
            headers: {
              "ngrok-skip-browser-warning": true,
              "content-type": "application/json",
            }
          }
        )
        .then(res => {
          console.log(res)
          this.get_ticket_messages()
        })
        .catch(error => {
          console.log(error)

        })
    },


      changeClass(value) {
      return {
        'op': value == true,
        'user': value == false,

      }

    },

    get_ticket_messages() {
      axios
        .get(
          `/api/customer/get-ticket-messages/${this.selected_id}`,

          {
            headers: {
              "ngrok-skip-browser-warning": true,
              "content-type": "application/json",

            }
          }
        )
        .then(res => {
          console.log(res)
          this.ticket_messages = res.data
        })
        .catch(error => {
          console.log(error)

        })
    },
    get_my_tickets() {
      // {
      //   axios.get(`/api/customer/get-my-tickets`, {
      //     headers: {
      //       "ngrok-skip-browser-warning": true,
      //       "content-type": "application/json",

      //     }
      //   }).then((response) => {
      //     console.log(response)
      //     this.your_tickets = response.data

      //     this.loading = false
      //   }).catch((error) => console.log(error))
      // }
    }
  },
  created() {
    this.get_my_tickets()


  },

  components: {
    vueCustomScrollbar
  },
}

</script>

<style>
.leftp {
  border-top-right-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
  border-top-left-radius: 60px !important;
  border-bottom-left-radius: 60px !important;

}

.rightp {
  border-top-right-radius: 60px !important;
  border-bottom-right-radius: 60px !important;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.op{margin-left: 33%;
 border-top-right-radius: 60px !important;
    border-bottom-right-radius: 10px !important;
    border-top-left-radius: 10px !important;
    border-bottom-left-radius: 60px !important;}
.user{margin-left: 0%;
 border-top-right-radius: 10px !important;
    border-bottom-right-radius: 60px !important;
    border-top-left-radius: 60px !important;
    border-bottom-left-radius: 10px !important;}
.scroll-area {
  height: 400px;
}</style>