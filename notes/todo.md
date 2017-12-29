- [x] REMOVE children from knowledge and subject and use value instead
- [x] REFACTOR make a knowledge look and feel just like a subject (inherit)
- [ ] TODO define steps knowing that we want to extend the capability to autonomous thinking agent
  - [ ] We should discover a match
  - [ ] We should think about which to honor, maybe not the first match OR
  - [ ] We trigger our own logic to execute stuff?
  - [ ] We execute stuff 

- [x] We should create attributes for components when an instruction executes
- [x] When we search for attributes we might need to skip attribute objects in mind
- [x] We should retire Hive 
- [ ] A skill defines one instruction - so maybe they should be instructions?
- [ ] Add components to Symbionts, then add Clone and Share
- [ ] Consider the "friend" property from C++ for sharing attributes with other instructions (if both list the other as friends, then they can access the other's attributes - it is on components)

```javascript

const symbiont: ISymbiont = new Symbiont();


symbiont.upgrade(componentA);
symbiont.upgrade(componentB);

symbiont
  .with(component)
  .subject('named')
    .listen()
    .

symbiont.<method>();

symbiont
  .on('click', symbiont.log)
  .;

```

### Purpose of Agent Technology

- isolate 
- 

Examples

- chatbot
- track behavior
- x access models (?)
- x keyboard shortcuts (?) the mapping rules
- x encase logic for handling ?
- ... 

- personality (through an agent)
- understanding
- logic about changes
- user choices about how they used the application
- keyboard mappings
- sharing knowledge (graph)
- models ? how do we store and query data ?
  - any data // why not - but this is not good
  - an agent can do... 

```
agent.attach(ui)
agent.capture input as a stream - RxJS
agent.respond output into RxJS (or interface)

input/output channels
- isolate algorithm from 
- what else do we do? We transform data and handle security, transformations, display, interactions, and (modeling data)
```

```javascript
interface IMyAgent extends IAgent, ISubjectComponent, INaturalLanguageComponent {

}

const agent: IMyAgent = IA({
  components: [
    new HierarchyComponent(),
    new InvocationComponent(),
    new NaturalLanguageComponent(),
    new DBKeyValueComponent(),
    new DBGraphComponent()    
  ]
});

agent
  .invocation('subtract', ['a', 'b'], (a, b) => a - b)   
  .subject()
    .invocation('add', ['a', 'b'], (a, b) => a + b)    
    .clause()
      .invoke('add', 1, 2)  
      .match([
        'hi',
        agent.match.any(),
        'bye'
      ])
      .match([
        'hi'
      ])
      .respond([
        'bye',
        agent.key('name')
      ])
    .end()
    .clause()
      .match(['hi', 'hi']);
    .end()
  .end()

agent
  .input('human', 'hi')
  .output((value) => /* each value */)

// all invocations - you must loop and execute each function to get the string or call the method
agent
  .input('keyboard', 'shift+cmd+k')
  .output((answers) => _.map(answers, (answer) => answer())) 

// a shortcut should be 
agent  
  .input('logic', '...micro-kanren query...')
  .map() // does above method

agent
  .input('query', [
    { predicate: 'g' }
  ])
  .output(/* same, loop to get all result objects */)

// can we support streams?

agent.component()
  .attribute('memory', () => {})
  .behavior('invoke')
    .code('^^')
    .define((method, ...params): IToken {

    })
    .parse((context, token) => {
      // current code from compiler
      // call define
      return this.define();
    })
    .execute((context, token) => {
      // actually call the method defined
    })   

// TODO come up with a unique name
```