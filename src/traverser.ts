import {
  AstTypes,
  type Ast,
  type ChildNodes,
  type Nodes,
  type CallExpression,
  type NumberLiteral,
} from './parser';

type ParentNodes = Nodes | null;

type AstTypeKeys = keyof typeof AstTypes;

// TODO
type TraverseFn<T extends AstTypeKeys = any> = (
  node: T extends AstTypes.CallExpression
    ? CallExpression
    : T extends AstTypes.NumberLiteral
    ? NumberLiteral
    : Nodes,
  parent: ParentNodes,
) => void;

type TraverseHooks<T extends AstTypeKeys> = {
  enter: TraverseFn<T>;
  exit?: TraverseFn;
};

export type Visitor = {
  [P in AstTypeKeys]?: TraverseHooks<P>;
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
    if (visitorNode) {
      visitorNode.enter(node, parent);
    }

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
    if (visitorNode && visitorNode.exit) {
      visitorNode.exit(node, parent);
    }
  };

  traverse(ast, null);
};
