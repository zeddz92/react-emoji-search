import { EmojiPickerContext } from "../../contexts/EmojiPickerContext";
import React, { FC, useContext } from "react";
import { BaseEmoji, Emoji as EmojiType } from "../../types/emoji";

import { Emoji } from "../EmojiPicker/components/Emoji";
import { Popover, PopoverProps } from "../Popover";

interface SkinTonePickerProps extends PopoverProps {
  onEmojiClick?(emoji: BaseEmoji): void;
  emoji: EmojiType | null;
  boundaryElement: HTMLElement | null;
}

export const SkinTonePicker: FC<SkinTonePickerProps> = ({
  isOpen,
  targetElement,
  boundaryElement,
  emoji,

  onEmojiClick,
}) => {
  const { styles, emojiSize, sheetSize, set } = useContext(EmojiPickerContext);
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
            onClick={() => {
              if (onEmojiClick) {
                onEmojiClick(emoji);
              }
            }}
            className="border-r border-primary-300 pr-3 mr-3 cursor-pointer flex"
          >
            <Emoji
              data={emoji}
              set={set}
              sheetSize={sheetSize}
              size={emojiSize}
            />
          </li>
          {emoji.skinVariations &&
            Object.values(emoji.skinVariations).map((emoji) => (
              <li
                key={`variation-${emoji.native}`}
                className="cursor-pointer px-px flex"
                onClick={() => {
                  if (onEmojiClick) {
                    onEmojiClick(emoji);
                  }
                }}
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
