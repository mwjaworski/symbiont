## Define and Invoke

```javascript
interface IBot {
  interpret(code: string, name?: string): IDiscussion;
}
interface IRule {
  match: IMatch;
  response: IResponse;
  actions: IAction[];
  assignments: IAssignment[];
  contextId: string;
}
interface IResponse {
  requirements: Function[];
  // tree of response
}
interface IMessage {
  matchedRule: IRule;
  response: IResponse;
  echo: string;
}
interface IContext {
  conversation: IMessage[];
  memory: IDictionary;
  rules: IRule[];
}
interface IDiscussionInvocation {
  (context: IContext, done: Function);
}
interface IDiscussion {
  id: string;
  context: IContext;

  push(discussion: IDiscussion): IDiscussion;
  pop(): IDiscussion;
  reset(): IDiscussion;
  goTo(name: string);
  variable(name: string, value: any | any[] | lookup): void;
  lookup(name: string): any;
  method(name: string, fn: IDiscussionInvocation);
  invoke(name: string);

  converse(message: string): Promise;
}
```

We want to follow these steps when parsing.

```javascript
class Bot implements IBot {

  private discussions: <IDiscussions>{};

  interpret(code: string, name?: string): IDiscussion {
    const tokens: string[] = tokenize(code);
    const tokenTypes: ITokenType[] = identify(tokens);
    const ast: IDiscussion[] = parse(tokenTypes);
  }
  private tokenize(code: tokens): string[] {
    return [];
  }
  private identify(tokens: string[]): ITokenType[] {
    return _.map(tokens, (token) => this.identifyToken(token));
  }
  private identifyToken(token: string): ITokenType {
    return {
      type: 'literal',
      token
    };
  }
  private parse(tokens:ITokenType[], discussion: IDiscussion): IDiscussion {

    for (let token in tokens) {
      if (token.type === 'discussion-start') {
        discussion.addDiscussion(
          this.parse(tokens.slice(index), new Discussion())
        );
      }
      else if (token.type === 'discussion-end') {
        return discussion;
      }
      else if (token.type === 'variable') {
        // add all parsers to map and invoke
      }
    }

    return discussion;
  }
}
```

## Algorithm

At a high-level the core algorithm is four steps

```
parseCode -> code -> Knowledge
parseLanguage -> sentence -> Request
respond -> Knowledge -> Request -> Response
translate -> Response -> sentence
```

### Parse Code

To parse code we need to do the following:

1. Tokenize
2. Build Symbol Library (can be stored)
3. Convert to Execution Model (is used to run engine)

### Parse Language

To parse the langauge a human writes we do the following:

1. Tokenize
  -

###
