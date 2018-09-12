import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        hasNotice: true,   // 是否有顶部状态栏 通知
        digitalTags: {},
        exchangeTags: {}
    },
    mutations: {
        updateHasNotice(state,el){
            state.hasNotice = el
        },
        updateDigitalTag(state, obj){
            state.digitalTags[obj.key] = obj.value;
        },
        updateExchangeTag(state, obj){
            state.exchangeTags[obj.key] = obj.value;
        },
    }
})