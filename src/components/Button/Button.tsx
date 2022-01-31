import React, { FC, useRef, useState } from "react";

interface ButtonProps {
  testId?: string;
  style?: React.CSSProperties;
  onLongPress?(e: HTMLButtonElement): void;
  onClick?(e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}

export const Button: FC<ButtonProps> = ({
  children,
  style,
  onClick,
  testId,
  onLongPress,
}) => {
  const [isLongPress, setIsLongPress] = useState(false);
  const [pressTimer, setPressTimer] = useState<NodeJS.Timeout | null>(null);

  const buttonRef = useRef<HTMLButtonElement>(null);

  const start = function (e: any) {
    if (e.type === "click" && e.button !== 0) {
      e.stop;
      return;
    }
    setIsLongPress(false);

    setPressTimer(
      setTimeout(function () {
        setIsLongPress(true);
        onLongPress && onLongPress(buttonRef.current!);
      }, 250)
    );

    return false;
  };

  const cancel = function (e: any) {
    if (pressTimer !== null) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
  };

  return (
    <button
      data-testid={testId}
      style={style}
      ref={buttonRef}
      onClick={(e) => {
        e.stopPropagation();
        if (pressTimer !== null) {
          clearTimeout(pressTimer);
          setPressTimer(null);
        }

        if (isLongPress) {
          setIsLongPress(false);
          return;
        }
        onClick && onClick(e);
      }}
      onMouseDown={start}
      onTouchStart={start}
      onMouseOut={cancel}
      onTouchCancel={cancel}
      onTouchEnd={cancel}
    >
      {children}
    </button>
  );
};
