import { RefObject } from "react";

export const arrowSize = 10;
export const arrowOffset = 12;

interface Props {
  popoverRef: RefObject<HTMLDivElement>;
  arrowRef: RefObject<HTMLDivElement>;
  targetElement: HTMLElement | null;
  boundaryElement: HTMLElement | null;
}

export const handlePopoverPosition = ({
  boundaryElement,
  arrowRef,
  popoverRef,
  targetElement,
}: Props) => {
  return () => {
    const boundaryWidth = boundaryElement?.clientWidth || 0;
    const boundaryY = boundaryElement?.getBoundingClientRect().y || 0;

    if (targetElement && popoverRef.current) {
      const top =
        targetElement.getBoundingClientRect().y -
        boundaryY -
        targetElement.offsetHeight * 1.9;

      popoverRef.current.style.setProperty("top", `${top}px`);

      if (
        targetElement.offsetLeft +
          popoverRef.current.offsetWidth +
          targetElement.offsetWidth <=
        boundaryWidth
      ) {
        popoverRef.current.style.setProperty(
          "left",
          `${targetElement.offsetLeft + arrowSize - 6}px`
        );

        if (arrowRef.current) {
          arrowRef.current.style.removeProperty("right");
          arrowRef.current.style.setProperty("left", `${arrowOffset}px`);
        }
      } else {
        popoverRef.current.style.setProperty(
          "left",
          `${
            targetElement.offsetLeft -
            popoverRef.current.offsetWidth +
            targetElement.offsetWidth +
            arrowSize +
            6
          }px`
        );

        if (arrowRef.current) {
          arrowRef.current.style.removeProperty("left");
          arrowRef.current.style.setProperty("right", `${arrowOffset}px`);
        }
      }
    }
  };
};
