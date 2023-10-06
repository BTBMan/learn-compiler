import { AstTypes, type Ast } from './parser';
import { traverser } from './traverser';

export const transformer = (ast: Ast) => {
  const newAst = {
    type: AstTypes.Program,
    body: [],
  };

  (ast as any)._context = newAst.body;

  traverser(ast, {
    CallExpression: {
      enter(node, parent) {
        console.log({ node, parent });
        // TODO type problem
        if (node.type === AstTypes.CallExpression) {
          let expression = {
            type: AstTypes.CallExpression,
            callee: {
              type: 'Identifier',
              name: node.name,
            },
            arguments: [],
          };

          // establish connection
          (node as any)._context = expression.arguments;

          // It means that's Program
          if (parent?.type !== AstTypes.CallExpression) {
            (expression as any) = {
              type: 'ExpressionStatement',
              expression,
            };
          }

          (parent as any)._context.push(expression);
        }
      },
    },
    NumberLiteral: {
      enter(node, parent) {
        (parent as any)._context.push({
          type: AstTypes.NumberLiteral,
          value: (node as any).value,
        });
      },
    },
  });

  return newAst;
};
