export type Procedure = (...args: any[]) => void;
export type Options = {
  isImmediate: boolean;
};

export function debounce<T extends Procedure>(
  func?: T,
  waitMilliseconds = 500,
  options: Options = {
    isImmediate: false,
  }
): (this: ThisParameterType<T>, ...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (typeof func === "undefined") {
      return;
    }
    const context = this;
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    const callImmediate = options.isImmediate && timeoutId === undefined;

    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      if (!options.isImmediate) {
        func.apply(context, args);
      }
    }, waitMilliseconds);

    if (callImmediate) {
      func.apply(context, args);
    }
  };
}
