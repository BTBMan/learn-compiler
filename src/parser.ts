import { TokenTypes, type Token } from './tokenizer';

export enum AstTypes {
  Program = 'Program',
  CallExpression = 'CallExpression',
  NumberLiteral = 'NumberLiteral',
}

interface CallExpression {
  type: AstTypes.CallExpression;
  name: string;
  params: AstAllTypes[];
}

interface NumberLiteral {
  type: AstTypes.NumberLiteral;
  value: string;
}

type AstAllTypes = CallExpression | NumberLiteral;

export interface Ast {
  type: AstTypes.Program;
  body: AstAllTypes[];
}

const createAstNode = (): Ast => {
  return {
    type: AstTypes.Program,
    body: [],
  };
};

const createCallExpression = (name: string): CallExpression => {
  return {
    type: AstTypes.CallExpression,
    name,
    params: [],
  };
};

const createNumberLiteral = (value: string): NumberLiteral => {
  return {
    type: AstTypes.NumberLiteral,
    value,
  };
};

export const parser = (tokens: Token[]) => {
  let current = 0;
  const ast = createAstNode();

  const walk = () => {
    let token = tokens[current];

    // number
    if (token.type === TokenTypes.Number) {
      current++;
      return createNumberLiteral(token.value);
    }

    // callExpression
    if (token.type === TokenTypes.Paren && token.value === '(') {
      token = tokens[++current];
      const callExpression = createCallExpression(token.value);

      token = tokens[++current];
      while (
        token &&
        !(token.type === TokenTypes.Paren && token.value === ')')
      ) {
        callExpression.params.push(walk());
        token = tokens[current];
      }

      current++;
      return callExpression;
    }

    throw new Error(`Parse Error: ${token}`);
  };

  while (current < tokens.length) {
    ast.body.push(walk());
  }

  return ast;
};
