import { IMap, index } from './types';
import { IMind, MindServant } from './mind';
import { IComponent, IInstruction, IToken, IAttribute, ISkill, ISymbiontCreateFn, ISymbiontExecuteFn } from './component';
import * as _ from 'lodash';

type A = (...args: any[]) => ISymbiont;

export interface ISymbiont {
  readonly components: IMap<IComponent>;
  readonly mind: IMind;
  mode: symbiont_mode;
  create(skillId: string, ...args: any[]): IInstruction;
}

type symbiont_mode = 'record' | 'execute';
interface ISymbiontExecuteModeFn {
  (skillId: string, instruction: IInstruction): ISymbiont;
}

export interface ISkillComponent extends ISkill {
  component: IComponent;
}

export class Symbiont implements ISymbiont {

  mode: symbiont_mode;

  private _skills: IMap<ISkill>;
  private _components: IMap<IComponent>;

  get components(): IMap<IComponent> {
    return this._components;
  }

  private _executionContext: ExecutionContext;
  get mind(): IMind {
    return this._executionContext.minds[this._executionContext.minds.length - 1];
  }

  constructor(components: IComponent[]) {

    this.mode = 'execute';
    this._components = _.zipObject(_.map(components, (component: IComponent): string => component.id), components) as IMap<IComponent>;
    this._executionContext = new ExecutionContext();
    this._executionContext.pushMind(MindServant.create());
    this._addSkills();
  }

  static build(components: IComponent[]): ISymbiont {
    return new Symbiont(components);
  }

  create(skillId: string, ...args: any[]): IInstruction {
    return this._skills[skillId].create(...args);
  }

  private _addSkills(): void {
    _.each(this._components, (component: IComponent): void => {
      _.each(component.skills(), (skill: ISkillComponent) => {

        // TODO review if we should modify a skill or not
        skill.component = component;
        this._skills[skill.id] = skill;

        // NOTE we should not add dynamic methods, have to run this if we add skills dynamically
        // this[skill.id] = (...args: any[]): ISymbiont => {
        //   return (this[`_${this.mode}`] as ISymbiontExecuteModeFn)(skill.id, this.create(skill.id, ...args));
        // };
      });
    });
  }

  private _record(skillId: string, instruction: IInstruction): ISymbiont {
    this.mind.instructions.push(instruction);
    return this;
  }

  private _execute(skillId: string, instruction: IInstruction): ISymbiont {
    const skill: ISkillComponent = this._skills[skillId] as ISkillComponent;
    const component: IComponent = skill.component;
    const mind: IMind = this.mind;

    mind.attributes[component.id] = mind.attributes[component.id] || component.attributes();
    return skill.execute(this, this._executionContext.lens(skillId), instruction);
  }

}

export interface IExecutionContext {
  attribute(key: string): any;
}
export interface IExecutionContextInternal extends IExecutionContext {
  addMind(mind: IMind, symbiont: ISymbiont): void;
  readonly minds: IMind[];
}

class ExecutionContext {

  private _minds: IMind[];
  private _lens: {
    componentId: string;
  };

  constructor() {
    this._minds = [];
    this._lens = {
      componentId: ''
    };
  }

  lens(componentId: string): IExecutionContext {
    this._lens.componentId = componentId;
    return this;
  }

  attribute(attr: string): any {
    // TODO if we use a friend property then we should search friends of the component
    const componentLens: string = this._lens.componentId;
    const mind: IMind = _.find(this._minds, (_mind: IMind): boolean => {
      return (_.isObject(_mind.attributes[componentLens]))
        ? (_mind.attributes[componentLens][attr] !== undefined)
        : false;
    });

    // TODO do we wrap this so we never get undefined
    return (mind)
      ? mind.attributes[componentLens][attr]
      : undefined;
  }

  pushMind(mind: IMind): void {
    this._minds.push(mind);
  }
  popMind(): IMind | undefined {
    return this._minds.pop() as IMind;
  }
  resetMind(): void {
    this._minds.length = 1;
  }
  eraseMind(): void {
    this._minds = [];
  }

  get minds(): IMind[] {
    return this._minds;
  }
}