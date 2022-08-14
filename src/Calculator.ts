export abstract class CalculatorCommand {
  protected value: number;

  abstract execute(value: number): number;
  abstract undo(value: number): number;

  constructor(value: number) {
    this.value = value;
  }
}

export class AdditionCommand extends CalculatorCommand {
  override execute(value: number) {
    return this.value + value;
  }
  override undo(value: number) {
    return this.value - value;
  }
}

export class SubtractionCommand extends CalculatorCommand {
  override execute(value: number) {
    return this.value - value;
  }
  override undo(value: number) {
    return this.value + value;
  }
}

export class MultiplicationCommand extends CalculatorCommand {
  override execute(value: number) {
    return this.value * value;
  }
  override undo(value: number) {
    return this.value / value;
  }
}

export class DivisionCommand extends CalculatorCommand {
  override execute(value: number) {
    return this.value / value;
  }
  override undo(value: number) {
    return this.value * value;
  }
}

export class ClearCommand extends CalculatorCommand {
  override execute(value: number) {
    return 0;
  }
  override undo(value: number) {
    return this.value;
  }
}
