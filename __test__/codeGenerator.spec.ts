import { expect, test } from 'vitest';
import { codeGenerator } from '../src/codeGenerator';

test('codeGenerator', () => {
  const node = {
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

  const code = 'add(2, subtract(4, 2));';

  expect(codeGenerator(node)).toBe(code);
});
