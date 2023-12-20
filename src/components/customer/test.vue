<template>
    <v-app-bar absolute color="secondary" dark scroll-target="#scrolling-techniques-2" elevation="5">
        <v-app-bar-nav-icon @click="Mini_SideBar()"></v-app-bar-nav-icon>

        <v-toolbar color="rgba(0,0,0,0)" flat>

            <v-spacer></v-spacer>
        </v-toolbar>
        <v-spacer></v-spacer>
        <div>
            <v-menu v-model="menu" :close-on-content-click="false" offset-y transition="slide-y-transition" rounded="b-xl">
                <template v-slot:activator="{ on, attrs }">

                    <v-badge color="white" overlap dot left>
                        <v-btn icon v-bind="attrs" v-on="on">
                            <v-icon> fa-bell </v-icon>
                        </v-btn>
                    </v-badge>


                </template>
                <v-card max-width="500px">
                    <v-list two-line>
                        <v-list-item-group v-model="selected" active-class="red--text">
                            <template>
                                <v-list-item v-for="item in notifications.slice(0, 5)" :key="item.title">
                                    <template>
                                        <v-list-item-content>
                                            <v-list-item-title>{{ item.title }}</v-list-item-title>

                                            <v-list-item-subtitle class="text--primary">{{ item.headline
                                            }}</v-list-item-subtitle>

                                            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                                        </v-list-item-content>

                                        <v-list-item-action>


                                            <v-icon v-show="item.new == true" color="primary lighten-1">
                                                mdi-star
                                            </v-icon>
                                            <v-list-item-action-text>{{ item.action }}</v-list-item-action-text>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>

                                <v-divider></v-divider>
                                <v-list-item-action>
                                    <v-btn text color="primary" @click="all_notifications = !all_notifications">Show all
                                        Notifications</v-btn>
                                </v-list-item-action>
                            </template>
                        </v-list-item-group>
                    </v-list>

                </v-card>

            </v-menu>
            <v-menu v-model="profile_menu" :close-on-content-click="false" offset-y transition="slide-y-transition"
                rounded="b-xl">
                <template v-slot:activator="{ on, attrs }">

                    <v-btn icon v-bind="attrs" v-on="on">
                        <v-icon large>fa-user</v-icon>
                    </v-btn>




                </template>
                <v-card>
                    <v-list>
                        <v-list-item>
                            <v-list-item-avatar>
                                <img src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                                    alt="John">
                            </v-list-item-avatar>

                            <v-list-item-content>
                                <v-list-item-title>{{ user.f_name }} {{ user.l_name }}</v-list-item-title>
                                <v-list-item-subtitle>{{ user.company_name }}</v-list-item-subtitle>
                            </v-list-item-content>

                            <v-list-item-icon>
                                <v-btn icon color="primary" @click="edit_profile = true"><v-icon>mdi-pencil</v-icon></v-btn>
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

                        <v-btn color="primary" rounded @click="logout = true" width="320px">
                            Logout
                        </v-btn>
                    </v-card-actions>
                </v-card>

            </v-menu>

        </div>
        <v-dialog v-model="logout" max-width="500px">
            <v-card>

                <v-card-title class="font-weight-bold te justify-center" style="">Are you Sure?</v-card-title>

                <v-card-actions>

                    <v-spacer></v-spacer>
                    <v-btn color="primary" class="font-weight-bold te" text @click="Logout()">Yes</v-btn>

                    <v-btn color="primary" class="font-weight-bold te" text @click="logout = false">No</v-btn>
                    <v-spacer></v-spacer>

                </v-card-actions>

            </v-card>
        </v-dialog>
        <v-dialog max-width="500" v-model="edit_profile">
            <vue-custom-scrollbar class="scroll-area">


                <v-card class="mx-auto" style="max-width: 500px;">

                    <v-toolbar color="primary accent-4" cards dark flat>

                        <v-card-title class="text-h6 font-weight-regular">
                            Edit Profile
                        </v-card-title>

                    </v-toolbar>
                    <v-form ref="form" v-model="form" class="pa-4 pt-6">

                        <v-text-field v-model="user.f_name" filled rounded color="primary"
                            label="First name"></v-text-field><v-text-field v-model="user.l_name" filled rounded
                            color="primary" label="Last name"></v-text-field>
                        <v-text-field v-model="user.email" filled rounded color="primary" label="email"></v-text-field>
                        <v-text-field v-model="user.phone" filled rounded color="primary"
                            label="Phone number"></v-text-field>
                        <v-text-field v-model="user.address" filled rounded color="primary" label="Address"></v-text-field>
                        <v-text-field v-model="user.company_name" filled rounded color="primary"
                            label="Company name"></v-text-field>

                    </v-form>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn text @click="edit_profile = false" color="primary">
                            close
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-btn :disabled="!form" :loading="isLoading" class="white--text" color="primary accent-4"
                            depressed>
                            Submit
                        </v-btn>
                    </v-card-actions>

                </v-card>





            </vue-custom-scrollbar>
        </v-dialog>















        <v-dialog transition="scroll-x-reverse-transition" max-width="600" v-model="all_notifications">


            <vue-custom-scrollbar class="scroll-area">
                <v-card>

                    <v-list two-line expand>
                        <v-list-item-group v-model="selected" active-class="red--text">
                            <template>
                                <v-list-item v-for="item in notifications" :key="item.title">
                                    <template>
                                        <v-list-item-content>
                                            <v-list-item-title>{{ item.title }}</v-list-item-title>

                                            <v-list-item-subtitle class="text--primary">{{ item.headline
                                            }}</v-list-item-subtitle>

                                            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                                        </v-list-item-content>

                                        <v-list-item-action>



                                            <v-list-item-action-text>{{ item.action }}</v-list-item-action-text>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>

                                <v-divider></v-divider>
                                <v-list-item-action>
                                    <v-btn text color="primary" @click="all_notifications = false">close</v-btn>
                                </v-list-item-action>
                            </template>
                        </v-list-item-group>
                    </v-list>

                </v-card>
            </vue-custom-scrollbar>







        </v-dialog>
        <v-snackbar v-model="wrongcr" :timeout="4001" :value="true" absolute color="red accent-2" shaped bottom>
            {{ wrgmsg }}
        </v-snackbar>
    </v-app-bar>
</template>
<script>
import axios from "axios";
import vueCustomScrollbar from 'vue-custom-scrollbar'

export default {
    props: ['user'],

    data() {
        return {
            edit_profile: false,
            logout: false,
            mini: true,
            menu: false,
            profile_menu: false,
            all_notifications: false,
            wrongcr: false,
            wrgmsg: '',

            notifications: [
                {
                    action: '15 min',
                    headline: 'Brunch this weekend?',
                    subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                    title: 'Ali Connors',
                    new: true
                },
                {
                    action: '2 hr',
                    headline: 'Summer BBQ',
                    subtitle: `Wish I could come, but I'm out of town this weekend.`,
                    title: 'me, Scrott, Jennifer',
                    new: false
                },
                {
                    action: '6 hr',
                    headline: 'Oui oui',
                    subtitle: 'Do you have Paris recommendations? Have you ever been?',
                    title: 'Sandra Adams',
                    new: false
                },
                {
                    action: '12 hr',
                    headline: 'Birthday gift',
                    subtitle: 'Have any ideas about what we should get Heidi for her birthday?',
                    title: 'Trevor Hansen',
                    new: false
                },
                {
                    action: '18hr',
                    headline: 'Recipe to try',
                    subtitle: 'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
                    title: 'Britta Holt',
                    new: false
                },
                {
                    action: '15 min',
                    headline: 'Brunch this weekend?',
                    subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                    title: 'Ali Connors',
                    new: true
                }, {
                    action: '15 min',
                    headline: 'Brunch this weekend?',
                    subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                    title: 'Ali Connors',
                    new: true
                }, {
                    action: '15 min',
                    headline: 'Brunch this weekend?',
                    subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                    title: 'Ali Connors',
                    new: true
                }, {
                    action: '15 min',
                    headline: 'Brunch this weekend?',
                    subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                    title: 'Ali Connors',
                    new: true
                }, {
                    action: '15 min',
                    headline: 'Brunch this weekend?',
                    subtitle: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
                    title: 'Ali Connors',
                    new: true
                },
            ],

        }
    },
    created() {
    },

    methods: {
        Mini_SideBar() {
            this.$store.commit("Mini_SideBar");
        }
        ,
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