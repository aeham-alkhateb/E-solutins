<template>
    <v-app>
        <Operator_SideBar />
        <v-app-bar app>
            <appbar />

        </v-app-bar>
        <v-main>
           
            <operator_massages v-show="operator_massages" />
            <operator_requsts v-show="operator_requsts" />

        </v-main>
    </v-app>
</template>

<script>
import appbar from '../components/app_bar'
import Operator_SideBar from '../components/operator/Operator_SideBar'

import operator_massages from '../components/operator_massages'
import operator_requsts from '../components/operator_requsts'


import { mapState } from "vuex";
export default {
    data: () => ({

    }),
    computed: {
        ...mapState([
            'operator_requsts',
            'operator_massages',
        ])
    },
    components: {
        appbar,
        Operator_SideBar,
        operator_massages,
        operator_requsts,
        

    }
}
</script>
<style scoped></style>