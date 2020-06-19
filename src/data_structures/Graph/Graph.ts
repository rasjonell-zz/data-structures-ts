import Queue from "data_structures/Queue";
import Stack from "data_structures/Stack";

import ID, { UniqueId } from "utils/GenerateUniqueId";

import GraphNode, { NotFoundError } from "./Node";

type NodeWithMeta<T> = { _id: UniqueId } & T;
type VertexNode<T> = GraphNode<NodeWithMeta<T>>;
type NodeMap<T> = Map<UniqueId, VertexNode<T>>;
type TraversallCallback<T> = (currentNode: VertexNode<T>) => any;

const EdgeExistsError = new Error(
  "Edge with given source and destination already exists"
);

class Graph<T extends object> {
  static DIRECTED = Symbol("directed");
  static UNDIRECTED = Symbol("undirected");

  nodes: NodeMap<T> = new Map<UniqueId, VertexNode<T>>();
  private edges: Set<string> = new Set<string>();
  private edgeDirection: symbol = Graph.DIRECTED;

  constructor(direction: symbol = Graph.DIRECTED) {
    this.edgeDirection = direction;
  }

  addVertex(value: T): VertexNode<T> {
    const id: UniqueId = ID();
    const valueWithMeta: NodeWithMeta<T> = { ...value, _id: id };
    const vertex: VertexNode<T> = new GraphNode<NodeWithMeta<T>>(
      id,
      valueWithMeta
    );

    this.nodes.set(id, vertex);

    return vertex;
  }

  removeVertex(id: UniqueId): VertexNode<T> {
    const nodeToBeDeleted: VertexNode<T> = this.nodes.get(id);

    if (!nodeToBeDeleted) throw NotFoundError;

    for (const node of this.nodes.values()) {
      node.removeAdjacent(nodeToBeDeleted);
    }

    this.nodes.delete(id);

    return nodeToBeDeleted;
  }

  addEdge(
    source: VertexNode<T>,
    destination: VertexNode<T>
  ): [VertexNode<T>, VertexNode<T>] {
    const edgeId = `${source.id}->${destination.id}`;

    if (this.edges.has(edgeId)) throw EdgeExistsError;

    source.addAdjacent(destination);
    this.edges.add(edgeId);

    if (this.edgeDirection === Graph.UNDIRECTED) {
      const reverseEdgeId = `${destination.id}->${source.id}`;
      if (this.edges.has(reverseEdgeId)) throw EdgeExistsError;

      destination.addAdjacent(source);
      this.edges.add(reverseEdgeId);
    }

    return [source, destination];
  }

  removeEdge(source: VertexNode<T>, destination: VertexNode<T>): void {
    const edgeId = `${source.id}->${destination.id}`;

    source.removeAdjacent(destination);
    this.edges.delete(edgeId);

    if (this.edgeDirection === Graph.UNDIRECTED) {
      const reverseEdgeId = `${destination.id}->${source.id}`;

      destination.removeAdjacent(source);
      this.edges.delete(reverseEdgeId);
    }
  }

  traversalBreadthFirst(
    startNode: VertexNode<T>,
    callback: TraversallCallback<T>
  ): void {
    const visitedSet = new Set<UniqueId>();
    const visitsQueue = new Queue<VertexNode<T>>();

    visitsQueue.enqueue(startNode);

    while (visitsQueue.size !== 0) {
      const node: VertexNode<T> = visitsQueue.dequeue();

      if (!visitedSet.has(node.id)) {
        callback(node);
        visitedSet.add(node.id);
        node.adjacents.forEach((currentNode: VertexNode<T>): void => {
          visitsQueue.enqueue(currentNode);
        });
      }
    }
  }

  traversalDepthFirst(
    startNode: VertexNode<T>,
    callback: TraversallCallback<T>
  ): void {
    const visitedSet = new Set<UniqueId>();
    const visitsStack = new Stack<VertexNode<T>>();

    visitsStack.push(startNode);

    while (visitsStack.size !== 0) {
      const node: VertexNode<T> = visitsStack.pop();

      if (!visitedSet.has(node.id)) {
        callback(node);
        visitedSet.add(node.id);
        node.adjacents.forEach((currentNode: VertexNode<T>): void => {
          if (!visitedSet.has(currentNode.id)) visitsStack.push(currentNode);
        });
      }
    }
  }
}

export default Graph;
