import React, { FC, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { handlePopoverPosition } from "../../utils/handlePopoverPosition";

export interface PopoverProps {
  targetElement: HTMLElement | null;
  boundaryElement: HTMLElement | null;
  isOpen: boolean;
  styles?: {
    backgroundColor?: string;
  };
}

export const Popover: FC<PopoverProps> = ({
  children,
  isOpen,
  targetElement,
  boundaryElement,
  styles,
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  const resizeCallback = handlePopoverPosition({
    boundaryElement,
    arrowRef,
    popoverRef,
    targetElement,
  });

  useEffect(() => {
    window.addEventListener("resize", resizeCallback);

    return () => {
      window.removeEventListener("resize", resizeCallback);
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
        onEntering={resizeCallback}
      >
        <div
          data-testid="popover"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          className="shadow-md rounded filter bg-picker-light dark:bg-picker-dark w-min relative select-none flex"
          style={{ backgroundColor: styles?.backgroundColor }}
        >
          {isOpen && (
            <>
              {children}
              <div
                data-testid="arrow"
                className="arrow"
                style={{ borderTopColor: styles?.backgroundColor }}
                ref={arrowRef}
              />
            </>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};
