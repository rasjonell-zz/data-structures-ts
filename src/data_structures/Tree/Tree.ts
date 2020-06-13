import Queue from "data_structures/Queue";

import TreeNode from "./Node";

type TraversalType = "DFT" | "BFT";
type TraversalCallback<T> = (currentNode: TreeNode<T>) => any;
type ContainsCallback<T> = (currentNode: TreeNode<T>) => boolean;

const DoesNotExistError = new Error(
  "Could not find parent Node with the given predicate"
);

class Tree<T> {
  private readonly typeToTraverse = {
    DFT: "traverseDepthFirst",
    BFT: "traverseBreadthFirst",
  };

  private _root: TreeNode<T> | null;

  constructor(data: T) {
    const node = new TreeNode<T>(data);
    this._root = node;
  }

  get root(): TreeNode<T> {
    return this._root;
  }

  private findParent(predicate: any, type: TraversalType): TreeNode<T> {
    const containsCallback: ContainsCallback<T> =
      typeof predicate === "function"
        ? predicate
        : (node) => node.data === predicate;

    const parent = this.contains(containsCallback, type);

    if (!parent) {
      throw DoesNotExistError;
    }

    return parent;
  }

  traverseDepthFirst(callback: TraversalCallback<T>): void {
    recurse(this._root);

    function recurse(currentNode: TreeNode<T>): void {
      currentNode.children.forEach((node: TreeNode<T>): void => {
        recurse(node);
      });

      callback(currentNode);
    }
  }

  traverseBreadthFirst(callback: TraversalCallback<T>): void {
    const queue = new Queue<TreeNode<T>>();

    let currentNode = this._root;
    while (currentNode) {
      currentNode.children.forEach((node: TreeNode<T>): void => {
        queue.enqueue(node);
      });

      callback(currentNode);

      try {
        currentNode = queue.dequeue();
      } catch {
        // the queue is empty
        currentNode = null;
      }
    }
  }

  contains(
    callback: ContainsCallback<T>,
    type: TraversalType = "BFT"
  ): TreeNode<T> {
    let result: TreeNode<T> = null;

    const traversalFunction = this.typeToTraverse[type];
    const traversalCallback: TraversalCallback<T> = (node) => {
      if (callback(node)) {
        result = node;
        return;
      }
    };

    this[traversalFunction](traversalCallback);

    return result;
  }

  add(data: T, predicate: any, type: TraversalType = "BFT"): void {
    const parent: TreeNode<T> = this.findParent(predicate, type);
    const child: TreeNode<T> = new TreeNode<T>(data);

    parent.children.push(child);
    child.parent = parent;
  }

  remove(data: T, predicate: any, type: TraversalType = "BFT"): TreeNode<T> {
    const parent: TreeNode<T> = this.findParent(predicate, type);

    const dataIndex = parent.children.findIndex(
      (node: TreeNode<T>): boolean => node.data === data
    );

    if (dataIndex === undefined) {
      throw DoesNotExistError;
    }

    const [removedChild] = parent.children.splice(dataIndex, 1);
    return removedChild;
  }
}

export default Tree;
