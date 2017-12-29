

// class SubjectComponentXX  {
//   code: IACode = {
//     start: '((',
//     end: '))' 
//   };
//   parsePattern: string = `(( ?NAME * ))`;
//   define(method, ...params): IToken {

//   }
//   parse(context, token) => {
//     // current code from compiler
//     // call define
//     return this.define();
//   }  
//   execute(context, token) => {
//     // actually call the method defined
//   }  
// }

// interface IAgentXX {
//   componnet(): IComponentXX;
//   input(...inputs: any[]): IAgent;
//   output(map: (results: Function[]): any[]): IAgent;
// }     

// interface IComponentXX {
//   attribute(id: string, value: any): IComponentXX;
//   behavior(id: string): IBehavior;
// }

// interface IBehaviorXX {
//   code(id: string): IBehavior;
//   define(): IBehavior;
//   parse(): IBehavior;
//   execute(): IBehavior;
// }
