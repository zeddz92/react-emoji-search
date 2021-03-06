import React, { FC, MouseEvent, useRef, useState } from "react";

interface ButtonProps {
  testId?: string;
  style?: React.CSSProperties;
  onLongPress?(e: HTMLButtonElement): void;
  onClick?(e: MouseEvent<HTMLButtonElement>): void;
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

  const start = function () {
    setIsLongPress(false);

    setPressTimer(
      setTimeout(function () {
        setIsLongPress(true);
        buttonRef.current && onLongPress && onLongPress(buttonRef.current);
      }, 250)
    );

    return false;
  };

  const cancel = function () {
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
