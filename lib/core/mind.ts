import { IAttribute, IInstruction } from './component';
import { IMap } from './types';

export interface IMind {
  attributes: IMap<IMap<IAttribute>>;
  instructions: IInstruction[];
}

export class MindServant {

  static create(): IMind {
    return {
      instructions: [],
      attributes: {}
    };
  }

}