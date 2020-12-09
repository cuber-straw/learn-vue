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
        nextId: 2,
        viewKey: 'all'
    },
    mutations: {
        initList(state, list) {
            state.list = list
        },
        setInputValue(state, value) {
            state.inputValue = value
        },
        addItem(state) {
            const obj = {
                id: state.nextId,
                info: state.inputValue,
                done: false
            }
            state.list.push(obj)
            state.inputValue = ''
            state.nextId++
        },
        removeItem(state, id) {
            const index = state.list.findIndex(x => x.id === id)
            state.list.splice(index, 1)
        },
        changeStatus(state, param) {
            const index = state.list.findIndex(x => x.id === param.id)
            state.list[index].done = param.status
        },
        cleanDone(state) {
            state.list = state.list.filter(x => x.done === false)
        },
        changeViewKey(state, key) {
            state.viewKey = key
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
    getters: {
        undoneLength(state) {
            return state.list.filter(x => x.done === false).length
        },
        infoList(state) {
            if (state.viewKey === 'all') {
                return state.list
            } else if (state.viewKey === 'undone') {
                return state.list.filter(x => x.done === false)
            } else {
                return state.list.filter(x => x.done === true)
            }
        }
    },
    modules: {}
})
