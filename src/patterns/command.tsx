export class Command {
  private command: Array<() => void> = [];

  constructor() {}

  do(cb: () => void): void {
    this.command.push(cb);
  }

  unDo(): void {
    const cb = this.command.pop();
    if(cb) cb();
  }
}