export default class Stack<T> {
  private _size: number = 0;
  private storage: Array<T> = [];

  get size(): number {
    return this._size;
  }

  get top(): T {
    return this.storage[this._size - 1];
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

  static sort(stack: Stack<number>): Stack<number> {
    const tempStack = new Stack<number>();

    while (stack.size !== 0) {
      const temp = stack.pop();

      while (tempStack.size !== 0 && tempStack.top > temp) {
        stack.push(tempStack.pop());
      }

      tempStack.push(temp);
    }

    return tempStack;
  }

  static evaluatePostFix(expression: string): number {
    const newStack: Stack<number> = new Stack<number>();
    const expressionArray = expression.split("");

    const expressionToFunction = {
      "*": (a: number, b: number): number => a * b,
      "/": (a: number, b: number): number => a / b,
      "+": (a: number, b: number): number => a + b,
      "-": (a: number, b: number): number => a - b,
    };

    expressionArray.forEach((elem: string): void => {
      const parsedElem = parseInt(elem, 10);

      if (isNaN(parsedElem)) {
        const val1 = newStack.pop();
        const val2 = newStack.pop();
        const result = expressionToFunction[elem](val2, val1);

        newStack.push(result);
      } else {
        newStack.push(parsedElem);
      }
    });

    return newStack.pop();
  }
}
