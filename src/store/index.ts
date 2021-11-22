import { createStore, Store, useStore as baseUseStore } from 'vuex';
import axios, { AxiosResponse } from 'axios';
import {
  Api,
  ApiStructure,
  ApiValue,
  extractApiStructureFromRoot
} from '../utils/apiUtils';
import { InjectionKey } from 'vue';

export interface WysiComponent {
  id: number;
  template: string;
}

export interface WysiMapping {
  compId: number;
  boxId: number;
  apiId: number;
  path: string[];
  value?: ApiValue;
}

export interface State {
  apiIdSeq: number;
  apis: Api[];
  compIdSeq: number;
  components: WysiComponent[];
  mappings: WysiMapping[];
  draggedComponent?: string;
  draggedApiField?: ApiStructure;
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
      { id: 3, template: 'wysi-card' }
    ],
    mappings: []
  },
  getters: {
    getMappings: state => (compId: number) => {
      return state.mappings.filter(m => m.compId === compId);
    }
  },
  mutations: {
    incrementComponentId(state) {
      state.compIdSeq++;
    },
    incrementApiId(state) {
      state.apiIdSeq++;
    },
    apiDataLoading(state, { id, url }: { id: number; url: string }) {
      state.apis.push({ id, url, loading: true });
    },
    apiDataLoaded(state, { id, res }: { id: number; res: AxiosResponse }) {
      const index = state.apis.findIndex(api => api.id === id);
      let api = state.apis[index];
      api = {
        ...api,
        loading: false,
        resData: res.data
      };
      api.structure = extractApiStructureFromRoot(api);
      state.apis[index] = api;
    },
    apiDataError(state, { id, error }: { id: number; error: string }) {
      const index = state.apis.findIndex(a => a.id === id);
      const api = state.apis[index];
      state.apis[index] = {
        ...api,
        loading: false,
        error: error.toString()
      };
    },
    deleteApi(state, id: number) {
      const index = state.apis.findIndex(a => a.id === id);
      state.apis.splice(index, 1);
    },
    dragComponent(state, payload: string) {
      state.draggedComponent = payload;
    },
    dragApiField(state, payload: ApiStructure) {
      state.draggedApiField = payload;
    },
    dropComponent(state, payload: number) {
      if (!state.draggedComponent) {
        return;
      }
      state.components.splice(payload, 0, {
        id: state.compIdSeq,
        template: state.draggedComponent
      });
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
          ...state.draggedApiField
        };
      } else {
        state.mappings.push({
          compId,
          boxId,
          ...state.draggedApiField
        });
      }
    },
    endDrag(state) {
      state.draggedComponent = undefined;
      state.draggedApiField = undefined;
    }
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
    dragComponent({ commit }, payload: WysiComponent) {
      commit('dragComponent', payload);
    },
    dragApiField({ commit }, payload: ApiStructure) {
      commit('dragApiField', payload);
    },
    dropComponent({ commit, state }, payload) {
      commit('incrementComponentId');
      commit('dropComponent', payload);
      commit('endDrag');
    },
    dropApiField({ commit, state }, payload) {
      commit('dropApiField', payload);
      commit('endDrag');
    }
  }
});
