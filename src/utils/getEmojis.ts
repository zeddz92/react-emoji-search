import emojis from "../data/emojis";
import { Emoji, EmojiSet, Version } from "../types/emoji";
import { getRecentEmojis } from "./getRecentEmojis";

export interface GroupedEmojis {
  [key: string]: Emoji[];
}

export const searchEmoji = (text: string, set: EmojiSet, version: Version) => {
  return emojis.filter(
    (emoji) =>
      (set === "native" || emoji[set] === 1) &&
      emoji.version <= version &&
      emoji.keywords.some((word: string) => word.includes(text))
  );
};

export const getGroupedEmojis = (set: EmojiSet, version: Version) => {
  const defaultGroupedEmojisValue = {
    Recent: getRecentEmojis(emojis, set),
    "Smileys & People": [],
    "Animals & Nature": [],
    "Food & Drink": [],
    Activity: [],
    "Travel & Places": [],
    Objects: [],
    Symbols: [],
    Flags: [],
  };

  const result = emojis.reduce((acc: GroupedEmojis, emoji) => {
    if (set !== "native" && emoji[set] !== 1) {
      return acc;
    }

    if (emoji.version && emoji.version <= version) {
      acc[emoji.category].push(emoji);
    }

    return acc;
  }, defaultGroupedEmojisValue);

  if (!result.Recent.length) {
    delete result["Recent"];
  }

  return result;
};
