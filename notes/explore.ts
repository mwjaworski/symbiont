export type keyword_code = string;
export type keyword_name = string;
export type modifier_name = string;
export type token_parameter = number | string | IToken;

export interface IExecutable {
  error?: string;
  value: any;
}

export interface IModifier extends IExecutable {
  type: modifier_name;
}

export interface IToken extends IExecutable {
  modifiers?: IModifier[];
  type: keyword_name;
}

interface IComponentCode {
  start: string;
  end: string;
}

type ex_component_type = 'never' | 'structure' | 'action' | 'modifier' | 'meta';
type ex_component_code = IComponentCode | string;

interface IComponentX {
  type: ex_component_type;
  code: any;
  parse?: Function;
  define?: any;  
  execute?: () => void;
}

class Component {

}


class NOOPComponent extends Component implements IComponentX {

  type: ex_component_type = 'never';
  code: ex_component_code = '00';

  constructor() {
    super();
    // this.type = 'never';
    // this.code = '00';
  }
  
  parse(): IToken {
    return {
      type: 'noop',
      value: undefined
    };
  }
  define(): void {
    let y: number = 1;
  }
  execute(): void {
    let y: number = 1;
  }
}
