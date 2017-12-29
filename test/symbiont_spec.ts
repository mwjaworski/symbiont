
import { expect } from 'chai';
import { IComponent, ISkill, IToken, IInstruction, IAttribute, skill_code, skill_id, skill_type } from '../lib/core/component';
import { Symbiont, ISymbiont, IExecutionContext } from '../lib/core/symbiont';
import { IMind, MindServant } from '../lib/core/mind';
import { IMap } from '../lib/core/types';

interface IAlphaSkillSymbiont {
  (letterA: string, letterB: string): IInstruction;
}
interface IAlphaSkillInstruction extends IInstruction {
  type: string;
  parameters: {
    letters: string;
  };
}

interface IBetaSkillSymbiont {
  (n: number, values: string[]): IInstruction;
}
interface IBetaSkillInstruction extends IInstruction {
  type: string;
  parameters: {
    v1: string;
    v2: string;
  };
}

interface IAlphabetComponentSymbiont extends IComponent {
  alpha: IAlphaSkillSymbiont;
  beta: IBetaSkillSymbiont;
}
interface IAlphabetComponentAttributes extends IMap<IAttribute> {
  stack: any[];
  hash: IMap<string>;
}

describe('Hive Mind', function (): void {
  describe('Symbiont', function (): void {

    class AlphaSkill implements ISkill {
      get id(): skill_id {
        return 'alpha';
      }
      get type(): skill_type {
        return 'meta';
      }
      get code(): skill_code {
        return '!A';
      }
      create(letterA: string, letterB: string): IAlphaSkillInstruction {
        return {
          type: 'alpha',
          parameters: {
            letters: `${letterA}${letterB}`
          }
        };
      }
      execute(symbiont: ISymbiont, executionContext: IExecutionContext, instruction: IAlphaSkillInstruction): ISymbiont {
        return symbiont;
      }
    }

    class BetaSkill implements ISkill {
      get id(): skill_id {
        return 'beta';
      }
      get type(): skill_type {
        return 'meta';
      }
      get code(): skill_code {
        return '!B';
      }
      create(n: number, values: string[]): IBetaSkillInstruction {
        return {
          type: 'beta',
          parameters: {
            v1: values[0],
            v2: values[1]
          }
        };
      }
      execute(symbiont: ISymbiont, executionContext: IExecutionContext, instruction: IBetaSkillInstruction): ISymbiont {
        return symbiont;
      }
    }

    class AlphabetComponent implements IComponent {
      get id(): string {
        return 'alphabet';
      }
      attributes(): IAlphabetComponentAttributes {
        return {
          stack: [],
          hash: {}
        };
      }
      skills(): IMap<ISkill> {
        return {
          'alpha': new AlphaSkill(),
          'beta': new BetaSkill()
        } as IMap<ISkill>;
      }
    }

    it('should create a symbiont with the alphabet component', () => {

      interface IMySymbiont extends IAlphabetComponentSymbiont, ISymbiont {

      }

      let symbiont: IMySymbiont = Symbiont.build([new AlphabetComponent()]) as IMySymbiont;

      expect(symbiont.mode).to.equal('execute');
      expect(symbiont.alpha).to.a('function');
      expect(symbiont.beta).to.a('function');
      expect(symbiont.mind.instructions).to.deep.equal([]);
      expect(symbiont.mind.attributes).to.deep.equal({
        alphabet: {
          stack: [],
          hash: {}
        }
      });


      // calls create instruction ? or execute ?
      // symbiont.skill('alpha').parse();
      // symbiont.create.alpha();
      // symbiont.execute.alpha();
      // symbiont.parse.alpha();

      // symbiont.create('alpha', 1);

      // const parser: ISymbiontParser = symbiont.parse;

      // parser.alpha().beta();


      // hive = new Hive();
      // hive.registerComponent(new AlphabetComponent());

      // symbiont = hive.spawn();
      // symbiont.learn({});
      // symbiont.learn({});
      // symbiont.pushLearn({});
      // symbiont.pushLearn({});
      // symbiont.popLearn({});
      // symbiont.learn({});

      // symbiont.listen((output: string) => output);
      // symbiont.say('This is what I say');

      // symbiont.parse('listen', 'whatever');
      // symbiont.create('listen', ['whatever']);
      // symbiont.execute('listen', attributes, instruction);

      // // is a create + execute all in one
      // symbiont.listen(['whatever']);

      // all skills are <noun><verb>
      // mind merge   @1
      // mind swap    @2
      // mind push    @3
      // mind pop     @4

    });

  });
});
