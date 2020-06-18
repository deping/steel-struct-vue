export interface Persist {
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
