import { Tree } from "data_structures/Tree";
import { Graph } from "data_structures/Graph";

const tree = new Tree<number>(0);

tree.add(1, 0);
tree.add(2, 0);

tree.add(3, 1);
tree.add(4, 1);

tree.add(5, 2);
tree.add(5, 2);

/*
 *      0
 *   1     2
 * 3   4 5   6
 *
 */

const graph = new Graph<{ data: number }>(Graph.DIRECTED);

const v1 = graph.addVertex({ data: 1 });
const v2 = graph.addVertex({ data: 2 });
const v3 = graph.addVertex({ data: 3 });
const v4 = graph.addVertex({ data: 4 });

graph.addEdge(v1, v2);
graph.addEdge(v1, v3);
graph.addEdge(v2, v4);
graph.addEdge(v3, v2);
graph.addEdge(v3, v4);

/*
 * (V1)-------->(V2)
 *  \            /\
 *   \          /  \
 *    \->(V3)--/----\->(V4)
 */

const logger = (node) => {
  console.log(node.id, node.value);
};

// graph.traversalBreadthFirst(v1, logger); // v1, v2, v3, v4

graph.traversalDepthFirst(v1, logger); //v1, v3, v4, v2
