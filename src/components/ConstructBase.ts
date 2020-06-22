declare const _: any;

export interface Persist0 {
  // If tab hasn't own data, then let serialize/deserialize empty.
  // save tab data to construct data
  serialize: () => void;
  // set tab data from construct data
  deserialize: () => void;
}

export interface Persist extends Persist0 {
  // If tab hasn't own data, then let serialize/deserialize empty.
  // save tab data to construct data
  serialize: () => void;
  // set tab data from construct data
  deserialize: () => void;
  // serialize then push to backend
  save: () => Promise<void>;
  // pull from backend then deserialize
  load: () => Promise<void>;
}

export function canSerialize(obj: any): obj is Persist0 {
  if (!_.isObject(obj)) return false;
  return "serialize" in obj;
}

export function canSave(obj: any): obj is Persist {
  if (!_.isObject(obj)) return false;
  return "serialize" in obj;
}
