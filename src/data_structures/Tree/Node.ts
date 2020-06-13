export default class TreeNode<T> {
  data: T;
  parent: TreeNode<T> | null;
  children: TreeNode<T>[] = [];

  constructor(data: T) {
    this.data = data;
  }
}
