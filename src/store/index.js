import Vue from 'vue'
import Vuex from 'vuex'
import crew from './modules/crew'
import options from './modules/options'
import player from './modules/player'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
      crew,
      player,
      options,
    },
    strict: debug
});