import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import appAxios from '../config/appAxios'

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    isLogin: false,
    countriesArr: [],
    reportsArr: []
  },
  mutations: {
    changeToken(state, payload) {
      state.token = payload
    },
    changeIsLogin(state, payload) {
      state.isLogin = payload
    },
    changeCountriesArr(state, payload) {
      state.countriesArr = payload
      console.log('List of countries:', state.countriesArr)
    },
    changeReportsArr(state, payload) {
      state.reportsArr = payload
      console.log('List of reports:', state.reportsArr)
    }
  },
  actions: {
    getAllCountries(context) {
      appAxios({
        method: 'GET',
        url: '/countries',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((result) => {
        console.log(result)
        context.commit('changeCountriesArr', result.data)
      })
      .catch((err) => {
        console.log('Get countries error:', err)
      })
    },
    getAllReports(context) {
      appAxios({
        method: 'GET',
        url: '/reports',
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then((result) => {
        console.log(result)
        context.commit('changeReportsArr', result.output)
      })
      .catch((err) => {
        console.log('Get countries error:', err)
      })
    }
  },
  modules: {
  }
})
