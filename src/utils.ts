import { EntityCombined } from "./types";

export const getSiblingsFromEntityCombined = ({ cat }: EntityCombined) => cat ?? []

export const getEntityContentFromEntityCombined = ({ _nodeId, _name, _fgs, _state, _overstock, _stockout, _nodeFlags }: EntityCombined) => ([ _nodeId, _name, _fgs, _state, _overstock, _stockout, _nodeFlags ])