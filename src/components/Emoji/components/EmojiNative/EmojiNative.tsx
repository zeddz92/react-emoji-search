import React, { FC } from "react";

interface EmojiNative {
  emoji: string;
  size?: number;
  keywords?: string[];
}

export const EmojiNative: FC<EmojiNative> = ({
  emoji,
  size = 32,
  keywords,
}) => {
  return (
    <span
      data-testid="emoji-native"
      aria-label={emoji}
      title={keywords?.join(",")}
      className="emoji-native"
      style={{ fontSize: `${size}px` }}
    >
      {emoji}
    </span>
  );
};
