import { AstTypes, type Ast, type ChildNodes, type Nodes } from './parser';

type ParentNodes = Nodes | null;

type TraverseFns = {
  enter: (node: Nodes, parent: ParentNodes) => void;
  exit: (node: Nodes, parent: ParentNodes) => void;
};

export type Visitor = {
  [P in keyof typeof AstTypes]: TraverseFns;
};

export const traverser = (ast: Ast, visitor: Visitor) => {
  const traverseArray = (arr: ChildNodes[], parent: ParentNodes) => {
    arr.forEach((node) => {
      traverse(node, parent);
    });
  };

  const traverse = (node: Nodes, parent: ParentNodes) => {
    const visitorNode = visitor[node.type];

    // enter
    visitorNode.enter(node, parent);

    switch (node.type) {
      case AstTypes.NumberLiteral:
        break;

      case AstTypes.CallExpression:
        traverseArray(node.params, node);
        break;

      case AstTypes.Program:
        traverseArray(node.body, node);
        break;
    }

    // enter
    visitorNode.exit(node, parent);
  };

  traverse(ast, null);
};
