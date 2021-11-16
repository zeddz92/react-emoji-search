import scrollIntoView from "scroll-into-view-if-needed";

// https://stackoverflow.com/a/57867348
export function smoothScroll(elem: Element, boundary: Element) {
  return new Promise((resolve) => {
    if (!(elem instanceof Element)) {
      throw new TypeError("Argument 1 must be an Element");
    }
    let same = 0; // a counter
    let lastPos: number | null = null;

    scrollIntoView(elem, {
      behavior: "smooth",
      boundary,
      block: "start",
    });

    requestAnimationFrame(check);

    // this function will be called every painting frame
    // for the duration of the smooth scroll operation
    function check() {
      // check  current position
      const newPos = elem.getBoundingClientRect().top;

      if (newPos === lastPos) {
        // same as previous
        if (same++ > 2) {
          return resolve(undefined); // we've come to an halt
        }
      } else {
        same = 0; // reset = counter
        lastPos = newPos; // remember  current position
      }
      // check again next painting frame
      requestAnimationFrame(check);
    }
  });
}
