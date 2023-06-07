export enum DropdownItemTypes {
  mid = 'mid',
  end = 'end',
}


export enum ActionTypes {
  expandAll = 'expandAll',
  collapseAll = 'collapseAll',
  startupOpening = 'startupOpening',
}

export type EntityContent = {
  _nodeId: string,
  _name: string,
  _fgs: string,
  _state: string,
  _overstock: string,
  _stockout: string,
  _nodeFlags: string,
}

export type EntityCombined = EntityContent & {
  cat?: Array<EntityCombined>
  leaf?: Array<EntityContent>
}