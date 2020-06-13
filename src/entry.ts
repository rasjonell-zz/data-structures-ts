import { Tree } from "data_structures/Tree";

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
