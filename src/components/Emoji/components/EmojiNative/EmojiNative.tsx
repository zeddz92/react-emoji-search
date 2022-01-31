import React, { FC } from "react";

interface EmojiNative {
  emoji: string;
  size?: number;
}

export const EmojiNative: FC<EmojiNative> = ({ emoji, size = 32 }) => {
  return (
    <span
      data-testid="emoji-native"
      aria-label={emoji}
      className="emoji-native"
      style={{ fontSize: `${size}px` }}
    >
      {emoji}
    </span>
  );
};
