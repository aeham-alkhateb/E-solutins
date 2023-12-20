import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        allUsers: true,
        showLog: false,
        addOp: false,
        operator_massages: false,
        operator_requsts: false,
        new_package: false,
        support: false,
        home: true,
        hosting_plans:false,



        mini:false
    },
    getters: {
        showLogView(state) {
            return state.showLog;
        },
        allUsersView(state) {
            return state.allUsers;
        },
        addOpView(state) {
            return state.addOp;
        },
        operator_massagesView(state) {
            return state.operator_massages;
        },
        operator_requstsView(state) {
            return state.operator_requsts;
        },
        new_package(state) {
            return state.new_package;
        },
         hosting_plans(state) {
            return state.hosting_plans;
        },
          home(state) {
            return state.home;
        },
           support(state) {
            return state.support;
        },
    },
    mutations: {
        Mini_SideBar() {
            state.mini = !state.mini;

        },
        setView(state, view) {
            state.allUsers = false;
            state.showLog = false;
            state.addOp = false;
            state.operator_massages = false;
            state.operator_requsts = false;
            state.new_package = false;
            state.support = false;
            state.home = false;
            state.hosting_plans=false;
            if (view === "allUsers") {
                state.allUsers = true;
            } else if (view === "showLog") {
                state.showLog = true;
            } else if (view === "addOp") {
                state.addOp = true;
            }else if (view === "operator_requsts") {
                state.operator_requsts = true;
            } else if (view === "operator_massages") {
                state.operator_massages = true;
            }else if (view === "new_package") {
                state.new_package = true;
            }else if (view === "hosting_plans") {
                state.hosting_plans = true;
            } else if (view === "home") {
                state.home = true;
            }else if (view === "support") {
                state.support = true;
            }
            
        }
    }
});
