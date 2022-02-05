import React from "react";

import { BaseEmoji, Emoji, EmojiPickerProps } from "../types/emoji";

interface EmojiPickerContextProps
  extends Omit<EmojiPickerProps, "onEmojiClick"> {
  onEmojiClick?: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    emoji: Emoji
  ) => void;
  onEmojiLongPress?: (e: HTMLButtonElement, emoji: Emoji) => void;
  skinTones: {
    [key: string]: BaseEmoji;
  };
}

export const defaultContextValue: EmojiPickerContextProps = {
  tabsVariant: "default",
  mode: "dark",
  set: "apple",
  emojiVersion: 12.0,
  emojiSpacing: 12,
  emojiSize: 32,
  sheetSize: 64,
  quality: "clean",
  skinTones: {},
};

export const EmojiPickerContext =
  React.createContext<EmojiPickerContextProps>(defaultContextValue);
