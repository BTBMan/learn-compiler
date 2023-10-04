import { expect, test } from 'vitest';
import { type Token, TokenTypes } from '../src/tokenizer';
import { type Ast, parser, AstTypes } from '../src/parser';

test('parser', () => {
  const token: Token[] = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'subtract' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Paren, value: ')' },
    { type: TokenTypes.Paren, value: ')' },
  ];
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

  expect(parser(token)).toEqual(ast);
});

test('number', () => {
  const token: Token[] = [{ type: TokenTypes.Number, value: '2' }];
  const ast: Ast = {
    type: AstTypes.Program,
    body: [
      {
        type: AstTypes.NumberLiteral,
        value: '2',
      },
    ],
  };

  expect(parser(token)).toEqual(ast);
});

test('callExpression', () => {
  const token: Token[] = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Number, value: '3' },
    { type: TokenTypes.Paren, value: ')' },
  ];
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
            type: AstTypes.NumberLiteral,
            value: '3',
          },
        ],
      },
    ],
  };

  expect(parser(token)).toEqual(ast);
});

test('two callExpressions', () => {
  const token: Token[] = [
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'add' },
    { type: TokenTypes.Number, value: '2' },
    { type: TokenTypes.Number, value: '3' },
    { type: TokenTypes.Paren, value: ')' },
    { type: TokenTypes.Paren, value: '(' },
    { type: TokenTypes.Name, value: 'minus' },
    { type: TokenTypes.Number, value: '4' },
    { type: TokenTypes.Number, value: '1' },
    { type: TokenTypes.Paren, value: ')' },
  ];
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
            type: AstTypes.NumberLiteral,
            value: '3',
          },
        ],
      },
      {
        type: AstTypes.CallExpression,
        name: 'minus',
        params: [
          {
            type: AstTypes.NumberLiteral,
            value: '4',
          },
          {
            type: AstTypes.NumberLiteral,
            value: '1',
          },
        ],
      },
    ],
  };

  expect(parser(token)).toEqual(ast);
});
