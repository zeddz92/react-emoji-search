import React, { FC, useLayoutEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

export interface PopoverProps {
  targetElement: HTMLElement | null;
  boundaryElement: HTMLElement | null;
  isOpen: boolean;
  styles?: {
    backgroundColor?: string;
  };
}

const arrowSize = 10;
const arrowOffset = 12;

export const Popover: FC<PopoverProps> = ({
  children,
  isOpen,
  targetElement,
  boundaryElement,
  styles,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const boundaryWidth = boundaryElement?.clientWidth || 0;

  const handlePopoverPosition = () => {
    if (targetElement && popoverRef.current) {
      const top =
        targetElement.getBoundingClientRect().y +
        window.scrollY -
        boundaryElement!.getBoundingClientRect().y -
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
          `${targetElement.offsetLeft + arrowSize}px`
        );

        arrowRef.current?.style.removeProperty("right");
        arrowRef.current?.style.setProperty("left", `${arrowOffset}px`);
      } else {
        popoverRef.current.style.setProperty(
          "left",
          `${
            targetElement.offsetLeft -
            popoverRef.current.offsetWidth +
            targetElement.offsetWidth +
            arrowSize
          }px`
        );

        arrowRef.current?.style.removeProperty("left");
        arrowRef.current?.style.setProperty("right", `${arrowOffset}px`);
      }
    }
  };

  useLayoutEffect(() => {
    window.addEventListener("resize", handlePopoverPosition);

    return () => {
      window.removeEventListener("resize", handlePopoverPosition);
    };
  }, [handlePopoverPosition]);

  return (
    <div ref={popoverRef} className={"absolute left-8 z-20"}>
      <CSSTransition
        in={isOpen}
        timeout={{
          appear: 150,
          enter: 150,
          exit: 100,
        }}
        classNames="spring"
        unmountOnExit={true}
        onEntering={handlePopoverPosition}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="shadow-md rounded filter bg-picker-light dark:bg-picker-dark w-min relative select-none flex"
          style={{ backgroundColor: styles?.backgroundColor }}
        >
          {isOpen && (
            <>
              {children}
              <div className="arrow" ref={arrowRef} />
            </>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};
