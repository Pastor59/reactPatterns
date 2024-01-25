export class Subscribable {
  private subscribers: Array<() => void> = [];

  constructor() {}

  subscribe(cb: () => void): void {
    this.subscribers.push(cb);
  }

  unsubscribe(cb: () => void): void {
    const newArray = this.subscribers.filter(fn => fn != cb);
    this.subscribers = newArray;
  }

  publish(): void {
    this.subscribers.forEach(cb => {
      cb()
    });
  }
}
