export default class Queue<T> {
  private storage: Array<T> = [];

  get size(): number {
    return this.storage.length;
  }

  enqueue(data: T): void {
    this.storage.push(data);
  }

  dequeue(): T {
    if (this.storage.length === 0) {
      throw new Error("Cannot Dequeue From An Empty Queue");
    }

    const removedData = this.storage.shift();
    return removedData;
  }
}
