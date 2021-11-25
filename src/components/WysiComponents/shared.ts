import { WysiBoxMapping, WysiMapping } from '../../store';

export function getMapping(
  boxId: number,
  compId: number,
  mappings: WysiMapping[]
): WysiMapping | WysiBoxMapping {
  return (
    mappings.find(m => m.boxId === boxId && m.compId === compId) ?? {
      boxId,
      compId
    }
  );
}

export const loremIpsum =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce ut orci sem. Curabitur non varius lorem, non tincidunt nibh. Suspendisse et ultricies est, a vestibulum turpis. Cras tincidunt tempor faucibus. Nunc tempor sed mauris vitae dignissim. Phasellus pellentesque pulvinar volutpat. Donec rutrum vestibulum orci vitae dictum. Sed ex felis, fringilla at imperdiet dapibus, egestas lobortis felis. Morbi in facilisis mauris, ac accumsan ipsum. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris efficitur, velit molestie faucibus pulvinar, lorem tortor cursus mauris, ac porttitor erat massa a magna. Cras varius purus id enim dignissim viverra. Pellentesque eu risus nunc. Mauris nec ex sit amet ante rhoncus interdum. Sed sem enim, vehicula ac feugiat in, imperdiet at tellus.';
