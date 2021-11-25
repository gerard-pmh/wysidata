import WysiTitle from '../components/WysiComponents/WysiTitle.vue';
import WysiParagraph from '../components/WysiComponents/WysiParagraph.vue';
import WysiCard from '../components/WysiComponents/WysiCard.vue';
import WysiChart from '../components/WysiComponents/WysiChart.vue';

export const wysiComponentMap: {
  [key: string]: {
    vueComponent: any;
    consumeArray?: boolean;
  };
} = {
  'wysi-title': {
    vueComponent: WysiTitle
  },
  'wysi-paragraph': {
    vueComponent: WysiParagraph
  },
  'wysi-card': {
    vueComponent: WysiCard
  },
  'wysi-chart': {
    vueComponent: WysiChart,
    consumeArray: true
  }
};
