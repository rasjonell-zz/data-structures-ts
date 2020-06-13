export default class Stack<T> {
  private _size: number = 0;
  private storage: Array<T> = [];

  get size(): number {
    return this._size;
  }

  push(data: T): void {
    this.storage.push(data);
    this._size++;
  }

  pop(): T {
    if (this.size === 0) {
      throw new Error("Cannot Remove From An Empty Stack");
    }

    const removedData: T = this.storage.pop();
    this._size--;

    return removedData;
  }
}
