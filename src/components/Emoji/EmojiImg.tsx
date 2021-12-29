import React, { FC } from "react";
import { BaseEmoji, EmojiQuality, EmojiSet } from "../../types/emoji";

interface EmojiImgProps {
  emoji: BaseEmoji;
  size?: number;
  set?: EmojiSet;
  quality?: EmojiQuality;
}

export const EmojiImg: FC<EmojiImgProps> = ({
  emoji,
  size = 32,
  quality = "clean",
  set = "apple",
}) => {
  return (
    <span
      aria-label={emoji.native}
      className="emoji-img"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(https://cdn.jsdelivr.net/npm/emoji-datasource-${set}@7.0.2/img/${set}/sheets-${quality}/64.png)`,
        backgroundPositionX: `${emoji.sheetX * (100 / 59)}%`,
        backgroundPositionY: `${emoji.sheetY * (100 / 59)}%`,
      }}
    />
  );
};
