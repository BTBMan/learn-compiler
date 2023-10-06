import { expect, test } from 'vitest';
import { type Ast, AstTypes } from '../src/parser';
import { type Visitor, traverser } from '../src/traverser';

test('traverser', () => {
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

  const visitor: Visitor = {
    [AstTypes.Program]: {
      enter(node, parent) {
        callArr.push([`${AstTypes.Program}: enter`, node.type, parent?.type]);
      },
      exit(node, parent) {
        callArr.push([`${AstTypes.Program}: exit`, node.type, parent?.type]);
      },
    },
    [AstTypes.CallExpression]: {
      enter(node, parent) {
        callArr.push([
          `${AstTypes.CallExpression}: enter`,
          node.type,
          parent?.type,
        ]);
      },
      exit(node, parent) {
        callArr.push([
          `${AstTypes.CallExpression}: exit`,
          node.type,
          parent?.type,
        ]);
      },
    },
    [AstTypes.NumberLiteral]: {
      enter(node, parent) {
        callArr.push([
          `${AstTypes.NumberLiteral}: enter`,
          node.type,
          parent?.type,
        ]);
      },
      exit(node, parent) {
        callArr.push([
          `${AstTypes.NumberLiteral}: exit`,
          node.type,
          parent?.type,
        ]);
      },
    },
  };

  const callArr: (string | undefined)[][] = [];

  traverser(ast, visitor);

  expect(callArr).toEqual([
    [`${AstTypes.Program}: enter`, AstTypes.Program, undefined],
    [
      `${AstTypes.CallExpression}: enter`,
      AstTypes.CallExpression,
      AstTypes.Program,
    ],
    [
      `${AstTypes.NumberLiteral}: enter`,
      AstTypes.NumberLiteral,
      AstTypes.CallExpression,
    ],
    [
      `${AstTypes.NumberLiteral}: exit`,
      AstTypes.NumberLiteral,
      AstTypes.CallExpression,
    ],
    [
      `${AstTypes.CallExpression}: enter`,
      AstTypes.CallExpression,
      AstTypes.CallExpression,
    ],
    [
      `${AstTypes.NumberLiteral}: enter`,
      AstTypes.NumberLiteral,
      AstTypes.CallExpression,
    ],
    [
      `${AstTypes.NumberLiteral}: exit`,
      AstTypes.NumberLiteral,
      AstTypes.CallExpression,
    ],
    [
      `${AstTypes.NumberLiteral}: enter`,
      AstTypes.NumberLiteral,
      AstTypes.CallExpression,
    ],
    [
      `${AstTypes.NumberLiteral}: exit`,
      AstTypes.NumberLiteral,
      AstTypes.CallExpression,
    ],
    [
      `${AstTypes.CallExpression}: exit`,
      AstTypes.CallExpression,
      AstTypes.CallExpression,
    ],
    [
      `${AstTypes.CallExpression}: exit`,
      AstTypes.CallExpression,
      AstTypes.Program,
    ],
    [`${AstTypes.Program}: exit`, AstTypes.Program, undefined],
  ]);
});
