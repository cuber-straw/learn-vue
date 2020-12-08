import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        // 所有任务的列表
        list: [],
        // 文本框内容
        inputValue: '',
    },
    mutations: {
        initList(state, list) {
            state.list = list
        },
        setInputValue(state, value) {
            state.inputValue = value
        }
    },
    actions: {
        getList(context) {
            axios.get('/list.json').then(({ data }) => {
                console.log(data)
                context.commit('initList', data)
            })
        }
    },
    modules: {}
})