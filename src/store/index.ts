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
  path: string;
  value?: ApiValue;
  highlighted: boolean;
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
    compIdSeq: 0,
    components: [],
    mappings: [],
    draggedComponent: undefined,
    draggedApiField: undefined
  },
  getters: {
    getMappings: state => (compId: number) => {
      return state.mappings.filter(m => m.compId === compId);
    },
    isApiFieldHighlighted: state => (apiId: number, apiPath: string) => {
      return !!state.mappings.find(
        m => m.highlighted && m.apiId === apiId && m.path === apiPath
      );
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
    deleteComponent(state, compId: number) {
      const index = state.components.findIndex(c => c.id === compId);
      state.components.splice(index, 1);
    },
    deleteApi(state, apiId: number) {
      const index = state.apis.findIndex(a => a.id === apiId);
      state.apis.splice(index, 1);
    },
    deleteMappingsWithComp(state, compId: number) {
      const index = state.mappings.findIndex(m => m.compId === compId);
      state.mappings.splice(index, 1);
    },
    deleteMappingsWithApi(state, apiId: number) {
      const index = state.mappings.findIndex(m => m.apiId === apiId);
      state.mappings.splice(index, 1);
    },
    dragComponent(state, draggedComponent: string) {
      state.draggedComponent = draggedComponent;
    },
    dragApiField(state, draggedApiField: ApiStructure) {
      state.draggedApiField = draggedApiField;
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
          ...state.draggedApiField,
          highlighted: false
        };
      } else {
        state.mappings.push({
          compId,
          boxId,
          ...state.draggedApiField,
          highlighted: false
        });
      }
    },
    dragComponentEnd(state) {
      state.draggedComponent = undefined;
    },
    dragApiFieldEnd(state) {
      state.draggedApiField = undefined;
    },
    highlightMappingsFromValueBox(
      state,
      { compId, boxId }: { compId: number; boxId: number }
    ) {
      state.mappings = state.mappings.map(m =>
        m.compId === compId && m.boxId === boxId
          ? { ...m, highlighted: true }
          : m
      );
    },
    highlightMappingsFromApiField(
      state,
      { apiId, path }: { apiId: number; path: string }
    ) {
      state.mappings = state.mappings.map(m =>
        m.apiId === apiId && m.path === path ? { ...m, highlighted: true } : m
      );
    },
    disableHighlightMappings(state) {
      state.mappings = state.mappings.map(m => ({ ...m, highlighted: false }));
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
    deleteComponent({ commit }, compId: number) {
      commit('deleteMappingsWithComp', compId);
      commit('deleteComponent', compId);
    },
    deleteApi({ commit }, apiId: number) {
      commit('deleteMappingsWithApi', apiId);
      commit('deleteApi', apiId);
    },
    dragComponent({ commit }, payload: WysiComponent) {
      commit('dragComponent', payload);
    },
    dragApiField({ commit }, payload: ApiStructure) {
      commit('dragApiField', payload);
    },
    dragEnd({ commit }) {
      commit('dragComponentEnd');
      commit('dragApiFieldEnd');
    },
    dropComponent({ commit }, payload) {
      commit('incrementComponentId');
      commit('dropComponent', payload);
    },
    dropApiField({ commit }, payload) {
      commit('dropApiField', payload);
    },
    valueBoxMouseEnter({ commit }, payload: { compId: number; boxId: number }) {
      commit('highlightMappingsFromValueBox', payload);
    },
    valueBoxMouseLeave({ commit }) {
      commit('disableHighlightMappings');
    },
    apiFieldMouseEnter({ commit }, payload: { apiId: number; path: string }) {
      commit('highlightMappingsFromApiField', payload);
    },
    apiFieldMouseLeave({ commit }) {
      commit('disableHighlightMappings');
    }
  }
});
