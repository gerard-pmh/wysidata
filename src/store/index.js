import { createStore } from 'vuex'
import axios from 'axios'
import { findResponseAttr } from '../utils/findResponseAttr'

export default createStore({
  state: {
    apiIdSeq: 0,
    apis: [],
    componentIdSeq: 4,
    components: [
      { id: 1, template: 'WysiTitle' },
      { id: 2, template: 'WysiParagraph' },
      { id: 3, template: 'WysiCard' }
    ],
    draggedApiField: {}
  },
  getters: {},
  mutations: {
    incrementApiId (state) {
      state.apiIdSeq++
    },
    apiDataLoading (state, { id, url }) {
      state.apis.push({ id, url, isLoading: true })
    },
    apiDataLoaded (state, { id, res }) {
      const index = state.apis.findIndex(api => api.id === id)
      const api = state.apis[index]
      state.apis[index] = {
        ...api,
        isLoading: false,
        response: res.data,
        isArray: Array.isArray(res.data),
        fields: findResponseAttr(res.data)
      }
    },
    apiDataError (state, { id, error }) {
      const index = state.apis.findIndex(a => a.id === id)
      const api = state.apis[index]
      state.apis[index] = {
        ...api,
        isLoading: false,
        error: error.toString()
      }
    },
    deleteApi (state, id) {
      const index = state.apis.findIndex(a => a.id === id)
      state.apis.splice(index, 1)
    },
    dragApiField (state, payload) {
      state.draggedApiField = payload
    },
    dropApiField (state, { componentId, boxId }) {
      const index = state.components.findIndex(c => c.id === componentId)
      const component = state.components[index]
      state.components[index] = {
        ...component,

      }
    }
  },
  actions: {
    async addApi ({ commit, state }, url) {
      commit('incrementApiId')
      const id = state.apiIdSeq
      commit('apiDataLoading', { id, url })
      try {
        const res = await axios.get(url)
        commit('apiDataLoaded', { id, res })
      } catch (error) {
        commit('apiDataError', { id, error })
      }
    },
    deleteApi ({ commit }, id) {
      commit('deleteApi', id)
    },
    dragApiField ({ commit }, payload) {
      commit('dragApiField', payload)
    },
    dropApiField ({ commit }, payload) {
      commit('dropApiField', payload)
    }
  }
})
