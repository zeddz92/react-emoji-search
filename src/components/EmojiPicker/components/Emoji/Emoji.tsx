import React, { FC } from "react";
import { Emoji as BaseEmoji, EmojiQuality, EmojiSet } from "types/emoji";

import { EmojiImg } from "../../../Emoji/components/EmojiImg";
import { EmojiNative } from "../../../Emoji/components/EmojiNative";

interface EmojiProps {
  data: BaseEmoji;
  quality?: EmojiQuality;
  size?: number;
  set?: EmojiSet;

  sheetSize?: number;
}

export const Emoji: FC<EmojiProps> = ({ data: emoji, ...config }) => {
  if (config.set === "native") {
    return (
      <EmojiNative
        size={config.size}
        keywords={emoji.keywords}
        emoji={emoji.native}
      />
    );
  }

  return <EmojiImg emoji={emoji} keywords={emoji.keywords} {...config} />;
};
