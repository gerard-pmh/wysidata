import { MappingId, WysiMapping } from '../store';

export function findMapping(
  id: MappingId,
  mappings: WysiMapping[]
): WysiMapping | undefined {
  return mappings.find(
    m => id.compId === m.id.compId && id.boxId === m.id.boxId
  );
}
