import React, { FC } from "react";

import { BaseEmoji, EmojiQuality, EmojiSet } from "../../../../types/emoji";

interface EmojiImgProps {
  emoji: BaseEmoji;
  size?: number;
  set?: EmojiSet;
  quality?: EmojiQuality;
  sheetSize?: number;
}

export const EmojiImg: FC<EmojiImgProps> = ({
  emoji,
  size = 32,
  quality = "clean",
  sheetSize = 64,
  set = "apple",
}) => {
  const img = `https://cdn.jsdelivr.net/npm/emoji-datasource-${set}-split@1.0.6/img/sheets-${quality}/${sheetSize}/${set}/${emoji.img}`;

  return (
    <span
      data-testid="emoji-img"
      data-image={img}
      aria-label={emoji.native}
      className="emoji-img"
      style={{
        width: size,
        height: size,
        backgroundImage: `url(${img})`,
        backgroundPositionX: `${emoji.sheetX * (100 / 4)}%`,
        backgroundPositionY: `${emoji.sheetY * (100 / 4)}%`,
      }}
    />
  );
};
