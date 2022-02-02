import { UIEvent } from "react";

import { handleScroll } from "./handleScroll";

describe("handleScroll", () => {
  const divElement = document.createElement("div");

  const scrollEvent = {
    currentTarget: {
      scrollTop: 5,
      classList: divElement.classList,
      querySelectorAll: () => {
        return {
          length: 1,
          item: () => ({ offsetTop: 2, clientHeight: 48 }),
        };
      },
    },
  } as unknown as UIEvent<HTMLDivElement, globalThis.UIEvent>;

  afterEach(() => {
    divElement.classList.remove("scrolling");
  });

  it("prevent scrolling to tab if already scrolling", () => {
    divElement.classList.add("scrolling");
    const tabIndex = handleScroll(scrollEvent);
    expect(tabIndex).toBeUndefined();
  });

  it("returns tab index when category in view", async () => {
    const tabIndex = handleScroll(scrollEvent);
    expect(tabIndex).toBe(0);
  });
});
