import React, { FC } from "react";
import { BaseEmoji, EmojiQuality, EmojiSet } from "types/emoji";

import { EmojiImg } from "../../components/Emoji/EmojiImg";
import { EmojiNative } from "../../components/Emoji/EmojiNative";

interface EmojiProps {
  data: BaseEmoji;
  quality?: EmojiQuality;
  size?: number;
  set?: EmojiSet;
}

export const Emoji: FC<EmojiProps> = ({ data: emoji, ...config }) => {
  if (config.set === "native") {
    return <EmojiNative emoji={emoji.native} />;
  }

  return <EmojiImg emoji={emoji} {...config} />;
};
