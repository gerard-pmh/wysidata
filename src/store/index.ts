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

export interface WysiMapping {
  compId: number;
  boxId: number;
  apiId: number;
  apiField: string;
}

export interface WysiComponent {
  id: number;
  template: string;
}

export interface DraggedApiField {
  apiId: number;
  apiField: string;
}

export interface State {
  apiIdSeq: number;
  apis: Api[];
  compIdSeq: number;
  components: WysiComponent[];
  mappings: WysiMapping[];
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
    compIdSeq: 4,
    components: [
      { id: 1, template: 'wysi-title' },
      { id: 2, template: 'wysi-paragraph' },
      { id: 3, template: 'wysi-card' },
    ],
    mappings: [],
  },
  getters: {
    getMappingValue:
      state =>
      (compId: number, compIndex: number, boxId: number): any => {
        const mapping = state.mappings.find(
          m => m.compId === compId && m.boxId === boxId
        );
        if (!mapping) {
          return undefined;
        }
        const api = state.apis.find(a => a.id === mapping.apiId);
        if (!api) {
          return undefined;
        }
        if (api.isArray) {
          console.log(compIndex);
          return api.resData[compIndex][mapping.apiField];
        }
        return api.resData[mapping.apiField];
      },
    getComponentCount:
      state =>
      (compId: number): number => {
        const mappings = state.mappings.filter(m => m.compId === compId);
        const apiIds = mappings.map(m => m.apiId);
        const apiArray = state.apis
          .filter(a => apiIds.includes(a.id))
          .find(a => a.isArray);
        if (apiArray) {
          return apiArray.resData.length;
        }
        return 1;
      },
  },
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
    dropApiField(state, { compId, boxId }: { compId: number; boxId: number }) {
      if (!state.draggedApiField) {
        return;
      }
      const index = state.mappings.findIndex(
        m => m.compId === compId && m.boxId === boxId
      );
      if (index > -1) {
        const mapping = state.mappings[index];
        state.mappings[index] = {
          ...mapping,
          ...state.draggedApiField,
        };
      } else {
        state.mappings.push({
          compId,
          boxId,
          ...state.draggedApiField,
        });
      }
    },
    endDragApiField(state) {
      state.draggedApiField = undefined;
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
    dropApiField({ commit, state }, payload) {
      commit('dropApiField', payload);
      commit('endDragApiField');
    },
  },
});
