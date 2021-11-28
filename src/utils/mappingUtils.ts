import { ApiNodeId, ApiValue } from './apiUtils';

export interface MappingId {
  compId: number;
  boxId: number;
}

export interface WysiMapping {
  id: MappingId;
  apiNodeId: ApiNodeId;
  value?: ApiValue;
  highlighted?: boolean;
}

export function findMapping(
  id: MappingId,
  mappings: WysiMapping[]
): WysiMapping | undefined {
  return mappings.find(
    m => id.compId === m.id.compId && id.boxId === m.id.boxId
  );
}
