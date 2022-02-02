import {
  arrowOffset,
  arrowSize,
  handlePopoverPosition,
} from "./handlePopoverPosition";

const boundaryElement = {
  clientWidth: 3000,
  getBoundingClientRect: () => ({ y: 5 }),
} as HTMLElement;

const targetElement = {
  offsetLeft: 5,
  offsetWidth: 32,
  getBoundingClientRect: () => ({ y: 100 }),
} as HTMLElement;

describe("handlePopoverPosition", () => {
  it("set popover position to the left", () => {
    const arrowElement = document.createElement("div");
    const popoverElement = document.createElement("div");

    handlePopoverPosition({
      boundaryElement,
      arrowRef: { current: arrowElement },
      targetElement,
      popoverRef: { current: popoverElement },
    })();

    // popover position
    expect(popoverElement.style.right).toBe("");
    expect(popoverElement.style.left).toBe(
      `${targetElement.offsetLeft + arrowSize - 6}px`
    );

    // arrow position
    expect(arrowElement.style.right).toBe("");
    expect(arrowElement.style.left).toBe(`${arrowOffset}px`);
  });

  it("set popover position to the right", () => {
    const arrowElement = document.createElement("div");
    const popoverElement = document.createElement("div");

    handlePopoverPosition({
      boundaryElement: null,
      arrowRef: { current: arrowElement },
      targetElement,
      popoverRef: { current: popoverElement },
    })();

    // popover position
    expect(arrowElement.style.left).toBe("");
    expect(arrowElement.style.right).toBe(`${arrowOffset}px`);

    // arrow position
    expect(arrowElement.style.left).toBe("");
    expect(arrowElement.style.right).toBe(`${arrowOffset}px`);
  });
});
