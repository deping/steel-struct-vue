export interface Persist {
  save: () => Promise<void>;
  load: () => Promise<void>;
}
