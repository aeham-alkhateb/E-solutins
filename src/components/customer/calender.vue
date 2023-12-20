<template>
    <v-row class="fill-height">
        <v-col>
            <v-sheet height="64">
                <v-toolbar flat>
                    <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                        Today
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                        <v-icon small>
                            mdi-chevron-left
                        </v-icon>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next">
                        <v-icon small>
                            mdi-chevron-right
                        </v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                        {{ $refs.calendar.title }}
                    </v-toolbar-title>
                     <v-spacer></v-spacer>
                      <v-toolbar-title >
                           Hosting plan
                        </v-toolbar-title>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="550">
                <v-calendar ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
                    :type="type" 
                    ></v-calendar>
                
            </v-sheet>
        </v-col>
    </v-row>
</template>

<script>
import { computed, watch } from 'vue'

export default {
            props: ['user'],

    data: () => ({

        focus: '',
        type: 'month',
       
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        colors: ['orange', 'yellow','blue', 'brown', '#bdbdbe',  'green',  'grey darken-1'],
      
    }),
    mounted() {
        this.$refs.calendar.checkChange()
    },
    methods: {
        viewDay({ date }) {
            this.focus = date
            this.type = 'day'
        },
        getEventColor(event) {
            return event.color
        },
        setToday() {
            this.focus = ''
        },
        prev() {
            this.$refs.calendar.prev()
        },
        next() {
            this.$refs.calendar.next()
        },
    },
   watch: {
        'user.packages': {
            immediate: true, // Trigger the watch immediately
            deep: true, // Watch for nested changes within the array
            handler(newPackages) {
                this.events = []; // Clear the events array before populating it again

                for (let i = 0; i < newPackages.length; i++) {
                    this.events.push({
                        name: newPackages[i].package_name,
                        start: newPackages[i].created_at,
                        end: newPackages[i].expire_at,
                        color: this.colors[i],
                    });
                }
            }
        }
    },

    created() {
      this.show_calender
       
    }
}
</script>

<style>

</style>