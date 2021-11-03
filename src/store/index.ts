import { createStore, Store, useStore as baseUseStore } from 'vuex';
import axios, { AxiosResponse } from 'axios';
import { findResponseAttr } from '../utils/findResponseAttr';
import { InjectionKey } from 'vue';

export interface Api {
  id: number;
  url: string;
  loading: boolean;
  error?: string;
  isArray?: boolean;
  resData?: any;
  fields?: string[];
}

export interface WysiComponent {
  id: number;
  template: string;
}

export interface DraggedApiField {
  apiId: number;
  field: string;
}

export interface State {
  apiIdSeq: number;
  apis: Api[];
  componentIdSeq: number;
  components: WysiComponent[];
  draggedApiField?: DraggedApiField;
}

export const key: InjectionKey<Store<State>> = Symbol();

export function useStore() {
  return baseUseStore(key);
}

export const store = createStore<State>({
  state: {
    apiIdSeq: 0,
    apis: [],
    componentIdSeq: 4,
    components: [
      { id: 1, template: 'WysiTitle' },
      { id: 2, template: 'WysiParagraph' },
      { id: 3, template: 'WysiCard' },
    ],
  },
  getters: {},
  mutations: {
    incrementApiId(state) {
      state.apiIdSeq++;
    },
    apiDataLoading(state, { id, url }: { id: number; url: string }) {
      state.apis.push({ id, url, loading: true });
    },
    apiDataLoaded(state, { id, res }: { id: number; res: AxiosResponse }) {
      const index = state.apis.findIndex(api => api.id === id);
      const api = state.apis[index];
      state.apis[index] = {
        ...api,
        loading: false,
        resData: res.data,
        isArray: Array.isArray(res.data),
        fields: findResponseAttr(res.data),
      };
    },
    apiDataError(state, { id, error }: { id: number; error: string }) {
      const index = state.apis.findIndex(a => a.id === id);
      const api = state.apis[index];
      state.apis[index] = {
        ...api,
        loading: false,
        error: error.toString(),
      };
    },
    deleteApi(state, id: number) {
      const index = state.apis.findIndex(a => a.id === id);
      state.apis.splice(index, 1);
    },
    dragApiField(state, payload: DraggedApiField) {
      state.draggedApiField = payload;
    },
    dropApiField(
      state,
      { componentId, boxId }: { componentId: number; boxId: number }
    ) {
      const index = state.components.findIndex(c => c.id === componentId);
      const component = state.components[index];
      state.components[index] = {
        ...component,
      };
    },
  },
  actions: {
    async addApi({ commit, state }, url: string) {
      commit('incrementApiId');
      const id = state.apiIdSeq;
      commit('apiDataLoading', { id, url });
      try {
        const res = await axios.get(url);
        commit('apiDataLoaded', { id, res });
      } catch (error) {
        commit('apiDataError', { id, error });
      }
    },
    deleteApi({ commit }, id: number) {
      commit('deleteApi', id);
    },
    dragApiField({ commit }, payload: DraggedApiField) {
      commit('dragApiField', payload);
    },
    dropApiField({ commit }, payload) {
      commit('dropApiField', payload);
    },
  },
});
