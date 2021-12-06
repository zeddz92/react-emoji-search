import React, { FC } from "react";
import { BaseEmoji } from "unicode-emoji";

import { Popover, PopoverProps } from "./Popover";

interface Props extends PopoverProps {
  onEmojiClick?(emoji: BaseEmoji): void;
  emoji: BaseEmoji | null;
}

export const Picker: FC<Props> = ({
  isOpen,
  styles,
  targetElement,
  boundaryElement,
  emoji,
  onEmojiClick = () => {},
}) => {
  return (
    <Popover
      isOpen={isOpen}
      boundaryElement={boundaryElement}
      targetElement={targetElement}
      styles={styles}
    >
      <ul className="flex items-center text-3xl py-2 px-3.5">
        <li
          onClick={() => onEmojiClick(emoji as any)}
          className="border-r border-primary-300 pr-3 mr-3 cursor-pointer"
        >
          {emoji?.emoji}
        </li>
        {emoji?.variations?.slice(0, 5).map((emoji) => (
          <li
            key={`variation-${emoji.emoji}`}
            className="cursor-pointer"
            onClick={() => onEmojiClick(emoji as any)}
          >
            {emoji.emoji}
          </li>
        ))}
      </ul>
    </Popover>
  );
};
