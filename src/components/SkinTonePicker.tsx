import React, { FC } from "react";

import { Emoji as EmojiType, EmojiSet } from "types/emoji";

import { Popover, PopoverProps } from "./Popover";
import { Emoji } from "./EmojiPicker/Emoji";

interface Props extends PopoverProps {
  onEmojiClick?(
    emoji: Omit<EmojiType, "keywords" | "sortOrder" | "name">
  ): void;
  emoji: EmojiType | null;
  set: EmojiSet;
}

export const SkinTonePicker: FC<Props> = ({
  isOpen,
  styles,
  targetElement,
  boundaryElement,
  emoji,
  set,
  onEmojiClick = () => {},
}) => {
  return (
    <Popover
      isOpen={isOpen}
      boundaryElement={boundaryElement}
      targetElement={targetElement}
      styles={styles}
    >
      {emoji && (
        <ul className="flex items-center text-3xl py-2 px-3.5">
          <li
            onClick={() => onEmojiClick(emoji)}
            className="border-r border-primary-300 pr-3 mr-3 cursor-pointer flex"
          >
            <Emoji data={emoji} set={set} />
          </li>
          {emoji?.skinVariations &&
            Object.values(emoji.skinVariations).map((emoji) => (
              <li
                key={`variation-${emoji.native}`}
                className="cursor-pointer px-px flex"
                onClick={() => onEmojiClick(emoji)}
              >
                <Emoji data={emoji} set={set} />
              </li>
            ))}
        </ul>
      )}
    </Popover>
  );
};
