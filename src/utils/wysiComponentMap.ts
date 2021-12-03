import WysiTitle from '../components/WysiComponents/WysiTitle.vue';
import WysiParagraph from '../components/WysiComponents/WysiParagraph.vue';
import WysiCard from '../components/WysiComponents/WysiCard.vue';
import WysiChart from '../components/WysiComponents/WysiChart.vue';
import WysiMap from '../components/WysiComponents/WysiMap.vue';

export type WysiDataType = 'singleValue' | 'array' | 'arrayWithCoordinates';

export const wysiComponentMap: {
  [key: string]: {
    vueComponent: any;
    dataType: WysiDataType;
  };
} = {
  'wysi-title': {
    vueComponent: WysiTitle,
    dataType: 'singleValue'
  },
  'wysi-paragraph': {
    vueComponent: WysiParagraph,
    dataType: 'singleValue'
  },
  'wysi-card': {
    vueComponent: WysiCard,
    dataType: 'singleValue'
  },
  'wysi-chart': {
    vueComponent: WysiChart,
    dataType: 'array'
  },
  'wysi-map': {
    vueComponent: WysiMap,
    dataType: 'arrayWithCoordinates'
  }
};
