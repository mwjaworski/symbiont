import { IMap, IIndexable, index } from './types';
import { IExecutionContext } from './symbiont';
import { ISymbiont } from './symbiont';

export type component_id = string;
export type skill_type = 'never' | 'structure' | 'input' | 'output' | 'action' | 'modifier' | 'meta';
export type skill_code = ISkillCompositeCode | string;
export type skill_id = string;

export interface IComponent extends IIndexable {
  attributes(): IMap<any>;
  skills(): IMap<ISkill>;
}

export interface IToken {
  type: string;
  value: any;
}

export interface ISkill extends IIndexable {
  type: skill_type;
  code: skill_code;
  create(...args: any[]): IInstruction;
  execute(symbiont: ISymbiont, executionLens: IExecutionContext, instruction: IInstruction): ISymbiont;
}
export interface ISymbiontExecuteFn {
  (attributes: IMap<IAttribute>, instruction: IInstruction): ISymbiont;
}
export interface ISymbiontCreateFn {
  (...args: any[]): ISymbiont;
}

interface ISkillCompositeCode {
  start: string;
  end: string;
}

export interface IAttribute {

}

export interface IInstruction {
  type: skill_id;
  parameters: any;
}

