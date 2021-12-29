import React, { FC } from "react";

interface EmojiImg {
  emoji: string;
}

export const EmojiNative: FC<EmojiImg> = ({ emoji }) => {
  return (
    <span aria-label={emoji} className="emoji-native">
      {emoji}
    </span>
  );
};
