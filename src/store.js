import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)

export default new vuex.Store({
    state:{
        controle:{}
    }, mutations:{
        adicionarControle(state,payload){
            state.controle=payload
        }
    }
})


