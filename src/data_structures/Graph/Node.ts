import { UniqueId } from "utils/GenerateUniqueId";

type AdjacentPredicate<T> = (node: GraphNode<T>) => boolean;

export const NotFoundError = new Error("Could not find the node");

export default class GraphNode<T> {
  value: T;
  id: UniqueId;
  adjacents: Array<GraphNode<T>> = [];

  constructor(id: UniqueId, value: T) {
    this.id = id;
    this.value = value;
  }

  private findNodeIndex(
    node: GraphNode<T>,
    predicate?: AdjacentPredicate<T>
  ): number {
    const defaultPredicate: AdjacentPredicate<T> = (
      currentNode: GraphNode<T>
    ): boolean => node.id === currentNode.id;

    const predicateFunction: AdjacentPredicate<T> =
      predicate || defaultPredicate;

    const index = this.adjacents.findIndex(predicateFunction);

    if (index < 0) throw NotFoundError;

    return index;
  }

  addAdjacent(node: GraphNode<T>): void {
    this.adjacents.push(node);
  }

  removeAdjacent(
    node: GraphNode<T>,
    predicate?: AdjacentPredicate<T>
  ): GraphNode<T> {
    try {
      const index = this.findNodeIndex(node, predicate);

      this.adjacents.splice(index, 1);
    } catch {}

    return node;
  }

  isAdjacent(node: GraphNode<T>, predicate?: AdjacentPredicate<T>): boolean {
    this.findNodeIndex(node, predicate);
    return true;
  }
}
