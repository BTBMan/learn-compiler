import { expect, test } from 'vitest';
import { type Token, TokenTypes } from '../src/tokenizer';
import { type Ast, parser, AstTypes } from '../src/parser';
import { type Visitor, traverser } from '../src/traverser';
import { transformer } from '../src/transformer';

test('transformer', () => {
  const ast: Ast = {
    type: AstTypes.Program,
    body: [
      {
        type: AstTypes.CallExpression,
        name: 'add',
        params: [
          {
            type: AstTypes.NumberLiteral,
            value: '2',
          },
          {
            type: AstTypes.CallExpression,
            name: 'subtract',
            params: [
              {
                type: AstTypes.NumberLiteral,
                value: '4',
              },
              {
                type: AstTypes.NumberLiteral,
                value: '2',
              },
            ],
          },
        ],
      },
    ],
  };

  const newAst = {
    type: 'Program',
    body: [
      {
        type: 'ExpressionStatement',
        expression: {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: 'add',
          },
          arguments: [
            {
              type: 'NumberLiteral',
              value: '2',
            },
            {
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: 'subtract',
              },
              arguments: [
                {
                  type: 'NumberLiteral',
                  value: '4',
                },
                {
                  type: 'NumberLiteral',
                  value: '2',
                },
              ],
            },
          ],
        },
      },
    ],
  };

  expect(transformer(ast)).toEqual(newAst);
});
