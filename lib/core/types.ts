export type index = string;

// id = 'name@version'
export interface IIndexable {
  readonly id: index;
}

export interface IMap<T> {
  [index: string]: T;
}
