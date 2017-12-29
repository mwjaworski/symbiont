// import {IMap} from '../core/types';
// import { IAgent } from '../core/agent';
// import { ISkill, IAttribute, IInstruction, skill_code, skill_id, skill_type } from '../core/skill';
// import { IComponent, component_id } from '../core/component';
// import { ISymbiont } from '../core/symbiont';
// import { IExecuteContext } from '../core/component';

// class InstallSkill implements ISkill {
//   get id(): skill_id {
//     return 'install';
//   }
//   get type(): skill_type {
//     return 'meta';
//   }
//   get code(): skill_code {
//      return '-+';
//   }
//   compile(): void {
//     let a: number = 0;
//   }
//   parse(component: IComponent): IInstruction {
//     return {
//       type: 'install',    
//       parameters: {
//         component
//       }    
//     };
//   }
//   execute(symbiont: ISymbiont, context: IExecuteContext, instruction: IInstruction): ISkill {
//     return this;
//   }
// }

// export interface IBootstrapComponentAttributes {

// }
// export interface IBootstrapComponentSkills extends IMap<ISkill> {
//   install: InstallSkill;
// }
// export interface IBootstrapComponentAPI extends ISymbiont {
//   upgrade(component: IComponent): ISymbiont;
//   install(agent: IAgent): ISymbiont;
// }
// export class BootstrapComponent implements IComponent {


//   get id(): string {
//     return 'bootstrap';
//   }
//   attributes(): IBootstrapComponentAttributes {
//     return {};
//   }
//   skills(): IBootstrapComponentSkills {
//     return {
//       install: new InstallSkill()
//     };
//   }
// }