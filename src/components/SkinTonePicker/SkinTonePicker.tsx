import React, { FC } from "react";

import { Emoji as EmojiType, EmojiSet } from "types/emoji";

import { Popover, PopoverProps } from "../Popover";
import { Emoji } from "../EmojiPicker/components/Emoji";

interface SkinTonePickerProps extends PopoverProps {
  onEmojiClick?(
    emoji: Omit<EmojiType, "keywords" | "sortOrder" | "name">
  ): void;
  emoji: EmojiType | null;
  emojiSize: number;
  sheetSize: 32 | 64;
  boundaryElement: HTMLElement | null;
  set: EmojiSet;
}

export const SkinTonePicker: FC<SkinTonePickerProps> = ({
  isOpen,
  styles,
  targetElement,
  emojiSize,
  boundaryElement,
  emoji,
  sheetSize,
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
        <ul
          data-testid="skin-tone-picker"
          className="flex items-center text-3xl py-2 px-3.5"
        >
          <li
            onClick={() => onEmojiClick(emoji)}
            className="border-r border-primary-300 pr-3 mr-3 cursor-pointer flex"
          >
            <Emoji
              data={emoji}
              set={set}
              sheetSize={sheetSize}
              size={emojiSize}
            />
          </li>
          {emoji?.skinVariations &&
            Object.values(emoji.skinVariations).map((emoji) => (
              <li
                key={`variation-${emoji.native}`}
                className="cursor-pointer px-px flex"
                onClick={() => onEmojiClick(emoji)}
              >
                <Emoji
                  data={emoji}
                  size={emojiSize}
                  sheetSize={sheetSize}
                  set={set}
                />
              </li>
            ))}
        </ul>
      )}
    </Popover>
  );
};
