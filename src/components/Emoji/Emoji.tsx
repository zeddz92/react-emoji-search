import React, { FC, useEffect, useState } from "react";

import emojis from "../../data/emojis";
import { BaseEmoji, EmojiQuality, EmojiSet } from "../../types/emoji";
import { EmojiImg } from "./EmojiImg";

const notFoundEmoji = {
  native: "❓",
  sheetX: 58,
  sheetY: 10,
  apple: 1,
  facebook: 1,
  google: 1,
  twitter: 1,
};

interface EmojiProps {
  unicode: string;
  quality?: EmojiQuality;
  size?: number;
  set?: EmojiSet;
}

export const Emoji: FC<EmojiProps> = ({
  unicode,
  set = "apple",
  ...config
}) => {
  const [emoji, setEmoji] = useState<BaseEmoji | undefined>();
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let found = false;
    for (let i = 0; i < emojis.length; i++) {
      const emoji = emojis[i];
      if (!emoji[set]) {
        continue;
      }

      if (emoji.native === unicode) {
        setEmoji(emoji);
        found = true;
        break;
      } else if (emoji.skinVariations) {
        const skinVariant = emoji.skinVariations.find(
          (emoji) => emoji.native === unicode && !!emoji[set]
        );
        if (skinVariant) {
          setEmoji(skinVariant);
          found = true;
          break;
        }
      }
    }

    setNotFound(!found);
  }, [unicode]);

  if (notFound) {
    if (set === "native") {
      return <>❓</>;
    }
    return <EmojiImg emoji={notFoundEmoji} set={set} {...config} />;
  }

  if (!emoji) {
    return null;
  }

  if (set === "native") {
    return <>{emoji.native}</>;
  }

  return <EmojiImg emoji={emoji} set={set} {...config} />;
};
