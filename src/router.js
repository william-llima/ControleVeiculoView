import Vue from 'vue'
import VueRouter from 'vue-router'

import MainControle from './components/MainControle.vue'
import Veiculo from './components/Veiculo.vue'
import Motorista from './components/Motorista.vue'
import MainControleGrid from './components/MainControleGrid.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode:'history',
    routes:[{
        path:'/',
        component:MainControleGrid
    },
    {
        path:'/controle',
        component:MainControle
    },
    {
        path:'/veiculo',
        component:Veiculo
    },
    {
        path:'/motorista',
        component:Motorista
    }
    ]
})