import { AstTypes } from './parser';

export const codeGenerator = (node) => {
  switch (node.type) {
    case AstTypes.Program:
      return node.body.map(codeGenerator).join('\n');

    case 'ExpressionStatement':
      return codeGenerator(node.expression) + ';';

    case AstTypes.CallExpression:
      return (
        codeGenerator(node.callee) +
        '(' +
        node.arguments.map(codeGenerator).join(', ') +
        ')'
      );

    case 'Identifier':
      return node.name;

    case AstTypes.NumberLiteral:
      return node.value;
  }
};
